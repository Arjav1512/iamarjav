"use client"

import { useRef, useState } from "react"
import { Megaphone, Shirt, Package, Briefcase, Store, Cpu, type LucideIcon } from "lucide-react"
import type { Milestone } from "@/data/content"
import { gsap, useIsomorphicLayoutEffect } from "@/lib/motion"
import { cn } from "@/lib/utils"

/* Icon per milestone, ordered like journey.milestones. Purely supportive. */
const MILESTONE_ICONS: LucideIcon[] = [Megaphone, Shirt, Package, Briefcase, Store, Cpu]

interface JourneyTimelineProps {
  milestones: Milestone[]
  /** One framing line shown before the milestones on every breakpoint. */
  intro: string
  /** The playful epilogue after the last milestone: "currently..." lines. */
  currently: string[]
}

/*
 * Horizontal journey. On desktop with motion allowed, the section pins and
 * vertical scroll pans the track horizontally (canonical pin/scrub: start
 * "top top", end = horizontal distance, scrub 1). The hairline and its
 * accent progress fill live inside the track, so the line travels with the
 * journey; the milestone nearest the playhead activates (larger ink title,
 * ringed accent dot; passed dots stay filled).
 *
 * Fallbacks, no hijack anywhere else: reduced-motion / no-JS desktop keeps
 * a keyboard-focusable horizontally scrollable region (overflow locks to
 * hidden only while the pin drives it); below lg the timeline renders as a
 * vertical list. gsap.matchMedia reverts everything cleanly.
 */
export function JourneyTimeline({ milestones, intro, currently }: JourneyTimelineProps) {
  const wrap = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const progress = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  useIsomorphicLayoutEffect(() => {
    if (!wrap.current || !track.current) return
    const mm = gsap.matchMedia()

    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const wrapEl = wrap.current!
      const trackEl = track.current!
      const distance = () => trackEl.scrollWidth - wrapEl.clientWidth

      wrapEl.classList.remove("overflow-x-auto")
      wrapEl.classList.add("overflow-hidden")

      const pan = gsap.to(trackEl, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: wrapEl,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setActive(Math.round(self.progress * (milestones.length - 1)))
          },
        },
      })

      if (progress.current) {
        gsap.fromTo(
          progress.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: wrapEl,
              start: "top top",
              end: () => `+=${distance()}`,
              scrub: 1,
            },
          }
        )
      }

      return () => {
        pan.scrollTrigger?.kill()
        wrapEl.classList.add("overflow-x-auto")
        wrapEl.classList.remove("overflow-hidden")
      }
    })

    return () => mm.revert()
  }, [milestones.length])

  return (
    <>
      {/* Desktop: pinned horizontal pan (keyboard-scrollable region when unpinned) */}
      <div
        ref={wrap}
        role="region"
        aria-label="Journey milestones"
        tabIndex={0}
        className="relative hidden overflow-x-auto lg:flex lg:min-h-[100dvh] lg:flex-col lg:justify-center"
      >
        {/* Framing line: stays put while the track pans behind it */}
        <p className="mb-14 font-mono text-[11px] tracking-wide text-muted-foreground">
          {intro}
        </p>
        <div ref={track} className="relative w-max">
          {/* The line rides with the track: hairline base + scrubbed accent fill */}
          <div
            className="pointer-events-none absolute left-0 top-[6px] h-px w-full bg-border [mask-image:linear-gradient(90deg,black_92%,transparent)]"
            aria-hidden="true"
          />
          <div
            ref={progress}
            className="pointer-events-none absolute left-0 top-[5.5px] h-[2px] w-full origin-left scale-x-0 rounded-full bg-accent"
            aria-hidden="true"
          />
          <ol className="flex gap-20 pr-[10vw]">
            {milestones.map((m, i) => {
              const isActive = i === active
              const isPassed = i < active
              const Icon = MILESTONE_ICONS[i % MILESTONE_ICONS.length]
              return (
                <li key={m.title} className="group/stop w-72 shrink-0">
                  <span
                    className={cn(
                      "relative z-10 mt-[1px] block size-[13px] rounded-full transition-all duration-(--duration-hover)",
                      isActive
                        ? "bg-accent shadow-[0_0_0_5px_oklch(0.52_0.21_285/0.15)]"
                        : isPassed
                          ? "bg-accent"
                          : "border border-border bg-background group-hover/stop:border-foreground/40"
                    )}
                    aria-hidden="true"
                  />
                  <p
                    className={cn(
                      "mt-6 flex items-center gap-2 font-mono text-[11px] tracking-widest transition-colors duration-(--duration-hover)",
                      isActive ? "text-accent" : "text-muted-foreground"
                    )}
                  >
                    <Icon
                      className={cn(
                        "size-3.5 transition-colors duration-(--duration-hover)",
                        isActive ? "text-accent" : "text-muted-foreground/70"
                      )}
                      aria-hidden="true"
                    />
                    {m.year}
                  </p>
                  <h3
                    className={cn(
                      "mt-2 font-display font-semibold tracking-tight transition-all duration-(--duration-hover)",
                      isActive
                        ? "text-2xl text-foreground"
                        : "text-xl text-muted-foreground group-hover/stop:text-foreground"
                    )}
                  >
                    {m.title}
                  </h3>
                  <p className="mt-2.5 max-w-[26ch] text-sm leading-relaxed text-muted-foreground">
                    {m.description}
                  </p>
                </li>
              )
            })}

            {/* Epilogue: not an achievement, a notebook note (hence the tilt) */}
            <li className="w-72 shrink-0">
              <span className="status-dot relative z-10 mt-[3px] block" aria-hidden="true" />
              <div className="mt-6 -rotate-1">
                <p className="font-mono text-[11px] tracking-widest text-muted-foreground">
                  currently...
                </p>
                <ul className="mt-3 space-y-1.5">
                  {currently.map((line) => (
                    <li key={line} className="font-mono text-sm text-muted-foreground">
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ol>
        </div>
      </div>

      {/* Mobile: framing line, then a vertical list along a hairline */}
      <p className="mb-8 font-mono text-[11px] tracking-wide text-muted-foreground lg:hidden">
        {intro}
      </p>
      <ol className="border-l border-border pl-6 lg:hidden">
        {milestones.map((m) => (
          <li key={m.title} className="relative pb-10 last:pb-0">
            <span
              className="absolute -left-[30px] top-1.5 block size-2 rounded-full bg-accent"
              aria-hidden="true"
            />
            <p className="font-mono text-xs text-muted-foreground">{m.year}</p>
            <h3 className="mt-1 font-display text-lg font-semibold tracking-tight text-foreground">
              {m.title}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              {m.description}
            </p>
          </li>
        ))}
        <li className="relative pt-10">
          <span className="status-dot absolute -left-[29px] top-[46px]" aria-hidden="true" />
          <div className="-rotate-1">
            <p className="font-mono text-xs tracking-widest text-muted-foreground">currently...</p>
            <ul className="mt-2 space-y-1">
              {currently.map((line) => (
                <li key={line} className="font-mono text-sm text-muted-foreground">
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </li>
      </ol>
    </>
  )
}
