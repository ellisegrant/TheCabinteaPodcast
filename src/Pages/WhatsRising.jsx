import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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

const BG    = "#0F1912";
const PANEL = "#141F18";
const DARK2 = "#1A2820";
const GOLD  = "#C4A44E";
const TERRA = "#B5541E";
const TEAL  = "#2C8C7C";
const CREAM = "rgba(214,207,194,0.75)";
const MUTED = "rgba(214,207,194,0.38)";

/* ── Stories — placeholder data ── */
const STORIES = [
  {
    id: 1,
    category: "Policy",
    edition: "May 2026",
    headline: "The UN Security Council Puts Maritime Security Back on the Agenda",
    summary: "For the first time in years, the global body held an open debate on ocean security — and what was said signals a major shift for African coastal states.",
    img: "/maritimeheritage.jpg",
    featured: true,
    readTime: "5 min read",
  },
  {
    id: 2,
    category: "Blue Economy",
    edition: "May 2026",
    headline: "West Africa's Fishing Industry Is at a Crossroads",
    summary: "Industrial trawling, climate change, and local livelihoods are colliding. The next decade will decide which side wins.",
    img: "/africanwomen.jpg",
    featured: false,
    readTime: "4 min read",
  },
  {
    id: 3,
    category: "Investment",
    edition: "May 2026",
    headline: "The Port That Could Change East Africa's Trade Routes",
    summary: "A $2bn infrastructure project is quietly reshaping how goods move through the Horn of Africa — and who profits.",
    img: "/africanface.jpg",
    featured: false,
    readTime: "6 min read",
  },
  {
    id: 4,
    category: "Culture",
    edition: "May 2026",
    headline: "Reclaiming the Canoe: Indigenous Watercraft and the Diaspora",
    summary: "A new generation of artists and activists are using traditional boat-building as a form of cultural resistance and reconnection.",
    img: "/canoe.jpg",
    featured: false,
    readTime: "3 min read",
  },
  {
    id: 5,
    category: "Technology",
    edition: "May 2026",
    headline: "African Startups Are Mapping the Ocean. Here's Why It Matters.",
    summary: "From Nairobi to Cape Town, tech entrepreneurs are building the maritime data infrastructure the continent has always needed.",
    img: "/ep1thumbnail.jpg",
    featured: false,
    readTime: "5 min read",
  },
];

/* ── Story card — compact list style ── */
function StoryCard({ story, index, visible }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "grid",
        gridTemplateColumns: "120px 1fr",
        gap: "20px",
        padding: "24px 0",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        alignItems: "start",
        cursor: "pointer",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(16px)",
        transition: `opacity 0.55s ${0.06 + index * 0.08}s, transform 0.55s ${0.06 + index * 0.08}s`,
      }}
    >
      {/* Thumbnail */}
      <div style={{ height: "88px", overflow: "hidden", flexShrink: 0 }}>
        <img
          src={story.img}
          alt={story.headline}
          style={{
            width: "100%", height: "100%", objectFit: "cover", display: "block",
            transform: hovered ? "scale(1.06)" : "scale(1)",
            transition: "transform 0.5s ease",
            filter: hovered ? "none" : "brightness(0.85)",
          }}
        />
      </div>

      {/* Text */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
          <span style={{
            fontSize: "8px", letterSpacing: "2px", fontWeight: 700,
            color: TERRA, padding: "3px 8px",
            border: "1px solid rgba(181,84,30,0.35)",
          }}>{story.category.toUpperCase()}</span>
          <span style={{ fontSize: "10px", color: MUTED }}>{story.readTime}</span>
        </div>
        <h3 style={{
          fontSize: "15px", fontWeight: 700,
          color: hovered ? GOLD : "white",
          lineHeight: 1.35, margin: "0 0 8px",
          transition: "color 0.2s",
        }}>{story.headline}</h3>
        <p style={{
          fontSize: "13px", color: MUTED,
          lineHeight: 1.6, margin: 0, fontWeight: 300,
        }}>{story.summary}</p>
      </div>
    </div>
  );
}

export default function WhatsRising() {
  const [heroRef,    heroVis]    = useReveal(0.05);
  const [introRef,   introVis]   = useReveal(0.08);
  const [storiesRef, storiesVis] = useReveal(0.06);
  const [ctaRef,     ctaVis]     = useReveal(0.1);

  const featured = STORIES.find(s => s.featured);
  const rest = STORIES.filter(s => !s.featured);

  return (
    <div style={{ minHeight: "100vh", background: BG, color: "white", overflowX: "hidden" }}>
      <Navbar />

      {/* ════════ HERO ════════ */}
      <section ref={heroRef} style={{
        height: "55vh", minHeight: "400px",
        position: "relative", overflow: "hidden",
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
      }}>
        <img
          src="/africanmask1.jpg"
          alt="What's Rising"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(15,25,18,1) 0%, rgba(15,25,18,0.6) 55%, transparent 100%)",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, rgba(15,25,18,0.75) 0%, transparent 60%)",
        }} />
        <div className="ct-grain" style={{ zIndex: 1 }} />

        <div style={{ position: "relative", zIndex: 2, padding: "0 5vw 56px" }}>
          {/* Breadcrumb */}
          <div style={{
            display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(10px)",
            transition: "opacity 0.6s 0.08s, transform 0.6s 0.08s",
          }}>
            <Link to="/afrocean" style={{
              fontSize: "10px", letterSpacing: "2.5px", color: MUTED,
              textDecoration: "none", fontWeight: 500,
              transition: "color 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.color = GOLD}
              onMouseLeave={e => e.currentTarget.style.color = MUTED}
            >AFROCEAN</Link>
            <span style={{ color: MUTED, fontSize: "10px" }}>·</span>
            <span style={{ fontSize: "10px", letterSpacing: "2.5px", color: TERRA, fontWeight: 600 }}>
              WHAT'S RISING
            </span>
          </div>

          <h1 style={{
            fontWeight: 700, fontSize: "clamp(28px, 4.5vw, 64px)",
            lineHeight: 1, color: "white", margin: "0 0 10px",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(20px)",
            transition: "opacity 0.8s 0.16s, transform 0.8s 0.16s",
          }}>What's Rising,</h1>
          <h1 style={{
            fontWeight: 700, fontSize: "clamp(28px, 4.5vw, 64px)",
            lineHeight: 1, color: GOLD, margin: "0 0 20px",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(20px)",
            transition: "opacity 0.8s 0.24s, transform 0.8s 0.24s",
          }}>What's Shifting.</h1>

          <p style={{
            fontSize: "15px", color: CREAM, lineHeight: 1.65,
            fontWeight: 300, maxWidth: "440px", margin: 0,
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(14px)",
            transition: "opacity 0.7s 0.32s, transform 0.7s 0.32s",
          }}>
            The African ocean stories you need to read this month.
          </p>
        </div>
      </section>

      {/* ════════ INTRO ════════ */}
      <section ref={introRef} style={{ background: PANEL, padding: "56px 5vw" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{
            display: "grid", gridTemplateColumns: "200px 1fr",
            gap: "60px", alignItems: "center",
            opacity: introVis ? 1 : 0, transform: introVis ? "none" : "translateY(14px)",
            transition: "opacity 0.7s, transform 0.7s",
          }}>
            <div>
              <p style={{ fontSize: "9px", letterSpacing: "2.5px", color: TERRA, marginBottom: "8px", fontWeight: 600 }}>
                THE DIGEST
              </p>
              <div style={{ width: "24px", height: "2px", background: TERRA }} />
            </div>
            <p style={{ fontSize: "15px", lineHeight: 1.9, color: CREAM, fontWeight: 300, margin: 0 }}>
              Every month, we curate the most important developments, stories, and shifts shaping Africa's ocean economy — from policy moves at the UN to grassroots cultural resurgences on the coast. One read. Everything that matters.
            </p>
          </div>
        </div>
      </section>

      {/* ════════ FEATURED STORY ════════ */}
      {featured && (
        <section style={{ background: BG, padding: "56px 5vw 0" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <p style={{ fontSize: "9px", letterSpacing: "3px", color: TERRA, marginBottom: "20px", fontWeight: 600 }}>
              FEATURED · {featured.edition.toUpperCase()}
            </p>
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr",
              gap: "2px", background: PANEL,
              cursor: "pointer",
            }}>
              {/* Featured image */}
              <div style={{ position: "relative", overflow: "hidden", minHeight: "380px" }}>
                <img
                  src={featured.img}
                  alt={featured.headline}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to right, transparent 60%, rgba(20,31,24,0.7) 100%)",
                }} />
                <span style={{
                  position: "absolute", top: "20px", left: "20px",
                  background: TERRA, color: "white",
                  fontSize: "8px", letterSpacing: "2px", fontWeight: 700,
                  padding: "4px 10px",
                }}>{featured.category.toUpperCase()}</span>
              </div>

              {/* Featured content */}
              <div style={{
                padding: "44px 40px",
                display: "flex", flexDirection: "column",
                justifyContent: "center",
              }}>
                <p style={{ fontSize: "10px", color: MUTED, marginBottom: "16px", letterSpacing: "1px" }}>
                  {featured.readTime}
                </p>
                <h2 style={{
                  fontWeight: 700, fontSize: "clamp(18px, 2vw, 26px)",
                  color: "white", lineHeight: 1.25,
                  margin: "0 0 16px", letterSpacing: "-0.3px",
                }}>{featured.headline}</h2>
                <div style={{ width: "24px", height: "1px", background: "rgba(196,164,78,0.3)", margin: "0 0 16px" }} />
                <p style={{
                  fontSize: "14px", lineHeight: 1.75, color: CREAM,
                  fontWeight: 300, margin: "0 0 28px",
                }}>{featured.summary}</p>
                <button style={{
                  alignSelf: "flex-start",
                  padding: "11px 26px",
                  background: TERRA, color: "white",
                  border: "none", cursor: "pointer",
                  fontSize: "9px", letterSpacing: "2.5px", fontWeight: 700,
                  fontFamily: "inherit", transition: "opacity 0.2s",
                }}
                  onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                  onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                >READ THE STORY →</button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ════════ MORE STORIES — compact list ════════ */}
      <section ref={storiesRef} style={{ background: BG, padding: "48px 5vw 96px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

          <div style={{
            display: "flex", alignItems: "baseline",
            justifyContent: "space-between", marginBottom: "8px",
            opacity: storiesVis ? 1 : 0, transform: storiesVis ? "none" : "translateY(12px)",
            transition: "opacity 0.6s, transform 0.6s",
          }}>
            <h2 style={{
              fontWeight: 700, fontSize: "clamp(18px, 2vw, 26px)",
              color: "white", margin: 0,
            }}>More This Month</h2>
            <span style={{ fontSize: "11px", color: MUTED, letterSpacing: "1px" }}>
              {rest.length} STORIES
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {rest.map((story, i) => (
              <StoryCard key={story.id} story={story} index={i} visible={storiesVis} />
            ))}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", marginTop: "4px" }} />
          </div>

          {/* Newsletter nudge */}
          <div style={{
            marginTop: "48px", padding: "32px 36px",
            background: PANEL,
            display: "grid", gridTemplateColumns: "1fr auto",
            gap: "28px", alignItems: "center",
            borderLeft: `3px solid ${TERRA}`,
            opacity: storiesVis ? 1 : 0, transition: "opacity 0.7s 0.4s",
          }}>
            <div>
              <p style={{ fontSize: "10px", letterSpacing: "2.5px", color: TERRA, marginBottom: "8px", fontWeight: 600 }}>
                GET IT IN YOUR INBOX
              </p>
              <p style={{ fontSize: "15px", fontWeight: 600, color: "white", margin: "0 0 4px" }}>
                What's Rising, What's Shifting — monthly.
              </p>
              <p style={{ fontSize: "13px", color: MUTED, margin: 0, lineHeight: 1.6 }}>
                Subscribe to the Cabin Tea newsletter and never miss the stories that matter.
              </p>
            </div>
            <Link to="/partner" style={{
              display: "inline-block", padding: "12px 28px",
              background: TERRA, color: "white",
              textDecoration: "none", fontSize: "10px",
              letterSpacing: "2px", fontWeight: 700,
              transition: "opacity 0.2s", flexShrink: 0,
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >SUBSCRIBE →</Link>
          </div>
        </div>
      </section>

      {/* ════════ BOTTOM NAV ════════ */}
      <section ref={ctaRef} style={{ background: PANEL, borderTop: "1px solid rgba(255,255,255,0.06)", padding: "60px 5vw" }}>
        <div style={{
          maxWidth: "1200px", margin: "0 auto",
          display: "flex", alignItems: "center",
          justifyContent: "space-between", flexWrap: "wrap", gap: "24px",
          opacity: ctaVis ? 1 : 0, transform: ctaVis ? "none" : "translateY(12px)",
          transition: "opacity 0.7s, transform 0.7s",
        }}>
          <div>
            <p style={{ fontSize: "10px", letterSpacing: "3px", color: GOLD, marginBottom: "10px", fontWeight: 600 }}>
              EXPLORE MORE
            </p>
            <h3 style={{ fontWeight: 700, fontSize: "clamp(18px, 2.5vw, 28px)", color: "white", margin: 0 }}>
              More from Afrocean.
            </h3>
          </div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link to="/on-deck" style={{
              display: "inline-block", padding: "12px 28px",
              border: "1px solid rgba(255,255,255,0.15)", color: CREAM,
              textDecoration: "none", fontSize: "11px",
              letterSpacing: "1.5px", fontWeight: 500,
              transition: "border-color 0.2s, color 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.color = "white"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = CREAM; }}
            >On Deck →</Link>
            <Link to="/afrocean" style={{
              display: "inline-block", padding: "12px 28px",
              background: GOLD, color: BG,
              textDecoration: "none", fontSize: "11px",
              letterSpacing: "1.5px", fontWeight: 700,
              transition: "opacity 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >Back to Afrocean</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
