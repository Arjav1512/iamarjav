import { cn } from "@/lib/utils"

interface BrowserFrameProps {
  title: string
  /** Real destination shown in the address bar; omit for in-progress work. */
  url?: string
  /** Real screenshot/GIF; the typographic cover renders until this exists. */
  media?: { src: string; alt: string }
  className?: string
}

/** "https://usemirror.dev/x" → "usemirror.dev/x" for the address bar. */
const displayUrl = (url: string) =>
  url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")

/*
 * Browser-chrome media frame. Renders real media when it exists; until then
 * the body is a designed typographic cover, never a gray placeholder.
 * Swapping in a screenshot later is a content change only; the layout is
 * identical in both states.
 */
export function BrowserFrame({ title, url, media, className }: BrowserFrameProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-card transition-colors duration-(--duration-hover) group-hover:border-foreground/20",
        className
      )}
    >
      <div className="flex items-center gap-4 border-b border-border px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2 rounded-full bg-border" />
          <span className="size-2 rounded-full bg-border" />
          <span className="size-2 rounded-full bg-border" />
        </span>
        <span className="min-w-0 flex-1 truncate text-center font-mono text-[11px] text-muted-foreground">
          {url ? displayUrl(url) : `${title.toLowerCase().replace(/\s+/g, "")} (coming soon)`}
        </span>
        <span className="w-[42px]" aria-hidden="true" />
      </div>
      {media ? (
        <img
          src={media.src}
          alt={media.alt}
          loading="lazy"
          className="aspect-[16/10] w-full bg-secondary/40 object-cover object-top"
        />
      ) : (
        <div className="flex aspect-[16/10] items-center justify-center bg-secondary/40">
          <span
            className="font-display text-3xl font-bold tracking-tight text-foreground/75 transition-colors duration-(--duration-hover) group-hover:text-foreground sm:text-4xl"
            aria-hidden="true"
          >
            {title}
          </span>
        </div>
      )}
    </div>
  )
}
