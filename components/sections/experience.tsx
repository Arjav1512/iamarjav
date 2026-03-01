"use client"

import { useRef } from "react"
import { workExperience, voluntaryExperience } from "@/data/content"
import { useParallax } from "@/hooks/use-parallax"

function ExperienceItem({ entry }: { entry: typeof workExperience[0] }) {
  return (
    <li className="mb-12">
      <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
        {/* Hover background */}
        <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-card/70 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg" />

        {/* Date */}
        <header
          className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:col-span-2"
          aria-label={entry.date}
        >
          {entry.date}
        </header>

        {/* Content */}
        <div className="z-10 sm:col-span-6">
          <h3 className="font-medium leading-snug text-foreground">
            <span className="inline-flex items-baseline text-base font-medium leading-tight text-foreground group-hover:text-primary">
              {entry.role}
              <span className="mx-1.5 text-muted-foreground/60">
                {"·"}
              </span>
              <span className="text-muted-foreground group-hover:text-primary/80">
                {entry.company}
              </span>
            </span>
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {entry.description}
          </p>
          <ul className="mt-3 flex flex-col gap-1" aria-label="Highlights">
            {entry.highlights.map((h) => (
              <li
                key={h}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <span className="mt-2 size-1 shrink-0 rounded-full bg-primary/50" />
                {h}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  )
}

export function ExperienceSection() {
  const workRef = useRef<HTMLDivElement>(null)
  const volRef = useRef<HTMLDivElement>(null)

  const workOffset = useParallax(workRef, { speed: 0.015, maxOffset: 12 })
  const volOffset = useParallax(volRef, { speed: 0.02, maxOffset: 10 })

  return (
    <section
      id="experience"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
      aria-label="Work experience"
    >
      <div className="sticky top-0 z-20 -mx-6 mb-4 bg-background/75 px-6 py-5 backdrop-blur-sm md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-0 lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-foreground lg:sr-only">
          Experience
        </h2>
      </div>

      <div className="space-y-12">
        {/* Work Experience */}
        <div
          ref={workRef}
          className="will-change-transform"
          style={{ transform: `translateY(${workOffset}px)` }}
        >
          <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-foreground">
            Work Experience
          </h3>
          <ol className="group/list">
            {workExperience.map((entry) => (
              <ExperienceItem key={`${entry.role}-${entry.company}`} entry={entry} />
            ))}
          </ol>
        </div>

        {/* Voluntary Experience */}
        <div
          ref={volRef}
          className="will-change-transform"
          style={{ transform: `translateY(${volOffset}px)` }}
        >
          <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-foreground">
            Voluntary & Side Projects
          </h3>
          <ol className="group/list">
            {voluntaryExperience.map((entry) => (
              <ExperienceItem key={`${entry.role}-${entry.company}`} entry={entry} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
