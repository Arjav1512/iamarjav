/*
 * A deliberately small Markdown reader for the essays in content/articles.
 * It covers what long-form writing needs (headings, paragraphs, quotes,
 * lists, rules, emphasis, inline code, links) and returns a typed tree that
 * React renders directly, so no HTML strings and no extra dependency.
 */

export type Inline =
  | { type: "text"; value: string }
  | { type: "strong"; children: Inline[] }
  | { type: "em"; children: Inline[] }
  | { type: "code"; value: string }
  | { type: "link"; href: string; children: Inline[] }

export type Block =
  | { type: "heading"; level: 1 | 2 | 3; text: string; children: Inline[] }
  | { type: "paragraph"; children: Inline[] }
  | { type: "quote"; paragraphs: Inline[][] }
  | { type: "list"; ordered: boolean; items: Inline[][] }
  | { type: "rule" }

const HEADING = /^(#{1,3})\s+(.*)$/
const QUOTE = /^>\s?(.*)$/
const BULLET = /^[-*+]\s+(.*)$/
const ORDERED = /^\d+[.)]\s+(.*)$/
const RULE = /^(?:-{3,}|\*{3,}|_{3,})$/

export function parseMarkdown(source: string): Block[] {
  const lines = source.replace(/\r\n?/g, "\n").split("\n")
  const blocks: Block[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i].trim()

    if (!line) {
      i++
      continue
    }

    if (RULE.test(line)) {
      blocks.push({ type: "rule" })
      i++
      continue
    }

    const heading = HEADING.exec(line)
    if (heading) {
      const text = heading[2].trim()
      blocks.push({
        type: "heading",
        level: heading[1].length as 1 | 2 | 3,
        text: plainText(parseInline(text)),
        children: parseInline(text),
      })
      i++
      continue
    }

    if (QUOTE.test(line)) {
      // Consecutive ">" lines form one quote; a bare ">" separates its paragraphs.
      const paragraphs: string[][] = [[]]
      while (i < lines.length && QUOTE.test(lines[i].trim())) {
        const inner = QUOTE.exec(lines[i].trim())![1].trim()
        if (inner) paragraphs[paragraphs.length - 1].push(inner)
        else if (paragraphs[paragraphs.length - 1].length) paragraphs.push([])
        i++
      }
      blocks.push({
        type: "quote",
        paragraphs: paragraphs.filter((p) => p.length).map((p) => parseInline(p.join(" "))),
      })
      continue
    }

    const ordered = ORDERED.test(line)
    if (ordered || BULLET.test(line)) {
      const marker = ordered ? ORDERED : BULLET
      const items: string[] = []
      while (i < lines.length && lines[i].trim()) {
        const current = lines[i].trim()
        const item = marker.exec(current)
        if (item) items.push(item[1])
        else if (items.length) items[items.length - 1] += ` ${current}` // wrapped item line
        else break
        i++
      }
      blocks.push({ type: "list", ordered, items: items.map(parseInline) })
      continue
    }

    // Paragraph: every following non-blank line that doesn't start another block.
    const parts: string[] = []
    while (i < lines.length) {
      const current = lines[i].trim()
      if (
        !current ||
        HEADING.test(current) ||
        QUOTE.test(current) ||
        RULE.test(current) ||
        BULLET.test(current) ||
        ORDERED.test(current)
      )
        break
      parts.push(current)
      i++
    }
    blocks.push({ type: "paragraph", children: parseInline(parts.join(" ")) })
  }

  return blocks
}

/*
 * Inline pass: code spans first (their contents are literal), then links,
 * then strong (**, __) and emphasis (*, _). Underscores only count at word
 * boundaries so snake_case and file_names stay intact.
 */
const INLINE =
  /`([^`]+)`|\[([^\]]+)\]\(([^)\s]+)\)|\*\*(.+?)\*\*|(?<![\w])__(.+?)__(?![\w])|\*(?!\s)(.+?)(?<!\s)\*|(?<![\w])_(?!\s)(.+?)(?<!\s)_(?![\w])/g

export function parseInline(text: string): Inline[] {
  const out: Inline[] = []
  let last = 0
  for (const m of text.matchAll(INLINE)) {
    const start = m.index ?? 0
    if (start > last) out.push({ type: "text", value: text.slice(last, start) })
    if (m[1] !== undefined) out.push({ type: "code", value: m[1] })
    else if (m[2] !== undefined) out.push({ type: "link", href: m[3], children: parseInline(m[2]) })
    else if (m[4] !== undefined || m[5] !== undefined)
      out.push({ type: "strong", children: parseInline(m[4] ?? m[5]) })
    else out.push({ type: "em", children: parseInline(m[6] ?? m[7]) })
    last = start + m[0].length
  }
  if (last < text.length) out.push({ type: "text", value: text.slice(last) })
  return out
}

export function plainText(nodes: Inline[]): string {
  return nodes
    .map((n) => (n.type === "text" || n.type === "code" ? n.value : plainText(n.children)))
    .join("")
}

/** URL-safe id for a heading, e.g. "What DHH gets to say" -> "what-dhh-gets-to-say". */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}
