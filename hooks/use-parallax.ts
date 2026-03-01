"use client"

import { useEffect, useState, useRef as useReactRef, type RefObject } from "react"

interface ParallaxOptions {
  speed?: number
  direction?: "up" | "down"
  maxOffset?: number
}

export function useParallax(
  ref: RefObject<HTMLElement | null>,
  { speed = 0.02, direction = "up", maxOffset = 20 }: ParallaxOptions = {}
) {
  const [offset, setOffset] = useState(0)
  const mounted = useReactRef(false)
  const rafId = useReactRef<number>(0)

  useEffect(() => {
    // Skip on first render to avoid hydration mismatch
    const timer = setTimeout(() => {
      mounted.current = true
    }, 100)

    const calculate = () => {
      const el = ref.current
      if (!el || !mounted.current) return

      const rect = el.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const elementCenter = rect.top + rect.height / 2
      const viewportCenter = windowHeight / 2
      const distance = elementCenter - viewportCenter
      const multiplier = direction === "up" ? -1 : 1
      const raw = distance * speed * multiplier
      // Clamp to maxOffset to prevent overlap
      const clamped = Math.max(-maxOffset, Math.min(maxOffset, raw))

      setOffset(clamped)
    }

    const onScroll = () => {
      if (rafId.current) cancelAnimationFrame(rafId.current)
      rafId.current = requestAnimationFrame(calculate)
    }

    window.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      clearTimeout(timer)
      window.removeEventListener("scroll", onScroll)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [ref, speed, direction, maxOffset])

  return offset
}

export function useScrollFade(
  ref: RefObject<HTMLElement | null>,
  threshold = 200
) {
  const [progress, setProgress] = useState(0)
  const rafId = useReactRef<number>(0)

  useEffect(() => {
    const calculate = () => {
      const el = ref.current
      if (!el) return

      const rect = el.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const start = windowHeight
      const visible = start - rect.top
      const clamped = Math.min(Math.max(visible / threshold, 0), 1)

      setProgress(clamped)
    }

    const onScroll = () => {
      if (rafId.current) cancelAnimationFrame(rafId.current)
      rafId.current = requestAnimationFrame(calculate)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    calculate()

    return () => {
      window.removeEventListener("scroll", onScroll)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [ref, threshold])

  return progress
}
