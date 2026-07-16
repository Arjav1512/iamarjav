import { cn } from "@/lib/utils"

/** Where the launch-cover content sits; each featured project gets its own. */
export type CoverAlign = "center" | "start" | "end"

interface BrowserFrameProps {
  title: string
  /** One-line thesis shown on the launch cover. */
  tagline?: string
  /** Honest product category badge, e.g. "figma automation · in progress". */
  badge?: string
  /** Real destination shown in the address bar; omit for in-progress work. */
  url?: string
  /** Composition of the launch cover; varies per project so covers never repeat. */
  cover?: CoverAlign
  /** Real screenshot/GIF; the designed cover renders until this exists. */
  media?: { src: string; alt: string }
  className?: string
}

/** "https://usemirror.dev/x" → "usemirror.dev/x" for the address bar. */
const displayUrl = (url: string) =>
  url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")

/* Per-composition cover treatment: content placement, text alignment, grid
   focal point, and wordmark scale. Geometry (16:9) is shared, rhythm is not. */
const COVERS: Record<
  CoverAlign,
  { layout: string; mask: string; wordmark: string; tagline: string }
> = {
  center: {
    layout: "items-center justify-center text-center px-8",
    mask: "radial-gradient(ellipse at center, black 30%, transparent 78%)",
    wordmark: "text-4xl sm:text-5xl",
    tagline: "max-w-[38ch]",
  },
  start: {
    layout: "items-start justify-end text-left p-7 sm:p-10",
    mask: "radial-gradient(ellipse at 20% 80%, black 20%, transparent 72%)",
    wordmark: "text-3xl sm:text-4xl",
    tagline: "max-w-[34ch]",
  },
  end: {
    layout: "items-end justify-center text-right p-7 sm:p-10",
    mask: "radial-gradient(ellipse at 80% 45%, black 20%, transparent 72%)",
    wordmark: "text-3xl sm:text-4xl",
    tagline: "max-w-[34ch]",
  },
}

/*
 * Browser-chrome media frame. Renders real media when it exists; until
 * then the body is a designed launch cover: badge + wordmark + thesis over
 * a faint blueprint grid, never a gray rectangle. Swapping in a screenshot
 * later is a content change only; geometry is identical in both states.
 * The whole frame lifts subtly on group hover (transform + shadow only).
 */
export function BrowserFrame({
  title,
  tagline,
  badge,
  url,
  cover = "center",
  media,
  className,
}: BrowserFrameProps) {
  const c = COVERS[cover]

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-card transition-all duration-(--duration-hover)",
        "group-hover:-translate-y-1 group-hover:border-foreground/20 group-hover:shadow-[0_2px_6px_oklch(0.16_0.01_270/0.05),0_12px_28px_oklch(0.16_0.01_270/0.08)]",
        "motion-reduce:transition-none motion-reduce:group-hover:translate-y-0",
        className
      )}
    >
      <div className="flex items-center gap-3 border-b border-border px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2 rounded-full bg-border" />
          <span className="size-2 rounded-full bg-border" />
          <span className="size-2 rounded-full bg-border" />
        </span>
        <span className="mx-auto min-w-0 max-w-[70%] flex-1 truncate rounded-md bg-secondary/60 px-3 py-1 text-center font-mono text-[11px] text-muted-foreground">
          {url ? displayUrl(url) : `${title.toLowerCase().replace(/\s+/g, "")} (in the works)`}
        </span>
        <span className="w-[42px]" aria-hidden="true" />
      </div>
      {media ? (
        <img
          src={media.src}
          alt={media.alt}
          loading="lazy"
          className="aspect-[16/9] w-full bg-secondary/40 object-cover object-top"
        />
      ) : (
        <div
          className={cn("relative flex aspect-[16/9] flex-col gap-3 bg-secondary/30", c.layout)}
          aria-hidden="true"
        >
          {/* Faint blueprint grid so the cover reads designed, not empty */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.55]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, var(--border) 0 1px, transparent 1px 32px), repeating-linear-gradient(90deg, var(--border) 0 1px, transparent 1px 32px)",
              maskImage: c.mask,
              WebkitMaskImage: c.mask,
            }}
          />
          {badge && (
            <span className="relative rounded-full border border-border bg-background/70 px-3 py-1 font-mono text-[10px] tracking-wide text-muted-foreground">
              {badge}
            </span>
          )}
          <span
            className={cn(
              "relative font-display font-bold tracking-tight text-foreground/80 transition-colors duration-(--duration-hover) group-hover:text-foreground",
              c.wordmark
            )}
          >
            {title}
          </span>
          {tagline && (
            <span
              className={cn(
                "relative font-mono text-[11px] leading-relaxed text-muted-foreground",
                c.tagline
              )}
            >
              {tagline}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
