import { readFileSync } from "node:fs"
import path from "node:path"
import { parseMarkdown, type Block } from "@/lib/markdown"

/*
 * Essays live in content/articles/<slug>.md, one file per article, named by
 * the slug in data/content.ts. Read at build time (article pages are
 * statically generated), so nothing touches the filesystem at request time.
 */
const ARTICLES_DIR = path.join(process.cwd(), "content", "articles")

/** Average adult silent-reading speed for non-fiction, words per minute. */
const WORDS_PER_MINUTE = 230

export type ArticleBody = {
  blocks: Block[]
  /** Whole minutes, rounded up; computed from the text, never hand-set. */
  readingMinutes: number
}

export function getArticleBody(slug: string): ArticleBody | null {
  let source: string
  try {
    source = readFileSync(path.join(ARTICLES_DIR, `${slug}.md`), "utf8")
  } catch {
    return null
  }

  const blocks = parseMarkdown(source)
  // The title is rendered from data/content.ts; drop the file's own H1.
  if (blocks[0]?.type === "heading" && blocks[0].level === 1) blocks.shift()

  const words = source.replace(/[#>*_`\[\]()-]/g, " ").split(/\s+/).filter(Boolean).length
  return { blocks, readingMinutes: Math.max(1, Math.ceil(words / WORDS_PER_MINUTE)) }
}
