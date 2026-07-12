import { Github, ArrowUpRight } from "lucide-react"
import { projects, type Project } from "@/data/content"
import { Section } from "@/components/primitives/section"
import { Reveal } from "@/components/primitives/reveal"
import { Tag } from "@/components/primitives/tag"
import { cn } from "@/lib/utils"

const hasUrl = (url?: string) => !!url && url !== "#"
const primaryUrl = (p: Project) =>
  hasUrl(p.demo) ? p.demo : hasUrl(p.github) ? p.github : undefined

/** "https://usemirror.dev/x" → "usemirror.dev/x" for the frame's address bar. */
const displayUrl = (url: string) =>
  url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")

const statusLabel = (p: Project) => (p.inProgress ? "in progress" : "shipped")

/*
 * Browser-chrome frame. Renders `project.media` when it exists; until then
 * the body is a designed typographic cover — the wordmark on a quiet
 * surface, never a gray placeholder. Swapping in a real screenshot/GIF is
 * a content change only; the layout is identical in both states.
 */
function BrowserFrame({ project }: { project: Project }) {
  const url = primaryUrl(project)

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card transition-colors duration-(--duration-hover) group-hover:border-foreground/20">
      <div className="flex items-center gap-4 border-b border-border px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2 rounded-full bg-border" />
          <span className="size-2 rounded-full bg-border" />
          <span className="size-2 rounded-full bg-border" />
        </span>
        <span className="min-w-0 flex-1 truncate text-center font-mono text-[11px] text-muted-foreground">
          {url ? displayUrl(url) : `${project.title.toLowerCase().replace(/\s+/g, "")} (coming soon)`}
        </span>
        <span className="w-[42px]" aria-hidden="true" />
      </div>
      {project.media ? (
        <img
          src={project.media.src}
          alt={project.media.alt}
          loading="lazy"
          className="aspect-[16/9] w-full bg-secondary/40 object-cover object-top sm:aspect-[2/1]"
        />
      ) : (
        <div className="flex aspect-[16/9] items-center justify-center bg-secondary/40 sm:aspect-[2/1]">
          <span
            className="font-display text-3xl font-bold tracking-tight text-foreground/75 transition-colors duration-(--duration-hover) group-hover:text-foreground sm:text-5xl"
            aria-hidden="true"
          >
            {project.title}
          </span>
        </div>
      )}
    </div>
  )
}

function ProjectLinks({ project, className }: { project: Project; className?: string }) {
  const demoLabel = /youtu\.?be/.test(project.demo) ? "Demo" : "Live"

  return (
    <div className={cn("relative z-10 flex items-center gap-5", className)}>
      {hasUrl(project.demo) && (
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="group/live inline-flex items-center gap-1 text-sm font-medium text-foreground transition-colors duration-(--duration-hover) hover:text-accent"
        >
          {demoLabel}
          <ArrowUpRight
            className="size-3.5 transition-transform duration-(--duration-hover) group-hover/live:translate-x-0.5 group-hover/live:-translate-y-0.5 motion-reduce:transition-none"
            aria-hidden="true"
          />
          <span className="sr-only">, {project.title}</span>
        </a>
      )}
      {hasUrl(project.github) && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors duration-(--duration-hover) hover:text-foreground"
        >
          <Github className="size-3.5" aria-hidden="true" />
          Code
          <span className="sr-only">, {project.title}</span>
        </a>
      )}
    </div>
  )
}

/*
 * Featured entry — a small product launch page: media frame, title,
 * thesis, then the story ("why it exists" / "what it is"), meta, CTAs.
 * The title is a stretched link over the whole entry (a real anchor);
 * inner links sit above it on their own layer.
 */
function FeaturedProject({ project, index }: { project: Project; index: number }) {
  const url = primaryUrl(project)

  return (
    <Reveal index={index}>
      <article className="group relative">
        <BrowserFrame project={project} />

        <div className="mt-6 sm:mt-8">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              {url ? (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="after:absolute after:inset-0 after:rounded-xl"
                >
                  {project.title}
                  <ArrowUpRight
                    className="ml-1.5 inline size-4 -translate-y-0.5 text-muted-foreground transition-all duration-(--duration-hover) group-hover:translate-x-0.5 group-hover:-translate-y-1 group-hover:text-foreground motion-reduce:transition-none"
                    aria-hidden="true"
                  />
                </a>
              ) : (
                project.title
              )}
            </h3>
            <span className="font-mono text-xs text-muted-foreground">
              {statusLabel(project)}
              {project.context && ` · ${project.context}`}
            </span>
          </div>

          <p className="mt-3 max-w-prose text-base font-medium leading-relaxed text-foreground sm:text-lg">
            {project.tagline}
          </p>

          <div className="mt-5 grid gap-5 sm:grid-cols-2 sm:gap-10">
            {project.problem && (
              <div>
                <h4 className="mb-2 font-mono text-[11px] text-muted-foreground">
                  why it exists
                </h4>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {project.problem}
                </p>
              </div>
            )}
            <div>
              <h4 className="mb-2 font-mono text-[11px] text-muted-foreground">
                what it is
              </h4>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>

          <ProjectLinks project={project} className="mt-6" />
        </div>
      </article>
    </Reveal>
  )
}

/*
 * Secondary entry: one hairline-separated row. No frame, no card — the
 * honest tier for work without a public artifact to point at.
 */
function ProjectRow({ project }: { project: Project }) {
  const url = primaryUrl(project)

  return (
    <li className="group relative border-t border-border py-6 last:border-b">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="font-display text-base font-semibold tracking-tight text-foreground">
          {url ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="after:absolute after:inset-0"
            >
              {project.title}
              <ArrowUpRight
                className="ml-1.5 inline size-3.5 -translate-y-0.5 text-muted-foreground transition-all duration-(--duration-hover) group-hover:translate-x-0.5 group-hover:-translate-y-1 group-hover:text-foreground motion-reduce:transition-none"
                aria-hidden="true"
              />
            </a>
          ) : (
            project.title
          )}
        </h3>
        <span className="font-mono text-xs text-muted-foreground">
          {statusLabel(project)}
          {project.context && ` · ${project.context}`}
        </span>
      </div>
      <p className="mt-1.5 max-w-prose text-sm leading-relaxed text-muted-foreground">
        {project.tagline}
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.tech.slice(0, 4).map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>
    </li>
  )
}

export function WorkSection() {
  const featured = projects.filter((p) => p.featured)
  const secondary = projects.filter((p) => !p.featured)

  return (
    <Section id="projects" index={1} title="Selected Work">
      <div className="flex flex-col gap-24 lg:gap-32">
        {featured.map((project, i) => (
          <FeaturedProject key={project.title} project={project} index={i} />
        ))}
      </div>

      {secondary.length > 0 && (
        <Reveal className="mt-24 lg:mt-28">
          <h3 className="mb-6 font-mono text-xs text-muted-foreground">more work</h3>
          <ul>
            {secondary.map((project) => (
              <ProjectRow key={project.title} project={project} />
            ))}
          </ul>
        </Reveal>
      )}
    </Section>
  )
}
