"use client"

import { cn } from "@/lib/utils"
import { useReveal } from "@/hooks/use-reveal"

interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Stagger position among siblings; each step delays the entrance by 40ms. */
  index?: number
}

/**
 * Scroll entrance: children rise 16px and fade in the first time they cross
 * the viewport, then stay put. Space is always reserved (zero CLS) and the
 * effect collapses to instant visibility under prefers-reduced-motion.
 */
export function Reveal({ index = 0, className, children, ...props }: RevealProps) {
  const [ref, isRevealed] = useReveal<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className={cn("reveal", isRevealed && "is-revealed", className)}
      style={{ "--reveal-delay": `${index * 40}ms` } as React.CSSProperties}
      {...props}
    >
      {children}
    </div>
  )
}
