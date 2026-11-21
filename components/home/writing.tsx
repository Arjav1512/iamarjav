import Link from "next/link"
import { articles } from "@/data/content"
import { cn } from "@/lib/utils"
import { SectionHeader } from "./section-header"

/*
 * The homepage shows three essays, in this order. Titles, teasers and
 * published/draft status come from the shared article index, so the row and
 * the article page can't drift apart.
 */
const FEATURED = ["i-dont-write-99-percent-of-my-code", "i-ship-fast-i-learn-slow", "let-the-robots-solve-utility"]

const rows = FEATURED.map((slug) => {
  const article = articles.find((a) => a.slug === slug)
  if (!article) throw new Error(`Writing: no article with slug "${slug}"`)
  return article
})

const publishedCount = rows.filter((a) => a.status === "published").length
const note = `${publishedCount} published · ${rows.length - publishedCount} in the oven`

export function Writing() {
  return (
    <section id="writing" className="max-w-[1280px] mx-auto box-border py-[112px] px-[32px] flex flex-col gap-[8px]">
      <SectionHeader title="Writing" note={note} className="mb-[8px]" />
      {rows.map((row) => {
        const published = row.status === "published"
        return (
          <Link key={row.slug} href={`/articles/${row.slug}`} className="row flex gap-[24px] justify-between items-center py-[24px] px-[16px] rounded-[16px] no-underline">
            <span className="flex flex-col gap-[8px] min-w-0">
              {/* Published title inherits the link colour (and its hover); drafts are greyed. */}
              <span className={cn("font-medium text-[length:clamp(22px,2.6vw,36px)] leading-[1.1] tracking-[-0.03em]", !published && "text-[#737373]")}>
                {row.title}
              </span>
              <span className="max-w-[60ch] text-[15px] leading-[1.5] text-[#6B6B6B]">{row.teaser}</span>
            </span>
            <span className="flex gap-[16px] items-center flex-none">
              {published ? (
                <span className="py-[5px] px-[10px] rounded-[999px] bg-[#0A0A0A] text-[#FFFFFF] f-mono text-[11px]">published</span>
              ) : (
                <span className="py-[5px] px-[10px] rounded-[999px] border border-dashed border-[#A3A3A3] f-mono text-[11px] text-[#6B6B6B]">draft</span>
              )}
              <svg className="arr" aria-hidden="true" width="22" height="22" viewBox="0 0 22 22" fill="none" stroke={published ? "#0A0A0A" : "#A3A3A3"} strokeWidth="1.6">
                <path d="M3 11 H19 M13 5 L19 11 L13 17" />
              </svg>
            </span>
          </Link>
        )
      })}
    </section>
  )
}
