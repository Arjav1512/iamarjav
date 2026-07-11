import { cn } from "@/lib/utils"

/**
 * The one badge style on the site: mono type inside a hairline pill.
 * Replaces the three divergent pill treatments used before the redesign.
 */
export function Tag({ className, children, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-transparent px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground",
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
