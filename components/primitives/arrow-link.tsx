import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface ArrowLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
}

/**
 * Text link with the standard ↗ nudge. External links open in a new tab
 * with the safe rel set; internal/anchor links stay in place.
 */
export function ArrowLink({ href, className, children, ...props }: ArrowLinkProps) {
  const isExternal = /^https?:\/\//.test(href)

  return (
    <a
      href={href}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "group/arrow link-underline inline-flex items-center gap-1 text-sm font-medium text-foreground",
        className
      )}
      {...props}
    >
      {children}
      <ArrowUpRight
        className="size-4 transition-transform duration-(--duration-hover) group-hover/arrow:translate-x-0.5 group-hover/arrow:-translate-y-0.5 motion-reduce:transition-none"
        aria-hidden="true"
      />
    </a>
  )
}
