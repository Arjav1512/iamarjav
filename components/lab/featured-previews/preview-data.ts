/*
 * LAB · Featured Work preview experiment — data provenance.
 *
 * Every number below was produced by running the real project code on
 * sample input (2026-11-08). Nothing here is user data and nothing is
 * invented; text that is illustrative is labelled as such on the panel.
 */

/* ————— ChessMate —————
 * Sample position: 1.e4 e5 2.Qh5 Nc6 3.Bc4, Black to move.
 * Engine: stockfish.js 10.0.2 (the exact build ChessMate ships in
 * public/stockfish.js), `go depth 18`, MultiPV 3. Scores are Black POV:
 *   3…Qe7 +0.52 · 3…g6 +0.44 · 3…Qf6 −0.02      (bestmove d8e7)
 * After 3…Nf6 (`go depth 10`): `score mate 1 pv h5f7` → Qxf7#.
 * Classification "blunder ??" and motif "Allowed mate" are ChessMate's own
 * taxonomy (src/lib/analysis/moveQuality.ts, src/lib/motifs.ts). The mentor
 * note is illustrative copy, not a recorded Gemini response.
 */
export const CHESSMATE = {
  /** White-POV eval before the move, pawns. */
  evalBefore: "−0.52",
  evalAfter: "#1",
  /** White win share for the eval bar: ChessMate's winPercentFromCp(−52) ≈ 45.2%. */
  whiteShareBefore: 0.452,
  best: "3…Qe7",
  refutation: "Qxf7#",
  played: { san: "3…Nf6", from: "g8", to: "f6" },
  lastMove: { from: "f1", to: "c4" },
  threats: [
    { from: "h5", to: "f7" },
    { from: "c4", to: "f7" },
  ],
  motif: "allowed mate",
  mentor:
    "Nf6 develops, but leaves f7 to your king alone. Queen and bishop both hit it; 3…Qe7 or 3…g6 holds.",
  caption: "sample position · Stockfish 10, depth 18 · mentor note illustrative",
  /** Position after 3…Nf6, minus the knight that moves (rendered separately). */
  pieces: {
    white: [
      ["a1", "R"], ["b1", "N"], ["c1", "B"], ["e1", "K"], ["g1", "N"], ["h1", "R"],
      ["a2", "P"], ["b2", "P"], ["c2", "P"], ["d2", "P"], ["f2", "P"], ["g2", "P"], ["h2", "P"],
      ["e4", "P"], ["c4", "B"], ["h5", "Q"],
    ],
    black: [
      ["a8", "R"], ["c8", "B"], ["d8", "Q"], ["e8", "K"], ["f8", "B"], ["h8", "R"],
      ["a7", "P"], ["b7", "P"], ["c7", "P"], ["d7", "P"], ["f7", "P"], ["g7", "P"], ["h7", "P"],
      ["c6", "N"], ["e5", "P"],
    ],
  } as { white: [string, string][]; black: [string, string][] },
}

/* ————— Mirror —————
 * Text below was run through analyzeSentiment() + detectBiases() copied
 * verbatim from github.com/Arjav1512/Mirror
 * supabase/functions/create-journal-entry/index.ts.
 * Featured entry → score −0.42, "Negative"; biases: Emotional Reasoning,
 * Fortune Telling, Overgeneralization. Highlighted spans are the exact
 * substrings each detector regex matched. Explanations are the product's
 * own strings. Mirror reports biases per entry; the inline highlight is a
 * portfolio visualisation of which phrase tripped each pattern.
 */
export const MIRROR = {
  day: "sun",
  entry: [
    { text: "Every time", n: 1 },
    " I present, my mind goes blank. ",
    { text: "I feel unprepared, so", n: 2 },
    " I probably am. I’m anxious that tomorrow’s review is ",
    { text: "going to fail", n: 3 },
    ".",
  ] as (string | { text: string; n: number })[],
  sentiment: { score: "−0.42", label: "negative" },
  biases: [
    {
      n: 1,
      type: "Overgeneralization",
      explanation: "You may be treating isolated incidents as universal patterns or rules.",
    },
    {
      n: 2,
      type: "Emotional Reasoning",
      explanation:
        "You may be treating your feelings as facts, assuming that negative emotions reflect reality.",
    },
    {
      n: 3,
      type: "Fortune Telling",
      explanation:
        "You may be predicting negative outcomes without evidence, assuming things will go badly.",
    },
  ],
  /*
   * Seven short sample entries scored by the same analyzeSentiment():
   * mon "Long day of meetings. Got through the backlog and felt good about the plan." 0.71
   * tue "Shipped the fix. Proud of how calm I stayed when it broke again." 0.77
   * wed "Slow morning. Nothing much happened, just routine work and a walk." 0.00
   * thu "Felt anxious before the demo and worried people would notice. It went fine." −1.00
   * fri "Grateful for a quiet evening with friends. Laughed a lot, slept early." 0.83
   * sat "Tired and a bit frustrated that the weekend went by so fast." −0.83
   * sun (the featured entry) −0.42
   */
  week: [0.71, 0.77, 0, -1, 0.83, -0.83, -0.42],
  caption: "sample entries · scored by Mirror’s own detector",
}

/* ————— Torch —————
 * Verified against the local repo (torch-handoff-main): README, PROJECT.md
 * and supabase/functions. Pipeline: Figma URL → snapshot (flattened nodes)
 * → diff by node id (added / removed / modified, comparing bounds, fills,
 * strokes, effects, style) → 4 LLM materials in parallel → dashboard + email.
 * The summary string reproduces process-figma's exact format
 * ("N added, N modified, N removed"). Node names and the 120→136 resize are
 * sample values. Status per PROJECT.md §5/§7: video walkthrough is a text
 * script only; continuous monitoring is partially complete (cron workflow
 * exists, needs secrets); version-history UI and property-level diffs are
 * not started.
 */
export const TORCH = {
  frame: "Checkout",
  changes: [
    { sign: "~", node: "Button/Primary", kind: "modified" },
    { sign: "+", node: "Badge/New", kind: "added" },
  ],
  summary: "1 added, 1 modified, 0 removed",
  materials: [
    { name: "developer summary", built: true },
    { name: "changelog", built: true },
    { name: "pdf spec", built: true },
    { name: "video walkthrough", built: false, note: "script only" },
  ],
  monitoring: "scheduled re-scan · partial",
  notYet: "version history · property-level diffs",
  caption: "sample file · pipeline as built, status from the repo",
}
