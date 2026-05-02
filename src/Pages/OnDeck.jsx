import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function useReveal(threshold = 0.08) {
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

const BG    = "#0F1912";
const PANEL = "#141F18";
const DARK2 = "#1A2820";
const GOLD  = "#C4A44E";
const TEAL  = "#2C8C7C";
const CREAM = "rgba(214,207,194,0.75)";
const MUTED = "rgba(214,207,194,0.38)";

/* ── Profiles — placeholder data, easy to update ── */
const PROFILES = [
  {
    id: 1,
    name: "Kwame Asante",
    title: "Port Operations Manager",
    location: "Tema Port, Ghana",
    edition: "Edition 01",
    quote: "Every ship that docks here carries someone's livelihood. We are the first and last hands those goods touch.",
    img: "/disface.png",
    tag: "Operations",
  },
  {
    id: 2,
    name: "Amara Diallo",
    title: "Maritime Lawyer",
    location: "Dakar, Senegal",
    edition: "Edition 02",
    quote: "The law of the sea is centuries old. Applying it to Africa's emerging blue economy is the challenge of our generation.",
    img: "/africanwomen.jpg",
    tag: "Legal",
  },
  {
    id: 3,
    name: "Nkechi Obi",
    title: "Marine Economist",
    location: "Lagos, Nigeria",
    edition: "Edition 03",
    quote: "Blue money is real money. The question is whether we have the institutions to capture it.",
    img: "/africanface.jpg",
    tag: "Economics",
  },
];

/* ── Profile card ── */
function ProfileCard({ profile, index, visible }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: PANEL,
        display: "flex", flexDirection: "column",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(24px)",
        transition: `opacity 0.6s ${0.08 + index * 0.1}s, transform 0.6s ${0.08 + index * 0.1}s, box-shadow 0.3s`,
        boxShadow: hovered ? "0 16px 48px rgba(0,0,0,0.35)" : "none",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", height: "280px", overflow: "hidden" }}>
        <img
          src={profile.img}
          alt={profile.name}
          style={{
            width: "100%", height: "100%", objectFit: "cover", display: "block",
            objectPosition: "center top",
            transform: hovered ? "scale(1.04)" : "scale(1)",
            transition: "transform 0.65s cubic-bezier(0.16,1,0.3,1)",
          }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(20,31,24,0.95) 0%, transparent 55%)",
        }} />
        {/* Tag */}
        <span style={{
          position: "absolute", top: "16px", left: "16px",
          background: TEAL, color: "white",
          fontSize: "9px", letterSpacing: "2px", fontWeight: 700,
          padding: "4px 10px",
        }}>{profile.tag.toUpperCase()}</span>
        {/* Edition */}
        <span style={{
          position: "absolute", top: "16px", right: "16px",
          fontSize: "10px", color: "rgba(255,255,255,0.4)", letterSpacing: "1px",
        }}>{profile.edition}</span>
      </div>

      {/* Content */}
      <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column" }}>
        <h3 style={{
          fontSize: "20px", fontWeight: 700,
          color: hovered ? GOLD : "white",
          margin: "0 0 4px", lineHeight: 1.2,
          transition: "color 0.2s",
        }}>{profile.name}</h3>
        <p style={{ fontSize: "11px", color: GOLD, margin: "0 0 2px", letterSpacing: "0.5px", fontWeight: 500 }}>
          {profile.title}
        </p>
        <p style={{ fontSize: "11px", color: MUTED, margin: "0 0 18px", letterSpacing: "0.3px" }}>
          {profile.location}
        </p>
        <div style={{ width: "24px", height: "1px", background: "rgba(196,164,78,0.3)", margin: "0 0 16px" }} />
        <p style={{
          fontSize: "14px", lineHeight: 1.7, color: CREAM,
          fontStyle: "italic", fontWeight: 300, flex: 1, margin: "0 0 20px",
        }}>"{profile.quote}"</p>
        <button style={{
          alignSelf: "flex-start",
          padding: "9px 20px",
          background: "transparent",
          border: "1px solid rgba(196,164,78,0.25)",
          color: MUTED, cursor: "pointer",
          fontSize: "9px", letterSpacing: "2px", fontWeight: 700,
          fontFamily: "inherit", transition: "border-color 0.2s, color 0.2s",
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.color = "white"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(196,164,78,0.25)"; e.currentTarget.style.color = MUTED; }}
        >READ FULL STORY →</button>
      </div>
    </div>
  );
}

export default function OnDeck() {
  const [heroRef,    heroVis]    = useReveal(0.05);
  const [introRef,   introVis]   = useReveal(0.08);
  const [gridRef,    gridVis]    = useReveal(0.06);
  const [ctaRef,     ctaVis]     = useReveal(0.1);

  return (
    <div style={{ minHeight: "100vh", background: BG, color: "white", overflowX: "hidden" }}>
      <Navbar />

      {/* ════════ HERO ════════ */}
      <section ref={heroRef} style={{
        height: "55vh", minHeight: "400px",
        position: "relative", overflow: "hidden",
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
      }}>
        <img
          src="/dis2.jpg"
          alt="On Deck"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(15,25,18,1) 0%, rgba(15,25,18,0.6) 55%, transparent 100%)",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, rgba(15,25,18,0.75) 0%, transparent 60%)",
        }} />
        <div className="ct-grain" style={{ zIndex: 1 }} />

        <div style={{ position: "relative", zIndex: 2, padding: "0 5vw 56px" }}>
          {/* Breadcrumb */}
          <div style={{
            display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(10px)",
            transition: "opacity 0.6s 0.08s, transform 0.6s 0.08s",
          }}>
            <Link to="/afrocean" style={{
              fontSize: "10px", letterSpacing: "2.5px", color: MUTED,
              textDecoration: "none", fontWeight: 500,
              transition: "color 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.color = GOLD}
              onMouseLeave={e => e.currentTarget.style.color = MUTED}
            >AFROCEAN</Link>
            <span style={{ color: MUTED, fontSize: "10px" }}>·</span>
            <span style={{ fontSize: "10px", letterSpacing: "2.5px", color: TEAL, fontWeight: 600 }}>
              ON DECK
            </span>
          </div>

          <h1 style={{
            fontWeight: 700, fontSize: "clamp(36px, 5vw, 72px)",
            lineHeight: 1, color: "white", margin: "0 0 10px",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(20px)",
            transition: "opacity 0.8s 0.16s, transform 0.8s 0.16s",
          }}>On Deck</h1>

          <p style={{
            fontSize: "16px", color: CREAM, lineHeight: 1.65,
            fontWeight: 300, maxWidth: "460px", margin: 0,
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(14px)",
            transition: "opacity 0.7s 0.26s, transform 0.7s 0.26s",
          }}>
            One person. One story. Every edition.
          </p>
        </div>
      </section>

      {/* ════════ INTRO ════════ */}
      <section ref={introRef} style={{ background: PANEL, padding: "72px 5vw" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: "80px", alignItems: "center",
            opacity: introVis ? 1 : 0, transform: introVis ? "none" : "translateY(16px)",
            transition: "opacity 0.7s, transform 0.7s",
          }}>
            <div>
              <p style={{ fontSize: "10px", letterSpacing: "3px", color: TEAL, marginBottom: "18px", fontWeight: 600 }}>
                ABOUT THE SERIES
              </p>
              <h2 style={{
                fontWeight: 700, fontSize: "clamp(22px, 2.8vw, 36px)",
                lineHeight: 1.2, color: "white", marginBottom: "20px",
              }}>
                Every ship runs on people.
              </h2>
              <p style={{ fontSize: "15px", lineHeight: 1.9, color: CREAM, fontWeight: 300 }}>
                On Deck brings you face to face with the men and women behind Africa's ocean industry — their journeys, their challenges, and what keeps them going. One person. One story. Every edition.
              </p>
            </div>
            <div style={{
              borderLeft: "2px solid rgba(44,140,124,0.25)",
              paddingLeft: "40px",
            }}>
              <p style={{ fontSize: "15px", lineHeight: 1.9, color: MUTED, fontWeight: 300, margin: "0 0 20px" }}>
                Africa's blue economy is built by real people — port workers, marine scientists, fishermen, lawyers, entrepreneurs. Their stories rarely make headlines. On Deck changes that.
              </p>
              <p style={{ fontSize: "15px", lineHeight: 1.9, color: MUTED, fontWeight: 300, margin: 0 }}>
                Each edition is a single, intimate portrait. No panels. No roundtables. Just one voice, one life, one career in the ocean economy of the continent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ PROFILES GRID ════════ */}
      <section ref={gridRef} style={{ background: BG, padding: "72px 5vw 96px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

          <div style={{
            display: "flex", alignItems: "baseline",
            justifyContent: "space-between", marginBottom: "40px",
            opacity: gridVis ? 1 : 0, transform: gridVis ? "none" : "translateY(12px)",
            transition: "opacity 0.6s, transform 0.6s",
          }}>
            <h2 style={{
              fontWeight: 700, fontSize: "clamp(20px, 2.5vw, 30px)",
              color: "white", margin: 0,
            }}>Latest Editions</h2>
            <span style={{ fontSize: "11px", color: MUTED, letterSpacing: "1px" }}>
              {PROFILES.length} PROFILES
            </span>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "2px",
          }}>
            {PROFILES.map((profile, i) => (
              <ProfileCard key={profile.id} profile={profile} index={i} visible={gridVis} />
            ))}
          </div>

          {/* Coming soon note */}
          <div style={{
            marginTop: "40px", padding: "28px 32px",
            background: PANEL,
            borderLeft: `3px solid ${TEAL}`,
            opacity: gridVis ? 1 : 0, transition: "opacity 0.7s 0.35s",
          }}>
            <p style={{ fontSize: "10px", letterSpacing: "2.5px", color: TEAL, marginBottom: "8px", fontWeight: 600 }}>
              NEW EDITIONS DROP MONTHLY
            </p>
            <p style={{ fontSize: "14px", color: MUTED, margin: 0, lineHeight: 1.6 }}>
              Subscribe to the Cabin Tea newsletter to be notified when the next On Deck profile is published.
            </p>
          </div>
        </div>
      </section>

      {/* ════════ CTA ════════ */}
      <section ref={ctaRef} style={{ background: PANEL, borderTop: "1px solid rgba(255,255,255,0.06)", padding: "64px 5vw" }}>
        <div style={{
          maxWidth: "1200px", margin: "0 auto",
          display: "flex", alignItems: "center",
          justifyContent: "space-between", flexWrap: "wrap", gap: "28px",
          opacity: ctaVis ? 1 : 0, transform: ctaVis ? "none" : "translateY(12px)",
          transition: "opacity 0.7s, transform 0.7s",
        }}>
          <div>
            <p style={{ fontSize: "10px", letterSpacing: "3px", color: GOLD, marginBottom: "10px", fontWeight: 600 }}>
              EXPLORE MORE
            </p>
            <h3 style={{ fontWeight: 700, fontSize: "clamp(18px, 2.5vw, 28px)", color: "white", margin: 0 }}>
              More from Afrocean.
            </h3>
          </div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link to="/whats-rising" style={{
              display: "inline-block", padding: "12px 28px",
              border: "1px solid rgba(255,255,255,0.15)", color: CREAM,
              textDecoration: "none", fontSize: "11px",
              letterSpacing: "1.5px", fontWeight: 500,
              transition: "border-color 0.2s, color 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.color = "white"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = CREAM; }}
            >What's Rising →</Link>
            <Link to="/afrocean" style={{
              display: "inline-block", padding: "12px 28px",
              background: GOLD, color: BG,
              textDecoration: "none", fontSize: "11px",
              letterSpacing: "1.5px", fontWeight: 700,
              transition: "opacity 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >Back to Afrocean</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
