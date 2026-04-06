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

/* ── Palette — cold, strategic, editorial ── */
const NAVY   = "#0A0F1C";
const SLATE  = "#111827";
const MID    = "#1C2537";
const STEEL  = "#2D3A52";
const DIM    = "rgba(255,255,255,0.1)";
const MUTED  = "rgba(255,255,255,0.45)";
const BODY   = "rgba(255,255,255,0.68)";
const SIGNAL = "#C1272D";

/* ── Six strategic themes — exact content from document ── */
const WAVES = [
  {
    num: "01",
    title: "Maritime Sovereignty & Blue Security",
    body: "Africa's 38 coastal and island states collectively control over 13 million square kilometres of ocean, yet limited surveillance and enforcement capacity has created a persistent sovereignty gap that enables threats such as illegal fishing, maritime crime, and external interference. The continent is beginning to close this gap through AI-powered surveillance systems, drones, autonomous vessels, and integrated satellite data.",
    stat: "13M km²", statLabel: "Ocean under African jurisdiction",
  },
  {
    num: "02",
    title: "Industrial Capacity & Ocean Manufacturing",
    body: "Africa's blue economy remains heavily dependent on imported vessels, marine equipment, and offshore infrastructure. In response, Ghana, Nigeria, South Africa, and Kenya are investing in local shipbuilding, marine fabrication, and equipment production — enabling fisheries, ports, and offshore energy sectors to operate with greater resilience.",
    stat: "$300B", statLabel: "Blue economy annual value",
  },
  {
    num: "03",
    title: "Supply Chain Sovereignty",
    body: "With around 90 percent of Africa's trade moving by sea, the continent is highly exposed to disruptions in global shipping routes. Real-time maritime tracking platforms, satellite connectivity, and digital customs systems are enhancing visibility and efficiency. Intra-African maritime trade corridors under AfCFTA are gradually reducing dependence on external routes.",
    stat: "90%", statLabel: "Of Africa's trade moves by sea",
  },
  {
    num: "04",
    title: "Energy Security & the Blue Economy",
    body: "Africa's offshore energy resources — spanning oil, gas, and vast renewable potential — coexist with widespread energy insecurity. The strategic pathway forward lies in offshore wind, blue hydrogen, floating solar, and tidal technologies, enabling energy security and sustainable blue economy growth.",
    stat: "$600B", statLabel: "Projected blue economy value by 2030",
  },
  {
    num: "05",
    title: "Blue Foods & Ocean Nutrition Security",
    body: "Blue foods — fish, shellfish, and aquatic plants — are central to Africa's food systems. The sector faces pressure from illegal fishing, post-harvest losses, and weak cold-chain infrastructure. Scaling sustainable aquaculture, improving fisheries governance, and leveraging digital traceability can significantly boost productivity and resilience.",
    stat: "$2B", statLabel: "Annual piracy cost in Gulf of Guinea",
  },
  {
    num: "06",
    title: "Technology & Innovation",
    body: "Sovereign ocean surveillance, AI-powered fisheries monitoring, indigenous undersea cable infrastructure, blue carbon markets, and ocean-based food systems are strategic necessities. Approximately 95 percent of Africa's international internet traffic travels through undersea cables passing through contested maritime zones.",
    stat: "95%", statLabel: "Of Africa's internet travels undersea",
  },
];

const CATEGORIES = [
  "All", "Security & Governance", "Trade & Infrastructure",
  "Food & Energy", "Technology & Innovation", "Sustainability & Climate", "People & Skills",
];

export default function AfricaOceanDynamism() {
  const [heroRef,    heroVis]    = useReveal(0.05);
  const [beliefRef,  beliefVis]  = useReveal(0.08);
  const [stakesRef,  stakesVis]  = useReveal(0.08);
  const [waveRef,    waveVis]    = useReveal(0.06);
  const [emailRef,   emailVis]   = useReveal(0.1);
  const [activeWave, setActiveWave]       = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [email, setEmail] = useState("");

  return (
    <div style={{ minHeight: "100vh", background: NAVY, color: "white", overflowX: "hidden" }}>
      <Navbar />

      {/* ══════════════════════════════════════════════
          HERO — image + editorial data strip below
      ══════════════════════════════════════════════ */}
      <section ref={heroRef} style={{
        minHeight: "100vh", position: "relative", overflow: "hidden",
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
      }}>
        {/* Hero image */}
        <img
          src="/maritimetech1.png"
          alt="Africa Ocean Dynamism"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(10,15,28,1) 0%, rgba(10,15,28,0.75) 50%, rgba(10,15,28,0.35) 100%)",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, rgba(10,15,28,0.8) 0%, transparent 60%)",
        }} />
        <div className="ct-grain" style={{ zIndex: 1 }} />

        {/* Live dot */}
        <div style={{
          position: "absolute", top: "88px", right: "5vw", zIndex: 2,
          display: "flex", alignItems: "center", gap: "8px",
          opacity: heroVis ? 1 : 0, transition: "opacity 0.6s 0.5s",
        }}>
          <div style={{
            width: "6px", height: "6px", borderRadius: "50%",
            background: SIGNAL, boxShadow: `0 0 10px ${SIGNAL}`,
            animation: "aod-pulse 2s ease-in-out infinite",
          }} />
          <span style={{ fontSize: "9px", letterSpacing: "3px", color: MUTED }}>LIVE · 2030 SCENARIO</span>
        </div>

        <div style={{ position: "relative", zIndex: 2, padding: "0 5vw 0" }}>
          {/* Eyebrow */}
          <div style={{
            display: "flex", alignItems: "center", gap: "14px", marginBottom: "20px",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(10px)",
            transition: "opacity 0.6s 0.1s, transform 0.6s 0.1s",
          }}>
            <div style={{ width: "20px", height: "2px", background: SIGNAL }} />
            <span style={{ fontSize: "10px", letterSpacing: "4px", color: SIGNAL, fontWeight: 600 }}>
              CABIN TEA · AFRICA OCEAN DYNAMISM
            </span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontWeight: 700,
            fontSize: "clamp(36px, 5.5vw, 72px)",
            lineHeight: 1.05, color: "white",
            margin: "0 0 12px", maxWidth: "700px",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(20px)",
            transition: "opacity 0.7s 0.18s, transform 0.7s 0.18s",
          }}>
            Africa Ocean Dynamism
          </h1>

          <p style={{
            fontSize: "17px", color: BODY, lineHeight: 1.7,
            fontWeight: 300, maxWidth: "520px", marginBottom: "48px",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(14px)",
            transition: "opacity 0.7s 0.28s, transform 0.7s 0.28s",
          }}>
            A conviction that the founders building solutions to Africa's ocean and maritime challenges deserve serious, sustained investment.
          </p>

          {/* Data strip */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
            borderTop: `1px solid ${DIM}`,
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(16px)",
            transition: "opacity 0.7s 0.4s, transform 0.7s 0.4s",
          }}>
            {[
              { val: "38",      label: "Coastal & island states"            },
              { val: "40,000+", label: "Kilometres of coastline"            },
              { val: "90%",     label: "Global trade passes Africa's waters" },
              { val: "$300B",   label: "Annual blue economy value"          },
            ].map((d, i) => (
              <div key={i} style={{
                padding: "24px 0 40px 24px",
                borderLeft: i > 0 ? `1px solid ${DIM}` : "none",
              }}>
                <span style={{
                  fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 700,
                  color: "white", display: "block", lineHeight: 1,
                }}>{d.val}</span>
                <span style={{ fontSize: "10px", letterSpacing: "1.5px", color: MUTED, display: "block", marginTop: "6px" }}>
                  {d.label.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @keyframes aod-pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.4; transform: scale(0.7); }
          }
        `}</style>
      </section>

      {/* ══════════════════════════════════════════════
          WHAT WE BELIEVE + THE AGENDA — combined,
          two-column editorial layout
      ══════════════════════════════════════════════ */}
      <section ref={beliefRef} style={{ background: SLATE, padding: "96px 5vw" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ height: "1px", background: DIM, marginBottom: "48px" }} />

          <div style={{
            display: "grid", gridTemplateColumns: "200px 1fr",
            gap: "64px",
            opacity: beliefVis ? 1 : 0, transform: beliefVis ? "none" : "translateY(16px)",
            transition: "opacity 0.7s, transform 0.7s",
          }}>
            {/* Left label */}
            <div>
              <span style={{ fontSize: "9px", letterSpacing: "3px", color: MUTED, display: "block", marginBottom: "12px" }}>
                WHAT WE BELIEVE
              </span>
              <div style={{ width: "20px", height: "2px", background: SIGNAL }} />
            </div>

            {/* Right content */}
            <div>
              <p style={{
                fontSize: "clamp(18px, 2.2vw, 24px)", lineHeight: 1.55,
                color: "white", fontWeight: 400, marginBottom: "28px",
              }}>
                At the heart of Africa Ocean Dynamism is a conviction: that the founders building solutions to Africa's ocean and maritime challenges deserve serious, sustained investment.
              </p>
              <p style={{ fontSize: "15px", lineHeight: 1.9, color: BODY, fontWeight: 300, marginBottom: "16px", maxWidth: "680px" }}>
                We amplify companies working at the intersection of economic opportunity and continental responsibility, across food systems, human security, environmental stewardship, and ocean-based growth. The founders we believe in are driven by problems that matter, and they understand that governments — whether as clients, rivals, or essential partners — are inseparable from the work of building a thriving ocean economy.
              </p>
              <p style={{ fontSize: "15px", lineHeight: 1.9, color: BODY, fontWeight: 300, maxWidth: "680px" }}>
                Progress of this kind does not sustain itself. It requires capital, conviction, and a willingness to back founders who are thinking not in quarters but in generations. That is the investment we are making.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          THE STAKES — It is 2030.
          Two column: narrative left, data right
      ══════════════════════════════════════════════ */}
      <section ref={stakesRef} style={{ background: NAVY, padding: "96px 5vw" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

          {/* Header */}
          <div style={{
            marginBottom: "64px",
            opacity: stakesVis ? 1 : 0, transform: stakesVis ? "none" : "translateY(12px)",
            transition: "opacity 0.6s, transform 0.6s",
          }}>
            <div style={{ height: "1px", background: `rgba(193,39,45,0.4)`, marginBottom: "24px" }} />
            <div style={{ display: "flex", alignItems: "baseline", gap: "20px" }}>
              <span style={{ fontSize: "9px", letterSpacing: "3px", color: SIGNAL, fontWeight: 600 }}>THE STAKES</span>
              <h2 style={{
                fontWeight: 700, fontSize: "clamp(28px, 4vw, 52px)",
                color: "white", lineHeight: 1.05, margin: 0,
              }}>It is 2030.</h2>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "72px", alignItems: "start" }}>

            {/* Left — narrative, trimmed to essentials */}
            <div style={{
              opacity: stakesVis ? 1 : 0, transform: stakesVis ? "none" : "translateX(-16px)",
              transition: "opacity 0.8s 0.1s, transform 0.8s 0.1s",
            }}>
              <p style={{ fontSize: "17px", lineHeight: 1.75, color: "white", fontWeight: 400, marginBottom: "24px" }}>
                The world is on edge — and Africa's coastlines are no longer peripheral to what happens next.
              </p>
              <p style={{ fontSize: "15px", lineHeight: 1.9, color: BODY, fontWeight: 300, marginBottom: "24px" }}>
                Africa has 38 coastal and island states bordering three of the world's most strategically significant bodies of water — the Atlantic Ocean, the Indian Ocean, and the Red Sea — through which an estimated 90 percent of global trade passes by volume. When the world's maritime order fractures, Africa does not simply observe the crisis. It absorbs it.
              </p>

              <div style={{ height: "1px", background: DIM, margin: "32px 0" }} />
              <p style={{ fontSize: "9px", letterSpacing: "3px", color: MUTED, marginBottom: "16px" }}>THE VULNERABILITY</p>
              <p style={{ fontSize: "15px", lineHeight: 1.9, color: BODY, fontWeight: 300, marginBottom: "24px" }}>
                Africa imports the majority of its wheat through the Red Sea and the Suez Canal corridor. Houthi attacks on commercial shipping offered a preview of what disruption to that corridor costs: freight rates surged, rerouting added weeks in fuel costs, and food import-dependent nations faced renewed inflationary pressure. Africa's blue economy — currently $300 billion annually and projected to double by 2030 — is structurally exposed to exactly these external shocks.
              </p>

              <div style={{ height: "1px", background: DIM, margin: "32px 0" }} />
              <p style={{ fontSize: "9px", letterSpacing: "3px", color: MUTED, marginBottom: "16px" }}>THE ARGUMENT</p>
              <p style={{ fontSize: "15px", lineHeight: 1.9, color: BODY, fontWeight: 300, marginBottom: "24px" }}>
                The founders doing this work exist. They are building across Lagos, Mombasa, Dakar, Cape Town, Accra, and Maputo — tracking illegal fishing fleets, decarbonising port operations, digitising customs corridors, and feeding coastal populations from ocean systems that are more productive and more sustainable than those they are replacing.
              </p>

              {/* Closing callout */}
              <div style={{
                padding: "28px 32px",
                background: MID, borderLeft: `3px solid ${SIGNAL}`,
                marginTop: "8px",
              }}>
                <p style={{ fontSize: "16px", lineHeight: 1.6, color: "white", margin: 0 }}>
                  That is the investment Africa Ocean Dynamism is making. And the moment for it has never been more urgent.
                </p>
              </div>
            </div>

            {/* Right — stat column */}
            <div style={{
              display: "flex", flexDirection: "column", gap: "32px",
              position: "sticky", top: "80px",
              opacity: stakesVis ? 1 : 0, transform: stakesVis ? "none" : "translateX(16px)",
              transition: "opacity 0.8s 0.25s, transform 0.8s 0.25s",
            }}>
              {[
                { val: "$300B",    label: "Blue economy annual value",        sub: "Projected to double to $600B by 2030"              },
                { val: "95%",      label: "Internet via undersea cable",       sub: "Through contested maritime zones"                  },
                { val: "$2B",      label: "Annual piracy cost",               sub: "Gulf of Guinea — Stable Seas"                      },
                { val: "40,000km", label: "African coastline",                sub: "Atlantic, Indian Ocean, and Red Sea"               },
              ].map((s, i) => (
                <div key={i}>
                  {i > 0 && <div style={{ height: "1px", background: DIM, marginBottom: "32px" }} />}
                  <div style={{ borderLeft: `3px solid ${SIGNAL}`, paddingLeft: "18px" }}>
                    <span style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, color: "white", display: "block", lineHeight: 1 }}>{s.val}</span>
                    <span style={{ fontSize: "10px", letterSpacing: "1.5px", color: SIGNAL, display: "block", marginTop: "6px", fontWeight: 600 }}>{s.label.toUpperCase()}</span>
                    {s.sub && <span style={{ fontSize: "12px", color: MUTED, display: "block", marginTop: "4px", lineHeight: 1.5 }}>{s.sub}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SIX STRATEGIC THEMES — accordion
      ══════════════════════════════════════════════ */}
      <section ref={waveRef} style={{ background: SLATE, padding: "96px 5vw" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

          <div style={{
            marginBottom: "48px",
            opacity: waveVis ? 1 : 0, transform: waveVis ? "none" : "translateY(12px)",
            transition: "opacity 0.6s, transform 0.6s",
          }}>
            <div style={{ height: "1px", background: DIM, marginBottom: "28px" }} />
            <span style={{ fontSize: "9px", letterSpacing: "3px", color: SIGNAL, display: "block", marginBottom: "10px", fontWeight: 600 }}>
              THE NEXT BIG WAVE
            </span>
            <h2 style={{
              fontWeight: 700, fontSize: "clamp(22px, 3vw, 36px)",
              color: "white", margin: "0 0 6px", lineHeight: 1.2,
            }}>Six Strategic Themes</h2>
            <p style={{ fontSize: "14px", color: MUTED, fontWeight: 300, margin: 0 }}>
              Africa Ocean Dynamism 20: Race to Sustainability
            </p>
          </div>

          {/* Category filter */}
          <div style={{
            display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "40px",
            opacity: waveVis ? 1 : 0, transition: "opacity 0.6s 0.1s",
          }}>
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                padding: "7px 16px",
                background: activeCategory === cat ? SIGNAL : "transparent",
                border: `1px solid ${activeCategory === cat ? SIGNAL : DIM}`,
                color: activeCategory === cat ? "white" : MUTED,
                fontSize: "10px", letterSpacing: "1.5px", fontWeight: 600,
                cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s",
              }}
                onMouseEnter={e => { if (activeCategory !== cat) { e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; e.currentTarget.style.color = "white"; }}}
                onMouseLeave={e => { if (activeCategory !== cat) { e.currentTarget.style.borderColor = DIM; e.currentTarget.style.color = MUTED; }}}
              >{cat}</button>
            ))}
          </div>

          {/* Accordion */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {WAVES.map((wave, i) => {
              const isOpen = activeWave === i;
              return (
                <div key={wave.num} style={{
                  borderTop: `1px solid ${DIM}`,
                  opacity: waveVis ? 1 : 0,
                  transition: `opacity 0.5s ${0.05 + i * 0.07}s`,
                }}>
                  <button onClick={() => setActiveWave(isOpen ? null : i)} style={{
                    width: "100%", background: "none", border: "none",
                    cursor: "pointer", textAlign: "left", padding: "24px 0",
                    display: "grid", gridTemplateColumns: "48px 1fr 100px 32px",
                    gap: "28px", alignItems: "center", fontFamily: "inherit",
                  }}>
                    <span style={{ fontSize: "12px", letterSpacing: "2px", color: isOpen ? SIGNAL : MUTED }}>{wave.num}</span>
                    <span style={{
                      fontWeight: 600, fontSize: "clamp(15px, 1.8vw, 19px)",
                      color: isOpen ? "white" : "rgba(255,255,255,0.75)",
                      transition: "color 0.2s",
                    }}>{wave.title}</span>
                    <span style={{
                      fontWeight: 700, fontSize: "16px",
                      color: isOpen ? SIGNAL : MUTED, textAlign: "right", transition: "color 0.2s",
                    }}>{wave.stat}</span>
                    <span style={{
                      color: isOpen ? SIGNAL : MUTED, fontSize: "18px",
                      textAlign: "right", display: "block",
                      transform: isOpen ? "rotate(45deg)" : "none",
                      transition: "transform 0.3s, color 0.2s",
                    }}>+</span>
                  </button>

                  <div style={{
                    overflow: "hidden",
                    maxHeight: isOpen ? "320px" : "0",
                    transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1)",
                  }}>
                    <div style={{
                      display: "grid", gridTemplateColumns: "48px 1fr 120px",
                      gap: "28px", paddingBottom: "28px", alignItems: "start",
                    }}>
                      <div />
                      <p style={{ fontSize: "15px", lineHeight: 1.85, color: BODY, fontWeight: 300, margin: 0 }}>
                        {wave.body}
                      </p>
                      <div style={{ textAlign: "right" }}>
                        <span style={{ fontSize: "28px", fontWeight: 700, color: "rgba(193,39,45,0.18)", display: "block", lineHeight: 1 }}>{wave.stat}</span>
                        <span style={{ fontSize: "9px", letterSpacing: "1.5px", color: MUTED, display: "block", marginTop: "4px" }}>{wave.statLabel.toUpperCase()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div style={{ height: "1px", background: DIM }} />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          NEWSLETTER SIGNUP
      ══════════════════════════════════════════════ */}
      <section ref={emailRef} style={{ background: MID, padding: "96px 5vw" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ height: "1px", background: DIM, marginBottom: "48px" }} />
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: "80px", alignItems: "center",
            opacity: emailVis ? 1 : 0, transform: emailVis ? "none" : "translateY(16px)",
            transition: "opacity 0.7s, transform 0.7s",
          }}>
            <div>
              <span style={{ fontSize: "9px", letterSpacing: "3px", color: SIGNAL, display: "block", marginBottom: "16px", fontWeight: 600 }}>
                AFRICA OCEAN DYNAMISM STARTS WITH PEOPLE
              </span>
              <h2 style={{
                fontWeight: 700, fontSize: "clamp(20px, 2.8vw, 36px)",
                color: "white", lineHeight: 1.2, marginBottom: "16px",
              }}>
                The ideas, companies, and individuals building toward a more sustainable future.
              </h2>
              <p style={{ fontSize: "15px", lineHeight: 1.8, color: MUTED, fontWeight: 300, margin: 0 }}>
                Sign up for our Africa Ocean Dynamism newsletter to get the Cabin Tea take on the ocean economy.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{
                  width: "100%", padding: "15px 18px",
                  background: STEEL, border: `1px solid ${DIM}`,
                  color: "white", fontSize: "14px",
                  fontFamily: "inherit", outline: "none",
                  boxSizing: "border-box", transition: "border-color 0.2s",
                }}
                onFocus={e => e.target.style.borderColor = "rgba(255,255,255,0.4)"}
                onBlur={e => e.target.style.borderColor = DIM}
              />
              <button
                onClick={() => { if (email) { alert("Thank you for signing up."); setEmail(""); }}}
                style={{
                  padding: "15px 28px", background: SIGNAL, color: "white",
                  border: "none", cursor: "pointer",
                  fontSize: "10px", letterSpacing: "3px", fontWeight: 700,
                  fontFamily: "inherit", transition: "opacity 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}
              >
                SUBSCRIBE TO THE NEWSLETTER
              </button>
              <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.2)", margin: 0 }}>
                We respect your privacy. No spam, ever.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
