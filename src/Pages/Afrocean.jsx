import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useIsMobile from "../hooks/useIsMobile";

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
const TERRA = "#B5541E";
const CREAM = "rgba(214,207,194,0.75)";
const MUTED = "rgba(214,207,194,0.42)";

const IMGS = {
  hero:      "/handshero.jpg",
  fishermen: "/afroceanhero",
  culture1:  "/dis2.jpg",
  market:    "/africanmask1.jpg",
  cta:       "/cabin.jpg",
};

const pillars = [
  {
    title: "Cultural Exchange",
    body: "A dedicated space for the African Diaspora to return to their maritime heritage through dialogue, performance, storytelling, and shared memory.",
  },
  {
    title: "Knowledge Sharing",
    body: "Industry leaders, community elders, and emerging voices share expertise and lived experience across the blue economy and its cultural heritage.",
  },
  {
    title: "Networking",
    body: "Strategic connections forged between professionals, entrepreneurs, and institutions across Africa and the Diaspora.",
  },
  {
    title: "Economic Access",
    body: "Facilitating greater access to economic opportunities and resources, within the Diaspora and on the African continent.",
  },
];

/* ── Reusable hoverable mosaic tile ── */
function MosaicTile({ src, label, sub, to, height = "300px" }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      to={to}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative", overflow: "hidden",
        display: "block", textDecoration: "none",
        cursor: "pointer",
      }}
    >
      <img
        src={src}
        alt={label}
        style={{
          width: "100%",
          height,
          objectFit: "cover",
          display: "block",
          transform: hovered ? "scale(1.04)" : "scale(1)",
          transition: "transform 0.65s cubic-bezier(0.16,1,0.3,1)",
        }}
      />

      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(15,25,18,0.85) 0%, rgba(15,25,18,0.2) 55%, transparent 100%)",
      }} />

      <div style={{ position: "absolute", bottom: "18px", left: "18px", right: "18px" }}>
        <span style={{
          fontSize: "14px", fontWeight: 700,
          color: "white", display: "block", marginBottom: "4px",
        }}>{label}</span>
        <span style={{
          fontSize: "9px", letterSpacing: "2.5px",
          color: GOLD, fontWeight: 600,
        }}>{sub.toUpperCase()}</span>
      </div>
    </Link>
  );
}

export default function Afrocean() {
  const [heroRef,    heroVis]    = useReveal(0.05);
  const [rootsRef,   rootsVis]   = useReveal(0.08);
  const [mosaicRef,  mosaicVis]  = useReveal(0.08);
  const [pillarsRef, pillarsVis] = useReveal(0.1);
  const [diaspRef,   diaspVis]   = useReveal(0.1);
  const [ctaRef,     ctaVis]     = useReveal(0.1);
  const isMobile = useIsMobile();

  return (
    <div style={{ minHeight: "100vh", background: BG, color: "white", overflowX: "hidden" }}>
      <Navbar />

      {/* ════════ HERO ════════ */}
      <section ref={heroRef} style={{
        height: "100vh", minHeight: "600px",
        position: "relative", overflow: "hidden",
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
      }}>
        <img src={IMGS.hero} alt="African cultural gathering"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,25,18,1) 0%, rgba(15,25,18,0.6) 50%, transparent 85%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(15,25,18,0.78) 0%, transparent 60%)" }} />
        <div className="ct-grain" style={{ zIndex: 1 }} />

        <div style={{ position: "relative", zIndex: 2, padding: "0 5vw clamp(40px, 7vw, 72px)" }}>
          <p style={{
            fontSize: "11px", letterSpacing: "4px", color: GOLD,
            fontWeight: 500, marginBottom: "16px",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(10px)",
            transition: "opacity 0.6s 0.1s, transform 0.6s 0.1s",
          }}>CABIN TEA · CULTURAL GATHERING</p>

          <h1 style={{
            fontWeight: 700, fontSize: "clamp(36px, 5vw, 64px)",
            lineHeight: 1.1, color: "white", margin: "0 0 16px", maxWidth: "600px",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(20px)",
            transition: "opacity 0.7s 0.18s, transform 0.7s 0.18s",
          }}>Afrocean</h1>

          <p style={{
            fontSize: "16px", color: CREAM, lineHeight: 1.7,
            fontWeight: 300, maxWidth: "480px", marginBottom: "32px",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(14px)",
            transition: "opacity 0.7s 0.28s, transform 0.7s 0.28s",
          }}>
            A gathering that connects the African Diaspora with its maritime heritage and indigenous roots.
          </p>

          <div style={{
            display: "flex", gap: "12px", flexWrap: "wrap",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(12px)",
            transition: "opacity 0.7s 0.38s, transform 0.7s 0.38s",
          }}>
            <Link to="/partner" style={{
              display: "inline-block", padding: "13px 32px",
              background: GOLD, color: "#0F1912",
              textDecoration: "none", fontSize: "11px",
              letterSpacing: "2px", fontWeight: 700, transition: "opacity 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >GET INVOLVED</Link>
            <Link to="/episodes" style={{
              display: "inline-block", padding: "13px 32px",
              border: "1px solid rgba(255,255,255,0.2)", color: CREAM,
              textDecoration: "none", fontSize: "11px",
              letterSpacing: "2px", fontWeight: 500,
              transition: "border-color 0.2s, color 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; e.currentTarget.style.color = "white"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = CREAM; }}
            >LISTEN NOW</Link>
          </div>
        </div>
      </section>

      {/* ════════ ROOTS ════════ */}
      <section ref={rootsRef} style={{ background: PANEL }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", minHeight: isMobile ? "auto" : "560px" }}>
          <div style={{
            position: "relative", overflow: "hidden",
            opacity: rootsVis ? 1 : 0, transform: rootsVis ? "none" : "translateX(-16px)",
            transition: "opacity 0.8s, transform 0.8s",
          }}>
            <img src={IMGS.fishermen} alt="African coastal community"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", minHeight: isMobile ? "320px" : "560px" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent, rgba(20,31,24,0.6) 100%)" }} />
            <div style={{
              position: "absolute", bottom: "36px", left: "28px",
              background: TERRA, color: "white", padding: "16px 20px", maxWidth: "220px",
            }}>
              <span style={{ fontSize: "9px", letterSpacing: "2px", display: "block", marginBottom: "6px", color: "rgba(255,255,255,0.7)" }}>
                INDIGENOUS HERITAGE
              </span>
              <p style={{ fontSize: "13px", lineHeight: 1.6, margin: 0 }}>
                "The sea is our ancestor. We were navigators long before the world knew it."
              </p>
            </div>
          </div>

          <div style={{
            padding: isMobile ? "40px 5vw" : "72px 5vw 72px 56px",
            display: "flex", flexDirection: "column", justifyContent: "center",
            opacity: rootsVis ? 1 : 0, transform: rootsVis ? "none" : "translateX(16px)",
            transition: "opacity 0.8s 0.15s, transform 0.8s 0.15s",
          }}>
            <p style={{ fontSize: "10px", letterSpacing: "3px", color: TERRA, marginBottom: "18px", fontWeight: 600 }}>
              THE ROOTS
            </p>
            <h2 style={{
              fontWeight: 700, fontSize: "clamp(22px, 2.8vw, 36px)",
              lineHeight: 1.2, color: "white", marginBottom: "20px",
            }}>
              Long before colonial borders, African peoples were master navigators, coastal traders, and ocean stewards.
            </h2>
            <p style={{ fontSize: "15px", lineHeight: 1.9, color: CREAM, fontWeight: 300 }}>
              From the Swahili merchants of East Africa to the Fante fishermen of Ghana's Cape Coast, the sea was always home. Afrocean exists to honour that heritage, connecting the Diaspora back to the coastal communities and ancestral relationship with the ocean.
            </p>
          </div>
        </div>
      </section>

      {/* ════════ IMAGE MOSAIC — now with clickable tiles ════════ */}
      <section ref={mosaicRef} style={{ background: BG, overflow: "hidden" }}>

        {/* Section header */}
        <div style={{
          padding: "56px 5vw 24px",
          opacity: mosaicVis ? 1 : 0, transform: mosaicVis ? "none" : "translateY(12px)",
          transition: "opacity 0.6s, transform 0.6s",
          display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "16px",
        }}>
          <p style={{ fontSize: "10px", letterSpacing: "3px", color: GOLD, margin: 0, fontWeight: 600 }}>
            THE CULTURE
          </p>
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "2px",
          opacity: mosaicVis ? 1 : 0, transform: mosaicVis ? "none" : "translateY(20px)",
          transition: "opacity 0.8s 0.1s, transform 0.8s 0.1s",
          marginBottom: "56px",
        }}>
          <MosaicTile
            src={IMGS.culture1}
            label="Indigenous Dress"
            sub="West Africa"
            to="/on-deck"
            height="340px"
          />
          <MosaicTile
            src={IMGS.market}
            label="Community Gathering"
            sub="The Continent"
            to="/whats-rising"
            height="340px"
          />
        </div>
      </section>

      {/* ════════ FOUR PILLARS ════════ */}
      <section ref={pillarsRef} style={{ background: PANEL, padding: "clamp(56px, 8vw, 96px) 5vw" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{
            display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "40px" : "80px",
            alignItems: "end", marginBottom: "56px",
            opacity: pillarsVis ? 1 : 0, transform: pillarsVis ? "none" : "translateY(12px)",
            transition: "opacity 0.6s, transform 0.6s",
          }}>
            <div>
              <p style={{ fontSize: "10px", letterSpacing: "3px", color: GOLD, marginBottom: "12px", fontWeight: 600 }}>
                FOUR PILLARS
              </p>
              <h2 style={{ fontWeight: 700, fontSize: "clamp(22px, 3vw, 36px)", color: "white", margin: 0, lineHeight: 1.2 }}>
                What Afrocean stands for.
              </h2>
            </div>
            <p style={{ fontSize: "15px", lineHeight: 1.8, color: MUTED, fontWeight: 300, margin: 0 }}>
              Each pillar draws on Adinkra philosophy, the visual language the Akan people of Ghana have used for centuries to encode wisdom and cultural identity.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {pillars.map((p, i) => (
              <div key={p.title} style={{
                display: "grid", gridTemplateColumns: isMobile ? "1fr" : "200px 1fr",
                gap: isMobile ? "8px" : "40px", padding: "36px 0",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                alignItems: "start",
                opacity: pillarsVis ? 1 : 0, transform: pillarsVis ? "none" : "translateY(16px)",
                transition: `opacity 0.6s ${0.1 + i * 0.1}s, transform 0.6s ${0.1 + i * 0.1}s`,
              }}>
                <h3 style={{ fontSize: "20px", fontWeight: 700, color: "white", margin: 0 }}>{p.title}</h3>
                <p style={{ fontSize: "15px", lineHeight: 1.85, color: CREAM, fontWeight: 300, margin: 0 }}>{p.body}</p>
              </div>
            ))}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }} />
          </div>
        </div>
      </section>

      {/* ════════ DIASPORA ════════ */}
      <section ref={diaspRef} style={{ background: BG, padding: "clamp(56px, 8vw, 96px) 5vw" }}>
        <div style={{
          maxWidth: "720px", margin: "0 auto", textAlign: "center",
          opacity: diaspVis ? 1 : 0, transform: diaspVis ? "none" : "translateY(16px)",
          transition: "opacity 0.8s, transform 0.8s",
        }}>
          <p style={{ fontSize: "10px", letterSpacing: "3px", color: TERRA, marginBottom: "18px", fontWeight: 600 }}>
            THE DIASPORA
          </p>
          <h2 style={{ fontWeight: 700, fontSize: "clamp(22px, 2.8vw, 38px)", lineHeight: 1.15, color: "white", marginBottom: "20px" }}>
            Where home is a horizon away.
          </h2>
          <p style={{ fontSize: "15px", lineHeight: 1.9, color: CREAM, fontWeight: 300, marginBottom: "32px" }}>
            Afrocean is built for Africans and people of African descent across the world who carry the ocean in their blood. It's a bridge back to the maritime heritage and living communities the Diaspora was separated from.
          </p>
          <Link to="/partner" style={{
            display: "inline-block", padding: "13px 32px",
            background: TERRA, color: "white",
            textDecoration: "none", fontSize: "11px",
            letterSpacing: "2px", fontWeight: 700,
            transition: "opacity 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >JOIN AFROCEAN →</Link>
        </div>
      </section>

      {/* ════════ CTA ════════ */}
      <section ref={ctaRef} style={{
        position: "relative", overflow: "hidden",
        minHeight: "400px", display: "flex", alignItems: "center",
      }}>
        <img src={IMGS.cta} alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(105deg, rgba(15,25,18,0.97) 40%, rgba(15,25,18,0.75) 100%)",
        }} />
        <div className="ct-grain" style={{ zIndex: 1 }} />
        <div style={{
          position: "relative", zIndex: 2,
          padding: "clamp(48px, 7vw, 80px) 5vw", maxWidth: "640px",
          opacity: ctaVis ? 1 : 0, transform: ctaVis ? "none" : "translateY(16px)",
          transition: "opacity 0.8s, transform 0.8s",
        }}>
          <h2 style={{
            fontWeight: 700, fontSize: "clamp(28px, 4vw, 52px)",
            lineHeight: 1.1, color: "white", marginBottom: "16px",
          }}>Be part of the next Afrocean.</h2>
          <p style={{
            fontSize: "16px", lineHeight: 1.75, color: CREAM,
            fontWeight: 300, maxWidth: "420px", marginBottom: "36px",
          }}>
            Connect with the African maritime community, the global Diaspora, and indigenous coastal cultures at our flagship cultural gathering.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link to="/partner" style={{
              display: "inline-block", padding: "13px 32px",
              background: GOLD, color: "#0F1912",
              textDecoration: "none", fontSize: "11px",
              letterSpacing: "2px", fontWeight: 700, transition: "opacity 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >GET INVOLVED</Link>
            <Link to="/about" style={{
              display: "inline-block", padding: "13px 32px",
              border: "1px solid rgba(255,255,255,0.2)", color: CREAM,
              textDecoration: "none", fontSize: "11px",
              letterSpacing: "2px", fontWeight: 500,
              transition: "border-color 0.2s, color 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; e.currentTarget.style.color = "white"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = CREAM; }}
            >LEARN MORE</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
