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

/* ── Palette ── */
const BG    = "#0F1912";
const PANEL = "#141F18";
const DARK2 = "#1A2820";
const GOLD  = "#C4A44E";
const TERRA = "#B5541E";
const TEAL  = "#2C8C7C";
const CREAM = "rgba(214,207,194,0.75)";
const MUTED = "rgba(214,207,194,0.42)";

/* ── Exact image paths from the document ── */
const IMGS = {
  hero:      "/abouthero1.jpg",
  community: "/ghanamen.jpg",
  market:    "/diaspora1.jpg",
  diaspora:  "/diaspora2.jpg",
  host:      "/hostimage",
  cta:       "/africanwomen.jpg",
};

/* ── Pillars — exact content from document ── */
const pillars = [
  {
    num: "01",
    title: "Unite",
    body: "Building a cultural ecosystem that brings together people and enterprises of the African maritime industry — across the continent and the Diaspora.",
  },
  {
    num: "02",
    title: "Invest",
    body: "Creating real economic pathways between Africa and the Diaspora by facilitating cultural and industry exchange, collaboration, and mutual growth.",
  },
  {
    num: "03",
    title: "Celebrate",
    body: "Spotlighting emerging trends, elevating local insights, and amplifying African maritime culture to the world with intention and pride.",
  },
];

/* ── Ecosystem — exact content from document ── */
const ecosystem = [
  {
    tag: "PODCAST",
    name: "Cabin Tea",
    desc: "A live conversation series where ocean professionals come together over a carefully chosen cup of tea. Recorded live in Accra, heard everywhere.",
    to: "/episodes",
    accent: TEAL,
  },
  {
    tag: "GATHERING",
    name: "Afrocean",
    desc: "A dynamic gathering that unites individuals of the African Diaspora, fostering a deep connection with their maritime heritage through cultural exchange.",
    to: "/afrocean",
    accent: GOLD,
  },
  {
    tag: "MEDIA HUB",
    name: "Anchorage",
    desc: "A centralized media hub curating personalized maritime content and reshaping how the Diaspora engages with the maritime world.",
    to: "/anchorage",
    accent: TEAL,
  },
  {
    tag: "AGENCY",
    name: "Creative Agency",
    desc: "Connecting brands to the vibrancy, innovation, and commercial power of African maritime culture through strategy, creativity, and immersive experiences.",
    to: "/creative-agency",
    accent: TERRA,
  },
];

export default function About() {
  const [heroRef,    heroVis]    = useReveal(0.05);
  const [missionRef, missionVis] = useReveal(0.1);
  const [pillarsRef, pillarsVis] = useReveal(0.1);
  const [ecoRef,     ecoVis]     = useReveal(0.1);
  const [hostRef,    hostVis]    = useReveal(0.1);
  const [ctaRef,     ctaVis]     = useReveal(0.1);

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
          padding: "0 5vw 72px",
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
          display: "grid", gridTemplateColumns: "1fr 1fr",
          minHeight: "580px",
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
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", minHeight: "580px" }}
            />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to right, transparent, rgba(20,31,24,0.6) 100%)",
            }} />
            {/* Stat */}
            <div style={{
              position: "absolute", bottom: "36px", left: "28px",
              background: TERRA, color: "white", padding: "18px 22px",
            }}>
              <span style={{ fontSize: "40px", fontWeight: 700, display: "block", lineHeight: 1 }}>50%+</span>
              <span style={{ fontSize: "11px", lineHeight: 1.5, display: "block", marginTop: "6px", color: "rgba(255,255,255,0.85)" }}>
                of Africa under 25. The blue economy renaissance belongs to this generation.
              </span>
            </div>
          </div>

          {/* Right — mission text */}
          <div style={{
            padding: "72px 5vw 72px 56px",
            display: "flex", flexDirection: "column", justifyContent: "center",
            opacity: missionVis ? 1 : 0, transform: missionVis ? "none" : "translateX(16px)",
            transition: "opacity 0.8s 0.15s, transform 0.8s 0.15s",
          }}>
            <p style={{ fontSize: "10px", letterSpacing: "3px", color: TEAL, marginBottom: "18px", fontWeight: 600 }}>
              OUR MISSION
            </p>

            <h2 style={{
              fontWeight: 700, fontSize: "clamp(22px, 2.8vw, 36px)",
              lineHeight: 1.2, color: "white", marginBottom: "22px",
            }}>
              A Cultural Ecosystem That Unites, Invests in, and Celebrates African Maritime.
            </h2>

            <p style={{ fontSize: "15px", lineHeight: 1.9, color: CREAM, fontWeight: 300, marginBottom: "16px" }}>
              Our mission is to foster a strong cultural connection and enhance economic opportunities between Africa and the Diaspora — facilitating exchange, collaboration, and mutual growth.
            </p>

            <p style={{ fontSize: "15px", lineHeight: 1.9, color: MUTED, fontWeight: 300, marginBottom: "36px" }}>
              We strive to create avenues for economic empowerment and sustainable development that benefit both the African continent and Diaspora communities worldwide.
            </p>

            <div style={{
              display: "flex", gap: "36px",
              paddingTop: "24px",
              borderTop: "1px solid rgba(255,255,255,0.07)",
            }}>
              {[
                { val: "360°", label: "Media Network" },
                { val: "Global", label: "Diaspora Reach" },
                { val: "Africa", label: "Next Generation" },
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
          THREE PILLARS — numbered list, clean
      ══════════════════════════════════════════════ */}
      <section ref={pillarsRef} style={{ background: BG, padding: "96px 5vw" }}>
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

          <div style={{ display: "flex", flexDirection: "column" }}>
            {pillars.map((p, i) => (
              <div key={p.num} style={{
                display: "grid",
                gridTemplateColumns: "56px 180px 1fr",
                gap: "40px",
                padding: "40px 0",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                alignItems: "start",
                opacity: pillarsVis ? 1 : 0, transform: pillarsVis ? "none" : "translateY(16px)",
                transition: `opacity 0.6s ${0.1 + i * 0.12}s, transform 0.6s ${0.1 + i * 0.12}s`,
              }}>
                <span style={{ fontSize: "13px", letterSpacing: "2px", color: MUTED, paddingTop: "2px" }}>
                  {p.num}
                </span>
                <h3 style={{
                  fontSize: "22px", fontWeight: 700, color: "white", margin: 0,
                }}>
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
          ECOSYSTEM — 2×2 card grid
      ══════════════════════════════════════════════ */}
      <section ref={ecoRef} style={{ background: PANEL, padding: "96px 5vw" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

          <div style={{
            marginBottom: "48px",
            opacity: ecoVis ? 1 : 0, transform: ecoVis ? "none" : "translateY(12px)",
            transition: "opacity 0.6s, transform 0.6s",
          }}>
            <p style={{ fontSize: "10px", letterSpacing: "3px", color: GOLD, marginBottom: "12px", fontWeight: 600 }}>
              THE ECOSYSTEM
            </p>
            <h2 style={{
              fontWeight: 700, fontSize: "clamp(22px, 3vw, 36px)",
              color: "white", margin: 0, lineHeight: 1.2,
            }}>
              More than a podcast.
            </h2>
          </div>

          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: "2px", background: "rgba(255,255,255,0.04)",
          }}>
            {ecosystem.map((item, i) => (
              <Link key={item.name} to={item.to} style={{
                textDecoration: "none",
                background: PANEL,
                padding: "44px 40px",
                display: "flex", flexDirection: "column",
                borderTop: `2px solid ${item.accent}`,
                transition: "background 0.25s",
                opacity: ecoVis ? 1 : 0, transform: ecoVis ? "none" : "translateY(20px)",
                transitionProperty: "background, opacity, transform",
                transitionDuration: "0.25s, 0.6s, 0.6s",
                transitionDelay: `0s, ${0.1 + i * 0.1}s, ${0.1 + i * 0.1}s`,
              }}
                onMouseEnter={e => e.currentTarget.style.background = DARK2}
                onMouseLeave={e => e.currentTarget.style.background = PANEL}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                  <span style={{
                    fontSize: "9px", letterSpacing: "2.5px", fontWeight: 700,
                    color: item.accent,
                  }}>{item.tag}</span>
                  <span style={{ color: MUTED, fontSize: "16px" }}>→</span>
                </div>
                <h3 style={{
                  fontSize: "clamp(20px, 2.2vw, 28px)", fontWeight: 700,
                  color: "white", margin: "0 0 12px",
                }}>{item.name}</h3>
                <p style={{
                  fontSize: "14px", lineHeight: 1.8,
                  color: MUTED, fontWeight: 300, margin: 0,
                }}>{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          HOST — split, image left, bio right
      ══════════════════════════════════════════════ */}
      <section ref={hostRef} style={{ background: BG }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          minHeight: "560px",
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
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", minHeight: "560px" }}
            />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to right, transparent, rgba(15,25,18,0.6) 100%)",
            }} />
            <div style={{
              position: "absolute", top: "28px", left: "24px",
              background: TERRA, padding: "7px 14px",
            }}>
              <span style={{ fontSize: "9px", letterSpacing: "2px", fontWeight: 700, color: "white" }}>
                HOST & CREATOR
              </span>
            </div>
          </div>

          {/* Right — bio */}
          <div style={{
            padding: "72px 5vw 72px 56px",
            display: "flex", flexDirection: "column", justifyContent: "center",
            opacity: hostVis ? 1 : 0, transform: hostVis ? "none" : "translateX(16px)",
            transition: "opacity 0.9s 0.15s, transform 0.9s 0.15s",
          }}>
            <p style={{ fontSize: "10px", letterSpacing: "3px", color: TERRA, marginBottom: "18px", fontWeight: 600 }}>
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

            <div style={{
              width: "36px", height: "2px", background: TERRA, marginBottom: "28px",
            }} />

            <p style={{
              fontSize: "16px", lineHeight: 1.9, color: CREAM,
              fontWeight: 300, marginBottom: "16px", maxWidth: "400px",
            }}>
              Lawrence Dogli didn't just study Africa's maritime world — he lived it from the inside. A graduate of the Regional Maritime University in Ghana, Lawrence spent the beginning of his professional career at the Gulf of 
              Guinea Maritime Institute, coordinating some of the most consequential maritime security and blue economy projects in West and Central Africa.
            </p>
            <p style={{
              fontSize: "14px", lineHeight: 1.8, color: MUTED,
              fontWeight: 300, maxWidth: "400px", marginBottom: "36px",
            }}>
               He contributed to the development of Ghana's National Maritime Strategy, worked with the European Union to train local journalists on maritime affairs, and carried African perspectives into policy rooms from Lisbon to Brussels, Naples to Dakar — including as a technical expert to the International Maritime Organisation and contributing expert to the North Atlantic Treaty Organisation on maritime security in the Gulf of Guinea. He is a Chatham House Common Futures Conversations alumnus and a global voice on blue economy issues in Africa's marine sector.
Cabin Tea is built on everything he saw, heard, and learned inside that world. Because Africa's ocean story deserves to be told by the people who live it.
            </p>

            <Link to="/about-host" style={{
              display: "inline-block", padding: "12px 28px",
              background: TERRA, color: "white",
              textDecoration: "none", fontSize: "10px",
              letterSpacing: "2px", fontWeight: 700,
              transition: "opacity 0.2s", alignSelf: "flex-start",
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >READ FULL BIO →</Link>
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
          padding: "80px 5vw", maxWidth: "640px",
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
