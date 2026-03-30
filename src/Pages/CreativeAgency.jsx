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

/* ═══════════════════════════════════════
   ADINKRA SYMBOLS
═══════════════════════════════════════ */

/* Dwennimmen — strength with humility — perfect for an agency */
function Dwennimmen({ size = 56, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="12" stroke={color} strokeWidth="2.5" fill="none"/>
      {/* Four ram horns spiralling outward */}
      <path d="M50 38 Q50 20 38 16 Q26 12 22 24 Q18 36 30 40" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M62 50 Q80 50 84 38 Q88 26 76 22 Q64 18 60 30" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M50 62 Q50 80 62 84 Q74 88 78 76 Q82 64 70 60" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M38 50 Q20 50 16 62 Q12 74 24 78 Q36 82 40 70" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

/* Nkyinkyim — adaptability */
function Nkyinkyim({ size = 56, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <path d="M10 70 Q25 30 40 50 Q55 70 70 30 Q85 10 90 30"
        stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="10" cy="70" r="4" fill={color}/>
      <circle cx="40" cy="50" r="4" fill={color}/>
      <circle cx="70" cy="30" r="4" fill={color}/>
      <circle cx="90" cy="30" r="4" fill={color}/>
    </svg>
  );
}

/* Adinkrahene — authority, leadership */
function Adinkrahene({ size = 56, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="40" stroke={color} strokeWidth="2.5" fill="none"/>
      <circle cx="50" cy="50" r="26" stroke={color} strokeWidth="2.5" fill="none"/>
      <circle cx="50" cy="50" r="12" stroke={color} strokeWidth="2.5" fill="none"/>
      <circle cx="50" cy="50" r="4" fill={color}/>
    </svg>
  );
}

/* Sankofa */
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

/* ═══════════════════════════════════════
   DESIGN COMPONENTS
═══════════════════════════════════════ */
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

/* ═══════════════════════════════════════
   PALETTE
═══════════════════════════════════════ */
const EARTH = "#2A1A0E";
const WARM  = "#1E2D1A";
const TERRA = "#B5541E";
const GOLD  = "#C4A44E";
const TEAL  = "#2C8C7C";
const DEEP  = "#152A2F";

/* ═══════════════════════════════════════
   IMAGE PATHS — drop into /public/images/agency/
═══════════════════════════════════════ */
const IMGS = {
  hero:     "/creativeagency.jpg",
  context:  "/images/agency/context.jpg",
  create:   "/images/agency/create.jpg",
  amplify:  "/images/agency/amplify.jpg",
  cta:      "/maritimeheritage.jpg",
};

const services = [
  {
    num: "01",
    adinkra: <Dwennimmen size={40} color={`rgba(196,164,78,0.7)`}/>,
    symbol: "Dwennimmen",
    meaning: "Strength with humility",
    title: "CONTEXT",
    headline: "Strategy & Insight",
    body: "We start by deeply understanding your objectives and audience. Our strategy team conducts rigorous analysis, identifies touchpoints, and develops insights to create campaigns that resonate globally.",
  },
  {
    num: "02",
    adinkra: <Nkyinkyim size={40} color={`rgba(196,164,78,0.7)`}/>,
    symbol: "Nkyinkyim",
    meaning: "Adaptability & dynamism",
    title: "CREATE",
    headline: "Craft & Campaign",
    body: "Our team blends creativity, strategic thinking, cultural and industry insight to craft compelling campaigns. From concept to execution, we ensure your brand authentically reflects the richness and diversity of African culture.",
  },
  {
    num: "03",
    adinkra: <Adinkrahene size={40} color={`rgba(196,164,78,0.7)`}/>,
    symbol: "Adinkrahene",
    meaning: "Leadership & authority",
    title: "AMPLIFY",
    headline: "Impact & Reach",
    body: "Impact matters. We measure meaningful outcomes, ensuring campaigns deliver tangible results, expand reach, and deepen connections with audiences across the African continent and Diaspora.",
  },
];

const advisory = [
  {
    num: "01", title: "TECHNOLOGY",
    body: "Our team works closely with clients to design tailored technology immersions, connecting you with leading global innovation hubs, startups, and tech leaders to uncover opportunities for partnerships, innovation, and growth.",
    accent: TERRA,
  },
  {
    num: "02", title: "CAREER & EDUCATION",
    body: "We collaborate with partners to craft curated experiences, providing access to maritime organisations, experts, and cultural leaders — helping partners gain insights, build networks, and explore collaborations in Africa's most vibrant maritime industries.",
    accent: GOLD,
  },
  {
    num: "03", title: "BLUE ECONOMY INVESTMENT",
    body: "Our experts guide clients through high-level blue economy investment immersions, arranging meetings with organisations, executives, and investors to identify market opportunities, strategic partnerships, and actionable business outcomes.",
    accent: TEAL,
  },
];

const pillars = [
  { title: "Cultural Authority", body: "The leading voice in Africa's maritime industry culture.", accent: TERRA },
  { title: "Network Access",    body: "Direct connections to experts, industries, and business leaders.", accent: GOLD },
  { title: "Strategic Impact",  body: "Campaigns and experiences with measurable ROI.", accent: TEAL },
  { title: "Tailored Solutions",body: "Every engagement is customized to your brand and objectives.", accent: TERRA },
];

export default function CreativeAgency() {
  const [heroRef,     heroVis]     = useReveal(0.05);
  const [missionRef,  missionVis]  = useReveal(0.1);
  const [servicesRef, servicesVis] = useReveal(0.1);
  const [advisoryRef, advisoryVis] = useReveal(0.1);
  const [whyRef,      whyVis]      = useReveal(0.1);
  const [ctaRef,      ctaVis]      = useReveal(0.1);

  return (
    <div style={{ minHeight: "100vh", background: DEEP, color: "var(--cream)", overflowX: "hidden" }}>
      <Navbar />

      {/* ══════════════════════════════════════════════════════
          HERO — full bleed, warm earth, agency energy
      ══════════════════════════════════════════════════════ */}
      <section ref={heroRef} style={{
        minHeight: "100vh", position: "relative", overflow: "hidden",
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
      }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img src={IMGS.hero} alt="Creative Agency"
            style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${EARTH} 0%, rgba(42,26,14,0.82) 40%, rgba(42,26,14,0.25) 100%)` }} />
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(110deg, rgba(42,26,14,0.92) 38%, transparent 65%)` }} />
          <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 75% 40%, rgba(196,164,78,0.08) 0%, transparent 55%)` }} />
        </div>

        <WaxBg opacity={0.04} color={GOLD} />
        <div className="ct-grain" style={{ zIndex: 1 }} />

        {/* Adinkrahene watermark */}
        <div style={{
          position: "absolute", top: "100px", right: "3vw", zIndex: 2,
          opacity: heroVis ? 0.08 : 0, transition: "opacity 1.5s 0.5s",
          transform: "scale(3.5)",
        }}>
          <Adinkrahene size={80} color={GOLD} />
        </div>

        <div style={{ position: "relative", zIndex: 3, padding: "80px 5vw 100px" }}>

          {/* Eyebrow */}
          <div style={{
            display: "flex", alignItems: "center", gap: "14px", marginBottom: "32px",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(12px)",
            transition: "opacity 0.7s 0.1s, transform 0.7s 0.1s",
          }}>
            <Adinkrahene size={18} color={`rgba(196,164,78,0.8)`} />
            <span style={{ fontSize: "10px", letterSpacing: "4px", color: `rgba(196,164,78,0.8)`, fontWeight: 500 }}>
              CABIN TEA · CREATIVE AGENCY
            </span>
          </div>

          <h1 style={{
            fontFamily: "var(--font-display)", fontWeight: 700,
            fontSize: "clamp(64px, 11vw, 160px)",
            lineHeight: 0.86, letterSpacing: "-4px",
            color: "white", margin: 0,
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(30px)",
            transition: "opacity 0.8s 0.2s, transform 0.8s 0.2s",
          }}>CREATIVE</h1>
          <h1 style={{
            fontFamily: "var(--font-display)", fontWeight: 700, fontStyle: "italic",
            fontSize: "clamp(64px, 11vw, 160px)",
            lineHeight: 0.86, letterSpacing: "-4px",
            color: GOLD, marginBottom: "48px",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(30px)",
            transition: "opacity 0.8s 0.3s, transform 0.8s 0.3s",
          }}>AGENCY</h1>

          <div style={{
            display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
            gap: "60px", alignItems: "end",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(16px)",
            transition: "opacity 0.7s 0.45s, transform 0.7s 0.45s",
          }}>
            <p style={{
              fontFamily: "var(--font-display)", fontStyle: "italic",
              fontSize: "clamp(17px, 2vw, 22px)", color: "rgba(214,207,194,0.7)",
              lineHeight: 1.6, marginBottom: "0",
              borderLeft: `3px solid ${TERRA}`, paddingLeft: "20px",
            }}>
              Connecting people and brands to community and industry culture — from the African continent to the global Diaspora.
            </p>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "flex-end" }}>
              <Link to="/partner" style={{
                display: "inline-block", padding: "13px 32px",
                background: GOLD, color: DEEP,
                textDecoration: "none", fontSize: "10px",
                letterSpacing: "3px", fontWeight: 700, transition: "opacity 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}
              >GET IN TOUCH</Link>
              <Link to="/about" style={{
                display: "inline-block", padding: "13px 32px",
                border: `1px solid rgba(196,164,78,0.35)`, color: "rgba(214,207,194,0.75)",
                textDecoration: "none", fontSize: "10px",
                letterSpacing: "3px", fontWeight: 600,
                transition: "border-color 0.2s, color 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.color = "white"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(196,164,78,0.35)"; e.currentTarget.style.color = "rgba(214,207,194,0.75)"; }}
              >LEARN ABOUT US</Link>
            </div>
          </div>
        </div>
      </section>

      <TextileBand />

      {/* ══════════════════════════════════════════════════════
          MISSION — split layout, warm earth
      ══════════════════════════════════════════════════════ */}
      <section ref={missionRef} style={{ background: EARTH, overflow: "hidden", position: "relative" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "560px" }}>

          {/* Left — mission statement, large type */}
          <div style={{
            padding: "80px 5vw 80px 5vw",
            display: "flex", flexDirection: "column", justifyContent: "center",
            position: "relative", overflow: "hidden",
            opacity: missionVis ? 1 : 0, transform: missionVis ? "none" : "translateX(-20px)",
            transition: "opacity 1s, transform 1s",
          }}>
            <WaxBg opacity={0.05} color={GOLD} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <span style={{ fontSize: "10px", letterSpacing: "4px", color: TERRA, display: "block", marginBottom: "20px" }}>THE MISSION</span>
              <h2 style={{
                fontFamily: "var(--font-display)", fontWeight: 700,
                fontSize: "clamp(32px, 4vw, 56px)", lineHeight: 0.95,
                letterSpacing: "-1.5px", color: "white", marginBottom: "28px",
              }}>
                Make maritime<br />in Africa
                <span style={{ color: GOLD, fontStyle: "italic" }}> visible,<br />relevant</span><br />
                and irresistible.
              </h2>

              {/* Akan proverb */}
              <p style={{
                fontFamily: "var(--font-display)", fontStyle: "italic",
                fontSize: "14px", color: `rgba(181,84,30,0.8)`,
                letterSpacing: "0.5px", marginBottom: "8px",
              }}>
                "Adinkrahene" — from authority comes impact.
              </p>

              {/* Mini textile stripe */}
              <div style={{ display: "flex", height: "4px", width: "80px", marginTop: "24px", overflow: "hidden" }}>
                {[TERRA, TEAL, GOLD, TERRA, TEAL].map((c, i) => (
                  <div key={i} style={{ flex: 1, background: c }} />
                ))}
              </div>
            </div>
          </div>

          {/* Right — body copy + stats */}
          <div style={{
            padding: "80px 5vw 80px 56px",
            display: "flex", flexDirection: "column", justifyContent: "center",
            position: "relative", overflow: "hidden",
            borderLeft: `1px solid rgba(181,84,30,0.15)`,
            opacity: missionVis ? 1 : 0, transform: missionVis ? "none" : "translateX(20px)",
            transition: "opacity 1s 0.15s, transform 1s 0.15s",
          }}>
            {/* Adinkrahene ghost */}
            <div style={{ position: "absolute", bottom: "24px", right: "24px", opacity: 0.05 }}>
              <Adinkrahene size={160} color="white" />
            </div>
            <div style={{ position: "relative", zIndex: 1 }}>
              <p style={{ fontSize: "16px", lineHeight: 1.95, color: "rgba(214,207,194,0.6)", fontWeight: 300, maxWidth: "420px", marginBottom: "32px" }}>
                We connect brands, businesses, and leaders to the vibrancy, innovation, and commercial power of African and global Maritime Culture and Industry. Our expertise spans strategy, creativity, and immersive experiences — designed to deliver measurable impact for people and organisations.
              </p>

              {/* Stats */}
              <div style={{
                display: "flex", gap: "32px", flexWrap: "wrap",
                borderTop: `1px solid rgba(181,84,30,0.2)`, paddingTop: "28px",
              }}>
                {[
                  { val: "3", label: "Core Services" },
                  { val: "360°", label: "Cultural Reach" },
                  { val: "Global", label: "Diaspora Network" },
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
          THREE SERVICES — Context · Create · Amplify
          Monocle editorial numbered list + Adinkra symbols
      ══════════════════════════════════════════════════════ */}
      <section ref={servicesRef} style={{
        background: WARM, padding: "100px 5vw",
        position: "relative", overflow: "hidden",
      }}>
        <WaxBg opacity={0.05} color={TERRA} />

        <div style={{ maxWidth: "1300px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px",
            alignItems: "end", marginBottom: "72px",
            opacity: servicesVis ? 1 : 0, transform: servicesVis ? "none" : "translateY(16px)",
            transition: "opacity 0.6s, transform 0.6s",
          }}>
            <div>
              <span style={{ fontSize: "10px", letterSpacing: "4px", color: TERRA, display: "block", marginBottom: "14px" }}>CREATIVE AGENCY SERVICES</span>
              <h2 style={{
                fontFamily: "var(--font-display)", fontWeight: 700, fontStyle: "italic",
                fontSize: "clamp(32px, 4vw, 56px)", color: "white", lineHeight: 0.95, margin: 0,
              }}>Three steps.<br />One strategy.</h2>
            </div>
            <p style={{ fontSize: "15px", lineHeight: 1.85, color: "rgba(214,207,194,0.45)", fontWeight: 300, maxWidth: "380px" }}>
              Each service is grounded in Adinkra philosophy — the visual wisdom of the Akan people — encoding the values that drive every campaign we build.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {services.map((s, i) => (
              <div key={s.num} style={{
                display: "grid", gridTemplateColumns: "80px 72px 260px 1fr",
                gap: "40px", padding: "56px 0",
                borderBottom: `1px solid rgba(181,84,30,0.15)`,
                alignItems: "center",
                opacity: servicesVis ? 1 : 0, transform: servicesVis ? "none" : "translateY(20px)",
                transition: `opacity 0.6s ${0.1 + i * 0.15}s, transform 0.6s ${0.1 + i * 0.15}s`,
              }}>
                {/* Number watermark */}
                <span style={{
                  fontFamily: "var(--font-display)", fontSize: "72px", fontWeight: 700, fontStyle: "italic",
                  color: `rgba(181,84,30,0.2)`, lineHeight: 1,
                }}>{s.num}</span>

                {/* Adinkra */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                  {s.adinkra}
                  <span style={{ fontSize: "8px", letterSpacing: "1px", color: `rgba(196,164,78,0.4)`, textAlign: "center" }}>
                    {s.symbol.split(" ")[0]}
                  </span>
                </div>

                {/* Title + proverb */}
                <div>
                  <span style={{ fontSize: "9px", letterSpacing: "2.5px", color: TERRA, display: "block", marginBottom: "8px" }}>{s.title}</span>
                  <h3 style={{
                    fontFamily: "var(--font-display)", fontWeight: 700,
                    fontSize: "clamp(22px, 2.5vw, 32px)", color: "white",
                    lineHeight: 1.05, margin: "0 0 8px 0",
                  }}>{s.headline}</h3>
                  <span style={{ fontSize: "10px", color: `rgba(196,164,78,0.45)`, fontStyle: "italic" }}>
                    "{s.meaning}"
                  </span>
                </div>

                {/* Body */}
                <p style={{ fontSize: "15px", lineHeight: 1.85, color: "rgba(214,207,194,0.5)", fontWeight: 300, margin: 0 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TextileBand />

      {/* ══════════════════════════════════════════════════════
          EXPERIENTIAL ADVISORY — warm split
      ══════════════════════════════════════════════════════ */}
      <section ref={advisoryRef} style={{ background: EARTH, overflow: "hidden", position: "relative" }}>
        <div style={{ maxWidth: "1300px", margin: "0 auto", padding: "100px 5vw" }}>

          <div style={{
            marginBottom: "64px",
            opacity: advisoryVis ? 1 : 0, transform: advisoryVis ? "none" : "translateY(16px)",
            transition: "opacity 0.6s, transform 0.6s",
          }}>
            <span style={{ fontSize: "10px", letterSpacing: "4px", color: TERRA, display: "block", marginBottom: "14px" }}>IMMERSIVE EXPERIENCES</span>
            <h2 style={{
              fontFamily: "var(--font-display)", fontWeight: 700, fontStyle: "italic",
              fontSize: "clamp(28px, 3.5vw, 48px)", color: "white", lineHeight: 0.95,
              margin: "0 0 14px 0",
            }}>Experiential Advisory Services</h2>
            <p style={{ fontSize: "15px", color: "rgba(214,207,194,0.45)", fontWeight: 300, maxWidth: "480px", lineHeight: 1.7 }}>
              Hands-on exposure to global personalities, tech and business ecosystems and experiences.
            </p>
          </div>

          {/* Three advisory cards — left-border accent like partners section */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2px", background: `rgba(181,84,30,0.08)` }}>
            {advisory.map((a, i) => (
              <div key={a.num} style={{
                background: EARTH, padding: "48px 40px",
                borderTop: `3px solid ${a.accent}`,
                position: "relative", overflow: "hidden",
                opacity: advisoryVis ? 1 : 0, transform: advisoryVis ? "none" : "translateY(24px)",
                transition: `opacity 0.6s ${0.1 + i * 0.12}s, transform 0.6s ${0.1 + i * 0.12}s`,
              }}>
                <WaxBg opacity={0.03} color={a.accent} />
                <div style={{ position: "relative", zIndex: 1 }}>
                  <span style={{ fontSize: "9px", letterSpacing: "2.5px", fontWeight: 700, color: a.accent, display: "block", marginBottom: "20px" }}>{a.num}</span>
                  <h3 style={{
                    fontFamily: "var(--font-display)", fontWeight: 700,
                    fontSize: "clamp(18px, 2vw, 24px)", color: "white",
                    lineHeight: 1.1, margin: "0 0 16px 0", letterSpacing: "-0.5px",
                  }}>{a.title}</h3>
                  <div style={{ width: "24px", height: "2px", background: a.accent, marginBottom: "16px" }} />
                  <p style={{ fontSize: "14px", lineHeight: 1.85, color: "rgba(214,207,194,0.5)", fontWeight: 300, margin: 0 }}>{a.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TextileBand />

      {/* ══════════════════════════════════════════════════════
          WHY PARTNER — 2x2 grid with textile left borders
      ══════════════════════════════════════════════════════ */}
      <section ref={whyRef} style={{
        background: WARM, padding: "100px 5vw",
        position: "relative", overflow: "hidden",
      }}>
        <WaxBg opacity={0.05} color={TEAL} />

        <div style={{ maxWidth: "1300px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px",
            alignItems: "center", marginBottom: "64px",
            opacity: whyVis ? 1 : 0, transform: whyVis ? "none" : "translateY(16px)",
            transition: "opacity 0.6s, transform 0.6s",
          }}>
            <div>
              <div style={{ marginBottom: "20px", opacity: 0.12 }}>
                <Sankofa size={64} color="white" />
              </div>
              <span style={{ fontSize: "10px", letterSpacing: "4px", color: TEAL, display: "block", marginBottom: "14px" }}>THE ADVANTAGE</span>
              <h2 style={{
                fontFamily: "var(--font-display)", fontWeight: 700, fontStyle: "italic",
                fontSize: "clamp(28px, 3.5vw, 48px)", color: "white", lineHeight: 0.95, margin: 0,
              }}>Why partner<br />with us.</h2>
            </div>
            <p style={{ fontSize: "15px", lineHeight: 1.85, color: "rgba(214,207,194,0.45)", fontWeight: 300, maxWidth: "380px" }}>
              Every engagement is built on cultural authority, meaningful networks, and a commitment to measurable outcomes for brands in the African maritime space.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px", background: `rgba(44,140,124,0.08)` }}>
            {pillars.map((p, i) => (
              <div key={p.title} style={{
                background: WARM, padding: "40px 36px",
                borderLeft: `3px solid ${p.accent}`,
                opacity: whyVis ? 1 : 0, transform: whyVis ? "none" : "translateY(20px)",
                transition: `opacity 0.6s ${0.1 + i * 0.1}s, transform 0.6s ${0.1 + i * 0.1}s`,
              }}>
                <h4 style={{
                  fontSize: "12px", letterSpacing: "2px", fontWeight: 700,
                  color: p.accent, marginBottom: "10px",
                }}>{p.title.toUpperCase()}</h4>
                <p style={{ fontSize: "14px", lineHeight: 1.75, color: "rgba(214,207,194,0.5)", fontWeight: 300, margin: 0 }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TextileBand />

      {/* ══════════════════════════════════════════════════════
          CTA — full bleed, Sankofa ghost, Akan proverb
      ══════════════════════════════════════════════════════ */}
      <section ref={ctaRef} style={{
        position: "relative", overflow: "hidden",
        minHeight: "500px", display: "flex", alignItems: "center",
      }}>
        <img src={IMGS.cta} alt="Cabin Tea Agency"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(110deg, ${EARTH} 40%, rgba(181,84,30,0.4) 100%)` }} />
        <WaxBg opacity={0.04} color={GOLD} />
        <div className="ct-grain" style={{ zIndex: 1 }} />

        {/* Adinkrahene ghost */}
        <div style={{ position: "absolute", right: "3vw", top: "50%", transform: "translateY(-50%)", opacity: 0.07, zIndex: 1 }}>
          <Adinkrahene size={360} color="white" />
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

          <p style={{
            fontFamily: "var(--font-display)", fontStyle: "italic",
            fontSize: "clamp(13px, 1.5vw, 16px)", color: `rgba(181,84,30,0.8)`,
            letterSpacing: "0.5px", marginBottom: "20px",
          }}>
            "Dwennimmen" — strength and humility work together.
          </p>

          <h2 style={{
            fontFamily: "var(--font-display)", fontWeight: 700,
            fontSize: "clamp(36px, 5.5vw, 80px)", lineHeight: 0.92,
            letterSpacing: "-2px", color: "white", marginBottom: "28px",
          }}>
            Ready to make your<br />
            <span style={{ color: GOLD, fontStyle: "italic" }}>mark in Africa?</span>
          </h2>

          <p style={{ fontSize: "15px", lineHeight: 1.85, color: "rgba(214,207,194,0.55)", fontWeight: 300, maxWidth: "420px", marginBottom: "44px" }}>
            Our team reviews all requests and responds within 3–5 business days.
          </p>

          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
            <Link to="/partner" style={{
              display: "inline-block", padding: "14px 36px",
              background: GOLD, color: DEEP,
              textDecoration: "none", fontSize: "10px", letterSpacing: "3px",
              fontWeight: 700, transition: "opacity 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >GET IN TOUCH</Link>
            <Link to="/about" style={{
              display: "inline-block", padding: "14px 36px",
              border: `1px solid rgba(196,164,78,0.35)`, color: "rgba(214,207,194,0.7)",
              textDecoration: "none", fontSize: "10px", letterSpacing: "3px",
              fontWeight: 600, transition: "border-color 0.2s, color 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.color = "white"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(196,164,78,0.35)"; e.currentTarget.style.color = "rgba(214,207,194,0.7)"; }}
            >LEARN ABOUT US</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
