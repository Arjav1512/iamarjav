import Link from "next/link"
import { cn } from "@/lib/utils"
import { SectionHeader } from "./section-header"

/*
 * Writing rows, copy as designed. The second draft's title differs from its
 * slug's current article title (DESIGN_SPEC §9.2, open with Arjav).
 */
const rows = [
  {
    href: "/articles/i-dont-write-99-percent-of-my-code",
    title: "I Don't Write 99% of My Code",
    blurb: "AI writes or debugs almost all of my code. I'd rather say that myself than have someone find it out.",
    published: true,
  },
  {
    href: "/articles/technology-should-shape-better-behavior",
    title: "I Ship Fast. I Learn Slow.",
    blurb: "Speed matters. I was just timing the wrong thing.",
    published: false,
  },
  {
    href: "/articles/let-the-robots-solve-utility",
    title: "Let the Robots Solve Utility",
    blurb: "Utility is a solved problem for machines. The interesting work starts after.",
    published: false,
  },
]

export function Writing() {
  return (
    <section id="writing" className="max-w-[1280px] mx-auto box-border py-[112px] px-[32px] flex flex-col gap-[8px]">
      <SectionHeader title="Writing" note="1 published · 2 in the oven" className="mb-[8px]" />
      {rows.map((row) => (
        <Link key={row.href} href={row.href} className="row flex gap-[24px] justify-between items-center py-[24px] px-[16px] rounded-[16px] no-underline">
          <span className="flex flex-col gap-[8px] min-w-0">
            {/* Published title inherits the link colour (and its hover); drafts are greyed. */}
            <span className={cn("font-medium text-[length:clamp(22px,2.6vw,36px)] leading-[1.1] tracking-[-0.03em]", !row.published && "text-[#737373]")}>
              {row.title}
            </span>
            <span className="max-w-[60ch] text-[15px] leading-[1.5] text-[#6B6B6B]">{row.blurb}</span>
          </span>
          <span className="flex gap-[16px] items-center flex-none">
            {row.published ? (
              <span className="py-[5px] px-[10px] rounded-[999px] bg-[#0A0A0A] text-[#FFFFFF] f-mono text-[11px]">published</span>
            ) : (
              <span className="py-[5px] px-[10px] rounded-[999px] border border-dashed border-[#A3A3A3] f-mono text-[11px] text-[#6B6B6B]">draft</span>
            )}
            <svg className="arr" aria-hidden="true" width="22" height="22" viewBox="0 0 22 22" fill="none" stroke={row.published ? "#0A0A0A" : "#A3A3A3"} strokeWidth="1.6">
              <path d="M3 11 H19 M13 5 L19 11 L13 17" />
            </svg>
          </span>
        </Link>
      ))}
    </section>
  )
}
