"use client"

import { useRef } from "react"
import {
  gsap,
  MOTION,
  useIsomorphicLayoutEffect,
  prefersReducedMotion,
  runWhenVisible,
} from "@/lib/motion"

/*
 * Hero entrance timeline — the site's opening beat. Wraps the server-rendered
 * hero markup (children stay SSR'd; only this leaf is client) and plays one
 * orchestrated sequence over its [data-hero] descendants: greeting, then each
 * headline line, then status, then socials — each rising and fading in turn.
 *
 * useLayoutEffect sets the hidden state before paint, so there is no flash.
 * Under reduced motion nothing is hidden and the timeline never runs.
 */
export function HeroMotion({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null)

  useIsomorphicLayoutEffect(() => {
    const el = root.current
    if (!el || prefersReducedMotion()) return

    let ctx: gsap.Context | undefined
    const stop = runWhenVisible(() => {
      ctx = gsap.context(() => {
        const items = gsap.utils.toArray<HTMLElement>("[data-hero]")
        if (!items.length) return
        gsap.set(items, { opacity: 0, y: MOTION.hero.y })
        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration: MOTION.hero.duration,
          ease: MOTION.ease,
          stagger: MOTION.hero.stagger,
          delay: MOTION.hero.greetingDelay,
        })
      }, el)
    })

    return () => {
      stop()
      ctx?.revert()
    }
  }, [])

  return <div ref={root}>{children}</div>
}
