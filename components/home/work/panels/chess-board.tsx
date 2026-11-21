/*
 * The ChessMate position after 3...Nf6 with the Qxf7 arrow. The 64 squares
 * and the coordinate labels follow the board's light/dark parity, which is
 * exactly what the reference markup spells out square by square.
 */
const LIGHT = "#EFE4CD"
const DARK = "#B88A5A"
const VS = "︎" // text presentation selector: keep glyphs out of emoji fonts

const glyph = { K: "♚", Q: "♛", R: "♜", B: "♝", N: "♞", P: "♟" }

type Piece = [x: number, y: number, kind: keyof typeof glyph]

const black: Piece[] = [
  [24, 25, "R"], [120, 25, "B"], [168, 25, "Q"], [216, 25, "K"], [264, 25, "B"], [360, 25, "R"],
  [24, 73, "P"], [72, 73, "P"], [120, 73, "P"], [168, 73, "P"], [264, 73, "P"], [312, 73, "P"], [360, 73, "P"],
  [120, 121, "N"], [264, 121, "N"],
  [216, 169, "P"],
]

const white: Piece[] = [
  [360, 169, "Q"],
  [120, 217, "B"], [216, 217, "P"],
  [24, 313, "P"], [72, 313, "P"], [120, 313, "P"], [168, 313, "P"], [264, 313, "P"], [312, 313, "P"], [360, 313, "P"],
  [24, 361, "R"], [72, 361, "N"], [120, 361, "B"], [216, 361, "K"], [312, 361, "N"], [360, 361, "R"],
]

const labelStyle = { fontFamily: "var(--font-geist-mono), monospace" }

export function ChessBoard() {
  return (
    <svg
      role="img"
      aria-label="Chess position after 3...Nf6. An arrow shows the white queen capturing on f7."
      viewBox="0 0 384 384"
      width="384"
      height="384"
      className="block rounded-[3px]"
    >
      <defs>
        <filter id="pc" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="1.4" stdDeviation="0.9" floodColor="#1A1917" floodOpacity="0.35" />
        </filter>
      </defs>

      {Array.from({ length: 64 }, (_, i) => {
        const row = Math.floor(i / 8)
        const col = i % 8
        return <rect key={i} x={col * 48} y={row * 48} width="48" height="48" fill={(row + col) % 2 === 0 ? LIGHT : DARK} />
      })}

      {/* last move: Nf6 (g8 → f6) */}
      <rect x="288" y="0" width="48" height="48" fill="#E8A33D" opacity="0.42" />
      <rect x="240" y="96" width="48" height="48" fill="#E8A33D" opacity="0.42" />

      {Array.from({ length: 8 }, (_, i) => (
        <text key={`r${i}`} x="4" y={12 + i * 48} fontSize="9.5" fontWeight="500" fill={i % 2 === 0 ? DARK : LIGHT} style={labelStyle}>
          {8 - i}
        </text>
      ))}
      {"abcdefgh".split("").map((file, i) => (
        <text key={file} x={44 + i * 48} y="379" textAnchor="end" fontSize="9.5" fontWeight="500" fill={i % 2 === 0 ? LIGHT : DARK} style={labelStyle}>
          {file}
        </text>
      ))}

      <g opacity="0.82">
        <line x1="351.5" y1="159.5" x2="282.4" y2="90.4" stroke="#E8A33D" strokeWidth="9" strokeLinecap="round" />
        <polygon points="268.2,76.2 290.9,81.9 273.9,98.9" fill="#E8A33D" />
      </g>

      <g
        filter="url(#pc)"
        fontFamily="Apple Symbols, Segoe UI Symbol, Noto Sans Symbols 2, DejaVu Sans, serif"
        fontSize="40"
        textAnchor="middle"
        dominantBaseline="central"
      >
        {black.map(([x, y, kind]) => (
          <text key={`b${x}-${y}`} x={x} y={y} fill="#1A1917" stroke="#1A1917" strokeWidth="0.6" strokeLinejoin="round">
            {glyph[kind] + VS}
          </text>
        ))}
        {white.map(([x, y, kind]) => (
          <text key={`w${x}-${y}`} x={x} y={y} fill="#FBF8F1" stroke="#1A1917" strokeWidth="1.3" paintOrder="stroke" strokeLinejoin="round">
            {glyph[kind] + VS}
          </text>
        ))}
      </g>
    </svg>
  )
}
