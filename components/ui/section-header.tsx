import { cn } from "@/lib/utils"

/** Shared section header row: 22px H2 left, mono note right, hairline below. */
export function SectionHeader({
  title,
  note,
  titleId,
  className,
}: {
  title: string
  note: string
  titleId?: string
  className?: string
}) {
  return (
    <div className={cn("flex justify-between items-baseline gap-[16px] border-b border-[#EAEAEA] pb-[16px]", className)}>
      <h2 id={titleId} className="m-0 font-semibold text-[22px] tracking-[-0.02em]">
        {title}
      </h2>
      <span className="f-mono text-[12px] text-[#6B6B6B]">{note}</span>
    </div>
  )
}
