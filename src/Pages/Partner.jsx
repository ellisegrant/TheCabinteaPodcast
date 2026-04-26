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

/* ── Palette — matches site exactly ── */
const BG    = "#0F1912";
const PANEL = "#141F18";
const DARK2 = "#1A2820";
const GOLD  = "#C4A44E";
const TEAL  = "#2C8C7C";
const CREAM = "rgba(214,207,194,0.75)";
const MUTED = "rgba(214,207,194,0.38)";

/* ── Partnership tiers ── */
const TIERS = [
  {
    name: "FOUNDING BLEND",
    type: "Season Partner",
    featured: true,
    perks: [
      "Full season tea integration across all episodes",
      "Branded keepsake tin for every guest",
      "Logo placement on all platforms and artwork",
      "Co-branded social content and campaign",
      "Named mention in every episode introduction",
      "First right of renewal for following season",
    ],
  },
  {
    name: "SINGLE ORIGIN",
    type: "Episode Partner",
    featured: false,
    perks: [
      "Tea integration for selected episode",
      "Branded keepsake tin for featured guest",
      "Logo on episode artwork and show notes",
      "Mention in episode introduction",
    ],
  },
  {
    name: "TEA HOUSE",
    type: "Venue & Experience Partner",
    featured: false,
    perks: [
      "Brand presence at live event space",
      "Product sampling for live audience",
      "Dedicated social media feature",
      "Community association with Cabin Tea brand",
    ],
  },
];

const REASONS = [
  {
    num: "01",
    title: "Cultural Authority",
    body: "Cabin Tea is the leading voice in Africa's maritime industry culture. Partnering places your brand inside the conversation that shapes the continent's blue economy.",
  },
  {
    num: "02",
    title: "The Right Audience",
    body: "Our listeners are professionals, entrepreneurs, and decision-makers across Africa's maritime, trade, and blue economy sectors — high-value and hard to reach.",
  },
  {
    num: "03",
    title: "The Keepsake Ritual",
    body: "At the close of every session, our guest receives a branded tin of that episode's tea — a lasting physical reminder of the conversation, and of your brand.",
  },
  {
    num: "04",
    title: "Authentic Integration",
    body: "Your product is not a backdrop. It is woven into the story. We partner exclusively with brands whose values align — sustainability, storytelling, and the sea.",
  },
];

/* ── Contact Form ── */
function ContactForm() {
  const [form, setForm] = useState({ name: "", company: "", email: "", tier: "", message: "" });
  const [sent, setSent] = useState(false);

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const field = {
    width: "100%",
    padding: "13px 16px",
    background: DARK2,
    border: "1px solid rgba(196,164,78,0.15)",
    color: "white",
    fontSize: "14px",
    fontFamily: "inherit",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
    borderRadius: "0",
  };

  const label = {
    fontSize: "9px",
    letterSpacing: "2.5px",
    color: MUTED,
    display: "block",
    marginBottom: "7px",
    fontWeight: 600,
  };

  const onFocus = e => e.target.style.borderColor = GOLD;
  const onBlur  = e => e.target.style.borderColor = "rgba(196,164,78,0.15)";

  if (sent) return (
    <div style={{
      padding: "60px 40px",
      background: PANEL,
      borderLeft: `3px solid ${GOLD}`,
    }}>
      <p style={{ fontSize: "10px", letterSpacing: "3px", color: GOLD, marginBottom: "16px", fontWeight: 600 }}>
        MESSAGE RECEIVED
      </p>
      <h3 style={{ fontSize: "clamp(20px, 2.5vw, 28px)", fontWeight: 700, color: "white", lineHeight: 1.3, margin: 0 }}>
        Thank you. Our team will be in touch within 3–5 business days.
      </h3>
    </div>
  );

  return (
    <form onSubmit={e => { e.preventDefault(); setSent(true); }}
      style={{ display: "flex", flexDirection: "column", gap: "18px" }}>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
        <div>
          <label style={label}>YOUR NAME</label>
          <input required value={form.name} onChange={e => update("name", e.target.value)}
            style={field} placeholder="Full name" onFocus={onFocus} onBlur={onBlur} />
        </div>
        <div>
          <label style={label}>COMPANY</label>
          <input required value={form.company} onChange={e => update("company", e.target.value)}
            style={field} placeholder="Organisation" onFocus={onFocus} onBlur={onBlur} />
        </div>
      </div>

      <div>
        <label style={label}>EMAIL ADDRESS</label>
        <input required type="email" value={form.email} onChange={e => update("email", e.target.value)}
          style={field} placeholder="your@email.com" onFocus={onFocus} onBlur={onBlur} />
      </div>

      <div>
        <label style={label}>PARTNERSHIP TIER</label>
        <select value={form.tier} onChange={e => update("tier", e.target.value)}
          style={{ ...field, appearance: "none", cursor: "pointer" }}
          onFocus={onFocus} onBlur={onBlur}>
          <option value="" style={{ background: DARK2 }}>Select a tier</option>
          <option value="Founding Blend" style={{ background: DARK2 }}>Founding Blend — Season Partner</option>
          <option value="Single Origin" style={{ background: DARK2 }}>Single Origin — Episode Partner</option>
          <option value="Tea House" style={{ background: DARK2 }}>Tea House — Venue & Experience</option>
          <option value="Other" style={{ background: DARK2 }}>Other / Not sure yet</option>
        </select>
      </div>

      <div>
        <label style={label}>MESSAGE</label>
        <textarea required value={form.message} onChange={e => update("message", e.target.value)}
          rows={5} placeholder="Tell us about your brand and what you're looking for..."
          style={{ ...field, resize: "vertical", lineHeight: 1.7 }}
          onFocus={onFocus} onBlur={onBlur} />
      </div>

      <button type="submit" style={{
        padding: "14px 36px",
        background: GOLD,
        color: BG,
        border: "none",
        cursor: "pointer",
        fontSize: "10px",
        letterSpacing: "2.5px",
        fontWeight: 700,
        fontFamily: "inherit",
        transition: "opacity 0.2s",
        alignSelf: "flex-start",
      }}
        onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
        onMouseLeave={e => e.currentTarget.style.opacity = "1"}
      >
        SEND ENQUIRY →
      </button>

      <p style={{ fontSize: "11px", color: MUTED, lineHeight: 1.6, margin: 0 }}>
        We review all requests and respond within 3–5 business days.
      </p>
    </form>
  );
}

/* ══════════════════════════════════════════
   PAGE
══════════════════════════════════════════ */
export default function Partner() {
  const [heroRef,    heroVis]    = useReveal(0.05);
  const [propRef,    propVis]    = useReveal(0.08);
  const [reasonsRef, reasonsVis] = useReveal(0.08);
  const [tiersRef,   tiersVis]   = useReveal(0.08);
  const [formRef,    formVis]    = useReveal(0.08);

  return (
    <div style={{ minHeight: "100vh", background: BG, color: "white", overflowX: "hidden" }}>
      <Navbar />

      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <section ref={heroRef} style={{
        height: "100vh", minHeight: "640px",
        position: "relative", overflow: "hidden",
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
      }}>
        <img
          src="/images/partner/hero.jpg"
          alt="Partner with Cabin Tea"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(15,25,18,1) 0%, rgba(15,25,18,0.65) 50%, rgba(15,25,18,0.2) 100%)",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, rgba(15,25,18,0.75) 0%, transparent 65%)",
        }} />
        <div className="ct-grain" style={{ zIndex: 1 }} />

        <div style={{ position: "relative", zIndex: 2, padding: "0 5vw 80px" }}>

          {/* Eyebrow */}
          <p style={{
            fontSize: "10px", letterSpacing: "4px", color: GOLD,
            fontWeight: 600, margin: "0 0 24px",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(12px)",
            transition: "opacity 0.6s 0.1s, transform 0.6s 0.1s",
          }}>CABIN TEA · PARTNERSHIPS</p>

          {/* Headline */}
          <h1 style={{
            fontWeight: 700,
            fontSize: "clamp(42px, 6vw, 100px)",
            lineHeight: 0.95, letterSpacing: "-2px",
            color: "white", margin: "0 0 6px",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(28px)",
            transition: "opacity 0.8s 0.18s, transform 0.8s 0.18s",
          }}>More than</h1>
          <h1 style={{
            fontWeight: 700,
            fontSize: "clamp(42px, 6vw, 100px)",
            lineHeight: 0.95, letterSpacing: "-2px",
            color: "white", margin: "0 0 6px",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(28px)",
            transition: "opacity 0.8s 0.26s, transform 0.8s 0.26s",
          }}>a sponsor.</h1>
          <h1 style={{
            fontWeight: 700,
            fontSize: "clamp(42px, 6vw, 100px)",
            lineHeight: 0.95, letterSpacing: "-2px",
            color: GOLD, margin: "0 0 52px",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(28px)",
            transition: "opacity 0.8s 0.34s, transform 0.8s 0.34s",
          }}>A seat at the table.</h1>

          {/* Sub-row */}
          <div style={{
            display: "flex", alignItems: "flex-end",
            justifyContent: "space-between", gap: "40px", flexWrap: "wrap",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(16px)",
            transition: "opacity 0.7s 0.44s, transform 0.7s 0.44s",
          }}>
            <p style={{
              fontSize: "16px", color: CREAM, lineHeight: 1.7,
              fontWeight: 300, maxWidth: "420px", margin: 0,
              borderLeft: `2px solid rgba(196,164,78,0.35)`,
              paddingLeft: "18px",
            }}>
              Cabin Tea partners exclusively with brands whose values align with ours — sustainability, storytelling, and the sea.
            </p>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <a href="#partner-form" style={{
                display: "inline-block", padding: "13px 32px",
                background: GOLD, color: BG,
                textDecoration: "none", fontSize: "11px",
                letterSpacing: "2px", fontWeight: 700,
                transition: "opacity 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}
              >GET IN TOUCH</a>
              <a href="#tiers" style={{
                display: "inline-block", padding: "13px 32px",
                border: "1px solid rgba(255,255,255,0.2)", color: CREAM,
                textDecoration: "none", fontSize: "11px",
                letterSpacing: "2px", fontWeight: 500,
                transition: "border-color 0.2s, color 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; e.currentTarget.style.color = "white"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = CREAM; }}
              >VIEW TIERS</a>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          THE PROPOSITION
      ════════════════════════════════════════ */}
      <section ref={propRef} style={{ background: PANEL, padding: "96px 5vw" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: "80px", alignItems: "center",
          }}>
            <div style={{
              opacity: propVis ? 1 : 0, transform: propVis ? "none" : "translateX(-20px)",
              transition: "opacity 0.8s, transform 0.8s",
            }}>
              <p style={{ fontSize: "10px", letterSpacing: "3px", color: GOLD, marginBottom: "20px", fontWeight: 600 }}>
                THE PROPOSITION
              </p>
              <h2 style={{
                fontWeight: 700,
                fontSize: "clamp(28px, 3.5vw, 44px)",
                lineHeight: 1.1, color: "white",
                marginBottom: "24px", letterSpacing: "-0.5px",
              }}>
                Your product is not a backdrop.<br />It is part of the experience.
              </h2>
              <p style={{ fontSize: "16px", lineHeight: 1.85, color: CREAM, fontWeight: 300, marginBottom: "20px" }}>
                Cabin Tea is Africa's leading maritime media brand — a live conversation series recorded in Accra and distributed globally. Every episode is built around a carefully chosen cup of tea, shared between host and guest. That tea is your brand's moment.
              </p>
              <p style={{ fontSize: "16px", lineHeight: 1.85, color: MUTED, fontWeight: 300 }}>
                When you partner with Cabin Tea, your brand is not slotted into an ad break. It is woven into the story — present at the table where Africa's maritime future is being discussed, tasted, and remembered.
              </p>
            </div>

            {/* Right — stat blocks */}
            <div style={{
              opacity: propVis ? 1 : 0, transform: propVis ? "none" : "translateX(20px)",
              transition: "opacity 0.8s 0.15s, transform 0.8s 0.15s",
              display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px",
            }}>
              {[
                { val: "54", label: "African Nations", sub: "Continental reach" },
                { val: "Global", label: "Diaspora", sub: "International audience" },
                { val: "Live", label: "Recorded", sub: "In Accra, Ghana" },
                { val: "100%", label: "Brand Aligned", sub: "Curated partnerships only" },
              ].map(s => (
                <div key={s.label} style={{
                  background: DARK2,
                  padding: "28px 24px",
                  borderBottom: `2px solid rgba(196,164,78,0)`,
                  transition: "border-color 0.2s",
                }}
                  onMouseEnter={e => e.currentTarget.style.borderBottomColor = GOLD}
                  onMouseLeave={e => e.currentTarget.style.borderBottomColor = "rgba(196,164,78,0)"}
                >
                  <span style={{ fontSize: "28px", fontWeight: 700, color: "white", display: "block", lineHeight: 1 }}>{s.val}</span>
                  <span style={{ fontSize: "9px", letterSpacing: "2px", color: GOLD, display: "block", marginTop: "6px", fontWeight: 600 }}>
                    {s.label.toUpperCase()}
                  </span>
                  <span style={{ fontSize: "11px", color: MUTED, display: "block", marginTop: "4px" }}>{s.sub}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          WHY PARTNER — 4 reasons
      ════════════════════════════════════════ */}
      <section ref={reasonsRef} style={{ background: BG, padding: "96px 5vw" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

          {/* Header */}
          <div style={{
            display: "flex", alignItems: "baseline",
            justifyContent: "space-between", marginBottom: "56px",
            opacity: reasonsVis ? 1 : 0, transform: reasonsVis ? "none" : "translateY(12px)",
            transition: "opacity 0.6s, transform 0.6s",
          }}>
            <div>
              <p style={{ fontSize: "10px", letterSpacing: "3px", color: GOLD, marginBottom: "12px", fontWeight: 600 }}>
                WHY PARTNER WITH US
              </p>
              <h2 style={{
                fontWeight: 700,
                fontSize: "clamp(22px, 3vw, 36px)",
                color: "white", margin: 0,
              }}>Four reasons to be at the table.</h2>
            </div>
          </div>

          {/* Reasons list */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {REASONS.map((r, i) => (
              <div key={r.num} style={{
                display: "grid",
                gridTemplateColumns: "56px 1fr 1fr",
                gap: "40px",
                padding: "44px 0",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                alignItems: "start",
                opacity: reasonsVis ? 1 : 0, transform: reasonsVis ? "none" : "translateY(16px)",
                transition: `opacity 0.6s ${0.08 + i * 0.1}s, transform 0.6s ${0.08 + i * 0.1}s`,
              }}>
                <span style={{
                  fontSize: "42px", fontWeight: 700,
                  color: "rgba(196,164,78,0.12)", lineHeight: 1,
                  letterSpacing: "-1px",
                }}>{r.num}</span>
                <h3 style={{
                  fontWeight: 700,
                  fontSize: "clamp(18px, 2vw, 24px)",
                  color: "white", lineHeight: 1.15,
                  margin: 0, letterSpacing: "-0.3px",
                }}>{r.title}</h3>
                <p style={{ fontSize: "15px", lineHeight: 1.85, color: CREAM, fontWeight: 300, margin: 0 }}>
                  {r.body}
                </p>
              </div>
            ))}
            <div style={{ height: "1px", background: "rgba(255,255,255,0.06)" }} />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          THE KEEPSAKE RITUAL — full bleed banner
      ════════════════════════════════════════ */}
      <section style={{
        position: "relative", overflow: "hidden",
        minHeight: "380px", display: "flex", alignItems: "center",
      }}>
        <img
          src="/images/partner/ritual.jpg"
          alt="The Keepsake Ritual"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(105deg, rgba(15,25,18,0.96) 35%, rgba(15,25,18,0.7) 100%)",
        }} />
        <div className="ct-grain" style={{ zIndex: 1 }} />

        <div style={{ position: "relative", zIndex: 2, padding: "80px 5vw", maxWidth: "700px" }}>
          <p style={{ fontSize: "10px", letterSpacing: "3px", color: GOLD, marginBottom: "20px", fontWeight: 600 }}>
            THE KEEPSAKE RITUAL
          </p>
          <h2 style={{
            fontWeight: 700,
            fontSize: "clamp(26px, 4vw, 52px)",
            lineHeight: 1.05, color: "white",
            marginBottom: "20px", letterSpacing: "-1px",
          }}>
            A tin they'll keep.<br />
            <span style={{ color: GOLD }}>A brand they'll remember.</span>
          </h2>
          <p style={{ fontSize: "16px", color: CREAM, fontWeight: 300, lineHeight: 1.75, maxWidth: "480px", margin: 0 }}>
            At the close of every session, our guest receives a branded tin of that episode's tea — a beautiful, lasting reminder of the conversation, and of your brand.
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════
          PARTNERSHIP TIERS
      ════════════════════════════════════════ */}
      <section id="tiers" ref={tiersRef} style={{ background: PANEL, padding: "96px 5vw" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

          <div style={{
            marginBottom: "56px",
            opacity: tiersVis ? 1 : 0, transform: tiersVis ? "none" : "translateY(12px)",
            transition: "opacity 0.6s, transform 0.6s",
          }}>
            <p style={{ fontSize: "10px", letterSpacing: "3px", color: GOLD, marginBottom: "12px", fontWeight: 600 }}>
              PARTNERSHIP TIERS
            </p>
            <h2 style={{
              fontWeight: 700,
              fontSize: "clamp(22px, 3vw, 36px)",
              color: "white", margin: 0,
            }}>Choose your seat.</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2px" }}>
            {TIERS.map((tier, i) => {
              const [hovered, setHovered] = useState(false);
              return (
                <div
                  key={tier.name}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                  style={{
                    background: tier.featured
                      ? (hovered ? "#1e2e26" : DARK2)
                      : (hovered ? "#161f1a" : BG),
                    padding: "44px 36px",
                    position: "relative",
                    borderTop: `3px solid ${tier.featured ? GOLD : "rgba(44,140,124,0.35)"}`,
                    opacity: tiersVis ? 1 : 0, transform: tiersVis ? "none" : "translateY(24px)",
                    transition: `opacity 0.6s ${0.08 + i * 0.1}s, transform 0.6s ${0.08 + i * 0.1}s, background 0.3s`,
                  }}
                >
                  {/* Premier badge */}
                  {tier.featured && (
                    <span style={{
                      position: "absolute", top: "18px", right: "18px",
                      background: GOLD, color: BG,
                      fontSize: "8px", letterSpacing: "2px", fontWeight: 700,
                      padding: "4px 10px",
                    }}>PREMIER</span>
                  )}

                  <p style={{
                    fontSize: "9px", letterSpacing: "2.5px",
                    color: tier.featured ? GOLD : TEAL,
                    fontWeight: 600, margin: "0 0 8px",
                  }}>{tier.name}</p>

                  <h3 style={{
                    fontWeight: 700,
                    fontSize: "clamp(18px, 2vw, 22px)",
                    color: "white", lineHeight: 1.2,
                    margin: "0 0 24px", letterSpacing: "-0.2px",
                  }}>{tier.type}</h3>

                  <div style={{
                    width: "24px", height: "1px",
                    background: tier.featured ? GOLD : "rgba(44,140,124,0.5)",
                    margin: "0 0 24px",
                  }} />

                  <div style={{ display: "flex", flexDirection: "column", gap: "11px", marginBottom: "32px" }}>
                    {tier.perks.map((perk, pi) => (
                      <div key={pi} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                        <span style={{
                          color: tier.featured ? GOLD : "rgba(44,140,124,0.7)",
                          fontSize: "12px", flexShrink: 0, marginTop: "2px",
                        }}>—</span>
                        <span style={{ fontSize: "13px", lineHeight: 1.65, color: CREAM, fontWeight: 300 }}>
                          {perk}
                        </span>
                      </div>
                    ))}
                  </div>

                  <a href="#partner-form" style={{
                    display: "inline-block",
                    padding: "11px 28px",
                    background: tier.featured ? GOLD : "transparent",
                    border: `1px solid ${tier.featured ? GOLD : "rgba(255,255,255,0.15)"}`,
                    color: tier.featured ? BG : CREAM,
                    textDecoration: "none",
                    fontSize: "9px", letterSpacing: "2.5px", fontWeight: 700,
                    transition: "opacity 0.2s, border-color 0.2s, color 0.2s",
                  }}
                    onMouseEnter={e => {
                      if (tier.featured) { e.currentTarget.style.opacity = "0.85"; }
                      else { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.color = "white"; }
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.opacity = "1";
                      if (!tier.featured) { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = CREAM; }
                    }}
                  >ENQUIRE →</a>
                </div>
              );
            })}
          </div>

          <p style={{ fontSize: "12px", color: MUTED, marginTop: "20px", lineHeight: 1.7 }}>
            All tiers are subject to brand alignment review. Custom packages available. Pricing discussed on enquiry.
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════
          CONTACT FORM
      ════════════════════════════════════════ */}
      <section id="partner-form" ref={formRef} style={{ background: BG, padding: "96px 5vw" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

          {/* Section rule */}
          <div style={{ height: "1px", background: "rgba(196,164,78,0.15)", marginBottom: "56px" }} />

          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: "96px", alignItems: "start",
          }}>
            {/* Left — pitch */}
            <div style={{
              opacity: formVis ? 1 : 0, transform: formVis ? "none" : "translateX(-20px)",
              transition: "opacity 0.8s, transform 0.8s",
            }}>
              <p style={{ fontSize: "10px", letterSpacing: "3px", color: GOLD, marginBottom: "20px", fontWeight: 600 }}>
                LET'S WORK TOGETHER
              </p>
              <h2 style={{
                fontWeight: 700,
                fontSize: "clamp(28px, 3.5vw, 48px)",
                color: "white", lineHeight: 1.05,
                letterSpacing: "-1px", marginBottom: "24px",
              }}>
                Ready to be at<br />
                <span style={{ color: GOLD }}>the table?</span>
              </h2>
              <p style={{ fontSize: "16px", lineHeight: 1.85, color: CREAM, fontWeight: 300, marginBottom: "40px", maxWidth: "380px" }}>
                Tell us about your brand. We'll review your enquiry and respond within 3–5 business days.
              </p>

              {/* Trust signals */}
              <div style={{
                paddingTop: "28px",
                borderTop: "1px solid rgba(255,255,255,0.07)",
                display: "flex", flexDirection: "column", gap: "14px",
              }}>
                {[
                  "Exclusive — limited partnerships per season",
                  "Brand alignment reviewed before all partnerships",
                  "Custom packages available on request",
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                    <span style={{ color: GOLD, fontSize: "12px", flexShrink: 0, marginTop: "2px" }}>—</span>
                    <span style={{ fontSize: "13px", color: MUTED, lineHeight: 1.65 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — form */}
            <div style={{
              opacity: formVis ? 1 : 0, transform: formVis ? "none" : "translateX(20px)",
              transition: "opacity 0.8s 0.15s, transform 0.8s 0.15s",
            }}>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
