import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ArrowLeft } from "lucide-react"
import { articles, siteConfig } from "@/data/content"

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
    // Drafts stay out of search until the piece is actually written.
    robots: article.status === "draft" ? { index: false, follow: false } : undefined,
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = articles.find((a) => a.slug === slug)
  if (!article) notFound()

  return (
    <main className="mx-auto max-w-3xl px-6 py-16 md:px-12 lg:py-24">
      <Link
        href="/#articles"
        className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors duration-(--duration-hover) hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" aria-hidden="true" />
        {siteConfig.name.toLowerCase()}
      </Link>

      <article className="mt-12">
        <h1 className="font-display text-3xl font-bold leading-[1.05] tracking-[-0.02em] text-foreground sm:text-5xl">
          {article.title}
        </h1>
        <p className="mt-6 max-w-prose text-lg leading-relaxed text-muted-foreground">
          {article.teaser}
        </p>

        {article.status === "draft" && (
          <div className="mt-12 border-t border-dashed border-border pt-8">
            <p className="font-mono text-xs text-muted-foreground">
              <span className="status-dot mr-2.5" aria-hidden="true" />
              this piece is being written. the full article lands here soon.
            </p>
          </div>
        )}
      </article>
    </main>
  )
}
