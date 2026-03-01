import { useEffect, useState, type RefObject } from "react"

export function useScrollReveal(
  ref: RefObject<HTMLElement | null>,
  threshold = 0.15
) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, threshold])

  return isVisible
}
