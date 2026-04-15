# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm install   # install dependencies
pnpm dev       # start dev server
pnpm build     # production build (TypeScript errors are intentionally ignored)
pnpm lint      # run ESLint
pnpm start     # serve production build
```

There are no tests in this project.

## Architecture

This is a single-page personal portfolio built with Next.js (App Router), React 19, TypeScript, and Tailwind CSS v4.

### Content is centralised

**All site content** — bio, projects, skills, work experience, education, certifications, social links — lives in `data/content.ts` as plain exported constants. This is the only file that needs to change for content updates; the components read from it directly.

### Two-column layout

`app/page.tsx` renders a single responsive layout:

- **`components/left-column.tsx`** — sticky sidebar (desktop). Contains the name/tagline, a scroll-spy navigation (uses `IntersectionObserver` to track active section), and social links. The `EmailPopup` component renders a Dynamic Island-style overlay on email icon click.
- **`components/right-column.tsx`** — scrollable main content. Renders the five section components in order: About, Experience, Projects, Skills, Contact, then Footer.

On mobile the left column collapses to a normal block and the sticky nav is hidden.

### Section components

Each section lives in `components/sections/` and maps directly to a named anchor (`#about`, `#experience`, etc.). Sections import their data from `data/content.ts` and apply parallax effects via the `useParallax` hook.

### Custom hooks (`hooks/`)

- `use-parallax.ts` — `useParallax` translates an element vertically based on scroll distance from viewport centre; `useScrollFade` returns a 0–1 progress value as an element scrolls into view. Both use `requestAnimationFrame` with passive scroll listeners.
- `use-scroll-reveal.ts` — `useScrollReveal` returns a boolean that flips to `true` once an element crosses the viewport threshold (fires once, then unobserves).
- `use-mobile.ts` — breakpoint detection hook.

### Styling

Tailwind CSS v4 (`@import 'tailwindcss'`) with CSS custom properties in `app/globals.css` using OKLCH colour tokens. The design token names (`--background`, `--foreground`, `--primary`, etc.) follow the shadcn/ui convention and are mapped in the `@theme inline` block.

Custom animations (`animate-island-expand`, `animate-fade-in`) for the email popup are defined in `globals.css`. `will-change-transform` is applied to parallax containers and stripped via `prefers-reduced-motion`.

Fonts are loaded via `next/font/google`: Inter (`--font-inter`) and JetBrains Mono (`--font-jetbrains`).

### UI primitives

`components/ui/` is a full shadcn/ui component library (Radix UI + class-variance-authority). Only a small subset is actively used by the portfolio sections — `Badge` being the main one.

### Next.js config

`next.config.mjs` sets `typescript.ignoreBuildErrors: true` and `images.unoptimized: true`. Type errors will not fail the build.
