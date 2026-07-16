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
 * Featured case study. Every project occupies a different composition:
 * sides alternate, but column spans, vertical offsets, and alignment vary
 * per index so the eye zig-zags instead of scrolling a repeated card.
 * Media frames are layout-final placeholders until real screenshots land.
 */
const COMPOSITIONS = [
  // 1 · ChessMate: text left, large media right, media dips below the text
  { text: "lg:col-span-5", media: "lg:col-span-7 lg:mt-14", mediaLeft: false, align: "items-start" },
  // 2 · Mirror: media left riding high, text right vertically centered
  { text: "lg:col-span-6 lg:self-center lg:pl-6", media: "lg:col-span-6 lg:-mt-6", mediaLeft: true, align: "items-start" },
  // 3 · Torch: narrow text left, widest media right rising above the baseline
  { text: "lg:col-span-4", media: "lg:col-span-8 lg:-mt-10", mediaLeft: false, align: "items-start" },
]

function CaseStudy({ project, index }: { project: Project; index: number }) {
  const url = liveUrl(project)
  const comp = COMPOSITIONS[index % COMPOSITIONS.length]
  const { mediaLeft } = comp
  const isLead = index === 0

  return (
    <Reveal index={Math.min(index, 2)}>
      <article className={cn("group grid gap-8 lg:grid-cols-12 lg:gap-12", comp.align)}>
        {/* Text column */}
        <div className={cn(comp.text, mediaLeft && "lg:order-2")}>
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
        <div className={cn(comp.media, mediaLeft && "lg:order-1")}>
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
      <div className="flex flex-col gap-16 lg:gap-20">
        {featured.map((project, i) => (
          <CaseStudy key={project.title} project={project} index={i} />
        ))}
      </div>
    </Section>
  )
}
