import { ChessBoard } from "./chess-board"

/** ChessMate card face (760×500 stage). Keeps its own palette inside the card. */
export function ChessMatePanel() {
  return (
    <div className="stage-inner relative box-border rounded-[28px] overflow-hidden bg-[#F1EADB] py-[22px] px-[30px] flex flex-col gap-[16px] text-[#1A1917] shadow-[0_40px_60px_-40px_rgba(60,40,10,0.45)]">
      <div className="flex justify-between items-center f-mono text-[11px] text-[#6E6252]">
        <span>chess-mate.app · game review</span>
        <span className="py-[4px] px-[10px] rounded-[999px] bg-[#E4D9C3]">black to move</span>
      </div>
      <div className="flex gap-[28px] items-start">
        <div className="flex gap-[10px]">
          {/* eval bar */}
          <div aria-hidden="true" className="relative w-[12px] h-[400px] bg-[#2B2723] rounded-[6px] overflow-hidden shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]">
            <div className="evalfill absolute left-0 right-0 bottom-0 h-[48%] bg-[#FBF8F1]" />
            <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-[rgba(184,138,90,0.7)]" />
          </div>
          <div className="box-border w-[400px] h-[400px] p-[8px] rounded-[10px] bg-[#2B2723] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_22px_34px_-22px_rgba(43,39,35,0.75)]">
            <ChessBoard />
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-[18px] pt-[6px]">
          <div className="flex gap-[10px] items-center">
            <span className="f-mono font-medium text-[40px] tracking-[-0.03em]">3...Nf6</span>
            <span className="py-[4px] px-[9px] rounded-[6px] bg-[#E8A33D] f-mono text-[12px] font-medium">?? blunder</span>
          </div>
          <div className="flex flex-col gap-[4px] f-mono text-[12px] text-[#6E6252]">
            <span>engine · eval</span>
            <span className="text-[15px] text-[#1A1917]">
              {/* Geist Mono's Google subsets have no "→"; the reference renders it in the
                  generic monospace. Pinned so next/font's Arial fallback face can't catch it. */}
              −0.52 <span className="sys-mono">→</span> #1 Qxf7
            </span>
          </div>
          <div className="bg-[#FBF8F1] rounded-[16px] py-[16px] px-[18px] flex flex-col gap-[8px] shadow-[0_10px_24px_-14px_rgba(60,40,10,0.35)]">
            <span className="f-mono text-[11px] text-[#6E6252]">mentor · explains</span>
            <span className="text-[15px] leading-[1.5]">Nf6 develops, but leaves f7 to your king alone. Queen and bishop both hit it.</span>
          </div>
          <span className="f-mono text-[10.5px] text-[#8A7D6A]">illustrative sample position</span>
        </div>
      </div>
    </div>
  )
}
