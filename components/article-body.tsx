import { Fragment } from "react"
import { slugify, type Block, type Inline } from "@/lib/markdown"

/*
 * Long-form typography for the essays. One measure (~65ch), one rhythm:
 * spacing is set in em so it scales with the step from 17px to 18px body.
 * - A slightly larger, full-ink lede gives the eye a way in.
 * - Section headings carry a mono numeral, echoing the home page's
 *   "01 / Work" section grammar, and are linkable by id.
 * - Quotes are set in mono: in these essays they are verbatim messages
 *   typed to agents and tools, and mono is the site's voice for literal text.
 */
export function ArticleBody({ blocks }: { blocks: Block[] }) {
  let section = 0

  return (
    <div className="max-w-(--container-prose) text-[17px] leading-[1.75] text-foreground/85 sm:text-lg sm:leading-[1.8] [&_blockquote+blockquote]:mt-[1em] [&_h2+*]:mt-[0.8em] [&_h3+*]:mt-[0.6em]">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "heading": {
            if (block.level === 3) {
              return (
                <h3
                  key={i}
                  id={slugify(block.text)}
                  className="mt-[2em] scroll-mt-24 font-display text-[1.15em] font-semibold leading-snug text-foreground"
                >
                  <Inlines nodes={block.children} />
                </h3>
              )
            }
            section += 1
            return (
              <h2
                key={i}
                id={slugify(block.text)}
                className="mt-[2.75em] scroll-mt-24 font-display text-[1.45rem] font-semibold leading-tight tracking-[-0.02em] text-foreground sm:text-[1.75rem]"
              >
                <span
                  className="mb-3 block font-mono text-[11px] font-normal leading-none tracking-normal text-muted-foreground"
                  aria-hidden="true"
                >
                  {String(section).padStart(2, "0")}
                </span>
                <Inlines nodes={block.children} />
              </h2>
            )
          }
          case "paragraph":
            return (
              <p
                key={i}
                className="mt-[1.15em] text-pretty first:mt-0 first:text-[1.125em] first:leading-[1.65] first:text-foreground"
              >
                <Inlines nodes={block.children} />
              </p>
            )
          case "quote":
            return (
              <blockquote
                key={i}
                className="my-[1.75em] space-y-3 border-l-2 border-foreground/15 py-0.5 pl-5 font-mono text-[14px] leading-[1.7] text-foreground sm:pl-6 sm:text-[15px]"
              >
                {block.paragraphs.map((p, j) => (
                  <p key={j}>
                    <Inlines nodes={p} />
                  </p>
                ))}
              </blockquote>
            )
          case "list": {
            const List = block.ordered ? "ol" : "ul"
            return (
              <List
                key={i}
                className={`mt-[1.15em] space-y-[0.5em] pl-[1.25em] marker:text-muted-foreground ${block.ordered ? "list-decimal" : "list-disc"}`}
              >
                {block.items.map((item, j) => (
                  <li key={j} className="pl-1">
                    <Inlines nodes={item} />
                  </li>
                ))}
              </List>
            )
          }
          case "rule":
            return <hr key={i} className="my-[2.5em] border-border" />
        }
      })}
    </div>
  )
}

function Inlines({ nodes }: { nodes: Inline[] }) {
  return (
    <>
      {nodes.map((node, i) => {
        switch (node.type) {
          case "text":
            return <Fragment key={i}>{node.value}</Fragment>
          case "strong":
            return (
              <strong key={i} className="font-semibold text-foreground">
                <Inlines nodes={node.children} />
              </strong>
            )
          case "em":
            return (
              <em key={i}>
                <Inlines nodes={node.children} />
              </em>
            )
          case "code":
            return (
              <code key={i} className="rounded-[4px] bg-secondary px-1 py-px font-mono text-[0.85em] text-foreground">
                {node.value}
              </code>
            )
          case "link": {
            const external = /^https?:\/\//.test(node.href)
            return (
              <a
                key={i}
                href={node.href}
                {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                className="text-foreground underline decoration-foreground/25 underline-offset-[0.2em] transition-colors duration-(--duration-hover) hover:decoration-foreground"
              >
                <Inlines nodes={node.children} />
              </a>
            )
          }
        }
      })}
    </>
  )
}
