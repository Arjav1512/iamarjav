import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { articles, siteConfig } from "@/data/content"
import { getArticleBody } from "@/lib/articles"
import { ArticleBody } from "@/components/article-body"

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = articles.find((a) => a.slug === slug)
  if (!article) return {}
  return {
    title: article.title,
    description: article.teaser,
    // The root layout's canonical is "/"; each essay is its own canonical page.
    alternates: { canonical: `/articles/${article.slug}` },
    openGraph: {
      type: "article",
      url: `/articles/${article.slug}`,
      title: article.title,
      description: article.teaser,
      // Setting openGraph here replaces the root's, so restate the site card.
      images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
    },
    // Drafts stay out of search until the piece is actually written; published
    // essays inherit the root robots policy (an explicit undefined would drop it).
    ...(article.status === "draft" && { robots: { index: false, follow: false } }),
  }
}

/*
 * Essay page. Reading-first: the title block keeps the site's display
 * voice, the body sits at a ~65ch measure in Inter, and the mono layer
 * (index, reading time, section numerals) carries the same grammar as the
 * home page's section headers. Drafts keep their honest placeholder.
 */
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const index = articles.findIndex((a) => a.slug === slug)
  const article = articles[index]
  if (!article) notFound()

  const body = article.status === "published" ? getArticleBody(article.slug) : null

  // Up next: the following published essay, wrapping around the list.
  const published = articles.filter((a) => a.status === "published")
  const position = published.findIndex((a) => a.slug === article.slug)
  const next =
    position === -1 || published.length < 2 ? null : published[(position + 1) % published.length]

  return (
    <main className="mx-auto max-w-3xl px-6 pb-24 pt-16 md:px-12 lg:pb-32 lg:pt-24">
      <Link
        href="/#articles"
        className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors duration-(--duration-hover) hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" aria-hidden="true" />
        {siteConfig.name.toLowerCase()}
      </Link>

      <article className="mt-12 sm:mt-16">
        <header>
          <p className="flex items-center gap-3 font-mono text-[11px] text-muted-foreground">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <span className="h-px w-6 bg-border" aria-hidden="true" />
            <span>
              essay
              {body && ` · ${body.readingMinutes} min read`}
            </span>
          </p>
          <h1 className="mt-5 font-display text-[2.5rem] font-bold leading-[1.04] tracking-[-0.03em] text-foreground sm:text-6xl">
            {article.title}
          </h1>
          <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {article.teaser}
          </p>
        </header>

        {body ? (
          <div className="mt-12 border-t border-border pt-10 sm:mt-16 sm:pt-14">
            <ArticleBody blocks={body.blocks} />
          </div>
        ) : (
          <div className="mt-12 border-t border-dashed border-border pt-8">
            <p className="font-mono text-xs text-muted-foreground">
              <span className="status-dot mr-2.5" aria-hidden="true" />
              this piece is being written. the full article lands here soon.
            </p>
          </div>
        )}

        {body && (
          <footer className="mt-16 flex flex-wrap items-end justify-between gap-x-8 gap-y-6 border-t border-border pt-8 sm:mt-20">
            <Link
              href="/#articles"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors duration-(--duration-hover) hover:text-foreground"
            >
              <ArrowLeft className="size-3.5" aria-hidden="true" />
              all articles
            </Link>
            {next && (
              <Link href={`/articles/${next.slug}`} className="group ml-auto max-w-sm text-right">
                <span className="block font-mono text-[11px] text-muted-foreground">up next</span>
                <span className="mt-1.5 inline-flex items-center gap-2 font-display text-lg font-semibold tracking-tight text-foreground transition-colors duration-(--duration-hover) group-hover:text-accent">
                  {next.title}
                  <ArrowRight
                    className="size-4 shrink-0 transition-transform duration-(--duration-hover) group-hover:translate-x-0.5 motion-reduce:transition-none"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            )}
          </footer>
        )}
      </article>
    </main>
  )
}
