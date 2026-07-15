import { Github, ArrowUpRight } from "lucide-react"
import { projects, type Project } from "@/data/content"
import { Section } from "@/components/primitives/section"
import { Reveal } from "@/components/primitives/reveal"
import { Tag } from "@/components/primitives/tag"
import { BrowserFrame } from "@/components/browser-frame"
import { cn } from "@/lib/utils"

const hasUrl = (url?: string) => !!url && url !== "#"
const liveUrl = (p: Project) => (hasUrl(p.demo) ? p.demo : undefined)

const statusLabel = (p: Project) => (p.inProgress ? "in progress" : "shipped")

function StoryBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="mb-2 font-mono text-[11px] text-muted-foreground">{label}</h4>
      <p className="text-sm leading-relaxed text-muted-foreground">{children}</p>
    </div>
  )
}

/*
 * Featured case study. Text and media split an editorial 12-col grid and
 * alternate sides per project; the first project (ChessMate) carries the
 * largest typographic emphasis. Media frames are layout-final placeholders
 * until real screenshots land (content-only swap).
 */
function CaseStudy({ project, index }: { project: Project; index: number }) {
  const url = liveUrl(project)
  const mediaLeft = index % 2 === 1
  const isLead = index === 0

  return (
    <Reveal index={Math.min(index, 2)}>
      <article className="group grid items-start gap-8 lg:grid-cols-12 lg:gap-12">
        {/* Text column */}
        <div className={cn("lg:col-span-5", mediaLeft && "lg:order-2")}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 lg:block">
            <h3
              className={cn(
                "font-display font-bold tracking-tight text-foreground",
                isLead ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"
              )}
            >
              {project.title}
            </h3>
            <p className="mt-1 font-mono text-xs text-muted-foreground lg:mt-2">
              {statusLabel(project)}
              {project.context && ` · ${project.context}`}
            </p>
          </div>

          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="group/live mt-3 inline-flex items-center gap-1 text-sm font-medium text-foreground transition-colors duration-(--duration-hover) hover:text-accent"
            >
              {url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
              <ArrowUpRight
                className="size-3.5 transition-transform duration-(--duration-hover) group-hover/live:translate-x-0.5 group-hover/live:-translate-y-0.5 motion-reduce:transition-none"
                aria-hidden="true"
              />
            </a>
          )}

          <div className="mt-6 space-y-5">
            {project.problem && <StoryBlock label="the problem">{project.problem}</StoryBlock>}
            <StoryBlock label="what I built">{project.description}</StoryBlock>
            {project.learned && (
              <StoryBlock label="what I learned">{project.learned}</StoryBlock>
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>

          {hasUrl(project.github) && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors duration-(--duration-hover) hover:text-foreground"
            >
              <Github className="size-3.5" aria-hidden="true" />
              Code
              <span className="sr-only">, {project.title}</span>
            </a>
          )}
        </div>

        {/* Media column */}
        <div className={cn("lg:col-span-7", mediaLeft && "lg:order-1")}>
          <BrowserFrame title={project.title} url={url} media={project.media} />
        </div>
      </article>
    </Reveal>
  )
}

export function WorkSection() {
  const featured = projects.filter((p) => p.featured)

  return (
    <Section id="projects" index={1} title="Featured Work">
      <div className="flex flex-col gap-24 lg:gap-32">
        {featured.map((project, i) => (
          <CaseStudy key={project.title} project={project} index={i} />
        ))}
      </div>
    </Section>
  )
}
