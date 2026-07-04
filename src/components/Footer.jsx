import { Link } from "react-router-dom";

const exploreLinks = [
  { label: "Episodes", to: "/episodes" },
  { label: "About", to: "/about" },
  { label: "Shop", to: "/shop" },
  { label: "Partner With Us", to: "/partner" },
  { label: "Contact", to: "/contact" },
];

const socials = [
  { label: "YouTube", href: "https://www.youtube.com/@CabinTea" },
  { label: "Instagram", href: "https://www.instagram.com/cabinteapodcast/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/cabin-tea-network/about/?viewAsMember=true" },
  { label: "TikTok", href: "https://vt.tiktok.com/ZSQD7AEkU/" },
];

export default function Footer() {
  return (
    <footer style={{ background: "#0A0F1C", borderTop: "1px solid rgba(196,164,78,0.15)" }}>
      <div className="px-6 md:px-12" style={{ maxWidth: "1200px", margin: "0 auto", padding: "56px 5vw 28px" }}>
        <div className="flex flex-col md:flex-row md:justify-between gap-10" style={{ marginBottom: "36px" }}>
          {/* Brand */}
          <div style={{ maxWidth: "320px" }}>
            <Link to="/" style={{ display: "inline-block" }}>
              <img src="/YellowNoLogo.png" alt="Cabin Tea" style={{ height: "44px", width: "auto", marginBottom: "14px" }} />
            </Link>
            <p style={{ fontSize: "13px", lineHeight: 1.7, color: "rgba(214,207,194,0.55)", fontWeight: 300 }}>
              Africa's ocean storytelling platform. Live conversations recorded in Accra, Ghana — heard everywhere.
            </p>
          </div>

          {/* Explore */}
          <div>
            <p style={{ fontSize: "10px", letterSpacing: "2.5px", color: "var(--gold)", fontWeight: 600, marginBottom: "16px" }}>
              EXPLORE
            </p>
            <div className="flex flex-col gap-3">
              {exploreLinks.map((l) => (
                <Link key={l.to} to={l.to} className="ct-footer-link text-sm no-underline">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Follow */}
          <div>
            <p style={{ fontSize: "10px", letterSpacing: "2.5px", color: "var(--gold)", fontWeight: 600, marginBottom: "16px" }}>
              FOLLOW
            </p>
            <div className="flex flex-col gap-3">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="ct-footer-link text-sm no-underline">
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div
          className="flex items-center justify-between flex-wrap gap-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "20px" }}
        >
          <span className="text-xs" style={{ color: "rgba(138,158,165,0.6)", letterSpacing: "0.5px" }}>
            © 2026 The Cabin Tea Podcast · Accra, Ghana
          </span>
        </div>
      </div>
    </footer>
  );
}
