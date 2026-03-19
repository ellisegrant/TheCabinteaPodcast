import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WaveLine from "../components/WaveLine";

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

const display = { fontFamily: "var(--font-display, 'Cormorant Garant', Georgia, serif)" };
const body    = { fontFamily: "var(--font-body, 'DM Sans', sans-serif)" };
const label   = { ...body, fontSize: "10px", letterSpacing: "3.5px", textTransform: "uppercase", fontWeight: 400 };

const IMG = {
  ocean:  "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1400&q=80",
  host:   "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",
  accra:  "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=900&q=80",
  record: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&q=80",
};

export default function AboutHost() {
  const [heroRef,  heroVis]  = useReveal(0.05);
  const [bioRef,   bioVis]   = useReveal(0.1);
  const [quoteRef, quoteVis] = useReveal(0.1);
  const [whyRef,   whyVis]   = useReveal(0.1);
  const [ctaRef,   ctaVis]   = useReveal(0.1);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--dark)" }}>
      <Navbar />

      {/* ═══ HERO ═══ */}
      <section
        ref={heroRef}
        className="relative overflow-hidden"
        style={{ minHeight: "420px" }}
      >
        <img
          src={IMG.ocean}
          alt="Ocean"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "rgba(21,42,47,0.82)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "120px", background: "linear-gradient(to top, var(--dark), transparent)" }} />
        <div className="ct-grain" style={{ zIndex: 1 }} />

        {/* Gold vertical rule */}
        <div style={{
          position: "absolute",
          left: "clamp(24px, 6vw, 80px)",
          top: "50%", transform: "translateY(-50%)",
          width: "2px", height: "120px",
          background: "var(--gold)", opacity: 0.7, zIndex: 2,
        }} />

        <div
          className={`ct-reveal ${heroVis ? "ct-visible" : ""} relative flex flex-col justify-center`}
          style={{
            zIndex: 3,
            minHeight: "420px",
            paddingLeft: "clamp(48px, 9vw, 120px)",
            paddingRight: "clamp(24px, 6vw, 80px)",
            paddingTop: "80px", paddingBottom: "60px",
            transitionDelay: "0.1s",
          }}
        >
          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
            <Link to="/about" style={{ ...label, color: "var(--teal)", textDecoration: "none", fontSize: "9px" }}>
              ABOUT
            </Link>
            <span style={{ ...label, color: "rgba(138,158,165,0.4)", fontSize: "9px" }}>›</span>
            <span style={{ ...label, color: "rgba(138,158,165,0.6)", fontSize: "9px" }}>THE HOST</span>
          </div>

          <span style={{ ...label, color: "var(--teal)", display: "block", marginBottom: "16px" }}>
            MEET THE HOST
          </span>
          <h1
            style={{
              ...display,
              fontWeight: 700,
              fontSize: "clamp(52px, 8vw, 110px)",
              lineHeight: 0.9,
              letterSpacing: "-2px",
              color: "var(--cream)",
              marginBottom: "20px",
            }}
          >
            The Voice<br />
            <span style={{ fontStyle: "italic", color: "var(--gold)" }}>Behind the Cup.</span>
          </h1>
          <div style={{ maxWidth: "200px" }}>
            <WaveLine color="rgba(196,164,78,0.5)" />
          </div>
        </div>
      </section>

      {/* ═══ BIO — Image left, text right ═══ */}
      <section ref={bioRef} style={{ background: "var(--cream)" }}>
        <div className="flex flex-col lg:flex-row" style={{ minHeight: "560px" }}>

          {/* Host photo */}
          <div
            className={`ct-reveal-left ${bioVis ? "ct-visible" : ""} lg:w-5/12 relative overflow-hidden`}
            style={{ minHeight: "400px", transitionDelay: "0.1s" }}
          >
            <img
              src={IMG.host}
              alt="Your Name — Host"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
            />
            {/* Gold right border */}
            <div style={{ position: "absolute", top: 0, right: 0, height: "100%", width: "3px", background: "var(--gold)", opacity: 0.7 }} />

            {/* Name badge overlaid on image */}
            <div style={{
              position: "absolute", bottom: "24px", left: "24px",
              background: "rgba(21,42,47,0.88)",
              border: "1px solid rgba(196,164,78,0.3)",
              borderLeft: "3px solid var(--gold)",
              padding: "14px 18px",
              backdropFilter: "blur(4px)",
            }}>
              <p style={{ ...display, fontWeight: 700, fontSize: "20px", color: "var(--cream)", marginBottom: "2px", lineHeight: 1.2 }}>
                Your Name
              </p>
              <p style={{ ...label, color: "var(--gold)", fontSize: "9px" }}>Host & Creator · Cabin Tea</p>
            </div>
          </div>

          {/* Bio text */}
          <div
            className={`ct-reveal-right ${bioVis ? "ct-visible" : ""} lg:w-7/12 flex flex-col justify-center`}
            style={{ padding: "clamp(40px, 6vw, 80px) clamp(32px, 6vw, 80px)", transitionDelay: "0.25s" }}
          >
            <span style={{ ...label, color: "var(--teal)", display: "block", marginBottom: "16px" }}>
              YOUR HOST
            </span>
            <h2
              style={{
                ...display,
                fontStyle: "italic",
                fontWeight: 700,
                fontSize: "clamp(26px, 3vw, 38px)",
                color: "var(--dark)",
                lineHeight: 1.15,
                marginBottom: "20px",
              }}
            >
              Your Name
            </h2>

            <div style={{ width: "48px", height: "2px", background: "var(--gold)", marginBottom: "24px" }} />

            <p style={{ ...body, fontWeight: 300, fontSize: "15px", lineHeight: 1.9, color: "rgba(21,42,47,0.68)", marginBottom: "18px", maxWidth: "500px" }}>
              This is where your story goes. Tell the audience who you are — your background, your connection to the ocean, and the experiences that shaped your worldview. Be personal. Be honest.
            </p>
            <p style={{ ...body, fontWeight: 300, fontSize: "15px", lineHeight: 1.9, color: "rgba(21,42,47,0.68)", marginBottom: "28px", maxWidth: "500px" }}>
              Talk about what drew you to the Gulf of Guinea, to the people who work and live beside the sea, and why you believe their stories deserve a platform as intimate as a cup of tea shared below deck.
            </p>

            {/* Credentials / tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {["Gulf of Guinea", "Accra, Ghana", "Ocean Storytelling", "Live Podcasting"].map((tag) => (
                <span
                  key={tag}
                  style={{
                    ...label,
                    fontSize: "9px",
                    padding: "6px 14px",
                    border: "1px solid rgba(30,107,95,0.35)",
                    color: "var(--teal-dark)",
                    borderRadius: "2px",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PULL QUOTE ═══ */}
      <section
        ref={quoteRef}
        className="relative overflow-hidden py-20 px-6 md:px-12"
        style={{ background: "var(--dark)" }}
      >
        <div className="ct-grain" />
        <div style={{ position: "absolute", inset: 0, opacity: 0.04 }}>
          <img src={IMG.accra} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>

        <div
          className={`ct-reveal ${quoteVis ? "ct-visible" : ""} relative max-w-3xl mx-auto text-center`}
          style={{ transitionDelay: "0.15s" }}
        >
          <div className="mx-auto mb-8" style={{ maxWidth: "180px" }}>
            <WaveLine />
          </div>
          <p
            style={{
              ...display,
              fontStyle: "italic",
              fontSize: "clamp(20px, 3vw, 30px)",
              lineHeight: 1.6,
              color: "var(--cream)",
              marginBottom: "24px",
            }}
          >
            "Add a personal quote here — something that captures your philosophy, your relationship with the ocean, or what Cabin Tea means to you. Make it something you'd actually say."
          </p>
          <span style={{ ...label, color: "var(--gold)", fontSize: "10px" }}>— YOUR NAME, HOST</span>
        </div>
      </section>

      {/* ═══ WHY CABIN TEA — 3-column story ═══ */}
      <section
        ref={whyRef}
        className="relative"
        style={{ background: "var(--dark-alt)", borderTop: "1px solid rgba(214,207,194,0.07)" }}
      >
        <div
          className="max-w-6xl mx-auto"
          style={{ padding: "clamp(60px, 8vw, 96px) clamp(24px, 6vw, 80px)" }}
        >
          <div className={`ct-reveal ${whyVis ? "ct-visible" : ""} mb-14`} style={{ transitionDelay: "0.1s" }}>
            <span style={{ ...label, color: "var(--teal)", display: "block", marginBottom: "12px" }}>
              THE ORIGIN
            </span>
            <h2
              style={{
                ...display,
                fontStyle: "italic",
                fontWeight: 700,
                fontSize: "clamp(26px, 3vw, 38px)",
                color: "var(--cream)",
                maxWidth: "480px",
                lineHeight: 1.2,
              }}
            >
              Why Cabin Tea exists.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                num: "01",
                title: "The Idea",
                body: "Describe the moment or realisation that sparked Cabin Tea. Where were you? What were you reading, hearing, or feeling? What gap did you see that no one else was filling?",
              },
              {
                num: "02",
                title: "The Sea",
                body: "Talk about what the ocean means to you personally. This isn't just a setting — it's a character in everything you do. Why West Africa? Why the Gulf of Guinea specifically?",
              },
              {
                num: "03",
                title: "The Cup",
                body: "Explain the tea. Why tea as a ritual for conversation? What does slowing down over a cup create that a studio mic and timer never could? This is the soul of the show.",
              },
            ].map((item, i) => (
              <div
                key={item.num}
                className={`ct-reveal ${whyVis ? "ct-visible" : ""}`}
                style={{ transitionDelay: `${0.2 + i * 0.15}s` }}
              >
                <span
                  style={{
                    ...display,
                    fontStyle: "italic",
                    fontWeight: 700,
                    fontSize: "52px",
                    color: "rgba(196,164,78,0.15)",
                    display: "block",
                    lineHeight: 1,
                    marginBottom: "12px",
                  }}
                >
                  {item.num}
                </span>
                <div style={{ width: "32px", height: "2px", background: "var(--gold)", marginBottom: "14px" }} />
                <h3
                  style={{
                    ...display,
                    fontWeight: 600,
                    fontSize: "20px",
                    color: "var(--cream)",
                    marginBottom: "12px",
                    lineHeight: 1.2,
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    ...body,
                    fontWeight: 300,
                    fontSize: "14px",
                    lineHeight: 1.85,
                    color: "rgba(214,207,194,0.52)",
                  }}
                >
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ RECORDING photo strip ═══ */}
      <section style={{ height: "280px", position: "relative", overflow: "hidden" }}>
        <img
          src={IMG.record}
          alt="Recording session"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "rgba(21,42,47,0.55)" }} />
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <span
            style={{
              ...display,
              fontStyle: "italic",
              fontWeight: 700,
              fontSize: "clamp(22px, 3.5vw, 40px)",
              color: "rgba(242,235,221,0.18)",
              letterSpacing: "-1px",
              userSelect: "none",
            }}
          >
            Recorded live in Accra, Ghana.
          </span>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section
        ref={ctaRef}
        style={{ background: "var(--dark)", borderTop: "2px solid var(--gold)" }}
      >
        <div
          className={`ct-reveal ${ctaVis ? "ct-visible" : ""} flex flex-col md:flex-row items-center justify-between gap-8`}
          style={{
            padding: "clamp(40px, 6vw, 64px) clamp(24px, 6vw, 80px)",
            maxWidth: "1100px",
            margin: "0 auto",
            transitionDelay: "0.1s",
          }}
        >
          <div>
            <h3
              style={{
                ...display,
                fontStyle: "italic",
                fontWeight: 700,
                fontSize: "clamp(22px, 2.5vw, 30px)",
                color: "var(--cream)",
                marginBottom: "8px",
              }}
            >
              Ready to listen?
            </h3>
            <p style={{ ...body, fontWeight: 300, fontSize: "14px", color: "rgba(214,207,194,0.55)", lineHeight: 1.7 }}>
              Explore every conversation — from maritime law to blue economies.
            </p>
          </div>
          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
            <Link
              to="/episodes"
              className="ct-btn-primary py-4 px-10 no-underline inline-block"
              style={{ ...label, letterSpacing: "3px" }}
            >
              ALL EPISODES
            </Link>
            <Link
              to="/contact"
              className="ct-btn-gold py-4 px-10 no-underline inline-block"
              style={{ ...label, letterSpacing: "3px" }}
            >
              GET IN TOUCH
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
