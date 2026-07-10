"use client"

import { useEffect, useMemo, useState } from "react"

/*
 * Tracks which page section currently occupies the reading band of the
 * viewport (40% from the top). One observer for all sections. Observing
 * the hero ("top") clears the active state so nothing reads as current
 * while the visitor is above the first section.
 */
export function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState("")
  const key = useMemo(() => ids.join(","), [ids])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id === "top" ? "" : entry.target.id)
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    )

    for (const id of ["top", ...key.split(",")]) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [key])

  return active
}
