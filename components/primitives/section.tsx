import { cn } from "@/lib/utils"

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id: string
  /** Two-digit position in the page narrative, rendered as the mono index. */
  index: number
  title: string
  /** Extra anchor ids kept as aliases so old external links keep working. */
  aliasIds?: string[]
}

/**
 * Page section with the shared header grammar: a mono index ("01 / Work"),
 * the title in the display face, and a hairline rule. One h2 per section,
 * identical structure on every breakpoint.
 */
export function Section({
  id,
  index,
  title,
  aliasIds,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("mb-(--spacing-section-sm) scroll-mt-24 lg:mb-(--spacing-section)", className)}
      {...props}
    >
      {aliasIds?.map((alias) => (
        <span key={alias} id={alias} aria-hidden="true" />
      ))}
      <header className="mb-10 flex items-baseline gap-4">
        <span className="font-mono text-xs text-muted-foreground" aria-hidden="true">
          {String(index).padStart(2, "0")}
        </span>
        <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-foreground">
          {title}
        </h2>
        <span className="h-px flex-1 self-center bg-border" aria-hidden="true" />
      </header>
      {children}
    </section>
  )
}
