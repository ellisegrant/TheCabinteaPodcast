import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WaveLine from "../components/WaveLine";
import CornerArc from "../components/CornerArc";

const tiers = [
  {
    name: "FOUNDING BLEND",
    type: "Season Partner",
    desc: "Full season tea integration · Branded keepsake tin for every guest · Logo on all platforms · Co-branded social content",
  },
  {
    name: "SINGLE ORIGIN",
    type: "Episode Partner",
    desc: "Tea integration per episode · Keepsake tin for featured guest · Logo on episode artwork · Intro mention",
  },
  {
    name: "TEA HOUSE",
    type: "Venue & Experience Partner",
    desc: "Branding at live event space · Product sampling for audience · Social media feature · Community association",
  },
];

export default function Partner() {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden">

      <Navbar activePage="PARTNER WITH US" />

      {/* ═══ PAGE HEADER ═══ */}
      <section className="px-6 md:px-12 pt-10 pb-10 relative overflow-hidden" style={{ background: "var(--dark)" }}>
        <CornerArc />
        <span
          className="font-medium block mb-3"
          style={{ fontSize: "12px", letterSpacing: "3px", color: "var(--text-muted)" }}
        >
          PARTNER WITH US
        </span>
        <h1
          className="font-display italic font-bold"
          style={{ fontSize: "clamp(28px, 4.5vw, 46px)", color: "var(--cream)", lineHeight: 1.2 }}
        >
          More than a sponsor. A seat at the table.
        </h1>
      </section>

      {/* ═══ MAIN CONTENT ═══ */}
      <section
        className="flex-1 flex flex-col lg:flex-row px-6 md:px-12 py-10 gap-10"
        style={{ background: "var(--cream)" }}
      >
        {/* ─── LEFT: Description + Ritual + CTA ─── */}
        <div className="lg:flex-1 anim-fade-up">
          <p
            className="mb-6 font-light"
            style={{ fontSize: "16px", lineHeight: 1.8, color: "var(--dark)", maxWidth: "520px" }}
          >
            Cabin Tea partners exclusively with organic and herbal tea companies
            whose values align with ours — sustainability, storytelling, and the
            ocean. Your product is not a backdrop. It is part of the experience.
          </p>

          <div className="mb-8" style={{ maxWidth: "420px" }}>
            <WaveLine />
          </div>

          {/* The Keepsake Ritual */}
          <div
            className="rounded p-6 mb-8"
            style={{
              borderLeft: "4px solid var(--teal)",
              background: "rgba(21,42,47,0.06)",
              maxWidth: "520px",
            }}
          >
            <span
              className="font-medium block mb-3"
              style={{ fontSize: "11px", letterSpacing: "3px", color: "var(--teal)" }}
            >
              THE KEEPSAKE RITUAL
            </span>
            <p
              className="font-serif italic"
              style={{ fontSize: "16px", lineHeight: 1.7, color: "var(--dark)" }}
            >
              At the close of every session, our guest receives a branded tin of
              that episode's tea — a beautiful, lasting reminder of the
              conversation, and of your brand.
            </p>
          </div>

          {/* CTA Button */}
          <button
            className="ct-btn-cta py-4 px-10 font-medium text-xs cursor-pointer"
            style={{
              letterSpacing: "3px",
              background: "var(--dark)",
              color: "var(--cream)",
              border: "none",
              transition: "all 0.3s ease",
            }}
          >
            GET IN TOUCH →
          </button>
        </div>

        {/* ─── RIGHT: Partnership Tiers ─── */}
        <div className="lg:flex-1 flex flex-col gap-5 anim-fade-up-d2" style={{ maxWidth: "520px" }}>
          {tiers.map((tier, i) => (
            <div
              key={tier.name}
              className={`ct-tier-card rounded p-6 anim-fade-up-d${i + 1}`}
              style={{
                background: "var(--teal-dark)",
                borderLeft: "4px solid var(--teal)",
              }}
            >
              <h3
                className="font-medium mb-1"
                style={{ fontSize: "16px", letterSpacing: "2.5px", color: "var(--gold)" }}
              >
                {tier.name}
              </h3>
              <p
                className="font-serif italic mb-3"
                style={{ fontSize: "14px", color: "rgba(255,255,255,0.75)" }}
              >
                {tier.type}
              </p>
              <p
                className="font-light"
                style={{ fontSize: "14px", lineHeight: 1.7, color: "var(--text-main)" }}
              >
                {tier.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}