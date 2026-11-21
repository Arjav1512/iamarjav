import { SocialLinks } from "./icons"

/*
 * Hero. The entrance (.rise) and the three pen marks (.m-*) are CSS
 * animations with delays that start after the entrance has finished, so the
 * marks render even with JavaScript disabled.
 */
export function Hero() {
  return (
    <section id="top" className="max-w-[1280px] mx-auto box-border pt-[132px] px-[32px] pb-[104px]">
      <p className="rise m-0 mb-[28px] f-mono text-[14px] text-[#6B6B6B]">hey, i&apos;m arjav jain —</p>

      <div className="relative">
        {/* The whitespace between the block lines keeps the accessible name a plain sentence. */}
        <h1 className="m-0 font-semibold text-[length:clamp(48px,9vw,136px)] leading-[0.94] tracking-[-0.055em]">
          <span className="rise d1 block">
            I <mark className="m-highlight">build</mark> and
          </span>{" "}
          <span className="rise d2 block">
            <span className="m-squiggle">break</span> things,
          </span>{" "}
          <span className="rise d3 block">
            and <span className="m-underline">ship</span> a lot.
          </span>
        </h1>
        <ul className="m-notes">
          <li className="m-note m-n1">
            <svg aria-hidden="true" width="16" height="10" viewBox="0 0 16 10">
              <rect width="16" height="10" rx="1.5" fill="#FFD93B" />
            </svg>
            ChessMate, Mirror and Torch, demoed below
          </li>
          <li className="m-note m-n2">
            <svg aria-hidden="true" width="18" height="10" viewBox="0 0 18 10" fill="none" stroke="#D9381E" strokeWidth="1.8" strokeLinecap="round">
              <path d="M1 6 Q3.5 1 6 6 T11 6 T16 6" />
            </svg>
            Torch: two parts not built yet
          </li>
          <li className="m-note m-n3">
            <svg aria-hidden="true" width="18" height="10" viewBox="0 0 18 10">
              <rect y="4" width="18" height="2.4" fill="#2340E0" />
            </svg>
            5 shipped so far: 2 products, 3 experiments
          </li>
        </ul>
      </div>

      <div className="rise d4 mt-[56px] flex flex-wrap gap-y-[20px] gap-x-[40px] items-center justify-between">
        <div className="flex flex-wrap gap-y-[14px] gap-x-[32px] items-center text-[15px]">
          <a href="#work" className="inline-flex gap-[12px] items-center no-underline pt-[10px] pr-[18px] pb-[10px] pl-[14px] border border-[#EAEAEA] rounded-[999px]">
            <span className="pulse w-[8px] h-[8px] rounded-[50%] bg-[#0A0A0A]" />
            <span>
              <span className="text-[#6B6B6B]">now building</span> Torch
            </span>
            <span className="f-mono text-[12px] text-[#6B6B6B]">dev docs from Figma changes</span>
          </a>
          <span className="f-mono text-[13px] text-[#6B6B6B]">CS/AI · Bennett &apos;29</span>
        </div>
        <div className="flex items-center gap-0 mx-[-10px]">
          <SocialLinks withEmail />
        </div>
      </div>
    </section>
  )
}
