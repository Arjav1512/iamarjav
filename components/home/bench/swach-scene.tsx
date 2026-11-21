/** SwachSarthi: a collection route on an isometric grid; the bin lid opens on hover. */

const grid: [number, number, number, number][] = [
  [40.0, 82.0, 120.0, 122.0],
  [40.0, 102.0, 120.0, 62.0],
  [60.0, 72.0, 140.0, 112.0],
  [60.0, 112.0, 140.0, 72.0],
  [80.0, 62.0, 160.0, 102.0],
  [80.0, 122.0, 160.0, 82.0],
]

const binSlats: [number, number, number, number][] = [
  [81.8, 65.3, 81.8, 43.3],
  [99.4, 68.3, 99.4, 46.3],
  [87.6, 68.2, 87.6, 46.2],
  [105.2, 65.4, 105.2, 43.4],
]

export function SwachScene() {
  return (
    <div className="scene-bob relative w-[200px] h-[170px]" style={{ animationDelay: "-2.4s" }}>
      <svg aria-hidden="true" width="200" height="170" viewBox="0 0 200 170" fill="none" stroke="#3A2310" strokeWidth="1.4" strokeLinejoin="round" className="absolute inset-0 overflow-visible">
        <defs>
          <filter id="ss-blur" x="-20%" y="-100%" width="140%" height="300%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>
        <ellipse cx="100" cy="156" rx="74" ry="10" fill="#3A2310" stroke="none" opacity="0.08" filter="url(#ss-blur)" />
        <polygon points="20.0,92.0 100.0,132.0 100.0,150.0 20.0,110.0" fill="#FFD98A" />
        <polygon points="100.0,132.0 180.0,92.0 180.0,110.0 100.0,150.0" fill="#F2BE57" />
        <polygon points="20.0,92.0 100.0,52.0 180.0,92.0 100.0,132.0" fill="#FFF6DE" />
        {grid.map(([x1, y1, x2, y2]) => (
          <line key={`${x1}-${y1}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#F1DFB3" strokeWidth="1" strokeLinecap="round" />
        ))}
        <path
          className="sw-route"
          d="M52.0 100.0 L92.0 112.0 L120.8 105.6 L100.0 90.4 L92.0 80.0"
          stroke="#E58A1F"
          strokeWidth="2.4"
          strokeDasharray="3 6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <ellipse cx="52.0" cy="100.0" rx="6" ry="3" fill="#E58A1F" stroke="#E58A1F" strokeWidth="2" />
        <ellipse cx="92.0" cy="112.0" rx="6" ry="3" fill="#FFFFFF" stroke="#E58A1F" strokeWidth="2" />
        <ellipse cx="120.8" cy="105.6" rx="6" ry="3" fill="#FFFFFF" stroke="#E58A1F" strokeWidth="2" />
        <g>
          <polygon points="76.0,70.4 93.6,79.2 93.6,41.2 76.0,32.4" fill="#FFD98A" />
          <polygon points="93.6,79.2 111.2,70.4 111.2,32.4 93.6,41.2" fill="#F2BE57" />
          <polygon points="76.0,32.4 93.6,23.6 111.2,32.4 93.6,41.2" fill="#FFE9B8" />
        </g>
        {binSlats.map(([x1, y1, x2, y2]) => (
          <line key={x1} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="1.1" />
        ))}
        <g className="sw-lid">
          <polygon points="72.8,32.4 93.6,42.8 93.6,36.8 72.8,26.4" fill="#F2BE57" />
          <polygon points="93.6,42.8 114.4,32.4 114.4,26.4 93.6,36.8" fill="#E2A63E" />
          <polygon points="72.8,26.4 93.6,16.0 114.4,26.4 93.6,36.8" fill="#F7C768" />
        </g>
      </svg>
      <span className="sw-truck" aria-hidden="true" />
    </div>
  )
}
