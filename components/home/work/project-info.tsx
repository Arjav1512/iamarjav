import type { KeyboardEvent } from "react"
import type { WorkProject } from "@/data/content"

const ctaClass =
  "min-h-[44px] box-border inline-flex items-center px-[20px] rounded-[999px] border border-[#EAEAEA] no-underline text-[14px]"
const navButtonClass =
  "w-[44px] h-[44px] rounded-[50%] border border-[#EAEAEA] bg-[#FFFFFF] cursor-pointer flex items-center justify-center"

/** The active project's info block and its expandable notes panel. */
export function ProjectInfo({
  project,
  notesOpen,
  onPrev,
  onNext,
  onToggleNotes,
  onKeyDown,
}: {
  project: WorkProject
  notesOpen: boolean
  onPrev: () => void
  onNext: () => void
  onToggleNotes: () => void
  onKeyDown: (event: KeyboardEvent) => void
}) {
  return (
    <section className="max-w-[1280px] mx-auto box-border pt-[8px] px-[32px] pb-[104px] flex flex-col items-center gap-[22px] text-center">
      <div className="flex gap-[12px] items-center">
        <button type="button" aria-label="Previous project" onClick={onPrev} onKeyDown={onKeyDown} className={navButtonClass}>
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#0A0A0A" strokeWidth="1.6">
            <path d="M10 3 L5 8 L10 13" />
          </svg>
        </button>
        <span className="min-w-[150px] py-[11px] px-[22px] rounded-[999px] bg-[#F5F5F4] font-semibold text-[16px] tracking-[-0.01em]">
          <span>{project.name}</span>
        </span>
        <button type="button" aria-label="Next project" onClick={onNext} onKeyDown={onKeyDown} className={navButtonClass}>
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#0A0A0A" strokeWidth="1.6">
            <path d="M6 3 L11 8 L6 13" />
          </svg>
        </button>
      </div>

      <p className="m-0 max-w-[620px] font-medium text-[length:clamp(20px,2vw,26px)] leading-[1.3] tracking-[-0.02em]">
        <span>{project.line}</span>
      </p>

      <div className="flex flex-wrap gap-y-[8px] gap-x-[18px] justify-center items-center f-mono text-[12px] text-[#6B6B6B]">
        <span>
          <span>{project.status}</span>
        </span>
        <span aria-hidden="true">·</span>
        <span>
          <span>{project.stack}</span>
        </span>
      </div>

      <div className="flex flex-wrap gap-[10px] justify-center">
        <button
          type="button"
          aria-expanded={notesOpen}
          aria-controls="project-notes"
          onClick={onToggleNotes}
          className="min-h-[44px] py-0 px-[20px] rounded-[999px] border border-[#0A0A0A] bg-[#0A0A0A] text-[#FFFFFF] cursor-pointer text-[14px]"
        >
          <span>{notesOpen ? "Hide the notes" : "Read the notes"}</span>
        </button>
        <a href={project.url} target="_blank" rel="noopener noreferrer" className={ctaClass}>
          <span>{project.cta}</span> ↗
        </a>
        {project.code && (
          <a href={project.code} target="_blank" rel="noopener noreferrer" className={ctaClass}>
            Code ↗
          </a>
        )}
      </div>

      <div id="project-notes" hidden={!notesOpen} className="w-full flex justify-center">
        <div className="w-full max-w-[980px] mt-[12px] grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-[1px] bg-[#EAEAEA] border border-[#EAEAEA] rounded-[20px] overflow-hidden text-left">
          <NoteCell label="the problem" text={project.problem} />
          <NoteCell label="what I built" text={project.built} />
          <NoteCell label="what I learned" text={project.learned} pen />
        </div>
      </div>
    </section>
  )
}

function NoteCell({ label, text, pen = false }: { label: string; text: string; pen?: boolean }) {
  return (
    <div className="bg-[#FFFFFF] py-[22px] px-[24px] flex flex-col gap-[10px]">
      <span className={`f-mono text-[11px] ${pen ? "text-[#D9381E]" : "text-[#6B6B6B]"}`}>{label}</span>
      <span className="text-[15px] leading-[1.55]">
        <span>{text}</span>
      </span>
    </div>
  )
}
