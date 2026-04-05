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

/* ── Palette ── */
const BG    = "#0F1912";
const PANEL = "#141F18";
const DARK2 = "#1A2820";
const GOLD  = "#C4A44E";
const TERRA = "#B5541E";
const TEAL  = "#2C8C7C";
const CREAM = "rgba(214,207,194,0.75)";
const MUTED = "rgba(214,207,194,0.42)";

/* ── Image paths — exact from document ── */
const IMGS = {
  hero: "/creativeagency.jpg",
  cta:  "/maritimeheritage.jpg",
};

/* ── Services — exact content from document ── */
const services = [
  {
    num: "01",
    title: "CONTEXT",
    headline: "Strategy & Insight",
    body: "We start by deeply understanding your objectives and audience. Our strategy team conducts rigorous analysis, identifies touchpoints, and develops insights to create campaigns that resonate globally.",
  },
  {
    num: "02",
    title: "CREATE",
    headline: "Craft & Campaign",
    body: "Our team blends creativity, strategic thinking, cultural and industry insight to craft compelling campaigns. From concept to execution, we ensure your brand authentically reflects the richness and diversity of African culture.",
  },
  {
    num: "03",
    title: "AMPLIFY",
    headline: "Impact & Reach",
    body: "Impact matters. We measure meaningful outcomes, ensuring campaigns deliver tangible results, expand reach, and deepen connections with audiences across the African continent and Diaspora.",
  },
];

/* ── Advisory — exact content from document ── */
const advisory = [
  {
    num: "01",
    title: "TECHNOLOGY",
    body: "Our team works closely with clients to design tailored technology immersions, connecting you with leading global innovation hubs, startups, and tech leaders to uncover opportunities for partnerships, innovation, and growth.",
    accent: TERRA,
  },
  {
    num: "02",
    title: "CAREER & EDUCATION",
    body: "We collaborate with partners to craft curated experiences, providing access to maritime organisations, experts, and cultural leaders — helping partners gain insights, build networks, and explore collaborations in Africa's most vibrant maritime industries.",
    accent: GOLD,
  },
  {
    num: "03",
    title: "BLUE ECONOMY INVESTMENT",
    body: "Our experts guide clients through high-level blue economy investment immersions, arranging meetings with organisations, executives, and investors to identify market opportunities, strategic partnerships, and actionable business outcomes.",
    accent: TEAL,
  },
];

/* ── Why partner — exact content from document ── */
const pillars = [
  { title: "Cultural Authority",  body: "The leading voice in Africa's maritime industry culture.",             accent: TERRA },
  { title: "Network Access",      body: "Direct connections to experts, industries, and business leaders.",      accent: GOLD  },
  { title: "Strategic Impact",    body: "Campaigns and experiences with measurable ROI.",                        accent: TEAL  },
  { title: "Tailored Solutions",  body: "Every engagement is customized to your brand and objectives.",          accent: TERRA },
];

export default function CreativeAgency() {
  const [heroRef,     heroVis]     = useReveal(0.05);
  const [missionRef,  missionVis]  = useReveal(0.1);
  const [servicesRef, servicesVis] = useReveal(0.1);
  const [advisoryRef, advisoryVis] = useReveal(0.1);
  const [whyRef,      whyVis]      = useReveal(0.1);
  const [ctaRef,      ctaVis]      = useReveal(0.1);

  return (
    <div style={{ minHeight: "100vh", background: BG, color: "white", overflowX: "hidden" }}>
      <Navbar />

      {/* ══════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════ */}
      <section ref={heroRef} style={{
        height: "100vh", minHeight: "600px",
        position: "relative", overflow: "hidden",
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
      }}>
        <img
          src={IMGS.hero}
          alt="Creative Agency"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(15,25,18,1) 0%, rgba(15,25,18,0.6) 50%, transparent 85%)",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, rgba(15,25,18,0.8) 0%, transparent 60%)",
        }} />
        <div className="ct-grain" style={{ zIndex: 1 }} />

        <div style={{ position: "relative", zIndex: 2, padding: "0 5vw 72px" }}>
          <p style={{
            fontSize: "11px", letterSpacing: "4px", color: GOLD,
            fontWeight: 500, marginBottom: "16px",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(10px)",
            transition: "opacity 0.6s 0.1s, transform 0.6s 0.1s",
          }}>
            CABIN TEA · CREATIVE AGENCY
          </p>

          <h1 style={{
            fontWeight: 700,
            fontSize: "clamp(36px, 5vw, 64px)",
            lineHeight: 1.1, color: "white",
            margin: "0 0 16px", maxWidth: "600px",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(20px)",
            transition: "opacity 0.7s 0.18s, transform 0.7s 0.18s",
          }}>
            Creative Agency
          </h1>

          <p style={{
            fontSize: "16px", color: CREAM, lineHeight: 1.7,
            fontWeight: 300, maxWidth: "480px", marginBottom: "32px",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(14px)",
            transition: "opacity 0.7s 0.28s, transform 0.7s 0.28s",
          }}>
            Connecting people and brands to community and industry culture — from the African continent to the global Diaspora.
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
              letterSpacing: "2px", fontWeight: 700,
              transition: "opacity 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >GET IN TOUCH</Link>
            <Link to="/about" style={{
              display: "inline-block", padding: "13px 32px",
              border: "1px solid rgba(255,255,255,0.2)", color: CREAM,
              textDecoration: "none", fontSize: "11px",
              letterSpacing: "2px", fontWeight: 500,
              transition: "border-color 0.2s, color 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; e.currentTarget.style.color = "white"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = CREAM; }}
            >LEARN ABOUT US</Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          MISSION — split layout
      ══════════════════════════════════════════════ */}
      <section ref={missionRef} style={{ background: PANEL }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "480px" }}>

          {/* Left — mission statement */}
          <div style={{
            padding: "72px 5vw",
            display: "flex", flexDirection: "column", justifyContent: "center",
            borderRight: "1px solid rgba(255,255,255,0.06)",
            opacity: missionVis ? 1 : 0, transform: missionVis ? "none" : "translateX(-16px)",
            transition: "opacity 0.8s, transform 0.8s",
          }}>
            <p style={{ fontSize: "10px", letterSpacing: "3px", color: TERRA, marginBottom: "18px", fontWeight: 600 }}>
              THE MISSION
            </p>
            <h2 style={{
              fontWeight: 700, fontSize: "clamp(24px, 3vw, 42px)",
              lineHeight: 1.15, color: "white", marginBottom: "0",
            }}>
              Make maritime in Africa visible, relevant and irresistible.
            </h2>
          </div>

          {/* Right — body + stats */}
          <div style={{
            padding: "72px 5vw 72px 56px",
            display: "flex", flexDirection: "column", justifyContent: "center",
            opacity: missionVis ? 1 : 0, transform: missionVis ? "none" : "translateX(16px)",
            transition: "opacity 0.8s 0.15s, transform 0.8s 0.15s",
          }}>
            <p style={{
              fontSize: "15px", lineHeight: 1.9, color: CREAM,
              fontWeight: 300, marginBottom: "32px",
            }}>
              We connect brands, businesses, and leaders to the vibrancy, innovation, and commercial power of African and global Maritime Culture and Industry. Our expertise spans strategy, creativity, and immersive experiences — designed to deliver measurable impact for people and organisations.
            </p>

            <div style={{
              display: "flex", gap: "36px",
              paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,0.07)",
            }}>
              {[
                { val: "3",      label: "Core Services"    },
                { val: "360°",   label: "Cultural Reach"   },
                { val: "Global", label: "Diaspora Network" },
              ].map(s => (
                <div key={s.label}>
                  <span style={{ fontSize: "24px", fontWeight: 700, color: "white", display: "block", lineHeight: 1 }}>{s.val}</span>
                  <span style={{ fontSize: "9px", letterSpacing: "2px", color: MUTED, display: "block", marginTop: "5px" }}>
                    {s.label.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          THREE SERVICES — numbered list
      ══════════════════════════════════════════════ */}
      <section ref={servicesRef} style={{ background: BG, padding: "96px 5vw" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

          <div style={{
            marginBottom: "56px",
            opacity: servicesVis ? 1 : 0, transform: servicesVis ? "none" : "translateY(12px)",
            transition: "opacity 0.6s, transform 0.6s",
          }}>
            <p style={{ fontSize: "10px", letterSpacing: "3px", color: GOLD, marginBottom: "12px", fontWeight: 600 }}>
              CREATIVE AGENCY SERVICES
            </p>
            <h2 style={{
              fontWeight: 700, fontSize: "clamp(22px, 3vw, 36px)",
              color: "white", margin: 0, lineHeight: 1.2,
            }}>
              Three steps. One strategy.
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {services.map((s, i) => (
              <div key={s.num} style={{
                display: "grid",
                gridTemplateColumns: "56px 180px 1fr",
                gap: "40px",
                padding: "40px 0",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                alignItems: "start",
                opacity: servicesVis ? 1 : 0, transform: servicesVis ? "none" : "translateY(16px)",
                transition: `opacity 0.6s ${0.1 + i * 0.12}s, transform 0.6s ${0.1 + i * 0.12}s`,
              }}>
                <span style={{ fontSize: "13px", letterSpacing: "2px", color: MUTED, paddingTop: "2px" }}>
                  {s.num}
                </span>
                <div>
                  <span style={{ fontSize: "10px", letterSpacing: "2px", color: TERRA, display: "block", marginBottom: "6px", fontWeight: 600 }}>
                    {s.title}
                  </span>
                  <h3 style={{ fontSize: "20px", fontWeight: 700, color: "white", margin: 0 }}>
                    {s.headline}
                  </h3>
                </div>
                <p style={{ fontSize: "15px", lineHeight: 1.85, color: CREAM, fontWeight: 300, margin: 0 }}>
                  {s.body}
                </p>
              </div>
            ))}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }} />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          EXPERIENTIAL ADVISORY — three cards
      ══════════════════════════════════════════════ */}
      <section ref={advisoryRef} style={{ background: PANEL, padding: "96px 5vw" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

          <div style={{
            marginBottom: "48px",
            opacity: advisoryVis ? 1 : 0, transform: advisoryVis ? "none" : "translateY(12px)",
            transition: "opacity 0.6s, transform 0.6s",
          }}>
            <p style={{ fontSize: "10px", letterSpacing: "3px", color: GOLD, marginBottom: "12px", fontWeight: 600 }}>
              IMMERSIVE EXPERIENCES
            </p>
            <h2 style={{
              fontWeight: 700, fontSize: "clamp(22px, 3vw, 36px)",
              color: "white", margin: "0 0 10px", lineHeight: 1.2,
            }}>
              Experiential Advisory Services
            </h2>
            <p style={{ fontSize: "15px", color: MUTED, fontWeight: 300, maxWidth: "480px", lineHeight: 1.7, margin: 0 }}>
              Hands-on exposure to global personalities, tech and business ecosystems and experiences.
            </p>
          </div>

          <div style={{
            display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
            gap: "2px", background: "rgba(255,255,255,0.04)",
          }}>
            {advisory.map((a, i) => (
              <div key={a.num} style={{
                background: PANEL, padding: "40px 32px",
                borderTop: `2px solid ${a.accent}`,
                opacity: advisoryVis ? 1 : 0, transform: advisoryVis ? "none" : "translateY(20px)",
                transition: `opacity 0.6s ${0.1 + i * 0.12}s, transform 0.6s ${0.1 + i * 0.12}s`,
              }}>
                <span style={{ fontSize: "9px", letterSpacing: "2px", color: a.accent, display: "block", marginBottom: "16px", fontWeight: 700 }}>
                  {a.num}
                </span>
                <h3 style={{
                  fontSize: "16px", fontWeight: 700, color: "white",
                  margin: "0 0 14px", letterSpacing: "0.5px",
                }}>
                  {a.title}
                </h3>
                <div style={{ width: "24px", height: "2px", background: a.accent, marginBottom: "14px" }} />
                <p style={{ fontSize: "14px", lineHeight: 1.8, color: MUTED, fontWeight: 300, margin: 0 }}>
                  {a.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          WHY PARTNER — header + 2×2 grid
      ══════════════════════════════════════════════ */}
      <section ref={whyRef} style={{ background: BG, padding: "96px 5vw" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px",
            alignItems: "end", marginBottom: "48px",
            opacity: whyVis ? 1 : 0, transform: whyVis ? "none" : "translateY(12px)",
            transition: "opacity 0.6s, transform 0.6s",
          }}>
            <div>
              <p style={{ fontSize: "10px", letterSpacing: "3px", color: TEAL, marginBottom: "12px", fontWeight: 600 }}>
                THE ADVANTAGE
              </p>
              <h2 style={{
                fontWeight: 700, fontSize: "clamp(22px, 3vw, 36px)",
                color: "white", margin: 0, lineHeight: 1.2,
              }}>
                Why partner with us.
              </h2>
            </div>
            <p style={{ fontSize: "15px", lineHeight: 1.8, color: MUTED, fontWeight: 300, margin: 0 }}>
              Every engagement is built on cultural authority, meaningful networks, and a commitment to measurable outcomes for brands in the African maritime space.
            </p>
          </div>

          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: "2px", background: "rgba(255,255,255,0.04)",
          }}>
            {pillars.map((p, i) => (
              <div key={p.title} style={{
                background: BG, padding: "36px 32px",
                borderLeft: `3px solid ${p.accent}`,
                opacity: whyVis ? 1 : 0, transform: whyVis ? "none" : "translateY(16px)",
                transition: `opacity 0.6s ${0.1 + i * 0.1}s, transform 0.6s ${0.1 + i * 0.1}s`,
              }}>
                <h4 style={{
                  fontSize: "12px", letterSpacing: "1.5px", fontWeight: 700,
                  color: p.accent, marginBottom: "8px",
                }}>
                  {p.title.toUpperCase()}
                </h4>
                <p style={{ fontSize: "14px", lineHeight: 1.75, color: MUTED, fontWeight: 300, margin: 0 }}>
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          CTA — full bleed, clean
      ══════════════════════════════════════════════ */}
      <section ref={ctaRef} style={{
        position: "relative", overflow: "hidden",
        minHeight: "400px", display: "flex", alignItems: "center",
      }}>
        <img
          src={IMGS.cta}
          alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(105deg, rgba(15,25,18,0.97) 40%, rgba(15,25,18,0.75) 100%)",
        }} />
        <div className="ct-grain" style={{ zIndex: 1 }} />

        <div style={{
          position: "relative", zIndex: 2,
          padding: "80px 5vw", maxWidth: "640px",
          opacity: ctaVis ? 1 : 0, transform: ctaVis ? "none" : "translateY(16px)",
          transition: "opacity 0.8s, transform 0.8s",
        }}>
          <h2 style={{
            fontWeight: 700, fontSize: "clamp(28px, 4vw, 52px)",
            lineHeight: 1.1, color: "white", marginBottom: "16px",
          }}>
            Ready to make your mark in Africa?
          </h2>

          <p style={{
            fontSize: "16px", lineHeight: 1.75, color: CREAM,
            fontWeight: 300, maxWidth: "420px", marginBottom: "36px",
          }}>
            Our team reviews all requests and responds within 3–5 business days.
          </p>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link to="/partner" style={{
              display: "inline-block", padding: "13px 32px",
              background: GOLD, color: "#0F1912",
              textDecoration: "none", fontSize: "11px",
              letterSpacing: "2px", fontWeight: 700,
              transition: "opacity 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >GET IN TOUCH</Link>
            <Link to="/about" style={{
              display: "inline-block", padding: "13px 32px",
              border: "1px solid rgba(255,255,255,0.2)", color: CREAM,
              textDecoration: "none", fontSize: "11px",
              letterSpacing: "2px", fontWeight: 500,
              transition: "border-color 0.2s, color 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; e.currentTarget.style.color = "white"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = CREAM; }}
            >LEARN ABOUT US</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
