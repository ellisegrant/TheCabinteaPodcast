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

/* ─────────────────────────────────────────────────────
   ADINKRA SYMBOLS — drawn as real SVG paths
   Sankofa: "go back and get it" — the bird looking back
   Used by the African diaspora to symbolise reconnection
   with African roots. Perfect for Cabin Tea's mission.
───────────────────────────────────────────────────── */
function SankofaBird({ size = 60, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Stylised Sankofa bird — body forward, head looking back */}
      <ellipse cx="52" cy="62" rx="22" ry="14" stroke={color} strokeWidth="3" fill="none"/>
      {/* Tail feathers */}
      <path d="M30 62 Q18 55 14 45 Q22 50 30 56" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M30 65 Q16 65 12 58 Q20 60 30 62" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      {/* Neck curving back */}
      <path d="M52 48 Q58 30 70 28 Q78 26 80 34 Q82 42 74 46 Q64 50 52 48Z" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Eye */}
      <circle cx="76" cy="33" r="3" fill={color}/>
      {/* Egg (heart/soul) beneath the bird — traditional Sankofa element */}
      <ellipse cx="50" cy="80" rx="8" ry="10" stroke={color} strokeWidth="2" fill="none"/>
      {/* Legs */}
      <line x1="45" y1="74" x2="42" y2="88" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <line x1="55" y1="74" x2="58" y2="88" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function AdinkraHene({ size = 48, color = "currentColor" }) {
  /* Adinkrahene — concentric circles — symbol of authority, leadership, charisma */
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="40" stroke={color} strokeWidth="3" fill="none"/>
      <circle cx="50" cy="50" r="26" stroke={color} strokeWidth="3" fill="none"/>
      <circle cx="50" cy="50" r="12" stroke={color} strokeWidth="3" fill="none"/>
      <circle cx="50" cy="50" r="4" fill={color}/>
    </svg>
  );
}

function Funtunfunefu({ size = 48, color = "currentColor" }) {
  /* Funtunfunefu Denkyemfunefu — two-headed crocodile sharing a stomach
     Symbol of unity in diversity — perfect for Diaspora reunification */
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <ellipse cx="50" cy="50" rx="18" ry="12" stroke={color} strokeWidth="2.5" fill="none"/>
      {/* Left head */}
      <path d="M32 50 Q20 40 14 44 Q10 50 14 56 Q20 60 32 50Z" stroke={color} strokeWidth="2.5" fill="none"/>
      {/* Right head */}
      <path d="M68 50 Q80 40 86 44 Q90 50 86 56 Q80 60 68 50Z" stroke={color} strokeWidth="2.5" fill="none"/>
      {/* Top tail */}
      <path d="M50 38 Q50 20 42 16 Q50 24 58 16 Q50 20 50 38" stroke={color} strokeWidth="2" fill="none"/>
      {/* Bottom tail */}
      <path d="M50 62 Q50 80 42 84 Q50 76 58 84 Q50 80 50 62" stroke={color} strokeWidth="2" fill="none"/>
    </svg>
  );
}

/* ── Wax print / African textile pattern background ── */
function WaxPattern({ opacity = 0.06, color = "#C4A44E" }) {
  const id = Math.random().toString(36).substr(2, 5);
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      <svg width="100%" height="100%" style={{ opacity }}>
        <defs>
          <pattern id={`wax-${id}`} x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            {/* Diamond lattice — wax print inspired */}
            <rect x="0" y="0" width="80" height="80" fill="none"/>
            <path d="M40 0 L80 40 L40 80 L0 40 Z" stroke={color} strokeWidth="1" fill="none"/>
            <circle cx="40" cy="40" r="8" stroke={color} strokeWidth="1" fill="none"/>
            <circle cx="0" cy="0" r="4" stroke={color} strokeWidth="0.8" fill="none"/>
            <circle cx="80" cy="0" r="4" stroke={color} strokeWidth="0.8" fill="none"/>
            <circle cx="0" cy="80" r="4" stroke={color} strokeWidth="0.8" fill="none"/>
            <circle cx="80" cy="80" r="4" stroke={color} strokeWidth="0.8" fill="none"/>
            {/* Inner diamonds */}
            <path d="M40 24 L56 40 L40 56 L24 40 Z" stroke={color} strokeWidth="0.8" fill="none"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#wax-${id})`}/>
      </svg>
    </div>
  );
}

/* ── Terracotta stripe divider — inspired by African textile bands ── */
function TextileBand() {
  return (
    <div style={{ display: "flex", height: "8px", width: "100%", overflow: "hidden" }}>
      {["#C4A44E","#2C8C7C","#B5541E","#C4A44E","#152A2F","#C4A44E","#B5541E","#2C8C7C","#C4A44E","#152A2F","#C4A44E","#2C8C7C","#B5541E","#C4A44E","#152A2F","#2C8C7C","#C4A44E"].map((c, i) => (
        <div key={i} style={{ background: c, flex: 1 }} />
      ))}
    </div>
  );
}

const pillars = [
  { num: "01", title: "Unite", adinkra: <Funtunfunefu size={40} color="rgba(196,164,78,0.7)"/>, proverb: "Funtunfunefu Denkyemfunefu", meaning: "Unity in diversity", body: "Building a cultural ecosystem that brings together people and enterprises of the African maritime industry — across the continent and the Diaspora." },
  { num: "02", title: "Invest", adinkra: <AdinkraHene size={40} color="rgba(196,164,78,0.7)"/>, proverb: "Adinkrahene", meaning: "Authority & leadership", body: "Creating real economic pathways between Africa and the Diaspora by facilitating cultural and industry exchange, collaboration, and mutual growth." },
  { num: "03", title: "Celebrate", adinkra: <SankofaBird size={40} color="rgba(196,164,78,0.7)"/>, proverb: "Sankofa", meaning: "Go back and get it", body: "Spotlighting emerging trends, elevating local insights, and amplifying African maritime culture to the world with intention and pride." },
];

const ecosystem = [
  { tag: "PODCAST", name: "Cabin Tea", desc: "A live conversation series where ocean professionals come together over a carefully chosen cup of tea. Recorded live in Accra, heard everywhere.", to: "/episodes", accent: "var(--teal)" },
  { tag: "GATHERING", name: "Afrocean", desc: "A dynamic gathering that unites individuals of the African Diaspora, fostering a deep connection with their maritime heritage through cultural exchange.", to: "/afrocean", accent: "#C4A44E" },
  { tag: "MEDIA HUB", name: "Anchorage", desc: "A centralized media hub curating personalized maritime content and reshaping how the Diaspora engages with the maritime world.", to: "/anchorage", accent: "var(--teal)" },
  { tag: "AGENCY", name: "Creative Agency", desc: "Connecting brands to the vibrancy, innovation, and commercial power of African maritime culture through strategy, creativity, and immersive experiences.", to: "/creative-agency", accent: "#B5541E" },
];

/* African & Diaspora people, not generic ocean stock */
const IMGS = {
  hero:     "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=1600&q=85",
  community:"https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&q=80",
  market:   "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=900&q=80",
  people:   "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=900&q=80",
  diaspora: "https://images.unsplash.com/photo-1504439904031-93ded9f93e4e?w=900&q=80",
  host:     "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=900&q=80",
  cta:      "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1600&q=80",
};

/* ── Terracotta / earth colour palette (warmer than brand defaults) ── */
const TERRA = "#B5541E";
const CLAY  = "#8B3A10";
const EARTH = "#2A1A0E";
const WARM  = "#1E2D1A";

export default function About() {
  const [heroRef,    heroVis]    = useReveal(0.05);
  const [sankofaRef, sankofaVis] = useReveal(0.08);
  const [missionRef, missionVis] = useReveal(0.1);
  const [pillarsRef, pillarsVis] = useReveal(0.1);
  const [ecoRef,     ecoVis]     = useReveal(0.1);
  const [hostRef,    hostVis]    = useReveal(0.1);
  const [ctaRef,     ctaVis]     = useReveal(0.1);

  return (
    <div style={{ minHeight: "100vh", background: "var(--dark)", color: "var(--cream)", overflowX: "hidden" }}>
      <Navbar />

      {/* ══════════════════════════════════════════════════
          HERO — warm terracotta sky, Diaspora people image
          NOT a cold ocean. This is about PEOPLE and ROOTS.
      ══════════════════════════════════════════════════ */}
      <section ref={heroRef} style={{
        minHeight: "100vh", position: "relative", overflow: "hidden",
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
      }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img src={IMGS.hero} alt="African diaspora community"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }} />
          {/* Warm terracotta-to-dark overlay — not cold blue */}
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${EARTH} 0%, rgba(30,18,10,0.75) 45%, rgba(30,18,10,0.2) 100%)` }} />
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(100deg, rgba(30,18,10,0.9) 35%, transparent 70%)` }} />
          {/* Warm amber tint wash */}
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 70% 30%, rgba(181,84,30,0.15) 0%, transparent 55%)" }} />
        </div>

        <WaxPattern opacity={0.04} color="#C4A44E" />
        <div className="ct-grain" style={{ zIndex: 1 }} />

        {/* Sankofa bird top right — cultural watermark */}
        <div style={{
          position: "absolute", top: "120px", right: "5vw", zIndex: 2,
          opacity: heroVis ? 0.12 : 0, transition: "opacity 1.2s 0.5s",
          transform: "scale(3)",
        }}>
          <SankofaBird size={80} color="#C4A44E" />
        </div>

        <div style={{ position: "relative", zIndex: 3, padding: "80px 5vw 100px" }}>
          {/* Eyebrow — Sankofa proverb */}
          <div style={{
            display: "flex", alignItems: "center", gap: "14px", marginBottom: "28px",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(14px)",
            transition: "opacity 0.7s 0.1s, transform 0.7s 0.1s",
          }}>
            <SankofaBird size={20} color={`rgba(196,164,78,0.8)`} />
            <span style={{ fontSize: "10px", letterSpacing: "4px", color: "rgba(196,164,78,0.8)", fontWeight: 500 }}>
              SANKOFA — "GO BACK AND GET IT"
            </span>
          </div>

          <h1 style={{
            fontFamily: "var(--font-display)", fontWeight: 700,
            fontSize: "clamp(56px, 10vw, 140px)",
            lineHeight: 0.87, letterSpacing: "-4px",
            color: "white", margin: 0,
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

          <div style={{
            display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
            gap: "60px", alignItems: "end",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(16px)",
            transition: "opacity 0.7s 0.45s, transform 0.7s 0.45s",
          }}>
            <p style={{
              fontSize: "clamp(15px, 1.5vw, 18px)", lineHeight: 1.85,
              color: "rgba(214,207,194,0.7)", fontWeight: 300,
              borderLeft: `3px solid ${TERRA}`, paddingLeft: "20px",
              maxWidth: "460px",
            }}>
              A 360° maritime media and industry network built for the African community and Diaspora — rooted in heritage, powered by the next generation.
            </p>

            {/* Three community photos — polaroid style */}
            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
              {[
                { src: IMGS.community, angle: -3 },
                { src: IMGS.market,    angle: 0  },
                { src: IMGS.diaspora,  angle: 3  },
              ].map((img, i) => (
                <div key={i} style={{
                  width: "90px", flexShrink: 0,
                  background: "rgba(255,255,255,0.08)",
                  padding: "5px 5px 18px",
                  transform: `rotate(${img.angle}deg)`,
                  border: "1px solid rgba(196,164,78,0.2)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                }}>
                  <img src={img.src} alt=""
                    style={{ width: "100%", height: "110px", objectFit: "cover", display: "block" }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Textile band divider */}
      <TextileBand />

      {/* ══════════════════════════════════════════════════
          SANKOFA SECTION — the philosophy explained
          Warm terracotta background — earth, not ocean
      ══════════════════════════════════════════════════ */}
      <section ref={sankofaRef} style={{
        background: EARTH,
        padding: "100px 5vw",
        position: "relative", overflow: "hidden",
      }}>
        <WaxPattern opacity={0.07} color="#C4A44E" />

        <div style={{ maxWidth: "1300px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>

            {/* Left — giant Sankofa symbol */}
            <div style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: "32px",
              opacity: sankofaVis ? 1 : 0, transform: sankofaVis ? "none" : "translateX(-24px)",
              transition: "opacity 0.9s, transform 0.9s",
            }}>
              {/* Large decorative Sankofa */}
              <div style={{
                width: "280px", height: "280px",
                border: `2px solid rgba(196,164,78,0.2)`,
                borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                position: "relative",
                background: "radial-gradient(circle, rgba(181,84,30,0.08) 0%, transparent 70%)",
              }}>
                {/* Outer ring detail */}
                <div style={{
                  position: "absolute", inset: "12px",
                  border: `1px solid rgba(196,164,78,0.1)`,
                  borderRadius: "50%",
                }} />
                <SankofaBird size={160} color="rgba(196,164,78,0.65)" />
              </div>

              {/* Adinkra row */}
              <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
                <div style={{ textAlign: "center" }}>
                  <AdinkraHene size={36} color="rgba(196,164,78,0.5)" />
                  <span style={{ fontSize: "9px", color: "rgba(196,164,78,0.4)", letterSpacing: "1.5px", display: "block", marginTop: "6px" }}>LEADERSHIP</span>
                </div>
                <div style={{ textAlign: "center" }}>
                  <SankofaBird size={36} color="rgba(196,164,78,0.5)" />
                  <span style={{ fontSize: "9px", color: "rgba(196,164,78,0.4)", letterSpacing: "1.5px", display: "block", marginTop: "6px" }}>SANKOFA</span>
                </div>
                <div style={{ textAlign: "center" }}>
                  <Funtunfunefu size={36} color="rgba(196,164,78,0.5)" />
                  <span style={{ fontSize: "9px", color: "rgba(196,164,78,0.4)", letterSpacing: "1.5px", display: "block", marginTop: "6px" }}>UNITY</span>
                </div>
              </div>
            </div>

            {/* Right — Sankofa philosophy + brand mission */}
            <div style={{
              opacity: sankofaVis ? 1 : 0, transform: sankofaVis ? "none" : "translateX(24px)",
              transition: "opacity 0.9s 0.2s, transform 0.9s 0.2s",
            }}>
              <span style={{ fontSize: "10px", letterSpacing: "4px", color: TERRA, display: "block", marginBottom: "20px" }}>
                THE PHILOSOPHY
              </span>

              <h2 style={{
                fontFamily: "var(--font-display)", fontWeight: 700,
                fontSize: "clamp(32px, 4vw, 56px)", lineHeight: 0.95,
                letterSpacing: "-1.5px", color: "white", marginBottom: "28px",
              }}>
                "Se wo were fi na<br />
                <span style={{ color: "var(--gold)", fontStyle: "italic" }}>wosankofa a yenkyi."</span>
              </h2>

              <p style={{ fontSize: "14px", color: "rgba(196,164,78,0.6)", marginBottom: "28px", letterSpacing: "1px", fontStyle: "italic" }}>
                "It is not wrong to go back for what you forgot." — Akan Proverb, Ghana
              </p>

              <p style={{ fontSize: "16px", lineHeight: 1.9, color: "rgba(214,207,194,0.6)", fontWeight: 300, maxWidth: "420px", marginBottom: "24px" }}>
                The Sankofa bird flies forward while looking back — it carries the wisdom of the past into the future. This is the spirit of Cabin Tea: a platform for the African Diaspora to reconnect with their maritime heritage and carry it forward into the blue economy of tomorrow.
              </p>

              <p style={{ fontSize: "16px", lineHeight: 1.9, color: "rgba(214,207,194,0.55)", fontWeight: 300, maxWidth: "420px" }}>
                With more than half of Africa's population under 25, a renaissance of maritime culture, policy, and enterprise is underway. Cabin Tea captures this moment — and the Diaspora is at the heart of it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Textile band divider */}
      <TextileBand />

      {/* ══════════════════════════════════════════════════
          MISSION — split image, warm dark forest
      ══════════════════════════════════════════════════ */}
      <section ref={missionRef} style={{
        background: WARM, overflow: "hidden", position: "relative",
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "620px" }}>

          {/* Left image — African people */}
          <div style={{
            position: "relative", overflow: "hidden",
            opacity: missionVis ? 1 : 0, transform: missionVis ? "none" : "translateX(-20px)",
            transition: "opacity 1s, transform 1s",
          }}>
            <img src={IMGS.market} alt="African maritime community"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", minHeight: "620px" }} />
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to right, rgba(30,45,26,0.05), rgba(30,45,26,0.7) 100%)` }} />

            {/* Floating stat card — editorial */}
            <div style={{
              position: "absolute", bottom: "40px", left: "28px",
              background: TERRA, color: "white",
              padding: "20px 24px", maxWidth: "220px",
            }}>
              <span style={{
                fontFamily: "var(--font-display)", fontSize: "52px", fontWeight: 700,
                color: "white", display: "block", lineHeight: 1,
              }}>50%+</span>
              <span style={{ fontSize: "11px", lineHeight: 1.6, display: "block", marginTop: "8px", color: "rgba(255,255,255,0.8)" }}>
                of Africa under 25. The blue economy renaissance belongs to this generation.
              </span>
            </div>
          </div>

          {/* Right — mission content */}
          <div style={{
            padding: "80px 5vw 80px 56px",
            display: "flex", flexDirection: "column", justifyContent: "center",
            position: "relative", overflow: "hidden",
            opacity: missionVis ? 1 : 0, transform: missionVis ? "none" : "translateX(20px)",
            transition: "opacity 1s 0.15s, transform 1s 0.15s",
          }}>
            <WaxPattern opacity={0.05} color="#C4A44E" />
            <div style={{ position: "relative", zIndex: 1 }}>
              <span style={{ fontSize: "10px", letterSpacing: "4px", color: "var(--teal)", display: "block", marginBottom: "20px" }}>OUR MISSION</span>

              <h2 style={{
                fontFamily: "var(--font-display)", fontWeight: 700,
                fontSize: "clamp(28px, 3.5vw, 46px)", lineHeight: 1.05,
                letterSpacing: "-1px", color: "white", marginBottom: "28px",
              }}>
                A Cultural Ecosystem That Unites, Invests in, and Celebrates African Maritime.
              </h2>

              <p style={{ fontSize: "15px", lineHeight: 1.95, color: "rgba(214,207,194,0.6)", fontWeight: 300, maxWidth: "420px", marginBottom: "20px" }}>
                Our mission is to foster a strong cultural connection and enhance economic opportunities between Africa and the Diaspora — facilitating exchange, collaboration, and mutual growth.
              </p>

              <p style={{ fontSize: "15px", lineHeight: 1.95, color: "rgba(214,207,194,0.5)", fontWeight: 300, maxWidth: "420px", marginBottom: "36px" }}>
                We strive to create avenues for economic empowerment and sustainable development that benefit both the African continent and Diaspora communities worldwide.
              </p>

              {/* Stats row */}
              <div style={{ display: "flex", gap: "32px", flexWrap: "wrap", borderTop: `1px solid rgba(181,84,30,0.3)`, paddingTop: "28px" }}>
                {[
                  { val: "360°", label: "Media Network" },
                  { val: "Global", label: "Diaspora Reach" },
                  { val: "Africa", label: "Next Generation" },
                ].map(s => (
                  <div key={s.label}>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: "26px", fontWeight: 700, color: "white", display: "block", lineHeight: 1 }}>{s.val}</span>
                    <span style={{ fontSize: "9px", letterSpacing: "2.5px", color: `${TERRA}`, display: "block", marginTop: "5px" }}>{s.label.toUpperCase()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Textile band */}
      <TextileBand />

      {/* ══════════════════════════════════════════════════
          THREE PILLARS — terracotta earth background
          with Adinkra symbols and Akan proverbs
      ══════════════════════════════════════════════════ */}
      <section ref={pillarsRef} style={{
        padding: "100px 5vw", background: EARTH,
        position: "relative", overflow: "hidden",
      }}>
        <WaxPattern opacity={0.07} color={TERRA} />

        <div style={{ maxWidth: "1300px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{
            marginBottom: "72px",
            opacity: pillarsVis ? 1 : 0, transform: pillarsVis ? "none" : "translateY(16px)",
            transition: "opacity 0.6s, transform 0.6s",
          }}>
            <span style={{ fontSize: "10px", letterSpacing: "4px", color: TERRA, display: "block", marginBottom: "14px" }}>WHAT DRIVES US</span>
            <h2 style={{
              fontFamily: "var(--font-display)", fontWeight: 700, fontStyle: "italic",
              fontSize: "clamp(32px, 4vw, 56px)", color: "white", lineHeight: 1, margin: 0,
            }}>Three words. One mission.</h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {pillars.map((p, i) => (
              <div key={p.num} style={{
                display: "grid", gridTemplateColumns: "80px 60px 220px 1fr",
                gap: "40px", padding: "52px 0",
                borderBottom: `1px solid rgba(181,84,30,0.2)`,
                alignItems: "center",
                opacity: pillarsVis ? 1 : 0, transform: pillarsVis ? "none" : "translateY(20px)",
                transition: `opacity 0.6s ${0.1 + i * 0.15}s, transform 0.6s ${0.1 + i * 0.15}s`,
              }}>
                {/* Number watermark */}
                <span style={{
                  fontFamily: "var(--font-display)", fontSize: "64px", fontWeight: 700, fontStyle: "italic",
                  color: `rgba(181,84,30,0.25)`, lineHeight: 1,
                }}>{p.num}</span>

                {/* Adinkra symbol */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                  {p.adinkra}
                </div>

                {/* Word + proverb */}
                <div>
                  <h3 style={{
                    fontFamily: "var(--font-display)", fontSize: "clamp(36px, 4vw, 52px)",
                    fontWeight: 700, color: "white", lineHeight: 1, margin: "0 0 8px 0",
                    letterSpacing: "-1px",
                  }}>{p.title}</h3>
                  <span style={{ fontSize: "10px", color: TERRA, letterSpacing: "1.5px", display: "block", marginBottom: "2px" }}>{p.proverb}</span>
                  <span style={{ fontSize: "10px", color: "rgba(196,164,78,0.5)", letterSpacing: "1px", fontStyle: "italic" }}>"{p.meaning}"</span>
                </div>

                {/* Body */}
                <p style={{ fontSize: "15px", lineHeight: 1.9, color: "rgba(214,207,194,0.5)", fontWeight: 300, margin: 0 }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Textile band */}
      <TextileBand />

      {/* ══════════════════════════════════════════════════
          ECOSYSTEM — dark with terracotta accents
      ══════════════════════════════════════════════════ */}
      <section ref={ecoRef} style={{
        background: "var(--dark)", padding: "100px 5vw",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ maxWidth: "1300px", margin: "0 auto" }}>
          <div style={{
            display: "flex", alignItems: "flex-end", justifyContent: "space-between",
            flexWrap: "wrap", gap: "20px", marginBottom: "56px",
            opacity: ecoVis ? 1 : 0, transform: ecoVis ? "none" : "translateY(16px)",
            transition: "opacity 0.6s, transform 0.6s",
          }}>
            <div>
              <span style={{ fontSize: "10px", letterSpacing: "4px", color: TERRA, display: "block", marginBottom: "12px" }}>THE ECOSYSTEM</span>
              <h2 style={{
                fontFamily: "var(--font-display)", fontWeight: 700, fontStyle: "italic",
                fontSize: "clamp(28px, 3.5vw, 48px)", color: "white", lineHeight: 1, margin: 0,
              }}>More than a podcast.</h2>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px", background: `rgba(181,84,30,0.08)` }}>
            {ecosystem.map((item, i) => (
              <Link key={item.name} to={item.to} style={{
                textDecoration: "none", background: "var(--dark)",
                padding: "52px 48px", display: "flex", flexDirection: "column",
                transition: "background 0.3s",
                opacity: ecoVis ? 1 : 0, transform: ecoVis ? "none" : "translateY(24px)",
                transitionProperty: "background, opacity, transform",
                transitionDuration: "0.3s, 0.6s, 0.6s",
                transitionDelay: `0s, ${0.1 + i * 0.1}s, ${0.1 + i * 0.1}s`,
                position: "relative", overflow: "hidden",
              }}
                onMouseEnter={e => e.currentTarget.style.background = `rgba(181,84,30,0.06)`}
                onMouseLeave={e => e.currentTarget.style.background = "var(--dark)"}
              >
                <WaxPattern opacity={0.025} color={item.accent} />
                <div style={{ position: "relative", zIndex: 1, flex: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
                    <span style={{
                      fontSize: "9px", letterSpacing: "2.5px", fontWeight: 700,
                      color: item.accent,
                      background: `${item.accent}18`,
                      padding: "5px 12px", borderRadius: "1px",
                    }}>{item.tag}</span>
                    <span style={{ color: "rgba(196,164,78,0.3)", fontSize: "18px" }}>→</span>
                  </div>
                  <h3 style={{
                    fontFamily: "var(--font-display)", fontSize: "clamp(26px, 2.5vw, 38px)",
                    fontWeight: 700, color: "white", margin: "0 0 16px 0", letterSpacing: "-0.5px",
                  }}>{item.name}</h3>
                  <div style={{ width: "28px", height: "2px", background: item.accent, marginBottom: "18px" }} />
                  <p style={{ fontSize: "14px", lineHeight: 1.85, color: "rgba(214,207,194,0.48)", fontWeight: 300, flex: 1, marginBottom: "28px" }}>{item.desc}</p>
                  <span style={{ fontSize: "10px", letterSpacing: "2px", color: "rgba(181,84,30,0.7)", fontWeight: 600 }}>EXPLORE →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Textile band */}
      <TextileBand />

      {/* ══════════════════════════════════════════════════
          HOST — warm terracotta, editorial
      ══════════════════════════════════════════════════ */}
      <section ref={hostRef} style={{
        background: EARTH, overflow: "hidden", position: "relative",
      }}>
        <WaxPattern opacity={0.05} color={TERRA} />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", position: "relative", zIndex: 1 }}>
          <div style={{
            position: "relative", minHeight: "640px",
            opacity: hostVis ? 1 : 0, transform: hostVis ? "none" : "translateX(-20px)",
            transition: "opacity 0.9s, transform 0.9s",
          }}>
            <img src={IMGS.host} alt="Host"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to right, rgba(30,18,10,0.05), rgba(30,18,10,0.6) 100%)` }} />

            {/* Terracotta tag */}
            <div style={{ position: "absolute", top: "36px", left: "28px", background: TERRA, padding: "8px 16px" }}>
              <span style={{ fontSize: "9px", letterSpacing: "2.5px", fontWeight: 700, color: "white" }}>HOST &amp; CREATOR</span>
            </div>

            {/* Sankofa watermark bottom */}
            <div style={{ position: "absolute", bottom: "24px", right: "24px", opacity: 0.2 }}>
              <SankofaBird size={64} color="white" />
            </div>
          </div>

          <div style={{
            padding: "80px 5vw 80px 56px",
            display: "flex", flexDirection: "column", justifyContent: "center",
            opacity: hostVis ? 1 : 0, transform: hostVis ? "none" : "translateX(20px)",
            transition: "opacity 0.9s 0.2s, transform 0.9s 0.2s",
          }}>
            <span style={{ fontSize: "10px", letterSpacing: "4px", color: TERRA, display: "block", marginBottom: "20px" }}>YOUR HOST</span>

            <h2 style={{
              fontFamily: "var(--font-display)", fontWeight: 700,
              fontSize: "clamp(40px, 5vw, 72px)", lineHeight: 0.9,
              letterSpacing: "-2px", color: "white", marginBottom: "10px",
            }}>Your<br />Name</h2>

            <p style={{ fontSize: "11px", letterSpacing: "2.5px", color: "var(--gold)", marginBottom: "36px" }}>
              HOST &amp; CREATOR · CABIN TEA
            </p>

            {/* Textile stripe divider */}
            <div style={{ display: "flex", height: "4px", width: "120px", marginBottom: "32px", overflow: "hidden" }}>
              {[TERRA, "var(--teal)", "var(--gold)", TERRA, "var(--teal)"].map((c, i) => (
                <div key={i} style={{ flex: 1, background: c }} />
              ))}
            </div>

            <p style={{
              fontSize: "16px", lineHeight: 1.95,
              color: "rgba(214,207,194,0.55)", fontWeight: 300,
              marginBottom: "20px", maxWidth: "400px",
              fontFamily: "var(--font-display)", fontStyle: "italic",
            }}>
              Add your bio here — your background, your connection to the ocean, and what drove you to create Cabin Tea.
            </p>
            <p style={{ fontSize: "14px", lineHeight: 1.85, color: "rgba(214,207,194,0.4)", fontWeight: 300, maxWidth: "400px", marginBottom: "40px" }}>
              This is your moment to make the audience feel like they already know you before the show even starts. Your story is the anchor of this entire brand.
            </p>

            <Link to="/about-host" style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              padding: "13px 32px", background: TERRA, color: "white",
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

      {/* Textile band */}
      <TextileBand />

      {/* ══════════════════════════════════════════════════
          CTA — Accra, warm, roots + future
      ══════════════════════════════════════════════════ */}
      <section ref={ctaRef} style={{
        position: "relative", overflow: "hidden",
        minHeight: "480px", display: "flex", alignItems: "center",
      }}>
        <img src={IMGS.cta} alt="Accra"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(110deg, ${EARTH} 40%, rgba(181,84,30,0.5) 100%)` }} />
        <WaxPattern opacity={0.04} color="#C4A44E" />
        <div className="ct-grain" style={{ zIndex: 1 }} />

        {/* Sankofa watermark right */}
        <div style={{ position: "absolute", right: "5vw", top: "50%", transform: "translateY(-50%)", opacity: 0.06, zIndex: 1 }}>
          <SankofaBird size={320} color="white" />
        </div>

        <div style={{
          position: "relative", zIndex: 2, padding: "80px 5vw", maxWidth: "720px",
          opacity: ctaVis ? 1 : 0, transform: ctaVis ? "none" : "translateY(20px)",
          transition: "opacity 0.8s, transform 0.8s",
        }}>
          {/* Textile mini stripe */}
          <div style={{ display: "flex", height: "4px", width: "80px", marginBottom: "32px", overflow: "hidden" }}>
            {[TERRA, "var(--teal)", "var(--gold)", TERRA].map((c, i) => (
              <div key={i} style={{ flex: 1, background: c }} />
            ))}
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
              border: `1px solid rgba(181,84,30,0.5)`, color: "rgba(214,207,194,0.75)",
              textDecoration: "none", fontSize: "10px", letterSpacing: "3px",
              fontWeight: 600, borderRadius: "2px", transition: "border-color 0.2s, color 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = TERRA; e.currentTarget.style.color = "white"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(181,84,30,0.5)"; e.currentTarget.style.color = "rgba(214,207,194,0.75)"; }}
            >BECOME A PARTNER</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
