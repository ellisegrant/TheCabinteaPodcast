import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ── Palette ── */
const BG    = "#0F1912";
const PANEL = "#141F18";
const GOLD  = "#C4A44E";
const CREAM = "rgba(214,207,194,0.75)";
const MUTED = "rgba(214,207,194,0.42)";

/* ── Episodes data ── */
const episodes = [
  {
    num: "01",
    guest: "Prof. Christian Bueger",
    role: "Maritime Security Scholar",
    location: "University of Copenhagen",
    title: "Maritime Security at the UN",
    excerpt: "One of the world's leading voices on international security and global governance sits down with  Cabin Tea to discuss the global maritime security agenda — and what role Africa and the Indian Ocean can play in shaping it",
    tag: "Governance",
    season: 1,
    duration: "14 min",
    date: "Apr 27, 2026",
    img: "/ep1thumbnail.jpg",
    links: {
      youtube: "https://www.youtube.com/watch?v=h2B6kPP16-M",   // replace with real YouTube URL
      spotify: "#",   // replace with real Spotify URL
    },
  },
  {
    num: "02",
    guest: "Kofi Mensah",
    role: "Documentary Filmmaker",
    location: "Accra",
    title: "The Last Fisher",
    excerpt: "A documentary filmmaker documents the vanishing world of Ghana's coastal fishing communities.",
    tag: "Community",
    season: 1,
    duration: "58 min",
    date: "Coming Soon",
    img: "/images/episodes/ep02.jpg",
    links: { youtube: null, spotify: null },
  },
  {
    num: "03",
    guest: "Nkechi Obi",
    role: "Marine Economist",
    location: "Lagos",
    title: "Blue Money",
    excerpt: "How Africa's blue economy could reshape the continent's financial future.",
    tag: "Blue Economy",
    season: 1,
    duration: "52 min",
    date: "Coming Soon",
    img: "/images/episodes/ep03.jpg",
    links: { youtube: null, spotify: null },
  },
];

const FILTERS = ["All Episodes", "Season 1", "Most Recent"];

/* ── Platform Selector ── */
function PlatformSelector({ links }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const hasLinks = links.youtube || links.spotify;

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (!hasLinks) {
    return (
      <div style={{
        display: "flex", alignItems: "center", gap: "10px",
        padding: "8px 14px",
        border: "1px solid rgba(196,164,78,0.15)",
        color: MUTED, fontSize: "10px", letterSpacing: "2px", fontWeight: 600,
      }}>
        <svg width="10" height="12" viewBox="0 0 10 12" fill={MUTED}>
          <path d="M0 0l10 6-10 6V0z"/>
        </svg>
        COMING SOON
      </div>
    );
  }

  return (
    <div ref={ref} style={{ position: "relative" }}>
      {/* Trigger button */}
      <button
        onClick={(e) => { e.stopPropagation(); setOpen(v => !v); }}
        style={{
          display: "flex", alignItems: "center", gap: "10px",
          padding: "9px 16px",
          background: open ? GOLD : "transparent",
          border: `1px solid ${open ? GOLD : "rgba(196,164,78,0.4)"}`,
          color: open ? "#0F1912" : CREAM,
          fontSize: "10px", letterSpacing: "2px", fontWeight: 700,
          cursor: "pointer", fontFamily: "inherit",
          transition: "all 0.2s",
        }}
        onMouseEnter={e => { if (!open) { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.color = "white"; }}}
        onMouseLeave={e => { if (!open) { e.currentTarget.style.borderColor = "rgba(196,164,78,0.4)"; e.currentTarget.style.color = CREAM; }}}
      >
        <svg width="11" height="13" viewBox="0 0 10 12" fill="currentColor">
          <path d="M0 0l10 6-10 6V0z"/>
        </svg>
        LISTEN NOW
        <svg width="8" height="5" viewBox="0 0 10 6" fill="none" style={{
          marginLeft: "2px",
          transform: open ? "rotate(180deg)" : "none",
          transition: "transform 0.2s",
          opacity: 0.7,
        }}>
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Dropdown */}
      <div style={{
        position: "absolute",
        bottom: "calc(100% + 8px)",
        left: 0,
        background: "#0F1912",
        border: "1px solid rgba(196,164,78,0.25)",
        borderTop: `2px solid ${GOLD}`,
        minWidth: "180px",
        opacity: open ? 1 : 0,
        pointerEvents: open ? "all" : "none",
        transform: open ? "translateY(0)" : "translateY(6px)",
        transition: "opacity 0.18s, transform 0.18s",
        zIndex: 10,
      }}>
        <p style={{
          fontSize: "9px", letterSpacing: "2.5px", color: MUTED,
          padding: "10px 14px 6px", margin: 0, fontWeight: 600,
        }}>LISTEN ON</p>

        {links.youtube && (
          <a
            href={links.youtube}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            style={{
              display: "flex", alignItems: "center", gap: "10px",
              padding: "10px 14px", textDecoration: "none",
              color: CREAM, fontSize: "12px", fontWeight: 500,
              transition: "background 0.15s, color 0.15s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(196,164,78,0.08)"; e.currentTarget.style.color = "white"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = CREAM; }}
          >
            {/* YouTube icon */}
            <svg width="18" height="13" viewBox="0 0 26 18" fill={GOLD}>
              <path d="M25.456 2.818A3.26 3.26 0 0023.162.51C21.13 0 13 0 13 0S4.87 0 2.838.51A3.26 3.26 0 00.544 2.818C0 4.862 0 9 0 9s0 4.138.544 6.182a3.26 3.26 0 002.294 2.308C4.87 18 13 18 13 18s8.13 0 10.162-.51a3.26 3.26 0 002.294-2.308C26 13.138 26 9 26 9s0-4.138-.544-6.182zM10.4 12.857V5.143L17.143 9 10.4 12.857z"/>
            </svg>
            YouTube
          </a>
        )}

        {links.spotify && (
          <a
            href={links.spotify}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            style={{
              display: "flex", alignItems: "center", gap: "10px",
              padding: "10px 14px 12px", textDecoration: "none",
              color: CREAM, fontSize: "12px", fontWeight: 500,
              transition: "background 0.15s, color 0.15s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(196,164,78,0.08)"; e.currentTarget.style.color = "white"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = CREAM; }}
          >
            {/* Spotify icon */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill={GOLD}>
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
            Spotify
          </a>
        )}
      </div>
    </div>
  );
}

/* ── Episode card ── */
function EpisodeCard({ ep, index, visible }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", flexDirection: "column",
        background: PANEL, overflow: "visible",
        position: "relative",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(24px)",
        transition: `opacity 0.6s ${0.05 + index * 0.1}s, transform 0.6s ${0.05 + index * 0.1}s, box-shadow 0.3s`,
        boxShadow: hovered ? "0 16px 40px rgba(0,0,0,0.4)" : "0 4px 20px rgba(0,0,0,0.2)",
      }}
    >
      {/* ── Thumbnail area ── */}
      <div style={{ position: "relative", height: "220px", overflow: "hidden", flexShrink: 0 }}>
        <img
          src={ep.img}
          alt={ep.guest}
          style={{
            width: "100%", height: "100%", objectFit: "cover", display: "block",
            transform: hovered ? "scale(1.04)" : "scale(1)",
            transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
          }}
        />
        {/* Gradient overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(20,31,24,1) 0%, rgba(20,31,24,0.3) 60%, transparent 100%)",
        }} />

        {/* Top row: tag + date */}
        <div style={{
          position: "absolute", top: "14px", left: "14px", right: "14px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <span style={{
            background: GOLD, color: "#0F1912",
            fontSize: "9px", letterSpacing: "2px", fontWeight: 700,
            padding: "4px 10px",
          }}>{ep.tag.toUpperCase()}</span>
          <span style={{
            fontSize: "10px", color: "rgba(255,255,255,0.55)",
            letterSpacing: "1px", fontWeight: 500,
          }}>{ep.date}</span>
        </div>

        {/* Bottom of image: episode number + duration */}
        <div style={{
          position: "absolute", bottom: "14px", left: "16px", right: "16px",
          display: "flex", justifyContent: "space-between", alignItems: "flex-end",
        }}>
          <span style={{
            fontSize: "11px", letterSpacing: "3px",
            color: "rgba(196,164,78,0.6)", fontWeight: 600,
          }}>EP. {ep.num}</span>
          <span style={{
            fontSize: "10px", color: "rgba(255,255,255,0.4)",
            letterSpacing: "1px",
          }}>{ep.duration}</span>
        </div>
      </div>

      {/* ── Card body ── */}
      <div style={{ padding: "20px 22px 22px", flex: 1, display: "flex", flexDirection: "column" }}>

        {/* Guest name */}
        <h3 style={{
          fontSize: "19px", fontWeight: 700,
          color: hovered ? GOLD : "white",
          lineHeight: 1.2, margin: "0 0 4px",
          transition: "color 0.2s",
        }}>{ep.guest}</h3>

        {/* Role · Location */}
        <p style={{
          fontSize: "11px", letterSpacing: "1px",
          color: GOLD, margin: "0 0 12px", fontWeight: 500,
        }}>
          {ep.role} · {ep.location}
        </p>

        {/* Divider */}
        <div style={{ width: "24px", height: "1px", background: "rgba(196,164,78,0.3)", marginBottom: "12px" }} />

        {/* Episode title */}
        <p style={{
          fontSize: "13px", letterSpacing: "0.5px",
          color: "white", fontWeight: 600,
          margin: "0 0 10px", lineHeight: 1.4,
        }}>"{ep.title}"</p>

        {/* Excerpt */}
        <p style={{
          fontSize: "13px", lineHeight: 1.65,
          color: CREAM, fontWeight: 300,
          margin: "0 0 20px", flex: 1,
        }}>{ep.excerpt}</p>

        {/* Platform selector */}
        <div style={{ marginTop: "auto" }}>
          <PlatformSelector links={ep.links} />
        </div>
      </div>
    </div>
  );
}

export default function Episodes() {
  const [activeFilter, setActiveFilter] = useState("All Episodes");
  const [heroRef, heroVis] = useReveal(0.05);
  const [gridRef, gridVis] = useReveal(0.05);

  const filtered = activeFilter === "All Episodes"
    ? episodes
    : activeFilter === "Season 1"
      ? episodes.filter(e => e.season === 1)
      : [...episodes].reverse();

  return (
    <div style={{ minHeight: "100vh", background: BG, color: "white", overflowX: "hidden" }}>
      <Navbar />

      {/* ════════ HERO ════════ */}
      <section ref={heroRef} style={{
        height: "55vh", minHeight: "360px",
        position: "relative", overflow: "hidden",
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
      }}>
        <img
          src="/episodehero"
          alt="Episodes"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(15,25,18,1) 0%, rgba(15,25,18,0.55) 55%, transparent 100%)",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, rgba(15,25,18,0.7) 0%, transparent 60%)",
        }} />
        <div className="ct-grain" style={{ zIndex: 1 }} />

        <div style={{ position: "relative", zIndex: 2, padding: "0 5vw 56px" }}>
          <p style={{
            fontSize: "11px", letterSpacing: "4px", color: GOLD,
            fontWeight: 500, marginBottom: "12px",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(10px)",
            transition: "opacity 0.6s 0.1s, transform 0.6s 0.1s",
          }}>
            CABIN TEA · EPISODES
          </p>
          <h1 style={{
            fontWeight: 700, fontSize: "clamp(28px, 4vw, 52px)",
            lineHeight: 1.1, color: "white",
            margin: "0 0 12px", maxWidth: "560px",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(16px)",
            transition: "opacity 0.7s 0.18s, transform 0.7s 0.18s",
          }}>
            Every conversation. Every cup.
          </h1>
          <p style={{
            fontSize: "15px", color: CREAM, lineHeight: 1.65,
            fontWeight: 300, maxWidth: "420px",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(12px)",
            transition: "opacity 0.7s 0.28s, transform 0.7s 0.28s",
          }}>
            Live conversations with the people shaping Africa's maritime future. Recorded in Accra, heard everywhere.
          </p>
        </div>
      </section>

      {/* ════════ FILTERS + GRID ════════ */}
      <section ref={gridRef} style={{ background: BG, padding: "48px 5vw 96px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

          {/* Filter row */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            flexWrap: "wrap", gap: "16px", marginBottom: "48px",
          }}>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {FILTERS.map(f => (
                <button key={f} onClick={() => setActiveFilter(f)} style={{
                  padding: "8px 20px",
                  background: activeFilter === f ? GOLD : "transparent",
                  border: `1px solid ${activeFilter === f ? GOLD : "rgba(196,164,78,0.25)"}`,
                  color: activeFilter === f ? "#0F1912" : MUTED,
                  fontSize: "10px", letterSpacing: "2px", fontWeight: 600,
                  cursor: "pointer", fontFamily: "inherit",
                  transition: "all 0.2s",
                }}
                  onMouseEnter={e => { if (activeFilter !== f) { e.currentTarget.style.borderColor = "rgba(196,164,78,0.5)"; e.currentTarget.style.color = CREAM; }}}
                  onMouseLeave={e => { if (activeFilter !== f) { e.currentTarget.style.borderColor = "rgba(196,164,78,0.25)"; e.currentTarget.style.color = MUTED; }}}
                >{f}</button>
              ))}
            </div>
            <span style={{ fontSize: "11px", color: MUTED, letterSpacing: "1px" }}>
              {filtered.length} {filtered.length === 1 ? "EPISODE" : "EPISODES"}
            </span>
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "24px",
            }}>
              {filtered.map((ep, i) => (
                <EpisodeCard key={ep.num} ep={ep} index={i} visible={gridVis} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <p style={{ fontSize: "18px", color: MUTED }}>No episodes in this category yet.</p>
            </div>
          )}

          {/* Load more */}
          {filtered.length >= 3 && (
            <div style={{ textAlign: "center", marginTop: "56px" }}>
              <button style={{
                padding: "13px 40px",
                border: `1px solid rgba(196,164,78,0.3)`,
                background: "transparent", color: MUTED,
                fontSize: "10px", letterSpacing: "2.5px", fontWeight: 600,
                cursor: "pointer", fontFamily: "inherit",
                transition: "border-color 0.2s, color 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.color = "white"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(196,164,78,0.3)"; e.currentTarget.style.color = MUTED; }}
              >LOAD MORE EPISODES</button>
            </div>
          )}
        </div>
      </section>

      {/* ════════ SUBSCRIBE STRIP ════════ */}
      <section style={{
        background: PANEL,
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "56px 5vw",
      }}>
        <div style={{
          maxWidth: "1200px", margin: "0 auto",
          display: "flex", alignItems: "center",
          justifyContent: "space-between", flexWrap: "wrap", gap: "24px",
        }}>
          <div>
            <p style={{ fontSize: "10px", letterSpacing: "3px", color: GOLD, marginBottom: "8px", fontWeight: 600 }}>
              NEVER MISS AN EPISODE
            </p>
            <p style={{ fontSize: "18px", fontWeight: 600, color: "white", margin: 0 }}>
              Subscribe wherever you listen.
            </p>
          </div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {[
              { label: "YouTube", href: "https://www.youtube.com/watch?v=h2B6kPP16-M" },
              { label: "Spotify", href: "#" },
              { label: "Apple Podcasts", href: "#" },
            ].map(p => (
              <a key={p.label} href={p.href}
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: "inline-block", padding: "10px 24px",
                  border: "1px solid rgba(255,255,255,0.15)", color: CREAM,
                  textDecoration: "none", fontSize: "11px",
                  letterSpacing: "1.5px", fontWeight: 500,
                  transition: "border-color 0.2s, color 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.color = "white"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = CREAM; }}
              >{p.label}</a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
