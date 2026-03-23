import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

/* ─────────────────────────────────────────────────────────
   ADINKRA SYMBOLS — drawn as true SVG paths
   Each symbol carries meaning rooted in Akan philosophy
───────────────────────────────────────────────────────── */

/* Sankofa — "Go back and get it" / Reconnect with roots */
function Sankofa({ size = 56, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <ellipse cx="52" cy="62" rx="22" ry="14" stroke={color} strokeWidth="2.8" fill="none"/>
      <path d="M30 62 Q18 55 14 45 Q22 50 30 56" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M30 65 Q16 65 12 58 Q20 60 30 62" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M52 48 Q58 30 70 28 Q78 26 80 34 Q82 42 74 46 Q64 50 52 48Z" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <circle cx="76" cy="33" r="3" fill={color}/>
      <ellipse cx="50" cy="80" rx="8" ry="10" stroke={color} strokeWidth="2" fill="none"/>
      <line x1="45" y1="74" x2="42" y2="88" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <line x1="55" y1="74" x2="58" y2="88" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

/* Boa Me Na Me Mmoa Wo — "Help me and let me help you" / Cooperation */
function BoaMeNa({ size = 56, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="30" stroke={color} strokeWidth="2.5" fill="none"/>
      <circle cx="50" cy="50" r="16" stroke={color} strokeWidth="2.5" fill="none"/>
      <circle cx="50" cy="50" r="5" fill={color}/>
      {/* Four directional arrows — mutual aid */}
      <path d="M50 20 L50 8 M46 12 L50 8 L54 12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M50 80 L50 92 M46 88 L50 92 L54 88" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20 50 L8 50 M12 46 L8 50 L12 54" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M80 50 L92 50 M88 46 L92 50 L88 54" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* Ese Ne Tekrema — "The teeth and the tongue" / Interdependence */
function EseNe({ size = 56, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* Two interlocking crescents */}
      <path d="M30 50 Q30 20 50 20 Q35 35 35 50 Q35 65 50 80 Q30 80 30 50Z" stroke={color} strokeWidth="2.5" fill="none"/>
      <path d="M70 50 Q70 20 50 20 Q65 35 65 50 Q65 65 50 80 Q70 80 70 50Z" stroke={color} strokeWidth="2.5" fill="none"/>
      <circle cx="50" cy="36" r="4" fill={color}/>
      <circle cx="50" cy="64" r="4" fill={color}/>
    </svg>
  );
}

/* Nkyinkyim — "Adaptability" — S/zigzag pattern */
function Nkyinkyim({ size = 56, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <path d="M10 70 Q25 30 40 50 Q55 70 70 30 Q85 10 90 30" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="10" cy="70" r="4" fill={color}/>
      <circle cx="40" cy="50" r="4" fill={color}/>
      <circle cx="70" cy="30" r="4" fill={color}/>
      <circle cx="90" cy="30" r="4" fill={color}/>
    </svg>
  );
}

/* ── Wax print diamond lattice background ── */
function WaxBg({ opacity = 0.06, color = "#C4A44E" }) {
  const id = `wx-${Math.random().toString(36).substr(2,4)}`;
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      <svg width="100%" height="100%" style={{ opacity }}>
        <defs>
          <pattern id={id} width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M40 0 L80 40 L40 80 L0 40 Z" stroke={color} strokeWidth="1" fill="none"/>
            <circle cx="40" cy="40" r="8" stroke={color} strokeWidth="1" fill="none"/>
            <path d="M40 24 L56 40 L40 56 L24 40 Z" stroke={color} strokeWidth="0.8" fill="none"/>
            <circle cx="0"  cy="0"  r="3" stroke={color} strokeWidth="0.7" fill="none"/>
            <circle cx="80" cy="0"  r="3" stroke={color} strokeWidth="0.7" fill="none"/>
            <circle cx="0"  cy="80" r="3" stroke={color} strokeWidth="0.7" fill="none"/>
            <circle cx="80" cy="80" r="3" stroke={color} strokeWidth="0.7" fill="none"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`}/>
      </svg>
    </div>
  );
}

/* ── Kente-strip divider ── */
function TextileBand() {
  const colors = ["#C4A44E","#2C8C7C","#B5541E","#C4A44E","#152A2F",
                  "#B5541E","#2C8C7C","#C4A44E","#152A2F","#C4A44E",
                  "#B5541E","#2C8C7C","#C4A44E","#152A2F","#2C8C7C",
                  "#C4A44E","#B5541E"];
  return (
    <div style={{ display: "flex", height: "8px", width: "100%", overflow: "hidden" }}>
      {colors.map((c, i) => <div key={i} style={{ background: c, flex: 1 }} />)}
    </div>
  );
}

/* ── Earth palette ── */
const TERRA = "#B5541E";
const EARTH = "#2A1A0E";
const WARM  = "#1E2D1A";
const OCHRE = "#C4870A";

/* ── Images: real African people, indigenous culture, Diaspora community ── */
const IMGS = {
  /* Hero — vibrant African festival / cultural gathering */
  hero:      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1600&q=85",
  /* Indigenous African coastal community */
  fishermen: "https://images.unsplash.com/photo-1596524430615-b46475ddff6e?w=900&q=80",
  /* African women in traditional dress */
  culture1:  "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=900&q=80",
  /* Diaspora gathering / community */
  diaspora1: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=900&q=80",
  /* African market / community */
  market:    "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=900&q=80",
  /* African coastal / harbour */
  harbour:   "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=900&q=80",
  /* Traditional African attire */
  attire:    "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=900&q=80",
  /* African youth community */
  youth:     "https://images.unsplash.com/photo-1504439904031-93ded9f93e4e?w=900&q=80",
  /* CTA background */
  cta:       "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1600&q=80",
};

const pillars = [
  {
    symbol: <Sankofa size={44} color="rgba(196,164,78,0.75)"/>,
    adinkra: "Sankofa",
    meaning: "Return & reconnect",
    title: "Cultural Exchange",
    body: "A dedicated space for the African Diaspora to return to their maritime heritage through dialogue, performance, storytelling, and shared memory — the way the Sankofa bird looks back while flying forward.",
  },
  {
    symbol: <BoaMeNa size={44} color="rgba(196,164,78,0.75)"/>,
    adinkra: "Boa Me Na Me Mmoa Wo",
    meaning: "Help me and I'll help you",
    title: "Knowledge Sharing",
    body: "Industry leaders, community elders, indigenous knowledge holders, and emerging voices converge to share expertise and lived experience across the blue economy and its cultural heritage.",
  },
  {
    symbol: <EseNe size={44} color="rgba(196,164,78,0.75)"/>,
    adinkra: "Ese Ne Tekrema",
    meaning: "Interdependence",
    title: "Networking",
    body: "Strategic connections forged between professionals, entrepreneurs, and institutions across Africa and the Diaspora — like teeth and tongue, inseparable and stronger together.",
  },
  {
    symbol: <Nkyinkyim size={44} color="rgba(196,164,78,0.75)"/>,
    adinkra: "Nkyinkyim",
    meaning: "Adaptability & dynamism",
    title: "Economic Access",
    body: "Facilitating greater access to economic opportunities and resources — adapting, growing, and carving new paths both within the Diaspora and on the African continent.",
  },
];

/* ── Mosaic image strip ── */
function ImageMosaic({ images, heights }) {
  return (
    <div style={{ display: "flex", gap: "6px", width: "100%" }}>
      {images.map((src, i) => (
        <div key={i} style={{
          flex: 1, overflow: "hidden",
          height: heights?.[i] || "240px",
          position: "relative",
        }}>
          <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(42,26,14,0.15)" }} />
        </div>
      ))}
    </div>
  );
}

export default function Afrocean() {
  const [heroRef,     heroVis]    = useReveal(0.05);
  const [rootsRef,    rootsVis]   = useReveal(0.08);
  const [mosaicRef,   mosaicVis]  = useReveal(0.08);
  const [pillarsRef,  pillarsVis] = useReveal(0.1);
  const [diaspRef,    diaspVis]   = useReveal(0.1);
  const [ctaRef,      ctaVis]     = useReveal(0.1);

  return (
    <div style={{ minHeight: "100vh", background: "var(--dark)", color: "var(--cream)", overflowX: "hidden" }}>
      <Navbar />

      {/* ══════════════════════════════════════════════════════
          HERO — African cultural festival energy
          Warm, rich, alive — not cold maritime blue
      ══════════════════════════════════════════════════════ */}
      <section ref={heroRef} style={{
        minHeight: "100vh", position: "relative", overflow: "hidden",
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
      }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img src={IMGS.hero} alt="African cultural gathering"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }} />
          {/* Warm deep overlay — earthy, not cold */}
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${EARTH} 0%, rgba(42,26,14,0.82) 40%, rgba(42,26,14,0.3) 100%)` }} />
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(105deg, rgba(42,26,14,0.92) 35%, transparent 65%)` }} />
          {/* Warm terracotta glow */}
          <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 75% 40%, rgba(${181},${84},${30},0.18) 0%, transparent 55%)` }} />
        </div>

        <WaxBg opacity={0.05} color="#C4A44E" />
        <div className="ct-grain" style={{ zIndex: 1 }} />

        {/* Large Sankofa watermark top-right */}
        <div style={{
          position: "absolute", top: "100px", right: "3vw", zIndex: 2,
          opacity: heroVis ? 0.1 : 0, transition: "opacity 1.5s 0.5s",
          transform: "scale(3.5) rotate(-15deg)",
        }}>
          <Sankofa size={80} color="#C4A44E" />
        </div>

        <div style={{ position: "relative", zIndex: 3, padding: "80px 5vw 100px" }}>

          {/* Eyebrow — Sankofa proverb */}
          <div style={{
            display: "flex", alignItems: "center", gap: "14px", marginBottom: "32px",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(12px)",
            transition: "opacity 0.7s 0.1s, transform 0.7s 0.1s",
          }}>
            <Sankofa size={18} color="rgba(196,164,78,0.8)" />
            <span style={{ fontSize: "10px", letterSpacing: "4px", color: "rgba(196,164,78,0.8)", fontWeight: 500 }}>
              CABIN TEA · CULTURAL GATHERING
            </span>
          </div>

          {/* Main title */}
          <h1 style={{
            fontFamily: "var(--font-display)", fontWeight: 700,
            fontSize: "clamp(72px, 13vw, 180px)",
            lineHeight: 0.86, letterSpacing: "-4px",
            color: "white", margin: 0,
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(30px)",
            transition: "opacity 0.8s 0.2s, transform 0.8s 0.2s",
          }}>
            AFRO
          </h1>
          <h1 style={{
            fontFamily: "var(--font-display)", fontWeight: 700, fontStyle: "italic",
            fontSize: "clamp(72px, 13vw, 180px)",
            lineHeight: 0.86, letterSpacing: "-4px",
            color: TERRA, marginBottom: "48px",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(30px)",
            transition: "opacity 0.8s 0.3s, transform 0.8s 0.3s",
          }}>
            CEAN
          </h1>

          {/* Bottom row */}
          <div style={{
            display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
            gap: "60px", alignItems: "end",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(16px)",
            transition: "opacity 0.7s 0.45s, transform 0.7s 0.45s",
          }}>
            <div>
              <p style={{
                fontFamily: "var(--font-display)", fontStyle: "italic",
                fontSize: "clamp(17px, 2vw, 22px)", lineHeight: 1.6,
                color: "rgba(214,207,194,0.75)", marginBottom: "32px",
                borderLeft: `3px solid ${TERRA}`, paddingLeft: "20px",
              }}>
                A dynamic and inclusive gathering that unites individuals of the African Diaspora, fostering a deep connection with their maritime heritage and indigenous roots.
              </p>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <Link to="/partner" style={{
                  display: "inline-block", padding: "13px 32px",
                  background: TERRA, color: "white",
                  textDecoration: "none", fontSize: "10px",
                  letterSpacing: "3px", fontWeight: 700, borderRadius: "2px",
                  transition: "opacity 0.2s",
                }}
                  onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                  onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                >GET INVOLVED</Link>
                <Link to="/episodes" style={{
                  display: "inline-block", padding: "13px 32px",
                  border: `1px solid rgba(181,84,30,0.5)`, color: "rgba(214,207,194,0.75)",
                  textDecoration: "none", fontSize: "10px",
                  letterSpacing: "3px", fontWeight: 600, borderRadius: "2px",
                  transition: "border-color 0.2s, color 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = TERRA; e.currentTarget.style.color = "white"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(181,84,30,0.5)"; e.currentTarget.style.color = "rgba(214,207,194,0.75)"; }}
                >LISTEN NOW</Link>
              </div>
            </div>

            {/* Polaroid mosaic — African people */}
            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", alignItems: "flex-end" }}>
              {[
                { src: IMGS.culture1, angle: -3, h: "130px" },
                { src: IMGS.fishermen, angle: 0, h: "160px" },
                { src: IMGS.attire,   angle: 3, h: "130px" },
              ].map((img, i) => (
                <div key={i} style={{
                  width: "88px", flexShrink: 0,
                  background: "rgba(255,255,255,0.07)",
                  padding: "5px 5px 18px",
                  transform: `rotate(${img.angle}deg)`,
                  border: `1px solid rgba(181,84,30,0.3)`,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
                }}>
                  <img src={img.src} alt=""
                    style={{ width: "100%", height: img.h, objectFit: "cover", display: "block" }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <TextileBand />

      {/* ══════════════════════════════════════════════════════
          ROOTS SECTION — indigenous African maritime culture
          Full bleed warm earth, split image + text
      ══════════════════════════════════════════════════════ */}
      <section ref={rootsRef} style={{
        background: EARTH, overflow: "hidden", position: "relative",
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "640px" }}>

          {/* Left — indigenous fishermen / coastal community */}
          <div style={{
            position: "relative", overflow: "hidden",
            opacity: rootsVis ? 1 : 0, transform: rootsVis ? "none" : "translateX(-20px)",
            transition: "opacity 1s, transform 1s",
          }}>
            <img src={IMGS.fishermen} alt="African coastal community"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", minHeight: "640px" }} />
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to right, rgba(42,26,14,0.05), rgba(42,26,14,0.6) 100%)` }} />

            {/* Floating cultural caption */}
            <div style={{
              position: "absolute", bottom: "40px", left: "28px",
              background: TERRA, color: "white",
              padding: "18px 24px", maxWidth: "230px",
            }}>
              <span style={{ fontSize: "9px", letterSpacing: "2.5px", display: "block", marginBottom: "6px", color: "rgba(255,255,255,0.7)" }}>INDIGENOUS HERITAGE</span>
              <p style={{ fontSize: "13px", lineHeight: 1.6, margin: 0, fontFamily: "var(--font-display)", fontStyle: "italic" }}>
                "The sea is our ancestor. We were navigators long before the world knew it."
              </p>
            </div>
          </div>

          {/* Right — roots text */}
          <div style={{
            padding: "80px 5vw 80px 56px",
            display: "flex", flexDirection: "column", justifyContent: "center",
            position: "relative", overflow: "hidden",
            opacity: rootsVis ? 1 : 0, transform: rootsVis ? "none" : "translateX(20px)",
            transition: "opacity 1s 0.15s, transform 1s 0.15s",
          }}>
            <WaxBg opacity={0.07} color={TERRA} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <span style={{ fontSize: "10px", letterSpacing: "4px", color: TERRA, display: "block", marginBottom: "20px" }}>
                THE ROOTS
              </span>

              {/* Akan proverb */}
              <h2 style={{
                fontFamily: "var(--font-display)", fontWeight: 700,
                fontSize: "clamp(28px, 3.5vw, 48px)", lineHeight: 0.95,
                letterSpacing: "-1.5px", color: "white", marginBottom: "24px",
              }}>
                "Onipa na ohia onipa."
              </h2>
              <p style={{ fontSize: "13px", color: `rgba(196,164,78,0.6)`, marginBottom: "28px", letterSpacing: "1px", fontStyle: "italic" }}>
                "A person needs people." — Akan Proverb
              </p>

              <p style={{ fontSize: "15px", lineHeight: 1.95, color: "rgba(214,207,194,0.6)", fontWeight: 300, maxWidth: "420px", marginBottom: "24px" }}>
                Long before colonial borders, African peoples were master navigators, coastal traders, and ocean stewards. From the Swahili merchants of East Africa to the Fante fishermen of Ghana's Cape Coast — the sea was always home.
              </p>
              <p style={{ fontSize: "15px", lineHeight: 1.95, color: "rgba(214,207,194,0.5)", fontWeight: 300, maxWidth: "420px", marginBottom: "36px" }}>
                Afrocean exists to honour that heritage — connecting the Diaspora back to the indigenous knowledge, the coastal communities, and the ancestral relationship with the ocean that was never truly lost.
              </p>

              {/* Cultural stat row */}
              <div style={{
                display: "flex", gap: "32px", flexWrap: "wrap",
                borderTop: `1px solid rgba(181,84,30,0.25)`, paddingTop: "28px",
              }}>
                {[
                  { val: "54", label: "African Nations" },
                  { val: "3.1M", label: "KM of Coastline" },
                  { val: "1000+", label: "Years of Navigation" },
                ].map(s => (
                  <div key={s.label}>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: "28px", fontWeight: 700, color: "white", display: "block", lineHeight: 1 }}>{s.val}</span>
                    <span style={{ fontSize: "9px", letterSpacing: "2.5px", color: TERRA, display: "block", marginTop: "5px" }}>{s.label.toUpperCase()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <TextileBand />

      {/* ══════════════════════════════════════════════════════
          IMAGE MOSAIC — full width, 5 photos of African
          culture, indigenous coastal life, Diaspora energy
      ══════════════════════════════════════════════════════ */}
      <section ref={mosaicRef} style={{ background: EARTH, padding: "0 0 0 0", overflow: "hidden" }}>

        {/* Section label */}
        <div style={{
          padding: "56px 5vw 32px",
          opacity: mosaicVis ? 1 : 0, transform: mosaicVis ? "none" : "translateY(16px)",
          transition: "opacity 0.6s, transform 0.6s",
        }}>
          <span style={{ fontSize: "10px", letterSpacing: "4px", color: TERRA }}>
            THE CULTURE
          </span>
        </div>

        {/* Row 1 — 3 images */}
        <div style={{
          display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr",
          gap: "4px",
          opacity: mosaicVis ? 1 : 0, transform: mosaicVis ? "none" : "translateY(24px)",
          transition: "opacity 0.8s 0.1s, transform 0.8s 0.1s",
        }}>
          {[
            { src: IMGS.culture1, h: "320px", label: "Indigenous Dress", sub: "West Africa" },
            { src: IMGS.market,   h: "320px", label: "Community Gathering", sub: "The Continent" },
            { src: IMGS.harbour,  h: "320px", label: "Coastal Heritage", sub: "Maritime Roots" },
          ].map((img, i) => (
            <div key={i} style={{ position: "relative", overflow: "hidden" }}>
              <img src={img.src} alt={img.label}
                style={{ width: "100%", height: img.h, objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${EARTH} 0%, transparent 50%)` }} />
              <div style={{ position: "absolute", bottom: "16px", left: "16px" }}>
                <span style={{ fontSize: "12px", fontWeight: 600, color: "white", display: "block" }}>{img.label}</span>
                <span style={{ fontSize: "9px", letterSpacing: "2px", color: TERRA }}>{img.sub.toUpperCase()}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Row 2 — 2 images wider */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1.4fr",
          gap: "4px", marginTop: "4px",
          opacity: mosaicVis ? 1 : 0, transform: mosaicVis ? "none" : "translateY(24px)",
          transition: "opacity 0.8s 0.25s, transform 0.8s 0.25s",
        }}>
          {[
            { src: IMGS.youth,    h: "260px", label: "Next Generation", sub: "Diaspora Youth" },
            { src: IMGS.diaspora1,h: "260px", label: "The Gathering", sub: "Afrocean Community" },
          ].map((img, i) => (
            <div key={i} style={{ position: "relative", overflow: "hidden" }}>
              <img src={img.src} alt={img.label}
                style={{ width: "100%", height: img.h, objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${EARTH} 0%, transparent 50%)` }} />
              <div style={{ position: "absolute", bottom: "16px", left: "16px" }}>
                <span style={{ fontSize: "12px", fontWeight: 600, color: "white", display: "block" }}>{img.label}</span>
                <span style={{ fontSize: "9px", letterSpacing: "2px", color: TERRA }}>{img.sub.toUpperCase()}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <TextileBand />

      {/* ══════════════════════════════════════════════════════
          FOUR PILLARS — Adinkra symbols, terracotta earth
      ══════════════════════════════════════════════════════ */}
      <section ref={pillarsRef} style={{
        padding: "100px 5vw", background: WARM,
        position: "relative", overflow: "hidden",
      }}>
        <WaxBg opacity={0.06} color={TERRA} />

        <div style={{ maxWidth: "1300px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          {/* Header */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px",
            alignItems: "end", marginBottom: "72px",
            opacity: pillarsVis ? 1 : 0, transform: pillarsVis ? "none" : "translateY(16px)",
            transition: "opacity 0.6s, transform 0.6s",
          }}>
            <div>
              <span style={{ fontSize: "10px", letterSpacing: "4px", color: TERRA, display: "block", marginBottom: "14px" }}>FOUR PILLARS</span>
              <h2 style={{
                fontFamily: "var(--font-display)", fontWeight: 700, fontStyle: "italic",
                fontSize: "clamp(32px, 4vw, 56px)", color: "white", lineHeight: 0.95, margin: 0,
              }}>What Afrocean<br />stands for.</h2>
            </div>
            <p style={{ fontSize: "15px", lineHeight: 1.85, color: "rgba(214,207,194,0.45)", fontWeight: 300, maxWidth: "380px" }}>
              Each pillar is grounded in Adinkra philosophy — the visual language of the Akan people of Ghana, used for centuries to encode wisdom, values, and cultural identity.
            </p>
          </div>

          {/* Pillars — 2x2 grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px", background: `rgba(181,84,30,0.1)` }}>
            {pillars.map((p, i) => (
              <div key={p.title} style={{
                background: WARM, padding: "52px 48px",
                position: "relative", overflow: "hidden",
                opacity: pillarsVis ? 1 : 0, transform: pillarsVis ? "none" : "translateY(24px)",
                transition: `opacity 0.6s ${0.1 + i * 0.1}s, transform 0.6s ${0.1 + i * 0.1}s`,
              }}>
                <WaxBg opacity={0.03} color="#C4A44E" />
                <div style={{ position: "relative", zIndex: 1 }}>
                  {/* Adinkra symbol */}
                  <div style={{ marginBottom: "20px" }}>{p.symbol}</div>

                  {/* Adinkra name + meaning */}
                  <div style={{ marginBottom: "20px" }}>
                    <span style={{ fontSize: "10px", letterSpacing: "1.5px", color: TERRA, display: "block", marginBottom: "2px" }}>
                      {p.adinkra}
                    </span>
                    <span style={{ fontSize: "10px", color: "rgba(196,164,78,0.45)", fontStyle: "italic" }}>
                      "{p.meaning}"
                    </span>
                  </div>

                  {/* Gold divider */}
                  <div style={{ width: "28px", height: "2px", background: TERRA, marginBottom: "16px" }} />

                  <h3 style={{
                    fontFamily: "var(--font-display)", fontSize: "clamp(22px, 2.5vw, 32px)",
                    fontWeight: 700, color: "white", lineHeight: 1.05,
                    margin: "0 0 16px 0", letterSpacing: "-0.5px",
                  }}>{p.title}</h3>
                  <p style={{ fontSize: "14px", lineHeight: 1.85, color: "rgba(214,207,194,0.5)", fontWeight: 300, margin: 0 }}>{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TextileBand />

      {/* ══════════════════════════════════════════════════════
          DIASPORA SECTION — the bridge between worlds
          Two images + powerful quote
      ══════════════════════════════════════════════════════ */}
      <section ref={diaspRef} style={{
        background: EARTH, padding: "100px 5vw",
        position: "relative", overflow: "hidden",
      }}>
        <WaxBg opacity={0.06} color="#C4A44E" />

        <div style={{ maxWidth: "1300px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }}>

            {/* Left — text */}
            <div style={{
              opacity: diaspVis ? 1 : 0, transform: diaspVis ? "none" : "translateX(-20px)",
              transition: "opacity 0.9s, transform 0.9s",
            }}>
              <span style={{ fontSize: "10px", letterSpacing: "4px", color: TERRA, display: "block", marginBottom: "20px" }}>
                THE DIASPORA
              </span>

              {/* Large Sankofa visual accent */}
              <div style={{ marginBottom: "24px", opacity: 0.15 }}>
                <Sankofa size={72} color="white" />
              </div>

              <h2 style={{
                fontFamily: "var(--font-display)", fontWeight: 700,
                fontSize: "clamp(28px, 3.5vw, 48px)", lineHeight: 0.95,
                letterSpacing: "-1.5px", color: "white", marginBottom: "28px",
              }}>
                Where home is a<br />
                <span style={{ color: "var(--gold)", fontStyle: "italic" }}>horizon away.</span>
              </h2>

              <p style={{ fontSize: "15px", lineHeight: 1.95, color: "rgba(214,207,194,0.6)", fontWeight: 300, maxWidth: "420px", marginBottom: "24px" }}>
                Afrocean is built for the millions of Africans and people of African descent living across the world — from London to Lagos, Brooklyn to Bridgetown — who carry the ocean in their blood but may have never stood at its African shore.
              </p>
              <p style={{ fontSize: "15px", lineHeight: 1.95, color: "rgba(214,207,194,0.5)", fontWeight: 300, maxWidth: "420px", marginBottom: "36px" }}>
                This gathering is the bridge. A space to reconnect with the maritime heritage, the indigenous knowledge, and the living communities that the Diaspora was separated from — and to invest in their future together.
              </p>

              <Link to="/partner" style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                padding: "13px 32px", background: TERRA, color: "white",
                textDecoration: "none", fontSize: "10px",
                letterSpacing: "2.5px", fontWeight: 700, borderRadius: "2px",
                transition: "opacity 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}
              >JOIN AFROCEAN →</Link>
            </div>

            {/* Right — two stacked images */}
            <div style={{
              display: "grid", gridTemplateRows: "1fr 1fr", gap: "6px",
              height: "580px",
              opacity: diaspVis ? 1 : 0, transform: diaspVis ? "none" : "translateX(20px)",
              transition: "opacity 0.9s 0.2s, transform 0.9s 0.2s",
            }}>
              {/* Top — Diaspora community */}
              <div style={{ position: "relative", overflow: "hidden" }}>
                <img src={IMGS.diaspora1} alt="African Diaspora"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                <div style={{ position: "absolute", inset: 0, background: `rgba(42,26,14,0.2)` }} />
                <div style={{
                  position: "absolute", top: "16px", left: "16px",
                  background: "rgba(42,26,14,0.85)", backdropFilter: "blur(8px)",
                  padding: "8px 14px", border: `1px solid rgba(181,84,30,0.3)`,
                }}>
                  <span style={{ fontSize: "9px", letterSpacing: "2px", color: TERRA }}>THE DIASPORA</span>
                </div>
              </div>

              {/* Bottom — indigenous African coastal */}
              <div style={{ position: "relative", overflow: "hidden" }}>
                <img src={IMGS.attire} alt="Indigenous African culture"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                <div style={{ position: "absolute", inset: 0, background: `rgba(42,26,14,0.25)` }} />
                <div style={{
                  position: "absolute", top: "16px", left: "16px",
                  background: TERRA, padding: "8px 14px",
                }}>
                  <span style={{ fontSize: "9px", letterSpacing: "2px", color: "white" }}>THE HOMELAND</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TextileBand />

      {/* ══════════════════════════════════════════════════════
          CTA — warm, earthy, confident
      ══════════════════════════════════════════════════════ */}
      <section ref={ctaRef} style={{
        position: "relative", overflow: "hidden",
        minHeight: "500px", display: "flex", alignItems: "center",
      }}>
        <img src={IMGS.cta} alt="Africa"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(110deg, ${EARTH} 40%, rgba(181,84,30,0.45) 100%)` }} />
        <WaxBg opacity={0.04} color="#C4A44E" />
        <div className="ct-grain" style={{ zIndex: 1 }} />

        {/* Giant Sankofa watermark */}
        <div style={{ position: "absolute", right: "3vw", top: "50%", transform: "translateY(-50%)", opacity: 0.07, zIndex: 1 }}>
          <Sankofa size={360} color="white" />
        </div>

        <div style={{
          position: "relative", zIndex: 2, padding: "80px 5vw", maxWidth: "760px",
          opacity: ctaVis ? 1 : 0, transform: ctaVis ? "none" : "translateY(20px)",
          transition: "opacity 0.8s, transform 0.8s",
        }}>
          {/* Textile mini stripe */}
          <div style={{ display: "flex", height: "4px", width: "100px", marginBottom: "32px", overflow: "hidden" }}>
            {[TERRA, "var(--teal)", "var(--gold)", TERRA, "var(--teal)"].map((c, i) => (
              <div key={i} style={{ flex: 1, background: c }} />
            ))}
          </div>

          {/* Sankofa proverb */}
          <p style={{
            fontFamily: "var(--font-display)", fontStyle: "italic",
            fontSize: "clamp(14px, 1.5vw, 17px)", color: `rgba(181,84,30,0.8)`,
            letterSpacing: "0.5px", marginBottom: "20px",
          }}>
            "Se wo were fi na wosankofa a yenkyi." — It is not wrong to go back for what you forgot.
          </p>

          <h2 style={{
            fontFamily: "var(--font-display)", fontWeight: 700,
            fontSize: "clamp(36px, 5.5vw, 80px)", lineHeight: 0.92,
            letterSpacing: "-2px", color: "white", marginBottom: "28px",
          }}>
            Be part of the<br />
            <span style={{ color: TERRA, fontStyle: "italic" }}>next Afrocean.</span>
          </h2>

          <p style={{ fontSize: "15px", lineHeight: 1.85, color: "rgba(214,207,194,0.55)", fontWeight: 300, maxWidth: "420px", marginBottom: "44px" }}>
            Connect with the African maritime community, the global Diaspora, and indigenous coastal cultures at our flagship cultural gathering.
          </p>

          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
            <Link to="/partner" style={{
              display: "inline-block", padding: "14px 36px",
              background: TERRA, color: "white",
              textDecoration: "none", fontSize: "10px", letterSpacing: "3px",
              fontWeight: 700, borderRadius: "2px", transition: "opacity 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >GET INVOLVED</Link>
            <Link to="/about" style={{
              display: "inline-block", padding: "14px 36px",
              border: `1px solid rgba(181,84,30,0.4)`, color: "rgba(214,207,194,0.7)",
              textDecoration: "none", fontSize: "10px", letterSpacing: "3px",
              fontWeight: 600, borderRadius: "2px", transition: "border-color 0.2s, color 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = TERRA; e.currentTarget.style.color = "white"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(181,84,30,0.4)"; e.currentTarget.style.color = "rgba(214,207,194,0.7)"; }}
            >LEARN MORE</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
