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

  const content = (
    <div className="group relative">
      {/* Hover background card */}
      <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-lg transition-all duration-300 motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-card/60 lg:group-hover:shadow-md" />

      {/* Content wrapper */}
      <div className="z-10 relative">
        {/* Top row: Status and links */}
        <div className="flex items-start justify-between mb-3">
          <div>
            {"inProgress" in project && project.inProgress ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-xs font-medium text-primary">
                <Clock className="size-3" />
                In Progress
              </span>
            ) : (
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
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
        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
          {project.title}
          {primaryLink && (
            <ArrowUpRight className="inline-block ml-2 size-4 -translate-y-0.5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          )}
        </h3>

        {/* Description */}
        <p className="text-sm leading-relaxed text-muted-foreground mb-4">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <Badge
              key={t}
              variant="secondary"
              className="rounded px-2.5 py-1 bg-muted text-xs font-medium text-muted-foreground hover:bg-muted-foreground/10 transition-colors"
            >
              {t}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )

  if (primaryLink) {
    return (
      <li className="mb-8 pb-8 border-b border-border last:mb-0 last:pb-0 last:border-0">
        <div
          className="block cursor-pointer transition-opacity duration-300"
          onClick={() => window.open(primaryLink, "_blank", "noopener,noreferrer")}
          role="link"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault()
              window.open(primaryLink, "_blank", "noopener,noreferrer")
            }
          }}
        >
          {content}
        </div>
      </li>
    )
  }

  return (
    <li className="mb-8 pb-8 border-b border-border last:mb-0 last:pb-0 last:border-0">
      {content}
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
      <div className="sticky top-0 z-20 -mx-6 mb-4 bg-background/75 px-6 py-5 backdrop-blur-sm md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-0 lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-foreground lg:sr-only">
          Projects
        </h2>
      </div>

      <div
        ref={listRef}
        className="will-change-transform"
        style={{ transform: `translateY(${listOffset}px)` }}
      >
        <ol className="group/list">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </ol>
      </div>
    </section>
  )
}
