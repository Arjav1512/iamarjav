# iamarjav.me — Redesign I "Work First" · Design spec

**Source of truth:** `redesign-reference.html`, a standalone page you can open in any browser. Every value in this spec comes from that file. If the spec and the file ever disagree, the file wins.

**Scope:** the homepage (`/`) only. Article pages (`/articles/*`) are out of scope. The visual reference renders are in `screenshots/`.

---

## 1. Page structure (top → bottom)

| # | Section | Anchor | Notes |
|---|---|---|---|
| 1 | Sticky nav | — | Folded-A mark + "arjav jain" · links: work, journey, writing, contact. White 86% + 12px backdrop blur, 1px `#F0F0EF` bottom border. |
| 2 | Hero | `#top` | Mono kicker, 3-line H1 with three pen marks, three margin notes, a "now building Torch" pill, a meta line and social icons. |
| 3 | How I work | `#how` | Header row, statement line, 5-step loop diagram with a dashed return arc, two chip rows. |
| 4 | Selected work | `#work` | Header row + 3-card carousel (ChessMate, Mirror, Torch) + an info block for the active project, with an expandable notes panel. |
| 5 | The bench | — | 3 tiles, each an isometric scene (Daily Digital Diary, SwachSarthi, Stackit). |
| 6 | Journey | `#journey` | Warm band `#FAF7F2`. Fan of 5 credential cards, a proportional timeline and a "Currently" line. |
| 7 | Writing | `#writing` | 3 article rows (1 published, 2 drafts), each with a blurb. |
| 8 | Contact | `#contact` | Status pill, large H2, a sub-line, a "Copy my email" button and 3 social icons. |
| 9 | Footer | — | Hairline, "Built with ❤️ and a lot of tweaking at odd hours.", and "© 2026 · arjav jain". In the final design it sits **inside** the Contact column (see §9). |

Every section uses the same header row: an H2 at 22px/600 on the left, a mono note at 12px `#6B6B6B` on the right, and a 1px `#EAEAEA` rule below with 16px of padding.

## 2. Design tokens

### Colour: site chrome
| Token | Value | Use |
|---|---|---|
| ink | `#0A0A0A` | text, primary buttons, dots |
| muted | `#6B6B6B` | secondary text, mono labels |
| social-muted | `#57575A` | social icons (hover → ink), copyright |
| faint | `#A3A3A3` | "not code.", arrows, dashed borders |
| draft-title | `#737373` | draft article titles |
| hairline | `#EAEAEA` (rules), `#E5E5E5` (footer), `#F0F0EF` (nav) | |
| surface | `#F5F5F4` | chips ("builds with"), hover rows, project pill |
| journey-bg | `#FAF7F2` | Journey band only |
| page | `#FFFFFF` | everything else |

### Colour: annotation marks (the "red pen")
| Token | Value | Use |
|---|---|---|
| pen | `#D9381E` | hand-written notes, squiggle under "break", loop circle |
| highlight | `#FFD93B` | marker behind "build" (text stays ink, 14.4:1) |
| rule-blue | `#2340E0` | underline under "ship" |

### Colour: each project keeps its own palette, inside its card only
- **ChessMate:** card `#F1EADB` · light square `#EFE4CD` · dark square `#B88A5A` · frame and eval bar `#2B2723` · pieces `#FBF8F1` / `#1A1917` · accent `#E8A33D` · labels `#6E6252`
- **Mirror:** card `linear-gradient(160deg,#F4F5F7,#DCE0E5)` · ink `#16181B` · sub `#5C636B` · highlight `#E6E9ED` · bars `#C6CCD3→#9AA2AB`
- **Torch:** card `radial-gradient(120% 90% at 18% 0%,#2A1F10 0%,#121212 55%)` · amber `#FFB547` · text `#F2F0ED` · sub `#9A948A` / `#C9C3B8` · dim `#6E685E` · lines `#3A342B`
- **Journey ramp (oldest → now):** `#ECEAE6` · `#E3D7C2` · `#EDC27A` · `#EAA23A` · `#D9731E`
- **Bench scenes:** outline `#3A2310`. Rose `#F9BCD5/#F093BA/#DE73A0`, amber `#FFE9B8/#FFD98A/#F2BE57`, orange `#FFC27A/#F6A04B/#E4832E`.

### Type
- **Families:** `Geist` (400/500/600/700), `Geist Mono` (400/500), `Caveat` (600, pen notes only).
- **Scale:**

| Role | Size | Weight | Line height | Tracking |
|---|---|---|---|---|
| H1 hero | `clamp(48px, 9vw, 136px)` | 600 | 0.94 | -0.055em |
| Contact H2 | `clamp(42px, 7vw, 104px)` | 600 | 0.96 | -0.05em |
| Statement ("I build products…") | `clamp(30px, 3.6vw, 52px)` | 500 | 1.06 | -0.035em, `text-wrap: balance` |
| Writing titles | `clamp(22px, 2.6vw, 36px)` | 500 | 1.1 | -0.03em |
| Active-project line | `clamp(20px, 2vw, 26px)` | 500 | — | — |
| Section H2 | 22px | 600 | — | -0.02em |
| Footer line | 20px | 600 | — | -0.025em |
| Body | 15–17px | — | — | — |
| Mono labels | 11–14px | — | — | — |
| Pen notes (Caveat) | 22–30px | — | — | — |

### Layout
- Content container: `max-width: 1280px; margin: 0 auto; padding: 0 32px`.
- Radii: pills 999px, project cards 28px, bench tiles 22px, small cards 14–18px.
- Shadows are soft, long and low-opacity (for example `0 40px 60px -40px rgba(…,0.45)`). Copy them exactly from the reference.

## 3. Breakpoints
| Width | Change |
|---|---|
| ≤1180px | Journey card fan becomes a horizontal scroll row; "both at once" pen note hides. |
| ≤1100px | Hero margin notes switch from absolute to stacked under the H1. |
| ≤820px | Carousel height 300; each card 342×225 with inner content scaled to 0.45 (`zoom`). Pen notes on cards hide. Loop diagram stacks vertically (arrows rotate 90°), return arc hides. |
| Always fluid | Grids use `repeat(auto-fit, minmax(min(Npx,100%),1fr))`; flex rows wrap. |

## 4. Interactions (must work, not just look right)
1. **Work carousel.** `active ∈ {0:ChessMate, 1:Mirror, 2:Torch}`, initially 0.
   - Card transforms:
     - centre `translateX(-50%) rotate(0) scale(1)`, z-index 3, opacity 1
     - next `translateX(calc(-50% + 76%)) rotate(5deg) scale(.82)`, z-index 2, opacity .9
     - previous `translateX(calc(-50% - 76%)) rotate(-5deg) scale(.82)`, z-index 1, opacity .9
     - transition `.7s cubic-bezier(.2,.8,.2,1)`
   - Controls: prev/next buttons, clicking a side card makes it active, and ←/→ keys move it while focus is in the section.
   - The active card shows its red pen note:
     - ChessMate: "the engine was / the easy part"
     - Mirror: "taught me more / about me"
     - Torch: "not lit yet. / soon."
   - The info block updates: name pill, line, status · stack, primary CTA and the "Code ↗" button. Torch has no Code button.
2. **Notes panel.** The "Read the notes" / "Hide the notes" toggle (`aria-expanded`) shows a 3-column panel (problem / what I built / what I learned) for the active project.
3. **Copy my email.** Copies `arjav.jain1512@icloud.com`. The label becomes "Copied. Talk soon." with a check icon for 2.2s. If the clipboard is unavailable, it falls back to `mailto:`.
4. **Hovers:**
   - Bench tiles lift 6px and rotate -1deg, and the scene scales 1.04. Each scene has its own action: diary bars grow, the bin lid opens, a pink brick drops onto the Stackit brick.
   - Journey cards straighten and lift 14px.
   - Writing rows get a `#F5F5F4` background and the arrow slides 6px.
   - Social icons turn ink.

## 5. Motion (all disabled under `prefers-reduced-motion: reduce`)
- **Hero entrance.** Lines rise 24px over .9s, staggered .08/.16/.24s. The meta row follows at .5s.
- **Hero pen marks.** These must start only after the entrance animation has finished.
  - Highlight sweeps behind "build": starts 1.15s, lasts .7s.
  - Squiggle fades in under "break": starts 1.85s, lasts .45s.
  - Underline draws under "ship": starts 2.45s, lasts .6s.
  - Margin notes fade in at 1.9s, 2.35s and 3.1s.
  - All three marks are pure CSS, so they appear even without JavaScript.
- **Ambient:**
  - Status dots pulse (2s).
  - ChessMate eval bar breathes (4.5s alternate).
  - Mirror card sheen sweeps (7s).
  - Torch connector dots flow (1.6s); its status dot pulses.
  - Bench scenes float ±6px (3.6s, offset per tile); the SwachSarthi route dashes march and a dot drives the route (5s alternate).

## 6. Content / data
The carousel's project data lives in the `PROJECTS` array in the reference `<script>`: name, line, status, stack, url, cta, hasCode, code, problem, built, learned. Every other piece of copy is literal in the markup. Links:
- GitHub `https://github.com/Arjav1512`
- LinkedIn `https://www.linkedin.com/in/arjav-jain-75ab712b7/`
- X `https://x.com/arjav_15`
- ChessMate code `…/ChessMate-Tool`, Mirror code `…/Mirror`
- Diary video `https://youtu.be/ZR7ZmUQUYdw`
- Article URLs as in the reference

## 7. Assets & dependencies
- **No raster images.** Every visual is inline SVG or CSS: chessboard, bench scenes, journey cards, icons.
- **Icons:** GitHub, LinkedIn and Mail are Lucide paths (the live site already uses `lucide-react`). X is a custom filled path. The Torch stage icons are simple inline SVGs, all in the reference.
- **Fonts:**
  - Geist and Geist Mono: use the `geist` npm package (`import { GeistSans } from 'geist/font/sans'`, `GeistMono` from `geist/font/mono`) or `next/font/google`.
  - Caveat 600: `next/font/google`.
- **Favicon:** keep the finalized folded-A favicon already in the project. The nav mark is the same shape, inlined in the reference.
- Chess pieces use Unicode glyphs drawn in SVG `<text>` with an outline. They render with the OS symbol font.

## 8. Accessibility requirements
- One `<h1>` that reads as a plain sentence.
- Every icon-only control has an `aria-label`. Decorative SVGs are `aria-hidden`; the board and panels have `role="img"` with a descriptive `aria-label`.
- Touch targets are ≥40px (social links have 10px padding around a 20px icon).
- All reduced-motion fallbacks must be kept.
- Text contrast meets WCAG AA. The faint grey `#A3A3A3` is used only on large display text.

## 9. Decisions to confirm with Arjav (do not "fix" silently)
1. **Footer placement.** In the final design the footer sits inside the Contact section's centred column, so its hairline is content-width. Contact also has a fixed `height: 751px`. Reproduce this as designed, but make sure the footer is never clipped. Raise it as a question: the live site's footer rule spans the full container.
2. **Draft 2 title vs link.** "I Ship Fast. I Learn Slow." links to `/articles/technology-should-shape-better-behavior`. Confirm the correct slug.
3. **Fonts.** The live site uses Space Grotesk and JetBrains Mono; the redesign uses Geist and Geist Mono. Apply Geist to the homepage. Do not restyle article pages without approval.
4. **`zoom`.** It is used to scale the bench scenes (1.18) and the mobile carousel cards (0.45). It is supported in current Chrome, Safari and Firefox (126+). A `transform: scale()` wrapper with fixed layout size is an acceptable equivalent if the project targets older browsers.
