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

const ecosystem = [
  {
    tag: "PODCAST",
    name: "Cabin Tea",
    desc: "A live conversation series where ocean professionals and unexpected ocean-adjacent voices come together over a carefully chosen cup of tea. Recorded live in Accra, heard everywhere.",
    to: "/episodes",
    color: "var(--teal)",
  },
  {
    tag: "GATHERING",
    name: "Afrocean",
    desc: "A dynamic and inclusive gathering that unites individuals of the African Diaspora, fostering a deep connection with their maritime heritage through cultural exchange and networking.",
    to: "/afrocean",
    color: "var(--gold)",
  },
  {
    tag: "MEDIA HUB",
    name: "Anchorage",
    desc: "A centralized media hub combined with in-person and digital experiences that curate personalized recommendations, reshaping the way we explore the maritime world.",
    to: "/anchorage",
    color: "var(--teal)",
  },
  {
    tag: "AGENCY",
    name: "Creative Agency",
    desc: "Connecting brands and businesses to the vibrancy, innovation, and commercial power of African and global maritime culture through strategy, creativity, and immersive experiences.",
    to: "/creative-agency",
    color: "var(--gold)",
  },
];

export default function About() {
  const [heroRef, heroVis] = useReveal(0.05);
  const [missionRef, missionVis] = useReveal(0.1);
  const [cabinRef, cabinVis] = useReveal(0.1);
  const [pillarsRef, pillarsVis] = useReveal(0.1);
  const [ecoRef, ecoVis] = useReveal(0.1);
  const [hostRef, hostVis] = useReveal(0.1);
  const [ctaRef, ctaVis] = useReveal(0.1);

  return (
    <div style={{ minHeight: "100vh", background: "var(--dark)", color: "var(--cream)" }}>
      <Navbar />

      {/* ═══ HERO — full-bleed cinematic, text anchored bottom-left ═══ */}
      <section ref={heroRef} style={{
        minHeight: "90vh",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "0 0 80px",
      }}>
        {/* Background */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img
            src="https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1600&q=80"
            alt="Ocean"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(21,42,47,1) 15%, rgba(21,42,47,0.6) 55%, rgba(21,42,47,0.25) 100%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(21,42,47,0.8) 40%, transparent 80%)" }} />
        </div>
        <div className="ct-grain" style={{ zIndex: 1 }} />

        <div style={{ position: "relative", zIndex: 2, padding: "0 5vw", maxWidth: "900px" }}>
          {/* Eyebrow */}
          <div style={{
            display: "flex", alignItems: "center", gap: "14px", marginBottom: "28px",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(14px)",
            transition: "opacity 0.7s 0.1s, transform 0.7s 0.1s",
          }}>
            <div style={{ width: "28px", height: "1px", background: "var(--teal)" }} />
            <span style={{ fontSize: "10px", letterSpacing: "4px", color: "var(--teal)", fontWeight: 500 }}>
              WHO WE ARE
            </span>
          </div>

          {/* Main headline */}
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(52px, 9vw, 130px)",
            lineHeight: 0.88,
            letterSpacing: "-3px",
            color: "white",
            marginBottom: "0",
            opacity: heroVis ? 1 : 0,
            transform: heroVis ? "none" : "translateY(24px)",
            transition: "opacity 0.8s 0.2s, transform 0.8s 0.2s",
          }}>
            Africa's
          </h1>
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontStyle: "italic",
            fontSize: "clamp(52px, 9vw, 130px)",
            lineHeight: 0.88,
            letterSpacing: "-3px",
            color: "var(--gold)",
            marginBottom: "40px",
            opacity: heroVis ? 1 : 0,
            transform: heroVis ? "none" : "translateY(24px)",
            transition: "opacity 0.8s 0.3s, transform 0.8s 0.3s",
          }}>
            Maritime Voice.
          </h1>

          <p style={{
            fontSize: "clamp(15px, 1.6vw, 18px)",
            lineHeight: 1.8,
            color: "rgba(214,207,194,0.65)",
            fontWeight: 300,
            maxWidth: "500px",
            opacity: heroVis ? 1 : 0,
            transform: heroVis ? "none" : "translateY(16px)",
            transition: "opacity 0.7s 0.45s, transform 0.7s 0.45s",
          }}>
            A 360° maritime media and industry network built for the African community and Diaspora — amplifying culture, connecting economies, and making maritime in Africa visible, relevant, and irresistible to the next generation.
          </p>
        </div>
      </section>

      {/* ═══ MISSION — editorial two-column with large pull quote ═══ */}
      <section ref={missionRef} style={{
        borderTop: "3px solid var(--gold)",
        padding: "100px 5vw",
        background: "var(--dark)",
      }}>
        <div style={{ maxWidth: "1300px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}>

          {/* Left — mission headline */}
          <div style={{
            opacity: missionVis ? 1 : 0,
            transform: missionVis ? "none" : "translateY(20px)",
            transition: "opacity 0.8s, transform 0.8s",
          }}>
            <span style={{ fontSize: "10px", letterSpacing: "4px", color: "var(--teal)", display: "block", marginBottom: "24px" }}>OUR MISSION</span>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(32px, 4vw, 52px)",
              lineHeight: 1,
              letterSpacing: "-1.5px",
              color: "white",
              marginBottom: "32px",
            }}>
              A Cultural Ecosystem That Unites, Invests in, and Celebrates African Maritime.
            </h2>

            {/* Monocle-style pull stat */}
            <div style={{
              borderLeft: "3px solid var(--gold)",
              paddingLeft: "24px",
              marginBottom: "40px",
            }}>
              <span style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(48px, 6vw, 80px)",
                fontWeight: 700,
                color: "var(--gold)",
                display: "block",
                lineHeight: 1,
              }}>50%+</span>
              <span style={{ fontSize: "13px", color: "rgba(214,207,194,0.55)", lineHeight: 1.6, display: "block", marginTop: "8px", fontWeight: 300 }}>
                of Africa's population is under 25. A blue economy renaissance is already underway — Cabin Tea captures the spirit of this moment.
              </span>
            </div>

            <Link to="/creative-agency" style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              padding: "12px 28px",
              border: "1px solid rgba(196,164,78,0.35)",
              color: "var(--gold)",
              textDecoration: "none",
              fontSize: "10px", letterSpacing: "2.5px", fontWeight: 600,
              borderRadius: "2px",
              transition: "background 0.2s, color 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "var(--gold)"; e.currentTarget.style.color = "var(--dark)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--gold)"; }}
            >
              OUR SERVICES →
            </Link>
          </div>

          {/* Right — mission body text */}
          <div style={{
            opacity: missionVis ? 1 : 0,
            transform: missionVis ? "none" : "translateY(20px)",
            transition: "opacity 0.8s 0.2s, transform 0.8s 0.2s",
          }}>
            <p style={{ fontSize: "16px", lineHeight: 1.95, color: "rgba(214,207,194,0.6)", fontWeight: 300, marginBottom: "28px" }}>
              Our mission is to foster a strong cultural connection and enhance economic opportunities between Africa and the Diaspora. By bridging the gap, we aim to rebuild and strengthen the African maritime community, facilitating cultural and industry exchange, collaboration, and mutual growth.
            </p>
            <p style={{ fontSize: "16px", lineHeight: 1.95, color: "rgba(214,207,194,0.6)", fontWeight: 300, marginBottom: "40px" }}>
              Through our efforts, we strive to create avenues for economic empowerment and sustainable development — benefiting both the African continent and the Diaspora communities worldwide.
            </p>

            {/* AIAC-style date/tag row */}
            <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
              {[
                { val: "360°", label: "Media Network" },
                { val: "Accra", label: "Gulf of Guinea" },
                { val: "Global", label: "Diaspora Reach" },
              ].map(s => (
                <div key={s.label}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "28px", fontWeight: 700, color: "white", display: "block", lineHeight: 1 }}>{s.val}</span>
                  <span style={{ fontSize: "10px", letterSpacing: "2px", color: "rgba(138,158,165,0.55)", display: "block", marginTop: "4px" }}>{s.label.toUpperCase()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ THE CABIN — full bleed quote, image split ═══ */}
      <section ref={cabinRef} style={{
        background: "var(--dark-alt)",
        borderTop: "1px solid rgba(196,164,78,0.1)",
        overflow: "hidden",
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>

          {/* Left — image */}
          <div style={{
            position: "relative", minHeight: "560px",
            opacity: cabinVis ? 1 : 0,
            transform: cabinVis ? "none" : "translateX(-20px)",
            transition: "opacity 0.9s, transform 0.9s",
          }}>
            <img
              src="https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=900&q=80"
              alt="Tea ceremony"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent 60%, var(--dark-alt) 100%)" }} />
          </div>

          {/* Right — the cabin story */}
          <div style={{
            padding: "80px 5vw 80px 48px",
            display: "flex", flexDirection: "column", justifyContent: "center",
            opacity: cabinVis ? 1 : 0,
            transform: cabinVis ? "none" : "translateX(20px)",
            transition: "opacity 0.9s 0.2s, transform 0.9s 0.2s",
          }}>
            <span style={{ fontSize: "10px", letterSpacing: "4px", color: "var(--teal)", display: "block", marginBottom: "24px" }}>THE NAME</span>

            {/* Large decorative quote mark */}
            <div style={{
              fontFamily: "var(--font-display)",
              fontSize: "120px",
              color: "rgba(196,164,78,0.12)",
              lineHeight: 0.8,
              marginBottom: "-16px",
              fontWeight: 700,
            }}>"</div>

            <blockquote style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: "clamp(22px, 2.5vw, 32px)",
              lineHeight: 1.4,
              color: "var(--cream)",
              margin: "0 0 32px 0",
              borderLeft: "3px solid var(--gold)",
              paddingLeft: "28px",
            }}>
              A ship's cabin is where honest conversations happen — below deck, away from performance, between people who trust each other.
            </blockquote>

            <p style={{ fontSize: "15px", lineHeight: 1.9, color: "rgba(214,207,194,0.55)", fontWeight: 300, maxWidth: "420px", marginBottom: "32px" }}>
              The cabin is the intimate space on a vessel where rank falls away and real talk begins. It's the origin of the name, and the soul of every episode — unhurried, unscripted, and deeply human.
            </p>

            <span style={{ fontSize: "11px", letterSpacing: "2.5px", color: "rgba(196,164,78,0.5)", fontWeight: 600 }}>— CABIN TEA</span>
          </div>
        </div>
      </section>

      {/* ═══ THREE PILLARS — AIAC editorial list ═══ */}
      <section ref={pillarsRef} style={{
        padding: "100px 5vw",
        background: "var(--dark)",
        borderTop: "1px solid rgba(196,164,78,0.1)",
      }}>
        <div style={{ maxWidth: "1300px", margin: "0 auto" }}>
          <div style={{
            marginBottom: "64px",
            opacity: pillarsVis ? 1 : 0,
            transform: pillarsVis ? "none" : "translateY(16px)",
            transition: "opacity 0.6s, transform 0.6s",
          }}>
            <span style={{ fontSize: "10px", letterSpacing: "4px", color: "var(--teal)", display: "block", marginBottom: "14px" }}>WHAT DRIVES US</span>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700, fontStyle: "italic",
              fontSize: "clamp(28px, 3.5vw, 48px)",
              color: "white", lineHeight: 1, margin: 0,
            }}>Three words. One mission.</h2>
          </div>

          {/* Monocle-style numbered list */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {pillars.map((p, i) => (
              <div key={p.num} style={{
                display: "grid",
                gridTemplateColumns: "80px 1fr 1fr",
                gap: "48px",
                padding: "48px 0",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
                alignItems: "center",
                opacity: pillarsVis ? 1 : 0,
                transform: pillarsVis ? "none" : "translateY(20px)",
                transition: `opacity 0.6s ${0.1 + i * 0.12}s, transform 0.6s ${0.1 + i * 0.12}s`,
              }}>
                <span style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(40px, 5vw, 64px)",
                  fontWeight: 700, fontStyle: "italic",
                  color: "rgba(196,164,78,0.15)",
                  lineHeight: 1,
                }}>{p.num}</span>
                <h3 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(28px, 3vw, 44px)",
                  fontWeight: 700, color: "white",
                  lineHeight: 1, margin: 0,
                  letterSpacing: "-0.5px",
                }}>{p.title}</h3>
                <p style={{ fontSize: "15px", lineHeight: 1.85, color: "rgba(214,207,194,0.5)", fontWeight: 300, margin: 0 }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ THE ECOSYSTEM — what we do ═══ */}
      <section ref={ecoRef} style={{
        padding: "100px 5vw",
        background: "var(--dark-alt)",
        borderTop: "1px solid rgba(196,164,78,0.1)",
      }}>
        <div style={{ maxWidth: "1300px", margin: "0 auto" }}>
          <div style={{
            marginBottom: "64px",
            opacity: ecoVis ? 1 : 0,
            transform: ecoVis ? "none" : "translateY(16px)",
            transition: "opacity 0.6s, transform 0.6s",
          }}>
            <span style={{ fontSize: "10px", letterSpacing: "4px", color: "var(--teal)", display: "block", marginBottom: "14px" }}>THE ECOSYSTEM</span>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700, fontStyle: "italic",
              fontSize: "clamp(28px, 3.5vw, 48px)",
              color: "white", lineHeight: 1, margin: 0,
            }}>More than a podcast.</h2>
          </div>

          {/* 2x2 grid of ecosystem cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1px", background: "rgba(255,255,255,0.05)" }}>
            {ecosystem.map((item, i) => (
              <Link key={item.name} to={item.to} style={{
                textDecoration: "none",
                background: "var(--dark-alt)",
                padding: "48px 40px",
                display: "flex", flexDirection: "column",
                transition: "background 0.25s",
                opacity: ecoVis ? 1 : 0,
                transform: ecoVis ? "none" : "translateY(20px)",
                transitionProperty: "background, opacity, transform",
                transitionDuration: "0.25s, 0.6s, 0.6s",
                transitionDelay: `0s, ${0.1 + i * 0.1}s, ${0.1 + i * 0.1}s`,
              }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(44,140,124,0.08)"}
                onMouseLeave={e => e.currentTarget.style.background = "var(--dark-alt)"}
              >
                <span style={{
                  fontSize: "9px", letterSpacing: "2.5px", fontWeight: 700,
                  color: item.color === "var(--gold)" ? "var(--gold)" : "var(--teal)",
                  display: "block", marginBottom: "20px",
                }}>{item.tag}</span>
                <h3 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "28px", fontWeight: 700,
                  color: "white", margin: "0 0 16px 0",
                  lineHeight: 1.1,
                }}>{item.name}</h3>
                <div style={{
                  width: "24px", height: "1px",
                  background: item.color === "var(--gold)" ? "var(--gold)" : "var(--teal)",
                  marginBottom: "16px",
                }} />
                <p style={{ fontSize: "13.5px", lineHeight: 1.85, color: "rgba(214,207,194,0.5)", fontWeight: 300, flex: 1, marginBottom: "24px" }}>
                  {item.desc}
                </p>
                <span style={{ fontSize: "10px", letterSpacing: "2px", color: "rgba(196,164,78,0.5)", fontWeight: 600 }}>EXPLORE →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOST — human, editorial ═══ */}
      <section ref={hostRef} style={{
        padding: "100px 5vw",
        background: "var(--dark)",
        borderTop: "1px solid rgba(196,164,78,0.1)",
      }}>
        <div style={{ maxWidth: "1300px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>

          {/* Photo block */}
          <div style={{
            opacity: hostVis ? 1 : 0,
            transform: hostVis ? "none" : "translateX(-20px)",
            transition: "opacity 0.8s, transform 0.8s",
            position: "relative",
          }}>
            <div style={{ aspectRatio: "3/4", overflow: "hidden", borderRadius: "2px", background: "rgba(44,140,124,0.15)" }}>
              <img
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80"
                alt="Host"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(21,42,47,0.6) 0%, transparent 50%)" }} />
            </div>
            {/* Floating label */}
            <div style={{
              position: "absolute",
              bottom: "-20px", right: "-20px",
              background: "var(--gold)",
              color: "var(--dark)",
              padding: "20px 24px",
              borderRadius: "2px",
            }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "11px", letterSpacing: "2.5px", fontWeight: 700, display: "block" }}>HOST & CREATOR</span>
              <span style={{ fontSize: "11px", color: "rgba(21,42,47,0.65)", display: "block", marginTop: "2px" }}>Cabin Tea · Accra</span>
            </div>
          </div>

          {/* Host text */}
          <div style={{
            opacity: hostVis ? 1 : 0,
            transform: hostVis ? "none" : "translateX(20px)",
            transition: "opacity 0.8s 0.2s, transform 0.8s 0.2s",
          }}>
            <span style={{ fontSize: "10px", letterSpacing: "4px", color: "var(--teal)", display: "block", marginBottom: "20px" }}>YOUR HOST</span>

            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px, 4vw, 56px)",
              fontWeight: 700, lineHeight: 0.95,
              letterSpacing: "-1.5px",
              color: "white", marginBottom: "8px",
            }}>Your Name</h2>

            <p style={{ fontSize: "13px", letterSpacing: "1px", color: "var(--gold)", marginBottom: "32px" }}>
              Host &amp; Creator, Cabin Tea
            </p>

            {/* Divider line */}
            <div style={{ width: "40px", height: "2px", background: "var(--gold)", marginBottom: "32px" }} />

            <p style={{
              fontSize: "16px", lineHeight: 1.95,
              color: "rgba(214,207,194,0.55)", fontWeight: 300,
              marginBottom: "20px", maxWidth: "420px",
              fontFamily: "var(--font-display)", fontStyle: "italic",
            }}>
              Add your bio here — your background, your connection to the ocean, and what drove you to create Cabin Tea.
            </p>
            <p style={{
              fontSize: "15px", lineHeight: 1.85,
              color: "rgba(214,207,194,0.45)", fontWeight: 300, maxWidth: "420px",
            }}>
              This is your moment to make the audience feel like they already know you before the show even starts. Your story is the anchor of this entire brand.
            </p>

            <Link to="/about-host" style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              marginTop: "36px",
              padding: "12px 28px",
              background: "var(--gold)", color: "var(--dark)",
              textDecoration: "none", fontSize: "10px",
              letterSpacing: "2.5px", fontWeight: 700, borderRadius: "2px",
              transition: "opacity 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >
              FULL BIO →
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA — dark, bold, confident ═══ */}
      <section ref={ctaRef} style={{
        borderTop: "3px solid var(--gold)",
        padding: "100px 5vw",
        background: "var(--dark-alt)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: "40px",
      }}>
        <div style={{
          opacity: ctaVis ? 1 : 0,
          transform: ctaVis ? "none" : "translateY(16px)",
          transition: "opacity 0.7s, transform 0.7s",
        }}>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700, fontStyle: "italic",
            fontSize: "clamp(28px, 4vw, 56px)",
            color: "white", lineHeight: 0.95,
            letterSpacing: "-1px", margin: "0 0 16px 0",
          }}>
            Ready to be part<br />of the conversation?
          </h2>
          <p style={{ fontSize: "15px", color: "rgba(214,207,194,0.5)", fontWeight: 300, maxWidth: "400px" }}>
            Whether you want to listen, partner, attend an event, or collaborate — there's a place for you in the Cabin Tea ecosystem.
          </p>
        </div>

        <div style={{
          display: "flex", gap: "14px", flexWrap: "wrap",
          opacity: ctaVis ? 1 : 0,
          transition: "opacity 0.7s 0.2s",
        }}>
          <Link to="/episodes" style={{
            display: "inline-block", padding: "14px 36px",
            background: "var(--gold)", color: "var(--dark)",
            textDecoration: "none", fontSize: "10px",
            letterSpacing: "3px", fontWeight: 700, borderRadius: "2px",
            transition: "opacity 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >LISTEN NOW</Link>
          <Link to="/partner" style={{
            display: "inline-block", padding: "14px 36px",
            border: "1px solid rgba(196,164,78,0.35)",
            color: "rgba(214,207,194,0.7)",
            textDecoration: "none", fontSize: "10px",
            letterSpacing: "3px", fontWeight: 600, borderRadius: "2px",
            transition: "border-color 0.2s, color 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--gold)"; e.currentTarget.style.color = "white"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(196,164,78,0.35)"; e.currentTarget.style.color = "rgba(214,207,194,0.7)"; }}
          >BECOME A PARTNER</Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
