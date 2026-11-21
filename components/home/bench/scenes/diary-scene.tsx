/** Daily Digital Diary: an isometric notebook with a bar chart that grows on hover. */

const highlights: [number, number, number, number][] = [
  [45.6, 98.4, 85.6, 78.4],
  [55.2, 103.2, 84.0, 88.8],
  [64.8, 108.0, 100.0, 90.4],
  [74.4, 112.8, 98.4, 100.8],
  [84.0, 117.6, 116.0, 101.6],
]

const bars = [
  { delay: "0.00s", front: "96.8,77.6 108.0,83.2 108.0,57.2 96.8,51.6", side: "108.0,83.2 120.0,77.2 120.0,51.2 108.0,57.2", top: "96.8,51.6 108.8,45.6 120.0,51.2 108.0,57.2" },
  { delay: "0.07s", front: "112.8,85.6 124.0,91.2 124.0,39.2 112.8,33.6", side: "124.0,91.2 136.0,85.2 136.0,33.2 124.0,39.2", top: "112.8,33.6 124.8,27.6 136.0,33.2 124.0,39.2" },
  { delay: "0.14s", front: "128.8,93.6 140.0,99.2 140.0,61.2 128.8,55.6", side: "140.0,99.2 152.0,93.2 152.0,55.2 140.0,61.2", top: "128.8,55.6 140.8,49.6 152.0,55.2 140.0,61.2" },
]

export function DiaryScene() {
  return (
    <div className="scene-bob relative w-[200px] h-[170px]" style={{ animationDelay: "-1.2s" }}>
      <svg aria-hidden="true" width="200" height="170" viewBox="0 0 200 170" fill="none" stroke="#3A2310" strokeWidth="1.4" strokeLinejoin="round" className="absolute inset-0 overflow-visible">
        <defs>
          <filter id="dd-blur" x="-20%" y="-100%" width="140%" height="300%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>
        <ellipse cx="100" cy="156" rx="74" ry="10" fill="#3A2310" stroke="none" opacity="0.08" filter="url(#dd-blur)" />
        <polygon points="20.0,92.0 100.0,132.0 100.0,150.0 20.0,110.0" fill="#F6C3D3" />
        <polygon points="100.0,132.0 180.0,92.0 180.0,110.0 100.0,150.0" fill="#EBA2BB" />
        <polygon points="20.0,92.0 100.0,52.0 180.0,92.0 100.0,132.0" fill="#FFF8F2" />
        <polygon points="20.0,92.0 100.0,52.0 110.4,57.2 30.4,97.2" fill="#FBE4EC" stroke="none" />
        <line x1="30.4" y1="97.2" x2="110.4" y2="57.2" stroke="#F2CFDC" strokeWidth="1" strokeLinecap="round" />
        <ellipse cx="30.8" cy="91.8" rx="4" ry="2" fill="#F28B9E" stroke="none" />
        <ellipse cx="35.6" cy="89.4" rx="4" ry="2" fill="#F6B26B" stroke="none" />
        <ellipse cx="40.4" cy="87.0" rx="4" ry="2" fill="#E99BBE" stroke="none" />
        {highlights.map(([x1, y1, x2, y2]) => (
          <line key={x1} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#EFAFC6" strokeWidth="4.2" strokeLinecap="round" />
        ))}
        {bars.map((bar) => (
          <g key={bar.delay} className="dd-bar" style={{ transitionDelay: bar.delay }}>
            <polygon points={bar.front} fill="#F093BA" />
            <polygon points={bar.side} fill="#DE73A0" />
            <polygon points={bar.top} fill="#F9BCD5" />
          </g>
        ))}
      </svg>
    </div>
  )
}
