export const siteConfig = {
  name: "Arjav Jain",
  role: "Full Stack Dev Intern, AI Enthusiast",
  tagline: "I build things, break things, and ship a lot.",
  description:
    "Computer Science student at Bennett University with hands-on experience building AI/ML tools, full stack apps, and a genuine curiosity for what makes people tick. I ship real products -- from Chrome extensions to AI coaches -- and I've co-founded ventures along the way.",
  email: "arjav.jain1512@icloud.com",
  location: "Greater Noida, India",
  social: {
    github: "https://github.com/Arjav1512",
    linkedin: "https://www.linkedin.com/in/arjav-jain-75ab712b7/",
    twitter: "https://x.com/arjav_15",
  },
  resumeUrl: "#",
}

/* SEO / metadata content — single source for titles, description, and the
   structured-data fields, consumed by app/layout.tsx, sitemap, and robots. */
export const siteMeta = {
  url: "https://www.iamarjav.me",
  title: "Arjav Jain, AI & product builder",
  description:
    "CS/AI student who builds and ships real products, from an AI journaling app that catches cognitive biases to a chess-coaching platform. Open to internships and founding-team roles.",
  jobTitle: "Full-stack & AI product builder",
  keywords: [
    "Arjav Jain",
    "product builder",
    "AI engineer",
    "full stack developer",
    "founding engineer",
    "Bennett University",
    "portfolio",
  ],
  university: "Bennett University",
  addressLocality: "Greater Noida",
  addressCountry: "IN",
}

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
]
