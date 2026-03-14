export default function WaveLine({ color = "var(--gold)", className = "" }) {
  return (
    <svg
      width="100%"
      height="10"
      viewBox="0 0 400 10"
      preserveAspectRatio="none"
      fill="none"
      className={`block ${className}`}
    >
      <path
        d="M0 5C16.67 5 16.67 2 33.33 2C50 2 50 5 66.67 5C83.33 5 83.33 8 100 8C116.67 8 116.67 5 133.33 5C150 5 150 2 166.67 2C183.33 2 183.33 5 200 5C216.67 5 216.67 8 233.33 8C250 8 250 5 266.67 5C283.33 5 283.33 2 300 2C316.67 2 316.67 5 333.33 5C350 5 350 8 366.67 8C383.33 8 383.33 5 400 5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}