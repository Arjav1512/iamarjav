import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { articles } from "@/data/content"
import { Section } from "@/components/primitives/section"
import { Reveal } from "@/components/primitives/reveal"

/*
 * Editorial archive: an index of essays, typography-first. Mono numerals,
 * display titles, one-line teasers, and an honest status column; drafts
 * say "draft", not "coming soon". Each row routes to its article page.
 */
export function ArticlesSection() {
  return (
    <Section id="articles" index={4} title="Articles">
      <Reveal>
        <ol>
          {articles.map((article, i) => (
            <li
              key={article.slug}
              className="group relative border-b border-border first:border-t"
            >
              <Link
                href={`/articles/${article.slug}`}
                className="grid grid-cols-[auto_1fr] gap-x-5 py-7 sm:grid-cols-[auto_1fr_auto] sm:gap-x-8"
              >
                <span
                  className="pt-1.5 font-mono text-[11px] text-muted-foreground"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-xl font-semibold tracking-tight text-foreground transition-colors duration-(--duration-hover) group-hover:text-accent sm:text-2xl">
                    {article.title}
                  </h3>
                  <p className="mt-2 max-w-[52ch] text-sm leading-relaxed text-muted-foreground">
                    {article.teaser}
                  </p>
                  <p className="mt-2.5 font-mono text-[11px] text-muted-foreground sm:hidden">
                    {article.status}
                  </p>
                </div>
                <span className="hidden items-center gap-2 self-start pt-1.5 font-mono text-[11px] text-muted-foreground sm:flex">
                  {article.status}
                  {/* Internal route: a level arrow, not the external ↗ used for outbound links */}
                  <ArrowRight
                    className="size-3.5 transition-transform duration-(--duration-hover) group-hover:translate-x-0.5 motion-reduce:transition-none"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </Reveal>
    </Section>
  )
}
