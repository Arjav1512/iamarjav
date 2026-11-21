/*
 * The essay index. Each entry's body lives next to this file as
 * <slug>.md (loaded by lib/articles.ts); drafts have no file yet and render
 * a placeholder. Order sets the essay number shown on its page.
 */
export type Article = {
  slug: string
  title: string
  teaser: string
  /*
   * Placeholder until the piece is written; article pages stay noindex while
   * draft. A published article's body lives in content/articles/<slug>.md.
   */
  status: "draft" | "published"
}

export const articles: Article[] = [
  {
    slug: "i-dont-write-99-percent-of-my-code",
    title: "I Don't Write 99% of My Code",
    teaser:
      "AI writes or debugs almost all of my code. I'd rather say that myself than have someone find it out.",
    status: "published",
  },
  {
    slug: "the-honest-chess-problem",
    title: "The Honest Chess Problem",
    teaser:
      "Chess engines are honest to a fault. Making that honesty useful is a design problem, not an engine problem.",
    status: "published",
  },
  {
    slug: "technology-should-shape-better-behavior",
    title: "Technology Should Shape Better Behavior",
    teaser: "The best products do not just serve behaviour. They bend it somewhere better.",
    status: "draft",
  },
  {
    slug: "let-the-robots-solve-utility",
    title: "Let the Robots Solve Utility",
    teaser: "Utility is a solved problem for machines. The interesting work starts after.",
    status: "draft",
  },
  {
    slug: "i-ship-fast-i-learn-slow",
    title: "I Ship Fast. I Learn Slow.",
    teaser: "Speed matters. I was just timing the wrong thing.",
    status: "published",
  },
]
