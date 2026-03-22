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

const pillars = [
  {
    title: "Cultural Exchange",
    body: "A dedicated space for the African Diaspora to reconnect with their maritime heritage through dialogue, performance, and shared memory.",
    icon: "◈",
  },
  {
    title: "Knowledge Sharing",
    body: "Industry leaders, community elders, and emerging voices converge to share expertise, research, and lived experience across the blue economy.",
    icon: "◉",
  },
  {
    title: "Networking",
    body: "Strategic connections forged between professionals, entrepreneurs, and institutions across Africa and the Diaspora maritime ecosystem.",
    icon: "◎",
  },
  {
    title: "Economic Access",
    body: "Facilitating greater access to economic opportunities and resources, both within the Diaspora and on the African continent.",
    icon: "◇",
  },
];

export default function Afrocean() {
  const [heroRef, heroVis] = useReveal(0.05);
  const [aboutRef, aboutVis] = useReveal(0.1);
  const [pillarsRef, pillarsVis] = useReveal(0.1);
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
        {/* Background image */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img
            src="https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=1600&q=80"
            alt="Afrocean"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(21,42,47,1) 20%, rgba(21,42,47,0.65) 60%, rgba(21,42,47,0.3) 100%)",
          }} />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to right, rgba(21,42,47,0.8) 40%, transparent 100%)",
          }} />
        </div>

        <div style={{ position: "relative", zIndex: 1, maxWidth: "800px" }}>
          <span
            style={{
              display: "inline-block",
              fontSize: "10px",
              letterSpacing: "4px",
              color: "var(--dark)",
              background: "var(--gold)",
              padding: "6px 14px",
              marginBottom: "28px",
              fontWeight: 700,
              opacity: heroVis ? 1 : 0,
              transition: "opacity 0.6s 0.1s",
            }}
          >
            CABIN TEA · EVENTS
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
            AFRO<span style={{ color: "var(--teal)" }}>CEAN</span>
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
            A dynamic and inclusive gathering that unites individuals of the African Diaspora, fostering a deep connection with their maritime heritage.
          </p>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section
        ref={aboutRef}
        style={{ padding: "100px 5vw", maxWidth: "1200px", margin: "0 auto" }}
      >
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "80px",
          alignItems: "center",
        }}>
          <div
            style={{
              opacity: aboutVis ? 1 : 0,
              transform: aboutVis ? "none" : "translateX(-20px)",
              transition: "opacity 0.7s, transform 0.7s",
            }}
          >
            <span style={{ fontSize: "11px", letterSpacing: "4px", color: "var(--teal)", display: "block", marginBottom: "20px" }}>WHAT IS AFROCEAN</span>
            <h2 style={{
              fontFamily: "var(--font-display, serif)",
              fontStyle: "italic",
              fontWeight: 800,
              fontSize: "clamp(26px, 3vw, 40px)",
              color: "white",
              lineHeight: 1.15,
              marginBottom: "28px",
            }}>
              Where the Diaspora meets the deep blue.
            </h2>
            <p style={{ fontSize: "15px", lineHeight: 1.9, color: "rgba(214,207,194,0.6)", fontWeight: 300, marginBottom: "20px" }}>
              Afrocean is a dynamic and inclusive gathering that unites individuals of the African Diaspora, fostering a deep connection with their maritime heritage.
            </p>
            <p style={{ fontSize: "15px", lineHeight: 1.9, color: "rgba(214,207,194,0.6)", fontWeight: 300 }}>
              This event serves as a catalyst for cultural exchange, knowledge-sharing, and networking, with the overarching goal of facilitating greater access to economic opportunities and resources, both within the Diaspora and on the African continent.
            </p>
          </div>

          {/* Visual block */}
          <div
            style={{
              opacity: aboutVis ? 1 : 0,
              transform: aboutVis ? "none" : "translateX(20px)",
              transition: "opacity 0.7s 0.2s, transform 0.7s 0.2s",
              position: "relative",
            }}
          >
            <div style={{
              aspectRatio: "4/5",
              overflow: "hidden",
              borderRadius: "2px",
            }}>
              <img
                src="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=800&q=80"
                alt="Afrocean gathering"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(21,42,47,0.7) 0%, transparent 50%)",
              }} />
            </div>
            {/* floating stat */}
            <div style={{
              position: "absolute",
              bottom: "-24px",
              right: "-24px",
              background: "var(--gold)",
              color: "var(--dark)",
              padding: "28px 32px",
              borderRadius: "2px",
            }}>
              <span style={{ fontFamily: "var(--font-display, serif)", fontSize: "44px", fontWeight: 900, display: "block", lineHeight: 1 }}>360°</span>
              <span style={{ fontSize: "9px", letterSpacing: "2.5px", fontWeight: 700, display: "block", marginTop: "4px" }}>MARITIME EXPERIENCE</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── PILLARS ── */}
      <section
        ref={pillarsRef}
        style={{
          background: "rgba(44,140,124,0.05)",
          borderTop: "1px solid rgba(196,164,78,0.15)",
          padding: "100px 5vw",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{
            marginBottom: "64px",
            opacity: pillarsVis ? 1 : 0,
            transition: "opacity 0.6s",
          }}>
            <span style={{ fontSize: "11px", letterSpacing: "4px", color: "var(--teal)", display: "block", marginBottom: "14px" }}>WHAT WE STAND FOR</span>
            <h2 style={{ fontFamily: "var(--font-display, serif)", fontStyle: "italic", fontWeight: 800, fontSize: "clamp(26px, 3vw, 40px)", color: "white" }}>
              Four pillars of Afrocean
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1px", border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.06)" }}>
            {pillars.map((p, i) => (
              <div
                key={p.title}
                style={{
                  background: "var(--dark)",
                  padding: "48px 36px",
                  opacity: pillarsVis ? 1 : 0,
                  transform: pillarsVis ? "none" : "translateY(20px)",
                  transition: `opacity 0.6s ${0.1 + i * 0.1}s, transform 0.6s ${0.1 + i * 0.1}s`,
                }}
              >
                <span style={{ fontSize: "28px", color: "var(--teal)", display: "block", marginBottom: "20px", lineHeight: 1 }}>{p.icon}</span>
                <h3 style={{ fontSize: "14px", letterSpacing: "2px", fontWeight: 700, color: "white", marginBottom: "14px" }}>{p.title.toUpperCase()}</h3>
                <p style={{ fontSize: "14px", lineHeight: 1.8, color: "rgba(214,207,194,0.5)", fontWeight: 300 }}>{p.body}</p>
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
          JOIN THE GATHERING
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
          Be part of the next Afrocean.
        </h2>
        <p style={{ fontSize: "15px", lineHeight: 1.8, color: "rgba(214,207,194,0.5)", maxWidth: "400px", margin: "0 auto 40px", fontWeight: 300, opacity: ctaVis ? 1 : 0, transition: "opacity 0.6s 0.2s" }}>
          Connect with the African maritime community and Diaspora at our flagship gathering event.
        </p>
        <Link
          to="/partner"
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
            opacity: ctaVis ? 1 : 0,
            transition: "opacity 0.6s 0.3s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          GET INVOLVED
        </Link>
      </section>

      <Footer />
    </div>
  );
}
