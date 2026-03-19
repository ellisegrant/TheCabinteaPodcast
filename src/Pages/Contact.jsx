import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WaveLine from "../components/WaveLine";

/* ─── Scroll reveal hook ─── */
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

/* ─── Typography helpers (mirrors Home.jsx) ─── */
const display = { fontFamily: "var(--font-display, 'Cormorant Garant', Georgia, serif)" };
const body    = { fontFamily: "var(--font-body, 'DM Sans', sans-serif)" };
const label   = { ...body, fontSize: "10px", letterSpacing: "3.5px", textTransform: "uppercase", fontWeight: 400 };

/* ─── Floating label input ─── */
function FloatingField({ id, label: labelText, type = "text", as = "input", required, value, onChange }) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;
  const Tag = as;

  const baseStyle = {
    ...body,
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: `1.5px solid ${focused ? "var(--gold)" : "rgba(214,207,194,0.25)"}`,
    outline: "none",
    color: "var(--cream)",
    fontSize: "15px",
    fontWeight: 300,
    padding: as === "textarea" ? "28px 0 10px" : "24px 0 8px",
    resize: "none",
    lineHeight: 1.7,
    transition: "border-color 0.25s",
    display: "block",
  };

  return (
    <div style={{ position: "relative", marginBottom: "36px" }}>
      <label
        htmlFor={id}
        style={{
          ...label,
          position: "absolute",
          top: active ? "0px" : (as === "textarea" ? "28px" : "24px"),
          fontSize: active ? "9px" : "11px",
          color: active ? "var(--gold)" : "rgba(214,207,194,0.45)",
          letterSpacing: active ? "3px" : "2px",
          transition: "all 0.22s ease",
          pointerEvents: "none",
        }}
      >
        {labelText}{required && " *"}
      </label>
      <Tag
        id={id}
        name={id}
        type={type}
        required={required}
        value={value}
        rows={as === "textarea" ? 4 : undefined}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={baseStyle}
      />
    </div>
  );
}

/* ─── Contact info card ─── */
function InfoCard({ icon, title, lines, href, delay, visible }) {
  return (
    <a
      href={href || "#"}
      target={href && href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      className={`ct-reveal ${visible ? "ct-visible" : ""}`}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "18px",
        padding: "24px 0",
        borderBottom: "1px solid rgba(214,207,194,0.1)",
        textDecoration: "none",
        transitionDelay: delay,
        cursor: href ? "pointer" : "default",
        // hover handled via CSS class
      }}
    >
      <div
        style={{
          width: "42px",
          height: "42px",
          flexShrink: 0,
          border: "1.5px solid var(--gold)",
          borderRadius: "4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--gold)",
        }}
      >
        {icon}
      </div>
      <div>
        <p style={{ ...label, color: "var(--teal)", marginBottom: "6px" }}>{title}</p>
        {lines.map((l, i) => (
          <p
            key={i}
            style={{
              ...body,
              fontWeight: i === 0 ? 400 : 300,
              fontSize: i === 0 ? "15px" : "13px",
              color: i === 0 ? "var(--cream)" : "rgba(214,207,194,0.5)",
              lineHeight: 1.5,
              marginBottom: "2px",
            }}
          >
            {l}
          </p>
        ))}
      </div>
    </a>
  );
}

/* ─── Icons ─── */
const MailIcon = () => (
  <svg width="18" height="14" viewBox="0 0 18 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="1" width="16" height="12" rx="2" />
    <path d="M1 3l8 5 8-5" />
  </svg>
);
const LocationIcon = () => (
  <svg width="14" height="18" viewBox="0 0 14 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 1C4.24 1 2 3.24 2 6c0 4.25 5 11 5 11s5-6.75 5-11c0-2.76-2.24-5-5-5z" />
    <circle cx="7" cy="6" r="2" />
  </svg>
);
const MicIcon = () => (
  <svg width="14" height="20" viewBox="0 0 14 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="1" width="6" height="10" rx="3" />
    <path d="M1 9c0 3.31 2.69 6 6 6s6-2.69 6-6" />
    <line x1="7" y1="15" x2="7" y2="19" />
    <line x1="4" y1="19" x2="10" y2="19" />
  </svg>
);
const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="1" width="16" height="16" rx="4" />
    <circle cx="9" cy="9" r="4" />
    <circle cx="13.5" cy="4.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);
const CheckIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="20" cy="20" r="18" />
    <path d="M12 20l6 6 10-12" />
  </svg>
);

const IMG_OCEAN = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1400&q=80";
const IMG_ACCRA = "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=900&q=80";

/* ══════════════════════════════════════════
   CONTACT PAGE
══════════════════════════════════════════ */
export default function Contact() {
  const [formRef, formVis] = useReveal(0.05);
  const [infoRef, infoVis] = useReveal(0.05);

  const [fields, setFields] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const set = (key) => (e) => setFields((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => { setSending(false); setSubmitted(true); }, 1600);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--dark)" }}>
      <Navbar />

      {/* ═══ HERO HEADER ═══ */}
      <section className="relative overflow-hidden" style={{ minHeight: "380px" }}>
        <img
          src={IMG_OCEAN}
          alt="Ocean"
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }}
        />
        {/* Flat dark overlay */}
        <div style={{ position: "absolute", inset: 0, background: "rgba(21,42,47,0.84)" }} />
        {/* Bottom fade */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "120px", background: "linear-gradient(to top, var(--dark), transparent)" }} />
        <div className="ct-grain" style={{ zIndex: 1 }} />

        {/* Gold vertical rule — decorative left accent */}
        <div style={{
          position: "absolute",
          left: "clamp(24px, 6vw, 80px)",
          top: "50%",
          transform: "translateY(-50%)",
          width: "2px",
          height: "120px",
          background: "var(--gold)",
          opacity: 0.7,
          zIndex: 2,
        }} />

        <div
          className="relative flex flex-col justify-center"
          style={{
            zIndex: 3,
            minHeight: "380px",
            paddingLeft: "clamp(48px, 9vw, 120px)",
            paddingRight: "clamp(24px, 6vw, 80px)",
            paddingTop: "80px",
            paddingBottom: "60px",
          }}
        >
          <span style={{ ...label, color: "var(--teal)", display: "block", marginBottom: "16px" }}>
            GET IN TOUCH
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
            Contact<br />
            <span style={{ fontStyle: "italic", color: "var(--gold)" }}>Us.</span>
          </h1>
          <div style={{ maxWidth: "200px" }}>
            <WaveLine color="rgba(196,164,78,0.5)" />
          </div>
        </div>
      </section>

      {/* ═══ MAIN CONTENT — Info left, Form right ═══ */}
      <section style={{ background: "var(--dark)", flex: 1 }}>
        <div
          className="flex flex-col lg:flex-row max-w-7xl mx-auto"
          style={{ padding: "clamp(48px, 7vw, 96px) clamp(24px, 6vw, 80px)", gap: "clamp(40px, 6vw, 96px)" }}
        >

          {/* ─── LEFT — Contact info ─── */}
          <div ref={infoRef} style={{ flex: "0 1 420px" }}>

            {/* Intro blurb */}
            <div className={`ct-reveal ${infoVis ? "ct-visible" : ""}`} style={{ transitionDelay: "0.1s", marginBottom: "40px" }}>
              <h2
                style={{
                  ...display,
                  fontStyle: "italic",
                  fontWeight: 700,
                  fontSize: "clamp(22px, 2.5vw, 30px)",
                  color: "var(--cream)",
                  lineHeight: 1.25,
                  marginBottom: "14px",
                }}
              >
                We'd love to hear from you.
              </h2>
              <p
                style={{
                  ...body,
                  fontWeight: 300,
                  fontSize: "14.5px",
                  lineHeight: 1.9,
                  color: "rgba(214,207,194,0.58)",
                  maxWidth: "380px",
                }}
              >
                Whether you're a potential guest, a tea brand looking to partner, a journalist,
                or simply a listener — pull up a chair. Our inbox is always open.
              </p>
            </div>

            {/* Info cards */}
            <div style={{ borderTop: "1px solid rgba(214,207,194,0.1)" }}>
              <InfoCard
                visible={infoVis}
                delay="0.2s"
                icon={<MailIcon />}
                title="General Enquiries"
                lines={["hello@cabintea.com", "We reply within 48 hours"]}
                href="mailto:hello@cabintea.com"
              />
              <InfoCard
                visible={infoVis}
                delay="0.3s"
                icon={<MicIcon />}
                title="Guest & Partnership"
                lines={["partners@cabintea.com", "For brands, sponsorships & guest bookings"]}
                href="mailto:partners@cabintea.com"
              />
              <InfoCard
                visible={infoVis}
                delay="0.4s"
                icon={<LocationIcon />}
                title="Based In"
                lines={["Accra, Ghana", "Recorded live at the Gulf of Guinea"]}
                href={null}
              />
              <InfoCard
                visible={infoVis}
                delay="0.5s"
                icon={<InstagramIcon />}
                title="Follow Along"
                lines={["@cabintea", "Behind-the-scenes, clips & announcements"]}
                href="https://instagram.com/cabintea"
              />
            </div>

            {/* Location image */}
            <div
              className={`ct-reveal ${infoVis ? "ct-visible" : ""}`}
              style={{
                marginTop: "40px",
                borderRadius: "6px",
                overflow: "hidden",
                height: "200px",
                position: "relative",
                transitionDelay: "0.6s",
              }}
            >
              <img
                src={IMG_ACCRA}
                alt="Accra coastline"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 60%" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "rgba(21,42,47,0.45)" }} />
              <div
                style={{
                  position: "absolute",
                  bottom: "16px",
                  left: "18px",
                }}
              >
                <span style={{ ...label, color: "var(--gold)", fontSize: "9px" }}>LIVE FROM ACCRA, GHANA</span>
              </div>
              {/* Gold corner accent */}
              <div style={{ position: "absolute", top: 0, left: 0, width: "40px", height: "2px", background: "var(--gold)" }} />
              <div style={{ position: "absolute", top: 0, left: 0, width: "2px", height: "40px", background: "var(--gold)" }} />
            </div>
          </div>

          {/* ─── RIGHT — Form ─── */}
          <div ref={formRef} style={{ flex: 1, minWidth: 0 }}>
            <div
              className={`ct-reveal ${formVis ? "ct-visible" : ""}`}
              style={{
                transitionDelay: "0.15s",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(214,207,194,0.1)",
                borderTop: "2px solid var(--gold)",
                borderRadius: "6px",
                padding: "clamp(28px, 5vw, 52px)",
              }}
            >
              {!submitted ? (
                <>
                  <span style={{ ...label, color: "var(--teal)", display: "block", marginBottom: "10px" }}>
                    SEND A MESSAGE
                  </span>
                  <h3
                    style={{
                      ...display,
                      fontStyle: "italic",
                      fontWeight: 700,
                      fontSize: "clamp(20px, 2.5vw, 28px)",
                      color: "var(--cream)",
                      marginBottom: "36px",
                      lineHeight: 1.2,
                    }}
                  >
                    Tell us what's on your mind.
                  </h3>

                  <form onSubmit={handleSubmit}>
                    {/* Name + Email side by side on large screens */}
                    <div className="flex flex-col sm:flex-row gap-0 sm:gap-8">
                      <div style={{ flex: 1 }}>
                        <FloatingField id="name"    label="Your Name"     required value={fields.name}    onChange={set("name")} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <FloatingField id="email"   label="Email Address" required type="email" value={fields.email}   onChange={set("email")} />
                      </div>
                    </div>

                    {/* Subject — custom select styled to match */}
                    <div style={{ position: "relative", marginBottom: "36px" }}>
                      <label
                        htmlFor="subject"
                        style={{
                          ...label,
                          display: "block",
                          marginBottom: "10px",
                          color: "rgba(214,207,194,0.45)",
                          fontSize: "9px",
                          letterSpacing: "3px",
                        }}
                      >
                        SUBJECT *
                      </label>
                      <select
                        id="subject"
                        required
                        value={fields.subject}
                        onChange={set("subject")}
                        style={{
                          ...body,
                          width: "100%",
                          background: "transparent",
                          border: "none",
                          borderBottom: "1.5px solid rgba(214,207,194,0.25)",
                          outline: "none",
                          color: fields.subject ? "var(--cream)" : "rgba(214,207,194,0.4)",
                          fontSize: "15px",
                          fontWeight: 300,
                          padding: "8px 0",
                          appearance: "none",
                          cursor: "pointer",
                        }}
                      >
                        <option value="" disabled style={{ background: "var(--dark)" }}>Select a topic…</option>
                        <option value="general"     style={{ background: "var(--dark)" }}>General Enquiry</option>
                        <option value="guest"       style={{ background: "var(--dark)" }}>Guest Nomination</option>
                        <option value="partnership" style={{ background: "var(--dark)" }}>Brand Partnership</option>
                        <option value="press"       style={{ background: "var(--dark)" }}>Press & Media</option>
                        <option value="feedback"    style={{ background: "var(--dark)" }}>Listener Feedback</option>
                        <option value="other"       style={{ background: "var(--dark)" }}>Other</option>
                      </select>
                      {/* Arrow */}
                      <div style={{
                        position: "absolute",
                        right: "0",
                        bottom: "12px",
                        pointerEvents: "none",
                        color: "var(--gold)",
                      }}>
                        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                          <path d="M1 1l5 5 5-5" />
                        </svg>
                      </div>
                    </div>

                    <FloatingField
                      id="message"
                      label="Your Message"
                      as="textarea"
                      required
                      value={fields.message}
                      onChange={set("message")}
                    />

                    {/* Fine print */}
                    <p style={{ ...body, fontWeight: 300, fontSize: "12px", color: "rgba(214,207,194,0.35)", lineHeight: 1.7, marginBottom: "28px" }}>
                      We read every message personally. Expect a reply within 2 business days.
                      Partnership enquiries may take slightly longer.
                    </p>

                    {/* Submit button */}
                    <button
                      type="submit"
                      disabled={sending}
                      style={{
                        ...label,
                        letterSpacing: "3px",
                        background: sending ? "rgba(196,164,78,0.6)" : "var(--gold)",
                        color: "var(--dark)",
                        border: "none",
                        padding: "16px 40px",
                        cursor: sending ? "not-allowed" : "pointer",
                        borderRadius: "2px",
                        transition: "background 0.25s, opacity 0.25s",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "10px",
                        fontSize: "11px",
                      }}
                    >
                      {sending ? (
                        <>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ animation: "spin 1s linear infinite" }}>
                            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                          </svg>
                          SENDING…
                        </>
                      ) : "SEND MESSAGE →"}
                    </button>
                  </form>
                </>
              ) : (
                /* ─── Success state ─── */
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "40px 20px",
                    minHeight: "420px",
                  }}
                >
                  <CheckIcon />
                  <h3
                    style={{
                      ...display,
                      fontStyle: "italic",
                      fontWeight: 700,
                      fontSize: "clamp(22px, 2.5vw, 32px)",
                      color: "var(--cream)",
                      marginTop: "24px",
                      marginBottom: "14px",
                      lineHeight: 1.2,
                    }}
                  >
                    Message received.
                  </h3>
                  <p
                    style={{
                      ...body,
                      fontWeight: 300,
                      fontSize: "15px",
                      lineHeight: 1.85,
                      color: "rgba(214,207,194,0.55)",
                      maxWidth: "360px",
                      marginBottom: "32px",
                    }}
                  >
                    Thank you for reaching out. We'll get back to you within 48 hours —
                    in the meantime, why not pour yourself a cup?
                  </p>
                  <div style={{ marginBottom: "32px", maxWidth: "160px" }}>
                    <WaveLine color="rgba(196,164,78,0.45)" />
                  </div>
                  <Link
                    to="/episodes"
                    style={{
                      ...label,
                      letterSpacing: "3px",
                      color: "var(--gold)",
                      textDecoration: "none",
                      borderBottom: "1px solid rgba(196,164,78,0.35)",
                      paddingBottom: "2px",
                      fontSize: "11px",
                    }}
                  >
                    EXPLORE EPISODES →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FAQ strip ═══ */}
      <section style={{ background: "var(--dark-alt)", borderTop: "1px solid rgba(214,207,194,0.08)" }}>
        <div
          className="max-w-7xl mx-auto"
          style={{ padding: "clamp(40px, 6vw, 80px) clamp(24px, 6vw, 80px)" }}
        >
          <div style={{ marginBottom: "40px" }}>
            <span style={{ ...label, color: "var(--teal)", display: "block", marginBottom: "12px" }}>QUICK ANSWERS</span>
            <h2 style={{ ...display, fontStyle: "italic", fontWeight: 700, fontSize: "clamp(24px, 3vw, 36px)", color: "var(--cream)" }}>
              Common questions.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                q: "How do I nominate a guest?",
                a: "Use the form above and select "Guest Nomination." Tell us who they are, why their story matters to the ocean, and how we can reach them.",
              },
              {
                q: "Can I attend a live recording?",
                a: "Yes — live recordings are open to a limited audience. Follow us on Instagram for announcements and ticket releases.",
              },
              {
                q: "How do brand partnerships work?",
                a: "We work exclusively with organic and herbal tea brands. Select "Brand Partnership" in the form and we'll send our media kit.",
              },
              {
                q: "Where are episodes recorded?",
                a: "All episodes are recorded live in Accra, Ghana, at the edge of the Gulf of Guinea. The sea is never far.",
              },
              {
                q: "Is Cabin Tea available on all platforms?",
                a: "Episodes are available on YouTube, Spotify, and Apple Podcasts. New episodes drop every two weeks.",
              },
              {
                q: "Can I republish or excerpt an episode?",
                a: "Press and media are welcome to excerpt up to 90 seconds with attribution. For longer use, please contact us directly.",
              },
            ].map((faq, i) => (
              <div
                key={i}
                style={{
                  borderLeft: "2px solid var(--gold)",
                  paddingLeft: "20px",
                }}
              >
                <p style={{ ...display, fontWeight: 600, fontSize: "17px", color: "var(--cream)", marginBottom: "10px", lineHeight: 1.3 }}>
                  {faq.q}
                </p>
                <p style={{ ...body, fontWeight: 300, fontSize: "13.5px", lineHeight: 1.8, color: "rgba(214,207,194,0.52)" }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spin keyframe for loader */}
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <Footer />
    </div>
  );
}
