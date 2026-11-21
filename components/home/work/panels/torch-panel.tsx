import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

/** Torch card face (760×500 stage): the handoff pipeline, lit where it is built. */

const icons = {
  figma: <path d="M8 3v18M16 3v18M3 8h18M3 16h18" />,
  diff: (
    <>
      <rect x="3" y="3" width="12" height="12" rx="2" />
      <rect x="9" y="9" width="12" height="12" rx="2" />
    </>
  ),
  doc: (
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5M9 13h6M9 17h4" />
    </>
  ),
  monitor: <path d="M3 12h4l2.5-6 5 12L17 12h4" />,
}

type Item = { label: string; done: boolean }
type Stage = { n: string; name: string; icon: keyof typeof icons; lit: boolean; items: Item[]; materials?: string[] }

const stages: Stage[] = [
  { n: "01", name: "Figma file", icon: "figma", lit: true, items: [{ label: "file watched", done: true }, { label: "changes detected", done: true }] },
  { n: "02", name: "Snapshot + diff", icon: "diff", lit: true, items: [{ label: "component diffs", done: true }, { label: "property-level diffs", done: false }] },
  {
    n: "03",
    name: "Materials",
    icon: "doc",
    lit: true,
    items: [{ label: "generated per change", done: true }],
    materials: ["dev summary", "changelog", "PDF spec", "video script"],
  },
  { n: "04", name: "Monitoring", icon: "monitor", lit: false, items: [{ label: "version history", done: false }] },
]

const itemClass = "flex items-center gap-[7px] f-mono text-[10.5px]"

function Check() {
  return (
    <svg aria-hidden="true" width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="#FFB547" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 6.2 5 8.6 9.6 3.6" />
    </svg>
  )
}

function Pending() {
  return <span aria-hidden="true" className="w-[9px] h-[9px] box-border rounded-[50%] border-[1.2px] border-dashed border-[#6E685E] mx-[1px]" />
}

function StageCard({ stage }: { stage: Stage }) {
  return (
    <div
      className={cn(
        "w-[152px] flex-none box-border p-[14px] rounded-[16px] flex flex-col gap-[12px] border",
        stage.lit
          ? "bg-[linear-gradient(180deg,rgba(255,181,71,0.13),rgba(255,181,71,0.03)_60%,rgba(255,181,71,0.02))] border-[rgba(255,181,71,0.55)] shadow-[inset_0_1px_0_rgba(255,214,150,0.25),0_0_0_4px_rgba(255,181,71,0.04),0_14px_30px_-14px_rgba(255,160,40,0.35)]"
          : "bg-[rgba(255,255,255,0.015)] border-dashed border-[#4A443A]",
      )}
    >
      <div className="flex justify-between items-center">
        <span
          className={cn(
            "w-[32px] h-[32px] rounded-[9px] flex items-center justify-center",
            stage.lit
              ? "text-[#FFB547] bg-[rgba(255,181,71,0.12)] shadow-[inset_0_0_0_1px_rgba(255,181,71,0.35)]"
              : "text-[#6E685E] bg-[rgba(255,255,255,0.03)] shadow-[inset_0_0_0_1px_#3A342B]",
          )}
        >
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            {icons[stage.icon]}
          </svg>
        </span>
        <span className={cn("f-mono text-[10px]", stage.lit ? "text-[#FFB547]" : "text-[#6E685E]")}>{stage.n}</span>
      </div>
      <span className={cn("text-[15px] font-semibold tracking-[-0.01em]", stage.lit ? "text-[#F2F0ED]" : "text-[#9A948A]")}>{stage.name}</span>
      <div className="flex flex-col gap-[6px]">
        {stage.items.map((item) => (
          <span key={item.label} className={cn(itemClass, item.done ? "text-[#C9C3B8]" : "text-[#6E685E]")}>
            {item.done ? <Check /> : <Pending />}
            {item.label}
          </span>
        ))}
        {stage.materials && (
          <span className="grid grid-cols-[repeat(2,minmax(0,1fr))] gap-[4px] mt-[2px]">
            {stage.materials.map((m) => (
              <span key={m} className="py-[4px] px-0 text-center rounded-[5px] bg-[#241F18] shadow-[inset_0_0_0_1px_#3A342B] f-mono text-[8.5px] tracking-[-0.02em] text-[#C9C3B8] whitespace-nowrap">
                {m}
              </span>
            ))}
          </span>
        )}
      </div>
    </div>
  )
}

function Connector({ lit, delay }: { lit: boolean; delay?: string }): ReactNode {
  if (!lit) {
    return <div aria-hidden="true" className="relative flex-1 h-[2px] mt-[30px] bg-[repeating-linear-gradient(90deg,#4A443A_0_5px,transparent_5px_10px)]" />
  }
  return (
    <div aria-hidden="true" className="relative flex-1 h-[2px] mt-[30px] rounded-[1px] bg-[linear-gradient(90deg,rgba(255,181,71,0.55),rgba(255,181,71,0.25))]">
      <span className="tp-flow absolute top-[-2px] w-[6px] h-[6px] rounded-[50%] bg-[#FFB547] shadow-[0_0_8px_#FFB547]" style={{ animationDelay: delay }} />
    </div>
  )
}

export function TorchPanel() {
  return (
    <div className="stage-inner relative box-border rounded-[28px] overflow-hidden bg-[radial-gradient(120%_90%_at_18%_0%,#2A1F10_0%,#121212_55%)] py-[22px] px-[30px] flex flex-col gap-[22px] text-[#F2F0ED] shadow-[0_40px_60px_-40px_rgba(0,0,0,0.7)]">
      <div>
        <div className="relative w-[700px] h-[456px] flex flex-col gap-[24px]">
          <div className="flex justify-between items-center f-mono text-[11px] text-[#9A948A]">
            <span className="inline-flex items-center gap-[8px]">
              <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="#FFB547">
                <path d="M12 2c1 3.5 4.5 5.2 4.5 9.2A4.5 4.5 0 0 1 12 15.7a4.5 4.5 0 0 1-4.5-4.5c0-2 1-3.3 2-4.2.2 1.6 1 2.6 2 3 .1-3 .3-5.2.5-8z" />
                <path d="M9.5 17h5l-1 5h-3z" opacity="0.6" />
              </svg>
              torch · handoff pipeline
            </span>
            <span className="inline-flex items-center gap-[6px] py-[4px] px-[10px] rounded-[999px] border border-[#3A342B] text-[#FFB547]">
              <span aria-hidden="true" className="tp-pulse w-[6px] h-[6px] rounded-[50%] bg-[#FFB547]" />
              in progress
            </span>
          </div>

          <div className="flex flex-col gap-[6px]">
            <span className="font-semibold text-[30px] leading-[1.1] tracking-[-0.03em] text-[#F2F0ED]">Design changed. Docs already written.</span>
            <span className="text-[14px] text-[#9A948A]">Figma file in, developer materials out. Lit means built.</span>
          </div>

          <div
            role="img"
            aria-label="Torch pipeline: Figma file, snapshot and diff, and materials are built; monitoring is not built yet. Property-level diffs and version history are not built yet."
            className="flex items-stretch"
          >
            <StageCard stage={stages[0]} />
            <Connector lit delay="0s" />
            <StageCard stage={stages[1]} />
            <Connector lit delay=".8s" />
            <StageCard stage={stages[2]} />
            <Connector lit={false} />
            <StageCard stage={stages[3]} />
          </div>

          <div className="mt-auto flex items-center gap-[16px] pt-[2px]">
            <div aria-hidden="true" className="flex gap-[4px] w-[120px]">
              {[true, true, true, false].map((on, i) => (
                <span key={i} className={cn("flex-1 h-[6px] rounded-[3px]", on ? "bg-[#FFB547] shadow-[0_0_10px_rgba(255,181,71,0.45)]" : "bg-[#3A342B] shadow-none")} />
              ))}
            </div>
            <span className="f-mono text-[11px] text-[#C9C3B8]">3 of 4 stages lit</span>
            <span className="ml-auto f-mono text-[10.5px] text-[#6E685E]">not built yet: property-level diffs · version history</span>
          </div>
        </div>
      </div>
    </div>
  )
}
