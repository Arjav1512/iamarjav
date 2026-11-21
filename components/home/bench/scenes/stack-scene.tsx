/** Stackit: an isometric brick; a pink brick drops onto it on hover. */

const studs = [
  [70, 70],
  [100, 55],
  [100, 85],
  [130, 70],
]

function Brick({ top, left, right, studBase, studTop }: { top: string; left: string; right: string; studBase: string; studTop: string }) {
  return (
    <>
      <path d="M100 40 L180 80 L100 120 L20 80 Z" fill={top} />
      <path d="M20 80 V110 L100 150 V120 Z" fill={left} />
      <path d="M180 80 V110 L100 150 V120 Z" fill={right} />
      <g fill={studBase}>
        {studs.map(([cx, cy]) => (
          <ellipse key={`${cx}-${cy}`} cx={cx} cy={cy} rx="12" ry="6" />
        ))}
      </g>
      <path d="M58 70 V62 M82 70 V62 M88 55 V47 M112 55 V47 M88 85 V77 M112 85 V77 M118 70 V62 M142 70 V62" />
      <g fill={studTop}>
        {studs.map(([cx, cy]) => (
          <ellipse key={`${cx}-${cy}`} cx={cx} cy={cy - 8} rx="12" ry="6" />
        ))}
      </g>
    </>
  )
}

const svgProps = {
  "aria-hidden": true,
  width: "200",
  height: "170",
  viewBox: "0 0 200 170",
  fill: "none",
  stroke: "#3A2310",
  strokeWidth: "1.4",
  strokeLinejoin: "round",
} as const

export function StackScene() {
  return (
    <div className="scene-bob relative w-[200px] h-[170px]">
      <svg {...svgProps} className="absolute inset-0 overflow-visible">
        <defs>
          <filter id="sk-blur" x="-20%" y="-100%" width="140%" height="300%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>
        <ellipse cx="100" cy="156" rx="74" ry="10" fill="#3A2310" stroke="none" opacity="0.08" filter="url(#sk-blur)" />
        <Brick top="#FFC27A" left="#F6A04B" right="#E4832E" studBase="#F2A65A" studTop="#FFD49E" />
      </svg>
      <svg {...svgProps} className="sk-drop absolute inset-0 overflow-visible">
        <g transform="translate(0 -30)">
          <Brick top="#F9BCD5" left="#F093BA" right="#DE73A0" studBase="#EE9CC0" studTop="#FCD3E4" />
        </g>
      </svg>
    </div>
  )
}
