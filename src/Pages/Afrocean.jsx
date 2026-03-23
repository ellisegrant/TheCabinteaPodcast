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

/* ── Kente-inspired geometric divider ── */
function KenteDivider({ color = "var(--gold)", opacity = 0.18 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0", overflow: "hidden", opacity }}>
      {[...Array(32)].map((_, i) => (
        <div key={i} style={{
          width: "12px", height: "12px", flexShrink: 0,
          background: i % 4 === 0 ? color :
                      i % 4 === 1 ? "var(--teal)" :
                      i % 4 === 2 ? color : "transparent",
          transform: i % 2 === 0 ? "rotate(45deg) scale(0.6)" : "rotate(0deg) scale(0.4)",
          margin: "0 3px",
        }} />
      ))}
    </div>
  );
}

/* ── African pattern SVG background ── */
function PatternBg({ opacity = 0.04 }) {
  return (
    <div style={{
      position: "absolute", inset: 0, pointerEvents: "none",
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C4A44E'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      opacity,
    }} />
  );
}

const pillars = [
  { num: "01", title: "Unite", body: "Building a cultural ecosystem that brings together people and enterprises of the African maritime industry — across the continent and the Diaspora." },
  { num: "02", title: "Invest", body: "Creating real economic pathways between Africa and the Diaspora by facilitating cultural and industry exchange, collaboration, and mutual growth." },
  { num: "03", title: "Celebrate", body: "Spotlighting emerging trends, elevating local insights, and amplifying African maritime culture to the world with intention and pride." },
];

const ecosystem = [
  { tag: "PODCAST", name: "Cabin Tea", desc: "A live conversation series where ocean professionals come together over a carefully chosen cup of tea. Recorded live in Accra, heard everywhere.", to: "/episodes", accent: "var(--teal)" },
  { tag: "GATHERING", name: "Afrocean", desc: "A dynamic gathering that unites individuals of the African Diaspora, fostering a deep connection with their maritime heritage through cultural exchange.", to: "/afrocean", accent: "var(--gold)" },
  { tag: "MEDIA HUB", name: "Anchorage", desc: "A centralized media hub with in-person and digital experiences, curating personalized maritime content and reshaping how we explore the maritime world.", to: "/anchorage", accent: "var(--teal)" },
  { tag: "AGENCY", name: "Creative Agency", desc: "Connecting brands to the vibrancy, innovation, and commercial power of African maritime culture through strategy, creativity, and immersive experiences.", to: "/creative-agency", accent: "var(--gold)" },
];

/* Real African/maritime images — harbours, coast, people, ocean culture */
const IMGS = {
  hero:     "https://images.unsplash.com/photo-1596524430615-b46475ddff6e?w=1600&q=85",   /* African fishing harbour */
  harbour:  "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=900&q=80",    /* African coast boats */
  tea:      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=900&q=80",       /* tea ceremony */
  people:   "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=900&q=80",   /* African diaspora gathering */
  ocean:    "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1200&q=80",  /* ocean waves */
  accra:    "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1200&q=80",  /* Accra */
  canoe:    "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=900&q=80",      /* coastal */
  market:   "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=900&q=80",  /* gathering */
};

export default function About() {
  const [heroRef, heroVis]       = useReveal(0.05);
  const [identityRef, identityVis] = useReveal(0.08);
  const [missionRef, missionVis] = useReveal(0.1);
  const [cabinRef, cabinVis]     = useReveal(0.1);
  const [pillarsRef, pillarsVis] = useReveal(0.1);
  const [ecoRef, ecoVis]         = useReveal(0.1);
  const [hostRef, hostVis]       = useReveal(0.1);
  const [ctaRef, ctaVis]         = useReveal(0.1);

  return (
    <div style={{ minHeight: "100vh", background: "var(--dark)", color: "var(--cream)", overflowX: "hidden" }}>
      <Navbar />

      {/* ══════════════════════════════════════════════
          HERO — African harbour, warm and cinematic
      ══════════════════════════════════════════════ */}
      <section ref={heroRef} style={{
        minHeight: "100vh", position: "relative", overflow: "hidden",
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
      }}>
        {/* Real African harbour image */}
        <div style={{ position: "absolute", inset: 0 }}>
          <img src={IMGS.hero} alt="African harbour" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          {/* Warm terracotta overlay — not cold blue-grey */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(21,42,47,1) 10%, rgba(21,42,47,0.7) 45%, rgba(35,20,10,0.3) 100%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, rgba(21,42,47,0.85) 35%, rgba(180,100,30,0.08) 100%)" }} />
        </div>

        {/* Kente strip at very top of hero — decorative cultural band */}
        <div style={{ position: "absolute", top: "100px", left: 0, right: 0, zIndex: 2 }}>
          <KenteDivider opacity={0.12} />
        </div>

        <div className="ct-grain" style={{ zIndex: 1 }} />

        <div style={{ position: "relative", zIndex: 3, padding: "80px 5vw 100px" }}>
          {/* Eyebrow with African flag-colour dot row */}
          <div style={{
            display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(14px)",
            transition: "opacity 0.7s 0.1s, transform 0.7s 0.1s",
          }}>
            {/* Three dots — Pan-African palette nod */}
            <div style={{ display: "flex", gap: "6px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#D4A017" }} />
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--teal)" }} />
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#C44B2A" }} />
            </div>
            <span style={{ fontSize: "10px", letterSpacing: "4px", color: "rgba(214,207,194,0.6)", fontWeight: 500 }}>
              FROM THE GULF OF GUINEA · ACCRA, GHANA
            </span>
          </div>

          <h1 style={{
            fontFamily: "var(--font-display)", fontWeight: 700,
            fontSize: "clamp(56px, 10vw, 140px)",
            lineHeight: 0.87, letterSpacing: "-4px",
            color: "white", margin: "0",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(30px)",
            transition: "opacity 0.8s 0.2s, transform 0.8s 0.2s",
          }}>Africa's</h1>

          <h1 style={{
            fontFamily: "var(--font-display)", fontWeight: 700, fontStyle: "italic",
            fontSize: "clamp(56px, 10vw, 140px)",
            lineHeight: 0.87, letterSpacing: "-4px",
            color: "var(--gold)", marginBottom: "48px",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(30px)",
            transition: "opacity 0.8s 0.3s, transform 0.8s 0.3s",
          }}>Maritime Voice.</h1>

          {/* Bottom row — tagline left, image mosaic right */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: "60px", alignItems: "end",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(16px)",
            transition: "opacity 0.7s 0.45s, transform 0.7s 0.45s",
          }}>
            <p style={{
              fontSize: "clamp(15px, 1.5vw, 18px)", lineHeight: 1.85,
              color: "rgba(214,207,194,0.65)", fontWeight: 300, maxWidth: "440px",
              borderLeft: "3px solid var(--gold)", paddingLeft: "20px",
            }}>
              A 360° maritime media and industry network built for the African community and Diaspora — amplifying culture, connecting economies, and making maritime in Africa visible, relevant, and irresistible to the next generation.
            </p>

            {/* Thumbnail mosaic — 3 small images */}
            <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
              {[IMGS.harbour, IMGS.people, IMGS.accra].map((src, i) => (
                <div key={i} style={{
                  width: "100px", height: "130px", overflow: "hidden",
                  borderRadius: "3px", flexShrink: 0,
                  border: "1px solid rgba(196,164,78,0.2)",
                  transform: `rotate(${[-2, 0, 2][i]}deg)`,
                }}>
                  <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          IDENTITY — warm earth tone strip, who we are
      ══════════════════════════════════════════════ */}
      <section ref={identityRef} style={{
        background: "#1A2A20",  /* deep forest green — warmer than --dark */
        borderTop: "4px solid var(--gold)",
        position: "relative", overflow: "hidden",
        padding: "80px 5vw",
      }}>
        <PatternBg opacity={0.06} />

        <div style={{ maxWidth: "1300px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          {/* Scrolling text band — AIAC editorial stamp */}
          <div style={{
            display: "flex", gap: "48px", alignItems: "center",
            flexWrap: "wrap",
            opacity: identityVis ? 1 : 0,
            transition: "opacity 0.8s",
          }}>
            {[
              { val: "360°", label: "Maritime Media Network" },
              { val: "Accra", label: "Gulf of Guinea" },
              { val: "Global", label: "Diaspora Reach" },
              { val: "Africa", label: "Next Generation" },
            ].map((s, i) => (
              <div key={s.label} style={{
                paddingRight: "48px",
                borderRight: i < 3 ? "1px solid rgba(196,164,78,0.2)" : "none",
              }}>
                <span style={{
                  fontFamily: "var(--font-display)", fontSize: "clamp(32px, 4vw, 52px)",
                  fontWeight: 700, color: "white", display: "block", lineHeight: 1,
                  letterSpacing: "-1px",
                }}>{s.val}</span>
                <span style={{ fontSize: "10px", letterSpacing: "2.5px", color: "rgba(196,164,78,0.55)", display: "block", marginTop: "6px" }}>
                  {s.label.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          MISSION — warm split, earthy textures
      ══════════════════════════════════════════════ */}
      <section ref={missionRef} style={{
        padding: "0",
        background: "var(--dark)",
        overflow: "hidden",
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "600px" }}>

          {/* Left — full image, people at sea / harbour market */}
          <div style={{
            position: "relative", overflow: "hidden",
            opacity: missionVis ? 1 : 0,
            transform: missionVis ? "none" : "translateX(-24px)",
            transition: "opacity 1s, transform 1s",
          }}>
            <img src={IMGS.market} alt="African maritime gathering"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", minHeight: "600px" }} />
            {/* Warm amber tint overlay */}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(21,42,47,0.1) 0%, rgba(21,42,47,0.05) 60%, rgba(21,42,47,0.85) 100%)" }} />

            {/* Floating caption card — journalistic like AIAC */}
            <div style={{
              position: "absolute", bottom: "40px", left: "32px",
              background: "rgba(21,42,47,0.9)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(196,164,78,0.25)",
              borderLeft: "3px solid var(--gold)",
              padding: "16px 20px", maxWidth: "260px",
            }}>
              <span style={{ fontSize: "9px", letterSpacing: "3px", color: "var(--teal)", display: "block", marginBottom: "6px" }}>THE MOMENT</span>
              <p style={{ fontSize: "13px", lineHeight: 1.65, color: "rgba(214,207,194,0.75)", margin: 0, fontFamily: "var(--font-display)", fontStyle: "italic" }}>
                "Africa is undergoing a renaissance of blue economy innovation, policy expression and maritime enterprise."
              </p>
            </div>
          </div>

          {/* Right — mission text, warm background */}
          <div style={{
            background: "#1C3028",  /* warm dark forest */
            padding: "80px 5vw 80px 56px",
            display: "flex", flexDirection: "column", justifyContent: "center",
            position: "relative", overflow: "hidden",
            opacity: missionVis ? 1 : 0,
            transform: missionVis ? "none" : "translateX(24px)",
            transition: "opacity 1s 0.15s, transform 1s 0.15s",
          }}>
            <PatternBg opacity={0.05} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <span style={{ fontSize: "10px", letterSpacing: "4px", color: "var(--teal)", display: "block", marginBottom: "20px" }}>OUR MISSION</span>

              <h2 style={{
                fontFamily: "var(--font-display)", fontWeight: 700,
                fontSize: "clamp(28px, 3.5vw, 44px)", lineHeight: 1.05,
                letterSpacing: "-1px", color: "white", marginBottom: "32px",
              }}>
                A Cultural Ecosystem That Unites, Invests in, and Celebrates African Maritime.
              </h2>

              {/* Big stat — Monocle pull-quote style */}
              <div style={{
                borderLeft: "3px solid var(--gold)", paddingLeft: "24px", marginBottom: "36px",
              }}>
                <span style={{
                  fontFamily: "var(--font-display)", fontStyle: "italic",
                  fontSize: "clamp(52px, 6vw, 80px)", fontWeight: 700,
                  color: "var(--gold)", display: "block", lineHeight: 1,
                }}>50%+</span>
                <span style={{ fontSize: "13px", color: "rgba(214,207,194,0.5)", lineHeight: 1.65, display: "block", marginTop: "10px", fontWeight: 300 }}>
                  of Africa's population is under 25. A blue economy renaissance is underway — Cabin Tea captures the spirit of this moment.
                </span>
              </div>

              <p style={{ fontSize: "15px", lineHeight: 1.9, color: "rgba(214,207,194,0.55)", fontWeight: 300, maxWidth: "420px", marginBottom: "36px" }}>
                Our mission is to foster a strong cultural connection and enhance economic opportunities between Africa and the Diaspora — facilitating exchange, collaboration, and mutual growth.
              </p>

              <Link to="/creative-agency" style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                padding: "12px 28px",
                border: "1px solid rgba(196,164,78,0.35)", color: "var(--gold)",
                textDecoration: "none", fontSize: "10px", letterSpacing: "2.5px",
                fontWeight: 600, borderRadius: "2px", transition: "background 0.2s, color 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "var(--gold)"; e.currentTarget.style.color = "var(--dark)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--gold)"; }}
              >OUR SERVICES →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          THE CABIN — deep ocean warmth, quote section
      ══════════════════════════════════════════════ */}
      <section ref={cabinRef} style={{
        position: "relative", overflow: "hidden",
        background: "var(--dark)",
      }}>
        {/* Full bleed background — ocean/coastal */}
        <div style={{ position: "absolute", inset: 0 }}>
          <img src={IMGS.ocean} alt="Ocean" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(21,42,47,0.88)" }} />
          {/* Warm terracotta edge tint */}
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 80% 50%, rgba(180,90,30,0.08) 0%, transparent 60%)" }} />
        </div>

        <PatternBg opacity={0.025} />
        <div className="ct-grain" style={{ zIndex: 1 }} />

        <div style={{
          position: "relative", zIndex: 2,
          maxWidth: "900px", margin: "0 auto",
          padding: "120px 5vw",
          textAlign: "center",
        }}>
          {/* Kente divider top */}
          <div style={{ marginBottom: "48px" }}>
            <KenteDivider opacity={0.25} />
          </div>

          {/* Giant decorative quote mark */}
          <div style={{
            fontFamily: "var(--font-display)", fontSize: "160px",
            color: "rgba(196,164,78,0.1)", lineHeight: 0.7,
            fontWeight: 700, marginBottom: "-32px",
            opacity: cabinVis ? 1 : 0, transition: "opacity 0.8s",
          }}>"</div>

          <blockquote style={{
            fontFamily: "var(--font-display)", fontStyle: "italic",
            fontSize: "clamp(24px, 3vw, 38px)", lineHeight: 1.45,
            color: "var(--cream)", margin: "0 0 40px 0",
            opacity: cabinVis ? 1 : 0, transform: cabinVis ? "none" : "translateY(20px)",
            transition: "opacity 0.8s 0.15s, transform 0.8s 0.15s",
          }}>
            A ship's cabin is where honest conversations happen — below deck, away from performance, between people who trust each other. That's what we're building.
          </blockquote>

          <span style={{
            fontSize: "11px", letterSpacing: "3px", color: "var(--gold)",
            fontWeight: 600, display: "block", marginBottom: "56px",
            opacity: cabinVis ? 1 : 0, transition: "opacity 0.8s 0.3s",
          }}>— CABIN TEA · ACCRA</span>

          {/* Three image row — harbour, tea, gathering */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1.4fr 1fr",
            gap: "12px",
            opacity: cabinVis ? 1 : 0, transform: cabinVis ? "none" : "translateY(20px)",
            transition: "opacity 0.8s 0.4s, transform 0.8s 0.4s",
          }}>
            {[
              { src: IMGS.harbour, label: "Gulf of Guinea", height: "180px" },
              { src: IMGS.tea, label: "The Cup", height: "220px" },
              { src: IMGS.canoe, label: "Coastal Culture", height: "180px" },
            ].map((img, i) => (
              <div key={i} style={{ position: "relative", overflow: "hidden", borderRadius: "3px", border: "1px solid rgba(196,164,78,0.15)" }}>
                <img src={img.src} alt={img.label}
                  style={{ width: "100%", height: img.height, objectFit: "cover", display: "block" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(21,42,47,0.8) 0%, transparent 50%)" }} />
                <span style={{
                  position: "absolute", bottom: "10px", left: "12px",
                  fontSize: "9px", letterSpacing: "2px", color: "rgba(214,207,194,0.6)",
                  fontWeight: 500,
                }}>{img.label.toUpperCase()}</span>
              </div>
            ))}
          </div>

          {/* Kente divider bottom */}
          <div style={{ marginTop: "48px" }}>
            <KenteDivider opacity={0.25} />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          THREE PILLARS — warm earthy list
      ══════════════════════════════════════════════ */}
      <section ref={pillarsRef} style={{
        padding: "100px 5vw",
        background: "#1A2A20",
        borderTop: "1px solid rgba(196,164,78,0.12)",
        position: "relative", overflow: "hidden",
      }}>
        <PatternBg opacity={0.06} />

        <div style={{ maxWidth: "1300px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{
            display: "grid", gridTemplateColumns: "280px 1fr",
            gap: "80px", alignItems: "start", marginBottom: "72px",
            opacity: pillarsVis ? 1 : 0, transform: pillarsVis ? "none" : "translateY(16px)",
            transition: "opacity 0.6s, transform 0.6s",
          }}>
            <div>
              <span style={{ fontSize: "10px", letterSpacing: "4px", color: "var(--teal)", display: "block", marginBottom: "14px" }}>WHAT DRIVES US</span>
              <h2 style={{
                fontFamily: "var(--font-display)", fontWeight: 700, fontStyle: "italic",
                fontSize: "clamp(32px, 3.5vw, 48px)", color: "white", lineHeight: 1, margin: 0,
              }}>Three words.<br />One mission.</h2>
            </div>
            <p style={{ fontSize: "15px", lineHeight: 1.9, color: "rgba(214,207,194,0.5)", fontWeight: 300, maxWidth: "500px", paddingTop: "36px" }}>
              Our cultural ecosystem is anchored by three fundamental commitments to the African maritime community — spanning the continent and connecting the Diaspora.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {pillars.map((p, i) => (
              <div key={p.num} style={{
                display: "grid", gridTemplateColumns: "100px 260px 1fr",
                gap: "48px", padding: "52px 0",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                alignItems: "center",
                opacity: pillarsVis ? 1 : 0, transform: pillarsVis ? "none" : "translateY(20px)",
                transition: `opacity 0.6s ${0.1 + i * 0.12}s, transform 0.6s ${0.1 + i * 0.12}s`,
              }}>
                {/* Big italic watermark number */}
                <span style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "72px", fontWeight: 700, fontStyle: "italic",
                  color: "rgba(196,164,78,0.13)", lineHeight: 1,
                }}>{p.num}</span>

                {/* Word */}
                <h3 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 700,
                  color: "white", lineHeight: 1, margin: 0, letterSpacing: "-1px",
                }}>
                  {p.title}
                  {/* Gold underline accent */}
                  <div style={{ width: "32px", height: "3px", background: "var(--gold)", marginTop: "12px", borderRadius: "1px" }} />
                </h3>

                {/* Body */}
                <p style={{ fontSize: "15px", lineHeight: 1.9, color: "rgba(214,207,194,0.5)", fontWeight: 300, margin: 0 }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          ECOSYSTEM — what we do, mosaic grid
      ══════════════════════════════════════════════ */}
      <section ref={ecoRef} style={{
        background: "var(--dark)", borderTop: "1px solid rgba(196,164,78,0.1)",
        padding: "100px 5vw", position: "relative", overflow: "hidden",
      }}>
        <div style={{ maxWidth: "1300px", margin: "0 auto" }}>
          <div style={{
            display: "flex", alignItems: "flex-end", justifyContent: "space-between",
            flexWrap: "wrap", gap: "20px", marginBottom: "56px",
            opacity: ecoVis ? 1 : 0, transform: ecoVis ? "none" : "translateY(16px)",
            transition: "opacity 0.6s, transform 0.6s",
          }}>
            <div>
              <span style={{ fontSize: "10px", letterSpacing: "4px", color: "var(--teal)", display: "block", marginBottom: "12px" }}>THE ECOSYSTEM</span>
              <h2 style={{
                fontFamily: "var(--font-display)", fontWeight: 700, fontStyle: "italic",
                fontSize: "clamp(28px, 3.5vw, 48px)", color: "white", lineHeight: 1, margin: 0,
              }}>More than a podcast.</h2>
            </div>
            <p style={{ fontSize: "14px", color: "rgba(214,207,194,0.4)", maxWidth: "340px", lineHeight: 1.7, fontWeight: 300, textAlign: "right" }}>
              Cabin Tea is a full ecosystem of media, events, and strategy — all rooted in African maritime culture.
            </p>
          </div>

          {/* Mosaic — 2 tall + 2 wide alternating like AIAC article grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px", background: "rgba(255,255,255,0.04)" }}>
            {ecosystem.map((item, i) => (
              <Link key={item.name} to={item.to} style={{
                textDecoration: "none",
                background: "var(--dark)",
                padding: i < 2 ? "56px 48px" : "48px 48px",
                display: "flex", flexDirection: "column",
                borderLeft: `3px solid ${i % 2 === 0 ? "transparent" : "transparent"}`,
                transition: "background 0.3s, border-color 0.3s",
                position: "relative", overflow: "hidden",
                opacity: ecoVis ? 1 : 0, transform: ecoVis ? "none" : "translateY(24px)",
                transitionProperty: "background, border-color, opacity, transform",
                transitionDuration: "0.3s, 0.3s, 0.6s, 0.6s",
                transitionDelay: `0s, 0s, ${0.1 + i * 0.1}s, ${0.1 + i * 0.1}s`,
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = i % 2 === 0 ? "rgba(44,140,124,0.07)" : "rgba(196,164,78,0.05)";
                }}
                onMouseLeave={e => { e.currentTarget.style.background = "var(--dark)"; }}
              >
                {/* Background pattern on hover feel */}
                <PatternBg opacity={0.02} />

                <div style={{ position: "relative", zIndex: 1, flex: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
                    <span style={{
                      fontSize: "9px", letterSpacing: "2.5px", fontWeight: 700,
                      color: item.accent === "var(--gold)" ? "var(--gold)" : "var(--teal)",
                      background: item.accent === "var(--gold)" ? "rgba(196,164,78,0.1)" : "rgba(44,140,124,0.1)",
                      padding: "5px 12px", borderRadius: "1px",
                    }}>{item.tag}</span>
                    <span style={{ fontSize: "18px", color: "rgba(196,164,78,0.3)" }}>→</span>
                  </div>

                  <h3 style={{
                    fontFamily: "var(--font-display)", fontSize: "clamp(26px, 2.5vw, 38px)",
                    fontWeight: 700, color: "white", margin: "0 0 16px 0", lineHeight: 1.05,
                    letterSpacing: "-0.5px",
                  }}>{item.name}</h3>

                  <div style={{ width: "28px", height: "2px", background: item.accent, marginBottom: "18px", borderRadius: "1px" }} />

                  <p style={{ fontSize: "14px", lineHeight: 1.85, color: "rgba(214,207,194,0.48)", fontWeight: 300, flex: 1, marginBottom: "32px" }}>
                    {item.desc}
                  </p>

                  <span style={{ fontSize: "10px", letterSpacing: "2px", color: "rgba(196,164,78,0.45)", fontWeight: 600 }}>
                    EXPLORE {item.name.toUpperCase()} →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          HOST — warm, human, editorial
      ══════════════════════════════════════════════ */}
      <section ref={hostRef} style={{
        background: "#1C3028",
        borderTop: "1px solid rgba(196,164,78,0.12)",
        overflow: "hidden",
        position: "relative",
      }}>
        <PatternBg opacity={0.05} />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", position: "relative", zIndex: 1 }}>

          {/* Left — editorial photo treatment */}
          <div style={{
            position: "relative", minHeight: "640px",
            opacity: hostVis ? 1 : 0, transform: hostVis ? "none" : "translateX(-20px)",
            transition: "opacity 0.9s, transform 0.9s",
          }}>
            <img src={IMGS.people} alt="Host" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            {/* Warm overlay */}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(28,48,40,0.1) 0%, rgba(28,48,40,0.7) 100%)" }} />

            {/* Floating date stamp — AIAC style */}
            <div style={{
              position: "absolute", top: "40px", left: "32px",
              background: "var(--gold)", color: "var(--dark)",
              padding: "8px 16px",
            }}>
              <span style={{ fontSize: "9px", letterSpacing: "2.5px", fontWeight: 700 }}>HOST &amp; CREATOR</span>
            </div>

            {/* Location tag bottom */}
            <div style={{
              position: "absolute", bottom: "32px", left: "32px",
              display: "flex", alignItems: "center", gap: "10px",
            }}>
              {/* Pan-African dot row */}
              <div style={{ display: "flex", gap: "4px" }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#D4A017" }} />
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--teal)" }} />
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#C44B2A" }} />
              </div>
              <span style={{ fontSize: "10px", letterSpacing: "2.5px", color: "rgba(214,207,194,0.6)", fontWeight: 500 }}>ACCRA · GHANA</span>
            </div>
          </div>

          {/* Right — host text */}
          <div style={{
            padding: "80px 5vw 80px 56px",
            display: "flex", flexDirection: "column", justifyContent: "center",
            opacity: hostVis ? 1 : 0, transform: hostVis ? "none" : "translateX(20px)",
            transition: "opacity 0.9s 0.2s, transform 0.9s 0.2s",
          }}>
            <span style={{ fontSize: "10px", letterSpacing: "4px", color: "var(--teal)", display: "block", marginBottom: "20px" }}>YOUR HOST</span>

            <h2 style={{
              fontFamily: "var(--font-display)", fontWeight: 700,
              fontSize: "clamp(40px, 5vw, 72px)", lineHeight: 0.9,
              letterSpacing: "-2px", color: "white", marginBottom: "8px",
            }}>Your<br />Name</h2>

            <p style={{ fontSize: "12px", letterSpacing: "2px", color: "var(--gold)", marginBottom: "36px" }}>
              HOST &amp; CREATOR · CABIN TEA · ACCRA
            </p>

            <KenteDivider opacity={0.3} />
            <div style={{ height: "36px" }} />

            <p style={{
              fontSize: "16px", lineHeight: 1.95,
              color: "rgba(214,207,194,0.55)", fontWeight: 300,
              marginBottom: "20px", maxWidth: "400px",
              fontFamily: "var(--font-display)", fontStyle: "italic",
            }}>
              Add your bio here — your background, your connection to the ocean, and what drove you to create Cabin Tea.
            </p>
            <p style={{
              fontSize: "14px", lineHeight: 1.85,
              color: "rgba(214,207,194,0.4)", fontWeight: 300, maxWidth: "400px",
              marginBottom: "40px",
            }}>
              This is your moment to make the audience feel like they already know you before the show even starts. Your story is the anchor of this entire brand.
            </p>

            <Link to="/about-host" style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              padding: "13px 32px",
              background: "var(--gold)", color: "var(--dark)",
              textDecoration: "none", fontSize: "10px",
              letterSpacing: "2.5px", fontWeight: 700, borderRadius: "2px",
              transition: "opacity 0.2s", alignSelf: "flex-start",
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >READ FULL BIO →</Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FINAL CTA — Accra coastline, warm & confident
      ══════════════════════════════════════════════ */}
      <section ref={ctaRef} style={{ position: "relative", overflow: "hidden", minHeight: "440px", display: "flex", alignItems: "center" }}>
        <img src={IMGS.accra} alt="Accra coast"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(110deg, rgba(21,42,47,0.96) 45%, rgba(30,107,95,0.7) 100%)" }} />
        <PatternBg opacity={0.03} />
        <div className="ct-grain" style={{ zIndex: 1 }} />

        <div style={{
          position: "relative", zIndex: 2, padding: "80px 5vw", maxWidth: "760px",
          opacity: ctaVis ? 1 : 0, transform: ctaVis ? "none" : "translateY(20px)",
          transition: "opacity 0.8s, transform 0.8s",
        }}>
          {/* Pan-African dots */}
          <div style={{ display: "flex", gap: "6px", marginBottom: "28px" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#D4A017" }} />
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--teal)" }} />
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#C44B2A" }} />
          </div>

          <h2 style={{
            fontFamily: "var(--font-display)", fontWeight: 700,
            fontSize: "clamp(36px, 5.5vw, 80px)", lineHeight: 0.92,
            letterSpacing: "-2px", color: "white", marginBottom: "28px",
          }}>
            Ready to be part<br />
            <span style={{ color: "var(--gold)", fontStyle: "italic" }}>of the conversation?</span>
          </h2>

          <p style={{ fontSize: "15px", lineHeight: 1.85, color: "rgba(214,207,194,0.55)", fontWeight: 300, maxWidth: "420px", marginBottom: "44px" }}>
            Whether you want to listen, partner, attend an event, or collaborate — there's a place for you in the Cabin Tea ecosystem.
          </p>

          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
            <Link to="/episodes" style={{
              display: "inline-block", padding: "14px 36px",
              background: "var(--gold)", color: "var(--dark)",
              textDecoration: "none", fontSize: "10px", letterSpacing: "3px",
              fontWeight: 700, borderRadius: "2px", transition: "opacity 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >LISTEN NOW</Link>

            <Link to="/partner" style={{
              display: "inline-block", padding: "14px 36px",
              border: "1px solid rgba(196,164,78,0.35)", color: "rgba(214,207,194,0.7)",
              textDecoration: "none", fontSize: "10px", letterSpacing: "3px",
              fontWeight: 600, borderRadius: "2px", transition: "border-color 0.2s, color 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--gold)"; e.currentTarget.style.color = "white"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(196,164,78,0.35)"; e.currentTarget.style.color = "rgba(214,207,194,0.7)"; }}
            >BECOME A PARTNER</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
