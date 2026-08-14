import { useState, useEffect, useRef } from "react";
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

/* ── Palette — single accent for a calmer, easier read ── */
const BG    = "#0F1912";
const PANEL = "#141F18";
const GOLD  = "#C4A44E";
const CREAM = "rgba(214,207,194,0.75)";
const MUTED = "rgba(214,207,194,0.42)";

/* ── Exact image paths from the document ── */
const IMGS = {
  hero:      "/abouthero1.jpg",
  market:    "/diaspora1.jpg",
  host:      "/hostimage",
  cta:       "/africanwomen.jpg",
};

/* ── Pillars ── */
const pillars = [
  {
    title: "Unite",
    body: "Building a cultural ecosystem that brings together the people and enterprises of the African maritime industry — across the continent and the Diaspora.",
  },
  {
    title: "Invest",
    body: "Creating real economic pathways between Africa and the Diaspora through exchange, collaboration, and mutual growth.",
  },
  {
    title: "Celebrate",
    body: "Spotlighting the trends, people, and stories shaping African maritime culture.",
  },
];

export default function About() {
  const [heroRef,    heroVis]    = useReveal(0.05);
  const [missionRef, missionVis] = useReveal(0.1);
  const [pillarsRef, pillarsVis] = useReveal(0.1);
  const [hostRef,    hostVis]    = useReveal(0.1);
  const [ctaRef,     ctaVis]     = useReveal(0.1);
  const isMobile = useIsMobile();

  return (
    <div style={{ minHeight: "100vh", background: BG, color: "white", overflowX: "hidden" }}>
      <Navbar />

      {/* ══════════════════════════════════════════════
          HERO — professional, restrained, image-led
          Headline at a readable size, not theatrical
      ══════════════════════════════════════════════ */}
      <section ref={heroRef} style={{
        height: "100vh", minHeight: "600px",
        position: "relative", overflow: "hidden",
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
      }}>
        <img
          src={IMGS.hero}
          alt="African diaspora community"
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center 30%",
          }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(15,25,18,1) 0%, rgba(15,25,18,0.6) 50%, transparent 85%)",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, rgba(15,25,18,0.75) 0%, transparent 60%)",
        }} />
        <div className="ct-grain" style={{ zIndex: 1 }} />

        <div style={{
          position: "relative", zIndex: 2,
          padding: "0 5vw clamp(40px, 7vw, 72px)",
        }}>
          <p style={{
            fontSize: "11px", letterSpacing: "4px", color: GOLD,
            fontWeight: 500, marginBottom: "16px",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(10px)",
            transition: "opacity 0.6s 0.1s, transform 0.6s 0.1s",
          }}>
            ABOUT CABIN TEA
          </p>

          <h1 style={{
            fontWeight: 700,
            fontSize: "clamp(36px, 5vw, 64px)",
            lineHeight: 1.1, color: "white",
            margin: "0 0 16px", maxWidth: "640px",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(20px)",
            transition: "opacity 0.7s 0.18s, transform 0.7s 0.18s",
          }}>
            Africa's Maritime Voice.
          </h1>

          <p style={{
            fontSize: "16px", color: CREAM, lineHeight: 1.7,
            fontWeight: 300, maxWidth: "480px",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(14px)",
            transition: "opacity 0.7s 0.3s, transform 0.7s 0.3s",
          }}>
            A 360° maritime media and industry network built for the African community and Diaspora — rooted in heritage, powered by the next generation.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          MISSION — split layout, image left, text right
      ══════════════════════════════════════════════ */}
      <section ref={missionRef} style={{ background: PANEL }}>
        <div style={{
          display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          minHeight: isMobile ? "auto" : "580px",
        }}>
          {/* Left — image */}
          <div style={{
            position: "relative", overflow: "hidden",
            opacity: missionVis ? 1 : 0, transform: missionVis ? "none" : "translateX(-16px)",
            transition: "opacity 0.8s, transform 0.8s",
          }}>
            <img
              src={IMGS.market}
              alt="African maritime community"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", minHeight: isMobile ? "320px" : "580px" }}
            />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to right, transparent, rgba(20,31,24,0.6) 100%)",
            }} />
          </div>

          {/* Right — mission text */}
          <div style={{
            padding: isMobile ? "40px 5vw" : "72px 5vw 72px 56px",
            display: "flex", flexDirection: "column", justifyContent: "center",
            opacity: missionVis ? 1 : 0, transform: missionVis ? "none" : "translateX(16px)",
            transition: "opacity 0.8s 0.15s, transform 0.8s 0.15s",
          }}>
            <p style={{ fontSize: "10px", letterSpacing: "3px", color: GOLD, marginBottom: "18px", fontWeight: 600 }}>
              OUR MISSION
            </p>

            <h2 style={{
              fontWeight: 700, fontSize: "clamp(22px, 2.8vw, 36px)",
              lineHeight: 1.2, color: "white", marginBottom: "22px",
            }}>
              A Cultural Ecosystem That Unites, Invests in, and Celebrates African Maritime.
            </h2>

            <p style={{ fontSize: "15px", lineHeight: 1.9, color: CREAM, fontWeight: 300 }}>
              We foster a strong cultural connection and real economic opportunity between Africa and the Diaspora — through exchange, collaboration, and mutual growth.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          THREE PILLARS — numbered list, clean
      ══════════════════════════════════════════════ */}
      <section ref={pillarsRef} style={{ background: BG, padding: "clamp(56px, 8vw, 96px) 5vw" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

          <div style={{
            marginBottom: "56px",
            opacity: pillarsVis ? 1 : 0, transform: pillarsVis ? "none" : "translateY(12px)",
            transition: "opacity 0.6s, transform 0.6s",
          }}>
            <p style={{ fontSize: "10px", letterSpacing: "3px", color: GOLD, marginBottom: "12px", fontWeight: 600 }}>
              WHAT DRIVES US
            </p>
            <h2 style={{
              fontWeight: 700, fontSize: "clamp(22px, 3vw, 36px)",
              color: "white", margin: 0, lineHeight: 1.2,
            }}>
              Three words. One mission.
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: isMobile ? "32px" : "48px" }}>
            {pillars.map((p, i) => (
              <div key={p.title} style={{
                paddingTop: "20px",
                borderTop: `2px solid ${GOLD}`,
                opacity: pillarsVis ? 1 : 0, transform: pillarsVis ? "none" : "translateY(16px)",
                transition: `opacity 0.6s ${0.1 + i * 0.12}s, transform 0.6s ${0.1 + i * 0.12}s`,
              }}>
                <h3 style={{ fontSize: "20px", fontWeight: 700, color: "white", margin: "0 0 10px" }}>
                  {p.title}
                </h3>
                <p style={{ fontSize: "14px", lineHeight: 1.75, color: CREAM, fontWeight: 300, margin: 0 }}>
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          HOST — split, image left, bio right
      ══════════════════════════════════════════════ */}
      <section ref={hostRef} style={{ background: BG }}>
        <div style={{
          display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          minHeight: isMobile ? "auto" : "560px",
        }}>
          {/* Left — host photo */}
          <div style={{
            position: "relative", overflow: "hidden",
            opacity: hostVis ? 1 : 0, transform: hostVis ? "none" : "translateX(-16px)",
            transition: "opacity 0.9s, transform 0.9s",
          }}>
            <img
              src={IMGS.host}
              alt="Host"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", minHeight: isMobile ? "320px" : "560px" }}
            />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to right, transparent, rgba(15,25,18,0.6) 100%)",
            }} />
          </div>

          {/* Right — bio */}
          <div style={{
            padding: isMobile ? "40px 5vw" : "72px 5vw 72px 56px",
            display: "flex", flexDirection: "column", justifyContent: "center",
            opacity: hostVis ? 1 : 0, transform: hostVis ? "none" : "translateX(16px)",
            transition: "opacity 0.9s 0.15s, transform 0.9s 0.15s",
          }}>
            <p style={{ fontSize: "10px", letterSpacing: "3px", color: GOLD, marginBottom: "18px", fontWeight: 600 }}>
              YOUR HOST
            </p>

            <h2 style={{
              fontWeight: 700, fontSize: "clamp(28px, 4vw, 52px)",
              lineHeight: 1.05, color: "white", marginBottom: "8px",
            }}>
              Lawrence Dogli
            </h2>

            <p style={{ fontSize: "11px", letterSpacing: "2px", color: GOLD, marginBottom: "28px" }}>
              HOST & CREATOR · CABIN TEA
            </p>

            <p style={{
              fontSize: "16px", lineHeight: 1.9, color: CREAM,
              fontWeight: 300, maxWidth: "400px",
            }}>
              A graduate of the Regional Maritime University in Ghana, Lawrence built his career at the Gulf of Guinea Maritime Institute before carrying African perspectives into policy rooms from Lisbon to Dakar. Cabin Tea is built on everything he's seen, heard, and learned inside that world.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          CTA — full bleed, clean, direct
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
            Ready to be part of the conversation?
          </h2>

          <p style={{
            fontSize: "16px", lineHeight: 1.75, color: CREAM,
            fontWeight: 300, maxWidth: "420px", marginBottom: "36px",
          }}>
            Whether you want to listen, partner, attend an event, or collaborate — there's a place for you in the Cabin Tea ecosystem.
          </p>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link to="/episodes" style={{
              display: "inline-block", padding: "13px 32px",
              background: GOLD, color: "#0F1912",
              textDecoration: "none", fontSize: "11px",
              letterSpacing: "2px", fontWeight: 700,
              transition: "opacity 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >LISTEN NOW</Link>
            <Link to="/partner" style={{
              display: "inline-block", padding: "13px 32px",
              border: "1px solid rgba(255,255,255,0.2)", color: CREAM,
              textDecoration: "none", fontSize: "11px",
              letterSpacing: "2px", fontWeight: 500,
              transition: "border-color 0.2s, color 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; e.currentTarget.style.color = "white"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = CREAM; }}
            >BECOME A PARTNER</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
