"use client"

import { useState } from "react"
import { ScrollTrigger, useIsomorphicLayoutEffect } from "@/lib/motion"

/*
 * True while scrolling down (past a small settle zone), false on scroll up.
 * Drives the mobile nav capsule tucking away while reading. Uses a single
 * ScrollTrigger rather than a window scroll listener (batched, no per-frame
 * React work) and kills it on unmount.
 */
export function useHideOnScroll(threshold = 120) {
  const [hidden, setHidden] = useState(false)

  useIsomorphicLayoutEffect(() => {
    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        setHidden(self.direction === 1 && self.scroll() > threshold)
      },
    })
    return () => trigger.kill()
  }, [threshold])

  return hidden
}
