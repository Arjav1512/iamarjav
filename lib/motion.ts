import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useLayoutEffect } from "react"

/*
 * Single GSAP entry point for the whole site — registered once, shared
 * tokens so every animation reads as one authored motion language.
 * Prefer CSS for hover/press state; GSAP only drives the entrance timeline,
 * scroll reveals, and scroll-direction (things CSS can't orchestrate well).
 */
// registerPlugin is idempotent; guard to the client since GSAP touches window.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

/** useLayoutEffect on the client (runs before paint → no reveal flash), noop-safe on the server. */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect

/** Shared motion tokens — one easing, calibrated timing. Keep in sync with the calm design read. */
export const MOTION = {
  ease: "power3.out",
  reveal: { y: 20, duration: 0.65, stagger: 0.08, start: "top 88%" },
  hero: { y: 16, duration: 0.6, stagger: 0.09, greetingDelay: 0.05 },
} as const

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )
}

/*
 * Run cb now if the tab is visible, else the first time it becomes visible.
 * Entrance tweens hide their targets before animating; gating on visibility
 * means we never leave content hidden in a tab that never renders (GSAP's
 * rAF ticker is paused while hidden). Returns a cleanup for the listener.
 */
export function runWhenVisible(cb: () => void): () => void {
  if (typeof document === "undefined") return () => {}
  if (document.visibilityState === "visible") {
    cb()
    return () => {}
  }
  const onVisible = () => {
    if (document.visibilityState === "visible") {
      document.removeEventListener("visibilitychange", onVisible)
      cb()
    }
  }
  document.addEventListener("visibilitychange", onVisible)
  return () => document.removeEventListener("visibilitychange", onVisible)
}

export { gsap, ScrollTrigger }
