import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const display = { fontFamily: "var(--font-display, 'Cormorant Garant', Georgia, serif)" };
const body    = { fontFamily: "var(--font-body, 'DM Sans', sans-serif)" };

const navItems = [
  { label: "HOME",            path: "/" },
  {
    label: "ABOUT",
    dropdown: [
      { label: "About the Show", path: "/about" },
      { label: "About the Host", path: "/about/host" },
    ],
  },
  { label: "EPISODES",        path: "/episodes" },
  { label: "SHOP",            path: "/shop" },
  { label: "PARTNER WITH US", path: "/partner" },
  { label: "CONTACT US",      path: "/contact" },
];

/* ─── Dropdown menu ─── */
function DropdownMenu({ items, visible }) {
  return (
    <div style={{
      position: "absolute",
      top: "calc(100% + 12px)",
      left: "50%",
      transform: "translateX(-50%)",
      background: "var(--dark-alt)",
      border: "1px solid rgba(196,164,78,0.2)",
      borderTop: "2px solid var(--gold)",
      borderRadius: "3px",
      minWidth: "190px",
      padding: "6px 0",
      opacity: visible ? 1 : 0,
      pointerEvents: visible ? "auto" : "none",
      transform: visible
        ? "translateX(-50%) translateY(0)"
        : "translateX(-50%) translateY(-8px)",
      transition: "opacity 0.22s ease, transform 0.22s ease",
      zIndex: 200,
      boxShadow: "0 12px 32px rgba(0,0,0,0.35)",
    }}>
      {/* Arrow tip */}
      <div style={{
        position: "absolute",
        top: "-6px",
        left: "50%",
        transform: "translateX(-50%)",
        width: 0, height: 0,
        borderLeft: "6px solid transparent",
        borderRight: "6px solid transparent",
        borderBottom: "6px solid var(--gold)",
      }} />
      {items.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          style={{
            ...body,
            display: "block",
            padding: "11px 20px",
            fontSize: "10.5px",
            letterSpacing: "2px",
            fontWeight: 400,
            color: "var(--text-muted)",
            textDecoration: "none",
            transition: "color 0.2s, background 0.2s",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={e => { e.currentTarget.style.color = "var(--gold)"; e.currentTarget.style.background = "rgba(196,164,78,0.05)"; }}
          onMouseLeave={e => { e.currentTarget.style.color = "var(--text-muted)"; e.currentTarget.style.background = "transparent"; }}
        >
          {item.label.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aboutOpen, setAboutOpen]   = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isAboutActive = location.pathname.startsWith("/about");

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setAboutOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); setAboutOpen(false); }, [location.pathname]);

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

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-10">
          {navItems.map((item) => {
            if (item.dropdown) {
              return (
                <div
                  key={item.label}
                  ref={dropdownRef}
                  style={{ position: "relative" }}
                  onMouseEnter={() => setAboutOpen(true)}
                  onMouseLeave={() => setAboutOpen(false)}
                >
                  <button
                    onClick={() => setAboutOpen((o) => !o)}
                    style={{
                      ...body,
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: "8px 0",
                      fontSize: "10.5px",
                      letterSpacing: "2px",
                      fontWeight: 400,
                      color: isAboutActive ? "var(--gold)" : "var(--text-muted)",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      transition: "color 0.3s",
                      position: "relative",
                    }}
                  >
                    {item.label}
                    {/* Underline when active */}
                    {isAboutActive && (
                      <span style={{
                        position: "absolute",
                        bottom: "0px", left: 0,
                        width: "100%", height: "2px",
                        background: "var(--gold)",
                      }} />
                    )}
                    {/* Chevron */}
                    <svg
                      width="8" height="5" viewBox="0 0 8 5" fill="none"
                      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                      style={{ transition: "transform 0.2s", transform: aboutOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                    >
                      <path d="M1 1l3 3 3-3" />
                    </svg>
                  </button>
                  <DropdownMenu items={item.dropdown} visible={aboutOpen} />
                </div>
              );
            }

            return (
              <Link
                key={item.label}
                to={item.path}
                className={`ct-nav-link py-2 no-underline ${location.pathname === item.path ? "active" : ""}`}
                style={{ ...body, fontWeight: 400, letterSpacing: "2px", fontSize: "10.5px" }}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Hamburger */}
        <button
          className="lg:hidden flex flex-col justify-center gap-[5px] bg-transparent border-none cursor-pointer p-2"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span style={{
            display: "block", width: "22px", height: "1.5px",
            background: mobileOpen ? "var(--gold)" : "var(--text-muted)",
            transition: "transform 0.3s, opacity 0.3s",
            transform: mobileOpen ? "translateY(6.5px) rotate(45deg)" : "none",
          }} />
          <span style={{
            display: "block", width: "22px", height: "1.5px",
            background: mobileOpen ? "var(--gold)" : "var(--text-muted)",
            transition: "opacity 0.3s",
            opacity: mobileOpen ? 0 : 1,
          }} />
          <span style={{
            display: "block", width: "22px", height: "1.5px",
            background: mobileOpen ? "var(--gold)" : "var(--text-muted)",
            transition: "transform 0.3s, opacity 0.3s",
            transform: mobileOpen ? "translateY(-6.5px) rotate(-45deg)" : "none",
          }} />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className="lg:hidden"
        style={{
          position: "fixed",
          top: "64px", left: 0, right: 0,
          zIndex: 99,
          background: "var(--dark)",
          borderBottom: "1px solid rgba(196,164,78,0.2)",
          overflow: "hidden",
          maxHeight: mobileOpen ? "500px" : "0px",
          transition: "max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div style={{ padding: "12px 0 24px" }}>
          {navItems.map((item) => {
            if (item.dropdown) {
              return (
                <div key={item.label}>
                  <button
                    onClick={() => setMobileAboutOpen((o) => !o)}
                    style={{
                      ...body,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                      padding: "13px 24px",
                      background: "none",
                      border: "none",
                      borderLeft: isAboutActive ? "2px solid var(--gold)" : "2px solid transparent",
                      fontWeight: 400,
                      fontSize: "11px",
                      letterSpacing: "2.5px",
                      color: isAboutActive ? "var(--gold)" : "var(--text-muted)",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    {item.label}
                    <svg
                      width="8" height="5" viewBox="0 0 8 5" fill="none"
                      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                      style={{ transition: "transform 0.2s", transform: mobileAboutOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                    >
                      <path d="M1 1l3 3 3-3" />
                    </svg>
                  </button>
                  {/* Sub-items */}
                  <div style={{
                    overflow: "hidden",
                    maxHeight: mobileAboutOpen ? "120px" : "0px",
                    transition: "max-height 0.3s ease",
                    background: "rgba(255,255,255,0.02)",
                  }}>
                    {item.dropdown.map((sub) => (
                      <Link
                        key={sub.path}
                        to={sub.path}
                        onClick={() => setMobileOpen(false)}
                        style={{
                          ...body,
                          display: "block",
                          padding: "11px 24px 11px 40px",
                          fontSize: "10.5px",
                          letterSpacing: "2px",
                          textDecoration: "none",
                          color: location.pathname === sub.path ? "var(--gold)" : "rgba(138,158,165,0.7)",
                          borderLeft: location.pathname === sub.path ? "2px solid var(--gold)" : "2px solid transparent",
                          transition: "color 0.2s",
                        }}
                      >
                        {sub.label.toUpperCase()}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setMobileOpen(false)}
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
            );
          })}
        </div>
      </div>

      {/* Backdrop */}
      {mobileOpen && (
        <div
          className="lg:hidden"
          onClick={() => setMobileOpen(false)}
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
