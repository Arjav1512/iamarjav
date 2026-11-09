"use client"

import { useCallback, useLayoutEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { MIRROR as D } from "./preview-data"
import { LabFrame, SpecLabel } from "./lab-frame"
import { usePreviewTimeline } from "./use-preview-timeline"

/*
 * One hue per bias, shared by its highlight, thread, dot and card, so the
 * colour itself is the link between a phrase and what Mirror saw in it.
 * Equal lightness/chroma family; text never sits in colour, only on tints.
 */
const HUE: Record<number, { mark: string; ink: string }> = {
  1: { mark: "oklch(0.84 0.13 82)", ink: "oklch(0.66 0.14 70)" }, // amber
  2: { mark: "oklch(0.8 0.11 358)", ink: "oklch(0.62 0.17 358)" }, // rose
  3: { mark: "oklch(0.8 0.08 265)", ink: "oklch(0.58 0.14 265)" }, // indigo
}
const tint = (c: string, a: number) => c.replace(")", ` / ${a})`)

/* Mood ribbon: Mirror's sentiment score (−1…1) as warm ↔ cool paint. */
function moodColor(s: number) {
  const m = Math.abs(s)
  if (m < 0.05) return "oklch(0.9 0.005 85)"
  return s > 0
    ? `oklch(${(0.9 - 0.14 * m).toFixed(3)} ${(0.04 + 0.11 * m).toFixed(3)} 62)`
    : `oklch(${(0.88 - 0.22 * m).toFixed(3)} ${(0.03 + 0.11 * m).toFixed(3)} 258)`
}
const DAYS = ["m", "t", "w", "t", "f", "s", "s"]

function MoodRibbon() {
  const last = D.week.length - 1
  return (
    <div className="flex items-center gap-2" aria-hidden="true">
      <SpecLabel className="hidden shrink-0 @sm:block">this week</SpecLabel>
      <div className="flex flex-1 gap-[3px]">
        {D.week.map((s, i) => (
          <span key={i} className="flex flex-1 flex-col items-center gap-0.5">
            <span
              data-mr="chip"
              className={cn(
                "block h-2.5 w-full max-w-4 rounded-[3px] @sm:h-3",
                i === last && "ring-1 ring-foreground/70 ring-offset-1 ring-offset-background"
              )}
              style={{ background: moodColor(s) }}
            />
            <span
              className={cn(
                "font-mono text-[7px] leading-none @sm:text-[8px]",
                i === last ? "text-foreground" : "text-foreground/35"
              )}
            >
              {DAYS[i]}
            </span>
          </span>
        ))}
      </div>
      <span data-mr="today" className="shrink-0 font-mono text-[9px] text-foreground/70 @sm:text-[10px]">
        {D.sentiment.score}
      </span>
    </div>
  )
}

type Thread = { n: number; d: string; x: number; y: number }

/*
 * Threads run from the page's right edge, at the height of each flagged
 * phrase, across the gutter to that bias's dot. Measured from layout (no
 * transforms are animated on measured elements) and re-measured on resize
 * and whenever the active card changes height.
 */
function useThreads(active: number) {
  const box = useRef<HTMLDivElement>(null)
  const [threads, setThreads] = useState<Thread[]>([])

  const measure = useCallback(() => {
    const root = box.current
    if (!root) return
    const r = root.getBoundingClientRect()
    const paper = root.querySelector<HTMLElement>("[data-mr=paper]")
    if (!paper) return
    const edge = paper.getBoundingClientRect().right - r.left
    const next: Thread[] = []
    for (const b of D.biases) {
      const mark = root.querySelector<HTMLElement>(`[data-mr=mark-${b.n}]`)
      const dot = root.querySelector<HTMLElement>(`[data-mr=dot-${b.n}]`)
      if (!mark || !dot) continue
      const rects = mark.getClientRects()
      const lr = rects[rects.length - 1]
      const dr = dot.getBoundingClientRect()
      const y1 = lr.top + lr.height / 2 - r.top
      const x2 = dr.left - r.left - 3
      const y2 = dr.top + dr.height / 2 - r.top
      const k = (x2 - edge) * 0.55
      next.push({
        n: b.n,
        x: edge,
        y: y1,
        d: `M${edge.toFixed(1)} ${y1.toFixed(1)} C${(edge + k).toFixed(1)} ${y1.toFixed(1)} ${(x2 - k).toFixed(1)} ${y2.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`,
      })
    }
    setThreads(next)
  }, [])

  useLayoutEffect(() => {
    measure()
  }, [active, measure])

  useLayoutEffect(() => {
    const root = box.current
    if (!root) return
    const ro = new ResizeObserver(measure)
    ro.observe(root)
    document.fonts?.ready.then(measure)
    return () => ro.disconnect()
  }, [measure])

  return { box, threads }
}

/*
 * "Thoughts becoming patterns." A sample entry, marked up the way Mirror's
 * detector read it: each flagged phrase gets a highlighter swipe in its
 * bias's colour, a thread carries it to the margin, and the selected bias
 * opens into Mirror's own explanation. The ribbon paints this entry's
 * sentiment among a sample week. Hover, focus or tap a bias to trace it.
 */
export function MirrorPreview({ url }: { url?: string }) {
  const [active, setActive] = useState(2)
  const { box, threads } = useThreads(active)

  const { ref, replay, canReplay } = usePreviewTimeline<HTMLDivElement>((tl, q) => {
    tl.from(q("[data-mr=paper]"), { opacity: 0, duration: 0.5 }, 0.1)
      .from(q("[data-mr=aside-label]"), { opacity: 0, duration: 0.3 }, 0.4)
    D.biases.forEach((b, i) => {
      const at = 0.65 + i * 0.6
      tl.from(
        q(`[data-mr=mark-${b.n}]`),
        { backgroundSize: "0% 46%", duration: 0.55, ease: "power2.inOut" },
        at
      )
        .from(q(`[data-mr=thread-${b.n}]`), { strokeDashoffset: 1, duration: 0.5, ease: "power2.out" }, at + 0.35)
        .from(q(`[data-mr=pin-${b.n}]`), { opacity: 0, duration: 0.2 }, at + 0.35)
        .from(q(`[data-mr=row-${b.n}]`), { opacity: 0, duration: 0.35 }, at + 0.6)
    })
    tl.from(q("[data-mr=explain]"), { opacity: 0, duration: 0.45 }, 2.55)
      .from(q("[data-mr=chip]"), { opacity: 0, scaleY: 0.2, duration: 0.3, stagger: 0.06 }, 2.7)
      .from(q("[data-mr=today]"), { opacity: 0, duration: 0.3 }, 3.2)
  })

  return (
    <LabFrame
      title="Mirror"
      url={url}
      caption={D.caption}
      canReplay={canReplay}
      onReplay={replay}
      bodyRef={ref}
      bodyProps={{
        role: "group",
        "aria-label": `Sample Mirror entry: “Every time I present, my mind goes blank. I feel unprepared, so I probably am. I’m anxious that tomorrow’s review is going to fail.” Mirror’s detector scores it ${D.sentiment.score}, ${D.sentiment.label}, and flags Overgeneralization, Emotional Reasoning and Fortune Telling.`,
      }}
    >
      <div
        ref={box}
        className="absolute inset-0 grid grid-cols-[1.2fr_0.75rem_1fr] px-4 pb-6 pt-4 @sm:grid-cols-[1.3fr_2rem_1fr] @sm:px-5 @sm:pb-7 @sm:pt-5"
      >
        {/* The page */}
        <div className="relative min-h-0" aria-hidden="true">
          <div className="absolute inset-0 translate-x-1 translate-y-1 rotate-[0.6deg] rounded-lg border border-border bg-background/60" />
          <div
            data-mr="paper"
            className="relative flex h-full flex-col rounded-lg border border-border bg-background p-3 shadow-[0_1px_2px_oklch(0.16_0.01_270/0.04),0_6px_16px_oklch(0.16_0.01_270/0.05)] @sm:px-4 @sm:pb-3 @sm:pt-3.5"
          >
            <div className="flex items-baseline justify-between">
              <SpecLabel>sample entry</SpecLabel>
              <SpecLabel className="text-foreground/40">{D.day}</SpecLabel>
            </div>
            <p className="mt-2 text-[11px] leading-[1.6] text-foreground/85 @sm:text-[12.5px] @xl:mt-3 @xl:text-[17px] @xl:leading-[1.65]">
              {D.entry.map((part, i) =>
                typeof part === "string" ? (
                  <span key={i}>{part}</span>
                ) : (
                  <span
                    key={i}
                    data-mr={`mark-${part.n}`}
                    className={cn(
                      "box-decoration-clone rounded-[2px] px-px transition-colors duration-(--duration-hover)",
                      active === part.n && "text-foreground"
                    )}
                    style={{
                      backgroundImage: `linear-gradient(${HUE[part.n].mark}, ${HUE[part.n].mark})`,
                      backgroundSize: "100% 46%",
                      backgroundPosition: "0 88%",
                      backgroundRepeat: "no-repeat",
                      backgroundColor: active === part.n ? tint(HUE[part.n].mark, 0.35) : "transparent",
                    }}
                  >
                    {part.text}
                  </span>
                )
              )}
            </p>
            <div className="mt-auto border-t border-border pt-2">
              <MoodRibbon />
            </div>
          </div>
        </div>

        {/* The gutter the threads cross */}
        <div aria-hidden="true" />

        {/* The margin */}
        <div className="flex min-h-0 min-w-0 flex-col">
          <SpecLabel>
            <span data-mr="aside-label">mirror noticed</span>
          </SpecLabel>
          <ul className="mt-1.5 space-y-1" aria-label="Biases Mirror detected">
            {D.biases.map((b) => {
              const on = active === b.n
              return (
                <li
                  key={b.n}
                  data-mr={`row-${b.n}`}
                  className="rounded-md transition-colors duration-(--duration-hover)"
                  style={{ background: on ? tint(HUE[b.n].mark, 0.22) : "transparent" }}
                >
                  <button
                    type="button"
                    onMouseEnter={() => setActive(b.n)}
                    onFocus={() => setActive(b.n)}
                    onClick={() => setActive(b.n)}
                    aria-pressed={on}
                    className={cn(
                      "flex w-full items-center gap-1.5 rounded-md px-1.5 py-1 text-left transition-colors duration-(--duration-hover)",
                      "focus-visible:outline-2 focus-visible:outline-ring",
                      on ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <span
                      data-mr={`dot-${b.n}`}
                      className="size-2 shrink-0 rounded-full"
                      style={{ background: HUE[b.n].ink }}
                    />
                    <span className="truncate text-[10px] font-medium @sm:text-[12px]">{b.type}</span>
                  </button>
                  {on && (
                    <p
                      data-mr="explain"
                      className="pb-1.5 pl-[1.375rem] pr-1.5 text-[9.5px] leading-snug text-foreground/70 @sm:text-[11px]"
                      aria-live="polite"
                    >
                      {b.explanation}
                    </p>
                  )}
                </li>
              )
            })}
          </ul>
        </div>

        {/* Threads (wider panels): phrase line → bias dot */}
        <svg className="pointer-events-none absolute inset-0 hidden size-full overflow-visible @sm:block" aria-hidden="true">
          {D.biases.map((b) => {
            const t = threads.find((x) => x.n === b.n)
            const on = active === b.n
            return (
              <g key={b.n} style={{ opacity: on ? 1 : 0.4, transition: "opacity 250ms" }}>
                <path
                  data-mr={`thread-${b.n}`}
                  d={t?.d ?? "M0 0"}
                  pathLength={1}
                  strokeDasharray="1"
                  fill="none"
                  stroke={HUE[b.n].ink}
                  strokeWidth={on ? 1.4 : 1}
                  strokeLinecap="round"
                />
                <circle data-mr={`pin-${b.n}`} cx={t?.x ?? -10} cy={t?.y ?? -10} r={2.2} fill={HUE[b.n].ink} />
              </g>
            )
          })}
        </svg>
      </div>
    </LabFrame>
  )
}
