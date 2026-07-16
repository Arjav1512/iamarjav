import { cn } from "@/lib/utils"

interface BrowserFrameProps {
  title: string
  /** One-line thesis shown on the placeholder cover. */
  tagline?: string
  /** Real destination shown in the address bar; omit for in-progress work. */
  url?: string
  /** Real screenshot/GIF; the designed cover renders until this exists. */
  media?: { src: string; alt: string }
  className?: string
}

/** "https://usemirror.dev/x" → "usemirror.dev/x" for the address bar. */
const displayUrl = (url: string) =>
  url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")

/*
 * Browser-chrome media frame. Renders real media when it exists; until
 * then the body is a designed cover: wordmark + thesis over a faint
 * blueprint grid, never a gray rectangle. Swapping in a screenshot later
 * is a content change only; geometry is identical in both states.
 * The whole frame lifts subtly on group hover (transform + shadow only).
 */
export function BrowserFrame({ title, tagline, url, media, className }: BrowserFrameProps) {
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
          className="relative flex aspect-[16/9] flex-col items-center justify-center gap-3 bg-secondary/30 px-8 text-center"
          aria-hidden="true"
        >
          {/* Faint blueprint grid so the cover reads designed, not empty */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.55]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, var(--border) 0 1px, transparent 1px 32px), repeating-linear-gradient(90deg, var(--border) 0 1px, transparent 1px 32px)",
              maskImage: "radial-gradient(ellipse at center, black 30%, transparent 78%)",
              WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 78%)",
            }}
          />
          <span className="relative font-display text-3xl font-bold tracking-tight text-foreground/80 transition-colors duration-(--duration-hover) group-hover:text-foreground sm:text-4xl">
            {title}
          </span>
          {tagline && (
            <span className="relative max-w-[38ch] font-mono text-[11px] leading-relaxed text-muted-foreground">
              {tagline}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
