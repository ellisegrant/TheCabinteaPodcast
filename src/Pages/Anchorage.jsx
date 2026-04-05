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
const TEAL  = "#2C8C7C";
const CREAM = "rgba(214,207,194,0.75)";
const MUTED = "rgba(214,207,194,0.42)";

/* ── Exact image paths from document ── */
const IMGS = {
  hero:      "/maritimeheritage.jpg",
  community: "/stortelling.jpg",
  digital:   "/images/anchorage/digital.jpg",
  culture:   "/flagwoman.jpg",
  people:    "/festival.jpg",
  coastal:   "/fisherman.jpg",
  cta:       "/maritimeheritage.jpg",
};

/* ── Features — exact content from document ── */
const features = [
  {
    num: "01",
    label: "CENTRALIZED HUB",
    title: "One place for all maritime content",
    body: "A centralized media hub that curates the full landscape of African and global maritime culture, news, and knowledge — digital and in-person.",
  },
  {
    num: "02",
    label: "PERSONALIZED",
    title: "Tailored to your interests",
    body: "Personalized recommendations reshape the way you explore the maritime world, surfacing content and connections that matter to you personally.",
  },
  {
    num: "03",
    label: "HYBRID EXPERIENCES",
    title: "In-person and digital",
    body: "We combine live event experiences with digital access, so the Anchorage community can engage from anywhere across the globe.",
  },
];

/* ── Content types — exact content from document ── */
const contentTypes = [
  { tag: "DOCUMENTARY",     title: "Long-form storytelling on African maritime cultures and communities." },
  { tag: "PODCAST",         title: "Cabin Tea episodes and partner audio from across the ecosystem."     },
  { tag: "INDUSTRY INSIGHT",title: "Blue economy data, policy, and maritime industry analysis."          },
  { tag: "CULTURAL ARCHIVE",title: "Indigenous maritime knowledge and heritage preservation."            },
];

export default function Anchorage() {
  const [heroRef,    heroVis]    = useReveal(0.05);
  const [whatRef,    whatVis]    = useReveal(0.1);
  const [mosaicRef,  mosaicVis]  = useReveal(0.08);
  const [featRef,    featVis]    = useReveal(0.1);
  const [contentRef, contentVis] = useReveal(0.1);
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
          alt="Anchorage media hub"
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
            CABIN TEA · MARITIME MEDIA HUB
          </p>

          <h1 style={{
            fontWeight: 700,
            fontSize: "clamp(36px, 5vw, 64px)",
            lineHeight: 1.1, color: "white",
            margin: "0 0 16px", maxWidth: "600px",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(20px)",
            transition: "opacity 0.7s 0.18s, transform 0.7s 0.18s",
          }}>
            Anchorage
          </h1>

          <p style={{
            fontSize: "16px", color: CREAM, lineHeight: 1.7,
            fontWeight: 300, maxWidth: "480px", marginBottom: "32px",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(14px)",
            transition: "opacity 0.7s 0.28s, transform 0.7s 0.28s",
          }}>
            Transforming the way we engage with maritime issues and cultures — starting with Africa and the African Diaspora.
          </p>

          <div style={{
            display: "flex", gap: "12px", flexWrap: "wrap",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(12px)",
            transition: "opacity 0.7s 0.38s, transform 0.7s 0.38s",
          }}>
            <Link to="/episodes" style={{
              display: "inline-block", padding: "13px 32px",
              background: GOLD, color: "#0F1912",
              textDecoration: "none", fontSize: "11px",
              letterSpacing: "2px", fontWeight: 700,
              transition: "opacity 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >EXPLORE CONTENT</Link>
            <Link to="/partner" style={{
              display: "inline-block", padding: "13px 32px",
              border: "1px solid rgba(255,255,255,0.2)", color: CREAM,
              textDecoration: "none", fontSize: "11px",
              letterSpacing: "2px", fontWeight: 500,
              transition: "border-color 0.2s, color 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; e.currentTarget.style.color = "white"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = CREAM; }}
            >PARTNER WITH US</Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          WHAT IS ANCHORAGE — split image + text
      ══════════════════════════════════════════════ */}
      <section ref={whatRef} style={{ background: PANEL }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "540px" }}>

          {/* Left — image with caption */}
          <div style={{
            position: "relative", overflow: "hidden",
            opacity: whatVis ? 1 : 0, transform: whatVis ? "none" : "translateX(-16px)",
            transition: "opacity 0.8s, transform 0.8s",
          }}>
            <img
              src={IMGS.community}
              alt="Anchorage community"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", minHeight: "540px" }}
            />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to right, transparent, rgba(20,31,24,0.6) 100%)",
            }} />
            <div style={{
              position: "absolute", bottom: "36px", left: "28px",
              background: "rgba(15,25,18,0.9)", backdropFilter: "blur(10px)",
              borderLeft: `3px solid ${TEAL}`,
              padding: "16px 20px", maxWidth: "230px",
            }}>
              <span style={{ fontSize: "9px", letterSpacing: "2px", color: TEAL, display: "block", marginBottom: "8px" }}>
                THE MISSION
              </span>
              <p style={{ fontSize: "13px", lineHeight: 1.6, color: CREAM, margin: 0 }}>
                "Reshaping how the world engages with African maritime issues and cultures."
              </p>
            </div>
          </div>

          {/* Right — text */}
          <div style={{
            padding: "72px 5vw 72px 56px",
            display: "flex", flexDirection: "column", justifyContent: "center",
            opacity: whatVis ? 1 : 0, transform: whatVis ? "none" : "translateX(16px)",
            transition: "opacity 0.8s 0.15s, transform 0.8s 0.15s",
          }}>
            <p style={{ fontSize: "10px", letterSpacing: "3px", color: TEAL, marginBottom: "18px", fontWeight: 600 }}>
              WHAT IS ANCHORAGE
            </p>

            <h2 style={{
              fontWeight: 700, fontSize: "clamp(22px, 2.8vw, 36px)",
              lineHeight: 1.2, color: "white", marginBottom: "20px",
            }}>
              Reshaping how the world explores maritime culture.
            </h2>

            <p style={{ fontSize: "15px", lineHeight: 1.9, color: CREAM, fontWeight: 300, marginBottom: "16px" }}>
              Anchorage is a centralized media hub combined with in-person and digital experiences. We curate personalized recommendations tailored to your interests, reshaping the way we explore the maritime world.
            </p>
            <p style={{ fontSize: "15px", lineHeight: 1.9, color: MUTED, fontWeight: 300, marginBottom: "36px" }}>
              Starting with Africa and the African Diaspora, Anchorage transforms engagement with maritime issues and cultures at every level — from community storytelling to industry insight.
            </p>

            <div style={{
              display: "flex", gap: "36px",
              paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,0.07)",
            }}>
              {[
                { val: "360°",   label: "Media Coverage"  },
                { val: "Digital",label: "And In-Person"   },
                { val: "Global", label: "Diaspora Reach"  },
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
            THE CONTENT
          </p>
        </div>

        {/* Row 1 — 3 images */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1.5fr 1fr", gap: "2px",
          opacity: mosaicVis ? 1 : 0, transform: mosaicVis ? "none" : "translateY(20px)",
          transition: "opacity 0.8s 0.1s, transform 0.8s 0.1s",
        }}>
          {[
            { src: IMGS.culture,   h: "280px", label: "Cultural Archive",  sub: "Heritage Content" },
            { src: IMGS.community, h: "280px", label: "Community Stories", sub: "The People"       },
            { src: IMGS.coastal,   h: "280px", label: "Maritime Heritage", sub: "Coastal Africa"   },
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
                <span style={{ fontSize: "9px", letterSpacing: "2px", color: TEAL }}>{img.sub.toUpperCase()}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Row 2 — 2 images */}
        <div style={{
          display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "2px", marginTop: "2px",
          opacity: mosaicVis ? 1 : 0, transform: mosaicVis ? "none" : "translateY(20px)",
          transition: "opacity 0.8s 0.22s, transform 0.8s 0.22s",
        }}>
          {[
            { src: IMGS.people,  h: "230px", label: "Diaspora Voices",  sub: "Global Community"  },
            { src: IMGS.digital, h: "230px", label: "Digital Platform", sub: "Anywhere, Anytime"  },
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
                <span style={{ fontSize: "9px", letterSpacing: "2px", color: TEAL }}>{img.sub.toUpperCase()}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          THREE FEATURES — numbered list
      ══════════════════════════════════════════════ */}
      <section ref={featRef} style={{ background: PANEL, padding: "96px 5vw" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px",
            alignItems: "end", marginBottom: "56px",
            opacity: featVis ? 1 : 0, transform: featVis ? "none" : "translateY(12px)",
            transition: "opacity 0.6s, transform 0.6s",
          }}>
            <div>
              <p style={{ fontSize: "10px", letterSpacing: "3px", color: GOLD, marginBottom: "12px", fontWeight: 600 }}>
                WHAT SETS US APART
              </p>
              <h2 style={{
                fontWeight: 700, fontSize: "clamp(22px, 3vw, 36px)",
                color: "white", margin: 0, lineHeight: 1.2,
              }}>
                Built differently, on purpose.
              </h2>
            </div>
            <p style={{ fontSize: "15px", lineHeight: 1.8, color: MUTED, fontWeight: 300, margin: 0 }}>
              Each principle of Anchorage is grounded in Adinkra philosophy — the ancient visual language of the Akan people, encoding wisdom that guides how we build community and knowledge.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {features.map((f, i) => (
              <div key={f.num} style={{
                display: "grid",
                gridTemplateColumns: "56px 200px 1fr",
                gap: "40px",
                padding: "36px 0",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                alignItems: "start",
                opacity: featVis ? 1 : 0, transform: featVis ? "none" : "translateY(16px)",
                transition: `opacity 0.6s ${0.1 + i * 0.12}s, transform 0.6s ${0.1 + i * 0.12}s`,
              }}>
                <span style={{ fontSize: "13px", letterSpacing: "2px", color: MUTED, paddingTop: "2px" }}>
                  {f.num}
                </span>
                <div>
                  <span style={{ fontSize: "10px", letterSpacing: "2px", color: TEAL, display: "block", marginBottom: "6px", fontWeight: 600 }}>
                    {f.label}
                  </span>
                  <h3 style={{ fontSize: "20px", fontWeight: 700, color: "white", margin: 0 }}>
                    {f.title}
                  </h3>
                </div>
                <p style={{ fontSize: "15px", lineHeight: 1.85, color: CREAM, fontWeight: 300, margin: 0 }}>
                  {f.body}
                </p>
              </div>
            ))}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }} />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          CONTENT TYPES — four cards
      ══════════════════════════════════════════════ */}
      <section ref={contentRef} style={{ background: BG, padding: "96px 5vw" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

          <div style={{
            marginBottom: "48px",
            opacity: contentVis ? 1 : 0, transform: contentVis ? "none" : "translateY(12px)",
            transition: "opacity 0.6s, transform 0.6s",
          }}>
            <p style={{ fontSize: "10px", letterSpacing: "3px", color: GOLD, marginBottom: "12px", fontWeight: 600 }}>
              WHAT'S ON ANCHORAGE
            </p>
            <h2 style={{
              fontWeight: 700, fontSize: "clamp(22px, 3vw, 36px)",
              color: "white", margin: 0, lineHeight: 1.2,
            }}>
              A full spectrum of maritime media.
            </h2>
          </div>

          <div style={{
            display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
            gap: "2px", background: "rgba(255,255,255,0.04)",
            marginBottom: "48px",
          }}>
            {contentTypes.map((c, i) => (
              <div key={c.tag} style={{
                background: BG, padding: "36px 28px",
                borderTop: `2px solid ${i % 2 === 0 ? TEAL : GOLD}`,
                opacity: contentVis ? 1 : 0, transform: contentVis ? "none" : "translateY(16px)",
                transition: `opacity 0.6s ${0.1 + i * 0.1}s, transform 0.6s ${0.1 + i * 0.1}s`,
              }}>
                <span style={{
                  fontSize: "9px", letterSpacing: "2px", fontWeight: 700,
                  color: i % 2 === 0 ? TEAL : GOLD, display: "block", marginBottom: "14px",
                }}>{c.tag}</span>
                <p style={{ fontSize: "14px", lineHeight: 1.75, color: MUTED, fontWeight: 300, margin: 0 }}>
                  {c.title}
                </p>
              </div>
            ))}
          </div>

          {/* Inline CTA */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            flexWrap: "wrap", gap: "24px",
            opacity: contentVis ? 1 : 0, transition: "opacity 0.6s 0.5s",
          }}>
            <p style={{ fontSize: "15px", color: MUTED, fontWeight: 300, maxWidth: "460px", margin: 0, lineHeight: 1.7 }}>
              Anchorage is built for the next generation of African ocean professionals, cultural leaders, and Diaspora community members who want to stay connected to the maritime world.
            </p>
            <Link to="/episodes" style={{
              display: "inline-block", padding: "13px 32px",
              background: TEAL, color: "white",
              textDecoration: "none", fontSize: "11px",
              letterSpacing: "2px", fontWeight: 700,
              flexShrink: 0, transition: "opacity 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >BROWSE EPISODES →</Link>
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
            Your maritime world, reimagined.
          </h2>

          <p style={{
            fontSize: "16px", lineHeight: 1.75, color: CREAM,
            fontWeight: 300, maxWidth: "420px", marginBottom: "36px",
          }}>
            Access a curated maritime media experience built for the next generation of African ocean professionals, cultural leaders, and Diaspora communities.
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
            >BROWSE EPISODES</Link>
            <Link to="/partner" style={{
              display: "inline-block", padding: "13px 32px",
              border: "1px solid rgba(255,255,255,0.2)", color: CREAM,
              textDecoration: "none", fontSize: "11px",
              letterSpacing: "2px", fontWeight: 500,
              transition: "border-color 0.2s, color 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; e.currentTarget.style.color = "white"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = CREAM; }}
            >PARTNER WITH US</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
