"use client"

import { useEffect, useState } from "react"

/*
 * True while the visitor is actively scrolling down (past a small settle
 * zone), false as soon as they scroll up. Used to tuck the mobile nav
 * capsule out of the way while reading.
 */
export function useHideOnScroll(threshold = 120) {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let last = window.scrollY
    let raf = 0

    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const y = window.scrollY
        if (y > last + 4 && y > threshold) setHidden(true)
        else if (y < last - 4) setHidden(false)
        last = y
      })
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [threshold])

  return hidden
}
