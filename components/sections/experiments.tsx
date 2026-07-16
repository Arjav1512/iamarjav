import { ArrowUpRight } from "lucide-react"
import { experiments, projects, type Project } from "@/data/content"
import { Reveal } from "@/components/primitives/reveal"
import { cn } from "@/lib/utils"

const hasUrl = (url?: string) => !!url && url !== "#"
const primaryUrl = (p: Project) =>
  hasUrl(p.demo) ? p.demo : hasUrl(p.github) ? p.github : undefined

/* Each object sits on the bench at its own slight angle and height; hover
   picks it up (straightens it). Values stay subtle so it reads workshop,
   not scrapbook. */
const BENCH_PLACEMENT = [
  "-rotate-1",
  "rotate-[0.75deg] lg:translate-y-4",
  "-rotate-[0.5deg] lg:-translate-y-1",
]

/*
 * The workbench: one honest paragraph about why these do not get case
 * studies, then the small builds laid out as tagged objects on a dotted
 * bench surface. Deliberately the only section that is not a list, table
 * or timeline.
 */
export function ExperimentsSection() {
  const minor = projects.filter((p) => !p.featured)

  return (
    <section
      id="experiments"
      aria-label="Experiments and minor projects"
      className="mb-(--spacing-section-sm) scroll-mt-24 lg:mb-(--spacing-section)"
    >
      <Reveal>
        <p className="max-w-prose font-display text-lg font-medium leading-relaxed tracking-tight text-foreground sm:text-xl">
          {experiments.intro}
        </p>
      </Reveal>

      <Reveal index={1} className="mt-10">
        <div
          className="relative rounded-xl border border-border bg-card/30 px-6 pb-8 pt-12 sm:px-10 sm:pb-10"
          style={{
            backgroundImage: "radial-gradient(var(--border) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        >
          <span className="absolute left-6 top-4 font-mono text-[10px] tracking-wide text-muted-foreground sm:left-10">
            the bench
          </span>
          <ul className="flex flex-wrap gap-5 lg:gap-8">
            {minor.map((project, i) => {
              const url = primaryUrl(project)
              return (
                <li
                  key={project.title}
                  className={cn(
                    "group relative max-w-[34ch] flex-1 basis-[16rem] rounded-lg border border-border bg-background p-5",
                    "shadow-[0_1px_2px_oklch(0.16_0.01_270/0.04),0_4px_10px_oklch(0.16_0.01_270/0.05)]",
                    "transition-transform duration-(--duration-hover) hover:rotate-0 hover:-translate-y-0.5 motion-reduce:transition-none",
                    BENCH_PLACEMENT[i % BENCH_PLACEMENT.length]
                  )}
                >
                  <p className="font-mono text-[10px] tracking-wide text-muted-foreground">
                    exp-{String(i + 1).padStart(2, "0")}
                    {project.context && ` · ${project.context}`}
                  </p>
                  <h3 className="mt-2.5 font-display text-base font-semibold tracking-tight text-foreground">
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
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {project.tagline}
                  </p>
                </li>
              )
            })}
          </ul>
        </div>
      </Reveal>
    </section>
  )
}
