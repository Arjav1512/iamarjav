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
      <div className="sticky top-0 z-20 -mx-6 mb-4 bg-background/75 px-6 py-5 backdrop-blur-sm md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-0 lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-foreground lg:sr-only">
          Skills
        </h2>
      </div>

      <div
        ref={gridRef}
        className="grid gap-12 sm:grid-cols-2 will-change-transform"
        style={{ transform: `translateY(${gridOffset}px)` }}
      >
        {Object.entries(skills).map(([key, category]) => {
          const Icon = iconMap[key] || Code2
          return (
            <div key={key} className="border-l-2 border-border pl-4">
              <div className="mb-4 flex items-start gap-3">
                <Icon className="size-5 text-primary mt-0.5 flex-shrink-0" />
                <h3 className="text-sm font-semibold tracking-wide text-foreground">
                  {category.label}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.items.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="rounded px-2.5 py-1 text-xs font-medium bg-muted text-muted-foreground hover:bg-muted-foreground/10 transition-colors"
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
