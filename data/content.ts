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

export const hero = {
  greeting: "hey — i'm arjav jain",
  headlineLines: ["I build things,", "break things,", "and ship a lot."],
  status: [
    "now building Torch — design-to-docs automation",
    "intern @ ElevenX",
    "CS/AI @ Bennett '29",
  ],
  availability: "open to internships & founding-team roles",
}

export type JourneyChapter = {
  /** Mono kicker above the headline, e.g. "2024 · first ventures". */
  stage: string
  headline: string
  narrative: string
  /** Verifiable facts backing the narrative — roles, orgs, dates, artifacts. */
  facts: string[]
  /** "What changed" — the takeaway of the chapter. */
  outcome?: string
}

export const journey = {
  lede: "The résumé version says CS student. The honest version is four chapters about figuring out what building actually means.",
  chapters: [
    {
      stage: "2024 · first ventures",
      headline: "Products came before code.",
      narrative:
        "I didn't start with a text editor — I started with customers. DigiArc was a digital marketing agency for small businesses: brand identities, websites, marketplace listings. Cult Notice was a Gen Z clothing brand built from scratch. Neither was a tech startup, and that turned out to be the point: before I ever shipped software, I learned that products live or die on whether you understand the people they're for.",
      facts: [
        "Co-founder · DigiArc — digital marketing agency for SMBs · Jan–Mar 2024",
        "Co-founder · Cult Notice — Gen Z clothing brand · Dec 2024–Apr 2025",
      ],
      outcome: "What changed: building became about people, not tools.",
    },
    {
      // [review: add CS50 / certification completion dates when confirmed]
      stage: "foundations · CS50",
      headline: "Then I learned to ship software.",
      narrative:
        "Harvard's CS50 and CS50P gave me the fundamentals; the final project made them real. Daily Digital Diary — a Chrome extension that turns your own browsing history into mindful insight — was the first thing I built that strangers could install. IBM's Enterprise Design Thinking certification pulled the two threads together: engineering on one side, how humans actually behave on the other.",
      facts: [
        "CS50: Introduction to Computer Science",
        "CS50: Introduction to Programming with Python",
        "IBM Enterprise Design Thinking Co-Creator",
        "Shipped: Daily Digital Diary — CS50 final project",
      ],
      outcome: "What changed: from selling products to building them.",
    },
    {
      stage: "2025 · the deep end",
      headline: "Formal training, real stakes.",
      narrative:
        "A B.Tech in Computer Science (AI/ML) at Bennett University made the interest official. The same stretch brought the GeeksforGeeks junior core, a Smart India Hackathon build for waste management, and an internship at ElevenX working on leads, outreach and growth. Building was never the hard part — this is where I started learning distribution, the part most engineers skip.",
      facts: [
        "B.Tech CSE (AI/ML) · Bennett University · Aug 2025–2029",
        "Intern · ElevenX — sales & marketing · Oct 2025–present",
        "Tech member (junior core) · GFG Club, Bennett University · 2025–present",
        "Operations & management · Makana Express — import-export · ongoing",
        "Built: SwachSarthi @ Smart India Hackathon",
      ],
      outcome: "What changed: I started thinking like a founder again — with real engineering underneath.",
    },
    {
      stage: "now · shipping",
      headline: "Ship, learn, repeat.",
      narrative:
        "Mirror is live in production. ChessMate is open source. Torch — design-to-docs automation — is on the bench right now. The through-line hasn't changed since the agency days: understand people first, engineer second. I'm looking for the rooms where that instinct compounds — internships and founding teams building products that actually ship.",
      facts: [
        "Mirror · live at usemirror.dev",
        "ChessMate · open source",
        "Torch · in progress",
        "Open to internships & founding-team roles",
      ],
    },
  ] satisfies JourneyChapter[],
  closing: {
    quote:
      "Building is genuinely the only thing I'm good at. Everything else is just noise I'm trying to tune out.",
    note: "— the honest version, straight from the README",
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
    title: "Mirror",
    tagline: "An AI journal that catches your cognitive biases before you do.",
    problem:
      "Journaling apps are good at storing thoughts and bad at revealing patterns. Your own cognitive biases are, by definition, the ones you can't see — so writing alone rarely turns into self-awareness.",
    description:
      "An AI-powered self-reflection journal that detects cognitive biases in what you write, tracks emotional patterns over time, and turns daily entries into genuine self-awareness.",
    context: "live in production",
    tech: ["React", "Supabase", "Tailwind CSS", "Sentiment Analysis", "Edge Functions"],
    github: "https://github.com/Arjav1512/Mirror",
    demo: "https://usemirror.dev",
    featured: true,
  },
  {
    title: "ChessMate",
    tagline: "Chess improvement with an engine that explains, not just evaluates.",
    problem:
      "Chess engines tell you the best move, not why yours was worse. Evaluation without explanation makes you dependent on the engine instead of better at the game.",
    description:
      "A web-based improvement platform that pairs Stockfish evaluation with an AI mentor chat — analyse your games, understand your mistakes, and train the weaknesses it finds.",
    context: "open source",
    tech: ["React", "TypeScript", "Supabase", "Stockfish", "Tailwind CSS"],
    github: "https://github.com/Arjav1512/ChessMate-Tool",
    demo: "#",
    featured: true,
  },
  {
    title: "Daily Digital Diary",
    tagline: "A Chrome extension that turns your browsing history into mindful insight.",
    problem:
      "Browsing history is a log, not a mirror — it records where your attention went without ever making you notice. Most screen-time tools also ship that data to someone else's server.",
    description:
      "A Chrome extension that tracks browsing locally, categorises the sites you visit, and uses Gemini to summarise what you actually consumed — a daily nudge toward more mindful behaviour.",
    context: "CS50 final project",
    tech: ["JavaScript", "Chrome APIs", "Gemini API", "HTML/CSS"],
    github: "https://github.com/Arjav1512/CS50-FinalProject",
    demo: "https://youtu.be/ZR7ZmUQUYdw",
    featured: true,
  },
  {
    title: "Torch",
    tagline: "Watches Figma files and writes developer-ready docs automatically.",
    description:
      "Monitors your Figma files, detects changes and generates developer-ready documentation automatically. No meetings, no manual spec writing, no back-and-forth. Currently in progress.",
    tech: ["TypeScript", "Figma API", "Automation"],
    github: "#",
    demo: "#",
    inProgress: true,
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
    sub: "I'm always up for a good conversation — a collaboration, a cool AI problem, a startup you're thinking about, or swapping ideas over coffee.",
  },
  cta: {
    idle: "Copy my email",
    copied: "Copied — talk soon",
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

