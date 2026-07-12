"use client"

import { useRef } from "react"
import {
  gsap,
  MOTION,
  useIsomorphicLayoutEffect,
  prefersReducedMotion,
  runWhenVisible,
} from "@/lib/motion"

interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Stagger position among siblings; each step delays the entrance slightly. */
  index?: number
}

/*
 * Scroll entrance: children rise and fade in once as they cross the
 * viewport. GSAP ScrollTrigger (fire-once), transform + opacity only, one
 * shared easing. gsap.context reverts the tween and kills the trigger on
 * unmount (no leaks). Under reduced motion the element renders visible and
 * no trigger is created.
 */
export function Reveal({ index = 0, className, children, ...props }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useIsomorphicLayoutEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return

    let ctx: gsap.Context | undefined
    const stop = runWhenVisible(() => {
      ctx = gsap.context(() => {
        gsap.set(el, { opacity: 0, y: MOTION.reveal.y })
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: MOTION.reveal.duration,
          ease: MOTION.ease,
          delay: index * MOTION.reveal.stagger,
          scrollTrigger: { trigger: el, start: MOTION.reveal.start, once: true },
        })
      }, el)
    })

    return () => {
      stop()
      ctx?.revert()
    }
  }, [index])

  return (
    <div ref={ref} className={className} {...props}>
      {children}
    </div>
  )
}
