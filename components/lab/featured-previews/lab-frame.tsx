"use client"

import { RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

interface LabFrameProps {
  title: string
  /** Real destination for the address bar; omit for in-progress work. */
  url?: string
  /** Honest provenance line, pinned inside the panel. */
  caption: string
  canReplay: boolean
  onReplay: () => void
  bodyRef: React.Ref<HTMLDivElement>
  /** Accessible role/label for the panel body. */
  bodyProps?: React.HTMLAttributes<HTMLDivElement>
  bodyClassName?: string
  children: React.ReactNode
}

const displayUrl = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")

/*
 * Same browser chrome as components/browser-frame.tsx (classes copied, not
 * shared, so the original stays untouched). Differences: the right-hand
 * spacer hosts a replay control, and below a 24rem container width the
 * body goes 4:3 so the specimen stays legible on phones.
 */
export function LabFrame({
  title,
  url,
  caption,
  canReplay,
  onReplay,
  bodyRef,
  bodyProps,
  bodyClassName,
  children,
}: LabFrameProps) {
  return (
    <div
      className={cn(
        "@container overflow-hidden rounded-xl border border-border bg-card transition-all duration-(--duration-hover)",
        "group-hover:-translate-y-1 group-hover:border-foreground/20 group-hover:shadow-[0_2px_6px_oklch(0.16_0.01_270/0.05),0_12px_28px_oklch(0.16_0.01_270/0.08)]",
        "motion-reduce:transition-none motion-reduce:group-hover:translate-y-0"
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
        <span className="flex w-[42px] justify-end">
          {canReplay && (
            <button
              type="button"
              onClick={onReplay}
              className="grid size-6 place-items-center rounded-md text-muted-foreground/70 transition-colors duration-(--duration-hover) hover:bg-secondary hover:text-foreground focus-visible:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
              aria-label={`Replay ${title} preview`}
              title="Replay"
            >
              <RotateCcw className="size-3" aria-hidden="true" />
            </button>
          )}
        </span>
      </div>
      <div
        ref={bodyRef}
        className={cn(
          "relative aspect-[4/3] overflow-hidden bg-secondary/30 @sm:aspect-[16/9]",
          bodyClassName
        )}
        {...bodyProps}
      >
        {children}
        <p
          className="pointer-events-none absolute inset-x-3 bottom-1.5 truncate text-right font-mono text-[9px] leading-none text-muted-foreground @sm:text-[9.5px]"
          aria-hidden="true"
        >
          {caption}
        </p>
      </div>
    </div>
  )
}

/** Shared micro-label: the site's lowercase mono label voice at specimen scale. */
export function SpecLabel({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <p
      className={cn(
        "font-mono text-[9px] font-medium tracking-wide text-foreground/55 @sm:text-[10px]",
        className
      )}
    >
      {children}
    </p>
  )
}
