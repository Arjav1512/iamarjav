import { siteConfig } from "@/data/content"

export function Footer() {
  return (
    <footer className="border-t border-border py-8 pb-24 md:pb-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {"Built with ❤️ and a lot of tweaking at odd hours."}
        </p>
        <p className="font-mono text-xs text-muted-foreground/70">
          {siteConfig.name.toLowerCase()} · {siteConfig.location.toLowerCase()}
        </p>
      </div>
    </footer>
  )
}
