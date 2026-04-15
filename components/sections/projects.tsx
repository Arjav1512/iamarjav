"use client"

import { useRef } from "react"
import { ExternalLink, Github, Clock, ArrowUpRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { projects } from "@/data/content"
import { useParallax } from "@/hooks/use-parallax"

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  const hasDemo = project.demo !== "#"
  const hasGithub = project.github !== "#"
  const primaryLink = hasDemo ? project.demo : hasGithub ? project.github : undefined
  const isClickable = !!primaryLink

  return (
    <li className="mb-4 last:mb-0">
      <div
        className={`group relative rounded-xl border border-border bg-card/30 p-5 transition-all duration-300 card-hover ${
          isClickable
            ? "cursor-pointer hover:border-primary/20 hover:bg-card"
            : ""
        }`}
        onClick={
          isClickable
            ? () => window.open(primaryLink, "_blank", "noopener,noreferrer")
            : undefined
        }
        role={isClickable ? "link" : undefined}
        tabIndex={isClickable ? 0 : undefined}
        onKeyDown={
          isClickable
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  window.open(primaryLink, "_blank", "noopener,noreferrer")
                }
              }
            : undefined
        }
      >
        {/* Top row: Status and links */}
        <div className="flex items-start justify-between mb-3">
          <div>
            {"inProgress" in project && project.inProgress ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-xs font-medium text-primary border border-primary/15">
                <Clock className="size-3" />
                In Progress
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted text-[11px] font-semibold uppercase tracking-wider text-muted-foreground border border-border/60">
                Shipped
              </span>
            )}
          </div>

          {/* Links */}
          <div className="flex items-center gap-3">
            {hasGithub && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
                aria-label={`${project.title} GitHub`}
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="size-4" />
                <span className="hidden sm:inline">Code</span>
              </a>
            )}
            {hasDemo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
                aria-label={`${project.title} live demo`}
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="size-4" />
                <span className="hidden sm:inline">Live</span>
              </a>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
          {project.title}
          {primaryLink && (
            <ArrowUpRight className="inline-block ml-1.5 size-4 -translate-y-0.5 opacity-50 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-1" />
          )}
        </h3>

        {/* Description */}
        <p className="text-sm leading-relaxed text-muted-foreground mb-4">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <Badge
              key={t}
              variant="secondary"
              className="rounded-full px-2.5 py-0.5 bg-muted/80 text-[11px] font-medium text-muted-foreground border-border/60 hover:bg-muted transition-colors"
            >
              {t}
            </Badge>
          ))}
        </div>
      </div>
    </li>
  )
}

export function ProjectsSection() {
  const listRef = useRef<HTMLDivElement>(null)
  const listOffset = useParallax(listRef, { speed: 0.015, maxOffset: 12 })

  return (
    <section
      id="projects"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
      aria-label="Selected projects"
    >
      {/* Mobile sticky header */}
      <div className="sticky top-0 z-20 -mx-6 mb-4 bg-background/75 px-6 py-5 backdrop-blur-sm md:-mx-12 md:px-12 lg:hidden">
        <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">
          Projects
        </h2>
      </div>

      {/* Desktop section heading */}
      <div className="hidden lg:flex items-center gap-4 mb-10" aria-hidden="true">
        <span className="text-xs font-bold uppercase tracking-widest text-foreground/70 shrink-0">
          Projects
        </span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <div
        ref={listRef}
        className="will-change-transform"
        style={{ transform: `translateY(${listOffset}px)` }}
      >
        <ol>
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </ol>
      </div>
    </section>
  )
}
