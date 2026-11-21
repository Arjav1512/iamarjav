import type { ReactNode } from "react"
import { SectionHeader } from "./section-header"

/*
 * Journey: a fan of five credential cards (each a different physical object,
 * warming from grey to orange), a proportional timeline and a "Currently"
 * line. On the warm #FAF7F2 band.
 */

/** Role line (plain text, or custom markup as children) over a description. */
function Role({ role, desc, descColor, children }: { role?: string; desc: string; descColor: string; children?: ReactNode }) {
  return (
    <span className="flex flex-col gap-[4px]">
      {children ?? <span className="j-role">{role}</span>}
      <span className="j-desc" style={{ color: descColor }}>
        {desc}
      </span>
    </span>
  )
}

/* Proportional bars: 2024 → Now spans 36 months. */
const bars = [
  { left: "0", width: "33.33%", top: "4px", color: "#D9D5CE" },
  { left: "0", width: "33.33%", top: "14px", color: "#D8C8AC" },
  { left: "58.33%", width: "13.89%", top: "4px", color: "#EDC27A" },
  { left: "72.22%", width: "19.44%", top: "24px", color: "#EAA23A" },
  { left: "77.78%", width: "19.44%", top: "34px", color: "#D9731E" },
]

export function Journey() {
  return (
    <div id="journey">
      <section aria-labelledby="journey-title" className="w-full bg-[#FAF7F2] text-[#0A0A0A]">
        <div className="max-w-[1280px] mx-auto box-border pt-[112px] px-[32px] pb-[96px] flex flex-col gap-[32px]">
          <SectionHeader title="Journey" note="five stops, 2024 to now" titleId="journey-title" className="border-[#ECE6DC]" />

          <div className="relative">
            <span className="pen absolute right-[1%] top-0 flex gap-[6px] items-end [transform:rotate(3deg)] f-pen font-semibold text-[28px] leading-[0.95] text-[#D9381E] z-[7]">
              both at once
              <svg aria-hidden="true" width="46" height="38" viewBox="0 0 46 38" fill="none" stroke="#D9381E" strokeWidth="2.2" strokeLinecap="round">
                <path d="M4 6 C26 4, 40 16, 36 34" />
                <path d="M29 28 L36 35 L42 27" />
              </svg>
            </span>

            <div className="fan flex justify-center items-center gap-0 pt-[104px] px-0 pb-[32px] min-h-[360px]">
              {/* DigiArc: business card */}
              <div className="cred flex-none mr-[-10px] [transform:rotate(-4deg)] relative z-[1]">
                <div className="box-border w-[262px] h-[168px] py-[20px] px-[22px] bg-[#ECEAE6] text-[#2A2723] rounded-[8px] shadow-[0_22px_34px_-22px_rgba(0,0,0,0.45)] flex flex-col justify-between">
                  <span className="flex items-center gap-[9px]">
                    <span aria-hidden="true" className="w-[10px] h-[10px] rounded-[50%] bg-[#57524B]" />
                    <span className="j-co">DigiArc</span>
                  </span>
                  <Role role="Co-founder" desc="Digital Marketing Agency" descColor="#6B655D" />
                  <span className="j-date text-[#6B655D]">2024</span>
                </div>
              </div>

              {/* Cult Notice: clothing tag on a string */}
              <div className="cred flex-none mr-[-10px] [transform:rotate(3deg)] relative z-[2]">
                <svg aria-hidden="true" width="60" height="70" viewBox="0 0 60 70" fill="none" stroke="#A89A82" strokeWidth="1.6" className="absolute left-[60px] top-[-58px]">
                  <path d="M30 70 C10 50, 50 30, 22 0" />
                </svg>
                <div className="relative box-border w-[184px] h-[276px] pt-[48px] px-[22px] pb-[22px] bg-[#E3D7C2] text-[#2A2318] rounded-[10px_10px_8px_8px] [clip-path:polygon(22%_0,78%_0,100%_9%,100%_100%,0_100%,0_9%)] flex flex-col justify-between">
                  <span aria-hidden="true" className="absolute left-1/2 top-[14px] w-[14px] h-[14px] ml-[-7px] rounded-[50%] bg-[#FAF7F2] shadow-[0_0_0_3px_#CDBFA6]" />
                  <span className="j-co">Cult Notice</span>
                  <span
                    aria-hidden="true"
                    className="h-[26px] bg-[repeating-linear-gradient(90deg,#2A2318_0_2px,transparent_2px_4px,#2A2318_4px_5px,transparent_5px_9px)] opacity-[0.85]"
                  />
                  <Role role="Co-founder" desc="Gen Z Clothing Brand" descColor="#5E5240" />
                  <span className="j-date text-[#5E5240]">2024</span>
                </div>
              </div>

              {/* ElevenX: lanyard ID badge */}
              <div className="cred flex-none mr-[-10px] [transform:rotate(-2deg)] relative z-[3]">
                <div aria-hidden="true" className="absolute left-1/2 top-[-96px] w-[28px] h-[88px] ml-[-14px] bg-[#EDC27A]" />
                <div aria-hidden="true" className="absolute left-1/2 top-[-14px] w-[20px] h-[22px] ml-[-10px] rounded-[4px] bg-[linear-gradient(#D6D6D4,#8C8C8C)]" />
                <div className="box-border w-[204px] h-[292px] bg-[#FFFFFF] rounded-[12px] overflow-hidden shadow-[0_22px_34px_-22px_rgba(0,0,0,0.45)] flex flex-col">
                  <div className="h-[48px] flex-none bg-[#EDC27A] text-[#2A1E08] flex items-center justify-between px-[20px]">
                    <span className="j-co">ElevenX</span>
                    <span aria-hidden="true" className="w-[32px] h-[8px] rounded-[4px] bg-[#FAF7F2]" />
                  </div>
                  <div className="flex-1 p-[20px] flex flex-col justify-between text-[#0A0A0A]">
                    <span aria-hidden="true" className="w-[54px] h-[54px] rounded-[10px] bg-[#F7EBD3] flex items-center justify-center f-mono text-[13px] text-[#7A5A1E]">
                      AJ
                    </span>
                    <Role role="Intern" desc="Sales & Marketing" descColor="#6B6B6B" />
                    <span className="j-date text-[#6B6B6B]">Oct 2025 – Feb 2026</span>
                  </div>
                </div>
              </div>

              {/* Wroob: chip card */}
              <div className="cred flex-none mr-[-10px] [transform:rotate(3deg)] relative z-[4]">
                <div className="box-border w-[272px] h-[176px] py-[20px] px-[22px] bg-[#EAA23A] text-[#1E1406] rounded-[14px] shadow-[0_22px_34px_-22px_rgba(0,0,0,0.6)] flex flex-col justify-between">
                  <span className="flex justify-between items-center">
                    <span className="j-co">Wroob</span>
                    <span aria-hidden="true" className="w-[38px] h-[28px] rounded-[6px] bg-[linear-gradient(135deg,#F6D79A,#C98A2A)] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.25)]" />
                  </span>
                  <Role role="Co-founder" desc="AI Internship Matching" descColor="#4A3410" />
                  <span className="j-date text-[#4A3410]">Mar 2026 – Sep 2026</span>
                </div>
              </div>

              {/* Makhana Express: shipping label, circled "now" */}
              <div className="cred flex-none [transform:rotate(-2deg)] relative z-[5]">
                <div className="relative box-border w-[224px] h-[292px] p-[22px] bg-[#D9731E] text-[#1E1004] rounded-[8px] shadow-[0_22px_34px_-22px_rgba(60,40,10,0.6)] flex flex-col justify-between">
                  <span className="j-co">Makhana Express</span>
                  <Role desc="Import & Export" descColor="#3A1E06">
                    <span className="flex justify-between items-center">
                      <span className="j-role">CTO</span>
                      <span className="relative inline-flex items-center justify-center w-[52px] h-[34px] f-pen font-semibold text-[22px] text-[#1E1004] [transform:rotate(-6deg)]">
                        now
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 64 44"
                          fill="none"
                          stroke="#1E1004"
                          strokeWidth="2"
                          className="absolute inset-[-4px_-6px] w-[calc(100%+12px)] h-[calc(100%+8px)] overflow-visible"
                        >
                          <path d="M34 3 C12 3, 3 14, 6 26 C9 38, 40 42, 54 34 C66 26, 60 8, 40 4" />
                        </svg>
                      </span>
                    </span>
                  </Role>
                  <span className="j-date text-[#3A1E06]">May 2026 – Nov 2026</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-[8px]">
            <div className="relative h-[44px]">
              {bars.map((bar) => (
                <div
                  key={bar.color}
                  aria-hidden="true"
                  className="absolute h-[6px] rounded-[3px]"
                  style={{ left: bar.left, width: bar.width, top: bar.top, background: bar.color }}
                />
              ))}
            </div>
            <div className="relative h-[18px] border-t border-[#DDD5C8] f-mono text-[11px] text-[#6B6B6B]">
              <span className="absolute left-0 top-[6px]">2024</span>
              <span className="absolute left-[33.33%] top-[6px]">2025</span>
              <span className="absolute left-[66.67%] top-[6px]">2026</span>
              <span className="absolute right-0 top-[6px] text-[#0A0A0A]">Now</span>
            </div>
          </div>

          <p className="m-0 mt-[8px] text-[16px] leading-[1.6] text-[#6B6B6B]">
            <span className="f-mono text-[12px] text-[#0A0A0A] mr-[12px]">Currently</span>
            Building random tools, reading essays, watching people use software and thinking about behaviour.
          </p>
        </div>
      </section>
    </div>
  )
}
