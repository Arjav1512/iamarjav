"use client"

import { useCallback, useRef, useState } from "react"
import {
  gsap,
  ScrollTrigger,
  MOTION,
  prefersReducedMotion,
  runWhenVisible,
  useIsomorphicLayoutEffect,
} from "@/lib/motion"

type Q = (selector: string) => Element[]
export type BuildTimeline = (tl: gsap.core.Timeline, q: Q) => void

/*
 * One authored sequence per preview: built paused, played once when the
 * panel scrolls into view, replayable on demand. Markup always renders the
 * FINAL state, so no-JS and reduced-motion users see the complete story;
 * the timeline's from() tweens set start states before paint. gsap.context
 * reverts everything on unmount.
 */
export function usePreviewTimeline<T extends HTMLElement>(build: BuildTimeline) {
  const ref = useRef<T>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const buildRef = useRef(build)
  buildRef.current = build
  const [canReplay, setCanReplay] = useState(false)

  useIsomorphicLayoutEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return

    let ctx: gsap.Context | undefined
    const stop = runWhenVisible(() => {
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ paused: true, defaults: { ease: MOTION.ease, duration: 0.5 } })
        buildRef.current(tl, gsap.utils.selector(el))
        tlRef.current = tl
        ScrollTrigger.create({
          trigger: el,
          start: "top 72%",
          once: true,
          onEnter: () => tl.play(0),
        })
      }, el)
      setCanReplay(true)
    })

    return () => {
      stop()
      ctx?.revert()
      tlRef.current = null
    }
  }, [])

  const replay = useCallback(() => {
    tlRef.current?.restart()
  }, [])

  return { ref, replay, canReplay }
}
