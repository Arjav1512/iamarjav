import type { ReactNode } from "react"
import { SectionHeader } from "@/components/ui/section-header"
import { DiaryScene } from "./scenes/diary-scene"
import { StackScene } from "./scenes/stack-scene"
import { SwachScene } from "./scenes/swach-scene"

function TileBody({ scene, name, meta, blurb }: { scene: ReactNode; name: string; meta: string; blurb: string }) {
  return (
    <>
      <div className="pv h-[240px] rounded-[22px] bg-transparent flex items-center justify-center">
        <div className="art [zoom:1.18] w-[200px] h-[170px]">{scene}</div>
      </div>
      <div className="flex justify-between gap-[12px] items-baseline">
        <span className="font-semibold text-[17px]">{name}</span>
        <span className="f-mono text-[11px] text-[#6B6B6B]">{meta}</span>
      </div>
      <span className="mt-[-8px] text-[14px] text-[#6B6B6B]">{blurb}</span>
    </>
  )
}

const tileClass = "tile flex flex-col gap-[14px]"

export function Bench() {
  return (
    <section className="max-w-[1280px] mx-auto box-border pt-0 px-[32px] pb-[120px] flex flex-col gap-[28px]">
      <SectionHeader title="The bench" note="built to learn. still shipped." />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-[20px]">
        <a className={`${tileClass} no-underline`} href="https://youtu.be/ZR7ZmUQUYdw" target="_blank" rel="noopener noreferrer">
          <TileBody
            scene={<DiaryScene />}
            name="Daily Digital Diary"
            meta="CS50 final · ▶ video"
            blurb="Chrome extension that turns browsing history into insight."
          />
        </a>
        <div className={tileClass}>
          <TileBody
            scene={<SwachScene />}
            name="SwachSarthi"
            meta="Smart India Hackathon"
            blurb="Waste collection and compliance tracking for citizens and government."
          />
        </div>
        <div className={tileClass}>
          <TileBody scene={<StackScene />} name="Stackit" meta="3D · in the browser" blurb="A realistic LEGO-building experience, no download." />
        </div>
      </div>
    </section>
  )
}
