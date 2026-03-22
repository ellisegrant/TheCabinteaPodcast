import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WaveLine from "../components/WaveLine";
import EpisodeArtwork from "../components/EpisodeArtwork";
import PlayIcon from "../components/PlayIcon";

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

function SpotifyIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>;
}
function AppleIcon() {
  return <svg width="18" height="22" viewBox="0 0 20 24" fill="currentColor"><path d="M16.5 12.5c0-2.8 2.3-4.1 2.4-4.2-1.3-1.9-3.3-2.2-4-2.2-1.7-.2-3.4 1-4.2 1s-2.2-1-3.7-1C5.1 6.1 3.4 7.2 2.4 8.8.5 12.2 1.9 17.2 3.8 20c.9 1.3 2 2.8 3.5 2.8 1.4-.1 1.9-.9 3.6-.9s2.2.9 3.7.9 2.5-1.4 3.4-2.7c1.1-1.5 1.5-3 1.5-3.1-.1 0-2.9-1.1-3-4.5zM13.7 4.3c.8-1 1.3-2.3 1.1-3.6-1.1 0-2.5.7-3.3 1.7-.7.8-1.3 2.1-1.2 3.4 1.3.1 2.5-.6 3.4-1.5z"/></svg>;
}
function YoutubeIcon() {
  return <svg width="24" height="17" viewBox="0 0 26 18" fill="currentColor"><path d="M25.456 2.818A3.26 3.26 0 0023.162.51C21.13 0 13 0 13 0S4.87 0 2.838.51A3.26 3.26 0 00.544 2.818C0 4.862 0 9 0 9s0 4.138.544 6.182a3.26 3.26 0 002.294 2.308C4.87 18 13 18 13 18s8.13 0 10.162-.51a3.26 3.26 0 002.294-2.308C26 13.138 26 9 26 9s0-4.138-.544-6.182zM10.4 12.857V5.143L17.143 9 10.4 12.857z"/></svg>;
}

function EventCard({ name, tag, tagColor, description, image, to, index, visible }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      to={to}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        textDecoration: "none", display: "flex", flexDirection: "column",
        border: `1px solid ${hovered ? "rgba(196,164,78,0.4)" : "rgba(196,164,78,0.12)"}`,
        borderRadius: "2px", overflow: "hidden",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        opacity: visible ? 1 : 0,
        transition: "border-color 0.3s, transform 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.6s",
        transitionDelay: `${0.1 + index * 0.15}s`,
        boxShadow: hovered ? "0 24px 48px rgba(0,0,0,0.3)" : "none",
      }}
    >
      <div style={{ position: "relative", height: "260px", overflow: "hidden", flexShrink: 0 }}>
        <img src={image} alt={name} style={{
          width: "100%", height: "100%", objectFit: "cover",
          transform: hovered ? "scale(1.05)" : "scale(1)",
          transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1)",
        }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(21,42,47,0.3)" }} />
        <span style={{
          position: "absolute", top: "18px", left: "18px",
          fontSize: "9px", letterSpacing: "2.5px", fontWeight: 700,
          color: tagColor === "teal" ? "white" : "var(--dark)",
          background: tagColor === "teal" ? "var(--teal)" : "var(--gold)",
          padding: "5px 13px", borderRadius: "1px",
        }}>{tag}</span>
      </div>
      <div style={{
        padding: "36px 36px 40px", background: "var(--dark-alt)",
        flex: 1, display: "flex", flexDirection: "column",
      }}>
        <span style={{ fontSize: "10px", letterSpacing: "3px", color: "rgba(138,158,165,0.5)", marginBottom: "12px", display: "block" }}>
          CABIN TEA · EVENT
        </span>
        <h3 style={{
          fontFamily: "var(--font-display)", fontWeight: 700,
          fontSize: "42px", lineHeight: 0.92, letterSpacing: "-1px",
          color: hovered ? "var(--gold)" : "white",
          marginBottom: "20px", transition: "color 0.25s",
        }}>{name}</h3>
        <div style={{
          width: hovered ? "48px" : "24px", height: "1px",
          background: "var(--gold)", marginBottom: "20px",
          transition: "width 0.35s",
        }} />
        <p style={{
          fontSize: "14px", lineHeight: 1.9, color: "rgba(214,207,194,0.5)",
          fontWeight: 300, flex: 1, marginBottom: "32px",
        }}>{description}</p>
        <div style={{
          display: "flex", alignItems: "center",
          gap: hovered ? "14px" : "8px",
          fontSize: "10px", letterSpacing: "2.5px", fontWeight: 600,
          color: "var(--gold)", transition: "gap 0.3s",
        }}>
          EXPLORE
          <span style={{
            display: "inline-block", fontSize: "16px",
            transform: hovered ? "translateX(4px)" : "translateX(0)",
            transition: "transform 0.3s",
          }}>→</span>
        </div>
      </div>
    </Link>
  );
}

function Marquee() {
  const items = ["GULF OF GUINEA", "MARITIME CULTURE", "BLUE ECONOMY", "AFRICAN DIASPORA", "ACCRA, GHANA", "OCEAN GOVERNANCE", "LIVE CONVERSATIONS"];
  const doubled = [...items, ...items];
  return (
    <div style={{
      overflow: "hidden",
      borderTop: "1px solid rgba(196,164,78,0.2)",
      borderBottom: "1px solid rgba(196,164,78,0.2)",
      background: "rgba(196,164,78,0.04)", padding: "14px 0",
    }}>
      <div style={{
        display: "flex", animation: "marquee 28s linear infinite", width: "max-content",
      }}>
        {doubled.map((item, i) => (
          <span key={i} style={{
            fontSize: "10px", letterSpacing: "3.5px", fontWeight: 500,
            color: "rgba(196,164,78,0.5)", whiteSpace: "nowrap",
            padding: "0 40px", borderRight: "1px solid rgba(196,164,78,0.15)",
          }}>{item}</span>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </div>
  );
}

export default function Home() {
  const [heroRef, heroVis] = useReveal(0.05);
  const [missionRef, missionVis] = useReveal(0.1);
  const [epRef, epVis] = useReveal(0.1);
  const [agencyRef, agencyVis] = useReveal(0.1);
  const [sponsorRef, sponsorVis] = useReveal(0.1);
  const [ctaRef, ctaVis] = useReveal(0.1);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--dark)" }}>
      <Navbar />

      {/* ═══ HERO ═══ */}
      <section ref={heroRef} style={{
        minHeight: "100vh", position: "relative", overflow: "hidden",
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
        padding: "0 0 80px",
      }}>
        <video autoPlay muted loop playsInline style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", zIndex: 0,
        }}>
          <source src="/herovideo.mp4" type="video/mp4" />
        </video>
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(to top, rgba(21,42,47,0.98) 0%, rgba(21,42,47,0.55) 45%, rgba(21,42,47,0.2) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(to right, rgba(21,42,47,0.7) 0%, transparent 60%)" }} />
        <div className="ct-grain" style={{ zIndex: 2 }} />

        <div style={{ position: "relative", zIndex: 3, padding: "0 5vw" }}>
          <div style={{
            display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(12px)",
            transition: "opacity 0.7s 0.1s, transform 0.7s 0.1s",
          }}>
            <div style={{ width: "32px", height: "1px", background: "var(--teal)" }} />
            <span style={{ fontSize: "10px", letterSpacing: "4px", color: "var(--teal)", fontWeight: 500 }}>
              A PODCAST FROM THE GULF OF GUINEA
            </span>
          </div>

          <h1 style={{
            fontFamily: "var(--font-display)", fontWeight: 700,
            fontSize: "clamp(72px, 13vw, 180px)", lineHeight: 0.86,
            letterSpacing: "-4px", color: "white", margin: 0,
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(30px)",
            transition: "opacity 0.8s 0.2s, transform 0.8s 0.2s",
          }}>CABIN</h1>
          <h1 style={{
            fontFamily: "var(--font-display)", fontWeight: 700, fontStyle: "italic",
            fontSize: "clamp(72px, 13vw, 180px)", lineHeight: 0.86,
            letterSpacing: "-4px", color: "var(--gold)", marginBottom: "48px",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(30px)",
            transition: "opacity 0.8s 0.3s, transform 0.8s 0.3s",
          }}>TEA</h1>

          <div style={{
            display: "flex", alignItems: "flex-end", justifyContent: "space-between",
            flexWrap: "wrap", gap: "32px",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(16px)",
            transition: "opacity 0.7s 0.45s, transform 0.7s 0.45s",
          }}>
            <div style={{ maxWidth: "480px" }}>
              <p style={{
                fontFamily: "var(--font-display)", fontStyle: "italic",
                fontSize: "clamp(18px, 2vw, 24px)", color: "rgba(214,207,194,0.7)",
                lineHeight: 1.4, marginBottom: "28px",
              }}>
                Sipping with the people who know the sea.
              </p>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <Link to="/episodes" style={{
                  display: "inline-block", padding: "13px 32px",
                  background: "var(--gold)", color: "var(--dark)",
                  textDecoration: "none", fontSize: "10px",
                  letterSpacing: "3px", fontWeight: 700, borderRadius: "2px",
                  transition: "opacity 0.2s",
                }}
                  onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                  onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                >LISTEN NOW</Link>
                <Link to="/partner" style={{
                  display: "inline-block", padding: "13px 32px",
                  border: "1px solid rgba(196,164,78,0.4)",
                  color: "rgba(214,207,194,0.75)",
                  textDecoration: "none", fontSize: "10px",
                  letterSpacing: "3px", fontWeight: 600, borderRadius: "2px",
                  transition: "border-color 0.2s, color 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--gold)"; e.currentTarget.style.color = "white"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(196,164,78,0.4)"; e.currentTarget.style.color = "rgba(214,207,194,0.75)"; }}
                >PARTNER WITH US</Link>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "20px" }}>
              <Link to="/episodes" style={{
                textDecoration: "none", display: "flex", alignItems: "center", gap: "14px",
                background: "rgba(21,42,47,0.8)", backdropFilter: "blur(10px)",
                border: "1px solid rgba(196,164,78,0.2)",
                padding: "12px 20px 12px 14px", borderRadius: "40px",
                transition: "border-color 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(196,164,78,0.5)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(196,164,78,0.2)"}
              >
                <div style={{
                  width: "36px", height: "36px", borderRadius: "50%",
                  background: "var(--gold)", display: "flex",
                  alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <svg width="10" height="12" viewBox="0 0 10 12" fill="var(--dark)"><path d="M0 0l10 6-10 6V0z" /></svg>
                </div>
                <div>
                  <span style={{ display: "block", fontSize: "9px", letterSpacing: "2px", color: "rgba(196,164,78,0.7)", marginBottom: "2px" }}>LATEST EPISODE</span>
                  <span style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "white" }}>Amara Diallo · EP. 01</span>
                </div>
              </Link>

              <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <span style={{ fontSize: "9px", letterSpacing: "2.5px", color: "rgba(138,158,165,0.5)" }}>LISTEN ON</span>
                {[{ icon: <YoutubeIcon />, href: "#" }, { icon: <SpotifyIcon />, href: "#" }, { icon: <AppleIcon />, href: "#" }].map((p, i) => (
                  <a key={i} href={p.href} style={{ color: "rgba(138,158,165,0.5)", display: "inline-flex", transition: "color 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.color = "var(--gold)"}
                    onMouseLeave={e => e.currentTarget.style.color = "rgba(138,158,165,0.5)"}
                  >{p.icon}</a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ MARQUEE ═══ */}
      <Marquee />

      {/* ═══ MISSION ═══ */}
      <section ref={missionRef} style={{ background: "var(--dark)", padding: "120px 5vw" }}>
        <div style={{ maxWidth: "1300px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "end" }}>
          <div style={{
            opacity: missionVis ? 1 : 0, transform: missionVis ? "none" : "translateY(24px)",
            transition: "opacity 0.8s, transform 0.8s",
          }}>
            <span style={{ fontSize: "10px", letterSpacing: "4px", color: "var(--teal)", display: "block", marginBottom: "28px" }}>WHO WE ARE</span>
            <h2 style={{
              fontFamily: "var(--font-display)", fontWeight: 700,
              fontSize: "clamp(40px, 5.5vw, 80px)", lineHeight: 0.95,
              letterSpacing: "-2px", color: "white", margin: 0,
            }}>
              Africa's #1<br />
              <span style={{ color: "var(--gold)", fontStyle: "italic" }}>Maritime</span><br />
              Media Brand.
            </h2>
          </div>

          <div style={{
            opacity: missionVis ? 1 : 0, transform: missionVis ? "none" : "translateY(24px)",
            transition: "opacity 0.8s 0.2s, transform 0.8s 0.2s",
          }}>
            <p style={{
              fontSize: "16px", lineHeight: 1.9, color: "rgba(214,207,194,0.6)", fontWeight: 300,
              marginBottom: "32px", maxWidth: "420px",
              borderLeft: "2px solid rgba(196,164,78,0.3)", paddingLeft: "24px",
            }}>
              A 360° maritime media and industry network built for the African community and Diaspora. Through insight-sharing, community engagement and digital media, we amplify African maritime culture and bring the voices of the Diaspora into the heart of the continent's blue economy conversation.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {[
                { label: "Creative Agency", to: "/creative-agency", desc: "Strategy, campaigns & culture" },
                { label: "Afrocean", to: "/afrocean", desc: "Diaspora maritime gatherings" },
                { label: "Anchorage", to: "/anchorage", desc: "Centralized maritime media hub" },
              ].map((item) => (
                <Link key={item.to} to={item.to} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "18px 0", borderBottom: "1px solid rgba(255,255,255,0.07)",
                  textDecoration: "none", transition: "padding-left 0.3s", gap: "16px",
                }}
                  onMouseEnter={e => e.currentTarget.style.paddingLeft = "8px"}
                  onMouseLeave={e => e.currentTarget.style.paddingLeft = "0"}
                >
                  <div>
                    <span style={{ display: "block", fontSize: "14px", fontWeight: 500, color: "white" }}>{item.label}</span>
                    <span style={{ display: "block", fontSize: "12px", color: "rgba(138,158,165,0.5)", marginTop: "2px", fontFamily: "var(--font-display)", fontStyle: "italic" }}>{item.desc}</span>
                  </div>
                  <span style={{ color: "rgba(196,164,78,0.5)", fontSize: "18px", flexShrink: 0 }}>→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ LATEST EVENTS ═══ */}
      <section ref={epRef} style={{
        background: "var(--dark-alt)", padding: "120px 5vw",
        borderTop: "1px solid rgba(196,164,78,0.1)",
      }}>
        <div style={{ maxWidth: "1300px", margin: "0 auto" }}>
          <div style={{
            display: "flex", alignItems: "flex-end", justifyContent: "space-between",
            flexWrap: "wrap", gap: "20px", marginBottom: "64px",
            opacity: epVis ? 1 : 0, transform: epVis ? "none" : "translateY(16px)",
            transition: "opacity 0.6s, transform 0.6s",
          }}>
            <div>
              <span style={{ fontSize: "10px", letterSpacing: "4px", color: "var(--teal)", display: "block", marginBottom: "14px" }}>LATEST EVENTS</span>
              <h2 style={{
                fontFamily: "var(--font-display)", fontWeight: 700, fontStyle: "italic",
                fontSize: "clamp(32px, 4vw, 56px)", color: "var(--cream)", lineHeight: 1, margin: 0,
              }}>Where culture meets the ocean.</h2>
            </div>
            <Link to="/episodes" style={{
              fontSize: "10px", letterSpacing: "2.5px", fontWeight: 600,
              color: "rgba(214,207,194,0.35)", textDecoration: "none",
              borderBottom: "1px solid rgba(196,164,78,0.2)", paddingBottom: "3px",
              transition: "color 0.2s", flexShrink: 0,
            }}
              onMouseEnter={e => e.currentTarget.style.color = "var(--gold)"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(214,207,194,0.35)"}
            >ALL EPISODES →</Link>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "28px" }}>
            <EventCard name="Afrocean" tag="GATHERING" tagColor="gold"
              description="A dynamic and inclusive gathering that unites individuals of the African Diaspora, fostering a deep connection with their maritime heritage through cultural exchange, knowledge-sharing, and networking."
              image="https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=800&q=80"
              to="/afrocean" index={0} visible={epVis} />
            <EventCard name="Anchorage" tag="MEDIA HUB" tagColor="teal"
              description="A centralized media hub combined with in-person and digital experiences. We curate personalized recommendations tailored to your interests, reshaping the way we explore the maritime world."
              image="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80"
              to="/anchorage" index={1} visible={epVis} />
          </div>
        </div>
      </section>

      {/* ═══ CREATIVE AGENCY STRIP ═══ */}
      <section ref={agencyRef} style={{
        background: "var(--dark)", borderTop: "3px solid var(--gold)",
        padding: "100px 5vw", position: "relative", overflow: "hidden",
      }}>
        <span style={{
          position: "absolute", right: "4vw", top: "50%", transform: "translateY(-50%)",
          fontFamily: "var(--font-display)", fontSize: "clamp(160px, 20vw, 280px)",
          fontWeight: 700, color: "rgba(196,164,78,0.04)", lineHeight: 1,
          userSelect: "none", pointerEvents: "none", letterSpacing: "-8px",
        }}>360°</span>

        <div style={{ maxWidth: "1300px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
            <div style={{
              opacity: agencyVis ? 1 : 0, transform: agencyVis ? "none" : "translateX(-24px)",
              transition: "opacity 0.8s, transform 0.8s",
            }}>
              <span style={{ fontSize: "10px", letterSpacing: "4px", color: "var(--teal)", display: "block", marginBottom: "20px" }}>OUR SERVICES</span>
              <h2 style={{
                fontFamily: "var(--font-display)", fontWeight: 700,
                fontSize: "clamp(32px, 4vw, 56px)", lineHeight: 1.05,
                color: "white", marginBottom: "24px", letterSpacing: "-1px",
              }}>Connect your brand to African maritime culture.</h2>
              <p style={{
                fontSize: "15px", lineHeight: 1.85, color: "rgba(214,207,194,0.55)",
                fontWeight: 300, maxWidth: "400px", marginBottom: "36px",
              }}>
                Strategy, creativity, and immersive experiences — designed to deliver measurable impact for brands, businesses, and leaders in the blue economy space.
              </p>
              <Link to="/creative-agency" style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                padding: "13px 32px", background: "var(--gold)", color: "var(--dark)",
                textDecoration: "none", fontSize: "10px", letterSpacing: "3px",
                fontWeight: 700, borderRadius: "2px", transition: "opacity 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}
              >EXPLORE SERVICES <span style={{ fontSize: "14px" }}>→</span></Link>
            </div>

            <div style={{
              opacity: agencyVis ? 1 : 0, transform: agencyVis ? "none" : "translateX(24px)",
              transition: "opacity 0.8s 0.2s, transform 0.8s 0.2s",
              display: "flex", flexDirection: "column",
            }}>
              {[
                { num: "01", title: "Context", body: "Deep audience insight and strategic analysis." },
                { num: "02", title: "Create", body: "Campaigns that authentically reflect African maritime culture." },
                { num: "03", title: "Amplify", body: "Measurable outcomes that expand your reach and deepen community connections." },
              ].map((s) => (
                <div key={s.num} style={{
                  display: "grid", gridTemplateColumns: "48px 1fr", gap: "24px",
                  padding: "28px 0", borderBottom: "1px solid rgba(255,255,255,0.06)",
                  alignItems: "start",
                }}>
                  <span style={{ fontSize: "11px", letterSpacing: "2px", color: "rgba(196,164,78,0.4)", paddingTop: "3px" }}>{s.num}</span>
                  <div>
                    <span style={{ display: "block", fontSize: "15px", fontWeight: 600, color: "white", marginBottom: "6px" }}>{s.title}</span>
                    <span style={{ display: "block", fontSize: "13px", color: "rgba(214,207,194,0.45)", lineHeight: 1.7, fontWeight: 300 }}>{s.body}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PARTNERS ═══ */}
      <section ref={sponsorRef} style={{
        background: "rgba(44,140,124,0.06)", borderTop: "1px solid rgba(196,164,78,0.12)",
        padding: "100px 5vw", position: "relative", overflow: "hidden",
      }}>
        <div style={{ maxWidth: "1300px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
            <div style={{
              opacity: sponsorVis ? 1 : 0, transform: sponsorVis ? "none" : "translateY(20px)",
              transition: "opacity 0.7s, transform 0.7s",
            }}>
              <span style={{ fontSize: "10px", letterSpacing: "4px", color: "var(--teal)", display: "block", marginBottom: "20px" }}>OUR PARTNERS</span>
              <h2 style={{
                fontFamily: "var(--font-display)", fontWeight: 700, fontStyle: "italic",
                fontSize: "clamp(28px, 3.5vw, 48px)", color: "var(--cream)",
                lineHeight: 1.05, marginBottom: "20px", letterSpacing: "-1px",
              }}>Brewed with intention.<br />Backed by purpose.</h2>
              <p style={{
                fontSize: "15px", lineHeight: 1.85, color: "rgba(214,207,194,0.5)",
                fontWeight: 300, maxWidth: "380px",
              }}>
                We partner exclusively with brands who share our values — sustainability, storytelling, and the sea.
              </p>
            </div>

            <div style={{
              opacity: sponsorVis ? 1 : 0, transform: sponsorVis ? "none" : "translateY(20px)",
              transition: "opacity 0.7s 0.2s, transform 0.7s 0.2s",
              display: "flex", flexDirection: "column", gap: "16px",
            }}>
              {[
                { title: "Cultural Authority", body: "The leading voice in Africa's maritime industry culture." },
                { title: "Network Access", body: "Direct connections to experts, industries, and business leaders." },
                { title: "Strategic Impact", body: "Campaigns and experiences with measurable ROI." },
              ].map((p) => (
                <div key={p.title} style={{
                  display: "flex", gap: "20px", alignItems: "flex-start",
                  padding: "20px 24px", border: "1px solid rgba(196,164,78,0.1)",
                  borderRadius: "2px", background: "rgba(21,42,47,0.4)",
                }}>
                  <div style={{
                    width: "6px", height: "6px", borderRadius: "50%",
                    background: "var(--gold)", flexShrink: 0, marginTop: "6px",
                  }} />
                  <div>
                    <span style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "white", letterSpacing: "1px", marginBottom: "5px" }}>{p.title}</span>
                    <span style={{ display: "block", fontSize: "13px", color: "rgba(214,207,194,0.45)", lineHeight: 1.65, fontWeight: 300 }}>{p.body}</span>
                  </div>
                </div>
              ))}
              <Link to="/partner" style={{
                display: "inline-block", padding: "13px 32px",
                border: "1px solid var(--gold)", color: "var(--gold)",
                textDecoration: "none", fontSize: "10px", letterSpacing: "3px",
                fontWeight: 700, borderRadius: "2px",
                transition: "background 0.2s, color 0.2s", alignSelf: "flex-start",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "var(--gold)"; e.currentTarget.style.color = "var(--dark)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--gold)"; }}
              >BECOME A PARTNER</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section ref={ctaRef} style={{
        position: "relative", overflow: "hidden",
        minHeight: "480px", display: "flex", alignItems: "center",
      }}>
        <img src="https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1600&q=80"
          alt="Accra coastline"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, rgba(21,42,47,0.95) 40%, rgba(30,107,95,0.75) 100%)" }} />
        <div className="ct-grain" style={{ zIndex: 1 }} />

        <div style={{
          position: "relative", zIndex: 2, padding: "80px 5vw", maxWidth: "700px",
          opacity: ctaVis ? 1 : 0, transform: ctaVis ? "none" : "translateY(20px)",
          transition: "opacity 0.8s, transform 0.8s",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "28px" }}>
            <div style={{ width: "32px", height: "1px", background: "var(--gold)" }} />
            <span style={{ fontSize: "10px", letterSpacing: "4px", color: "var(--gold)" }}>ACCRA, GHANA</span>
          </div>
          <h2 style={{
            fontFamily: "var(--font-display)", fontWeight: 700,
            fontSize: "clamp(32px, 5vw, 68px)", lineHeight: 0.95,
            letterSpacing: "-2px", color: "white", marginBottom: "28px",
          }}>
            Recorded live.<br />
            <span style={{ color: "var(--gold)", fontStyle: "italic" }}>Heard everywhere.</span>
          </h2>
          <p style={{
            fontSize: "15px", lineHeight: 1.85, color: "rgba(214,207,194,0.6)",
            fontWeight: 300, maxWidth: "400px", marginBottom: "40px",
          }}>
            New episodes released on YouTube, Spotify, and Apple Podcasts. Subscribe wherever you listen.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link to="/episodes" style={{
              display: "inline-block", padding: "13px 32px",
              background: "var(--gold)", color: "var(--dark)",
              textDecoration: "none", fontSize: "10px", letterSpacing: "3px",
              fontWeight: 700, borderRadius: "2px", transition: "opacity 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >EXPLORE EPISODES</Link>
            <Link to="/shop" style={{
              display: "inline-block", padding: "13px 32px",
              border: "1px solid rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.7)",
              textDecoration: "none", fontSize: "10px", letterSpacing: "3px",
              fontWeight: 600, borderRadius: "2px", transition: "border-color 0.2s, color 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)"; e.currentTarget.style.color = "white"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
            >VISIT SHOP</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
