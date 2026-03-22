import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function useReveal(threshold = 0.12) {
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

const features = [
  {
    label: "CENTRALIZED HUB",
    title: "One place for all maritime content",
    body: "A centralized media hub that curates the full landscape of African and global maritime culture, news, and knowledge — digital and in-person.",
  },
  {
    label: "PERSONALIZED",
    title: "Tailored to your interests",
    body: "Personalized recommendations reshape the way you explore the maritime world, surfacing content and connections that matter to you.",
  },
  {
    label: "HYBRID EXPERIENCES",
    title: "In-person and digital",
    body: "We combine live event experiences with digital access, so the Anchorage community can engage from anywhere across the globe.",
  },
];

export default function Anchorage() {
  const [heroRef, heroVis] = useReveal(0.05);
  const [missionRef, missionVis] = useReveal(0.1);
  const [featRef, featVis] = useReveal(0.1);
  const [ctaRef, ctaVis] = useReveal(0.1);

  return (
    <div style={{ minHeight: "100vh", background: "var(--dark)", color: "var(--cream)" }}>
      <Navbar />

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        style={{
          minHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "120px 5vw 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img
            src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1600&q=80"
            alt="Anchorage"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(21,42,47,1) 25%, rgba(21,42,47,0.6) 60%, rgba(21,42,47,0.25) 100%)",
          }} />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to right, rgba(21,42,47,0.85) 45%, transparent 100%)",
          }} />
        </div>

        <div style={{ position: "relative", zIndex: 1, maxWidth: "800px" }}>
          <span
            style={{
              display: "inline-block",
              fontSize: "10px",
              letterSpacing: "4px",
              color: "var(--dark)",
              background: "var(--teal)",
              padding: "6px 14px",
              marginBottom: "28px",
              fontWeight: 700,
              opacity: heroVis ? 1 : 0,
              transition: "opacity 0.6s 0.1s",
            }}
          >
            CABIN TEA · MEDIA HUB
          </span>

          <h1
            style={{
              fontFamily: "var(--font-display, serif)",
              fontWeight: 900,
              fontSize: "clamp(64px, 10vw, 130px)",
              lineHeight: 0.88,
              letterSpacing: "-3px",
              color: "white",
              marginBottom: "28px",
              opacity: heroVis ? 1 : 0,
              transform: heroVis ? "none" : "translateY(20px)",
              transition: "opacity 0.7s 0.2s, transform 0.7s 0.2s",
            }}
          >
            ANCH<span style={{ color: "var(--gold)" }}>ORAGE</span>
          </h1>

          <p
            style={{
              fontSize: "clamp(16px, 1.8vw, 20px)",
              lineHeight: 1.7,
              color: "rgba(214,207,194,0.75)",
              maxWidth: "520px",
              fontWeight: 300,
              fontFamily: "var(--font-serif, serif)",
              fontStyle: "italic",
              opacity: heroVis ? 1 : 0,
              transform: heroVis ? "none" : "translateY(16px)",
              transition: "opacity 0.7s 0.35s, transform 0.7s 0.35s",
            }}
          >
            Transforming the way we engage with maritime issues and cultures — starting with Africa and with the African Diaspora.
          </p>
        </div>
      </section>

      {/* ── MISSION BLOCK ── */}
      <section
        ref={missionRef}
        style={{ padding: "100px 5vw", maxWidth: "1200px", margin: "0 auto" }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>

          {/* Visual */}
          <div
            style={{
              opacity: missionVis ? 1 : 0,
              transform: missionVis ? "none" : "translateX(-20px)",
              transition: "opacity 0.7s, transform 0.7s",
              position: "relative",
            }}
          >
            <div style={{ aspectRatio: "4/5", overflow: "hidden", borderRadius: "2px", background: "rgba(44,140,124,0.1)", display: "flex", flexDirection: "column" }}>
              <img
                src="https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?w=800&q=80"
                alt="Anchorage media hub"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            {/* floating badge */}
            <div style={{
              position: "absolute",
              top: "32px",
              right: "-28px",
              background: "var(--dark)",
              border: "1px solid rgba(196,164,78,0.3)",
              padding: "20px 24px",
              borderRadius: "2px",
            }}>
              <span style={{ fontFamily: "var(--font-display, serif)", fontSize: "11px", letterSpacing: "3px", color: "var(--gold)", display: "block", marginBottom: "4px" }}>MEDIA HUB</span>
              <span style={{ fontSize: "12px", color: "rgba(214,207,194,0.5)", fontFamily: "var(--font-serif, serif)", fontStyle: "italic" }}>Digital + In-Person</span>
            </div>
          </div>

          {/* Text */}
          <div
            style={{
              opacity: missionVis ? 1 : 0,
              transform: missionVis ? "none" : "translateX(20px)",
              transition: "opacity 0.7s 0.2s, transform 0.7s 0.2s",
            }}
          >
            <span style={{ fontSize: "11px", letterSpacing: "4px", color: "var(--teal)", display: "block", marginBottom: "20px" }}>WHAT IS ANCHORAGE</span>
            <h2 style={{
              fontFamily: "var(--font-display, serif)",
              fontStyle: "italic",
              fontWeight: 800,
              fontSize: "clamp(26px, 3vw, 40px)",
              color: "white",
              lineHeight: 1.15,
              marginBottom: "28px",
            }}>
              Reshaping how the world explores maritime culture.
            </h2>
            <p style={{ fontSize: "15px", lineHeight: 1.9, color: "rgba(214,207,194,0.6)", fontWeight: 300, marginBottom: "20px" }}>
              Anchorage is a centralized media hub combined with in-person and digital experiences. We curate personalized recommendations tailored to your interests, reshaping the way we explore the maritime world.
            </p>
            <p style={{ fontSize: "15px", lineHeight: 1.9, color: "rgba(214,207,194,0.6)", fontWeight: 300 }}>
              Starting with Africa and the African Diaspora, Anchorage transforms engagement with maritime issues and cultures at every level — from community storytelling to industry insight.
            </p>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section
        ref={featRef}
        style={{
          background: "rgba(44,140,124,0.05)",
          borderTop: "1px solid rgba(196,164,78,0.15)",
          padding: "100px 5vw",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{
            marginBottom: "64px",
            opacity: featVis ? 1 : 0,
            transition: "opacity 0.6s",
          }}>
            <span style={{ fontSize: "11px", letterSpacing: "4px", color: "var(--teal)", display: "block", marginBottom: "14px" }}>WHAT SETS US APART</span>
            <h2 style={{ fontFamily: "var(--font-display, serif)", fontStyle: "italic", fontWeight: 800, fontSize: "clamp(26px, 3vw, 40px)", color: "white" }}>
              Built differently, on purpose.
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {features.map((f, i) => (
              <div
                key={f.label}
                style={{
                  display: "grid",
                  gridTemplateColumns: "200px 1fr 1fr",
                  gap: "48px",
                  padding: "48px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.07)",
                  alignItems: "start",
                  opacity: featVis ? 1 : 0,
                  transform: featVis ? "none" : "translateY(16px)",
                  transition: `opacity 0.6s ${0.1 + i * 0.12}s, transform 0.6s ${0.1 + i * 0.12}s`,
                }}
              >
                <span style={{
                  fontSize: "10px",
                  letterSpacing: "3px",
                  color: "var(--gold)",
                  fontWeight: 700,
                  paddingTop: "4px",
                }}>{f.label}</span>
                <h3 style={{
                  fontFamily: "var(--font-display, serif)",
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "white",
                  lineHeight: 1.2,
                }}>{f.title}</h3>
                <p style={{ fontSize: "14.5px", lineHeight: 1.85, color: "rgba(214,207,194,0.55)", fontWeight: 300 }}>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        ref={ctaRef}
        style={{ padding: "100px 5vw", textAlign: "center", borderTop: "3px solid var(--gold)" }}
      >
        <span style={{ fontSize: "11px", letterSpacing: "4px", color: "var(--teal)", display: "block", marginBottom: "24px", opacity: ctaVis ? 1 : 0, transition: "opacity 0.6s" }}>
          EXPLORE ANCHORAGE
        </span>
        <h2
          style={{
            fontFamily: "var(--font-display, serif)",
            fontStyle: "italic",
            fontWeight: 800,
            fontSize: "clamp(28px, 4vw, 52px)",
            color: "white",
            marginBottom: "20px",
            opacity: ctaVis ? 1 : 0,
            transform: ctaVis ? "none" : "translateY(16px)",
            transition: "opacity 0.7s 0.1s, transform 0.7s 0.1s",
          }}
        >
          Your maritime world, reimagined.
        </h2>
        <p style={{ fontSize: "15px", lineHeight: 1.8, color: "rgba(214,207,194,0.5)", maxWidth: "400px", margin: "0 auto 40px", fontWeight: 300, opacity: ctaVis ? 1 : 0, transition: "opacity 0.6s 0.2s" }}>
          Access a curated maritime media experience built for the next generation of African ocean professionals.
        </p>
        <div style={{
          display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap",
          opacity: ctaVis ? 1 : 0, transition: "opacity 0.6s 0.3s",
        }}>
          <Link
            to="/episodes"
            style={{
              display: "inline-block",
              padding: "15px 44px",
              background: "var(--gold)",
              color: "var(--dark)",
              textDecoration: "none",
              fontSize: "10px",
              letterSpacing: "3px",
              fontWeight: 700,
              borderRadius: "2px",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            BROWSE EPISODES
          </Link>
          <Link
            to="/partner"
            style={{
              display: "inline-block",
              padding: "15px 44px",
              border: "1px solid rgba(196,164,78,0.4)",
              color: "rgba(214,207,194,0.7)",
              textDecoration: "none",
              fontSize: "10px",
              letterSpacing: "3px",
              fontWeight: 600,
              borderRadius: "2px",
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--gold)"; e.currentTarget.style.color = "white"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(196,164,78,0.4)"; e.currentTarget.style.color = "rgba(214,207,194,0.7)"; }}
          >
            PARTNER WITH US
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
