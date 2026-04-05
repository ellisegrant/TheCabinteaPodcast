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

/* ── Exact image paths from document ── */
const IMGS = {
  hero:      "/handshero1.png",
  fishermen: "/dis1.jpg",
  culture1:  "/dis2.jpg",
  diaspora1: "/africandrum.jpg",
  market:    "/africanmask1.jpg",
  harbour:   "/africanmask2.jpg",
  attire:    "/afrique.jpg",
  youth:     "/afrique3.jpg",
  cta:       "/cabin.jpg",
};

/* ── Pillars — exact content from document ── */
const pillars = [
  {
    num: "01",
    title: "Cultural Exchange",
    body: "A dedicated space for the African Diaspora to return to their maritime heritage through dialogue, performance, storytelling, and shared memory — the way the Sankofa bird looks back while flying forward.",
  },
  {
    num: "02",
    title: "Knowledge Sharing",
    body: "Industry leaders, community elders, indigenous knowledge holders, and emerging voices converge to share expertise and lived experience across the blue economy and its cultural heritage.",
  },
  {
    num: "03",
    title: "Networking",
    body: "Strategic connections forged between professionals, entrepreneurs, and institutions across Africa and the Diaspora — like teeth and tongue, inseparable and stronger together.",
  },
  {
    num: "04",
    title: "Economic Access",
    body: "Facilitating greater access to economic opportunities and resources — adapting, growing, and carving new paths both within the Diaspora and on the African continent.",
  },
];

export default function Afrocean() {
  const [heroRef,    heroVis]    = useReveal(0.05);
  const [rootsRef,   rootsVis]   = useReveal(0.08);
  const [mosaicRef,  mosaicVis]  = useReveal(0.08);
  const [pillarsRef, pillarsVis] = useReveal(0.1);
  const [diaspRef,   diaspVis]   = useReveal(0.1);
  const [ctaRef,     ctaVis]     = useReveal(0.1);

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
          alt="African cultural gathering"
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center 40%",
          }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(15,25,18,1) 0%, rgba(15,25,18,0.6) 50%, transparent 85%)",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, rgba(15,25,18,0.78) 0%, transparent 60%)",
        }} />
        <div className="ct-grain" style={{ zIndex: 1 }} />

        <div style={{ position: "relative", zIndex: 2, padding: "0 5vw 72px" }}>
          <p style={{
            fontSize: "11px", letterSpacing: "4px", color: GOLD,
            fontWeight: 500, marginBottom: "16px",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(10px)",
            transition: "opacity 0.6s 0.1s, transform 0.6s 0.1s",
          }}>
            CABIN TEA · CULTURAL GATHERING
          </p>

          <h1 style={{
            fontWeight: 700,
            fontSize: "clamp(36px, 5vw, 64px)",
            lineHeight: 1.1, color: "white",
            margin: "0 0 16px", maxWidth: "600px",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(20px)",
            transition: "opacity 0.7s 0.18s, transform 0.7s 0.18s",
          }}>
            Afrocean
          </h1>

          <p style={{
            fontSize: "16px", color: CREAM, lineHeight: 1.7,
            fontWeight: 300, maxWidth: "480px", marginBottom: "32px",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(14px)",
            transition: "opacity 0.7s 0.28s, transform 0.7s 0.28s",
          }}>
            A dynamic and inclusive gathering that unites individuals of the African Diaspora, fostering a deep connection with their maritime heritage and indigenous roots.
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
            >GET INVOLVED</Link>
            <Link to="/episodes" style={{
              display: "inline-block", padding: "13px 32px",
              border: "1px solid rgba(255,255,255,0.2)", color: CREAM,
              textDecoration: "none", fontSize: "11px",
              letterSpacing: "2px", fontWeight: 500,
              transition: "border-color 0.2s, color 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; e.currentTarget.style.color = "white"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = CREAM; }}
            >LISTEN NOW</Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          ROOTS — split image + text
      ══════════════════════════════════════════════ */}
      <section ref={rootsRef} style={{ background: PANEL }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "560px" }}>

          {/* Left — image */}
          <div style={{
            position: "relative", overflow: "hidden",
            opacity: rootsVis ? 1 : 0, transform: rootsVis ? "none" : "translateX(-16px)",
            transition: "opacity 0.8s, transform 0.8s",
          }}>
            <img
              src={IMGS.fishermen}
              alt="African coastal community"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", minHeight: "560px" }}
            />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to right, transparent, rgba(20,31,24,0.6) 100%)",
            }} />
            {/* Caption card */}
            <div style={{
              position: "absolute", bottom: "36px", left: "28px",
              background: TERRA, color: "white", padding: "16px 20px", maxWidth: "220px",
            }}>
              <span style={{ fontSize: "9px", letterSpacing: "2px", display: "block", marginBottom: "6px", color: "rgba(255,255,255,0.7)" }}>
                INDIGENOUS HERITAGE
              </span>
              <p style={{ fontSize: "13px", lineHeight: 1.6, margin: 0 }}>
                "The sea is our ancestor. We were navigators long before the world knew it."
              </p>
            </div>
          </div>

          {/* Right — text */}
          <div style={{
            padding: "72px 5vw 72px 56px",
            display: "flex", flexDirection: "column", justifyContent: "center",
            opacity: rootsVis ? 1 : 0, transform: rootsVis ? "none" : "translateX(16px)",
            transition: "opacity 0.8s 0.15s, transform 0.8s 0.15s",
          }}>
            <p style={{ fontSize: "10px", letterSpacing: "3px", color: TERRA, marginBottom: "18px", fontWeight: 600 }}>
              THE ROOTS
            </p>

            <h2 style={{
              fontWeight: 700, fontSize: "clamp(22px, 2.8vw, 36px)",
              lineHeight: 1.2, color: "white", marginBottom: "20px",
            }}>
              Long before colonial borders, African peoples were master navigators, coastal traders, and ocean stewards.
            </h2>

            <p style={{ fontSize: "15px", lineHeight: 1.9, color: CREAM, fontWeight: 300, marginBottom: "16px" }}>
              From the Swahili merchants of East Africa to the Fante fishermen of Ghana's Cape Coast — the sea was always home.
            </p>

            <p style={{ fontSize: "15px", lineHeight: 1.9, color: MUTED, fontWeight: 300, marginBottom: "36px" }}>
              Afrocean exists to honour that heritage — connecting the Diaspora back to the indigenous knowledge, the coastal communities, and the ancestral relationship with the ocean that was never truly lost.
            </p>

            <div style={{
              display: "flex", gap: "36px",
              paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,0.07)",
            }}>
              {[
                { val: "54",    label: "African Nations"     },
                { val: "3.1M",  label: "KM of Coastline"    },
                { val: "1000+", label: "Years of Navigation" },
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
          IMAGE MOSAIC — 5 photos, two rows
      ══════════════════════════════════════════════ */}
      <section ref={mosaicRef} style={{ background: BG, overflow: "hidden" }}>
        <div style={{
          padding: "56px 5vw 32px",
          opacity: mosaicVis ? 1 : 0, transform: mosaicVis ? "none" : "translateY(12px)",
          transition: "opacity 0.6s, transform 0.6s",
        }}>
          <p style={{ fontSize: "10px", letterSpacing: "3px", color: GOLD, margin: 0, fontWeight: 600 }}>
            THE CULTURE
          </p>
        </div>

        {/* Row 1 — 3 images */}
        <div style={{
          display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: "2px",
          opacity: mosaicVis ? 1 : 0, transform: mosaicVis ? "none" : "translateY(20px)",
          transition: "opacity 0.8s 0.1s, transform 0.8s 0.1s",
        }}>
          {[
            { src: IMGS.culture1, h: "300px", label: "Indigenous Dress",     sub: "West Africa"    },
            { src: IMGS.market,   h: "300px", label: "Community Gathering",  sub: "The Continent"  },
            { src: IMGS.harbour,  h: "300px", label: "Coastal Heritage",     sub: "Maritime Roots" },
          ].map((img, i) => (
            <div key={i} style={{ position: "relative", overflow: "hidden" }}>
              <img src={img.src} alt={img.label}
                style={{ width: "100%", height: img.h, objectFit: "cover", display: "block" }} />
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(15,25,18,0.85) 0%, transparent 55%)",
              }} />
              <div style={{ position: "absolute", bottom: "16px", left: "16px" }}>
                <span style={{ fontSize: "13px", fontWeight: 600, color: "white", display: "block" }}>{img.label}</span>
                <span style={{ fontSize: "9px", letterSpacing: "2px", color: GOLD }}>{img.sub.toUpperCase()}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Row 2 — 2 images */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "2px", marginTop: "2px",
          opacity: mosaicVis ? 1 : 0, transform: mosaicVis ? "none" : "translateY(20px)",
          transition: "opacity 0.8s 0.22s, transform 0.8s 0.22s",
        }}>
          {[
            { src: IMGS.youth,    h: "240px", label: "Next Generation", sub: "Diaspora Youth"    },
            { src: IMGS.diaspora1,h: "240px", label: "The Gathering",   sub: "Afrocean Community"},
          ].map((img, i) => (
            <div key={i} style={{ position: "relative", overflow: "hidden" }}>
              <img src={img.src} alt={img.label}
                style={{ width: "100%", height: img.h, objectFit: "cover", display: "block" }} />
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(15,25,18,0.85) 0%, transparent 55%)",
              }} />
              <div style={{ position: "absolute", bottom: "16px", left: "16px" }}>
                <span style={{ fontSize: "13px", fontWeight: 600, color: "white", display: "block" }}>{img.label}</span>
                <span style={{ fontSize: "9px", letterSpacing: "2px", color: GOLD }}>{img.sub.toUpperCase()}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FOUR PILLARS — numbered list
      ══════════════════════════════════════════════ */}
      <section ref={pillarsRef} style={{ background: PANEL, padding: "96px 5vw" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px",
            alignItems: "end", marginBottom: "56px",
            opacity: pillarsVis ? 1 : 0, transform: pillarsVis ? "none" : "translateY(12px)",
            transition: "opacity 0.6s, transform 0.6s",
          }}>
            <div>
              <p style={{ fontSize: "10px", letterSpacing: "3px", color: GOLD, marginBottom: "12px", fontWeight: 600 }}>
                FOUR PILLARS
              </p>
              <h2 style={{
                fontWeight: 700, fontSize: "clamp(22px, 3vw, 36px)",
                color: "white", margin: 0, lineHeight: 1.2,
              }}>
                What Afrocean stands for.
              </h2>
            </div>
            <p style={{ fontSize: "15px", lineHeight: 1.8, color: MUTED, fontWeight: 300, margin: 0 }}>
              Each pillar is grounded in Adinkra philosophy — the visual language of the Akan people of Ghana, used for centuries to encode wisdom, values, and cultural identity.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {pillars.map((p, i) => (
              <div key={p.num} style={{
                display: "grid",
                gridTemplateColumns: "56px 200px 1fr",
                gap: "40px",
                padding: "36px 0",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                alignItems: "start",
                opacity: pillarsVis ? 1 : 0, transform: pillarsVis ? "none" : "translateY(16px)",
                transition: `opacity 0.6s ${0.1 + i * 0.1}s, transform 0.6s ${0.1 + i * 0.1}s`,
              }}>
                <span style={{ fontSize: "13px", letterSpacing: "2px", color: MUTED, paddingTop: "2px" }}>
                  {p.num}
                </span>
                <h3 style={{ fontSize: "20px", fontWeight: 700, color: "white", margin: 0 }}>
                  {p.title}
                </h3>
                <p style={{ fontSize: "15px", lineHeight: 1.85, color: CREAM, fontWeight: 300, margin: 0 }}>
                  {p.body}
                </p>
              </div>
            ))}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }} />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          DIASPORA — split text + stacked images
      ══════════════════════════════════════════════ */}
      <section ref={diaspRef} style={{ background: BG }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "560px" }}>

          {/* Left — text */}
          <div style={{
            padding: "72px 5vw",
            display: "flex", flexDirection: "column", justifyContent: "center",
            opacity: diaspVis ? 1 : 0, transform: diaspVis ? "none" : "translateX(-16px)",
            transition: "opacity 0.8s, transform 0.8s",
          }}>
            <p style={{ fontSize: "10px", letterSpacing: "3px", color: TERRA, marginBottom: "18px", fontWeight: 600 }}>
              THE DIASPORA
            </p>

            <h2 style={{
              fontWeight: 700, fontSize: "clamp(22px, 2.8vw, 38px)",
              lineHeight: 1.15, color: "white", marginBottom: "20px",
            }}>
              Where home is a horizon away.
            </h2>

            <p style={{ fontSize: "15px", lineHeight: 1.9, color: CREAM, fontWeight: 300, marginBottom: "16px" }}>
              Afrocean is built for the millions of Africans and people of African descent living across the world — from London to Lagos, Brooklyn to Bridgetown — who carry the ocean in their blood but may have never stood at its African shore.
            </p>
            <p style={{ fontSize: "15px", lineHeight: 1.9, color: MUTED, fontWeight: 300, marginBottom: "32px" }}>
              This gathering is the bridge. A space to reconnect with the maritime heritage, the indigenous knowledge, and the living communities that the Diaspora was separated from — and to invest in their future together.
            </p>

            <Link to="/partner" style={{
              display: "inline-block", padding: "13px 32px",
              background: TERRA, color: "white",
              textDecoration: "none", fontSize: "11px",
              letterSpacing: "2px", fontWeight: 700,
              transition: "opacity 0.2s", alignSelf: "flex-start",
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >JOIN AFROCEAN →</Link>
          </div>

          {/* Right — two stacked images */}
          <div style={{
            display: "grid", gridTemplateRows: "1fr 1fr", gap: "2px",
            opacity: diaspVis ? 1 : 0, transform: diaspVis ? "none" : "translateX(16px)",
            transition: "opacity 0.8s 0.15s, transform 0.8s 0.15s",
          }}>
            <div style={{ position: "relative", overflow: "hidden" }}>
              <img src={IMGS.diaspora1} alt="African Diaspora"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: "rgba(15,25,18,0.2)" }} />
              <div style={{
                position: "absolute", top: "16px", left: "16px",
                background: "rgba(15,25,18,0.85)", backdropFilter: "blur(8px)",
                padding: "7px 14px", border: "1px solid rgba(255,255,255,0.1)",
              }}>
                <span style={{ fontSize: "9px", letterSpacing: "2px", color: GOLD }}>THE DIASPORA</span>
              </div>
            </div>

            <div style={{ position: "relative", overflow: "hidden" }}>
              <img src={IMGS.attire} alt="Indigenous African culture"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: "rgba(15,25,18,0.2)" }} />
              <div style={{
                position: "absolute", top: "16px", left: "16px",
                background: TERRA, padding: "7px 14px",
              }}>
                <span style={{ fontSize: "9px", letterSpacing: "2px", color: "white" }}>THE HOMELAND</span>
              </div>
            </div>
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
            Be part of the next Afrocean.
          </h2>

          <p style={{
            fontSize: "16px", lineHeight: 1.75, color: CREAM,
            fontWeight: 300, maxWidth: "420px", marginBottom: "36px",
          }}>
            Connect with the African maritime community, the global Diaspora, and indigenous coastal cultures at our flagship cultural gathering.
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
            >GET INVOLVED</Link>
            <Link to="/about" style={{
              display: "inline-block", padding: "13px 32px",
              border: "1px solid rgba(255,255,255,0.2)", color: CREAM,
              textDecoration: "none", fontSize: "11px",
              letterSpacing: "2px", fontWeight: 500,
              transition: "border-color 0.2s, color 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; e.currentTarget.style.color = "white"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = CREAM; }}
            >LEARN MORE</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
