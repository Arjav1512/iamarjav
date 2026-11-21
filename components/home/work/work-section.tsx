import { SectionHeader } from "../section-header"
import { ChessMatePanel } from "./chessmate-panel"
import { MirrorPanel } from "./mirror-panel"
import { TorchPanel } from "./torch-panel"
import { WorkCarousel } from "./work-carousel"

export function WorkSection() {
  return (
    <>
      <section id="work" className="max-w-[1280px] mx-auto box-border pt-[112px] px-[32px] pb-[40px]">
        <SectionHeader title="Selected work" note="3 projects · 2 shipped · 1 cooking" />
      </section>
      {/* Panels are static server markup; only the carousel state ships as JS. */}
      <WorkCarousel panels={[<ChessMatePanel key="chessmate" />, <MirrorPanel key="mirror" />, <TorchPanel key="torch" />]} />
    </>
  )
}
