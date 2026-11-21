/* Selected work carousel (homepage). One entry per card, in carousel order;
   the active entry drives the info block and the notes panel. */
export type WorkProject = {
  name: string
  /** One-line thesis under the name pill. */
  line: string
  status: string
  stack: string
  /** Primary CTA target. */
  url: string
  cta: string
  /** Source link; null hides the "Code ↗" button. */
  code: string | null
  problem: string
  built: string
  learned: string
}

export const workProjects: WorkProject[] = [
  {
    name: "ChessMate",
    line: "A chess mentor that explains why, not just what.",
    status: "shipped · live at chess-mate.app",
    stack: "React · TypeScript · Supabase · Stockfish · Tailwind",
    url: "https://chess-mate.app",
    cta: "Visit chess-mate.app",
    code: "https://github.com/Arjav1512/ChessMate-Tool",
    problem: "Engines give the best move but not the reasoning, which breeds dependence.",
    built:
      "Stockfish evaluation paired with an AI mentor chat for game analysis and weakness training.",
    learned:
      "The engine was the easy part. Turning evaluation into explanation is the product.",
  },
  {
    name: "Mirror",
    line: "An AI journal that notices the biases you can’t see in your own writing.",
    status: "shipped · live in production",
    stack: "React · Supabase · Tailwind · Sentiment analysis · Edge Functions",
    url: "https://usemirror.dev",
    cta: "Visit usemirror.dev",
    code: "https://github.com/Arjav1512/Mirror",
    problem:
      "Journaling stores thoughts but rarely reveals patterns. Biases are hard to see in your own writing.",
    built:
      "Detects cognitive biases, tracks emotional patterns, and turns entries into self-awareness.",
    learned:
      "Building the bias detector taught me more about myself than the journal did. Products that watch you must earn trust first.",
  },
  {
    name: "Torch",
    line: "Design changes, documented for developers the moment they happen in Figma.",
    status: "in progress",
    stack: "TypeScript · Figma API · Automation",
    url: "https://github.com/Arjav1512",
    cta: "Follow along on GitHub",
    code: null,
    problem:
      "Design changes reach developers through meetings and screenshots, though the information already lives in Figma.",
    built:
      "Monitors Figma files, detects changes, and generates developer documentation. Not finished yet.",
    learned:
      "Working within Figma’s platform constraints, and understanding its file model, is most of the work.",
  },
]
