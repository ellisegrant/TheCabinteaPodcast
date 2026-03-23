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

/* ─────────────────────────────────────────────────
   ADINKRA — Ese Ne Tekrema
   "The teeth and tongue" — interdependence
   Perfect for a media hub: content + community,
   inseparable, stronger together.
───────────────────────────────────────────────── */
function EseNeTekrema({ size = 56, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <path d="M30 50 Q30 20 50 20 Q35 35 35 50 Q35 65 50 80 Q30 80 30 50Z"
        stroke={color} strokeWidth="2.5" fill="none"/>
      <path d="M70 50 Q70 20 50 20 Q65 35 65 50 Q65 65 50 80 Q70 80 70 50Z"
        stroke={color} strokeWidth="2.5" fill="none"/>
      <circle cx="50" cy="36" r="4" fill={color}/>
      <circle cx="50" cy="64" r="4" fill={color}/>
    </svg>
  );
}

/* Nkyinkyim — "Adaptability" — perfect for a platform
   that reshapes how we engage with maritime content */
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

/* Akoma Ntoso — "Linked hearts" — unity of community */
function AkomaNtoso({ size = 56, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* Left heart */}
      <path d="M22 38 Q14 28 22 22 Q30 16 36 24 Q42 16 50 22 Q58 28 50 38 L36 52 Z"
        stroke={color} strokeWidth="2.5" fill="none" strokeLinejoin="round"/>
      {/* Right heart */}
      <path d="M50 38 Q42 28 50 22 Q58 16 64 24 Q70 16 78 22 Q86 28 78 38 L64 52 Z"
        stroke={color} strokeWidth="2.5" fill="none" strokeLinejoin="round"/>
      {/* Linking line */}
      <line x1="36" y1="52" x2="50" y2="38" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <line x1="50" y1="38" x2="64" y2="52" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      {/* Root */}
      <line x1="50" y1="52" x2="50" y2="76" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d="M38 76 Q50 68 62 76" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

/* ── Wax print background ── */
function WaxBg({ opacity = 0.05, color = "#2C8C7C" }) {
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

/* ── Textile band — kente-inspired stripe divider ── */
function TextileBand() {
  const colors = [
    "#2C8C7C","#C4A44E","#1E6B5F","#C4A44E","#152A2F",
    "#C4A44E","#2C8C7C","#152A2F","#C4A44E","#1E6B5F",
    "#C4A44E","#2C8C7C","#152A2F","#C4A44E","#2C8C7C",
    "#C4A44E","#152A2F",
  ];
  return (
    <div style={{ display: "flex", height: "8px", width: "100%", overflow: "hidden" }}>
      {colors.map((c, i) => <div key={i} style={{ background: c, flex: 1 }} />)}
    </div>
  );
}

/* ── Colour palette — Anchorage uses deep teal, not terracotta ── */
const DEEP   = "#0D2420";   /* darkest teal-black */
const FOREST = "#122B26";   /* deep forest */
const TEAL   = "#2C8C7C";
const TEAL2  = "#1E6B5F";
const GOLD   = "#C4A44E";

/* ── Local image paths — drop files into /public/images/anchorage/ ── */
const IMGS = {
  hero:      "/maritimeheritage.jpg",       /* Hero background — media/broadcast feel   */
  community: "/stortelling.jpg",  /* African community media / storytelling   */
  digital:   "/images/anchorage/digital.jpg",    /* Digital platform / screen / tech         */
  culture:   "/flagwoman.jpg",    /* African cultural content                 */
  people:    "/festival.jpg",     /* Diaspora people engaging with content    */
  coastal:   "/fisherman.jpg",    /* African coastal / maritime               */
  cta:       "/maritimeheritage.jpg",        /* CTA background                           */
};

const features = [
  {
    num: "01",
    symbol: <EseNeTekrema size={40} color={`rgba(44,140,124,0.7)`}/>,
    adinkra: "Ese Ne Tekrema",
    meaning: "Interdependence",
    label: "CENTRALIZED HUB",
    title: "One place for all maritime content",
    body: "A centralized media hub that curates the full landscape of African and global maritime culture, news, and knowledge — digital and in-person.",
  },
  {
    num: "02",
    symbol: <Nkyinkyim size={40} color={`rgba(44,140,124,0.7)`}/>,
    adinkra: "Nkyinkyim",
    meaning: "Adaptability",
    label: "PERSONALIZED",
    title: "Tailored to your interests",
    body: "Personalized recommendations reshape the way you explore the maritime world, surfacing content and connections that matter to you personally.",
  },
  {
    num: "03",
    symbol: <AkomaNtoso size={40} color={`rgba(44,140,124,0.7)`}/>,
    adinkra: "Akoma Ntoso",
    meaning: "Linked hearts",
    label: "HYBRID EXPERIENCES",
    title: "In-person and digital",
    body: "We combine live event experiences with digital access, so the Anchorage community can engage from anywhere across the globe.",
  },
];

const contentTypes = [
  { tag: "DOCUMENTARY", title: "Long-form storytelling on African maritime cultures and communities." },
  { tag: "PODCAST", title: "Cabin Tea episodes and partner audio from across the ecosystem." },
  { tag: "INDUSTRY INSIGHT", title: "Blue economy data, policy, and maritime industry analysis." },
  { tag: "CULTURAL ARCHIVE", title: "Indigenous maritime knowledge and heritage preservation." },
];

export default function Anchorage() {
  const [heroRef,    heroVis]    = useReveal(0.05);
  const [whatRef,    whatVis]    = useReveal(0.1);
  const [mosaicRef,  mosaicVis]  = useReveal(0.08);
  const [featRef,    featVis]    = useReveal(0.1);
  const [contentRef, contentVis] = useReveal(0.1);
  const [ctaRef,     ctaVis]     = useReveal(0.1);

  return (
    <div style={{ minHeight: "100vh", background: "var(--dark)", color: "var(--cream)", overflowX: "hidden" }}>
      <Navbar />

      {/* ══════════════════════════════════════════════════════
          HERO — editorial broadcast energy
          Teal-dark, confident, media institution feel
      ══════════════════════════════════════════════════════ */}
      <section ref={heroRef} style={{
        minHeight: "100vh", position: "relative", overflow: "hidden",
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
      }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img src={IMGS.hero} alt="Anchorage media hub"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }} />
          {/* Deep teal overlay — editorial, broadcast */}
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${DEEP} 0%, rgba(13,36,32,0.85) 40%, rgba(13,36,32,0.35) 100%)` }} />
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(110deg, rgba(13,36,32,0.95) 38%, transparent 68%)` }} />
          {/* Teal glow accent */}
          <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 72% 35%, rgba(44,140,124,0.12) 0%, transparent 55%)` }} />
        </div>

        <WaxBg opacity={0.04} color={TEAL} />
        <div className="ct-grain" style={{ zIndex: 1 }} />

        {/* Nkyinkyim watermark top right */}
        <div style={{
          position: "absolute", top: "100px", right: "3vw", zIndex: 2,
          opacity: heroVis ? 0.09 : 0, transition: "opacity 1.5s 0.5s",
          transform: "scale(3.5)",
        }}>
          <Nkyinkyim size={80} color={TEAL} />
        </div>

        <div style={{ position: "relative", zIndex: 3, padding: "80px 5vw 100px" }}>

          {/* Eyebrow */}
          <div style={{
            display: "flex", alignItems: "center", gap: "14px", marginBottom: "32px",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(12px)",
            transition: "opacity 0.7s 0.1s, transform 0.7s 0.1s",
          }}>
            <EseNeTekrema size={18} color={`rgba(44,140,124,0.8)`} />
            <span style={{ fontSize: "10px", letterSpacing: "4px", color: `rgba(44,140,124,0.8)`, fontWeight: 500 }}>
              CABIN TEA · MARITIME MEDIA HUB
            </span>
          </div>

          {/* Title — split like About/Afrocean */}
          <h1 style={{
            fontFamily: "var(--font-display)", fontWeight: 700,
            fontSize: "clamp(72px, 13vw, 180px)",
            lineHeight: 0.86, letterSpacing: "-4px",
            color: "white", margin: 0,
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(30px)",
            transition: "opacity 0.8s 0.2s, transform 0.8s 0.2s",
          }}>ANCH</h1>
          <h1 style={{
            fontFamily: "var(--font-display)", fontWeight: 700, fontStyle: "italic",
            fontSize: "clamp(72px, 13vw, 180px)",
            lineHeight: 0.86, letterSpacing: "-4px",
            color: TEAL, marginBottom: "48px",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(30px)",
            transition: "opacity 0.8s 0.3s, transform 0.8s 0.3s",
          }}>ORAGE</h1>

          {/* Bottom row — tagline + mosaic */}
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
                color: "rgba(214,207,194,0.7)", marginBottom: "32px",
                borderLeft: `3px solid ${TEAL}`, paddingLeft: "20px",
              }}>
                Transforming the way we engage with maritime issues and cultures — starting with Africa and the African Diaspora.
              </p>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <Link to="/episodes" style={{
                  display: "inline-block", padding: "13px 32px",
                  background: TEAL, color: "white",
                  textDecoration: "none", fontSize: "10px",
                  letterSpacing: "3px", fontWeight: 700, borderRadius: "2px",
                  transition: "opacity 0.2s",
                }}
                  onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                  onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                >EXPLORE CONTENT</Link>
                <Link to="/partner" style={{
                  display: "inline-block", padding: "13px 32px",
                  border: `1px solid rgba(44,140,124,0.4)`, color: "rgba(214,207,194,0.75)",
                  textDecoration: "none", fontSize: "10px",
                  letterSpacing: "3px", fontWeight: 600, borderRadius: "2px",
                  transition: "border-color 0.2s, color 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = TEAL; e.currentTarget.style.color = "white"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(44,140,124,0.4)"; e.currentTarget.style.color = "rgba(214,207,194,0.75)"; }}
                >PARTNER WITH US</Link>
              </div>
            </div>

            {/* Stacked polaroid thumbnails */}
            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", alignItems: "flex-end" }}>
              {[
                { src: IMGS.community, angle: -3, h: "130px" },
                { src: IMGS.culture,   angle: 0,  h: "160px" },
                { src: IMGS.coastal,   angle: 3,  h: "130px" },
              ].map((img, i) => (
                <div key={i} style={{
                  width: "88px", flexShrink: 0,
                  background: "rgba(255,255,255,0.06)",
                  padding: "5px 5px 18px",
                  transform: `rotate(${img.angle}deg)`,
                  border: `1px solid rgba(44,140,124,0.25)`,
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
          WHAT IS ANCHORAGE — split image + text, deep teal bg
      ══════════════════════════════════════════════════════ */}
      <section ref={whatRef} style={{
        background: DEEP, overflow: "hidden", position: "relative",
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "640px" }}>

          {/* Left — editorial image + caption card */}
          <div style={{
            position: "relative", overflow: "hidden",
            opacity: whatVis ? 1 : 0, transform: whatVis ? "none" : "translateX(-20px)",
            transition: "opacity 1s, transform 1s",
          }}>
            <img src={IMGS.community} alt="Anchorage community"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", minHeight: "640px" }} />
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to right, rgba(13,36,32,0.05), rgba(13,36,32,0.65) 100%)` }} />

            {/* Floating editorial card */}
            <div style={{
              position: "absolute", bottom: "40px", left: "28px",
              background: "rgba(13,36,32,0.92)",
              backdropFilter: "blur(12px)",
              border: `1px solid rgba(44,140,124,0.3)`,
              borderLeft: `3px solid ${TEAL}`,
              padding: "20px 24px", maxWidth: "240px",
            }}>
              <span style={{ fontSize: "9px", letterSpacing: "2.5px", color: TEAL, display: "block", marginBottom: "8px" }}>
                THE MISSION
              </span>
              <p style={{ fontSize: "13px", lineHeight: 1.65, color: "rgba(214,207,194,0.75)", margin: 0, fontFamily: "var(--font-display)", fontStyle: "italic" }}>
                "Reshaping how the world engages with African maritime issues and cultures."
              </p>
            </div>
          </div>

          {/* Right — what is Anchorage */}
          <div style={{
            padding: "80px 5vw 80px 56px",
            display: "flex", flexDirection: "column", justifyContent: "center",
            position: "relative", overflow: "hidden",
            opacity: whatVis ? 1 : 0, transform: whatVis ? "none" : "translateX(20px)",
            transition: "opacity 1s 0.15s, transform 1s 0.15s",
          }}>
            <WaxBg opacity={0.05} color={TEAL} />
            <div style={{ position: "relative", zIndex: 1 }}>

              <span style={{ fontSize: "10px", letterSpacing: "4px", color: TEAL, display: "block", marginBottom: "20px" }}>
                WHAT IS ANCHORAGE
              </span>

              {/* Large decorative symbol */}
              <div style={{ marginBottom: "20px", opacity: 0.15 }}>
                <EseNeTekrema size={64} color="white" />
              </div>

              <h2 style={{
                fontFamily: "var(--font-display)", fontWeight: 700,
                fontSize: "clamp(28px, 3.5vw, 48px)", lineHeight: 0.95,
                letterSpacing: "-1.5px", color: "white", marginBottom: "28px",
              }}>
                Reshaping how the world explores maritime culture.
              </h2>

              <p style={{ fontSize: "15px", lineHeight: 1.95, color: "rgba(214,207,194,0.6)", fontWeight: 300, maxWidth: "420px", marginBottom: "24px" }}>
                Anchorage is a centralized media hub combined with in-person and digital experiences. We curate personalized recommendations tailored to your interests, reshaping the way we explore the maritime world.
              </p>
              <p style={{ fontSize: "15px", lineHeight: 1.95, color: "rgba(214,207,194,0.5)", fontWeight: 300, maxWidth: "420px", marginBottom: "36px" }}>
                Starting with Africa and the African Diaspora, Anchorage transforms engagement with maritime issues and cultures at every level — from community storytelling to industry insight.
              </p>

              {/* Stat row */}
              <div style={{
                display: "flex", gap: "32px", flexWrap: "wrap",
                borderTop: `1px solid rgba(44,140,124,0.2)`, paddingTop: "28px",
              }}>
                {[
                  { val: "360°", label: "Media Coverage" },
                  { val: "Digital", label: "And In-Person" },
                  { val: "Global", label: "Diaspora Reach" },
                ].map(s => (
                  <div key={s.label}>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: "26px", fontWeight: 700, color: "white", display: "block", lineHeight: 1 }}>{s.val}</span>
                    <span style={{ fontSize: "9px", letterSpacing: "2.5px", color: TEAL, display: "block", marginTop: "5px" }}>{s.label.toUpperCase()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <TextileBand />

      {/* ══════════════════════════════════════════════════════
          IMAGE MOSAIC — African media, culture, storytelling
      ══════════════════════════════════════════════════════ */}
      <section ref={mosaicRef} style={{ background: DEEP, overflow: "hidden" }}>

        <div style={{
          padding: "56px 5vw 32px",
          opacity: mosaicVis ? 1 : 0, transform: mosaicVis ? "none" : "translateY(16px)",
          transition: "opacity 0.6s, transform 0.6s",
        }}>
          <span style={{ fontSize: "10px", letterSpacing: "4px", color: TEAL }}>
            THE CONTENT
          </span>
        </div>

        {/* Row 1 — 3 images */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1.5fr 1fr", gap: "4px",
          opacity: mosaicVis ? 1 : 0, transform: mosaicVis ? "none" : "translateY(24px)",
          transition: "opacity 0.8s 0.1s, transform 0.8s 0.1s",
        }}>
          {[
            { src: IMGS.culture,   h: "300px", label: "Cultural Archive",    sub: "Heritage Content" },
            { src: IMGS.community, h: "300px", label: "Community Stories",   sub: "The People" },
            { src: IMGS.coastal,   h: "300px", label: "Maritime Heritage",   sub: "Coastal Africa" },
          ].map((img, i) => (
            <div key={i} style={{ position: "relative", overflow: "hidden" }}>
              <img src={img.src} alt={img.label}
                style={{ width: "100%", height: img.h, objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${DEEP} 0%, transparent 50%)` }} />
              <div style={{ position: "absolute", bottom: "16px", left: "16px" }}>
                <span style={{ fontSize: "12px", fontWeight: 600, color: "white", display: "block" }}>{img.label}</span>
                <span style={{ fontSize: "9px", letterSpacing: "2px", color: TEAL }}>{img.sub.toUpperCase()}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Row 2 — 2 images */}
        <div style={{
          display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "4px", marginTop: "4px",
          opacity: mosaicVis ? 1 : 0, transform: mosaicVis ? "none" : "translateY(24px)",
          transition: "opacity 0.8s 0.25s, transform 0.8s 0.25s",
        }}>
          {[
            { src: IMGS.people,  h: "250px", label: "Diaspora Voices",   sub: "Global Community" },
            { src: IMGS.digital, h: "250px", label: "Digital Platform",  sub: "Anywhere, Anytime" },
          ].map((img, i) => (
            <div key={i} style={{ position: "relative", overflow: "hidden" }}>
              <img src={img.src} alt={img.label}
                style={{ width: "100%", height: img.h, objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${DEEP} 0%, transparent 50%)` }} />
              <div style={{ position: "absolute", bottom: "16px", left: "16px" }}>
                <span style={{ fontSize: "12px", fontWeight: 600, color: "white", display: "block" }}>{img.label}</span>
                <span style={{ fontSize: "9px", letterSpacing: "2px", color: TEAL }}>{img.sub.toUpperCase()}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <TextileBand />

      {/* ══════════════════════════════════════════════════════
          THREE FEATURES — Adinkra + Monocle editorial rows
      ══════════════════════════════════════════════════════ */}
      <section ref={featRef} style={{
        padding: "100px 5vw", background: FOREST,
        position: "relative", overflow: "hidden",
      }}>
        <WaxBg opacity={0.06} color={TEAL} />

        <div style={{ maxWidth: "1300px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          {/* Header */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px",
            alignItems: "end", marginBottom: "72px",
            opacity: featVis ? 1 : 0, transform: featVis ? "none" : "translateY(16px)",
            transition: "opacity 0.6s, transform 0.6s",
          }}>
            <div>
              <span style={{ fontSize: "10px", letterSpacing: "4px", color: TEAL, display: "block", marginBottom: "14px" }}>WHAT SETS US APART</span>
              <h2 style={{
                fontFamily: "var(--font-display)", fontWeight: 700, fontStyle: "italic",
                fontSize: "clamp(32px, 4vw, 56px)", color: "white", lineHeight: 0.95, margin: 0,
              }}>Built differently,<br />on purpose.</h2>
            </div>
            <p style={{ fontSize: "15px", lineHeight: 1.85, color: "rgba(214,207,194,0.45)", fontWeight: 300, maxWidth: "380px" }}>
              Each principle of Anchorage is grounded in Adinkra philosophy — the ancient visual language of the Akan people, encoding wisdom that guides how we build community and knowledge.
            </p>
          </div>

          {/* Feature rows — Monocle editorial list with Adinkra */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {features.map((f, i) => (
              <div key={f.label} style={{
                display: "grid", gridTemplateColumns: "80px 72px 280px 1fr",
                gap: "40px", padding: "56px 0",
                borderBottom: `1px solid rgba(44,140,124,0.15)`,
                alignItems: "center",
                opacity: featVis ? 1 : 0, transform: featVis ? "none" : "translateY(20px)",
                transition: `opacity 0.6s ${0.1 + i * 0.15}s, transform 0.6s ${0.1 + i * 0.15}s`,
              }}>
                {/* Number watermark */}
                <span style={{
                  fontFamily: "var(--font-display)", fontSize: "72px", fontWeight: 700, fontStyle: "italic",
                  color: `rgba(44,140,124,0.15)`, lineHeight: 1,
                }}>{f.num}</span>

                {/* Adinkra symbol */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                  {f.symbol}
                  <span style={{ fontSize: "8px", letterSpacing: "1px", color: `rgba(44,140,124,0.5)`, textAlign: "center" }}>
                    {f.adinkra.split(" ")[0]}
                  </span>
                </div>

                {/* Title block */}
                <div>
                  <span style={{ fontSize: "9px", letterSpacing: "2.5px", color: TEAL, display: "block", marginBottom: "6px" }}>{f.label}</span>
                  <h3 style={{
                    fontFamily: "var(--font-display)", fontWeight: 700,
                    fontSize: "clamp(20px, 2vw, 28px)", color: "white",
                    lineHeight: 1.1, margin: "0 0 8px 0",
                  }}>{f.title}</h3>
                  <span style={{ fontSize: "10px", color: `rgba(196,164,78,0.45)`, fontStyle: "italic" }}>
                    "{f.meaning}"
                  </span>
                </div>

                {/* Body */}
                <p style={{ fontSize: "15px", lineHeight: 1.85, color: "rgba(214,207,194,0.5)", fontWeight: 300, margin: 0 }}>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TextileBand />

      {/* ══════════════════════════════════════════════════════
          CONTENT TYPES — what lives on Anchorage
          Editorial card grid — AIAC meets Monocle
      ══════════════════════════════════════════════════════ */}
      <section ref={contentRef} style={{
        padding: "100px 5vw", background: DEEP,
        position: "relative", overflow: "hidden",
      }}>
        <WaxBg opacity={0.04} color={TEAL} />

        <div style={{ maxWidth: "1300px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{
            marginBottom: "64px",
            opacity: contentVis ? 1 : 0, transform: contentVis ? "none" : "translateY(16px)",
            transition: "opacity 0.6s, transform 0.6s",
          }}>
            <span style={{ fontSize: "10px", letterSpacing: "4px", color: TEAL, display: "block", marginBottom: "14px" }}>WHAT'S ON ANCHORAGE</span>
            <h2 style={{
              fontFamily: "var(--font-display)", fontWeight: 700, fontStyle: "italic",
              fontSize: "clamp(28px, 3.5vw, 48px)", color: "white", lineHeight: 1, margin: 0,
            }}>A full spectrum of maritime media.</h2>
          </div>

          {/* Content type cards — horizontal editorial strip */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2px", background: `rgba(44,140,124,0.08)` }}>
            {contentTypes.map((c, i) => (
              <div key={c.tag} style={{
                background: DEEP, padding: "40px 32px",
                borderTop: i % 2 === 0 ? `3px solid ${TEAL}` : `3px solid ${GOLD}`,
                opacity: contentVis ? 1 : 0, transform: contentVis ? "none" : "translateY(20px)",
                transition: `opacity 0.6s ${0.1 + i * 0.1}s, transform 0.6s ${0.1 + i * 0.1}s`,
                position: "relative", overflow: "hidden",
              }}>
                <WaxBg opacity={0.025} color={i % 2 === 0 ? TEAL : GOLD} />
                <div style={{ position: "relative", zIndex: 1 }}>
                  <span style={{
                    fontSize: "9px", letterSpacing: "2.5px", fontWeight: 700,
                    color: i % 2 === 0 ? TEAL : GOLD, display: "block", marginBottom: "20px",
                  }}>{c.tag}</span>
                  <p style={{ fontSize: "14px", lineHeight: 1.75, color: "rgba(214,207,194,0.55)", fontWeight: 300, margin: 0 }}>{c.title}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA inline */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            flexWrap: "wrap", gap: "24px",
            marginTop: "56px",
            opacity: contentVis ? 1 : 0, transition: "opacity 0.6s 0.5s",
          }}>
            <p style={{ fontSize: "15px", color: "rgba(214,207,194,0.45)", fontWeight: 300, maxWidth: "460px", margin: 0, lineHeight: 1.7 }}>
              Anchorage is built for the next generation of African ocean professionals, cultural leaders, and Diaspora community members who want to stay connected to the maritime world.
            </p>
            <Link to="/episodes" style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              padding: "13px 32px", background: TEAL, color: "white",
              textDecoration: "none", fontSize: "10px",
              letterSpacing: "3px", fontWeight: 700, borderRadius: "2px",
              flexShrink: 0, transition: "opacity 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >BROWSE EPISODES →</Link>
          </div>
        </div>
      </section>

      <TextileBand />

      {/* ══════════════════════════════════════════════════════
          CTA — full bleed, deep teal-to-earth, editorial
      ══════════════════════════════════════════════════════ */}
      <section ref={ctaRef} style={{
        position: "relative", overflow: "hidden",
        minHeight: "500px", display: "flex", alignItems: "center",
      }}>
        <img src={IMGS.cta} alt="Anchorage"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(110deg, ${DEEP} 40%, rgba(30,107,95,0.6) 100%)` }} />
        <WaxBg opacity={0.04} color={TEAL} />
        <div className="ct-grain" style={{ zIndex: 1 }} />

        {/* Giant Adinkra watermark */}
        <div style={{ position: "absolute", right: "3vw", top: "50%", transform: "translateY(-50%)", opacity: 0.07, zIndex: 1 }}>
          <Nkyinkyim size={360} color="white" />
        </div>

        <div style={{
          position: "relative", zIndex: 2, padding: "80px 5vw", maxWidth: "760px",
          opacity: ctaVis ? 1 : 0, transform: ctaVis ? "none" : "translateY(20px)",
          transition: "opacity 0.8s, transform 0.8s",
        }}>
          {/* Textile mini stripe */}
          <div style={{ display: "flex", height: "4px", width: "100px", marginBottom: "32px", overflow: "hidden" }}>
            {[TEAL, GOLD, TEAL2, TEAL, GOLD].map((c, i) => (
              <div key={i} style={{ flex: 1, background: c }} />
            ))}
          </div>

          {/* Akan proverb — Nkyinkyim */}
          <p style={{
            fontFamily: "var(--font-display)", fontStyle: "italic",
            fontSize: "clamp(13px, 1.5vw, 16px)", color: `rgba(44,140,124,0.75)`,
            letterSpacing: "0.5px", marginBottom: "20px",
          }}>
            "Nkyinkyim" — adaptability and dynamism. The mark of a media platform built to grow with its community.
          </p>

          <h2 style={{
            fontFamily: "var(--font-display)", fontWeight: 700,
            fontSize: "clamp(36px, 5.5vw, 80px)", lineHeight: 0.92,
            letterSpacing: "-2px", color: "white", marginBottom: "28px",
          }}>
            Your maritime world,<br />
            <span style={{ color: TEAL, fontStyle: "italic" }}>reimagined.</span>
          </h2>

          <p style={{ fontSize: "15px", lineHeight: 1.85, color: "rgba(214,207,194,0.55)", fontWeight: 300, maxWidth: "420px", marginBottom: "44px" }}>
            Access a curated maritime media experience built for the next generation of African ocean professionals, cultural leaders, and Diaspora communities.
          </p>

          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
            <Link to="/episodes" style={{
              display: "inline-block", padding: "14px 36px",
              background: TEAL, color: "white",
              textDecoration: "none", fontSize: "10px", letterSpacing: "3px",
              fontWeight: 700, borderRadius: "2px", transition: "opacity 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >BROWSE EPISODES</Link>
            <Link to="/partner" style={{
              display: "inline-block", padding: "14px 36px",
              border: `1px solid rgba(44,140,124,0.4)`, color: "rgba(214,207,194,0.7)",
              textDecoration: "none", fontSize: "10px", letterSpacing: "3px",
              fontWeight: 600, borderRadius: "2px", transition: "border-color 0.2s, color 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = TEAL; e.currentTarget.style.color = "white"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(44,140,124,0.4)"; e.currentTarget.style.color = "rgba(214,207,194,0.7)"; }}
            >PARTNER WITH US</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
