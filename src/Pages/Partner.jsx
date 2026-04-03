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

/* ─────────────────────────────────────────────────────
   PALETTE — premium, dark, restrained gold
   This page is a business proposition.
   Warm but authoritative. Not cultural warmth.
───────────────────────────────────────────────────── */
const DARK  = "#0E1A1F";
const MID   = "#132028";
const PANEL = "#192830";
const GOLD  = "#C4A44E";
const TEAL  = "#2C8C7C";
const CREAM = "rgba(214,207,194,0.75)";
const MUTED = "rgba(214,207,194,0.4)";

/* ─────────────────────────────────────────────────────
   IMAGE PATHS
───────────────────────────────────────────────────── */
const IMGS = {
  hero:   "/images/partner/hero.jpg",    /* Tea ceremony / partnership moment */
  ritual: "/images/partner/ritual.jpg",  /* Coastal / atmospheric              */
};

/* ─────────────────────────────────────────────────────
   PARTNERSHIP TIERS
───────────────────────────────────────────────────── */
const TIERS = [
  {
    name: "FOUNDING BLEND",
    type: "Season Partner",
    tag: "PREMIER",
    featured: true,
    accent: GOLD,
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
    tag: null,
    featured: false,
    accent: TEAL,
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
    tag: null,
    featured: false,
    accent: TEAL,
    perks: [
      "Brand presence at live event space",
      "Product sampling for live audience",
      "Dedicated social media feature",
      "Community association with Cabin Tea brand",
    ],
  },
];

/* ─────────────────────────────────────────────────────
   WHY PARTNER REASONS
───────────────────────────────────────────────────── */
const REASONS = [
  {
    num: "01",
    title: "Cultural Authority",
    body: "Cabin Tea is the leading voice in Africa's maritime industry culture. Partnering with us places your brand inside the conversation that matters.",
  },
  {
    num: "02",
    title: "The Right Audience",
    body: "Our listeners are professionals, entrepreneurs, and decision-makers in Africa's maritime, trade, and blue economy sectors — a high-value, hard-to-reach audience.",
  },
  {
    num: "03",
    title: "The Keepsake Ritual",
    body: "At the close of every session, our guest receives a branded tin of that episode's tea — a lasting, physical reminder of the conversation and of your brand.",
  },
  {
    num: "04",
    title: "Authentic Integration",
    body: "Your product is not a backdrop. It is woven into the story. We partner exclusively with brands whose values align with ours — sustainability, storytelling, and the sea.",
  },
];

/* ─────────────────────────────────────────────────────
   CONTACT FORM
───────────────────────────────────────────────────── */
function ContactForm() {
  const [form, setForm] = useState({ name: "", company: "", email: "", tier: "", message: "" });
  const [sent, setSent] = useState(false);

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const inputStyle = {
    width: "100%", padding: "14px 18px",
    background: MID, border: `1px solid rgba(196,164,78,0.15)`,
    color: "white", fontSize: "14px",
    fontFamily: "inherit", outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  };
  const labelStyle = {
    fontSize: "9px", letterSpacing: "2.5px",
    color: MUTED, display: "block", marginBottom: "8px", fontWeight: 600,
  };

  if (sent) return (
    <div style={{
      padding: "60px 40px", background: MID,
      borderLeft: `3px solid ${GOLD}`, textAlign: "center",
    }}>
      <span style={{ fontSize: "9px", letterSpacing: "3px", color: GOLD, display: "block", marginBottom: "16px" }}>
        MESSAGE RECEIVED
      </span>
      <p style={{
        fontFamily: "var(--font-display)", fontStyle: "italic",
        fontSize: "clamp(20px, 2.5vw, 28px)", color: "white", lineHeight: 1.4,
      }}>
        Thank you. Our team will be in touch within 3–5 business days.
      </p>
    </div>
  );

  return (
    <form onSubmit={e => { e.preventDefault(); setSent(true); }}
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <div>
          <label style={labelStyle}>YOUR NAME</label>
          <input required value={form.name} onChange={e => update("name", e.target.value)}
            style={inputStyle} placeholder="Full name"
            onFocus={e => e.target.style.borderColor = GOLD}
            onBlur={e => e.target.style.borderColor = "rgba(196,164,78,0.15)"}
          />
        </div>
        <div>
          <label style={labelStyle}>COMPANY</label>
          <input required value={form.company} onChange={e => update("company", e.target.value)}
            style={inputStyle} placeholder="Organisation name"
            onFocus={e => e.target.style.borderColor = GOLD}
            onBlur={e => e.target.style.borderColor = "rgba(196,164,78,0.15)"}
          />
        </div>
      </div>

      <div>
        <label style={labelStyle}>EMAIL ADDRESS</label>
        <input required type="email" value={form.email} onChange={e => update("email", e.target.value)}
          style={inputStyle} placeholder="your@email.com"
          onFocus={e => e.target.style.borderColor = GOLD}
          onBlur={e => e.target.style.borderColor = "rgba(196,164,78,0.15)"}
        />
      </div>

      <div>
        <label style={labelStyle}>PARTNERSHIP TIER OF INTEREST</label>
        <select value={form.tier} onChange={e => update("tier", e.target.value)}
          style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
          onFocus={e => e.target.style.borderColor = GOLD}
          onBlur={e => e.target.style.borderColor = "rgba(196,164,78,0.15)"}
        >
          <option value="" style={{ background: MID }}>Select a tier</option>
          <option value="Founding Blend" style={{ background: MID }}>Founding Blend — Season Partner</option>
          <option value="Single Origin" style={{ background: MID }}>Single Origin — Episode Partner</option>
          <option value="Tea House" style={{ background: MID }}>Tea House — Venue & Experience Partner</option>
          <option value="Other" style={{ background: MID }}>Other / Not sure yet</option>
        </select>
      </div>

      <div>
        <label style={labelStyle}>MESSAGE</label>
        <textarea required value={form.message} onChange={e => update("message", e.target.value)}
          rows={5} placeholder="Tell us about your brand and what you're looking for..."
          style={{ ...inputStyle, resize: "vertical", lineHeight: 1.7 }}
          onFocus={e => e.target.style.borderColor = GOLD}
          onBlur={e => e.target.style.borderColor = "rgba(196,164,78,0.15)"}
        />
      </div>

      <button type="submit" style={{
        padding: "16px 40px", background: GOLD, color: DARK,
        border: "none", cursor: "pointer",
        fontSize: "10px", letterSpacing: "3px", fontWeight: 700,
        fontFamily: "inherit", transition: "opacity 0.2s",
        alignSelf: "flex-start",
      }}
        onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
        onMouseLeave={e => e.currentTarget.style.opacity = "1"}
      >
        SEND PARTNERSHIP ENQUIRY →
      </button>

      <p style={{ fontSize: "11px", color: MUTED, lineHeight: 1.6 }}>
        We review all requests and respond within 3–5 business days.
      </p>
    </form>
  );
}

/* ─────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────── */
export default function Partner() {
  const [heroRef,    heroVis]    = useReveal(0.05);
  const [propRef,    propVis]    = useReveal(0.08);
  const [reasonsRef, reasonsVis] = useReveal(0.1);
  const [tiersRef,   tiersVis]   = useReveal(0.08);
  const [formRef,    formVis]    = useReveal(0.08);

  return (
    <div style={{ minHeight: "100vh", background: DARK, color: "white", overflowX: "hidden" }}>
      <Navbar />

      {/* ══════════════════════════════════════════════
          HERO — full bleed, premium, restrained
          No cultural symbols. This is a business door.
      ══════════════════════════════════════════════ */}
      <section ref={heroRef} style={{
        minHeight: "100vh", position: "relative", overflow: "hidden",
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
      }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img src={IMGS.hero} alt="Partner with Cabin Tea"
            style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          {/* Clean dark gradient — no warm earth, no terracotta */}
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${DARK} 0%, rgba(14,26,31,0.85) 45%, rgba(14,26,31,0.3) 100%)` }} />
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to right, rgba(14,26,31,0.8) 0%, transparent 55%)` }} />
        </div>
        <div className="ct-grain" style={{ zIndex: 1 }} />

        <div style={{ position: "relative", zIndex: 2, padding: "80px 5vw 100px" }}>
          {/* Eyebrow */}
          <div style={{
            display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(12px)",
            transition: "opacity 0.7s 0.1s, transform 0.7s 0.1s",
          }}>
            <div style={{ width: "24px", height: "1px", background: GOLD }} />
            <span style={{ fontSize: "10px", letterSpacing: "4px", color: GOLD, fontWeight: 600 }}>
              CABIN TEA · PARTNERSHIPS
            </span>
          </div>

          <h1 style={{
            fontFamily: "var(--font-display)", fontWeight: 700,
            fontSize: "clamp(52px, 9vw, 130px)",
            lineHeight: 0.88, letterSpacing: "-3px",
            color: "white", margin: 0,
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(28px)",
            transition: "opacity 0.8s 0.2s, transform 0.8s 0.2s",
          }}>More than</h1>
          <h1 style={{
            fontFamily: "var(--font-display)", fontWeight: 700,
            fontSize: "clamp(52px, 9vw, 130px)",
            lineHeight: 0.88, letterSpacing: "-3px",
            color: "white", margin: 0,
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(28px)",
            transition: "opacity 0.8s 0.28s, transform 0.8s 0.28s",
          }}>a sponsor.</h1>
          <h1 style={{
            fontFamily: "var(--font-display)", fontWeight: 700, fontStyle: "italic",
            fontSize: "clamp(52px, 9vw, 130px)",
            lineHeight: 0.88, letterSpacing: "-3px",
            color: GOLD, marginBottom: "52px",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(28px)",
            transition: "opacity 0.8s 0.36s, transform 0.8s 0.36s",
          }}>A seat at the table.</h1>

          <div style={{
            display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
            gap: "60px", alignItems: "end",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(16px)",
            transition: "opacity 0.7s 0.48s, transform 0.7s 0.48s",
          }}>
            <p style={{
              fontFamily: "var(--font-display)", fontStyle: "italic",
              fontSize: "clamp(16px, 1.8vw, 20px)", color: CREAM,
              lineHeight: 1.65, margin: 0,
              borderLeft: `2px solid rgba(196,164,78,0.4)`, paddingLeft: "20px",
            }}>
              Cabin Tea partners exclusively with brands whose values align with ours — sustainability, storytelling, and the sea.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
              <a href="#partner-form" style={{
                display: "inline-block", padding: "13px 32px",
                background: GOLD, color: DARK,
                textDecoration: "none", fontSize: "10px",
                letterSpacing: "3px", fontWeight: 700,
                transition: "opacity 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}
              >GET IN TOUCH</a>
              <a href="#tiers" style={{
                display: "inline-block", padding: "13px 32px",
                border: `1px solid rgba(196,164,78,0.3)`, color: CREAM,
                textDecoration: "none", fontSize: "10px",
                letterSpacing: "3px", fontWeight: 600,
                transition: "border-color 0.2s, color 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.color = "white"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(196,164,78,0.3)"; e.currentTarget.style.color = CREAM; }}
              >VIEW TIERS</a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          VALUE PROPOSITION — the pitch
          Clean, editorial, two column
      ══════════════════════════════════════════════ */}
      <section ref={propRef} style={{ background: MID, padding: "100px 5vw" }}>
        <div style={{ maxWidth: "1300px", margin: "0 auto" }}>
          <div style={{
            height: "1px", background: "rgba(196,164,78,0.2)", marginBottom: "48px",
          }} />
          <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: "80px" }}>

            {/* Left label */}
            <div style={{
              opacity: propVis ? 1 : 0, transform: propVis ? "none" : "translateX(-16px)",
              transition: "opacity 0.7s, transform 0.7s",
            }}>
              <span style={{ fontSize: "9px", letterSpacing: "3px", color: MUTED, display: "block", marginBottom: "16px" }}>
                THE PROPOSITION
              </span>
              <div style={{ width: "24px", height: "2px", background: GOLD }} />
            </div>

            {/* Right content */}
            <div style={{
              opacity: propVis ? 1 : 0, transform: propVis ? "none" : "translateY(16px)",
              transition: "opacity 0.7s 0.15s, transform 0.7s 0.15s",
            }}>
              <p style={{
                fontFamily: "var(--font-display)", fontStyle: "italic",
                fontSize: "clamp(20px, 2.5vw, 30px)", lineHeight: 1.5,
                color: "white", fontWeight: 400, marginBottom: "32px",
                letterSpacing: "-0.5px",
              }}>
                Your product is not a backdrop. It is part of the experience.
              </p>
              <p style={{ fontSize: "16px", lineHeight: 1.95, color: CREAM, fontWeight: 300, marginBottom: "20px", maxWidth: "640px" }}>
                Cabin Tea is Africa's leading maritime media brand — a live conversation series recorded in Accra and distributed globally. Every episode is built around a carefully chosen cup of tea, shared between host and guest. That tea is your brand's moment.
              </p>
              <p style={{ fontSize: "16px", lineHeight: 1.95, color: CREAM, fontWeight: 300, maxWidth: "640px" }}>
                When you partner with Cabin Tea, your brand is not slotted into an ad break. It is woven into the story — present at the table where Africa's maritime future is being discussed, tasted, and remembered.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          WHY PARTNER — four reasons
          Monocle editorial numbered list
      ══════════════════════════════════════════════ */}
      <section ref={reasonsRef} style={{ background: DARK, padding: "100px 5vw" }}>
        <div style={{ maxWidth: "1300px", margin: "0 auto" }}>
          <div style={{
            marginBottom: "64px",
            opacity: reasonsVis ? 1 : 0, transform: reasonsVis ? "none" : "translateY(16px)",
            transition: "opacity 0.6s, transform 0.6s",
          }}>
            <div style={{ height: "1px", background: "rgba(196,164,78,0.2)", marginBottom: "32px" }} />
            <span style={{ fontSize: "9px", letterSpacing: "3px", color: MUTED, display: "block", marginBottom: "16px" }}>WHY PARTNER WITH US</span>
            <h2 style={{
              fontFamily: "var(--font-display)", fontWeight: 700, fontStyle: "italic",
              fontSize: "clamp(28px, 3.5vw, 48px)", color: "white",
              lineHeight: 0.95, letterSpacing: "-1px", margin: 0,
            }}>Four reasons to be at the table.</h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {REASONS.map((r, i) => (
              <div key={r.num} style={{
                display: "grid", gridTemplateColumns: "64px 1fr 1fr",
                gap: "48px", padding: "48px 0",
                borderTop: `1px solid rgba(255,255,255,0.06)`,
                alignItems: "start",
                opacity: reasonsVis ? 1 : 0, transform: reasonsVis ? "none" : "translateY(16px)",
                transition: `opacity 0.6s ${0.1 + i * 0.12}s, transform 0.6s ${0.1 + i * 0.12}s`,
              }}>
                <span style={{
                  fontFamily: "var(--font-display)", fontStyle: "italic",
                  fontSize: "52px", fontWeight: 700,
                  color: "rgba(196,164,78,0.15)", lineHeight: 1,
                }}>{r.num}</span>
                <h3 style={{
                  fontFamily: "var(--font-display)", fontWeight: 700,
                  fontSize: "clamp(20px, 2vw, 28px)", color: "white",
                  lineHeight: 1.1, margin: 0, letterSpacing: "-0.5px",
                }}>{r.title}</h3>
                <p style={{ fontSize: "15px", lineHeight: 1.85, color: CREAM, fontWeight: 300, margin: 0 }}>{r.body}</p>
              </div>
            ))}
            <div style={{ height: "1px", background: "rgba(255,255,255,0.06)" }} />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          RITUAL BANNER — the keepsake moment
          Full bleed image, centre quote
      ══════════════════════════════════════════════ */}
      <section style={{ position: "relative", overflow: "hidden", minHeight: "380px", display: "flex", alignItems: "center" }}>
        <img src={IMGS.ritual} alt="The Keepsake Ritual"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, rgba(14,26,31,0.92) 0%, rgba(44,140,124,0.6) 100%)` }} />
        <div className="ct-grain" style={{ zIndex: 1 }} />
        <div style={{ position: "relative", zIndex: 2, padding: "80px 5vw", textAlign: "center", width: "100%" }}>
          <span style={{ fontSize: "9px", letterSpacing: "3px", color: `rgba(196,164,78,0.7)`, display: "block", marginBottom: "24px" }}>
            THE KEEPSAKE RITUAL
          </span>
          <p style={{
            fontFamily: "var(--font-display)", fontStyle: "italic",
            fontSize: "clamp(20px, 3vw, 36px)", lineHeight: 1.45,
            color: "white", maxWidth: "680px", margin: "0 auto 28px",
            letterSpacing: "-0.5px",
          }}>
            "At the close of every session, our guest receives a branded tin of that episode's tea — a beautiful, lasting reminder of the conversation, and of your brand."
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ display: "flex", height: "4px", width: "80px", overflow: "hidden" }}>
              {[GOLD, TEAL, GOLD, TEAL, GOLD].map((c, i) => (
                <div key={i} style={{ flex: 1, background: c }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          PARTNERSHIP TIERS — three options
          Premium card treatment, clear hierarchy
      ══════════════════════════════════════════════ */}
      <section id="tiers" ref={tiersRef} style={{ background: MID, padding: "100px 5vw" }}>
        <div style={{ maxWidth: "1300px", margin: "0 auto" }}>
          <div style={{
            marginBottom: "64px",
            opacity: tiersVis ? 1 : 0, transform: tiersVis ? "none" : "translateY(16px)",
            transition: "opacity 0.6s, transform 0.6s",
          }}>
            <div style={{ height: "1px", background: "rgba(196,164,78,0.2)", marginBottom: "32px" }} />
            <span style={{ fontSize: "9px", letterSpacing: "3px", color: MUTED, display: "block", marginBottom: "16px" }}>PARTNERSHIP TIERS</span>
            <h2 style={{
              fontFamily: "var(--font-display)", fontWeight: 700, fontStyle: "italic",
              fontSize: "clamp(28px, 3.5vw, 48px)", color: "white",
              lineHeight: 0.95, letterSpacing: "-1px", margin: 0,
            }}>Choose your seat.</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2px", background: "rgba(196,164,78,0.06)" }}>
            {TIERS.map((tier, i) => (
              <div key={tier.name} style={{
                background: tier.featured ? PANEL : DARK,
                padding: "52px 40px",
                position: "relative", overflow: "hidden",
                borderTop: `3px solid ${tier.featured ? GOLD : "rgba(44,140,124,0.4)"}`,
                opacity: tiersVis ? 1 : 0, transform: tiersVis ? "none" : "translateY(24px)",
                transition: `opacity 0.6s ${0.1 + i * 0.12}s, transform 0.6s ${0.1 + i * 0.12}s`,
              }}>

                {/* Featured badge */}
                {tier.featured && (
                  <div style={{
                    position: "absolute", top: "20px", right: "20px",
                    background: GOLD, color: DARK,
                    padding: "4px 10px", fontSize: "8px", letterSpacing: "2px", fontWeight: 700,
                  }}>PREMIER</div>
                )}

                {/* Tier name */}
                <span style={{ fontSize: "9px", letterSpacing: "2.5px", color: tier.accent, display: "block", marginBottom: "8px", fontWeight: 600 }}>
                  {tier.name}
                </span>
                <h3 style={{
                  fontFamily: "var(--font-display)", fontWeight: 700, fontStyle: "italic",
                  fontSize: "clamp(22px, 2.5vw, 30px)", color: "white",
                  lineHeight: 1.1, margin: "0 0 8px 0", letterSpacing: "-0.5px",
                }}>{tier.type}</h3>

                {/* Gold rule */}
                <div style={{ width: "24px", height: "2px", background: tier.accent, margin: "20px 0 24px" }} />

                {/* Perks list */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {tier.perks.map((perk, pi) => (
                    <div key={pi} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                      <span style={{ color: tier.accent, fontSize: "12px", flexShrink: 0, marginTop: "2px" }}>—</span>
                      <span style={{ fontSize: "13px", lineHeight: 1.7, color: CREAM, fontWeight: 300 }}>{perk}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <a href="#partner-form" style={{
                  display: "inline-block", marginTop: "36px",
                  padding: "11px 28px",
                  background: tier.featured ? GOLD : "transparent",
                  border: `1px solid ${tier.featured ? GOLD : "rgba(196,164,78,0.25)"}`,
                  color: tier.featured ? DARK : CREAM,
                  textDecoration: "none", fontSize: "9px",
                  letterSpacing: "2.5px", fontWeight: 700,
                  transition: "opacity 0.2s",
                }}
                  onMouseEnter={e => e.currentTarget.style.opacity = "0.8"}
                  onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                >ENQUIRE →</a>
              </div>
            ))}
          </div>

          {/* Small print */}
          <p style={{ fontSize: "12px", color: MUTED, marginTop: "24px", lineHeight: 1.7 }}>
            All tiers are subject to brand alignment review. Custom packages are available for brands with specific requirements. Pricing discussed on enquiry.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          CONTACT FORM — the close
          Clean, professional, no friction
      ══════════════════════════════════════════════ */}
      <section id="partner-form" ref={formRef} style={{ background: DARK, padding: "100px 5vw" }}>
        <div style={{ maxWidth: "1300px", margin: "0 auto" }}>
          <div style={{ height: "1px", background: "rgba(196,164,78,0.2)", marginBottom: "48px" }} />
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: "100px", alignItems: "start",
          }}>

            {/* Left — closing pitch */}
            <div style={{
              opacity: formVis ? 1 : 0, transform: formVis ? "none" : "translateX(-20px)",
              transition: "opacity 0.8s, transform 0.8s",
            }}>
              <span style={{ fontSize: "9px", letterSpacing: "3px", color: MUTED, display: "block", marginBottom: "20px" }}>
                LET'S WORK TOGETHER
              </span>
              <h2 style={{
                fontFamily: "var(--font-display)", fontWeight: 700,
                fontSize: "clamp(28px, 3.5vw, 52px)", color: "white",
                lineHeight: 0.95, letterSpacing: "-1.5px", marginBottom: "28px",
              }}>
                Ready to be at<br />
                <span style={{ color: GOLD, fontStyle: "italic" }}>the table?</span>
              </h2>
              <p style={{ fontSize: "15px", lineHeight: 1.9, color: CREAM, fontWeight: 300, maxWidth: "380px", marginBottom: "40px" }}>
                Tell us about your brand and what you're looking for. We'll review your enquiry and respond within 3–5 business days.
              </p>

              {/* Trust signals */}
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {[
                  "Exclusive partnerships only — limited availability per season",
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
