"use client"

import { useEffect, useRef, useState, type RefObject } from "react"

/*
 * One IntersectionObserver shared by every revealed element on the page.
 * Fires once per element, then forgets it — reveals never re-trigger.
 */
let sharedObserver: IntersectionObserver | null = null
const callbacks = new WeakMap<Element, () => void>()

function getObserver() {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            callbacks.get(entry.target)?.()
            callbacks.delete(entry.target)
            sharedObserver?.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    )
  }
  return sharedObserver
}

export function useReveal<T extends HTMLElement>(): [RefObject<T | null>, boolean] {
  const ref = useRef<T>(null)
  const [isRevealed, setIsRevealed] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsRevealed(true)
      return
    }

    const observer = getObserver()
    callbacks.set(el, () => setIsRevealed(true))
    observer.observe(el)

    return () => {
      callbacks.delete(el)
      observer.unobserve(el)
    }
  }, [])

  return [ref, isRevealed]
}
