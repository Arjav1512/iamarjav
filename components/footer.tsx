import { siteConfig } from "@/data/content"

/*
 * The colophon — the last quiet sentence of the portfolio. A signature
 * note in the author's own voice (from the README), then a small byline.
 * Stacked and generously spaced so it reads as a final note, not a
 * utility bar; deliberately understated so it never competes with the CTA.
 */
export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border pt-12 pb-24 md:pb-12">
      <p className="text-sm leading-relaxed text-muted-foreground">
        Built with{" "}
        <span role="img" aria-label="love">
          ❤️
        </span>{" "}
        and a lot of tweaking at odd hours.
      </p>
      <p className="mt-3 font-mono text-xs text-muted-foreground">
        © {year} · {siteConfig.name.toLowerCase()} · {siteConfig.location.toLowerCase()}
      </p>
    </footer>
  )
}
