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
const DARK2 = "#1A2820";
const GOLD  = "#C4A44E";
const TEAL  = "#2C8C7C";
const CREAM = "rgba(214,207,194,0.75)";
const MUTED = "rgba(214,207,194,0.42)";

/* ── Episodes data — update with real content ── */
const episodes = [
  {
    num: "01",
    guest: "Amara Diallo",
    role: "Maritime Lawyer",
    location: "Dakar",
    title: "Who Really Owns the Sea?",
    tag: "Governance",
    season: 1,
    duration: "60 min",
    img: "/images/episodes/ep01.jpg",
  },
  {
    num: "02",
    guest: "Kofi Mensah",
    role: "Documentary Filmmaker",
    location: "Accra",
    title: "The Last Fisher",
    tag: "Community",
    season: 1,
    duration: "58 min",
    img: "/images/episodes/ep02.jpg",
  },
  {
    num: "03",
    guest: "Nkechi Obi",
    role: "Marine Economist",
    location: "Lagos",
    title: "Blue Money",
    tag: "Blue Economy",
    season: 1,
    duration: "52 min",
    img: "/images/episodes/ep03.jpg",
  },
];

const FILTERS = ["All Episodes", "Season 1", "Most Recent"];

/* ── Play button ── */
function PlayButton() {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "40px", height: "40px", borderRadius: "50%",
        border: `1px solid ${hovered ? GOLD : "rgba(196,164,78,0.35)"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0, cursor: "pointer",
        transition: "border-color 0.2s, background 0.2s",
        background: hovered ? "rgba(196,164,78,0.1)" : "transparent",
      }}
    >
      <svg width="12" height="14" viewBox="0 0 12 14" fill={hovered ? GOLD : "rgba(196,164,78,0.6)"}>
        <path d="M0 0l12 7-12 7V0z"/>
      </svg>
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
        background: PANEL, overflow: "hidden",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(24px)",
        transition: `opacity 0.6s ${0.05 + index * 0.1}s, transform 0.6s ${0.05 + index * 0.1}s, box-shadow 0.3s`,
        boxShadow: hovered ? "0 16px 40px rgba(0,0,0,0.35)" : "none",
        cursor: "pointer",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", height: "240px", overflow: "hidden" }}>
        <img
          src={ep.img}
          alt={ep.guest}
          style={{
            width: "100%", height: "100%", objectFit: "cover", display: "block",
            transform: hovered ? "scale(1.04)" : "scale(1)",
            transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
          }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(20,31,24,0.95) 0%, transparent 55%)",
        }} />

        {/* Tag */}
        <span style={{
          position: "absolute", top: "14px", left: "14px",
          background: GOLD, color: "#0F1912",
          fontSize: "9px", letterSpacing: "2px", fontWeight: 700,
          padding: "4px 10px",
        }}>{ep.tag.toUpperCase()}</span>

        {/* Episode number watermark */}
        <span style={{
          position: "absolute", bottom: "14px", right: "16px",
          fontSize: "48px", fontWeight: 700, lineHeight: 1,
          color: "rgba(255,255,255,0.07)", userSelect: "none",
        }}>EP. {ep.num}</span>
      </div>

      {/* Content */}
      <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column" }}>
        <p style={{ fontSize: "11px", color: MUTED, marginBottom: "4px" }}>Sipping with</p>
        <h3 style={{
          fontSize: "22px", fontWeight: 700,
          color: hovered ? GOLD : "white",
          lineHeight: 1.2, marginBottom: "6px",
          transition: "color 0.2s",
        }}>{ep.guest}</h3>
        <p style={{ fontSize: "11px", letterSpacing: "1px", color: GOLD, marginBottom: "14px" }}>
          {ep.role} · {ep.location}
        </p>
        <div style={{ width: "24px", height: "1px", background: "rgba(196,164,78,0.3)", marginBottom: "14px" }} />
        <p style={{
          fontSize: "14px", lineHeight: 1.65,
          color: CREAM, fontWeight: 300,
          flex: 1, marginBottom: "20px",
        }}>"{ep.title}"</p>

        {/* Footer */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "auto" }}>
          <PlayButton />
          <span style={{ fontSize: "10px", letterSpacing: "2px", color: MUTED, fontWeight: 500 }}>
            PLAY · {ep.duration}
          </span>
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

      {/* ══════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════ */}
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

      {/* ══════════════════════════════════════════════
          FILTERS + GRID
      ══════════════════════════════════════════════ */}
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
              gap: "2px", background: "rgba(255,255,255,0.03)",
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

          {/* Load more — for when you add more episodes */}
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

      {/* ══════════════════════════════════════════════
          SUBSCRIBE STRIP
      ══════════════════════════════════════════════ */}
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
              { label: "YouTube", href: "#" },
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
