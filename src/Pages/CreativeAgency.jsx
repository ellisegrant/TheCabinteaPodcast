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
const TEAL  = "#2C8C7C";
const CREAM = "rgba(214,207,194,0.75)";
const MUTED = "rgba(214,207,194,0.42)";

/* ── Image paths — exact from document ── */
const IMGS = {
  hero: "/creativeagency.jpg",
  cta:  "/maritimeheritage.jpg",
};

/* ── Areas of cooperation — condensed from the Creative Agency brief ── */
const cooperation = [
  {
    num: "01",
    title: "INSIGHT",
    headline: "We help clients understand the market before they enter it.",
    body: "Research and intelligence that map the landscape, track trends, and surface the insight needed for informed decisions.",
    accent: GOLD,
  },
  {
    num: "02",
    title: "ACCESS",
    headline: "We open doors.",
    body: "Stakeholder engagement and liaison connect clients with the government bodies, industry players, and decision-makers who shape outcomes in Ghana's mission-critical sectors.",
    accent: TERRA,
  },
  {
    num: "03",
    title: "GROWTH",
    headline: "We turn insight into opportunity.",
    body: "Business development work identifies and develops commercial prospects, moving clients from market entry to sustained growth.",
    accent: TEAL,
  },
  {
    num: "04",
    title: "EXPERTISE",
    headline: "We advise on what matters.",
    body: "Sector advisory and technical support guide clients through the demands of oil and gas, mining, maritime, and other complex sectors.",
    accent: GOLD,
  },
  {
    num: "05",
    title: "NARRATIVE",
    headline: "We tell the story right.",
    body: "PR and strategic communication ensure every stakeholder interaction is backed by a clear, credible narrative.",
    accent: TERRA,
  },
];

export default function CreativeAgency() {
  const [heroRef,     heroVis]     = useReveal(0.05);
  const [missionRef,  missionVis]  = useReveal(0.1);
  const [servicesRef, servicesVis] = useReveal(0.1);
  const [ctaRef,      ctaVis]      = useReveal(0.1);
  const isMobile = useIsMobile();

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

        <div style={{ position: "relative", zIndex: 2, padding: "0 5vw clamp(40px, 7vw, 72px)" }}>
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
            We exist to advance our clients' market position and commercial interests across Ghana and the wider region.
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
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", minHeight: isMobile ? "auto" : "480px" }}>

          {/* Left — mission statement */}
          <div style={{
            padding: isMobile ? "40px 5vw" : "72px 5vw",
            display: "flex", flexDirection: "column", justifyContent: "center",
            borderRight: isMobile ? "none" : "1px solid rgba(255,255,255,0.06)",
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
              Advance our clients' market position and commercial interests across Ghana and the wider region.
            </h2>
          </div>

          {/* Right — video, then body below it */}
          <div style={{
            padding: isMobile ? "40px 5vw" : "56px 5vw 56px 56px",
            display: "flex", flexDirection: "column", justifyContent: "center",
            gap: "24px",
            opacity: missionVis ? 1 : 0, transform: missionVis ? "none" : "translateX(16px)",
            transition: "opacity 0.8s 0.15s, transform 0.8s 0.15s",
          }}>
            <video controls loop playsInline style={{
              width: "100%", height: "auto", display: "block", objectFit: "cover",
            }}>
              <source src="/cabin-video.mp4" type="video/mp4" />
            </video>
            <p style={{
              fontSize: "15px", lineHeight: 1.9, color: CREAM,
              fontWeight: 300, margin: 0,
            }}>
              Cabin Tea is a creative and advisory agency supporting market development, stakeholder engagement, business development, and capacity-building across Ghana's mission-critical sectors — oil and gas, mining, maritime, fisheries, ports, security, transport, and logistics.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          THREE SERVICES — numbered list
      ══════════════════════════════════════════════ */}
      <section ref={servicesRef} style={{ background: BG, padding: "clamp(56px, 8vw, 96px) 5vw" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

          <div style={{
            marginBottom: "56px",
            opacity: servicesVis ? 1 : 0, transform: servicesVis ? "none" : "translateY(12px)",
            transition: "opacity 0.6s, transform 0.6s",
          }}>
            <p style={{ fontSize: "10px", letterSpacing: "3px", color: GOLD, marginBottom: "12px", fontWeight: 600 }}>
              OUR SERVICES
            </p>
            <h2 style={{
              fontWeight: 700, fontSize: "clamp(22px, 3vw, 36px)",
              color: "white", margin: "0 0 10px", lineHeight: 1.2,
            }}>
              Areas of Cooperation
            </h2>
            <p style={{ fontSize: "15px", color: MUTED, fontWeight: 300, maxWidth: "520px", lineHeight: 1.7, margin: 0 }}>
              Local market knowledge, stakeholder access, market intelligence, and sector advisory — helping clients develop commercial opportunities in Ghana and, where mutually agreed, across the region.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {cooperation.map((s, i) => (
              <div key={s.num} style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "56px 180px 1fr",
                gap: isMobile ? "8px" : "40px",
                padding: "40px 0",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                alignItems: "start",
                opacity: servicesVis ? 1 : 0, transform: servicesVis ? "none" : "translateY(16px)",
                transition: `opacity 0.6s ${0.1 + i * 0.1}s, transform 0.6s ${0.1 + i * 0.1}s`,
              }}>
                <span style={{ fontSize: "13px", letterSpacing: "2px", color: MUTED, paddingTop: "2px" }}>
                  {s.num}
                </span>
                <div>
                  <span style={{ fontSize: "10px", letterSpacing: "2px", color: s.accent, display: "block", marginBottom: "6px", fontWeight: 600 }}>
                    {s.title}
                  </span>
                  <h3 style={{ fontSize: "18px", fontWeight: 700, color: "white", margin: 0, lineHeight: 1.3 }}>
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
          padding: "clamp(48px, 7vw, 80px) 5vw", maxWidth: "640px",
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
