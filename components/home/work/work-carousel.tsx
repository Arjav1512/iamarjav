"use client"

import { useState, type KeyboardEvent, type ReactNode } from "react"
import { workProjects } from "@/data/content"
import { PenArrow } from "../icons"
import { ProjectInfo } from "./project-info"

/* Card slots, exactly as the reference's POS table. */
const POS = {
  center: { transform: "translateX(-50%) rotate(0deg) scale(1)", zIndex: 3, opacity: 1 },
  next: { transform: "translateX(calc(-50% + 76%)) rotate(5deg) scale(0.82)", zIndex: 2, opacity: 0.9 },
  prev: { transform: "translateX(calc(-50% - 76%)) rotate(-5deg) scale(0.82)", zIndex: 1, opacity: 0.9 },
} as const

/* The active card's red-pen note; offsets differ per card. */
const PEN_NOTES: { lines: [string, string]; position: string }[] = [
  { lines: ["the engine was", "the easy part"], position: "right-[-34px] top-[-46px]" },
  { lines: ["taught me more", "about me"], position: "right-[-30px] top-[-48px]" },
  { lines: ["not lit yet.", "soon."], position: "right-[-24px] top-[-46px]" },
]

const count = workProjects.length

/**
 * Selected-work carousel + active project info. The three card faces are
 * server-rendered and passed in as `panels`, in workProjects order.
 */
export function WorkCarousel({ panels }: { panels: ReactNode[] }) {
  const [active, setActive] = useState(0)
  const [notesOpen, setNotesOpen] = useState(false)

  const go = (i: number) => setActive(((i % count) + count) % count)

  // ←/→ move the carousel while focus is inside it or on the prev/next buttons.
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft") go(active - 1)
    else if (event.key === "ArrowRight") go(active + 1)
  }

  return (
    <>
      <div className="carousel relative overflow-hidden box-border pt-[52px]" onKeyDown={onKeyDown}>
        {workProjects.map((project, i) => {
          const offset = (i - active + count) % count
          const slot = offset === 0 ? POS.center : offset === 1 ? POS.next : POS.prev
          const isActive = offset === 0
          const pen = PEN_NOTES[i]
          return (
            <div key={project.name} className="card stage absolute left-1/2 top-[52px] rounded-[28px]" style={slot}>
              <div aria-hidden={isActive ? undefined : true}>{panels[i]}</div>
              {isActive ? (
                <div className={`pen-note absolute ${pen.position} flex gap-[6px] items-end [transform:rotate(4deg)] pointer-events-none`}>
                  <span className="f-pen font-semibold text-[30px] leading-[0.9] text-[#D9381E] text-right">
                    {pen.lines[0]}
                    <br />
                    {pen.lines[1]}
                  </span>
                  <PenArrow />
                </div>
              ) : (
                <button
                  type="button"
                  aria-label={`Show ${project.name}`}
                  onClick={() => go(i)}
                  className="absolute inset-0 border-0 bg-transparent cursor-pointer rounded-[28px]"
                />
              )}
            </div>
          )
        })}
      </div>

      <ProjectInfo
        project={workProjects[active]}
        notesOpen={notesOpen}
        onPrev={() => go(active - 1)}
        onNext={() => go(active + 1)}
        onToggleNotes={() => setNotesOpen((open) => !open)}
        onKeyDown={onKeyDown}
      />
    </>
  )
}
