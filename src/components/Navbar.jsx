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
    { label: "Agency", to: "/creative-agency" },
    { label: "Shop", to: "/shop" },
  ];

  const episodesDropdown = [
    { label: "All Episodes", to: "/episodes", desc: "Every conversation" },
    { label: "Afrocean", to: "/afrocean", desc: "Diaspora maritime gatherings" },
    { label: "Anchorage", to: "/anchorage", desc: "Maritime media hub" },
  ];

  const isActive = (to) => location.pathname === to;

  return (
    <>
      <nav style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 100,
        height: "64px",
        display: "flex",
        alignItems: "center",
        padding: "0 5vw",
        transition: "background 0.4s, box-shadow 0.4s",
        background: scrolled ? "rgba(21,42,47,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        boxShadow: scrolled ? "0 1px 0 rgba(196,164,78,0.12)" : "none",
      }}>

        {/* Logo — bold wordmark like AIAC */}
        <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "baseline", gap: "6px", flexShrink: 0 }}>
          <span style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "20px",
            color: "white",
            letterSpacing: "-0.5px",
            lineHeight: 1,
          }}>Cabin</span>
          <span style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontStyle: "italic",
            fontSize: "20px",
            color: "var(--gold)",
            letterSpacing: "0px",
            lineHeight: 1,
          }}>Tea</span>
        </Link>

        {/* Desktop links — center */}
        <div style={{
          display: "flex", alignItems: "center", gap: "32px",
          marginLeft: "auto", marginRight: "32px",
        }} className="ct-desktop-nav">

          {/* Episodes dropdown */}
          <div ref={dropdownRef} style={{ position: "relative" }}>
            <button onClick={() => setEpisodesOpen(v => !v)} style={{
              background: "none", border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", gap: "4px",
              fontSize: "12px", letterSpacing: "0.5px", fontWeight: 400,
              color: episodesOpen ? "white" : "rgba(214,207,194,0.55)",
              transition: "color 0.2s", padding: 0, fontFamily: "inherit",
            }}
              onMouseEnter={e => e.currentTarget.style.color = "white"}
              onMouseLeave={e => { if (!episodesOpen) e.currentTarget.style.color = "rgba(214,207,194,0.55)"; }}
            >
              Our Works
              <svg width="9" height="5" viewBox="0 0 10 6" fill="none" style={{
                transition: "transform 0.2s",
                transform: episodesOpen ? "rotate(180deg)" : "none",
                opacity: 0.5,
              }}>
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Dropdown */}
            <div style={{
              position: "absolute",
              top: "calc(100% + 16px)",
              left: "50%",
              background: "rgba(18,36,40,0.99)",
              border: "1px solid rgba(196,164,78,0.18)",
              borderTop: "2px solid var(--gold)",
              borderRadius: "4px",
              padding: "6px",
              minWidth: "210px",
              boxShadow: "0 20px 48px rgba(0,0,0,0.5)",
              opacity: episodesOpen ? 1 : 0,
              pointerEvents: episodesOpen ? "all" : "none",
              transform: episodesOpen
                ? "translateX(-50%) translateY(0)"
                : "translateX(-50%) translateY(-6px)",
              transition: "opacity 0.18s, transform 0.18s",
            }}>
              {episodesDropdown.map(item => (
                <Link key={item.to} to={item.to} style={{
                  display: "block", padding: "10px 14px",
                  borderRadius: "3px", textDecoration: "none",
                  transition: "background 0.12s",
                }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(196,164,78,0.07)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  <span style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "white", marginBottom: "2px" }}>
                    {item.label}
                  </span>
                  <span style={{ display: "block", fontSize: "11px", color: "rgba(214,207,194,0.4)", fontFamily: "var(--font-display)", fontStyle: "italic" }}>
                    {item.desc}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {navLinks.map(link => (
            <Link key={link.to} to={link.to} style={{
              textDecoration: "none",
              fontSize: "12px", letterSpacing: "0.5px", fontWeight: 400,
              color: isActive(link.to) ? "white" : "rgba(214,207,194,0.55)",
              transition: "color 0.2s",
              borderBottom: isActive(link.to) ? "1px solid rgba(196,164,78,0.6)" : "1px solid transparent",
              paddingBottom: "1px",
            }}
              onMouseEnter={e => e.currentTarget.style.color = "white"}
              onMouseLeave={e => e.currentTarget.style.color = isActive(link.to) ? "white" : "rgba(214,207,194,0.55)"}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Partner CTA */}
        <Link to="/partner" className="ct-desktop-nav" style={{
          textDecoration: "none",
          fontSize: "10px", letterSpacing: "2px", fontWeight: 600,
          color: "var(--dark)",
          background: "var(--gold)",
          padding: "8px 18px",
          borderRadius: "2px",
          flexShrink: 0,
          transition: "opacity 0.2s",
        }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}
        >
          PARTNER
        </Link>

        {/* Mobile hamburger */}
        <button className="ct-mobile-nav" onClick={() => setMenuOpen(v => !v)} style={{
          marginLeft: "auto", background: "none", border: "none",
          cursor: "pointer", padding: "6px",
          display: "flex", flexDirection: "column", gap: "5px",
        }}>
          <span style={{ display: "block", width: menuOpen ? "24px" : "24px", height: "1.5px", background: "white", transition: "all 0.2s", transform: menuOpen ? "rotate(45deg) translateY(6.5px)" : "none" }} />
          <span style={{ display: "block", width: "18px", height: "1.5px", background: "white", transition: "all 0.2s", opacity: menuOpen ? 0 : 1 }} />
          <span style={{ display: "block", width: "24px", height: "1.5px", background: "white", transition: "all 0.2s", transform: menuOpen ? "rotate(-45deg) translateY(-6.5px)" : "none" }} />
        </button>
      </nav>

      {/* Mobile fullscreen menu */}
      <div className="ct-mobile-nav" style={{
        position: "fixed", top: "64px", left: 0, right: 0, bottom: 0,
        zIndex: 99, background: "rgba(18,36,40,0.99)",
        backdropFilter: "blur(20px)",
        padding: "40px 5vw 32px",
        display: "flex", flexDirection: "column",
        opacity: menuOpen ? 1 : 0,
        pointerEvents: menuOpen ? "all" : "none",
        transform: menuOpen ? "translateY(0)" : "translateY(-8px)",
        transition: "opacity 0.25s, transform 0.25s",
      }}>
        {/* Category label */}
        <span style={{ fontSize: "9px", letterSpacing: "3px", color: "var(--teal)", marginBottom: "8px" }}>EPISODES</span>
        {episodesDropdown.map((item, i) => (
          <Link key={item.to} to={item.to} style={{
            textDecoration: "none",
            fontFamily: "var(--font-display)",
            fontSize: "clamp(28px, 7vw, 40px)",
            fontWeight: 700, color: "white",
            padding: "10px 0",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            letterSpacing: "-0.5px",
            transition: "color 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--gold)"}
            onMouseLeave={e => e.currentTarget.style.color = "white"}
          >{item.label}</Link>
        ))}

        <div style={{ height: "24px" }} />
        <span style={{ fontSize: "9px", letterSpacing: "3px", color: "var(--teal)", marginBottom: "8px" }}>NAVIGATE</span>

        {[...navLinks, { label: "Partner", to: "/partner" }].map(link => (
          <Link key={link.to} to={link.to} style={{
            textDecoration: "none",
            fontFamily: "var(--font-display)",
            fontSize: "clamp(28px, 7vw, 40px)",
            fontWeight: 700, color: "white",
            padding: "10px 0",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            letterSpacing: "-0.5px",
            transition: "color 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--gold)"}
            onMouseLeave={e => e.currentTarget.style.color = "white"}
          >{link.label}</Link>
        ))}
      </div>

      <style>{`
        @media (min-width: 768px) { .ct-mobile-nav { display: none !important; } }
        @media (max-width: 767px) { .ct-desktop-nav { display: none !important; } }
      `}</style>
    </>
  );
}
