import { useState, useEffect, useRef } from "react";
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

/* ═══════════════════════════════════════════════════
   ADINKRA SYMBOLS
═══════════════════════════════════════════════════ */

/* Sankofa — "Go back and get it" — Diaspora & roots */
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

/* Adinkrahene — authority, leadership, greatness */
function Adinkrahene({ size = 56, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="40" stroke={color} strokeWidth="2.5" fill="none"/>
      <circle cx="50" cy="50" r="26" stroke={color} strokeWidth="2.5" fill="none"/>
      <circle cx="50" cy="50" r="12" stroke={color} strokeWidth="2.5" fill="none"/>
      <circle cx="50" cy="50" r="4"  fill={color}/>
    </svg>
  );
}

/* Funtunfunefu — unity in diversity */
function Funtunfunefu({ size = 56, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <ellipse cx="50" cy="50" rx="18" ry="12" stroke={color} strokeWidth="2.5" fill="none"/>
      <path d="M32 50 Q20 40 14 44 Q10 50 14 56 Q20 60 32 50Z" stroke={color} strokeWidth="2.5" fill="none"/>
      <path d="M68 50 Q80 40 86 44 Q90 50 86 56 Q80 60 68 50Z" stroke={color} strokeWidth="2.5" fill="none"/>
      <path d="M50 38 Q50 20 42 16 Q50 24 58 16 Q50 20 50 38" stroke={color} strokeWidth="2" fill="none"/>
      <path d="M50 62 Q50 80 42 84 Q50 76 58 84 Q50 80 50 62" stroke={color} strokeWidth="2" fill="none"/>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════
   DESIGN SYSTEM COMPONENTS
═══════════════════════════════════════════════════ */

function WaxBg({ opacity = 0.05, color = "#C4A44E" }) {
  const id = `wax-${Math.random().toString(36).substr(2, 5)}`;
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

function TextileBand() {
  const colors = [
    "#C4A44E","#2C8C7C","#B5541E","#C4A44E","#152A2F",
    "#B5541E","#2C8C7C","#C4A44E","#152A2F","#C4A44E",
    "#B5541E","#2C8C7C","#C4A44E","#152A2F","#2C8C7C",
    "#C4A44E","#B5541E",
  ];
  return (
    <div style={{ display: "flex", height: "8px", width: "100%", overflow: "hidden" }}>
      {colors.map((c, i) => <div key={i} style={{ background: c, flex: 1 }} />)}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   PALETTE
═══════════════════════════════════════════════════ */
const EARTH = "#2A1A0E";
const WARM  = "#1E2D1A";
const TERRA = "#B5541E";
const GOLD  = "#C4A44E";
const TEAL  = "#2C8C7C";
const DEEP  = "#152A2F";

/* ═══════════════════════════════════════════════════
   LOCAL IMAGES — drop into /public/images/home/
═══════════════════════════════════════════════════ */
const IMGS = {
  hero:      "/images/home/hero.jpg",          /* Full screen — African cultural energy     */
  people1:   "/images/home/people1.jpg",       /* Polaroid 1 — Diaspora community           */
  people2:   "/images/home/people2.jpg",       /* Polaroid 2 — African gathering            */
  people3:   "/images/home/people3.jpg",       /* Polaroid 3 — Cultural attire / roots      */
  mission:   "/images/home/mission.jpg",       /* Mission split section — left image        */
  afrocean:  "/images/home/afrocean.jpg",      /* Afrocean event card                       */
  anchorage: "/images/home/anchorage.jpg",     /* Anchorage media hub card                  */
  agency:    "/images/home/agency.jpg",        /* Creative Agency section image             */
  mosaic1:   "/images/home/mosaic1.jpg",       /* Mosaic row — community                    */
  mosaic2:   "/images/home/mosaic2.jpg",       /* Mosaic row — indigenous culture           */
  mosaic3:   "/images/home/mosaic3.jpg",       /* Mosaic row — maritime / coastal           */
  cta:       "/images/home/cta.jpg",           /* CTA background                            */
};

/* ═══════════════════════════════════════════════════
   PLATFORM ICONS
═══════════════════════════════════════════════════ */
function SpotifyIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>;
}
function AppleIcon() {
  return <svg width="18" height="22" viewBox="0 0 20 24" fill="currentColor"><path d="M16.5 12.5c0-2.8 2.3-4.1 2.4-4.2-1.3-1.9-3.3-2.2-4-2.2-1.7-.2-3.4 1-4.2 1s-2.2-1-3.7-1C5.1 6.1 3.4 7.2 2.4 8.8.5 12.2 1.9 17.2 3.8 20c.9 1.3 2 2.8 3.5 2.8 1.4-.1 1.9-.9 3.6-.9s2.2.9 3.7.9 2.5-1.4 3.4-2.7c1.1-1.5 1.5-3 1.5-3.1-.1 0-2.9-1.1-3-4.5zM13.7 4.3c.8-1 1.3-2.3 1.1-3.6-1.1 0-2.5.7-3.3 1.7-.7.8-1.3 2.1-1.2 3.4 1.3.1 2.5-.6 3.4-1.5z"/></svg>;
}
function YoutubeIcon() {
  return <svg width="24" height="17" viewBox="0 0 26 18" fill="currentColor"><path d="M25.456 2.818A3.26 3.26 0 0023.162.51C21.13 0 13 0 13 0S4.87 0 2.838.51A3.26 3.26 0 00.544 2.818C0 4.862 0 9 0 9s0 4.138.544 6.182a3.26 3.26 0 002.294 2.308C4.87 18 13 18 13 18s8.13 0 10.162-.51a3.26 3.26 0 002.294-2.308C26 13.138 26 9 26 9s0-4.138-.544-6.182zM10.4 12.857V5.143L17.143 9 10.4 12.857z"/></svg>;
}

/* ═══════════════════════════════════════════════════
   MARQUEE TICKER
═══════════════════════════════════════════════════ */
function Marquee() {
  const items = [
    "AFRICAN DIASPORA", "MARITIME CULTURE", "BLUE ECONOMY",
    "SANKOFA", "ACCRA · GHANA", "CULTURAL HERITAGE",
    "OCEAN STEWARDSHIP", "NEXT GENERATION",
  ];
  const doubled = [...items, ...items];
  return (
    <div style={{
      overflow: "hidden",
      borderTop: `1px solid rgba(181,84,30,0.3)`,
      borderBottom: `1px solid rgba(181,84,30,0.3)`,
      background: `rgba(181,84,30,0.05)`, padding: "14px 0",
    }}>
      <div style={{ display: "flex", animation: "marquee 32s linear infinite", width: "max-content" }}>
        {doubled.map((item, i) => (
          <span key={i} style={{
            fontSize: "10px", letterSpacing: "3.5px", fontWeight: 500,
            color: `rgba(181,84,30,0.6)`, whiteSpace: "nowrap",
            padding: "0 40px", borderRight: `1px solid rgba(181,84,30,0.2)`,
          }}>{item}</span>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   EVENT CARD — cultural design treatment
═══════════════════════════════════════════════════ */
function EventCard({ name, tag, tagBg, tagColor, description, image, to, index, visible, accentColor }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link to={to}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        textDecoration: "none", display: "flex", flexDirection: "column",
        border: `1px solid ${hovered ? `${accentColor}55` : `${accentColor}18`}`,
        overflow: "hidden",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        opacity: visible ? 1 : 0,
        transition: "border-color 0.3s, transform 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.6s, box-shadow 0.3s",
        transitionDelay: `${0.1 + index * 0.15}s`,
        boxShadow: hovered ? "0 24px 48px rgba(0,0,0,0.4)" : "none",
        position: "relative",
      }}
    >
      {/* Top accent stripe — textile band mini */}
      <div style={{ display: "flex", height: "4px", width: "100%", overflow: "hidden" }}>
        {[accentColor, TEAL, GOLD, accentColor, TEAL].map((c, i) => (
          <div key={i} style={{ flex: 1, background: c }} />
        ))}
      </div>

      {/* Image */}
      <div style={{ position: "relative", height: "260px", overflow: "hidden", flexShrink: 0 }}>
        <img src={image} alt={name} style={{
          width: "100%", height: "100%", objectFit: "cover",
          transform: hovered ? "scale(1.05)" : "scale(1)",
          transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1)",
        }} />
        <div style={{ position: "absolute", inset: 0, background: `rgba(42,26,14,0.25)` }} />
        <span style={{
          position: "absolute", top: "18px", left: "18px",
          fontSize: "9px", letterSpacing: "2.5px", fontWeight: 700,
          color: tagColor, background: tagBg, padding: "5px 13px",
        }}>{tag}</span>
      </div>

      {/* Content */}
      <div style={{
        padding: "36px 36px 40px", background: EARTH,
        flex: 1, display: "flex", flexDirection: "column",
        position: "relative", overflow: "hidden",
      }}>
        <WaxBg opacity={0.04} color={accentColor} />
        <div style={{ position: "relative", zIndex: 1, flex: 1, display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: "10px", letterSpacing: "3px", color: `rgba(138,158,165,0.5)`, marginBottom: "12px", display: "block" }}>
            CABIN TEA · EVENT
          </span>
          <h3 style={{
            fontFamily: "var(--font-display)", fontWeight: 700,
            fontSize: "42px", lineHeight: 0.92, letterSpacing: "-1px",
            color: hovered ? accentColor : "white",
            marginBottom: "18px", transition: "color 0.25s",
          }}>{name}</h3>
          <div style={{
            width: hovered ? "48px" : "24px", height: "2px",
            background: accentColor, marginBottom: "18px",
            transition: "width 0.35s",
          }} />
          <p style={{
            fontSize: "14px", lineHeight: 1.9, color: "rgba(214,207,194,0.5)",
            fontWeight: 300, flex: 1, marginBottom: "28px",
          }}>{description}</p>
          <div style={{
            display: "flex", alignItems: "center",
            gap: hovered ? "14px" : "8px",
            fontSize: "10px", letterSpacing: "2.5px", fontWeight: 600,
            color: accentColor, transition: "gap 0.3s",
          }}>
            EXPLORE
            <span style={{
              display: "inline-block", fontSize: "16px",
              transform: hovered ? "translateX(4px)" : "translateX(0)",
              transition: "transform 0.3s",
            }}>→</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ═══════════════════════════════════════════════════
   CULTURE CAROUSEL
═══════════════════════════════════════════════════ */
const SLIDES = [
  { src: IMGS.mosaic1, label: "Community",              sub: "The People"       },
  { src: IMGS.mosaic2, label: "Industry, Tech & Innovation", sub: "African Future"   },
  { src: IMGS.mosaic3, label: "Maritime Heritage",      sub: "The Ocean"        },
];

function CultureCarousel({ mosaicRef, mosaicVis }) {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState(null);
  const [dir, setDir] = useState(1); /* 1 = forward, -1 = backward */
  const timerRef = useRef(null);

  const goTo = (idx, direction) => {
    setPrev(active);
    setDir(direction);
    setActive(idx);
  };

  const next = () => goTo((active + 1) % SLIDES.length, 1);
  const back = () => goTo((active - 1 + SLIDES.length) % SLIDES.length, -1);

  /* Auto-advance every 4s */
  useEffect(() => {
    timerRef.current = setInterval(next, 4000);
    return () => clearInterval(timerRef.current);
  }, [active]);

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 4000);
  };

  return (
    <section ref={mosaicRef} style={{ background: EARTH, overflow: "hidden", position: "relative" }}>
      {/* Header row */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "48px 5vw 28px",
        opacity: mosaicVis ? 1 : 0, transform: mosaicVis ? "none" : "translateY(16px)",
        transition: "opacity 0.6s, transform 0.6s",
      }}>
        <span style={{ fontSize: "10px", letterSpacing: "4px", color: TERRA }}>THE CULTURE</span>

        {/* Dot indicators */}
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => { goTo(i, i > active ? 1 : -1); resetTimer(); }}
              style={{
                width: i === active ? "28px" : "8px",
                height: "8px",
                borderRadius: "4px",
                background: i === active ? TERRA : "rgba(181,84,30,0.25)",
                border: "none", cursor: "pointer", padding: 0,
                transition: "width 0.35s cubic-bezier(0.16,1,0.3,1), background 0.3s",
              }} />
          ))}
        </div>

        {/* Arrow controls */}
        <div style={{ display: "flex", gap: "8px" }}>
          {[{ fn: back, d: "M15 12H3m0 0l5-5m-5 5l5 5" }, { fn: next, d: "M9 12h12m0 0l-5-5m5 5l-5 5" }].map((btn, i) => (
            <button key={i} onClick={() => { btn.fn(); resetTimer(); }}
              style={{
                width: "40px", height: "40px",
                border: `1px solid rgba(181,84,30,0.3)`,
                background: "transparent", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.2s, border-color 0.2s",
                borderRadius: "2px",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = TERRA; e.currentTarget.style.borderColor = TERRA; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(181,84,30,0.3)"; }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d={btn.d} />
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* Slide viewport */}
      <div style={{
        position: "relative", height: "420px", overflow: "hidden",
        opacity: mosaicVis ? 1 : 0,
        transition: "opacity 0.8s 0.1s",
      }}>
        {SLIDES.map((slide, i) => {
          const isCurrent = i === active;
          const isPrev    = i === prev;
          return (
            <div key={i} style={{
              position: "absolute", inset: 0,
              transform: isCurrent
                ? "translateX(0)"
                : isPrev
                  ? `translateX(${-dir * 100}%)`
                  : `translateX(${dir * 100}%)`,
              opacity: isCurrent ? 1 : isPrev ? 0 : 0,
              transition: isCurrent || isPrev
                ? "transform 0.65s cubic-bezier(0.76,0,0.24,1), opacity 0.65s"
                : "none",
              zIndex: isCurrent ? 2 : 1,
            }}>
              <img src={slide.src} alt={slide.label}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />

              {/* Bottom gradient */}
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${EARTH} 0%, rgba(42,26,14,0.4) 40%, transparent 70%)` }} />

              {/* Label */}
              <div style={{
                position: "absolute", bottom: "0", left: 0, right: 0,
                padding: "32px 5vw",
                display: "flex", alignItems: "flex-end", justifyContent: "space-between",
              }}>
                <div>
                  <span style={{
                    display: "block",
                    fontFamily: "var(--font-display)", fontWeight: 700,
                    fontSize: "clamp(28px, 4vw, 52px)",
                    color: "white", lineHeight: 1, letterSpacing: "-1px",
                    transform: isCurrent ? "translateY(0)" : "translateY(16px)",
                    opacity: isCurrent ? 1 : 0,
                    transition: "transform 0.5s 0.25s, opacity 0.5s 0.25s",
                  }}>{slide.label}</span>
                  <span style={{
                    display: "block", fontSize: "9px", letterSpacing: "3px",
                    color: TERRA, marginTop: "6px",
                    transform: isCurrent ? "translateY(0)" : "translateY(10px)",
                    opacity: isCurrent ? 1 : 0,
                    transition: "transform 0.5s 0.35s, opacity 0.5s 0.35s",
                  }}>{slide.sub.toUpperCase()}</span>
                </div>

                {/* Slide counter */}
                <span style={{
                  fontFamily: "var(--font-display)", fontStyle: "italic",
                  fontSize: "clamp(32px, 5vw, 64px)",
                  color: "rgba(255,255,255,0.08)", fontWeight: 700,
                  lineHeight: 1, userSelect: "none",
                }}>0{i + 1}</span>
              </div>

              {/* Left textile accent strip */}
              <div style={{
                position: "absolute", left: 0, top: 0, bottom: 0, width: "4px",
                display: "flex", flexDirection: "column",
              }}>
                {[TERRA, TEAL, GOLD, TERRA, TEAL, GOLD, TERRA].map((c, ci) => (
                  <div key={ci} style={{ flex: 1, background: c }} />
                ))}
              </div>
            </div>
          );
        })}

        {/* Progress bar */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "3px", background: "rgba(181,84,30,0.15)", zIndex: 10 }}>
          <div key={active} style={{
            height: "100%", background: TERRA,
            animation: "progress 4s linear forwards",
          }} />
        </div>
      </div>

      <style>{`
        @keyframes progress {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   HOME PAGE
═══════════════════════════════════════════════════ */
export default function Home() {
  const [heroRef,    heroVis]    = useReveal(0.05);
  const [missionRef, missionVis] = useReveal(0.08);
  const [mosaicRef,  mosaicVis]  = useReveal(0.08);
  const [epRef,      epVis]      = useReveal(0.1);
  const [agencyRef,  agencyVis]  = useReveal(0.1);
  const [partnerRef, partnerVis] = useReveal(0.1);
  const [ctaRef,     ctaVis]     = useReveal(0.1);

  return (
    <div style={{ minHeight: "100vh", background: DEEP, color: "var(--cream)", overflowX: "hidden" }}>
      <Navbar />

      {/* ══════════════════════════════════════════════════════
          HERO — cinematic, African cultural energy
          Warm earth overlays, Sankofa watermark, polaroids
      ══════════════════════════════════════════════════════ */}
      <section ref={heroRef} style={{
        minHeight: "100vh", position: "relative", overflow: "hidden",
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
      }}>
        {/* Background — video if available, image fallback */}
        <div style={{ position: "absolute", inset: 0 }}>
          <video autoPlay muted loop playsInline style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover", zIndex: 0,
          }}>
            <source src="/herovideo.mp4" type="video/mp4" />
          </video>
          {/* Bottom-only overlay — text stays readable, video breathes */}
          <div style={{ position: "absolute", inset: 0, zIndex: 1, background: `linear-gradient(to top, ${EARTH} 0%, rgba(42,26,14,0.7) 35%, rgba(42,26,14,0.1) 65%, transparent 100%)` }} />
          {/* Subtle left vignette for text legibility only */}
          <div style={{ position: "absolute", inset: 0, zIndex: 1, background: `linear-gradient(to right, rgba(42,26,14,0.5) 0%, transparent 50%)` }} />
        </div>

        <WaxBg opacity={0.04} color={GOLD} />
        <div className="ct-grain" style={{ zIndex: 2 }} />

        {/* Giant Sankofa watermark */}
        <div style={{
          position: "absolute", top: "100px", right: "3vw", zIndex: 2,
          opacity: heroVis ? 0.09 : 0, transition: "opacity 1.5s 0.5s",
          transform: "scale(3.5) rotate(-10deg)",
        }}>
          <Sankofa size={80} color={GOLD} />
        </div>

        <div style={{ position: "relative", zIndex: 3, padding: "80px 5vw 100px" }}>

          {/* Eyebrow — Sankofa proverb */}
          <div style={{
            display: "flex", alignItems: "center", gap: "14px", marginBottom: "32px",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(12px)",
            transition: "opacity 0.7s 0.1s, transform 0.7s 0.1s",
          }}>
            <Sankofa size={18} color={`rgba(196,164,78,0.8)`} />
            <span style={{ fontSize: "10px", letterSpacing: "4px", color: `rgba(196,164,78,0.8)`, fontWeight: 500 }}>
              SANKOFA — "GO BACK AND GET IT"
            </span>
          </div>

          {/* Title */}
          <h1 style={{
            fontFamily: "var(--font-display)", fontWeight: 700,
            fontSize: "clamp(72px, 13vw, 180px)",
            lineHeight: 0.86, letterSpacing: "-4px",
            color: "white", margin: 0,
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(30px)",
            transition: "opacity 0.8s 0.2s, transform 0.8s 0.2s",
          }}>CABIN</h1>
          <h1 style={{
            fontFamily: "var(--font-display)", fontWeight: 700, fontStyle: "italic",
            fontSize: "clamp(72px, 13vw, 180px)",
            lineHeight: 0.86, letterSpacing: "-4px",
            color: GOLD, marginBottom: "48px",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(30px)",
            transition: "opacity 0.8s 0.3s, transform 0.8s 0.3s",
          }}>TEA</h1>

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
                fontSize: "clamp(18px, 2vw, 24px)", color: "rgba(214,207,194,0.7)",
                lineHeight: 1.4, marginBottom: "28px",
                borderLeft: `3px solid ${TERRA}`, paddingLeft: "20px",
              }}>
                Sipping with the people who know the sea. Live from Africa, heard everywhere.
              </p>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "28px" }}>
                <Link to="/episodes" style={{
                  display: "inline-block", padding: "13px 32px",
                  background: GOLD, color: DEEP,
                  textDecoration: "none", fontSize: "10px",
                  letterSpacing: "3px", fontWeight: 700,
                  transition: "opacity 0.2s",
                }}
                  onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                  onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                >LISTEN NOW</Link>
                <Link to="/partner" style={{
                  display: "inline-block", padding: "13px 32px",
                  border: `1px solid rgba(196,164,78,0.35)`, color: "rgba(214,207,194,0.75)",
                  textDecoration: "none", fontSize: "10px",
                  letterSpacing: "3px", fontWeight: 600,
                  transition: "border-color 0.2s, color 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.color = "white"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(196,164,78,0.35)"; e.currentTarget.style.color = "rgba(214,207,194,0.75)"; }}
                >PARTNER WITH US</Link>
              </div>

              {/* Platform links */}
              <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <span style={{ fontSize: "9px", letterSpacing: "2.5px", color: "rgba(138,158,165,0.5)" }}>LISTEN ON</span>
                {[<YoutubeIcon/>, <SpotifyIcon/>, <AppleIcon/>].map((icon, i) => (
                  <a key={i} href="#" style={{ color: "rgba(138,158,165,0.45)", display: "inline-flex", transition: "color 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.color = GOLD}
                    onMouseLeave={e => e.currentTarget.style.color = "rgba(138,158,165,0.45)"}
                  >{icon}</a>
                ))}
              </div>
            </div>

            {/* Polaroid mosaic */}
            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", alignItems: "flex-end" }}>
              {[
                { src: IMGS.people1, angle: -3, h: "130px" },
                { src: IMGS.people2, angle: 0,  h: "160px" },
                { src: IMGS.people3, angle: 3,  h: "130px" },
              ].map((img, i) => (
                <div key={i} style={{
                  width: "90px", flexShrink: 0,
                  background: "rgba(255,255,255,0.07)",
                  padding: "5px 5px 18px",
                  transform: `rotate(${img.angle}deg)`,
                  border: `1px solid rgba(196,164,78,0.2)`,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
                }}>
                  <img src={img.src} alt="" style={{ width: "100%", height: img.h, objectFit: "cover", display: "block" }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Textile divider */}
      <TextileBand />

      {/* ══════════════════════════════════════════════════════
          MARQUEE TICKER
      ══════════════════════════════════════════════════════ */}
      <Marquee />

      {/* ══════════════════════════════════════════════════════
          MISSION — warm split, earthy, real people image
      ══════════════════════════════════════════════════════ */}
      <section ref={missionRef} style={{ background: EARTH, overflow: "hidden", position: "relative" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "640px" }}>

          {/* Left — image */}
          <div style={{
            position: "relative", overflow: "hidden",
            opacity: missionVis ? 1 : 0, transform: missionVis ? "none" : "translateX(-20px)",
            transition: "opacity 1s, transform 1s",
          }}>
            <img src={IMGS.mission} alt="Cabin Tea community"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", minHeight: "640px" }} />
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to right, rgba(42,26,14,0.05), rgba(42,26,14,0.65) 100%)` }} />

            {/* Floating stat */}
            <div style={{
              position: "absolute", bottom: "40px", left: "28px",
              background: TERRA, color: "white", padding: "20px 24px", maxWidth: "220px",
            }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "52px", fontWeight: 700, color: "white", display: "block", lineHeight: 1 }}>360°</span>
              <span style={{ fontSize: "11px", lineHeight: 1.6, display: "block", marginTop: "8px", color: "rgba(255,255,255,0.8)" }}>
                Maritime media, culture, community — all in one ecosystem.
              </span>
            </div>
          </div>

          {/* Right — mission text */}
          <div style={{
            padding: "80px 5vw 80px 56px",
            display: "flex", flexDirection: "column", justifyContent: "center",
            position: "relative", overflow: "hidden",
            opacity: missionVis ? 1 : 0, transform: missionVis ? "none" : "translateX(20px)",
            transition: "opacity 1s 0.15s, transform 1s 0.15s",
          }}>
            <WaxBg opacity={0.05} color={GOLD} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <span style={{ fontSize: "10px", letterSpacing: "4px", color: TERRA, display: "block", marginBottom: "20px" }}>WHO WE ARE</span>

              <h2 style={{
                fontFamily: "var(--font-display)", fontWeight: 700,
                fontSize: "clamp(32px, 4vw, 56px)", lineHeight: 0.95,
                letterSpacing: "-1.5px", color: "white", marginBottom: "28px",
              }}>
                Africa's #1<br />
                <span style={{ color: GOLD, fontStyle: "italic" }}>Maritime</span><br />
                Media Brand.
              </h2>

              <p style={{ fontSize: "15px", lineHeight: 1.95, color: "rgba(214,207,194,0.6)", fontWeight: 300, maxWidth: "420px", marginBottom: "32px" }}>
                A 360° maritime media and industry network built for the African community and Diaspora. Through insight-sharing, community engagement and digital media, we amplify African maritime culture and bring the voices of the Diaspora into the heart of the continent's blue economy conversation.
              </p>

              {/* Service link list */}
              <div style={{ display: "flex", flexDirection: "column", borderTop: `1px solid rgba(181,84,30,0.2)`, paddingTop: "24px" }}>
                {[
                  { label: "Afrocean", desc: "Diaspora maritime gatherings", to: "/afrocean" },
                  { label: "Anchorage", desc: "Centralized maritime media hub", to: "/anchorage" },
                  { label: "Creative Agency", desc: "Strategy, campaigns & culture", to: "/creative-agency" },
                ].map((item) => (
                  <Link key={item.to} to={item.to} style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "16px 0", borderBottom: "1px solid rgba(255,255,255,0.05)",
                    textDecoration: "none", transition: "padding-left 0.3s", gap: "16px",
                  }}
                    onMouseEnter={e => e.currentTarget.style.paddingLeft = "8px"}
                    onMouseLeave={e => e.currentTarget.style.paddingLeft = "0"}
                  >
                    <div>
                      <span style={{ display: "block", fontSize: "14px", fontWeight: 500, color: "white" }}>{item.label}</span>
                      <span style={{ display: "block", fontSize: "11px", color: `rgba(181,84,30,0.7)`, marginTop: "2px", fontStyle: "italic" }}>{item.desc}</span>
                    </div>
                    <span style={{ color: `rgba(196,164,78,0.4)`, fontSize: "16px", flexShrink: 0 }}>→</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <TextileBand />

      {/* ══════════════════════════════════════════════════════
          IMAGE CAROUSEL — African culture strip
      ══════════════════════════════════════════════════════ */}
      <CultureCarousel mosaicRef={mosaicRef} mosaicVis={mosaicVis} />

      <TextileBand />

      {/* ══════════════════════════════════════════════════════
          EVENTS SECTION — Afrocean + Anchorage cards
      ══════════════════════════════════════════════════════ */}
      <section ref={epRef} style={{
        background: WARM, padding: "100px 5vw",
        position: "relative", overflow: "hidden",
      }}>
        <WaxBg opacity={0.05} color={TERRA} />

        <div style={{ maxWidth: "1300px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          {/* Header */}
          <div style={{
            display: "flex", alignItems: "flex-end", justifyContent: "space-between",
            flexWrap: "wrap", gap: "20px", marginBottom: "64px",
            opacity: epVis ? 1 : 0, transform: epVis ? "none" : "translateY(16px)",
            transition: "opacity 0.6s, transform 0.6s",
          }}>
            <div>
              <span style={{ fontSize: "10px", letterSpacing: "4px", color: TERRA, display: "block", marginBottom: "14px" }}>
                LATEST EVENTS
              </span>
              <h2 style={{
                fontFamily: "var(--font-display)", fontWeight: 700, fontStyle: "italic",
                fontSize: "clamp(32px, 4vw, 56px)", color: "white", lineHeight: 1, margin: 0,
              }}>Where culture meets the ocean.</h2>
            </div>
            <Link to="/episodes" style={{
              fontSize: "10px", letterSpacing: "2.5px", fontWeight: 600,
              color: `rgba(214,207,194,0.35)`, textDecoration: "none",
              borderBottom: `1px solid rgba(181,84,30,0.3)`, paddingBottom: "3px",
              transition: "color 0.2s", flexShrink: 0,
            }}
              onMouseEnter={e => e.currentTarget.style.color = TERRA}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(214,207,194,0.35)"}
            >ALL EPISODES →</Link>
          </div>

          {/* Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "2px", background: `rgba(181,84,30,0.08)` }}>
            <EventCard
              name="Afrocean"
              tag="GATHERING"
              tagBg={TERRA}
              tagColor="white"
              description="A dynamic and inclusive gathering that unites individuals of the African Diaspora, fostering a deep connection with their maritime heritage through cultural exchange, knowledge-sharing, and networking."
              image={IMGS.afrocean}
              to="/afrocean"
              index={0}
              visible={epVis}
              accentColor={TERRA}
            />
            <EventCard
              name="Anchorage"
              tag="MEDIA HUB"
              tagBg={TEAL}
              tagColor="white"
              description="A centralized media hub combined with in-person and digital experiences. We curate personalized recommendations tailored to your interests, reshaping the way we explore the maritime world."
              image={IMGS.anchorage}
              to="/anchorage"
              index={1}
              visible={epVis}
              accentColor={TEAL}
            />
          </div>
        </div>
      </section>

      <TextileBand />

      {/* ══════════════════════════════════════════════════════
          CREATIVE AGENCY — split layout, warm dark
      ══════════════════════════════════════════════════════ */}
      <section ref={agencyRef} style={{
        background: EARTH, overflow: "hidden", position: "relative",
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "580px" }}>

          {/* Left — agency image */}
          <div style={{
            position: "relative", overflow: "hidden",
            opacity: agencyVis ? 1 : 0, transform: agencyVis ? "none" : "translateX(-20px)",
            transition: "opacity 1s, transform 1s",
          }}>
            <img src={IMGS.agency} alt="Creative Agency"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", minHeight: "580px" }} />
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to right, rgba(42,26,14,0.05), rgba(42,26,14,0.7) 100%)` }} />

            {/* Adinkrahene symbol overlay */}
            <div style={{ position: "absolute", bottom: "32px", right: "32px", opacity: 0.12 }}>
              <Adinkrahene size={120} color="white" />
            </div>

            {/* Floating label */}
            <div style={{
              position: "absolute", top: "36px", left: "28px",
              background: GOLD, color: DEEP, padding: "8px 16px",
            }}>
              <span style={{ fontSize: "9px", letterSpacing: "2.5px", fontWeight: 700 }}>CABIN TEA · AGENCY</span>
            </div>
          </div>

          {/* Right — agency content */}
          <div style={{
            padding: "80px 5vw 80px 56px",
            display: "flex", flexDirection: "column", justifyContent: "center",
            position: "relative", overflow: "hidden",
            opacity: agencyVis ? 1 : 0, transform: agencyVis ? "none" : "translateX(20px)",
            transition: "opacity 1s 0.15s, transform 1s 0.15s",
          }}>
            <WaxBg opacity={0.05} color={GOLD} />
            <div style={{ position: "relative", zIndex: 1 }}>

              <span style={{ fontSize: "10px", letterSpacing: "4px", color: TERRA, display: "block", marginBottom: "20px" }}>OUR SERVICES</span>

              {/* Adinkrahene small */}
              <div style={{ marginBottom: "20px", opacity: 0.15 }}>
                <Adinkrahene size={56} color="white" />
              </div>

              <h2 style={{
                fontFamily: "var(--font-display)", fontWeight: 700,
                fontSize: "clamp(28px, 3.5vw, 48px)", lineHeight: 0.95,
                letterSpacing: "-1.5px", color: "white", marginBottom: "24px",
              }}>
                Connect your brand to African maritime culture.
              </h2>

              <p style={{ fontSize: "15px", lineHeight: 1.95, color: "rgba(214,207,194,0.55)", fontWeight: 300, maxWidth: "420px", marginBottom: "32px" }}>
                Strategy, creativity, and immersive experiences designed to deliver measurable impact for brands and leaders in the blue economy space.
              </p>

              {/* Three pillars */}
              <div style={{ display: "flex", flexDirection: "column", marginBottom: "36px" }}>
                {[
                  { num: "01", title: "Context", body: "Deep audience insight and strategic analysis." },
                  { num: "02", title: "Create", body: "Campaigns that authentically reflect African maritime culture." },
                  { num: "03", title: "Amplify", body: "Measurable outcomes that expand reach and deepen connections." },
                ].map((s) => (
                  <div key={s.num} style={{
                    display: "grid", gridTemplateColumns: "40px 1fr", gap: "20px",
                    padding: "20px 0", borderBottom: `1px solid rgba(181,84,30,0.15)`,
                  }}>
                    <span style={{ fontSize: "11px", letterSpacing: "2px", color: `rgba(181,84,30,0.5)`, paddingTop: "2px" }}>{s.num}</span>
                    <div>
                      <span style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "white", marginBottom: "4px" }}>{s.title}</span>
                      <span style={{ display: "block", fontSize: "13px", color: "rgba(214,207,194,0.4)", lineHeight: 1.65, fontWeight: 300 }}>{s.body}</span>
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/creative-agency" style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                padding: "13px 32px", background: TERRA, color: "white",
                textDecoration: "none", fontSize: "10px",
                letterSpacing: "2.5px", fontWeight: 700,
                transition: "opacity 0.2s", alignSelf: "flex-start",
              }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}
              >EXPLORE SERVICES →</Link>
            </div>
          </div>
        </div>
      </section>

      <TextileBand />

      {/* ══════════════════════════════════════════════════════
          PARTNERS — warm teal section
      ══════════════════════════════════════════════════════ */}
      <section ref={partnerRef} style={{
        background: WARM, padding: "100px 5vw",
        position: "relative", overflow: "hidden",
      }}>
        <WaxBg opacity={0.05} color={TEAL} />

        <div style={{ maxWidth: "1300px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>

            {/* Left */}
            <div style={{
              opacity: partnerVis ? 1 : 0, transform: partnerVis ? "none" : "translateY(20px)",
              transition: "opacity 0.7s, transform 0.7s",
            }}>
              <div style={{ marginBottom: "24px", opacity: 0.15 }}>
                <Funtunfunefu size={64} color="white" />
              </div>
              <span style={{ fontSize: "10px", letterSpacing: "4px", color: TEAL, display: "block", marginBottom: "20px" }}>OUR PARTNERS</span>
              <h2 style={{
                fontFamily: "var(--font-display)", fontWeight: 700, fontStyle: "italic",
                fontSize: "clamp(28px, 3.5vw, 48px)", color: "white",
                lineHeight: 1.05, marginBottom: "20px", letterSpacing: "-1px",
              }}>Brewed with intention.<br />Backed by purpose.</h2>
              <p style={{ fontSize: "15px", lineHeight: 1.85, color: "rgba(214,207,194,0.5)", fontWeight: 300, maxWidth: "380px" }}>
                We partner exclusively with brands who share our values — sustainability, storytelling, and the sea.
              </p>

              {/* Funtunfunefu proverb */}
              <p style={{ fontSize: "12px", color: `rgba(44,140,124,0.6)`, fontStyle: "italic", marginTop: "20px", letterSpacing: "0.5px" }}>
                "Funtunfunefu Denkyemfunefu" — unity in diversity.
              </p>
            </div>

            {/* Right */}
            <div style={{
              opacity: partnerVis ? 1 : 0, transform: partnerVis ? "none" : "translateY(20px)",
              transition: "opacity 0.7s 0.2s, transform 0.7s 0.2s",
              display: "flex", flexDirection: "column", gap: "2px",
              background: `rgba(44,140,124,0.06)`,
            }}>
              {[
                { title: "Cultural Authority", body: "The leading voice in Africa's maritime industry culture.", accent: TEAL },
                { title: "Network Access", body: "Direct connections to experts, industries, and business leaders.", accent: GOLD },
                { title: "Strategic Impact", body: "Campaigns and experiences with measurable ROI.", accent: TERRA },
              ].map((p) => (
                <div key={p.title} style={{
                  display: "flex", gap: "20px", alignItems: "flex-start",
                  padding: "24px 28px",
                  background: WARM,
                  borderLeft: `3px solid ${p.accent}`,
                }}>
                  <div>
                    <span style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "white", letterSpacing: "1px", marginBottom: "6px" }}>{p.title}</span>
                    <span style={{ display: "block", fontSize: "13px", color: "rgba(214,207,194,0.45)", lineHeight: 1.65, fontWeight: 300 }}>{p.body}</span>
                  </div>
                </div>
              ))}
              <Link to="/partner" style={{
                display: "inline-block", padding: "14px 32px",
                background: TEAL, color: "white",
                textDecoration: "none", fontSize: "10px", letterSpacing: "3px",
                fontWeight: 700, transition: "opacity 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}
              >BECOME A PARTNER</Link>
            </div>
          </div>
        </div>
      </section>

      <TextileBand />

      {/* ══════════════════════════════════════════════════════
          FINAL CTA — full bleed, warm earth, Sankofa ghost
      ══════════════════════════════════════════════════════ */}
      <section ref={ctaRef} style={{
        position: "relative", overflow: "hidden",
        minHeight: "500px", display: "flex", alignItems: "center",
      }}>
        <img src={IMGS.cta} alt="Cabin Tea"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(110deg, ${EARTH} 40%, rgba(181,84,30,0.45) 100%)` }} />
        <WaxBg opacity={0.04} color={GOLD} />
        <div className="ct-grain" style={{ zIndex: 1 }} />

        {/* Sankofa ghost */}
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
            {[TERRA, TEAL, GOLD, TERRA, TEAL].map((c, i) => (
              <div key={i} style={{ flex: 1, background: c }} />
            ))}
          </div>

          {/* Akan proverb */}
          <p style={{
            fontFamily: "var(--font-display)", fontStyle: "italic",
            fontSize: "clamp(13px, 1.5vw, 16px)", color: `rgba(181,84,30,0.8)`,
            letterSpacing: "0.5px", marginBottom: "20px",
          }}>
            "Se wo were fi na wosankofa a yenkyi." — It is not wrong to go back for what you forgot.
          </p>

          <h2 style={{
            fontFamily: "var(--font-display)", fontWeight: 700,
            fontSize: "clamp(36px, 5.5vw, 80px)", lineHeight: 0.92,
            letterSpacing: "-2px", color: "white", marginBottom: "28px",
          }}>
            Recorded live.<br />
            <span style={{ color: GOLD, fontStyle: "italic" }}>Heard everywhere.</span>
          </h2>

          <p style={{ fontSize: "15px", lineHeight: 1.85, color: "rgba(214,207,194,0.55)", fontWeight: 300, maxWidth: "420px", marginBottom: "44px" }}>
            New episodes released on YouTube, Spotify, and Apple Podcasts. Subscribe wherever you listen.
          </p>

          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
            <Link to="/episodes" style={{
              display: "inline-block", padding: "14px 36px",
              background: GOLD, color: DEEP,
              textDecoration: "none", fontSize: "10px", letterSpacing: "3px",
              fontWeight: 700, transition: "opacity 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >EXPLORE EPISODES</Link>
            <Link to="/shop" style={{
              display: "inline-block", padding: "14px 36px",
              border: `1px solid rgba(196,164,78,0.35)`, color: "rgba(214,207,194,0.7)",
              textDecoration: "none", fontSize: "10px", letterSpacing: "3px",
              fontWeight: 600, transition: "border-color 0.2s, color 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.color = "white"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(196,164,78,0.35)"; e.currentTarget.style.color = "rgba(214,207,194,0.7)"; }}
            >VISIT SHOP</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
