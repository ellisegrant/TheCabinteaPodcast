const platforms = ["YouTube", "Spotify", "Apple Podcasts"];

export default function Footer() {
  return (
    <footer
      className="flex items-center justify-between px-6 md:px-12 py-4 flex-wrap gap-3 shrink-0"
      style={{ borderTop: "1px solid rgba(138,158,165,0.15)" }}
    >
      <span
        className="text-xs"
        style={{ color: "rgba(138,158,165,0.6)", letterSpacing: "0.5px" }}
      >
        © 2026 The Cabin Tea Podcast · Accra, Ghana
      </span>

      <div className="flex gap-6">
        {platforms.map((p) => (
          <a
            key={p}
            href="#"
            className="ct-footer-link text-xs no-underline"
            style={{ letterSpacing: "0.5px" }}
          >
            {p}
          </a>
        ))}
      </div>
    </footer>
  );
}