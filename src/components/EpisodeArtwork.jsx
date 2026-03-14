export default function EpisodeArtwork({ num = "01", size = 220 }) {
  const r = size / 2;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="block mx-auto">
      <defs>
        <clipPath id={`ep-clip-${num}`}>
          <circle cx={r} cy={r} r={r - 4} />
        </clipPath>
        <linearGradient id={`ep-grad-${num}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1A3038" />
          <stop offset="100%" stopColor="#152A2F" />
        </linearGradient>
      </defs>
      <circle cx={r} cy={r} r={r - 4} fill={`url(#ep-grad-${num})`} stroke="#2C8C7C" strokeWidth="1.5" />
      <g clipPath={`url(#ep-clip-${num})`}>
        <circle cx={r} cy={r * 0.55} r={r * 0.72} fill="none" stroke="#2C8C7C" strokeWidth="1" opacity="0.4" />
        <line x1="0" y1={r * 1.15} x2={size} y2={r * 1.15} stroke="#C4A44E" strokeWidth="1.5" opacity="0.6" />
        <path
          d={`M0 ${r * 1.15} Q${r * 0.5} ${r * 1.08} ${r} ${r * 1.12} T${size} ${r * 1.15}`}
          stroke="#C4A44E"
          strokeWidth="1.5"
          fill="none"
          opacity="0.8"
        />
      </g>
      <text
        x={r}
        y={r - 6}
        textAnchor="middle"
        fill="#C4A44E"
        fontFamily="'Playfair Display', Georgia, serif"
        fontWeight="700"
        fontSize={size * 0.15}
        letterSpacing="3"
      >
        EP.
      </text>
      <text
        x={r}
        y={r + size * 0.15}
        textAnchor="middle"
        fill="#C4A44E"
        fontFamily="'Playfair Display', Georgia, serif"
        fontWeight="700"
        fontSize={size * 0.22}
        fontStyle="italic"
      >
        {num}
      </text>
    </svg>
  );
}