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

const services = [
  {
    num: "01",
    title: "CONTEXT",
    headline: "Strategy & Insight",
    body: "We start by deeply understanding your objectives and audience. Our strategy team conducts rigorous analysis, identifies touchpoints, and develops insights to create campaigns that resonate globally.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="12" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M9 14h10M14 9v10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    num: "02",
    title: "CREATE",
    headline: "Craft & Campaign",
    body: "Our team blends creativity, strategic thinking, cultural and industry insight to craft compelling campaigns. From concept to execution, we ensure your brand authentically reflects the richness and diversity of African culture.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M6 22L14 6l8 16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8.5 17h11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    num: "03",
    title: "AMPLIFY",
    headline: "Impact & Reach",
    body: "Impact matters. We measure meaningful outcomes, ensuring campaigns deliver tangible results, expand reach, and deepen connections with audiences across the African continent and Diaspora.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M5 20 Q14 4 23 20" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
        <path d="M9 16 Q14 8 19 16" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
        <circle cx="14" cy="19" r="2" fill="currentColor"/>
      </svg>
    ),
  },
];

const advisory = [
  {
    num: "01",
    title: "TECHNOLOGY",
    body: "Our team works closely with clients to design tailored technology immersions, connecting you with leading global innovation hubs, startups, and tech leaders to uncover opportunities for partnerships, innovation, and growth.",
  },
  {
    num: "02",
    title: "CAREER & EDUCATION",
    body: "We collaborate with partners to craft curated experiences, providing access to maritime organisations, experts, and cultural leaders — helping partners gain insights, build networks, and explore collaborations in Africa's most vibrant maritime industries.",
  },
  {
    num: "03",
    title: "BLUE ECONOMY INVESTMENT",
    body: "Our experts guide clients through high-level blue economy investment immersions, arranging meetings with organisations, executives, and investors to identify market opportunities, strategic partnerships, and actionable business outcomes.",
  },
];

const pillars = [
  { title: "Cultural Authority", body: "We are the leading voice in Africa's maritime industry culture." },
  { title: "Network Access", body: "We connect you to experts, industries, and business leaders." },
  { title: "Strategic Impact", body: "We deliver campaigns and experiences with measurable ROI." },
  { title: "Tailored Solutions", body: "Every engagement is customized to your brand and objectives." },
];

export default function CreativeAgency() {
  const [heroRef, heroVis] = useReveal(0.05);
  const [missionRef, missionVis] = useReveal(0.1);
  const [creativeRef, creativeVis] = useReveal(0.1);
  const [advisoryRef, advisoryVis] = useReveal(0.1);
  const [whyRef, whyVis] = useReveal(0.1);
  const [ctaRef, ctaVis] = useReveal(0.1);

  return (
    <div style={{ minHeight: "100vh", background: "var(--dark)", color: "var(--cream)" }}>
      <Navbar />

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        style={{
          minHeight: "80vh",
          display: "flex",
          alignItems: "flex-end",
          padding: "120px 5vw 80px",
          position: "relative",
          overflow: "hidden",
          background: "var(--dark)",
        }}
      >
        {/* Background texture lines */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden", opacity: 0.06 }}>
          {[...Array(8)].map((_, i) => (
            <div key={i} style={{
              position: "absolute",
              left: 0, right: 0,
              top: `${10 + i * 12}%`,
              height: "1px",
              background: "var(--gold)",
            }} />
          ))}
        </div>
        {/* Left accent bar */}
        <div style={{
          position: "absolute",
          left: "5vw",
          top: "120px",
          width: "3px",
          height: "160px",
          background: "linear-gradient(to bottom, var(--gold), transparent)",
        }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: "900px" }}>
          <span
            style={{
              display: "block",
              fontSize: "11px",
              letterSpacing: "4px",
              color: "var(--teal)",
              marginBottom: "24px",
              opacity: heroVis ? 1 : 0,
              transform: heroVis ? "none" : "translateY(12px)",
              transition: "opacity 0.6s 0.1s, transform 0.6s 0.1s",
            }}
          >
            CABIN TEA · SERVICES
          </span>

          <h1
            style={{
              fontFamily: "var(--font-display, serif)",
              fontWeight: 900,
              fontSize: "clamp(52px, 8vw, 110px)",
              lineHeight: 0.9,
              letterSpacing: "-3px",
              color: "white",
              marginBottom: "32px",
              opacity: heroVis ? 1 : 0,
              transform: heroVis ? "none" : "translateY(20px)",
              transition: "opacity 0.7s 0.2s, transform 0.7s 0.2s",
            }}
          >
            CREATIVE<br />
            <span style={{ color: "var(--gold)", fontStyle: "italic" }}>AGENCY</span>
          </h1>

          <p
            style={{
              fontSize: "clamp(15px, 1.6vw, 18px)",
              lineHeight: 1.8,
              color: "rgba(214,207,194,0.65)",
              maxWidth: "540px",
              fontWeight: 300,
              opacity: heroVis ? 1 : 0,
              transform: heroVis ? "none" : "translateY(16px)",
              transition: "opacity 0.7s 0.35s, transform 0.7s 0.35s",
            }}
          >
            Connecting people and brands to community and industry culture — from the African continent to the global Diaspora.
          </p>
        </div>
      </section>

      {/* ── MISSION STRIP ── */}
      <section
        ref={missionRef}
        style={{
          borderTop: "1px solid rgba(196,164,78,0.25)",
          borderBottom: "1px solid rgba(196,164,78,0.25)",
          padding: "56px 5vw",
          background: "rgba(44,140,124,0.06)",
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: "48px",
          alignItems: "center",
        }}
      >
        <div
          style={{
            opacity: missionVis ? 1 : 0,
            transform: missionVis ? "none" : "translateX(-20px)",
            transition: "opacity 0.7s, transform 0.7s",
          }}
        >
          <span style={{ fontSize: "11px", letterSpacing: "4px", color: "var(--teal)", display: "block", marginBottom: "12px" }}>THE MISSION</span>
          <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 800, color: "white", lineHeight: 1.15 }}>
            Make maritime in Africa visible, relevant and irresistible.
          </h2>
        </div>
        <p
          style={{
            fontSize: "16px",
            lineHeight: 1.85,
            color: "rgba(214,207,194,0.65)",
            fontWeight: 300,
            borderLeft: "2px solid rgba(196,164,78,0.3)",
            paddingLeft: "32px",
            opacity: missionVis ? 1 : 0,
            transform: missionVis ? "none" : "translateX(20px)",
            transition: "opacity 0.7s 0.2s, transform 0.7s 0.2s",
          }}
        >
          We connect brands, businesses, and leaders to the vibrancy, innovation, and commercial power of African and global Maritime Culture and Industry. Our expertise spans strategy, creativity, and immersive experiences — designed to deliver measurable impact for people and organisations.
        </p>
      </section>

      {/* ── CREATIVE AGENCY SERVICES ── */}
      <section
        ref={creativeRef}
        style={{ padding: "100px 5vw", maxWidth: "1200px", margin: "0 auto" }}
      >
        <div
          style={{
            marginBottom: "64px",
            opacity: creativeVis ? 1 : 0,
            transform: creativeVis ? "none" : "translateY(16px)",
            transition: "opacity 0.6s, transform 0.6s",
          }}
        >
          <span style={{ fontSize: "11px", letterSpacing: "4px", color: "var(--teal)", display: "block", marginBottom: "14px" }}>WHAT WE DO</span>
          <h2 style={{ fontFamily: "var(--font-display, serif)", fontStyle: "italic", fontWeight: 800, fontSize: "clamp(28px, 3.5vw, 44px)", color: "white" }}>
            Creative Agency Services
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2px" }}>
          {services.map((s, i) => (
            <div
              key={s.num}
              style={{
                padding: "48px 40px",
                borderTop: "1px solid rgba(255,255,255,0.07)",
                borderRight: i < services.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
                opacity: creativeVis ? 1 : 0,
                transform: creativeVis ? "none" : "translateY(24px)",
                transition: `opacity 0.6s ${0.15 + i * 0.12}s, transform 0.6s ${0.15 + i * 0.12}s`,
                position: "relative",
              }}
            >
              {/* number watermark */}
              <span style={{
                position: "absolute",
                top: "32px",
                right: "32px",
                fontFamily: "var(--font-display, serif)",
                fontSize: "72px",
                fontWeight: 900,
                color: "rgba(255,255,255,0.03)",
                lineHeight: 1,
                userSelect: "none",
              }}>{s.num}</span>

              <div style={{ color: "var(--gold)", marginBottom: "24px" }}>{s.icon}</div>

              <span style={{ fontSize: "10px", letterSpacing: "3px", color: "var(--gold)", display: "block", marginBottom: "8px" }}>{s.title}</span>
              <h3 style={{ fontFamily: "var(--font-display, serif)", fontSize: "24px", fontWeight: 700, color: "white", marginBottom: "16px", lineHeight: 1.2 }}>
                {s.headline}
              </h3>
              <p style={{ fontSize: "14.5px", lineHeight: 1.85, color: "rgba(214,207,194,0.55)", fontWeight: 300 }}>{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── EXPERIENTIAL ADVISORY ── */}
      <section
        ref={advisoryRef}
        style={{ padding: "0 5vw 100px", maxWidth: "1200px", margin: "0 auto" }}
      >
        <div
          style={{
            marginBottom: "64px",
            opacity: advisoryVis ? 1 : 0,
            transform: advisoryVis ? "none" : "translateY(16px)",
            transition: "opacity 0.6s, transform 0.6s",
          }}
        >
          <span style={{ fontSize: "11px", letterSpacing: "4px", color: "var(--teal)", display: "block", marginBottom: "14px" }}>IMMERSIVE EXPERIENCES</span>
          <h2 style={{ fontFamily: "var(--font-display, serif)", fontStyle: "italic", fontWeight: 800, fontSize: "clamp(28px, 3.5vw, 44px)", color: "white", marginBottom: "14px" }}>
            Experiential Advisory Services
          </h2>
          <p style={{ fontSize: "15px", color: "rgba(214,207,194,0.5)", fontWeight: 300, maxWidth: "480px", lineHeight: 1.7 }}>
            Hands-on exposure to global personalities, tech and business ecosystems and experiences.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {advisory.map((a, i) => (
            <div
              key={a.num}
              style={{
                display: "grid",
                gridTemplateColumns: "80px 1fr",
                gap: "40px",
                padding: "40px 0",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
                alignItems: "start",
                opacity: advisoryVis ? 1 : 0,
                transform: advisoryVis ? "none" : "translateX(-16px)",
                transition: `opacity 0.6s ${0.1 + i * 0.12}s, transform 0.6s ${0.1 + i * 0.12}s`,
              }}
            >
              <span style={{
                fontFamily: "var(--font-display, serif)",
                fontSize: "13px",
                letterSpacing: "3px",
                color: "rgba(196,164,78,0.5)",
                paddingTop: "4px",
              }}>{a.num}</span>
              <div>
                <h3 style={{
                  fontSize: "13px",
                  letterSpacing: "2.5px",
                  fontWeight: 700,
                  color: "white",
                  marginBottom: "12px",
                }}>{a.title}</h3>
                <p style={{ fontSize: "14.5px", lineHeight: 1.85, color: "rgba(214,207,194,0.55)", fontWeight: 300, maxWidth: "580px" }}>{a.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY PARTNER ── */}
      <section
        ref={whyRef}
        style={{
          background: "rgba(44,140,124,0.06)",
          borderTop: "1px solid rgba(196,164,78,0.2)",
          padding: "100px 5vw",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div
            style={{
              marginBottom: "64px",
              opacity: whyVis ? 1 : 0,
              transform: whyVis ? "none" : "translateY(16px)",
              transition: "opacity 0.6s, transform 0.6s",
            }}
          >
            <span style={{ fontSize: "11px", letterSpacing: "4px", color: "var(--teal)", display: "block", marginBottom: "14px" }}>THE ADVANTAGE</span>
            <h2 style={{ fontFamily: "var(--font-display, serif)", fontStyle: "italic", fontWeight: 800, fontSize: "clamp(28px, 3.5vw, 44px)", color: "white" }}>
              Why partner with us
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>
            {pillars.map((p, i) => (
              <div
                key={p.title}
                style={{
                  padding: "36px 32px",
                  border: "1px solid rgba(196,164,78,0.15)",
                  borderRadius: "4px",
                  position: "relative",
                  overflow: "hidden",
                  opacity: whyVis ? 1 : 0,
                  transform: whyVis ? "none" : "translateY(20px)",
                  transition: `opacity 0.6s ${0.1 + i * 0.1}s, transform 0.6s ${0.1 + i * 0.1}s`,
                }}
              >
                <div style={{
                  position: "absolute",
                  top: 0, left: 0, right: 0,
                  height: "2px",
                  background: "var(--gold)",
                  opacity: 0.6,
                }} />
                <h4 style={{
                  fontSize: "13px",
                  letterSpacing: "2px",
                  fontWeight: 700,
                  color: "var(--gold)",
                  marginBottom: "12px",
                }}>{p.title.toUpperCase()}</h4>
                <p style={{ fontSize: "14px", lineHeight: 1.75, color: "rgba(214,207,194,0.55)", fontWeight: 300 }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        ref={ctaRef}
        style={{
          padding: "100px 5vw",
          textAlign: "center",
          borderTop: "3px solid var(--gold)",
          background: "var(--dark)",
        }}
      >
        <span
          style={{
            display: "block",
            fontSize: "11px",
            letterSpacing: "4px",
            color: "var(--teal)",
            marginBottom: "24px",
            opacity: ctaVis ? 1 : 0,
            transition: "opacity 0.6s",
          }}
        >
          LET'S WORK TOGETHER
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
          Ready to make your mark in African maritime culture?
        </h2>
        <p
          style={{
            fontSize: "15px",
            lineHeight: 1.8,
            color: "rgba(214,207,194,0.55)",
            maxWidth: "460px",
            margin: "0 auto 40px",
            fontWeight: 300,
            opacity: ctaVis ? 1 : 0,
            transition: "opacity 0.6s 0.2s",
          }}
        >
          Our team reviews all requests and responds within 3–5 business days.
        </p>
        <div
          style={{
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            flexWrap: "wrap",
            opacity: ctaVis ? 1 : 0,
            transition: "opacity 0.6s 0.3s",
          }}
        >
          <Link
            to="/partner"
            style={{
              display: "inline-block",
              padding: "14px 40px",
              background: "var(--gold)",
              color: "var(--dark)",
              textDecoration: "none",
              fontSize: "10px",
              letterSpacing: "3px",
              fontWeight: 700,
              borderRadius: "2px",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            GET IN TOUCH
          </Link>
          <Link
            to="/about"
            style={{
              display: "inline-block",
              padding: "14px 40px",
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
            LEARN ABOUT US
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
