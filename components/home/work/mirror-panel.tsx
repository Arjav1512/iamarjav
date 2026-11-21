import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

/** Mirror card face (760×500 stage): a sample journal entry and its analysis. */

const mood = [
  { day: "M", h: "60%" },
  { day: "T", h: "75%" },
  { day: "W", h: "50%" },
  { day: "T", h: "68%" },
  { day: "F", h: "40%" },
  { day: "S", h: "32%" },
  { day: "S", h: "22%", today: true },
]

const noticed = [
  { n: 1, name: "Overgeneralization", quote: "“every time”" },
  { n: 2, name: "Emotional reasoning", quote: "“so I probably am”" },
  { n: 3, name: "Fortune telling", quote: "“tomorrow will go badly”" },
]

/* Lined journal paper: red margin rule + 34px ruled lines from 78px down. */
const paperStyle = {
  backgroundColor: "#FFFFFF",
  backgroundImage:
    "linear-gradient(90deg, transparent 27px, #F1D9D6 27px, #F1D9D6 28px, transparent 28px), repeating-linear-gradient(transparent 0 33px, #EEF0F3 33px 34px)",
  backgroundPosition: "0 0, 0 78px",
  backgroundRepeat: "no-repeat, repeat",
  backgroundSize: "100% 100%, 100% 34px",
}

const glassIcon = "bg-[linear-gradient(135deg,#FFFFFF,#BFC6CE)] shadow-[inset_0_0_0_1px_rgba(22,24,27,0.12)]"

function Marked({ children }: { children: ReactNode }) {
  return <span className="bg-[linear-gradient(transparent_58%,#E6E9ED_58%)] shadow-[inset_0_-2px_0_#9AA2AB] px-[1px]">{children}</span>
}

function Marker({ n }: { n: number }) {
  return (
    <span aria-hidden="true" className="inline-flex items-center justify-center w-[16px] h-[16px] rounded-[50%] bg-[#16181B] text-[#FFFFFF] f-mono text-[9.5px] font-medium [vertical-align:0.45em] ml-[3px]">
      {n}
    </span>
  )
}

export function MirrorPanel() {
  return (
    <div className="stage-inner relative box-border rounded-[28px] overflow-hidden bg-[linear-gradient(160deg,#F4F5F7_0%,#DCE0E5_100%)] py-[22px] px-[30px] flex flex-col gap-[16px] text-[#16181B] shadow-[0_40px_60px_-40px_rgba(20,30,40,0.45)]">
      <div className="sheen absolute inset-[-20%] bg-[linear-gradient(115deg,transparent_42%,rgba(255,255,255,0.6)_50%,transparent_58%)] pointer-events-none" aria-hidden="true" />
      <div>
        <div className="relative w-[700px] flex flex-col gap-[16px]">
          <div className="flex justify-between items-center f-mono text-[11px] text-[#5C636B]">
            <span className="inline-flex items-center gap-[8px]">
              <span aria-hidden="true" className={cn("w-[16px] h-[16px] rounded-[5px]", glassIcon)} />
              usemirror.dev · journal
            </span>
            <span className="inline-flex items-center gap-[6px] py-[4px] px-[10px] rounded-[999px] bg-[rgba(255,255,255,0.75)] shadow-[inset_0_0_0_1px_rgba(22,24,27,0.06)]">
              <span aria-hidden="true" className="w-[6px] h-[6px] rounded-[50%] bg-[#16181B]" />
              live in production
            </span>
          </div>

          <div
            role="img"
            aria-label="Sample Mirror journal entry with three thinking patterns highlighted: overgeneralization, emotional reasoning and fortune telling; weekly mood trending down; sentiment minus 0.42"
            className="flex gap-[22px]"
          >
            {/* journal page with two stacked sheets behind it */}
            <div className="relative w-[404px] h-[404px] flex-none">
              <div aria-hidden="true" className="absolute inset-[10px_-8px_-8px_10px] rounded-[12px] bg-[#E9ECEF] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]" />
              <div aria-hidden="true" className="absolute inset-[5px_-4px_-4px_5px] rounded-[12px] bg-[#F3F5F7] shadow-[0_10px_20px_-16px_rgba(20,30,40,0.5)]" />
              <div
                className="relative box-border h-full rounded-[12px] pt-[22px] pr-[26px] pb-[22px] pl-[40px] flex flex-col gap-[14px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_0_0_1px_rgba(22,24,27,0.05),0_22px_40px_-26px_rgba(20,30,40,0.55)]"
                style={paperStyle}
              >
                <div className="flex justify-between items-baseline f-mono text-[11px] text-[#5C636B]">
                  <span>Sunday, 9:42 pm</span>
                  <span>sample entry · 21 words</span>
                </div>
                <p className="m-0 mt-[6px] text-[22px] leading-[34px] tracking-[-0.012em] text-[#16181B]">
                  <Marked>Every time</Marked>
                  <Marker n={1} /> I present, my mind goes blank. <Marked>I feel unprepared, so I probably am.</Marked>
                  <Marker n={2} /> <Marked>Tomorrow will go badly too.</Marked>
                  <Marker n={3} />
                </p>
                <div className="mt-auto flex gap-[12px] py-[14px] px-[16px] rounded-[12px] bg-[linear-gradient(160deg,#F6F7F9,#E9ECEF)] shadow-[inset_0_0_0_1px_rgba(22,24,27,0.06)]">
                  <span aria-hidden="true" className={cn("flex-none w-[22px] h-[22px] rounded-[7px]", glassIcon)} />
                  <span className="flex flex-col gap-[3px]">
                    <span className="f-mono text-[10.5px] text-[#5C636B]">Reflection</span>
                    <span className="text-[14px] leading-[1.45] text-[#16181B]">Is it really every time? Name one talk that went fine.</span>
                  </span>
                </div>
              </div>
            </div>

            {/* analysis panel */}
            <div className="flex-1 min-w-0 box-border h-[404px] pt-[18px] px-[18px] pb-[10px] rounded-[16px] bg-[rgba(255,255,255,0.55)] border border-[rgba(255,255,255,0.85)] shadow-[0_18px_34px_-26px_rgba(20,30,40,0.45),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-[8px] flex flex-col gap-[16px]">
              <div className="flex flex-col gap-[10px]">
                <div className="flex justify-between f-mono text-[11px] text-[#5C636B]">
                  <span>This week · mood</span>
                  <span className="text-[#16181B]">today</span>
                </div>
                <div aria-hidden="true" className="flex gap-[7px]">
                  {mood.map((d, i) => (
                    <span key={i} className="flex flex-col items-center gap-[6px] flex-1">
                      <span className="w-full h-[56px] flex items-end">
                        <span
                          className={cn(
                            "w-full rounded-[5px]",
                            d.today
                              ? "bg-[#16181B] shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
                              : "bg-[linear-gradient(#C6CCD3,#9AA2AB)] shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]",
                          )}
                          style={{ height: d.h }}
                        />
                      </span>
                      <span className={cn("f-mono text-[10px]", d.today ? "text-[#16181B] font-medium" : "text-[#5C636B] font-normal")}>{d.day}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-[8px]">
                <div className="flex justify-between items-baseline">
                  <span className="f-mono text-[11px] text-[#5C636B]">Sentiment</span>
                  <span className="f-mono font-medium text-[24px] tracking-[-0.03em] text-[#16181B]">−0.42</span>
                </div>
                <div aria-hidden="true" className="relative h-[6px] rounded-[3px] bg-[linear-gradient(90deg,#8E969F,#DCE0E5_50%,#F4F5F7)]">
                  <span className="absolute left-1/2 top-[-3px] w-[1px] h-[12px] bg-[rgba(22,24,27,0.25)]" />
                  <span className="absolute left-[29%] top-1/2 w-[12px] h-[12px] mt-[-6px] ml-[-6px] rounded-[50%] bg-[#16181B] shadow-[0_0_0_3px_#FFFFFF,0_2px_6px_rgba(20,30,40,0.35)]" />
                </div>
                <div className="flex justify-between f-mono text-[10px] text-[#5C636B]">
                  <span>−1</span>
                  <span>0</span>
                  <span>+1</span>
                </div>
              </div>

              <div className="flex flex-col">
                <span className="f-mono text-[11px] text-[#5C636B] pb-[4px]">Mirror noticed</span>
                {noticed.map((item) => (
                  <div key={item.n} className="flex items-center gap-[10px] py-[8px] border-t border-[rgba(22,24,27,0.07)]">
                    <span className="inline-flex items-center justify-center w-[18px] h-[18px] flex-none rounded-[50%] bg-[#16181B] text-[#FFFFFF] f-mono text-[10px] font-medium">
                      {item.n}
                    </span>
                    <span className="flex flex-col gap-[1px] min-w-0">
                      <span className="text-[14px] font-medium text-[#16181B]">{item.name}</span>
                      <span className="f-mono text-[10.5px] text-[#5C636B] whitespace-nowrap overflow-hidden text-ellipsis">{item.quote}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
