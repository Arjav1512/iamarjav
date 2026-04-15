"use client"

import { useRef } from "react"
import { Badge } from "@/components/ui/badge"
import { skills } from "@/data/content"
import { Code2, Layers, Brain, Palette } from "lucide-react"
import { useParallax } from "@/hooks/use-parallax"

const iconMap: Record<string, React.ElementType> = {
  languages: Code2,
  frameworks: Layers,
  aiml: Brain,
  product: Palette,
}

export function SkillsSection() {
  const gridRef = useRef<HTMLDivElement>(null)
  const gridOffset = useParallax(gridRef, { speed: 0.015, maxOffset: 12 })

  return (
    <section
      id="skills"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
      aria-label="Technical skills"
    >
      {/* Mobile sticky header */}
      <div className="sticky top-0 z-20 -mx-6 mb-4 bg-background/75 px-6 py-5 backdrop-blur-sm md:-mx-12 md:px-12 lg:hidden">
        <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">
          Skills
        </h2>
      </div>

      {/* Desktop section heading */}
      <div className="hidden lg:flex items-center gap-4 mb-10" aria-hidden="true">
        <span className="text-xs font-bold uppercase tracking-widest text-foreground/70 shrink-0">
          Skills
        </span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <div
        ref={gridRef}
        className="grid gap-4 sm:grid-cols-2 will-change-transform"
        style={{ transform: `translateY(${gridOffset}px)` }}
      >
        {Object.entries(skills).map(([key, category]) => {
          const Icon = iconMap[key] || Code2
          return (
            <div
              key={key}
              className="rounded-xl border border-border bg-card/40 p-5 transition-all duration-300 card-hover hover:border-primary/20 hover:bg-card"
            >
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="size-4 text-primary" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">
                  {category.label}
                </h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {category.items.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="rounded-full px-2.5 py-0.5 text-[11px] font-medium bg-muted/80 text-muted-foreground border-border/60 hover:bg-muted transition-colors"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
