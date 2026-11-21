# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm install     # install dependencies
pnpm dev         # start dev server
pnpm typecheck   # tsc --noEmit (the build ignores TypeScript errors, so run this)
pnpm build       # production build
pnpm start       # serve production build
```

There are no tests and no linter configured.

## Architecture

Personal portfolio built with Next.js 16 (App Router, Turbopack), React 19, TypeScript and Tailwind CSS v4. Two kinds of page: the homepage (`/`) and statically generated essays (`/articles/[slug]`).

```
app/                    routes, root layout (metadata, JSON-LD, analytics, fonts), globals.css, icons
components/
  home/                 homepage only: one file or folder per section
    home.css            homepage stylesheet (scoped to .home, see below)
    fonts.ts            Geist / Geist Mono / Caveat, applied on the .home root only
    work/               Selected work carousel (client) + panels/ (static card faces)
    bench/              The bench + scenes/ (isometric SVGs)
    journey/            Journey section + journey-motion.tsx (scroll entrance, lanyard physics)
    contact/            Contact section + copy-email button (client)
  article/              essay page components (article-body renders parsed Markdown)
  ui/                   small reusable pieces (section header, social links)
content/
  site.ts               name, email, social links, SEO metadata
  projects.ts           Selected work carousel data
  articles/             index.ts (essay list: slug, title, teaser, status) + <slug>.md bodies
lib/                    articles.ts (reads .md at build time), markdown.ts (tiny parser), utils.ts (cn)
docs/design/            redesign reference HTML, spec and renders (not part of the build)
```

### Content

- Essays: add `content/articles/<slug>.md` and an entry in `content/articles/index.ts`. Drafts have no file and render a noindex placeholder. The homepage Writing rows pick three slugs (`FEATURED` in `components/home/writing.tsx`) and read titles, teasers and status from the index.
- Carousel copy lives in `content/projects.ts`; other homepage copy is literal in its section component.

### Styling

- `app/globals.css`: site-wide tokens (shadcn-style names, OKLCH) and base styles used by the article pages.
- `components/home/home.css`: the homepage's keyframes, hovers, breakpoints (1180 / 1100 / 820px) and reduced-motion rules, in `@layer components` and scoped with `:where(.home)`. Static values are Tailwind arbitrary utilities in the components (`text-[22px]`, `tracking-[-0.02em]`), which win over these rules the way inline styles did in the reference design.
- The homepage resets preflight to UA defaults inside `.home` (content-box sizing, `line-height: normal`) to match `docs/design/redesign-reference.html`.

### Motion

All homepage motion is CSS except two client components: the work carousel and the Journey entrance (`journey-motion.tsx`, which arms cards via `data-motion` and runs the ElevenX lanyard physics with `requestAnimationFrame`). Everything respects `prefers-reduced-motion`, and content stays visible without JavaScript.

### Next.js config

`next.config.mjs` sets `typescript.ignoreBuildErrors: true`, `images.unoptimized: true` and pins the Turbopack root.
