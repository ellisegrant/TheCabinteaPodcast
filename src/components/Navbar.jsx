import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "HOME",         path: "/" },
  { label: "ABOUT",        path: "/about" },
  { label: "EPISODES",     path: "/episodes" },
  { label: "SHOP",         path: "/shop" },
  { label: "PARTNER WITH US", path: "/partner" },
  { label: "CONTACT US",  path: "/contact" },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <nav
      className="anim-fade-in flex items-center justify-between px-6 md:px-12 h-16 shrink-0"
      style={{ borderBottom: "1px solid rgba(196,164,78,0.25)" }}
    >
      <Link
        to="/"
        className="text-white font-bold no-underline"
        style={{
          fontFamily: "var(--font-display, 'Cormorant Garant', Georgia, serif)",
          fontSize: "20px",
          letterSpacing: "4px",
        }}
      >
        CABIN TEA
      </Link>

      <div className="hidden md:flex items-center gap-8 lg:gap-12">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className={`ct-nav-link py-2 no-underline ${location.pathname === item.path ? "active" : ""}`}
            style={{
              fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
              fontWeight: 400,
              letterSpacing: "2px",
              fontSize: "11px",
            }}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
