import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useIsMobile from "../hooks/useIsMobile";

function useReveal(threshold = 0.08) {
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

/* ── Palette — cold, strategic, editorial ── */
const NAVY   = "#0A0F1C";
const SLATE  = "#111827";
const MID    = "#1C2537";
const STEEL  = "#2D3A52";
const DIM    = "rgba(255,255,255,0.1)";
const MUTED  = "rgba(255,255,255,0.45)";
const BODY   = "rgba(255,255,255,0.68)";
const SIGNAL = "#C1272D";

export default function AfricaOceanDynamism() {
  const [heroRef,    heroVis]    = useReveal(0.05);
  const [beliefRef,  beliefVis]  = useReveal(0.08);
  const [stakesRef,  stakesVis]  = useReveal(0.08);
  const [emailRef,   emailVis]   = useReveal(0.1);
  const [email, setEmail] = useState("");
  const isMobile = useIsMobile();

  return (
    <div style={{ minHeight: "100vh", background: NAVY, color: "white", overflowX: "hidden" }}>
      <Navbar />

      {/* ══════════════════════════════════════════════
          HERO — image + editorial data strip below
      ══════════════════════════════════════════════ */}
      <section ref={heroRef} style={{
        minHeight: "100vh", position: "relative", overflow: "hidden",
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
      }}>
        {/* Hero image */}
        <img
          src="/maritimetech1.png"
          alt="Africa Ocean Dynamism"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(10,15,28,1) 0%, rgba(10,15,28,0.75) 50%, rgba(10,15,28,0.35) 100%)",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, rgba(10,15,28,0.8) 0%, transparent 60%)",
        }} />
        <div className="ct-grain" style={{ zIndex: 1 }} />

        {/* Live dot */}
        <div style={{
          position: "absolute", top: "88px", right: "5vw", zIndex: 2,
          display: "flex", alignItems: "center", gap: "8px",
          opacity: heroVis ? 1 : 0, transition: "opacity 0.6s 0.5s",
        }}>
          <div style={{
            width: "6px", height: "6px", borderRadius: "50%",
            background: SIGNAL, boxShadow: `0 0 10px ${SIGNAL}`,
            animation: "aod-pulse 2s ease-in-out infinite",
          }} />
          <span style={{ fontSize: "9px", letterSpacing: "3px", color: MUTED }}>LIVE · 2030 SCENARIO</span>
        </div>

        <div style={{ position: "relative", zIndex: 2, padding: "0 5vw 0" }}>
          {/* Eyebrow */}
          <div style={{
            display: "flex", alignItems: "center", gap: "14px", marginBottom: "20px",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(10px)",
            transition: "opacity 0.6s 0.1s, transform 0.6s 0.1s",
          }}>
            <div style={{ width: "20px", height: "2px", background: SIGNAL }} />
            <span style={{ fontSize: "10px", letterSpacing: "4px", color: SIGNAL, fontWeight: 600 }}>
              CABIN TEA · AFRICA OCEAN DYNAMISM
            </span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontWeight: 700,
            fontSize: "clamp(36px, 5.5vw, 72px)",
            lineHeight: 1.05, color: "white",
            margin: "0 0 12px", maxWidth: "700px",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(20px)",
            transition: "opacity 0.7s 0.18s, transform 0.7s 0.18s",
          }}>
            Africa Ocean Dynamism
          </h1>

          <p style={{
            fontSize: "17px", color: BODY, lineHeight: 1.7,
            fontWeight: 300, maxWidth: "520px",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(14px)",
            transition: "opacity 0.7s 0.28s, transform 0.7s 0.28s",
          }}>
            A conviction that the founders building solutions to Africa's ocean and maritime challenges deserve serious, sustained investment.
          </p>
        </div>

        <style>{`
          @keyframes aod-pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.4; transform: scale(0.7); }
          }
        `}</style>
      </section>

      {/* ══════════════════════════════════════════════
          WHAT WE BELIEVE + THE AGENDA — combined,
          two-column editorial layout
      ══════════════════════════════════════════════ */}
      <section ref={beliefRef} style={{ background: SLATE, padding: "clamp(56px, 8vw, 96px) 5vw" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ height: "1px", background: DIM, marginBottom: "48px" }} />

          <div style={{
            display: "grid", gridTemplateColumns: isMobile ? "1fr" : "200px 1fr",
            gap: isMobile ? "24px" : "64px",
            opacity: beliefVis ? 1 : 0, transform: beliefVis ? "none" : "translateY(16px)",
            transition: "opacity 0.7s, transform 0.7s",
          }}>
            {/* Left label */}
            <div>
              <span style={{ fontSize: "9px", letterSpacing: "3px", color: MUTED, display: "block", marginBottom: "12px" }}>
                WHAT WE BELIEVE
              </span>
              <div style={{ width: "20px", height: "2px", background: SIGNAL }} />
            </div>

            {/* Right content */}
            <div>
              <p style={{
                fontSize: "clamp(18px, 2.2vw, 24px)", lineHeight: 1.55,
                color: "white", fontWeight: 400, marginBottom: "28px",
              }}>
                At the heart of Africa Ocean Dynamism is a conviction: that the founders building solutions to Africa's ocean and maritime challenges deserve serious, sustained investment.
              </p>
              <p style={{ fontSize: "15px", lineHeight: 1.9, color: BODY, fontWeight: 300, maxWidth: "680px" }}>
                We amplify companies working across food systems, human security, environmental stewardship, and ocean-based growth — founders thinking not in quarters but in generations. That is the investment we are making.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          THE STAKES — It is 2030.
          Two column: narrative left, data right
      ══════════════════════════════════════════════ */}
      <section ref={stakesRef} style={{ background: NAVY, padding: "clamp(56px, 8vw, 96px) 5vw" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

          {/* Header */}
          <div style={{
            marginBottom: "64px",
            opacity: stakesVis ? 1 : 0, transform: stakesVis ? "none" : "translateY(12px)",
            transition: "opacity 0.6s, transform 0.6s",
          }}>
            <div style={{ height: "1px", background: `rgba(193,39,45,0.4)`, marginBottom: "24px" }} />
            <div style={{ display: "flex", alignItems: "baseline", gap: "20px" }}>
              <span style={{ fontSize: "9px", letterSpacing: "3px", color: SIGNAL, fontWeight: 600 }}>THE STAKES</span>
              <h2 style={{
                fontWeight: 700, fontSize: "clamp(28px, 4vw, 52px)",
                color: "white", lineHeight: 1.05, margin: 0,
              }}>It is 2030.</h2>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr", alignItems: "start" }}>

            {/* Narrative, trimmed to essentials */}
            <div style={{
              maxWidth: "720px",
              opacity: stakesVis ? 1 : 0, transform: stakesVis ? "none" : "translateX(-16px)",
              transition: "opacity 0.8s 0.1s, transform 0.8s 0.1s",
            }}>
              <p style={{ fontSize: "17px", lineHeight: 1.75, color: "white", fontWeight: 400, marginBottom: "24px" }}>
                The world is on edge — and Africa's coastlines are no longer peripheral to what happens next.
              </p>
              <p style={{ fontSize: "15px", lineHeight: 1.9, color: BODY, fontWeight: 300, marginBottom: "24px" }}>
                Africa's blue economy — currently $300 billion annually — is structurally exposed to shocks in global shipping and trade. But the founders building solutions already exist: across Lagos, Mombasa, Dakar, Cape Town, Accra, and Maputo, they're tracking illegal fishing fleets, decarbonising ports, digitising customs corridors, and feeding coastal populations from more sustainable ocean systems.
              </p>

              {/* Closing callout */}
              <div style={{
                padding: "28px 32px",
                background: MID, borderLeft: `3px solid ${SIGNAL}`,
                marginTop: "8px",
              }}>
                <p style={{ fontSize: "16px", lineHeight: 1.6, color: "white", margin: 0 }}>
                  That is the investment Africa Ocean Dynamism is making. And the moment for it has never been more urgent.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          NEWSLETTER SIGNUP
      ══════════════════════════════════════════════ */}
      <section ref={emailRef} style={{ background: MID, padding: "clamp(56px, 8vw, 96px) 5vw" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ height: "1px", background: DIM, marginBottom: "48px" }} />
          <div style={{
            display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? "40px" : "80px", alignItems: "center",
            opacity: emailVis ? 1 : 0, transform: emailVis ? "none" : "translateY(16px)",
            transition: "opacity 0.7s, transform 0.7s",
          }}>
            <div>
              <span style={{ fontSize: "9px", letterSpacing: "3px", color: SIGNAL, display: "block", marginBottom: "16px", fontWeight: 600 }}>
                AFRICA OCEAN DYNAMISM STARTS WITH PEOPLE
              </span>
              <h2 style={{
                fontWeight: 700, fontSize: "clamp(20px, 2.8vw, 36px)",
                color: "white", lineHeight: 1.2, marginBottom: "16px",
              }}>
                The ideas, companies, and individuals building toward a more sustainable future.
              </h2>
              <p style={{ fontSize: "15px", lineHeight: 1.8, color: MUTED, fontWeight: 300, margin: 0 }}>
                Sign up for our Africa Ocean Dynamism newsletter to get the Cabin Tea take on the ocean economy.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{
                  width: "100%", padding: "15px 18px",
                  background: STEEL, border: `1px solid ${DIM}`,
                  color: "white", fontSize: "14px",
                  fontFamily: "inherit", outline: "none",
                  boxSizing: "border-box", transition: "border-color 0.2s",
                }}
                onFocus={e => e.target.style.borderColor = "rgba(255,255,255,0.4)"}
                onBlur={e => e.target.style.borderColor = DIM}
              />
              <button
                onClick={() => { if (email) { alert("Thank you for signing up."); setEmail(""); }}}
                style={{
                  padding: "15px 28px", background: SIGNAL, color: "white",
                  border: "none", cursor: "pointer",
                  fontSize: "10px", letterSpacing: "3px", fontWeight: 700,
                  fontFamily: "inherit", transition: "opacity 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}
              >
                SUBSCRIBE TO THE NEWSLETTER
              </button>
              <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.2)", margin: 0 }}>
                We respect your privacy. No spam, ever.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
