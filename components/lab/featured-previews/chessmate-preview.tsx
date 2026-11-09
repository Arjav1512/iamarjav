"use client"

import { CHESSMATE as D } from "./preview-data"
import { LabFrame, SpecLabel } from "./lab-frame"
import { usePreviewTimeline } from "./use-preview-timeline"

/* Board geometry in SVG user units: 10 per square, eval bar on the left. */
const SQ = 10
const BAR = 3.2
const GAP = 2
const BX = BAR + GAP
const VB_W = BX + SQ * 8
const VB_H = SQ * 8

const fileOf = (s: string) => s.charCodeAt(0) - 97
const rankOf = (s: string) => Number(s[1])
const origin = (s: string) => ({ x: BX + fileOf(s) * SQ, y: (8 - rankOf(s)) * SQ })
const center = (s: string) => {
  const o = origin(s)
  return { x: o.x + SQ / 2, y: o.y + SQ / 2 }
}
const r2 = (n: number) => Math.round(n * 100) / 100

/* Unicode pieces, the same approach ChessMate's board uses. FE0E forces
   text (not emoji) presentation. White = solid glyph in paper under the
   outline glyph in ink, so it reads as a white piece on any square. */
const SOLID: Record<string, string> = { K: "♚", Q: "♛", R: "♜", B: "♝", N: "♞", P: "♟" }
const OUTLINE: Record<string, string> = { K: "♔", Q: "♕", R: "♖", B: "♗", N: "♘", P: "♙" }
const VS = "︎"
const PIECE_FONT = '"Apple Symbols","Segoe UI Symbol","Noto Sans Symbols 2","DejaVu Sans",serif'

function Piece({ square, type, white }: { square: string; type: string; white: boolean }) {
  const c = center(square)
  const common = {
    x: c.x,
    y: c.y + 0.35,
    fontSize: 8.4,
    textAnchor: "middle" as const,
    dominantBaseline: "central" as const,
    style: { fontFamily: PIECE_FONT },
  }
  return white ? (
    <g>
      <text {...common} className="fill-background">
        {SOLID[type] + VS}
      </text>
      <text {...common} className="fill-foreground">
        {OUTLINE[type] + VS}
      </text>
    </g>
  ) : (
    <text {...common} className="fill-foreground">
      {SOLID[type] + VS}
    </text>
  )
}

function arrowGeometry(from: string, to: string) {
  const a = center(from)
  const b = center(to)
  const len = Math.hypot(b.x - a.x, b.y - a.y)
  const ux = (b.x - a.x) / len
  const uy = (b.y - a.y) / len
  const start = { x: a.x + ux * 2.4, y: a.y + uy * 2.4 }
  const tip = { x: b.x - ux * 2, y: b.y - uy * 2 }
  const base = { x: tip.x - ux * 3.2, y: tip.y - uy * 3.2 }
  const hw = 2
  return {
    line: `M${r2(start.x)} ${r2(start.y)} L${r2(base.x)} ${r2(base.y)}`,
    head: `${r2(tip.x)},${r2(tip.y)} ${r2(base.x - uy * hw)},${r2(base.y + ux * hw)} ${r2(base.x + uy * hw)},${r2(base.y - ux * hw)}`,
  }
}

const SQUARES = Array.from({ length: 64 }, (_, i) => {
  const f = i % 8
  const r = 8 - Math.floor(i / 8)
  return { name: String.fromCharCode(97 + f) + r, dark: (f + r) % 2 === 1 }
})

const BLUNDER = "oklch(0.55 0.16 27)"

function Board() {
  const from = origin(D.played.from)
  const to = origin(D.played.to)
  const f7 = origin("f7")
  const f7c = center("f7")
  const knightOffset = { x: from.x - to.x, y: from.y - to.y }

  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      className="block h-auto w-[42cqw] overflow-visible @sm:w-[min(calc((56.25cqw_-_48px)*1.06),56cqw)]"
      aria-hidden="true"
      data-cm-knight-dx={knightOffset.x}
      data-cm-knight-dy={knightOffset.y}
    >
      {/* Eval bar: ink = Black, paper = White, White grows from the bottom */}
      <rect x={0} y={0} width={BAR} height={VB_H} rx={0.8} className="fill-foreground/85" />
      <rect
        data-cm="bar-white"
        x={0}
        y={0}
        width={BAR}
        height={VB_H}
        rx={0.8}
        className="fill-background"
      />
      <rect x={0} y={0} width={BAR} height={VB_H} rx={0.8} fill="none" className="stroke-foreground/30" strokeWidth={0.35} />
      <text
        data-cm="bar-label"
        x={BAR / 2}
        y={VB_H - 1.6}
        fontSize={1.7}
        textAnchor="middle"
        className="fill-foreground font-mono font-semibold"
      >
        {D.evalAfter}
      </text>

      {/* Squares */}
      {SQUARES.map(({ name, dark }) => {
        const o = origin(name)
        return (
          <rect
            key={name}
            x={o.x}
            y={o.y}
            width={SQ}
            height={SQ}
            style={{ fill: dark ? "oklch(0.885 0.008 85)" : "oklch(0.975 0.004 85)" }}
          />
        )
      })}

      {/* Previous move (Bc4) fades out as 3…Nf6 lands */}
      <g data-cm="hl-old" opacity={0}>
        {[D.lastMove.from, D.lastMove.to].map((s) => {
          const o = origin(s)
          return <rect key={s} x={o.x} y={o.y} width={SQ} height={SQ} className="fill-foreground/[0.09]" />
        })}
      </g>
      <g data-cm="hl-new">
        {[from, to].map((o, i) => (
          <rect key={i} x={o.x} y={o.y} width={SQ} height={SQ} style={{ fill: BLUNDER, opacity: 0.14 }} />
        ))}
      </g>

      {/* f7: the square the engine number is really about */}
      <rect data-cm="f7" x={f7.x} y={f7.y} width={SQ} height={SQ} style={{ fill: BLUNDER, opacity: 0.16 }} />

      {/* Coordinates */}
      {Array.from({ length: 8 }, (_, i) => (
        <text
          key={`f${i}`}
          x={BX + i * SQ + SQ - 0.8}
          y={VB_H - 0.9}
          fontSize={2}
          textAnchor="end"
          className="fill-foreground/40 font-mono"
        >
          {String.fromCharCode(97 + i)}
        </text>
      ))}
      {Array.from({ length: 8 }, (_, i) => (
        <text key={`r${i}`} x={BX + 0.7} y={i * SQ + 2.4} fontSize={2} className="fill-foreground/40 font-mono">
          {8 - i}
        </text>
      ))}

      {/* Pieces */}
      {D.pieces.white.map(([s, t]) => (
        <Piece key={s} square={s} type={t} white />
      ))}
      {D.pieces.black.map(([s, t]) => (
        <Piece key={s} square={s} type={t} white={false} />
      ))}
      <g data-cm="knight">
        <Piece square={D.played.to} type="N" white={false} />
      </g>

      {/* Threat lines converging on f7 */}
      {D.threats.map(({ from: a, to: b }) => {
        const g = arrowGeometry(a, b)
        return (
          <g key={a} className="text-foreground/75">
            <path
              data-cm="arrow"
              d={g.line}
              pathLength={1}
              strokeDasharray="1"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
            />
            <polygon data-cm="head" points={g.head} fill="currentColor" />
          </g>
        )
      })}
      <circle
        data-cm="ring"
        cx={f7c.x}
        cy={f7c.y}
        r={4.6}
        fill="none"
        style={{ stroke: BLUNDER }}
        strokeWidth={0.7}
      />
    </svg>
  )
}

/*
 * "An engine that explains, not just evaluates." The board shows the
 * moment; the column splits it into two layers: what the engine says (a
 * number and a best move) and what the mentor adds (the reason, in words).
 * Sequence: knight lands → eval collapses → threat lines converge on f7 →
 * mentor note arrives. Final state is the markup.
 */
export function ChessMatePreview({ url }: { url?: string }) {
  const { ref, replay, canReplay } = usePreviewTimeline<HTMLDivElement>((tl, q) => {
    const svg = q("svg")[0] as SVGElement | undefined
    const dx = Number(svg?.dataset.cmKnightDx ?? 0)
    const dy = Number(svg?.dataset.cmKnightDy ?? 0)

    tl.fromTo(q("[data-cm=hl-old]"), { opacity: 1 }, { opacity: 0, duration: 0.3 }, 0.45)
      .from(q("[data-cm=hl-new]"), { opacity: 0, duration: 0.3 }, 0.45)
      .from(q("[data-cm=knight]"), { x: dx, y: dy, duration: 0.7, ease: "power2.inOut" }, 0.3)
      .from(q("[data-cm=move]"), { opacity: 0, y: 6 }, 1.0)
      .from(
        q("[data-cm=bar-white]"),
        { scaleY: D.whiteShareBefore, transformOrigin: "50% 100%", duration: 0.8, ease: "power2.inOut" },
        1.15
      )
      .from(q("[data-cm=eval-after]"), { opacity: 0, x: -4, duration: 0.35 }, 1.55)
      .from(q("[data-cm=bar-label]"), { opacity: 0, duration: 0.3 }, 1.8)
      .from(q("[data-cm=chip]"), { opacity: 0, scale: 0.85, duration: 0.35 }, 1.5)
      .from(q("[data-cm=engine]"), { opacity: 0, y: 6 }, 1.4)
      .from(q("[data-cm=f7]"), { opacity: 0, duration: 0.4 }, 2.0)
      .from(q("[data-cm=arrow]"), { strokeDashoffset: 1, duration: 0.6, stagger: 0.15, ease: "power2.out" }, 2.0)
      .from(q("[data-cm=head]"), { opacity: 0, duration: 0.2, stagger: 0.15 }, 2.45)
      .from(q("[data-cm=ring]"), { opacity: 0, scale: 0.5, transformOrigin: "50% 50%", duration: 0.4 }, 2.6)
      .from(q("[data-cm=mentor]"), { opacity: 0, y: 8, duration: 0.6 }, 2.85)
  })

  return (
    <LabFrame
      title="ChessMate"
      url={url}
      caption={D.caption}
      canReplay={canReplay}
      onReplay={replay}
      bodyRef={ref}
      bodyProps={{
        role: "img",
        "aria-label":
          "Sample ChessMate analysis. After 1.e4 e5 2.Qh5 Nc6 3.Bc4, Black plays 3…Nf6, marked as a blunder. The engine evaluation drops from −0.52 to mate in one (Qxf7#); the best move was 3…Qe7. A mentor note explains that queen and bishop both attack f7, which only the king defends.",
      }}
    >
      {/* Phone: board + move/engine side by side, mentor full-width below.
          Wider: board left, all three layers stacked in the right column. */}
      <div className="absolute inset-0 grid grid-cols-[auto_minmax(0,1fr)] grid-rows-[auto_minmax(0,1fr)_auto] gap-x-3 gap-y-2 px-4 pb-6 pt-4 @sm:grid-rows-[auto_auto_minmax(0,1fr)] @sm:gap-x-5 @sm:gap-y-3 @sm:px-5 @sm:pb-7 @sm:pt-5">
        <div className="row-span-2 self-start @sm:row-span-3">
          <Board />
        </div>

          {/* The move */}
          <div data-cm="move" className="col-start-2">
            <SpecLabel>black to move</SpecLabel>
            <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="font-display text-lg font-bold leading-none tracking-tight text-foreground @sm:text-2xl">
                {D.played.san}
              </span>
              <span
                data-cm="chip"
                className="inline-flex items-center gap-1 rounded-full border px-1.5 py-px font-mono text-[9px] @sm:text-[10px]"
                style={{
                  color: BLUNDER,
                  borderColor: "oklch(0.55 0.16 27 / 0.3)",
                  background: "oklch(0.55 0.16 27 / 0.06)",
                }}
              >
                <span className="font-semibold">??</span> blunder
              </span>
            </div>
          </div>

          {/* Layer 1: the engine evaluates */}
          <div data-cm="engine" className="col-start-2 border-t border-border pt-2">
            <SpecLabel>engine · evaluates</SpecLabel>
            <p className="mt-1 flex items-baseline gap-1.5 font-mono text-[11px] text-foreground @sm:text-xs">
              <span className="text-muted-foreground">{D.evalBefore}</span>
              <span data-cm="eval-after" className="flex min-w-0 items-baseline gap-1.5">
                <span className="text-muted-foreground">→</span>
                <span className="font-semibold">{D.evalAfter}</span>
                <span className="truncate text-muted-foreground">{D.refutation}</span>
              </span>
            </p>
            <p className="mt-0.5 font-mono text-[9.5px] text-muted-foreground @sm:text-[10.5px]">
              best was {D.best}
            </p>
          </div>

          {/* Layer 2: the mentor explains */}
          <div
            data-cm="mentor"
            className="col-span-2 min-h-0 self-end rounded-lg border border-border bg-background/80 p-2 @sm:col-span-1 @sm:col-start-2 @sm:self-start shadow-[0_1px_2px_oklch(0.16_0.01_270/0.04)] @sm:p-2.5"
          >
            <div className="flex flex-wrap items-center justify-between gap-1">
              <SpecLabel>mentor · explains</SpecLabel>
              <span className="hidden rounded-full border border-border px-1.5 font-mono text-[9px] text-muted-foreground @lg:inline">
                {D.motif}
              </span>
            </div>
            <p className="mt-1 text-[10.5px] leading-snug text-foreground/85 @sm:text-[11.5px] @xl:text-[12.5px]">
              {/* keep move tokens like "3…Qe7" unbroken */}
              {D.mentor.split(/(\d…\w+)/).map((part, i) =>
                i % 2 ? (
                  <span key={i} className="whitespace-nowrap">
                    {part}
                  </span>
                ) : (
                  part
                )
              )}
            </p>
          </div>
      </div>
    </LabFrame>
  )
}
