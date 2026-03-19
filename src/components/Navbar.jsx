import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "HOME",            path: "/" },
  { label: "ABOUT",           path: "/about" },
  { label: "EPISODES",        path: "/episodes" },
  { label: "SHOP",            path: "/shop" },
  { label: "PARTNER WITH US", path: "/partner" },
  { label: "CONTACT US",      path: "/contact" },
];

const display = { fontFamily: "var(--font-display, 'Cormorant Garant', Georgia, serif)" };
const body    = { fontFamily: "var(--font-body, 'DM Sans', sans-serif)" };

export default function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav
        className="anim-fade-in flex items-center justify-between px-6 md:px-12 h-16 shrink-0"
        style={{
          borderBottom: "1px solid rgba(196,164,78,0.25)",
          background: "var(--dark)",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          className="text-white no-underline"
          style={{ ...display, fontWeight: 700, fontSize: "20px", letterSpacing: "4px" }}
        >
          CABIN TEA
        </Link>

        {/* Desktop links — shown on lg and above */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-10">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`ct-nav-link py-2 no-underline ${location.pathname === item.path ? "active" : ""}`}
              style={{ ...body, fontWeight: 400, letterSpacing: "2px", fontSize: "10.5px" }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Hamburger button — shown below lg */}
        <button
          className="lg:hidden flex flex-col justify-center gap-[5px] bg-transparent border-none cursor-pointer p-2"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span style={{
            display: "block", width: "22px", height: "1.5px",
            background: open ? "var(--gold)" : "var(--text-muted)",
            transition: "transform 0.3s, opacity 0.3s",
            transform: open ? "translateY(6.5px) rotate(45deg)" : "none",
          }} />
          <span style={{
            display: "block", width: "22px", height: "1.5px",
            background: open ? "var(--gold)" : "var(--text-muted)",
            transition: "opacity 0.3s",
            opacity: open ? 0 : 1,
          }} />
          <span style={{
            display: "block", width: "22px", height: "1.5px",
            background: open ? "var(--gold)" : "var(--text-muted)",
            transition: "transform 0.3s, opacity 0.3s",
            transform: open ? "translateY(-6.5px) rotate(-45deg)" : "none",
          }} />
        </button>
      </nav>

      {/* Mobile slide-down drawer */}
      <div
        className="lg:hidden"
        style={{
          position: "fixed",
          top: "64px",
          left: 0,
          right: 0,
          zIndex: 99,
          background: "var(--dark)",
          borderBottom: "1px solid rgba(196,164,78,0.2)",
          overflow: "hidden",
          maxHeight: open ? "400px" : "0px",
          transition: "max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div style={{ padding: "12px 0 24px" }}>
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              onClick={() => setOpen(false)}
              style={{
                ...body,
                display: "block",
                padding: "13px 24px",
                fontWeight: 400,
                fontSize: "11px",
                letterSpacing: "2.5px",
                textDecoration: "none",
                color: location.pathname === item.path ? "var(--gold)" : "var(--text-muted)",
                borderLeft: location.pathname === item.path
                  ? "2px solid var(--gold)"
                  : "2px solid transparent",
                transition: "color 0.2s, border-color 0.2s",
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Dim backdrop when drawer is open */}
      {open && (
        <div
          className="lg:hidden"
          onClick={() => setOpen(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 98,
            background: "rgba(21,42,47,0.6)",
            backdropFilter: "blur(2px)",
          }}
        />
      )}
    </>
  );
}
