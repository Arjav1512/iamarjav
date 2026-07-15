"use client"

import { useRef, useState } from "react"
import type { Milestone } from "@/data/content"
import { gsap, MOTION, useIsomorphicLayoutEffect } from "@/lib/motion"
import { cn } from "@/lib/utils"

/*
 * Horizontal journey. On desktop with motion allowed, the section pins and
 * vertical scroll pans the track horizontally (canonical pin/scrub: start
 * "top top", end = horizontal distance, scrub 1). A hairline progress line
 * fills as you travel and the milestone nearest the playhead activates.
 *
 * Fallbacks, no hijack anywhere else: reduced-motion or no-JS desktop gets
 * a plain horizontally scrollable track (overflow-x-auto is the default and
 * is only locked to hidden while the pin drives it); below lg the timeline
 * renders as a vertical list. gsap.matchMedia reverts everything cleanly.
 */
export function JourneyTimeline({ milestones }: { milestones: Milestone[] }) {
  const wrap = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLOListElement>(null)
  const progress = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  useIsomorphicLayoutEffect(() => {
    if (!wrap.current || !track.current) return
    const mm = gsap.matchMedia()

    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const wrapEl = wrap.current!
      const trackEl = track.current!
      const distance = () => trackEl.scrollWidth - wrapEl.clientWidth

      wrapEl.classList.remove("overflow-x-auto")
      wrapEl.classList.add("overflow-hidden")

      const pan = gsap.to(trackEl, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: wrapEl,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setActive(Math.round(self.progress * (milestones.length - 1)))
          },
        },
      })

      if (progress.current) {
        gsap.fromTo(
          progress.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: wrapEl,
              start: "top top",
              end: () => `+=${distance()}`,
              scrub: 1,
            },
          }
        )
      }

      return () => {
        pan.scrollTrigger?.kill()
        wrapEl.classList.add("overflow-x-auto")
        wrapEl.classList.remove("overflow-hidden")
      }
    })

    return () => mm.revert()
  }, [milestones.length])

  return (
    <>
      {/* Desktop: pinned horizontal pan (scrollable region when unpinned) */}
      <div
        ref={wrap}
        className="relative hidden overflow-x-auto lg:flex lg:min-h-[100dvh] lg:flex-col lg:justify-center"
      >
        <div className="relative">
          {/* Track line + scrubbed progress overlay */}
          <div className="pointer-events-none absolute left-0 top-[7px] h-px w-full bg-border" aria-hidden="true" />
          <div
            ref={progress}
            className="pointer-events-none absolute left-0 top-[7px] h-px w-full origin-left scale-x-0 bg-accent"
            aria-hidden="true"
          />
          <ol ref={track} className="flex w-max gap-20 pr-[30vw]">
            {milestones.map((m, i) => (
              <li key={m.title} className="w-72 shrink-0">
                <span
                  className={cn(
                    "relative z-10 block size-[15px] rounded-full border-2 border-background transition-colors duration-(--duration-hover)",
                    i <= active ? "bg-accent" : "bg-border"
                  )}
                  aria-hidden="true"
                />
                <p className="mt-5 font-mono text-xs text-muted-foreground">{m.year}</p>
                <h4
                  className={cn(
                    "mt-1.5 font-display text-xl font-semibold tracking-tight transition-colors duration-(--duration-hover)",
                    i === active ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {m.title}
                </h4>
                <p className="mt-2 max-w-[26ch] text-sm leading-relaxed text-muted-foreground">
                  {m.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Mobile: vertical list along a hairline */}
      <ol className="border-l border-border pl-6 lg:hidden">
        {milestones.map((m) => (
          <li key={m.title} className="relative pb-10 last:pb-0">
            <span
              className="absolute -left-[30px] top-1.5 block size-2 rounded-full bg-accent"
              aria-hidden="true"
            />
            <p className="font-mono text-xs text-muted-foreground">{m.year}</p>
            <h4 className="mt-1 font-display text-lg font-semibold tracking-tight text-foreground">
              {m.title}
            </h4>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              {m.description}
            </p>
          </li>
        ))}
      </ol>
    </>
  )
}
