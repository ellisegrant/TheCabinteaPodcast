import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [episodesOpen, setEpisodesOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setEpisodesOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setEpisodesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const navLinks = [
    { label: "About", to: "/about" },
    { label: "Creative Agency", to: "/creative-agency" },
    { label: "Shop", to: "/shop" },
    { label: "Partner", to: "/partner" },
  ];

  const episodesDropdown = [
    { label: "All Episodes", to: "/episodes", desc: "Browse every conversation" },
    { label: "Afrocean", to: "/afrocean", desc: "Diaspora maritime gatherings" },
    { label: "Anchorage", to: "/anchorage", desc: "Maritime media hub" },
  ];

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: "background 0.4s, backdrop-filter 0.4s, box-shadow 0.4s",
          background: scrolled ? "rgba(21,42,47,0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          boxShadow: scrolled ? "0 1px 0 rgba(196,164,78,0.15)" : "none",
          height: "64px",
          display: "flex",
          alignItems: "center",
          padding: "0 24px",
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-display, serif)",
              fontWeight: 900,
              fontSize: "22px",
              color: "white",
              letterSpacing: "-0.5px",
            }}
          >
            CABIN
          </span>
          <span
            style={{
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              background: "var(--gold, #c4a44e)",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-serif, serif)",
              fontStyle: "italic",
              fontSize: "18px",
              color: "var(--gold, #c4a44e)",
              letterSpacing: "1px",
            }}
          >
            TEA
          </span>
        </Link>

        {/* Desktop nav */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "36px",
            marginLeft: "auto",
            marginRight: "32px",
          }}
          className="ct-desktop-nav"
        >
          {/* Episodes dropdown */}
          <div ref={dropdownRef} style={{ position: "relative" }}>
            <button
              onClick={() => setEpisodesOpen((v) => !v)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                fontSize: "11px",
                letterSpacing: "2px",
                fontWeight: 500,
                color: episodesOpen ? "var(--gold, #c4a44e)" : "rgba(255,255,255,0.7)",
                transition: "color 0.2s",
                padding: 0,
                fontFamily: "inherit",
              }}
            >
              EPISODES
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                style={{
                  transition: "transform 0.25s",
                  transform: episodesOpen ? "rotate(180deg)" : "rotate(0deg)",
                  opacity: 0.6,
                }}
              >
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Dropdown panel */}
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 18px)",
                left: "50%",
                transform: "translateX(-50%)",
                background: "rgba(21,42,47,0.98)",
                border: "1px solid rgba(196,164,78,0.2)",
                borderRadius: "10px",
                padding: "8px",
                minWidth: "220px",
                boxShadow: "0 16px 40px rgba(0,0,0,0.4)",
                opacity: episodesOpen ? 1 : 0,
                pointerEvents: episodesOpen ? "all" : "none",
                transform: episodesOpen
                  ? "translateX(-50%) translateY(0)"
                  : "translateX(-50%) translateY(-8px)",
                transition: "opacity 0.2s, transform 0.2s",
              }}
            >
              {/* gold top accent */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: "20px",
                  right: "20px",
                  height: "2px",
                  background: "var(--gold, #c4a44e)",
                  borderRadius: "0 0 2px 2px",
                }}
              />
              {episodesDropdown.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  style={{
                    display: "block",
                    padding: "11px 14px",
                    borderRadius: "7px",
                    textDecoration: "none",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(196,164,78,0.08)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <span
                    style={{
                      display: "block",
                      fontSize: "12px",
                      fontWeight: 600,
                      letterSpacing: "1.5px",
                      color: "white",
                      marginBottom: "2px",
                    }}
                  >
                    {item.label.toUpperCase()}
                  </span>
                  <span
                    style={{
                      display: "block",
                      fontSize: "12px",
                      color: "rgba(214,207,194,0.5)",
                      fontFamily: "var(--font-serif, serif)",
                      fontStyle: "italic",
                    }}
                  >
                    {item.desc}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                textDecoration: "none",
                fontSize: "11px",
                letterSpacing: "2px",
                fontWeight: 500,
                color:
                  location.pathname === link.to
                    ? "var(--gold, #c4a44e)"
                    : "rgba(255,255,255,0.7)",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color =
                  location.pathname === link.to
                    ? "var(--gold, #c4a44e)"
                    : "rgba(255,255,255,0.7)")
              }
            >
              {link.label.toUpperCase()}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <Link
          to="/partner"
          className="ct-desktop-nav"
          style={{
            textDecoration: "none",
            fontSize: "10px",
            letterSpacing: "2.5px",
            fontWeight: 600,
            color: "var(--dark, #152a2f)",
            background: "var(--gold, #c4a44e)",
            padding: "9px 20px",
            borderRadius: "3px",
            flexShrink: 0,
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          PARTNER
        </Link>

        {/* Mobile hamburger */}
        <button
          className="ct-mobile-nav"
          onClick={() => setMenuOpen((v) => !v)}
          style={{
            marginLeft: "auto",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "6px",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: i === 1 ? "18px" : "24px",
                height: "1.5px",
                background: "white",
                transition: "width 0.2s",
              }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className="ct-mobile-nav"
        style={{
          position: "fixed",
          top: "64px",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 99,
          background: "rgba(21,42,47,0.98)",
          backdropFilter: "blur(14px)",
          padding: "32px 24px",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "all" : "none",
          transform: menuOpen ? "translateY(0)" : "translateY(-10px)",
          transition: "opacity 0.25s, transform 0.25s",
        }}
      >
        {/* Episodes heading in mobile */}
        <p
          style={{
            fontSize: "10px",
            letterSpacing: "3px",
            color: "var(--teal, #2c8c7c)",
            marginBottom: "4px",
            marginTop: "8px",
          }}
        >
          EPISODES
        </p>
        {episodesDropdown.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            style={{
              textDecoration: "none",
              fontSize: "28px",
              fontFamily: "var(--font-display, serif)",
              fontWeight: 700,
              color: "white",
              letterSpacing: "-0.5px",
              padding: "6px 0",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {item.label}
          </Link>
        ))}

        <div style={{ height: "16px" }} />

        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            style={{
              textDecoration: "none",
              fontSize: "28px",
              fontFamily: "var(--font-display, serif)",
              fontWeight: 700,
              color: "white",
              letterSpacing: "-0.5px",
              padding: "6px 0",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <style>{`
        @media (min-width: 768px) { .ct-mobile-nav { display: none !important; } }
        @media (max-width: 767px) { .ct-desktop-nav { display: none !important; } }
      `}</style>
    </>
  );
}
