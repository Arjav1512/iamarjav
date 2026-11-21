"use client"

import { useEffect, useRef, type ReactNode } from "react"

/*
 * Scroll-triggered entrance for the Journey cards.
 *
 * The cards are server-rendered and fully visible by default. On mount this
 * wrapper "arms" them (data-motion="armed" hides them in their start pose via
 * home.css) and plays them (data-motion="play") once the fan scrolls into
 * view, then marks them "done" so the finished cards drop their animations
 * and render exactly like the static design. Nothing is armed when the user prefers reduced motion or when the fan
 * is already on screen at mount, so the section never flashes or hides.
 *
 * The ElevenX badge is the one piece driven from JS: a small physics model of
 * a badge dropped on an elastic lanyard (see dropLanyard).
 */
export function JourneyMotion({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = ref.current
    const fan = root?.querySelector<HTMLElement>(".fan")
    if (!root || !fan) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const box = fan.getBoundingClientRect()
    if (box.top < window.innerHeight && box.bottom > 0) return // already visible: stay static

    const lanyard = getLanyard(root)
    root.dataset.motion = "armed"
    if (lanyard) setLanyardPose(lanyard, { y: FALL_FROM, theta: TILT, e: 0, bend: 0, opacity: 0 })

    let stopLanyard: (() => void) | undefined
    let dropTimer: ReturnType<typeof setTimeout> | undefined
    let doneTimer: ReturnType<typeof setTimeout> | undefined
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        root.dataset.motion = "play"
        doneTimer = setTimeout(() => (root.dataset.motion = "done"), CSS_ENTRANCE_MS)
        if (lanyard) dropTimer = setTimeout(() => (stopLanyard = dropLanyard(lanyard)), LANYARD_DELAY_MS)
      },
      // 35% of the fan in view; the mobile pile can be taller than the screen,
      // so cap it at half a viewport's worth or it might never fire.
      { threshold: Math.min(0.35, (window.innerHeight * 0.5) / box.height) },
    )
    observer.observe(fan)

    return () => {
      observer.disconnect()
      clearTimeout(dropTimer)
      clearTimeout(doneTimer)
      stopLanyard?.()
      delete root.dataset.motion
      if (lanyard) clearLanyardPose(lanyard)
    }
  }, [])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

/* The longest CSS entrance (home.css, "Journey entrance") ends at ~2.1s. */
const CSS_ENTRANCE_MS = 2400

/* ————— ElevenX lanyard physics ————— */

type Lanyard = { swing: HTMLElement; tag: HTMLElement; band: SVGPathElement }
type Pose = { y: number; theta: number; e: number; bend: number; opacity: number }

const BAND_LENGTH = 88 // px, the strap's resting length (matches the static design)
const FALL_FROM = -180 // px above the resting position
const TILT = 0.12 // rad (~7°): the badge falls slightly askew, so it swings when caught
const LANYARD_DELAY_MS = 240 // its slot in the left-to-right stagger

const GRAVITY = 2200 // px/s², free fall
const CATCH_TRANSFER = 0.36 // share of the fall speed the band absorbs as stretch
const STRETCH_W = 15 // rad/s, elastic band natural frequency (taut)
const STRETCH_DAMPING = 0.28 // damping ratio of the band
const SLACK_GRAVITY = 1400 // px/s², pull back down while the band is slack
/* At rest the badge's weight already stretches the band by g/k px, so it only
   goes slack once the badge rises above that point. */
const STATIC_STRETCH = SLACK_GRAVITY / STRETCH_W ** 2
const MAX_SLACK_BOW = 6 // px, cap on how far a slack band bows
const SWING_W = 5.2 // rad/s, pendulum natural frequency (~1.2s period)
const SWING_DAMPING = 0.13 // damping ratio of the swing
const STEP = 1 / 240 // s, fixed integration step

function getLanyard(root: HTMLElement): Lanyard | null {
  const swing = root.querySelector<HTMLElement>("[data-lanyard]")
  const tag = root.querySelector<HTMLElement>("[data-lanyard-tag]")
  const band = root.querySelector<SVGPathElement>("[data-lanyard-band] path")
  return swing && tag && band ? { swing, tag, band } : null
}

function bandPath(e: number, bend: number) {
  const length = BAND_LENGTH + e
  return `M14 0 Q${(14 + bend).toFixed(2)} ${(length / 2).toFixed(2)} 14 ${length.toFixed(2)}`
}

function setLanyardPose({ swing, tag, band }: Lanyard, p: Pose) {
  swing.style.opacity = String(p.opacity)
  swing.style.transform = `translateY(${p.y.toFixed(2)}px) rotate(${p.theta.toFixed(4)}rad)`
  tag.style.transform = `translateY(${p.e.toFixed(2)}px)`
  band.setAttribute("d", bandPath(p.e, p.bend))
}

function clearLanyardPose({ swing, tag, band }: Lanyard) {
  swing.style.opacity = ""
  swing.style.transform = ""
  tag.style.transform = ""
  band.setAttribute("d", bandPath(0, 0))
}

/**
 * Drop the badge: free fall (tilted) until the band catches it, then two
 * damped oscillators run together. The band stretches like a spring while
 * taut and goes slack on the rebound (the badge hops under gravity), while
 * the badge swings as a pendulum around the strap's top. The strap is redrawn
 * every frame: it stretches with the badge, bows when slack and lags behind
 * the swing. Returns a cancel function.
 */
function dropLanyard(lanyard: Lanyard): () => void {
  let phase: "fall" | "hang" = "fall"
  let t = 0
  let y = FALL_FROM
  let vy = 0
  let e = 0
  let ve = 0
  let theta = TILT
  let omega = 0
  let frame = 0
  let last = performance.now()
  let acc = 0

  const step = (dt: number) => {
    t += dt
    if (phase === "fall") {
      vy += GRAVITY * dt
      y += vy * dt
      if (y >= 0) {
        y = 0
        phase = "hang"
        ve = vy * CATCH_TRANSFER
      }
      return
    }
    // Band: linear spring while taut, free flight under gravity once slack.
    // The two agree at e = -STATIC_STRETCH, so the motion stays continuous.
    const damping = 2 * STRETCH_DAMPING * STRETCH_W * ve
    const ae = e > -STATIC_STRETCH ? -(STRETCH_W ** 2) * e - damping : SLACK_GRAVITY - damping
    ve += ae * dt
    e += ve * dt
    // Swing: damped pendulum.
    const atheta = -(SWING_W ** 2) * Math.sin(theta) - 2 * SWING_DAMPING * SWING_W * omega
    omega += atheta * dt
    theta += omega * dt
  }

  const tick = (now: number) => {
    acc += Math.min(0.05, (now - last) / 1000) // clamp long frames (tab switches)
    last = now
    while (acc >= STEP) {
      step(STEP)
      acc -= STEP
    }

    // Slack band: bow it gently (a fraction of the sagitta an inextensible
    // strap of the same length would need), capped so it never curls.
    const slack = Math.max(0, -e - STATIC_STRETCH)
    const sagitta = Math.sqrt((3 * slack * (BAND_LENGTH + e)) / 8)
    const slackBow = Math.min(MAX_SLACK_BOW, sagitta)
    const lag = Math.max(-8, Math.min(8, -omega * 9))
    setLanyardPose(lanyard, { y, theta, e, bend: lag + slackBow, opacity: Math.min(1, t / 0.18) })

    const settled = phase === "hang" && Math.abs(e) < 0.15 && Math.abs(ve) < 3 && Math.abs(theta) < 0.004 && Math.abs(omega) < 0.02
    if (settled) {
      clearLanyardPose(lanyard)
      return
    }
    frame = requestAnimationFrame(tick)
  }

  frame = requestAnimationFrame(tick)
  return () => cancelAnimationFrame(frame)
}
