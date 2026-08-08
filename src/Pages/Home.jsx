import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useIsMobile from "../hooks/useIsMobile";
import { episodes as ALL_EPISODES } from "../data/episodes";

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

const BG    = "#0F1912";
const PANEL = "#141F18";
const GOLD  = "#C4A44E";
const CREAM = "rgba(214,207,194,0.75)";
const MUTED = "rgba(214,207,194,0.38)";

const IMGS = {
  hero:      "/podcast.jpg",
  host:      "/vibes.jpg",
  afrocean:  "/africanface.jpg",
  anchorage: "/canoe.jpg",
  agency:    "/creativeagency.jpg",
  ep1:       "/ep1thumbnail.jpg",
  ep2:       "/episode2.jpeg",
  ep3:       "/episode3.jpeg",
  ep4:       "/episode4.jpeg",
  ep5:       "/episode5.jpeg",
  cta:       "/lighthouse.jpg",
};

function Youtube() {
  return <svg width="22" height="16" viewBox="0 0 26 18" fill="currentColor"><path d="M25.456 2.818A3.26 3.26 0 0023.162.51C21.13 0 13 0 13 0S4.87 0 2.838.51A3.26 3.26 0 00.544 2.818C0 4.862 0 9 0 9s0 4.138.544 6.182a3.26 3.26 0 002.294 2.308C4.87 18 13 18 13 18s8.13 0 10.162-.51a3.26 3.26 0 002.294-2.308C26 13.138 26 9 26 9s0-4.138-.544-6.182zM10.4 12.857V5.143L17.143 9 10.4 12.857z"/></svg>;
}
function Instagram() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>;
}
function LinkedIn() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
}
function TikTok() {
  return <svg width="18" height="20" viewBox="0 0 24 28" fill="currentColor"><path d="M16.5 0c.5 3.2 2.6 5.4 5.9 5.6v3.6c-1.9.1-3.6-.5-5.6-1.6v9.6c0 6.4-6.9 10.4-12.4 6.9-3.9-2.5-4.9-8-1.9-11.7 2-2.4 4.9-3.3 7.9-2.6v3.8c-.5-.2-1.1-.3-1.7-.3-2.2 0-3.9 1.9-3.7 4.2.2 2.1 2.1 3.6 4.2 3.4 1.9-.2 3.4-1.9 3.4-3.9V0h3.9z"/></svg>;
}

const EPISODES = [
  {
    num: "03",
    guest: "Simon Church",
    role: "Special Advisor, Gulf of Guinea Maritime Collaboration Forum",
    org: "Kenya",
    title: "Counter-Piracy at a Crossroads: Horn of Africa and Gulf of Guinea",
    excerpt: "An honest, wide-ranging conversation on where global counter-piracy efforts stand today — and where they're heading.",
    tag: "Marine Security",
    duration: "34 min",
    date: "Jun 8, 2026",
    img: IMGS.ep3,
    imgPosition: "center center",
  },
  {
    num: "04",
    guest: "Mr. Quintin Akrobotu",
    role: "Director of Regulatory Compliance, Ghana Data Protection Commission",
    org: "Accra",
    title: "Is Your Data Protected? Data Protection & Digital Governance in Ghana's Maritime Industry",
    excerpt: "Recorded on the margins of the Maritime Trade Fair 2026 in Accra, exploring how data protection and governance apply to Ghana's maritime industry.",
    tag: "Data Security",
    duration: "17 min",
    date: "Jun 12, 2026",
    img: IMGS.ep4,
    imgPosition: "center center",
  },
  {
    num: "05",
    slug: "captain-francis-micah",
    guest: "Captain Francis K.B. Micah",
    role: "Maritime Consultant, former CEO of PSC Tema Shipyard & Harbour Master, Port of Tema",
    org: "Accra",
    title: "A New Thinking for a Maritime Nation - Beyond Ghana's Black Star Line",
    excerpt: "Three decades at sea and ashore inform a bold proposal for a share-investment model that lets Ghana own and fly its own shipping line without going fully state-run.",
    tag: "Governance",
    duration: "19 min",
    date: "Jul 22, 2026",
    img: IMGS.ep5,
    imgPosition: "center center",
  },
];

const BRANDS = [
  { tag: "GATHERING", name: "Afrocean", desc: "A dynamic gathering that unites the African Diaspora with their maritime heritage through cultural exchange and networking.", img: IMGS.afrocean, to: "/afrocean" },
  { tag: "MEDIA HUB", name: "Anchorage", desc: "A centralized media hub curating personalized maritime content for the Diaspora, reshaping how we engage with the ocean economy.", img: IMGS.anchorage, to: "/anchorage" },
  { tag: "AGENCY", name: "Creative Agency", desc: "Connecting brands to the vibrancy and commercial power of African maritime culture through strategy and immersive experiences.", img: IMGS.agency, to: "/creative-agency" },
];

/* ══════════════════════════════════════════
   PROPER SLIDING CAROUSEL
   — Cards translate as a continuous strip
   — Peek of next card visible on the right
   — Smooth CSS transition on the track
══════════════════════════════════════════ */
function EpisodeCarousel({ episodes }) {
  const [current, setCurrent]   = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dragDelta, setDragDelta] = useState(0);
  const dragStartX = useRef(null);
  const autoRef    = useRef(null);
  const trackRef   = useRef(null);
  const total = episodes.length;
  const isMobile = useIsMobile();

  // Card width: 68% of container + 16px gap peek (full-width on mobile)
  const CARD_W   = isMobile ? 92 : 68;   // percent of wrapper
  const GAP      = isMobile ? 12 : 16;   // px between cards

  const startAuto = useCallback(() => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % total);
    }, 5000);
  }, [total]);

  useEffect(() => { startAuto(); return () => clearInterval(autoRef.current); }, [startAuto]);

  const goTo = (idx) => {
    setCurrent((idx + total) % total);
    startAuto();
  };

  /* ── drag / swipe ── */
  const onPointerDown = (e) => {
    clearInterval(autoRef.current);
    dragStartX.current = e.touches ? e.touches[0].clientX : e.clientX;
    setDragging(true);
    setDragDelta(0);
  };
  const onPointerMove = (e) => {
    if (!dragging || dragStartX.current === null) return;
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    setDragDelta(x - dragStartX.current);
  };
  const onPointerUp = () => {
    if (!dragging) return;
    if (dragDelta < -60)       goTo(current + 1);
    else if (dragDelta > 60)   goTo(current - 1);
    else startAuto();
    setDragging(false);
    setDragDelta(0);
    dragStartX.current = null;
  };

  // Translate: each card is (CARD_W% + gap), active card sits at left edge with small offset
  // We use a wrapper that clips and a track that translates
  const translatePct  = -(current * CARD_W);   // percent of wrapper width
  const translateGap  = -(current * GAP);       // px gap compensation
  const dragTranslate = dragging ? dragDelta : 0;

  return (
    <div style={{ position: "relative" }}>

      {/* ── Overflow wrapper ── */}
      <div
        style={{ overflow: "hidden", cursor: dragging ? "grabbing" : "grab" }}
        onMouseDown={onPointerDown}
        onMouseMove={onPointerMove}
        onMouseUp={onPointerUp}
        onMouseLeave={onPointerUp}
        onTouchStart={onPointerDown}
        onTouchMove={onPointerMove}
        onTouchEnd={onPointerUp}
      >
        {/* ── Sliding track ── */}
        <div
          ref={trackRef}
          style={{
            display: "flex",
            gap: `${GAP}px`,
            transform: `translateX(calc(${translatePct}% - ${translateGap}px + ${dragTranslate}px))`,
            transition: dragging ? "none" : "transform 0.55s cubic-bezier(0.25, 1, 0.35, 1)",
            willChange: "transform",
          }}
        >
          {episodes.map((ep, i) => {
            const isActive = i === current;
            return (
              <div
                key={i}
                style={{
                  flexShrink: 0,
                  width: `${CARD_W}%`,
                  // Show peek of next card — the remaining ~32% minus gap shows the edge of next
                  transition: "opacity 0.4s, transform 0.55s cubic-bezier(0.25,1,0.35,1)",
                  opacity: isActive ? 1 : 0.45,
                  transform: isActive ? "scale(1)" : "scale(0.97)",
                  pointerEvents: isActive ? "auto" : "none",
                }}
              >
                {/* ── Card ── */}
                <div style={{
                  background: PANEL,
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                  height: isMobile ? "auto" : "460px",
                  overflow: "hidden",
                }}>

                  {/* Left — image, strictly contained */}
                  <div style={{ position: "relative", overflow: "hidden", height: isMobile ? "220px" : "460px" }}>
                    {/* Blurred backdrop fill — avoids empty letterbox bars around the contained image */}
                    <img
                      src={ep.img}
                      alt=""
                      aria-hidden="true"
                      draggable={false}
                      style={{
                        position: "absolute", inset: 0,
                        width: "100%", height: "100%",
                        objectFit: "cover",
                        filter: "blur(28px) brightness(0.55)",
                        transform: "scale(1.15)",
                        pointerEvents: "none",
                      }}
                    />
                    {/* Full, uncropped thumbnail */}
                    <img
                      src={ep.img}
                      alt={ep.guest}
                      draggable={false}
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        objectPosition: ep.imgPosition,
                        display: "block",
                        pointerEvents: "none",
                        transition: "transform 0.6s ease",
                        transform: isActive ? "scale(1.02)" : "scale(1)",
                      }}
                    />
                    {/* gradient */}
                    <div style={{
                      position: "absolute", inset: 0,
                      background: "linear-gradient(to right, transparent 55%, rgba(20,31,24,0.85) 100%), linear-gradient(to top, rgba(15,25,18,0.6) 0%, transparent 40%)",
                    }} />
                    {/* Tag */}
                    <div style={{ position: "absolute", top: "22px", left: "22px", display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{
                        background: GOLD, color: "#0F1912",
                        fontSize: "9px", letterSpacing: "2.5px", fontWeight: 700,
                        padding: "4px 10px",
                      }}>{ep.tag}</span>
                      <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.45)", letterSpacing: "1px" }}>{ep.date}</span>
                    </div>
                    {/* Counter */}
                    <span style={{
                      position: "absolute", bottom: "18px", left: "22px",
                      fontSize: "10px", letterSpacing: "4px",
                      color: "rgba(196,164,78,0.5)", fontWeight: 600,
                    }}>EP. {ep.num}</span>
                  </div>

                  {/* Right — info */}
                  <div style={{
                    padding: isMobile ? "24px 22px" : "40px 36px",
                    display: "flex", flexDirection: "column",
                    justifyContent: "center",
                    borderLeft: isMobile ? "none" : "1px solid rgba(255,255,255,0.04)",
                  }}>
                    <p style={{ fontSize: "10px", letterSpacing: "3.5px", color: GOLD, fontWeight: 600, margin: "0 0 16px" }}>
                      EPISODE {ep.num}
                    </p>
                    <h3 style={{
                      fontSize: "clamp(18px, 1.8vw, 24px)", fontWeight: 700,
                      color: "white", lineHeight: 1.2,
                      margin: "0 0 4px", letterSpacing: "-0.2px",
                    }}>{ep.guest}</h3>
                    <p style={{ fontSize: "11px", color: GOLD, margin: "0 0 4px", fontWeight: 500, letterSpacing: "0.3px" }}>
                      {ep.role}
                    </p>
                    <p style={{ fontSize: "10px", color: MUTED, margin: "0 0 18px", letterSpacing: "0.3px" }}>
                      {ep.org}
                    </p>
                    <div style={{ width: "24px", height: "1px", background: "rgba(196,164,78,0.3)", margin: "0 0 16px" }} />
                    <p style={{
                      fontSize: "15px", fontWeight: 600, color: "white",
                      margin: "0 0 10px", lineHeight: 1.35, letterSpacing: "-0.1px",
                    }}>"{ep.title}"</p>
                    <p style={{
                      fontSize: "13px", color: CREAM, lineHeight: 1.65,
                      fontWeight: 300, margin: "0 0 28px",
                    }}>{ep.excerpt}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "auto" }}>
                      <Link to="/episodes" style={{
                        display: "inline-flex", alignItems: "center", gap: "9px",
                        padding: "10px 22px",
                        background: GOLD, color: "#0F1912",
                        textDecoration: "none", fontSize: "10px",
                        letterSpacing: "2px", fontWeight: 700,
                        transition: "opacity 0.2s",
                        flexShrink: 0,
                      }}
                        onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                        onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                      >
                        <svg width="8" height="10" viewBox="0 0 8 10" fill="currentColor">
                          <path d="M0 0l8 5-8 5V0z"/>
                        </svg>
                        LISTEN
                      </Link>
                      {ep.slug && (
                        <Link to={`/episodes/${ep.slug}`} style={{
                          fontSize: "10px", letterSpacing: "1.5px", fontWeight: 600,
                          color: CREAM, textDecoration: "none",
                          borderBottom: "1px solid rgba(214,207,194,0.3)",
                          transition: "color 0.2s, border-color 0.2s",
                        }}
                          onMouseEnter={e => { e.currentTarget.style.color = GOLD; e.currentTarget.style.borderColor = GOLD; }}
                          onMouseLeave={e => { e.currentTarget.style.color = CREAM; e.currentTarget.style.borderColor = "rgba(214,207,194,0.3)"; }}
                        >READ THE STORY</Link>
                      )}
                      <span style={{ fontSize: "11px", color: MUTED, letterSpacing: "1px", marginLeft: "auto" }}>{ep.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Controls ── */}
      <div style={{
        display: "flex", alignItems: "center",
        justifyContent: "space-between",
        marginTop: "20px",
      }}>
        {/* Dot indicators */}
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          {episodes.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} style={{
              width: i === current ? "32px" : "8px",
              height: "3px", border: "none", cursor: "pointer", padding: 0,
              background: i === current ? GOLD : "rgba(196,164,78,0.2)",
              borderRadius: "2px",
              transition: "width 0.4s cubic-bezier(0.16,1,0.3,1), background 0.3s",
            }} />
          ))}
        </div>

        {/* Arrows */}
        <div style={{ display: "flex", gap: "6px" }}>
          {[["‹", () => goTo(current - 1)], ["›", () => goTo(current + 1)]].map(([label, action]) => (
            <button key={label} onClick={action} style={{
              width: "40px", height: "40px",
              background: "transparent",
              border: "1px solid rgba(196,164,78,0.2)",
              color: MUTED, cursor: "pointer",
              fontSize: "20px", lineHeight: 1,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "inherit",
              transition: "border-color 0.2s, color 0.2s, background 0.2s",
            }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = GOLD;
                e.currentTarget.style.color = "white";
                e.currentTarget.style.background = "rgba(196,164,78,0.07)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "rgba(196,164,78,0.2)";
                e.currentTarget.style.color = MUTED;
                e.currentTarget.style.background = "transparent";
              }}
            >{label}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [heroRef,   heroVis]   = useReveal(0.05);
  const [aboutRef,  aboutVis]  = useReveal(0.1);
  const [epRef,     epVis]     = useReveal(0.08);
  const [storyRef,  storyVis]  = useReveal(0.1);
  const [brandsRef, brandsVis] = useReveal(0.08);
  const [ctaRef,    ctaVis]    = useReveal(0.1);
  const isMobile = useIsMobile();
  const articlesList = ALL_EPISODES.filter(e => e.article);
  const featured = articlesList[articlesList.length - 1];
  const moreArticles = articlesList.slice(0, -1).reverse();

  return (
    <div style={{ minHeight: "100vh", background: BG, color: "white", overflowX: "hidden" }}>
      <Navbar />

      {/* ════════ HERO ════════ */}
      <section ref={heroRef} style={{
        height: "100vh", minHeight: "640px",
        position: "relative", overflow: "hidden",
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
      }}>
        <video autoPlay muted loop playsInline style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}>
          <source src="/herovideo.mp4" type="video/mp4" />
          <img src={IMGS.hero} alt="Cabin Tea" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        </video>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,25,18,1) 0%, rgba(15,25,18,0.55) 45%, transparent 80%)" }} />
        <div className="ct-grain" style={{ zIndex: 1 }} />

        <div style={{ position: "relative", zIndex: 2, padding: "0 5vw clamp(40px, 7vw, 72px)" }}>
          <h1 style={{
            fontWeight: 700, fontSize: "clamp(38px, 5vw, 96px)", lineHeight: 1,
            color: "white", margin: "0 0 10px",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(24px)",
            transition: "opacity 0.7s 0.18s, transform 0.7s 0.18s",
          }}>Sipping with the</h1>
          <h1 style={{
            fontWeight: 700, fontSize: "clamp(38px, 5vw, 96px)", lineHeight: 1,
            color: GOLD, margin: "0 0 36px",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(24px)",
            transition: "opacity 0.7s 0.26s, transform 0.7s 0.26s",
          }}>people who know the sea.</h1>

          <div style={{
            display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "40px", flexWrap: "wrap",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(12px)",
            transition: "opacity 0.7s 0.36s, transform 0.7s 0.36s",
          }}>
            <div>
              <p style={{ fontSize: "16px", color: CREAM, lineHeight: 1.7, fontWeight: 300, maxWidth: "400px", marginBottom: "24px" }}>
                Africa's new ocean podcast. Live conversations with the people shaping the continent's blue economy.
              </p>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <Link to="/episodes" style={{ display: "inline-block", padding: "13px 32px", background: GOLD, color: "#0F1912", textDecoration: "none", fontSize: "11px", letterSpacing: "2px", fontWeight: 700, transition: "opacity 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                  onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                >LISTEN NOW</Link>
                <Link to="/about" style={{ display: "inline-block", padding: "13px 32px", border: "1px solid rgba(255,255,255,0.2)", color: CREAM, textDecoration: "none", fontSize: "11px", letterSpacing: "2px", fontWeight: 500, transition: "border-color 0.2s, color 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; e.currentTarget.style.color = "white"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = CREAM; }}
                >ABOUT THE SHOW</Link>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "20px", flexShrink: 0 }}>
              <span style={{ fontSize: "9px", letterSpacing: "2.5px", color: MUTED }}>LISTEN ON</span>
              <a href="https://www.youtube.com/@CabinTea" target="_blank" rel="noopener noreferrer" style={{ color: MUTED, display: "inline-flex", transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = GOLD}
                onMouseLeave={e => e.currentTarget.style.color = MUTED}
              ><Youtube /></a>
              <div style={{ width: "1px", height: "16px", background: "rgba(214,207,194,0.15)" }} />
              <a href="https://www.instagram.com/cabinteapodcast/" target="_blank" rel="noopener noreferrer" style={{ color: MUTED, display: "inline-flex", transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = GOLD}
                onMouseLeave={e => e.currentTarget.style.color = MUTED}
              ><Instagram /></a>
              <a href="https://www.linkedin.com/company/cabin-tea-network/about/?viewAsMember=true" target="_blank" rel="noopener noreferrer" style={{ color: MUTED, display: "inline-flex", transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = GOLD}
                onMouseLeave={e => e.currentTarget.style.color = MUTED}
              ><LinkedIn /></a>
              <a href="https://vt.tiktok.com/ZSQD7AEkU/" target="_blank" rel="noopener noreferrer" style={{ color: MUTED, display: "inline-flex", transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = GOLD}
                onMouseLeave={e => e.currentTarget.style.color = MUTED}
              ><TikTok /></a>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ ABOUT ════════ */}
      <section ref={aboutRef} style={{ background: PANEL, padding: "clamp(56px, 8vw, 96px) 5vw" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "40px" : "80px", alignItems: "center" }}>
            <div style={{ position: "relative", opacity: aboutVis ? 1 : 0, transform: aboutVis ? "none" : "translateX(-20px)", transition: "opacity 0.8s, transform 0.8s" }}>
              <div style={{ overflow: "hidden" }}>
                <img src={IMGS.host} alt="Host" style={{ width: "100%", height: "auto", objectFit: "contain", display: "block" }} />
              </div>
            </div>
            <div style={{ opacity: aboutVis ? 1 : 0, transform: aboutVis ? "none" : "translateX(20px)", transition: "opacity 0.8s 0.15s, transform 0.8s 0.15s" }}>
              <p style={{ fontSize: "10px", letterSpacing: "3px", color: GOLD, marginBottom: "20px", fontWeight: 600 }}>ABOUT CABIN TEA</p>
              <h2 style={{ fontWeight: 700, fontSize: "clamp(28px, 3.5vw, 44px)", lineHeight: 1.1, color: "white", marginBottom: "24px" }}>
                Where Africa's maritime industry finds its voice
              </h2>
              <p style={{ fontSize: "16px", lineHeight: 1.85, color: CREAM, fontWeight: 300, marginBottom: "20px" }}>
                Founded by Lawrence Dogli, Cabin Tea is a 360 ocean storytelling platform committed to uplifting diverse voices, sparking meaningful conversation, and driving cultural impact. 
                Through powerful documentaries, thought-provoking conversations, and informative series, we explore the projects, people, and ideas that shape Africa’s ocean economy.</p>
              <p style={{ fontSize: "16px", lineHeight: 1.85, color: MUTED, fontWeight: 300 }}>
                Recorded live in Accra, Ghana. Heard everywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ LATEST EPISODES — CAROUSEL ════════ */}
      <section ref={epRef} style={{ background: BG, padding: "clamp(56px, 8vw, 96px) 5vw" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{
            display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "36px",
            opacity: epVis ? 1 : 0, transform: epVis ? "none" : "translateY(12px)",
            transition: "opacity 0.6s, transform 0.6s",
          }}>
            <h2 style={{ fontWeight: 700, fontSize: "clamp(22px, 3vw, 36px)", color: "white", margin: 0 }}>Latest Episodes</h2>
            <Link to="/episodes" style={{ fontSize: "11px", letterSpacing: "2px", fontWeight: 600, color: MUTED, textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = GOLD}
              onMouseLeave={e => e.currentTarget.style.color = MUTED}
            >ALL EPISODES →</Link>
          </div>
          <div style={{ opacity: epVis ? 1 : 0, transform: epVis ? "none" : "translateY(24px)", transition: "opacity 0.7s 0.15s, transform 0.7s 0.15s" }}>
            <EpisodeCarousel episodes={EPISODES} />
          </div>
        </div>
      </section>

      {/* ════════ FEATURED STORY ════════ */}
      {featured && (
        <section ref={storyRef} style={{ background: BG, padding: "0 5vw clamp(56px, 8vw, 96px)" }}>
          <div style={{
            maxWidth: "1200px", margin: "0 auto",
            opacity: storyVis ? 1 : 0, transform: storyVis ? "none" : "translateY(16px)",
            transition: "opacity 0.7s, transform 0.7s",
          }}>
            <p style={{ fontSize: "10px", letterSpacing: "3px", color: GOLD, marginBottom: "20px", fontWeight: 700 }}>
              FROM THE JOURNAL
            </p>
            <Link to={`/episodes/${featured.slug}`} style={{ textDecoration: "none", display: "block" }}>
              <div style={{
                display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "2px",
                background: PANEL, cursor: "pointer",
              }}>
                {/* Image */}
                <div style={{ position: "relative", overflow: "hidden", minHeight: isMobile ? "240px" : "380px" }}>
                  <img
                    src={featured.article.img}
                    alt={featured.article.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to right, transparent 55%, rgba(20,31,24,0.65) 100%)",
                  }} />
                  <span style={{
                    position: "absolute", top: "20px", left: "20px",
                    background: GOLD, color: "#0F1912",
                    fontSize: "9px", letterSpacing: "2px", fontWeight: 700,
                    padding: "4px 10px",
                  }}>{featured.tag.toUpperCase()}</span>
                </div>

                {/* Content */}
                <div style={{
                  padding: isMobile ? "32px 26px" : "48px 44px",
                  display: "flex", flexDirection: "column", justifyContent: "center",
                }}>
                  <p style={{ fontSize: "10px", color: MUTED, marginBottom: "16px", letterSpacing: "1px" }}>
                    ARTICLE · {featured.duration} EPISODE
                  </p>
                  <h2 style={{
                    fontWeight: 700, fontSize: "clamp(22px, 2.6vw, 34px)",
                    color: "white", lineHeight: 1.2,
                    margin: "0 0 18px", letterSpacing: "-0.3px",
                  }}>{featured.article.title}</h2>
                  <div style={{ width: "28px", height: "1px", background: "rgba(196,164,78,0.3)", margin: "0 0 18px" }} />
                  <p style={{
                    fontSize: "15px", lineHeight: 1.8, color: CREAM,
                    fontWeight: 300, margin: "0 0 32px",
                  }}>{featured.article.deck}</p>
                  <span style={{
                    alignSelf: "flex-start",
                    padding: "13px 30px",
                    background: GOLD, color: "#0F1912",
                    fontSize: "10px", letterSpacing: "2.5px", fontWeight: 700,
                  }}>READ THE STORY →</span>
                </div>
              </div>
            </Link>

            {moreArticles.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", marginTop: "8px" }}>
                {moreArticles.map(ep => (
                  <Link key={ep.slug} to={`/episodes/${ep.slug}`} style={{
                    display: "grid", gridTemplateColumns: isMobile ? "80px 1fr" : "120px 1fr",
                    gap: isMobile ? "14px" : "20px",
                    padding: "18px 0",
                    borderTop: "1px solid rgba(255,255,255,0.07)",
                    textDecoration: "none", alignItems: "center",
                  }}>
                    <div style={{ height: isMobile ? "64px" : "80px", overflow: "hidden", flexShrink: 0 }}>
                      <img src={ep.article.img} alt={ep.article.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    </div>
                    <div>
                      <p style={{ fontSize: "9px", letterSpacing: "2px", color: GOLD, fontWeight: 700, margin: "0 0 6px" }}>
                        {ep.tag.toUpperCase()}
                      </p>
                      <p style={{ fontSize: "14px", fontWeight: 700, color: "white", margin: 0, lineHeight: 1.35 }}>{ep.article.title}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ════════ THE ECOSYSTEM ════════ */}
      <section ref={brandsRef} style={{ background: PANEL, padding: "clamp(56px, 8vw, 96px) 5vw" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ marginBottom: "48px", opacity: brandsVis ? 1 : 0, transform: brandsVis ? "none" : "translateY(12px)", transition: "opacity 0.6s, transform 0.6s" }}>
            <p style={{ fontSize: "10px", letterSpacing: "3px", color: GOLD, marginBottom: "12px", fontWeight: 600 }}>THE ECOSYSTEM</p>
            <h2 style={{ fontWeight: 700, fontSize: "clamp(22px, 3vw, 36px)", color: "white", margin: 0 }}>More than a podcast.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: "2px" }}>
            {BRANDS.map((brand, i) => {
              const [hovered, setHovered] = useState(false);
              return (
                <Link key={brand.name} to={brand.to}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                  style={{ textDecoration: "none", position: "relative", display: "block", overflow: "hidden", opacity: brandsVis ? 1 : 0, transform: brandsVis ? "none" : "translateY(20px)", transition: `opacity 0.6s ${0.1 + i * 0.1}s, transform 0.6s ${0.1 + i * 0.1}s` }}
                >
                  <div style={{ aspectRatio: "3/4", overflow: "hidden" }}>
                    <img src={brand.img} alt={brand.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transform: hovered ? "scale(1.04)" : "scale(1)", transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)" }} />
                  </div>
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,25,18,0.95) 0%, rgba(15,25,18,0.5) 50%, transparent 100%)", opacity: hovered ? 1 : 0.6, transition: "opacity 0.4s" }} />
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "28px 24px" }}>
                    <span style={{ fontSize: "9px", letterSpacing: "2.5px", color: GOLD, fontWeight: 600, display: "block", marginBottom: "6px" }}>{brand.tag}</span>
                    <h3 style={{ fontWeight: 700, fontSize: "26px", color: "white", margin: "0 0 8px" }}>{brand.name}</h3>
                    <p style={{ fontSize: "13px", color: CREAM, lineHeight: 1.6, fontWeight: 300, margin: 0, maxHeight: hovered ? "80px" : "0", overflow: "hidden", transition: "max-height 0.4s ease" }}>{brand.desc}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════ CTA ════════ */}
      <section ref={ctaRef} style={{ position: "relative", overflow: "hidden", minHeight: "440px", display: "flex", alignItems: "center" }}>
        <img src={IMGS.cta} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, rgba(15,25,18,0.96) 40%, rgba(15,25,18,0.7) 100%)" }} />
        <div className="ct-grain" style={{ zIndex: 1 }} />
        <div style={{ position: "relative", zIndex: 2, padding: "clamp(48px, 7vw, 80px) 5vw", maxWidth: "680px", opacity: ctaVis ? 1 : 0, transform: ctaVis ? "none" : "translateY(20px)", transition: "opacity 0.8s, transform 0.8s" }}>
          <p style={{ fontSize: "10px", letterSpacing: "3px", color: GOLD, marginBottom: "20px", fontWeight: 600 }}>NEW EPISODES OUT NOW</p>
          <h2 style={{ fontWeight: 700, fontSize: "clamp(32px, 5vw, 64px)", lineHeight: 1, color: "white", marginBottom: "16px" }}>
            Recorded live.<br /><span style={{ color: GOLD }}>Heard everywhere.</span>
          </h2>
          <p style={{ fontSize: "16px", color: CREAM, fontWeight: 300, lineHeight: 1.7, marginBottom: "36px", maxWidth: "400px" }}>
            Subscribe on YouTube, Spotify, or Apple Podcasts and never miss a conversation.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link to="/episodes" style={{ display: "inline-block", padding: "13px 32px", background: GOLD, color: "#0F1912", textDecoration: "none", fontSize: "11px", letterSpacing: "2px", fontWeight: 700, transition: "opacity 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >EXPLORE EPISODES</Link>
            <Link to="/partner" style={{ display: "inline-block", padding: "13px 32px", border: "1px solid rgba(255,255,255,0.2)", color: CREAM, textDecoration: "none", fontSize: "11px", letterSpacing: "2px", fontWeight: 500, transition: "border-color 0.2s, color 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; e.currentTarget.style.color = "white"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = CREAM; }}
            >PARTNER WITH US</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
