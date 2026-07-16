import { siteConfig } from "@/data/content"

/*
 * The final line of the book: the signature promoted to a centered
 * closing sentence, with only a quiet copyright underneath.
 */
export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border pt-14 pb-24 text-center md:pb-14">
      <p className="mx-auto max-w-xl font-display text-lg font-semibold tracking-tight text-foreground sm:text-xl">
        Built with{" "}
        <span role="img" aria-label="love">
          ❤️
        </span>{" "}
        and a lot of tweaking at odd hours.
      </p>
      <p className="mt-4 font-mono text-xs text-muted-foreground">
        © {year} · {siteConfig.name.toLowerCase()}
      </p>
    </footer>
  )
}
