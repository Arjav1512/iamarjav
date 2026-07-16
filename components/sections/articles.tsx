import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { articles } from "@/data/content"
import { Section } from "@/components/primitives/section"
import { Reveal } from "@/components/primitives/reveal"

/*
 * Editorial article list: title, teaser, arrow. Each row routes to its own
 * article page (production routing; pieces are drafts for now and say so).
 */
export function ArticlesSection() {
  return (
    <Section id="articles" index={4} title="Articles">
      <Reveal>
        <ul>
          {articles.map((article, i) => (
            <li
              key={article.slug}
              className={
                "group relative border-b border-border" + (i === 0 ? " border-t" : "")
              }
            >
              <Link
                href={`/articles/${article.slug}`}
                className="flex items-baseline justify-between gap-6 py-6"
              >
                <div className="min-w-0">
                  <h3 className="font-display text-lg font-semibold tracking-tight text-foreground transition-colors duration-(--duration-hover) group-hover:text-accent sm:text-xl">
                    {article.title}
                  </h3>
                  <p className="mt-1.5 max-w-prose text-sm leading-relaxed text-muted-foreground">
                    {article.teaser}
                  </p>
                  {article.status === "draft" && (
                    <p className="mt-2 font-mono text-[11px] text-muted-foreground">
                      coming soon
                    </p>
                  )}
                </div>
                <ArrowUpRight
                  className="size-4 shrink-0 self-center text-muted-foreground transition-all duration-(--duration-hover) group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground motion-reduce:transition-none"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  )
}
