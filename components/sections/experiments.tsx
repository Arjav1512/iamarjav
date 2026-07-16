import { ArrowUpRight } from "lucide-react"
import { experiments, projects, type Project } from "@/data/content"
import { Reveal } from "@/components/primitives/reveal"

const hasUrl = (url?: string) => !!url && url !== "#"
const primaryUrl = (p: Project) =>
  hasUrl(p.demo) ? p.demo : hasUrl(p.github) ? p.github : undefined

/*
 * Editorial break + compact list. Deliberately lighter than the numbered
 * sections: one honest paragraph about why these do not get case studies,
 * then title / one sentence / link rows. No cards.
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
        <ul>
          {minor.map((project, i) => {
            const url = primaryUrl(project)
            return (
              <li
                key={project.title}
                className={
                  "group relative border-b border-border py-5" + (i === 0 ? " border-t" : "")
                }
              >
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
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
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {project.tagline}
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      </Reveal>
    </section>
  )
}
