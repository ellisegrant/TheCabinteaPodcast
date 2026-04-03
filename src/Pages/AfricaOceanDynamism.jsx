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

/* ─────────────────────────────────────────────
   PALETTE — cold, strategic, editorial
   Deep navy / slate / signal red / white
   Nothing warm. This is geopolitics.
───────────────────────────────────────────── */
const NAVY   = "#0A0F1C";
const SLATE  = "#111827";
const MID    = "#1C2537";
const STEEL  = "#2D3A52";
const DIM    = "rgba(255,255,255,0.12)";
const MUTED  = "rgba(255,255,255,0.45)";
const BODY   = "rgba(255,255,255,0.68)";
const WHITE  = "#FFFFFF";
const SIGNAL = "#C1272D";   /* signal red — urgency, stakes */
const ACCENT = "#4A7FC1";   /* ocean blue — data, links     */

/* ─────────────────────────────────────────────
   GRID LINE — editorial newspaper column rule
───────────────────────────────────────────── */
function Rule({ color = DIM, my = "0" }) {
  return <div style={{ height: "1px", background: color, margin: `${my} 0` }} />;
}

/* ─────────────────────────────────────────────
   STAT CALLOUT — data journalism treatment
───────────────────────────────────────────── */
function Stat({ value, label, sub }) {
  return (
    <div style={{
      borderLeft: `3px solid ${SIGNAL}`,
      paddingLeft: "20px",
    }}>
      <span style={{
        fontFamily: "var(--font-display)", fontWeight: 700,
        fontSize: "clamp(36px, 5vw, 64px)", color: WHITE,
        display: "block", lineHeight: 1, letterSpacing: "-2px",
      }}>{value}</span>
      <span style={{ fontSize: "11px", letterSpacing: "2px", color: SIGNAL, display: "block", marginTop: "6px", fontWeight: 600 }}>{label}</span>
      {sub && <span style={{ fontSize: "12px", color: MUTED, display: "block", marginTop: "4px", lineHeight: 1.5 }}>{sub}</span>}
    </div>
  );
}

/* ─────────────────────────────────────────────
   WAVE ITEMS — the six strategic categories
───────────────────────────────────────────── */
const WAVES = [
  {
    num: "01",
    title: "Maritime Sovereignty & Blue Security",
    body: "Africa's 38 coastal and island states collectively control over 13 million square kilometres of ocean, yet limited surveillance and enforcement capacity has created a persistent sovereignty gap that enables threats such as illegal fishing, maritime crime, and external interference. As global maritime instability intensifies — from Indo-Pacific tensions to Red Sea disruptions — this vulnerability carries immediate economic and security consequences. However, the continent is beginning to close this gap through the deployment of AI-powered surveillance systems, drones, autonomous vessels, and integrated satellite data, particularly in hotspots like the Gulf of Guinea and the Horn of Africa.",
    stat: "13M km²",
    statLabel: "Ocean under African jurisdiction",
  },
  {
    num: "02",
    title: "Industrial Capacity & Ocean Manufacturing",
    body: "Africa's blue economy remains heavily dependent on imported vessels, marine equipment, and offshore infrastructure, making it highly vulnerable to global supply chain disruptions and cost shocks. In response, a growing number of countries — including Ghana, Nigeria, South Africa, and Kenya — are investing in local shipbuilding, marine fabrication, and equipment production. Expanding this industrial base is not just an economic opportunity but a strategic necessity, enabling fisheries, ports, and offshore energy sectors to operate with greater resilience and autonomy even during global disruptions.",
    stat: "$300B",
    statLabel: "Blue economy annual value",
  },
  {
    num: "03",
    title: "Supply Chain Sovereignty",
    body: "With around 90 percent of Africa's trade moving by sea, the continent is highly exposed to disruptions in global shipping routes such as the Suez Canal and the Cape of Good Hope. Digital and technological solutions are improving supply chain resilience: real-time maritime tracking platforms, satellite connectivity, and digital customs systems are enhancing visibility, coordination, and efficiency across ports and logistics networks. The development of intra-African maritime trade corridors under the African Continental Free Trade Area is gradually reducing dependence on external routes.",
    stat: "90%",
    statLabel: "Of Africa's trade moves by sea",
  },
  {
    num: "04",
    title: "Energy Security & the Blue Economy",
    body: "Africa's offshore energy resources — spanning oil, gas, and vast renewable potential — coexist with widespread energy insecurity among coastal populations, creating both a challenge and an opportunity. Global energy disruptions can simultaneously raise fuel import costs and threaten export revenues, exposing structural weaknesses in the continent's energy systems. The strategic pathway forward lies in accelerating the development of decentralized, ocean-based energy solutions, including offshore wind, blue hydrogen, floating solar, and emerging tidal and wave technologies.",
    stat: "$600B",
    statLabel: "Projected blue economy value by 2030",
  },
  {
    num: "05",
    title: "Blue Foods & Ocean Nutrition Security",
    body: "Blue foods — fish, shellfish, and aquatic plants — are central to Africa's food systems, providing critical nutrition, livelihoods, and export revenue across coastal and inland communities. The sector is under pressure from illegal, unreported, and unregulated fishing, post-harvest losses, weak cold-chain infrastructure, and limited value addition. As climate change and global supply disruptions threaten terrestrial food systems, blue foods are becoming an increasingly strategic asset for food security. Scaling sustainable aquaculture, improving fisheries governance, and leveraging digital traceability systems can significantly boost productivity and resilience.",
    stat: "$2B",
    statLabel: "Annual piracy cost in Gulf of Guinea",
  },
  {
    num: "06",
    title: "Technology & Innovation",
    body: "Sovereign ocean surveillance capacity, domestically manufactured marine vessels, AI-powered fisheries monitoring, indigenous undersea cable infrastructure, blue carbon markets, and ocean-based food systems are not niche investments. Approximately 95 percent of Africa's international internet traffic travels through undersea cables — cables that pass through contested maritime zones and have already been subject to deliberate interference. In a world where the global maritime order is under strain, these are strategic necessities, not peripheral concerns.",
    stat: "95%",
    statLabel: "Of Africa's internet travels undersea",
  },
];

const CATEGORIES = [
  "All",
  "Security & Governance",
  "Trade & Infrastructure",
  "Food & Energy",
  "Technology & Innovation",
  "Sustainability & Climate",
  "People & Skills",
];

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function AfricaOceanDynamism() {
  const [heroRef,    heroVis]    = useReveal(0.05);
  const [beliefRef,  beliefVis]  = useReveal(0.08);
  const [agendaRef,  agendaVis]  = useReveal(0.08);
  const [stakesRef,  stakesVis]  = useReveal(0.08);
  const [waveRef,    waveVis]    = useReveal(0.06);
  const [emailRef,   emailVis]   = useReveal(0.1);
  const [activeWave, setActiveWave] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [email, setEmail] = useState("");

  return (
    <div style={{ minHeight: "100vh", background: NAVY, color: WHITE, overflowX: "hidden", fontFamily: "var(--font-body, sans-serif)" }}>
      <Navbar />

      {/* ══════════════════════════════════════════════
          HERO — cold, authoritative, geopolitical
          No images. Typography and data only.
          This is a thesis statement, not a festival.
      ══════════════════════════════════════════════ */}
      <section ref={heroRef} style={{
        minHeight: "100vh", position: "relative", overflow: "hidden",
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
        padding: "0 5vw 80px",
        background: NAVY,
      }}>
        {/* Topographic grid lines — strategic map feel */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          {/* Vertical column rules */}
          {[25, 50, 75].map((pct, i) => (
            <div key={i} style={{
              position: "absolute", top: 0, bottom: 0,
              left: `${pct}%`, width: "1px",
              background: `rgba(255,255,255,0.03)`,
            }} />
          ))}
          {/* Horizontal horizon lines */}
          {[20, 40, 60, 80].map((pct, i) => (
            <div key={i} style={{
              position: "absolute", left: 0, right: 0,
              top: `${pct}%`, height: "1px",
              background: `rgba(255,255,255,0.025)`,
            }} />
          ))}
          {/* Signal dot — top right coordinates */}
          <div style={{
            position: "absolute", top: "88px", right: "5vw",
            display: "flex", alignItems: "center", gap: "8px",
          }}>
            <div style={{
              width: "6px", height: "6px", borderRadius: "50%",
              background: SIGNAL,
              boxShadow: `0 0 12px ${SIGNAL}`,
              animation: "pulse 2s ease-in-out infinite",
            }} />
            <span style={{ fontSize: "9px", letterSpacing: "3px", color: MUTED }}>LIVE · 2030 SCENARIO</span>
          </div>
        </div>

        <div style={{ position: "relative", zIndex: 1 }}>
          {/* Issue label */}
          <div style={{
            display: "flex", alignItems: "center", gap: "16px",
            marginBottom: "40px",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(12px)",
            transition: "opacity 0.7s 0.1s, transform 0.7s 0.1s",
          }}>
            <div style={{ width: "24px", height: "2px", background: SIGNAL }} />
            <span style={{ fontSize: "10px", letterSpacing: "4px", color: SIGNAL, fontWeight: 600 }}>
              CABIN TEA · AFRICA OCEAN DYNAMISM
            </span>
          </div>

          {/* Main title — editorial serif weight */}
          <h1 style={{
            fontFamily: "var(--font-display)", fontWeight: 700,
            fontSize: "clamp(52px, 10vw, 140px)",
            lineHeight: 0.88, letterSpacing: "-3px",
            color: WHITE, margin: "0 0 12px 0",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(30px)",
            transition: "opacity 0.8s 0.2s, transform 0.8s 0.2s",
          }}>
            AFRICA OCEAN
          </h1>
          <h1 style={{
            fontFamily: "var(--font-display)", fontWeight: 700, fontStyle: "italic",
            fontSize: "clamp(52px, 10vw, 140px)",
            lineHeight: 0.88, letterSpacing: "-3px",
            color: SIGNAL, marginBottom: "56px",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(30px)",
            transition: "opacity 0.8s 0.3s, transform 0.8s 0.3s",
          }}>
            DYNAMISM
          </h1>

          <Rule color="rgba(255,255,255,0.1)" />

          {/* Bottom data row */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gap: "0", marginTop: "40px",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(16px)",
            transition: "opacity 0.7s 0.45s, transform 0.7s 0.45s",
          }}>
            {[
              { val: "38", label: "Coastal & island states" },
              { val: "40,000+", label: "Kilometres of coastline" },
              { val: "90%", label: "Global trade passes Africa's waters" },
              { val: "$300B", label: "Annual blue economy value" },
            ].map((d, i) => (
              <div key={i} style={{
                padding: "28px 0 28px 24px",
                borderLeft: i > 0 ? `1px solid ${DIM}` : "none",
              }}>
                <span style={{
                  fontFamily: "var(--font-display)", fontWeight: 700,
                  fontSize: "clamp(22px, 3vw, 38px)", color: WHITE,
                  display: "block", lineHeight: 1, letterSpacing: "-1px",
                }}>{d.val}</span>
                <span style={{ fontSize: "10px", letterSpacing: "1.5px", color: MUTED, display: "block", marginTop: "6px" }}>
                  {d.label.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(0.8); }
          }
        `}</style>
      </section>

      {/* ══════════════════════════════════════════════
          WHAT WE BELIEVE — conviction statement
          Left column label / right column body
          Like The Economist's leader section
      ══════════════════════════════════════════════ */}
      <section ref={beliefRef} style={{ background: SLATE, padding: "100px 5vw" }}>
        <div style={{ maxWidth: "1300px", margin: "0 auto" }}>
          <Rule color={DIM} my="0" />
          <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: "80px", paddingTop: "48px" }}>

            {/* Left — section label */}
            <div style={{
              opacity: beliefVis ? 1 : 0, transform: beliefVis ? "none" : "translateX(-16px)",
              transition: "opacity 0.7s, transform 0.7s",
            }}>
              <span style={{ fontSize: "9px", letterSpacing: "3px", color: MUTED, display: "block", marginBottom: "16px" }}>
                WHAT WE BELIEVE
              </span>
              <div style={{ width: "24px", height: "2px", background: SIGNAL }} />
            </div>

            {/* Right — full belief text */}
            <div style={{
              opacity: beliefVis ? 1 : 0, transform: beliefVis ? "none" : "translateY(16px)",
              transition: "opacity 0.7s 0.15s, transform 0.7s 0.15s",
            }}>
              <p style={{
                fontFamily: "var(--font-display)", fontStyle: "italic",
                fontSize: "clamp(20px, 2.5vw, 30px)", lineHeight: 1.5,
                color: WHITE, fontWeight: 400, marginBottom: "32px",
                letterSpacing: "-0.5px",
              }}>
                At the heart of Africa Ocean Dynamism is a conviction: that the founders building solutions to Africa's ocean and maritime challenges deserve serious, sustained investment.
              </p>
              <p style={{ fontSize: "16px", lineHeight: 1.9, color: BODY, fontWeight: 300, marginBottom: "20px", maxWidth: "680px" }}>
                We amplify companies working at the intersection of economic opportunity and continental responsibility, across food systems, human security, environmental stewardship, and ocean-based growth. The founders we believe in are not confined by industry categories or conventional business logic. They are driven by problems that matter, and they understand that governments, whether as clients, rivals, or essential partners, are inseparable from the work of building a thriving ocean economy.
              </p>
              <p style={{ fontSize: "16px", lineHeight: 1.9, color: BODY, fontWeight: 300, maxWidth: "680px" }}>
                When these ventures succeed, Africa's blue economy grows stronger. And their reach does not stop at any coastline.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          THE AGENDA — movement statement
      ══════════════════════════════════════════════ */}
      <section ref={agendaRef} style={{ background: MID, padding: "100px 5vw" }}>
        <div style={{ maxWidth: "1300px", margin: "0 auto" }}>
          <Rule color={DIM} my="0" />
          <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: "80px", paddingTop: "48px" }}>
            <div style={{
              opacity: agendaVis ? 1 : 0, transform: agendaVis ? "none" : "translateX(-16px)",
              transition: "opacity 0.7s, transform 0.7s",
            }}>
              <span style={{ fontSize: "9px", letterSpacing: "3px", color: MUTED, display: "block", marginBottom: "16px" }}>THE AGENDA</span>
              <div style={{ width: "24px", height: "2px", background: SIGNAL }} />
            </div>

            <div style={{
              opacity: agendaVis ? 1 : 0, transform: agendaVis ? "none" : "translateY(16px)",
              transition: "opacity 0.7s 0.15s, transform 0.7s 0.15s",
            }}>
              <p style={{
                fontFamily: "var(--font-display)", fontStyle: "italic",
                fontSize: "clamp(20px, 2.5vw, 30px)", lineHeight: 1.5,
                color: WHITE, fontWeight: 400, marginBottom: "32px",
                letterSpacing: "-0.5px",
              }}>
                Something significant is happening across Africa's ocean economy, and it is being built by people who refuse to accept the limits of the possible.
              </p>
              <p style={{ fontSize: "16px", lineHeight: 1.9, color: BODY, fontWeight: 300, marginBottom: "20px", maxWidth: "680px" }}>
                Africa Ocean Dynamism is our commitment to that movement: to the entrepreneurs rewriting what African enterprise looks like, to the technologies finding solutions where others saw only problems, and to the long work of securing a future in which the continent's ocean resources serve its people well.
              </p>
              <p style={{ fontSize: "16px", lineHeight: 1.9, color: BODY, fontWeight: 300, maxWidth: "680px" }}>
                Progress of this kind does not sustain itself. It requires capital, conviction, and a willingness to back founders who are thinking not in quarters but in generations. That is the investment we are making.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          THE STAKES — It is 2030.
          Full bleed dark, large type, data callouts
          This is the centrepiece. Maximum gravity.
      ══════════════════════════════════════════════ */}
      <section ref={stakesRef} style={{ background: NAVY, padding: "120px 5vw" }}>
        <div style={{ maxWidth: "1300px", margin: "0 auto" }}>

          {/* Section header */}
          <div style={{
            marginBottom: "80px",
            opacity: stakesVis ? 1 : 0, transform: stakesVis ? "none" : "translateY(16px)",
            transition: "opacity 0.6s, transform 0.6s",
          }}>
            <Rule color={`rgba(193,39,45,0.4)`} my="0" />
            <div style={{ display: "flex", alignItems: "baseline", gap: "24px", paddingTop: "24px" }}>
              <span style={{ fontSize: "9px", letterSpacing: "3px", color: SIGNAL, fontWeight: 600 }}>THE STAKES</span>
              <h2 style={{
                fontFamily: "var(--font-display)", fontWeight: 700, fontStyle: "italic",
                fontSize: "clamp(32px, 5vw, 72px)", color: WHITE,
                lineHeight: 0.92, letterSpacing: "-2px", margin: 0,
              }}>It is 2030.</h2>
            </div>
          </div>

          {/* Two column — body left, stats right */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "80px", alignItems: "start" }}>

            {/* Left — narrative */}
            <div style={{
              opacity: stakesVis ? 1 : 0, transform: stakesVis ? "none" : "translateX(-20px)",
              transition: "opacity 0.8s 0.1s, transform 0.8s 0.1s",
            }}>
              <p style={{
                fontFamily: "var(--font-display)", fontSize: "clamp(17px, 2vw, 22px)",
                lineHeight: 1.7, color: WHITE, fontWeight: 400,
                marginBottom: "28px",
              }}>
                The world is on edge — and Africa's coastlines are no longer peripheral to what happens next.
              </p>
              <p style={{ fontSize: "15px", lineHeight: 1.95, color: BODY, fontWeight: 300, marginBottom: "24px" }}>
                The intensifying rivalry between major powers in the Indo-Pacific has exposed something that African policymakers, economists, and ocean entrepreneurs have long understood: the global economy runs on water, and whoever controls the world's critical sea lanes controls the terms of everyone else's growth.
              </p>
              <p style={{ fontSize: "15px", lineHeight: 1.95, color: BODY, fontWeight: 300, marginBottom: "40px" }}>
                Africa has 38 coastal and island states. Its coastline stretches over 40,000 kilometres. The continent borders three of the world's most strategically significant bodies of water — the Atlantic Ocean, the Indian Ocean, and the Red Sea — through which an estimated 90 percent of global trade passes by volume. When the world's maritime order fractures, Africa does not simply observe the crisis. It absorbs it.
              </p>

              <Rule color={DIM} my="0" />
              <div style={{ paddingTop: "32px" }}>
                <p style={{ fontSize: "9px", letterSpacing: "3px", color: MUTED, marginBottom: "16px" }}>THE VULNERABILITY</p>
                <p style={{ fontSize: "15px", lineHeight: 1.95, color: BODY, fontWeight: 300, marginBottom: "24px" }}>
                  Africa imports the majority of its wheat through the Red Sea and the Suez Canal corridor. The conflict in Sudan and the Houthi attacks on commercial shipping in the Red Sea beginning in late 2023 offered a preview of what disruption to that corridor costs: freight insurance rates surged, vessel rerouting added weeks and millions in fuel costs, and food import-dependent nations faced renewed inflationary pressure on staple goods.
                </p>
                <p style={{ fontSize: "15px", lineHeight: 1.95, color: BODY, fontWeight: 300, marginBottom: "40px" }}>
                  Africa's blue economy, currently valued at an estimated $300 billion annually and projected to double by 2030, is structurally exposed to exactly these kinds of external shocks. The continent's fishing industries, offshore energy sector, maritime trade, and coastal tourism are all sensitive to the stability of global shipping, the price of fuel, the availability of technology inputs, and the integrity of undersea data infrastructure.
                </p>
              </div>

              <Rule color={DIM} my="0" />
              <div style={{ paddingTop: "32px" }}>
                <p style={{ fontSize: "9px", letterSpacing: "3px", color: MUTED, marginBottom: "16px" }}>THE OPPORTUNITY</p>
                <p style={{ fontSize: "15px", lineHeight: 1.95, color: BODY, fontWeight: 300, marginBottom: "24px" }}>
                  Vulnerability, properly understood, is also a map of where investment matters most. Africa's ocean economy does not need to remain a passive recipient of global shocks. The same geography that exposes the continent is also its greatest strategic asset — if the people building solutions along Africa's coastlines are properly resourced and supported.
                </p>
                <p style={{ fontSize: "15px", lineHeight: 1.95, color: BODY, fontWeight: 300 }}>
                  The continent sits at the intersection of the world's most important maritime trade routes. West Africa's Gulf of Guinea — where an estimated 4 percent of global oil passes — has in recent years become the world's most active zone for maritime piracy, costing the regional economy an estimated $2 billion annually. These are not abstract geopolitical concerns. They are the operating environment of every founder building in Africa's ocean economy today.
                </p>
              </div>
            </div>

            {/* Right — stats column */}
            <div style={{
              display: "flex", flexDirection: "column", gap: "40px",
              position: "sticky", top: "80px",
              opacity: stakesVis ? 1 : 0, transform: stakesVis ? "none" : "translateX(20px)",
              transition: "opacity 0.8s 0.25s, transform 0.8s 0.25s",
            }}>
              <Stat value="$300B" label="Blue economy annual value" sub="Projected to double to $600B by 2030 — African Union" />
              <Rule color={DIM} />
              <Stat value="95%" label="Internet traffic via undersea cable" sub="Cables passing through contested maritime zones" />
              <Rule color={DIM} />
              <Stat value="$2B" label="Annual piracy cost" sub="Gulf of Guinea — Stable Seas & International Maritime Bureau" />
              <Rule color={DIM} />
              <Stat value="40,000km" label="African coastline" sub="Bordering the Atlantic, Indian Ocean, and Red Sea" />
              <Rule color={DIM} />

              {/* Pull quote */}
              <div style={{
                background: MID,
                borderLeft: `3px solid ${SIGNAL}`,
                padding: "24px",
              }}>
                <p style={{
                  fontFamily: "var(--font-display)", fontStyle: "italic",
                  fontSize: "15px", lineHeight: 1.7, color: WHITE, margin: "0 0 12px 0",
                }}>
                  "The peace-through-strength logic that animates defence investment in Washington applies, in a different register, to Africa's ocean economy."
                </p>
                <span style={{ fontSize: "10px", letterSpacing: "2px", color: SIGNAL }}>THE ARGUMENT</span>
              </div>
            </div>
          </div>

          {/* The Argument — full width */}
          <div style={{
            marginTop: "80px", paddingTop: "80px",
            borderTop: `1px solid ${DIM}`,
            opacity: stakesVis ? 1 : 0, transition: "opacity 0.8s 0.4s",
          }}>
            <p style={{ fontSize: "9px", letterSpacing: "3px", color: SIGNAL, marginBottom: "24px", fontWeight: 600 }}>THE ARGUMENT</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px" }}>
              <p style={{ fontSize: "15px", lineHeight: 1.95, color: BODY, fontWeight: 300 }}>
                Africa Ocean Dynamism is built on a clear conviction: that the founders, engineers, and companies solving Africa's most pressing ocean challenges are not only building businesses — they are building the resilience infrastructure that will determine how well the continent weathers the turbulence ahead. Strength here does not mean militarisation. It means self-sufficiency. It means the capacity to monitor and protect exclusive economic zones that together span over 13 million square kilometres of ocean.
              </p>
              <p style={{ fontSize: "15px", lineHeight: 1.95, color: BODY, fontWeight: 300 }}>
                The founders doing this work exist. They are building across Lagos, Mombasa, Dakar, Cape Town, Accra, and Maputo. They are tracking illegal fishing fleets, decarbonising port operations, digitising customs corridors, and feeding coastal populations from ocean systems that are both more productive and more sustainable than those they are replacing. They are not waiting for the world to stabilise. They are building the conditions under which Africa's ocean economy can grow regardless of what the world does next.
              </p>
            </div>

            {/* Closing statement */}
            <div style={{
              marginTop: "48px", padding: "40px",
              background: MID, borderLeft: `4px solid ${SIGNAL}`,
            }}>
              <p style={{
                fontFamily: "var(--font-display)", fontStyle: "italic",
                fontSize: "clamp(18px, 2.5vw, 28px)", lineHeight: 1.5,
                color: WHITE, margin: 0, letterSpacing: "-0.5px",
              }}>
                That is the investment Africa Ocean Dynamism is making. And the moment for it has never been more urgent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          THE NEXT BIG WAVE — six strategic themes
          Category filter + accordion expansion
      ══════════════════════════════════════════════ */}
      <section ref={waveRef} style={{ background: SLATE, padding: "100px 5vw" }}>
        <div style={{ maxWidth: "1300px", margin: "0 auto" }}>

          {/* Header */}
          <div style={{
            marginBottom: "64px",
            opacity: waveVis ? 1 : 0, transform: waveVis ? "none" : "translateY(16px)",
            transition: "opacity 0.6s, transform 0.6s",
          }}>
            <Rule color={DIM} my="0" />
            <div style={{ paddingTop: "32px" }}>
              <span style={{ fontSize: "9px", letterSpacing: "3px", color: SIGNAL, display: "block", marginBottom: "16px", fontWeight: 600 }}>
                THE NEXT BIG WAVE
              </span>
              <h2 style={{
                fontFamily: "var(--font-display)", fontWeight: 700,
                fontSize: "clamp(28px, 4vw, 56px)", color: WHITE,
                lineHeight: 0.95, letterSpacing: "-1.5px", margin: "0 0 8px 0",
              }}>Six Strategic Themes</h2>
              <p style={{ fontSize: "14px", color: MUTED, fontWeight: 300, maxWidth: "480px", lineHeight: 1.7 }}>
                Africa Ocean Dynamism 20: Race to Sustainability
              </p>
            </div>
          </div>

          {/* Category filter */}
          <div style={{
            display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "48px",
            opacity: waveVis ? 1 : 0, transition: "opacity 0.6s 0.1s",
          }}>
            {CATEGORIES.map(cat => (
              <button key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: "7px 16px",
                  background: activeCategory === cat ? SIGNAL : "transparent",
                  border: `1px solid ${activeCategory === cat ? SIGNAL : DIM}`,
                  color: activeCategory === cat ? WHITE : MUTED,
                  fontSize: "10px", letterSpacing: "1.5px", fontWeight: 600,
                  cursor: "pointer", transition: "all 0.2s",
                  fontFamily: "inherit",
                }}
                onMouseEnter={e => { if (activeCategory !== cat) { e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; e.currentTarget.style.color = WHITE; }}}
                onMouseLeave={e => { if (activeCategory !== cat) { e.currentTarget.style.borderColor = DIM; e.currentTarget.style.color = MUTED; }}}
              >{cat}</button>
            ))}
          </div>

          {/* Wave items — accordion rows */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {WAVES.map((wave, i) => {
              const isOpen = activeWave === i;
              return (
                <div key={wave.num} style={{
                  borderTop: `1px solid ${DIM}`,
                  opacity: waveVis ? 1 : 0,
                  transition: `opacity 0.5s ${0.05 + i * 0.08}s`,
                }}>
                  {/* Row header — always visible */}
                  <button onClick={() => setActiveWave(isOpen ? null : i)}
                    style={{
                      width: "100%", background: "none", border: "none",
                      cursor: "pointer", textAlign: "left", padding: "28px 0",
                      display: "grid", gridTemplateColumns: "56px 1fr 120px 40px",
                      gap: "32px", alignItems: "center",
                      fontFamily: "inherit",
                    }}
                  >
                    <span style={{
                      fontFamily: "var(--font-display)", fontStyle: "italic",
                      fontSize: "18px", color: SIGNAL, fontWeight: 700,
                    }}>{wave.num}</span>

                    <span style={{
                      fontFamily: "var(--font-display)", fontWeight: 700,
                      fontSize: "clamp(16px, 2vw, 22px)", color: isOpen ? WHITE : "rgba(255,255,255,0.75)",
                      letterSpacing: "-0.3px", transition: "color 0.2s",
                    }}>{wave.title}</span>

                    <span style={{
                      fontFamily: "var(--font-display)", fontWeight: 700,
                      fontSize: "18px", color: isOpen ? SIGNAL : MUTED,
                      textAlign: "right", transition: "color 0.2s",
                    }}>{wave.stat}</span>

                    <span style={{
                      color: isOpen ? SIGNAL : MUTED,
                      fontSize: "18px", textAlign: "right",
                      transition: "transform 0.3s, color 0.2s",
                      display: "block",
                      transform: isOpen ? "rotate(45deg)" : "none",
                    }}>+</span>
                  </button>

                  {/* Expanded content */}
                  <div style={{
                    overflow: "hidden",
                    maxHeight: isOpen ? "400px" : "0",
                    transition: "max-height 0.45s cubic-bezier(0.4,0,0.2,1)",
                  }}>
                    <div style={{
                      display: "grid", gridTemplateColumns: "56px 1fr 160px",
                      gap: "32px", paddingBottom: "36px", alignItems: "start",
                    }}>
                      <div />
                      <p style={{ fontSize: "15px", lineHeight: 1.9, color: BODY, fontWeight: 300, margin: 0 }}>
                        {wave.body}
                      </p>
                      <div style={{ textAlign: "right" }}>
                        <span style={{
                          fontFamily: "var(--font-display)", fontSize: "32px",
                          fontWeight: 700, color: `rgba(193,39,45,0.2)`,
                          display: "block", lineHeight: 1,
                        }}>{wave.stat}</span>
                        <span style={{ fontSize: "9px", letterSpacing: "1.5px", color: MUTED, display: "block", marginTop: "6px" }}>
                          {wave.statLabel.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <Rule color={DIM} my="0" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          NEWSLETTER SIGNUP
          Clean, functional, minimal — not cultural
      ══════════════════════════════════════════════ */}
      <section ref={emailRef} style={{ background: MID, padding: "100px 5vw" }}>
        <div style={{ maxWidth: "1300px", margin: "0 auto" }}>
          <Rule color={DIM} my="0" />
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: "80px", alignItems: "center", paddingTop: "64px",
            opacity: emailVis ? 1 : 0, transform: emailVis ? "none" : "translateY(20px)",
            transition: "opacity 0.7s, transform 0.7s",
          }}>
            <div>
              <span style={{ fontSize: "9px", letterSpacing: "3px", color: SIGNAL, display: "block", marginBottom: "20px", fontWeight: 600 }}>
                AFRICA OCEAN DYNAMISM STARTS WITH PEOPLE
              </span>
              <h2 style={{
                fontFamily: "var(--font-display)", fontWeight: 700,
                fontSize: "clamp(24px, 3.5vw, 44px)", color: WHITE,
                lineHeight: 0.95, letterSpacing: "-1px", marginBottom: "20px",
              }}>
                The ideas, companies, and individuals building toward a more sustainable future.
              </h2>
              <p style={{ fontSize: "15px", lineHeight: 1.85, color: MUTED, fontWeight: 300, maxWidth: "420px" }}>
                Sign up for our Africa Ocean Dynamism newsletter to get the Cabin Tea take on the ocean economy.
              </p>
            </div>

            {/* Email form */}
            <div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{
                    width: "100%", padding: "16px 20px",
                    background: STEEL,
                    border: `1px solid ${DIM}`,
                    color: WHITE, fontSize: "14px",
                    fontFamily: "inherit", outline: "none",
                    boxSizing: "border-box",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={e => e.target.style.borderColor = ACCENT}
                  onBlur={e => e.target.style.borderColor = DIM}
                />
                <button
                  onClick={() => { if (email) { alert("Thank you for signing up."); setEmail(""); }}}
                  style={{
                    padding: "16px 32px",
                    background: SIGNAL, color: WHITE,
                    border: "none", cursor: "pointer",
                    fontSize: "10px", letterSpacing: "3px", fontWeight: 700,
                    fontFamily: "inherit", transition: "opacity 0.2s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                  onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                >
                  SUBSCRIBE TO THE NEWSLETTER
                </button>
              </div>
              <p style={{ fontSize: "11px", color: `rgba(255,255,255,0.25)`, marginTop: "12px", lineHeight: 1.6 }}>
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
