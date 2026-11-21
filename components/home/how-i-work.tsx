import { Fragment } from "react"
import { cn } from "@/lib/utils"
import { SectionHeader } from "./section-header"

type Step = { n: string; label: string; tone: "plain" | "ink" | "dashed" }

const steps: Step[] = [
  { n: "01", label: "watch people", tone: "plain" },
  { n: "02", label: "build", tone: "plain" },
  { n: "03", label: "ship fast", tone: "ink" },
  { n: "04", label: "measure honestly", tone: "plain" },
  { n: "05", label: "iterate", tone: "dashed" },
]

const buildsWith = ["Python", "TypeScript", "React", "Next.js", "Supabase"]
const thinksIn = ["Systems", "Products", "AI", "User behaviour", "Experiments"]

function StepChip({ step }: { step: Step }) {
  return (
    <span
      className={cn(
        "inline-flex flex-col gap-[6px] items-center text-center py-[18px] px-[22px] border rounded-[18px] min-w-[150px]",
        step.tone === "plain" && "bg-[#FFFFFF] border-[#E4E4E2]",
        step.tone === "ink" && "bg-[#0A0A0A] text-[#FFFFFF] border-[#0A0A0A]",
        step.tone === "dashed" && "bg-[#FFFFFF] border-dashed border-[#A3A3A3]",
      )}
    >
      <span className={cn("f-mono text-[11px]", step.tone === "ink" ? "text-[#A3A3A3]" : "text-[#6B6B6B]")}>{step.n}</span>
      <span className="font-medium text-[17px]">{step.label}</span>
    </span>
  )
}

function LoopArrow() {
  return (
    <svg className="loop-arrow" aria-hidden="true" width="28" height="12" viewBox="0 0 28 12" fill="none" stroke="#A3A3A3" strokeWidth="1.5">
      <path d="M0 6 H26 M21 1 L26 6 L21 11" />
    </svg>
  )
}

export function HowIWork() {
  return (
    <section id="how">
      <div className="max-w-[1280px] mx-auto box-border pt-[24px] px-[32px] pb-[16px] flex flex-col gap-[56px]">
        <SectionHeader title="How I work" note="the loop behind everything below" className="mb-[-8px]" />

        <p className="m-0 max-w-[900px] font-medium text-[length:clamp(30px,3.6vw,52px)] leading-[1.06] tracking-[-0.035em] text-balance">
          I build products for the quiet problems people carry every day.
        </p>

        <div className="relative pb-[72px]">
          <div className="loop flex gap-[10px] items-center justify-between">
            {steps.map((step, i) => (
              <Fragment key={step.n}>
                {i > 0 && <LoopArrow />}
                {i === 0 ? (
                  <div className="relative flex-[1_1_0] flex justify-center">
                    <StepChip step={step} />
                    {/* The red-pen circle around "watch people" */}
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 200 90"
                      preserveAspectRatio="none"
                      className="absolute left-1/2 top-1/2 w-[210px] h-[96px] [transform:translate(-50%,-50%)_rotate(-2deg)] overflow-visible"
                      fill="none"
                      stroke="#D9381E"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    >
                      <path d="M104 6 C40 4, 4 22, 8 48 C12 78, 70 88, 120 84 C176 80, 198 58, 192 34 C186 12, 140 2, 92 10" vectorEffect="non-scaling-stroke" />
                    </svg>
                    <span className="hide-sm absolute left-1/2 top-[-46px] [transform:translateX(-20%)_rotate(-4deg)] f-pen font-semibold text-[26px] text-[#D9381E] whitespace-nowrap">
                      start here. always.
                    </span>
                  </div>
                ) : (
                  <div className="flex-[1_1_0] flex justify-center">
                    <StepChip step={step} />
                  </div>
                )}
              </Fragment>
            ))}
          </div>
          <svg
            className="arc absolute left-0 right-0 bottom-0 w-full h-[60px]"
            aria-hidden="true"
            viewBox="0 0 1000 60"
            preserveAspectRatio="none"
            fill="none"
            stroke="#A3A3A3"
            strokeWidth="1.5"
            strokeDasharray="4 5"
          >
            <path d="M910 0 C910 58, 300 58, 300 4" vectorEffect="non-scaling-stroke" />
          </svg>
          <span className="arc absolute left-1/2 bottom-[2px] [transform:translateX(-30%)] f-mono text-[12px] text-[#6B6B6B] bg-[#FFFFFF] px-[10px]">
            loop until it&apos;s true
          </span>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(420px,100%),1fr))] gap-y-[20px] gap-x-[48px] border-t border-[#EAEAEA] pt-[28px]">
          <div className="flex flex-wrap gap-[8px] items-center">
            <span className="w-[96px] f-mono text-[12px] text-[#6B6B6B]">builds with</span>
            {buildsWith.map((item) => (
              <span key={item} className="py-[6px] px-[12px] rounded-[999px] bg-[#F5F5F4] text-[14px]">
                {item}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-[8px] items-center">
            <span className="w-[96px] f-mono text-[12px] text-[#6B6B6B]">thinks in</span>
            {thinksIn.map((item) => (
              <span key={item} className="py-[6px] px-[12px] rounded-[999px] border border-[#D6D6D4] text-[14px]">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
