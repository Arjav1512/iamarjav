"use client"

import { cn } from "@/lib/utils"
import { TORCH as D } from "./preview-data"
import { LabFrame, SpecLabel } from "./lab-frame"
import { usePreviewTimeline } from "./use-preview-timeline"

/* Blueprint grid, echoing the original launch cover's texture. */
const GRID =
  "repeating-linear-gradient(0deg, var(--border) 0 1px, transparent 1px 24px), repeating-linear-gradient(90deg, var(--border) 0 1px, transparent 1px 24px)"

function Stage({
  n,
  label,
  className,
  children,
}: {
  n: string
  label: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "flex min-h-0 min-w-0 flex-col overflow-hidden rounded-lg border border-border bg-background/90 p-1.5 shadow-[0_1px_2px_oklch(0.16_0.01_270/0.04)] @md:p-2.5",
        className
      )}
    >
      <SpecLabel className="flex items-baseline gap-1.5">
        <span className="text-foreground/35">{n}</span>
        {label}
      </SpecLabel>
      <div className="mt-1 flex min-h-0 flex-1 flex-col @md:mt-1.5">{children}</div>
    </div>
  )
}

function Connector({ dashed = false }: { dashed?: boolean }) {
  return (
    <div className="hidden w-4 items-center @md:flex @xl:w-6" aria-hidden="true">
      <div
        data-tr="link"
        className={cn("relative h-0 w-full border-t border-foreground/45", dashed && "border-dashed")}
      >
        <span className="absolute -right-px -top-[3.5px] size-0 border-y-[3px] border-l-[4px] border-y-transparent border-l-foreground/45" />
      </div>
    </div>
  )
}

/* Miniature Figma frame: one node resizes (modified), one appears (added). */
function FigmaFrame() {
  return (
    <div className="relative flex flex-1 flex-col rounded-md border border-dashed border-foreground/25 p-1.5">
      <span className="absolute -top-[7px] left-1.5 bg-background px-0.5 font-mono text-[8px] leading-none text-foreground/50 @md:text-[9px]">
        {D.frame}
      </span>
      <div className="mt-1 h-1.5 w-2/3 rounded-full bg-foreground/15" />
      <div className="mt-1 hidden h-1.5 w-1/2 rounded-full bg-foreground/10 @md:block" />
      <div className="mt-2 hidden space-y-1 rounded border border-foreground/10 p-1.5 @md:block">
        <div className="flex justify-between">
          <div className="h-1 w-1/3 rounded-full bg-foreground/10" />
          <div className="h-1 w-1/6 rounded-full bg-foreground/15" />
        </div>
        <div className="flex justify-between">
          <div className="h-1 w-2/5 rounded-full bg-foreground/10" />
          <div className="h-1 w-1/6 rounded-full bg-foreground/15" />
        </div>
      </div>
      <div className="mt-auto flex items-center gap-1.5">
        <div
          data-tr="button"
          className="relative grid h-4 w-[64%] place-items-center rounded bg-foreground text-[7px] font-medium leading-none text-background outline outline-1 outline-offset-2 outline-foreground/40 @md:h-5 @md:text-[8px]"
        >
          Pay now
        </div>
        <div
          data-tr="badge"
          className="rounded-full border border-foreground/40 px-1 font-mono text-[7px] leading-[1.5] text-foreground/70 @md:text-[8px]"
        >
          new
        </div>
      </div>
      <p data-tr="dim" className="mt-1 hidden font-mono text-[8px] leading-none text-foreground/50 @md:block @md:text-[9px]">
        w 120 → 136
      </p>
    </div>
  )
}

/*
 * Torch, drawn as the pipeline it actually is (README / PROJECT.md):
 * a Figma file is snapshotted, diffed by node id, and turned into four
 * handoff materials. Line style carries status: solid = implemented,
 * dashed = partial or not built. Nothing here implies a finished product.
 * Final state is the markup.
 */
export function TorchPreview({ url }: { url?: string }) {
  const { ref, replay, canReplay } = usePreviewTimeline<HTMLDivElement>((tl, q) => {
    tl.from(q("[data-tr=stage-1]"), { opacity: 0, y: 6 }, 0.1)
      .from(q("[data-tr=button]"), { width: "50%", duration: 0.6, ease: "power2.inOut" }, 0.55)
      .from(q("[data-tr=dim]"), { opacity: 0, duration: 0.3 }, 0.95)
      .from(q("[data-tr=badge]"), { opacity: 0, scale: 0.6, duration: 0.35 }, 1.0)
      .from(q("[data-tr=link]"), { scaleX: 0, transformOrigin: "0% 50%", duration: 0.45, stagger: 0.95 }, 1.3)
      .from(q("[data-tr=stage-2]"), { opacity: 0, y: 6 }, 1.45)
      .from(q("[data-tr=change]"), { opacity: 0, x: -6, duration: 0.35, stagger: 0.2 }, 1.65)
      .from(q("[data-tr=summary]"), { opacity: 0, duration: 0.4 }, 2.1)
      .from(q("[data-tr=stage-3]"), { opacity: 0, y: 6 }, 2.4)
      .from(q("[data-tr=material]"), { opacity: 0, y: 4, duration: 0.3, stagger: 0.12 }, 2.55)
      .from(q("[data-tr=lane]"), { opacity: 0, duration: 0.5 }, 3.1)
  })

  return (
    <LabFrame
      title="Torch"
      url={url}
      caption={D.caption}
      canReplay={canReplay}
      onReplay={replay}
      bodyRef={ref}
      bodyProps={{
        role: "img",
        "aria-label":
          "Torch pipeline diagram, in progress. A sample Figma frame changes: a button is resized and a badge is added. Torch snapshots the file and detects the changes, summarised as 1 added, 1 modified, 0 removed, then generates a developer summary, changelog and PDF spec; the video walkthrough is a script only. Continuous monitoring is partial; version history and property-level diffs are not built yet.",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage: GRID,
          maskImage: "radial-gradient(ellipse at 50% 40%, black 25%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 40%, black 25%, transparent 80%)",
        }}
        aria-hidden="true"
      />

      <div className="absolute inset-0 flex flex-col gap-2 px-4 pb-6 pt-3.5 @md:gap-3 @md:px-5 @md:pb-7 @md:pt-4" aria-hidden="true">
        {/* Legend */}
        <div className="flex items-center justify-between gap-3">
          <SpecLabel>handoff pipeline</SpecLabel>
          <div className="flex items-center gap-3 font-mono text-[8.5px] text-muted-foreground @md:text-[9.5px]">
            <span className="flex items-center gap-1">
              <span className="w-3 border-t border-foreground/50" /> built
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 border-t border-dashed border-foreground/50" /> partial / not yet
            </span>
          </div>
        </div>

        {/* Stages */}
        <div className="grid min-h-0 flex-1 grid-cols-[1fr_1.25fr] grid-rows-[minmax(0,1fr)_auto] gap-2 @md:flex @md:gap-0">
          <Stage n="01" label="figma file" className="@md:flex-[1.05]">
            <div data-tr="stage-1" className="flex flex-1 flex-col">
              <FigmaFrame />
            </div>
          </Stage>
          <Connector />
          <Stage n="02" label="snapshot · diff" className="@md:flex-1">
            <div data-tr="stage-2" className="flex flex-1 flex-col">
              <ul className="space-y-1">
                {D.changes.map((c) => (
                  <li
                    key={c.node}
                    data-tr="change"
                    className="flex items-baseline gap-1.5 font-mono text-[8.5px] leading-tight @md:text-[10px]"
                  >
                    <span className="w-2 shrink-0 font-semibold text-foreground">{c.sign}</span>
                    <span className="min-w-0">
                      <span className="block truncate text-foreground">{c.node}</span>
                      <span className="hidden text-muted-foreground @md:inline">{c.kind}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <p data-tr="change" className="mt-2 hidden font-mono text-[9px] leading-snug text-muted-foreground @xl:block">
                compares bounds, fills, strokes, effects, style by node id
              </p>
              <p
                data-tr="summary"
                className="mt-auto whitespace-nowrap border-t border-border pt-1 font-mono text-[7.5px] leading-snug text-muted-foreground @md:whitespace-normal @md:pt-1.5 @md:text-[9.5px]"
              >
                {D.summary}
              </p>
            </div>
          </Stage>
          <Connector />
          <Stage n="03" label="materials" className="col-span-2 @md:col-span-1 @md:flex-1">
            <ul
              data-tr="stage-3"
              className="grid grid-cols-2 gap-x-2 gap-y-1 @md:flex @md:flex-col @md:gap-1.5"
            >
              {D.materials.map((m) => (
                <li
                  key={m.name}
                  data-tr="material"
                  className={cn(
                    "flex items-center gap-1.5 rounded border px-1.5 py-0.5 font-mono text-[8.5px] leading-tight @md:py-1 @md:text-[9.5px]",
                    m.built
                      ? "border-border bg-background text-foreground"
                      : "border-dashed border-foreground/30 text-muted-foreground"
                  )}
                >
                  <span
                    className={cn(
                      "h-2.5 w-2 shrink-0 rounded-[1.5px] border",
                      m.built ? "border-foreground/60 bg-foreground/10" : "border-dashed border-foreground/40"
                    )}
                  />
                  <span className="min-w-0 truncate @md:whitespace-normal">
                    {/* phones: shorten the name so the status note always fits */}
                    {m.note ? (
                      <>
                        <span className="@md:hidden">{m.name.split(" ")[0]}</span>
                        <span className="hidden @md:inline">{m.name}</span>
                      </>
                    ) : (
                      m.name
                    )}
                    {m.note && (
                      <span className="text-muted-foreground">
                        <span className="@md:hidden"> · </span>
                        <span className="hidden @md:inline"><br /></span>
                        {m.note}
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </Stage>
        </div>

        {/* Return lane: monitoring loops back to the file; what isn't built yet */}
        <div
          data-tr="lane"
          className="flex items-center justify-between gap-3 rounded-md border border-dashed border-foreground/30 px-2 py-1 font-mono text-[8.5px] text-muted-foreground @md:px-2.5 @md:text-[9.5px]"
        >
          <span className="truncate">↺ monitoring · {D.monitoring}</span>
          <span className="hidden truncate @lg:inline">not yet: {D.notYet}</span>
        </div>
      </div>
    </LabFrame>
  )
}
