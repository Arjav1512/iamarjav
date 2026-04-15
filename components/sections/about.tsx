"use client"

import { useRef } from "react"
import { aboutParagraphs, education, certifications, coreStrengths } from "@/data/content"
import { Badge } from "@/components/ui/badge"
import { useParallax } from "@/hooks/use-parallax"

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const strengthsRef = useRef<HTMLDivElement>(null)
  const eduRef = useRef<HTMLDivElement>(null)

  const sectionOffset = useParallax(sectionRef, { speed: 0.015, maxOffset: 12 })
  const strengthsOffset = useParallax(strengthsRef, { speed: 0.02, maxOffset: 10 })
  const eduOffset = useParallax(eduRef, { speed: 0.02, maxOffset: 10 })

  return (
    <section
      id="about"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
      aria-label="About me"
    >
      {/* Mobile sticky header */}
      <div className="sticky top-0 z-20 -mx-6 mb-4 bg-background/75 px-6 py-5 backdrop-blur-sm md:-mx-12 md:px-12 lg:hidden">
        <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">
          About
        </h2>
      </div>

      {/* Desktop section heading */}
      <div className="hidden lg:flex items-center gap-4 mb-10" aria-hidden="true">
        <span className="text-xs font-bold uppercase tracking-widest text-foreground/70 shrink-0">
          About
        </span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* About paragraphs */}
      <div
        ref={sectionRef}
        className="mb-8 will-change-transform"
        style={{ transform: `translateY(${sectionOffset}px)` }}
      >
        <div className="space-y-5">
          {aboutParagraphs.map((p, i) => (
            <p
              key={i}
              className="text-base leading-relaxed text-foreground"
            >
              {p}
            </p>
          ))}
        </div>
      </div>

      {/* Core Strengths */}
      <div
        ref={strengthsRef}
        className="will-change-transform"
        style={{ transform: `translateY(${strengthsOffset}px)` }}
      >
        <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Core Strengths
        </h3>
        <div className="flex flex-wrap gap-2">
          {coreStrengths.map((s) => (
            <Badge
              key={s}
              variant="secondary"
              className="rounded-full px-3 py-1.5 text-xs font-medium bg-primary/10 text-primary/80 border border-primary/20 hover:bg-primary/15 transition-colors"
            >
              {s}
            </Badge>
          ))}
        </div>
      </div>

      {/* Two column layout for Education and Certifications */}
      <div
        ref={eduRef}
        className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 will-change-transform"
        style={{ transform: `translateY(${eduOffset}px)` }}
      >
        {/* Education */}
        <div className="rounded-xl border border-border bg-card/40 p-5">
          <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Education
          </h3>
          <p className="text-sm font-semibold text-foreground">
            {education.university}
          </p>
          <p className="mt-1 text-xs text-muted-foreground font-medium leading-relaxed">
            {education.degree}
          </p>
          <p className="mt-2 text-xs text-muted-foreground/70">
            {education.period}
          </p>
        </div>

        {/* Certifications */}
        <div className="rounded-xl border border-border bg-card/40 p-5">
          <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Certifications
          </h3>
          <ul className="space-y-2">
            {certifications.map((cert) => (
              <li
                key={cert}
                className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed"
              >
                <span className="mt-1.5 size-1 flex-shrink-0 rounded-full bg-primary/50" aria-hidden="true" />
                {cert}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
