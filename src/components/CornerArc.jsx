export default function CornerArc() {
  return (
    <svg
      width="180"
      height="180"
      viewBox="0 0 180 180"
      fill="none"
      className="absolute pointer-events-none"
      style={{ top: "-40px", right: "-40px", opacity: 0.15 }}
    >
      <circle cx="180" cy="0" r="140" stroke="#C4A44E" strokeWidth="1.5" fill="none" />
      <circle cx="180" cy="0" r="100" stroke="#C4A44E" strokeWidth="1" fill="none" />
    </svg>
  );
}