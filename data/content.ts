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
  url: "https://iamarjav.me",
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

export const hero = {
  greeting: "hey, i'm arjav jain",
  headlineLines: ["I build things,", "break things,", "and ship a lot."],
  status: [
    "now building Torch, design-to-docs automation",
    "intern @ ElevenX",
    "CS/AI @ Bennett '29",
  ],
  availability: "open to internships & founding-team roles",
}

/* Editorial introduction: kicker, statement, two short beats, signature.
   Same facts as before, restructured for reading rhythm. */
export const about = {
  kicker: "in short",
  statement: "I build products for the quiet problems people carry every day.",
  body: [
    "The method never changes: start from how someone actually behaves, then engineer around it.",
    "I ran small businesses before I wrote serious software, so product thinking and psychology came first and the code arrived to serve them.",
  ],
  signature:
    "Most of what follows began as a hypothesis, shipped fast, measured honestly, and rebuilt without ceremony.",
}

/* Two contrasting registers: a tight tool cluster vs. airy thinking. */
export const skills = {
  buildWith: {
    heading: "What I build with",
    items: ["Python", "TypeScript", "React", "Next.js", "Supabase"],
  },
  thinkIn: {
    heading: "What I think in",
    items: ["Systems", "Products", "AI", "User behaviour", "Experiments"],
  },
}

export const experiments = {
  intro:
    "Not everything deserves a case study. Some things were built to explore an idea, learn a tool, or answer a question that would not leave me alone. They still shipped.",
}

export type Article = {
  slug: string
  title: string
  teaser: string
  /* Placeholder until the piece is written; article pages stay noindex while draft. */
  status: "draft" | "published"
}

export const articles: Article[] = [
  {
    slug: "why-i-build-a-tool-i-am-the-only-user-of",
    title: "Why I Build a Tool I Am the Only User Of",
    teaser:
      "Mirror has one guaranteed user: me. That turns out to be the best product feedback loop I know.",
    status: "draft",
  },
  {
    slug: "the-honest-chess-problem",
    title: "The Honest Chess Problem",
    teaser:
      "Chess engines are honest to a fault. Making that honesty useful is a design problem, not an engine problem.",
    status: "draft",
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

/* Journey: a horizontal timeline of milestones (2024 -> now), replacing the
   chapter narrative. Facts are user-supplied; [review] marks items awaiting
   confirmation of dates/details. */
export type Milestone = {
  year: string
  title: string
  description: string
}

export const journey = {
  milestones: [
    {
      year: "2024",
      title: "Marketing agency",
      description:
        "Co-founded DigiArc: brand identity, websites and marketplace listings for small businesses.",
    },
    {
      year: "2024",
      title: "Clothing brand",
      description: "Launched Cult Notice, a Gen Z clothing label built from scratch.",
    },
    {
      // [review: confirm year and details of the seasoning unit]
      year: "2025",
      title: "Seasoning unit",
      description: "Set up a small seasoning production unit.",
    },
    {
      year: "2025",
      title: "ElevenX internship",
      description: "Joined the sales and marketing team: leads, outreach and growth.",
    },
    {
      // [review: role upgraded from "operations & management"; confirm title and spelling Makhana/Makana]
      year: "2025",
      title: "Makhana Express",
      description: "CMO & CTO for the import-export business.",
    },
    {
      // [review: new role, add company details]
      year: "now",
      title: "CTO at Wroob",
      description: "Leading technology at Wroob.",
    },
  ] satisfies Milestone[],
  /* The playful final stop after the last milestone: a "currently..." note. */
  currently: [
    "building random tools.",
    "reading obscure essays.",
    "watching people use software.",
    "thinking about behaviour.",
  ],
  closing: {
    quote:
      "Building is genuinely the only thing I'm good at. Everything else is just noise I'm trying to tune out.",
    note: "the honest version, straight from the README",
  },
}

export type Project = {
  title: string
  /** One-line thesis shown under the title. */
  tagline: string
  /** What it is / what makes the build interesting. */
  description: string
  /** Why it exists — the problem that made it worth building (featured only). */
  problem?: string
  /** Short verifiable fact shown next to the status, e.g. "live in production". */
  context?: string
  /** Case-study reflection: what building it taught (featured only). */
  learned?: string
  tech: string[]
  github: string
  demo: string
  featured?: boolean
  inProgress?: boolean
  /** Real screenshot/GIF for the browser frame; the typographic cover renders until this exists. */
  media?: { src: string; alt: string }
}

export const projects: Project[] = [
  {
    title: "ChessMate",
    tagline: "Chess improvement with an engine that explains, not just evaluates.",
    problem:
      "Chess engines tell you the best move, not why yours was worse. Evaluation without explanation makes you dependent on the engine instead of better at the game.",
    description:
      "A web-based improvement platform that pairs Stockfish evaluation with an AI mentor chat: analyse your games, understand your mistakes, and train the weaknesses it finds.",
    context: "live at chess-mate.app",
    tech: ["React", "TypeScript", "Supabase", "Stockfish", "Tailwind CSS"],
    github: "https://github.com/Arjav1512/ChessMate-Tool",
    demo: "https://chess-mate.app",
    learned:
      "The engine was the easy part. Turning evaluation into explanation, something a club player can act on, is where the product actually lives.",
    featured: true,
  },
  {
    title: "Mirror",
    tagline: "An AI journal that catches your cognitive biases before you do.",
    problem:
      "Journaling apps are good at storing thoughts and bad at revealing patterns. Your own cognitive biases are, by definition, the ones you can't see, so writing alone rarely turns into self-awareness.",
    description:
      "An AI-powered self-reflection journal that detects cognitive biases in what you write, tracks emotional patterns over time, and turns daily entries into genuine self-awareness.",
    context: "live in production",
    tech: ["React", "Supabase", "Tailwind CSS", "Sentiment Analysis", "Edge Functions"],
    github: "https://github.com/Arjav1512/Mirror",
    demo: "https://usemirror.dev",
    learned:
      "Building the bias detector taught me more about my own patterns than the journal did. Products that watch behaviour have to earn trust before they earn attention.",
    featured: true,
  },
  {
    title: "Torch",
    tagline: "Watches Figma files and writes developer-ready docs automatically.",
    problem:
      "Design changes travel to developers through meetings, screenshots and guesswork. The information already exists in Figma; the handoff is where it gets lost.",
    description:
      "Monitors your Figma files, detects changes and generates developer-ready documentation automatically. No meetings, no manual spec writing, no back-and-forth. Currently in progress.",
    tech: ["TypeScript", "Figma API", "Automation"],
    github: "#",
    demo: "#",
    learned:
      "Building on someone else's platform means designing inside their constraints. Half the work is understanding the Figma file model, not writing features.",
    inProgress: true,
    featured: true,
  },
  {
    title: "Daily Digital Diary",
    tagline: "A Chrome extension that turns your browsing history into mindful insight.",
    problem:
      "Browsing history is a log, not a mirror; it records where your attention went without ever making you notice. Most screen-time tools also ship that data to someone else's server.",
    description:
      "A Chrome extension that tracks browsing locally, categorises the sites you visit, and uses Gemini to summarise what you actually consumed, a daily nudge toward more mindful behaviour.",
    context: "CS50 final project",
    tech: ["JavaScript", "Chrome APIs", "Gemini API", "HTML/CSS"],
    github: "https://github.com/Arjav1512/CS50-FinalProject",
    demo: "https://youtu.be/ZR7ZmUQUYdw",
  },
  {
    title: "SwachSarthi",
    tagline: "Waste collection and compliance tracking for citizens and government bodies.",
    description:
      "A waste management system built during the Smart India Hackathon, designed for users and government bodies to streamline waste collection, reporting, and compliance tracking.",
    tech: ["Web Development", "API Integration", "Hackathon"],
    github: "#",
    demo: "#",
    context: "Smart India Hackathon",
  },
  {
    title: "Stackit",
    tagline: "A realistic 3D LEGO-building experience in the browser.",
    description:
      "A web-based interactive platform built in Java that delivers a realistic 3D LEGO-building experience in the browser, replicating the logic and structural accuracy of real-world LEGO sets.",
    tech: ["Java", "3D Rendering", "Web Platform"],
    github: "#",
    demo: "#",
  },
]

export const contact = {
  /* Layer 1 — the editorial closing statement. Two-tone: the second half
     drops to muted, echoing a roman/italic contrast in a single family. */
  statement: {
    lead: "Good products start with people,",
    trail: "not code.",
  },
  /* Layer 2 — a conversational, confident invitation. */
  invite: {
    headline: "Got an idea, a project, or just want to say hi?",
    sub: "I'm always up for a good conversation, a collaboration, a cool AI problem, a startup you're thinking about, or swapping ideas over coffee.",
  },
  cta: {
    idle: "Copy my email",
    copied: "Copied, talk soon",
  },
  /* Layer 3 — the communication surface. Email leads (primary). */
  channels: [
    {
      label: "email",
      handle: "arjav.jain1512@icloud.com",
      href: "mailto:arjav.jain1512@icloud.com",
    },
    { label: "github", handle: "@Arjav1512", href: "https://github.com/Arjav1512" },
    {
      label: "linkedin",
      handle: "arjav-jain",
      href: "https://www.linkedin.com/in/arjav-jain-75ab712b7/",
    },
    { label: "x / twitter", handle: "@arjav_15", href: "https://x.com/arjav_15" },
  ],
  /* Absorbs the old Skills section: the tools reached for most often,
     curated from the previous languages/frameworks/AI-ML/product lists. */
  toolbox: [
    "Python",
    "TypeScript",
    "React",
    "Next.js",
    "Tailwind CSS",
    "Supabase",
    "Scikit-learn",
    "Pandas",
    "UX Research",
    "Design Thinking",
  ],
}

