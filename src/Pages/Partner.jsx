import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WaveLine from "../components/WaveLine";

function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

export default function Partner() {
  const [heroRef, heroVis] = useReveal(0.05);
  const [contentRef, contentVis] = useReveal(0.1);
  const [ritualRef, ritualVis] = useReveal(0.15);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* ═══ HERO BANNER ═══ */}
      <section ref={heroRef} className="relative overflow-hidden" style={{ height: "45vh", minHeight: "320px" }}>
        <img src="https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=1400&q=80" alt="Tea ceremony" className="absolute top-0 left-0 w-full h-full object-cover" />
        <div className="absolute top-0 left-0 w-full h-full" style={{ background: "linear-gradient(135deg, rgba(21,42,47,0.9) 30%, rgba(30,107,95,0.7) 100%)" }} />
        <div className="ct-grain" />

        <div className={`ct-reveal ${heroVis ? "ct-visible" : ""} relative flex flex-col justify-end h-full p-6 md:p-12 lg:p-16 pb-14`} style={{ zIndex: 2, transitionDelay: "0.1s" }}>
          <span className="font-medium block mb-2" style={{ fontSize: "11px", letterSpacing: "4px", color: "var(--gold)" }}>PARTNER WITH US</span>
          <h1 className="font-display italic font-bold" style={{ fontSize: "clamp(30px, 4.5vw, 50px)", color: "white", lineHeight: 1.1 }}>
            More than a sponsor.<br className="ct-hide-mobile" /> A seat at the table.
          </h1>
        </div>
      </section>

      {/* ═══ CONTENT ═══ */}
      <section ref={contentRef} className="relative" style={{ background: "var(--cream)" }}>
        <div className="flex flex-col lg:flex-row">
          {/* Left: Description */}
          <div className={`ct-reveal ${contentVis ? "ct-visible" : ""} lg:w-1/2 p-8 md:p-14 lg:p-16`} style={{ transitionDelay: "0.15s" }}>
            <p className="font-light mb-6" style={{ fontSize: "16px", lineHeight: 1.85, color: "var(--dark)", maxWidth: "480px" }}>
              Cabin Tea partners exclusively with organic and herbal tea companies whose values align with ours — sustainability, storytelling, and the ocean. Your product is not a backdrop. It is part of the experience.
            </p>
            <div className="mb-8" style={{ maxWidth: "350px" }}><WaveLine /></div>

            {/* Keepsake Ritual */}
            <div className="ct-quote mb-8" style={{ maxWidth: "480px" }}>
              <span className="font-medium block mb-3" style={{ fontSize: "11px", letterSpacing: "3px", color: "var(--teal)" }}>THE KEEPSAKE RITUAL</span>
              <p className="font-serif italic" style={{ fontSize: "17px", lineHeight: 1.75, color: "var(--dark)" }}>
                At the close of every session, our guest receives a branded tin of that episode's tea — a beautiful, lasting reminder of the conversation, and of your brand.
              </p>
            </div>

            <button className="ct-btn-cta py-4 px-10 font-medium text-xs cursor-pointer" style={{ letterSpacing: "3px", background: "var(--dark)", color: "var(--cream)", border: "none" }}>
              GET IN TOUCH →
            </button>
          </div>

          {/* Right: Tiers */}
          <div className={`ct-reveal-right ${contentVis ? "ct-visible" : ""} lg:w-1/2 p-8 md:p-14 lg:p-16 flex flex-col gap-5`} style={{ transitionDelay: "0.3s" }}>
            {[
              { name: "FOUNDING BLEND", type: "Season Partner", desc: "Full season tea integration · Branded keepsake tin for every guest · Logo on all platforms · Co-branded social content", highlight: true },
              { name: "SINGLE ORIGIN", type: "Episode Partner", desc: "Tea integration per episode · Keepsake tin for featured guest · Logo on episode artwork · Intro mention" },
              { name: "TEA HOUSE", type: "Venue & Experience Partner", desc: "Branding at live event space · Product sampling for audience · Social media feature · Community association" },
            ].map((tier) => (
              <div key={tier.name} className="ct-tier-card rounded-lg p-6 relative overflow-hidden" style={{
                background: tier.highlight ? "var(--teal-dark)" : "var(--dark)",
                borderLeft: `4px solid ${tier.highlight ? "var(--gold)" : "var(--teal)"}`,
              }}>
                {tier.highlight && (
                  <span className="absolute top-3 right-3 py-1 px-2 rounded-sm font-medium" style={{ fontSize: "8px", letterSpacing: "1.5px", background: "var(--gold)", color: "var(--dark)" }}>
                    FEATURED
                  </span>
                )}
                <h3 className="font-medium mb-1" style={{ fontSize: "15px", letterSpacing: "2.5px", color: "var(--gold)" }}>{tier.name}</h3>
                <p className="font-serif italic mb-3" style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)" }}>{tier.type}</p>
                <p className="font-light" style={{ fontSize: "14px", lineHeight: 1.75, color: "var(--text-main)" }}>{tier.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ IMAGE BANNER ═══ */}
      <section ref={ritualRef} className="relative overflow-hidden" style={{ height: "300px" }}>
        <img src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1400&q=80" alt="Coast" className="absolute top-0 left-0 w-full h-full object-cover" />
        <div className="absolute top-0 left-0 w-full h-full" style={{ background: "linear-gradient(135deg, rgba(30,107,95,0.85) 0%, rgba(21,42,47,0.8) 100%)" }} />
        <div className={`ct-reveal ${ritualVis ? "ct-visible" : ""} relative flex items-center justify-center h-full text-center px-6`} style={{ zIndex: 2, transitionDelay: "0.1s" }}>
          <div>
            <div className="mx-auto mb-5" style={{ maxWidth: "160px" }}><WaveLine color="rgba(196,164,78,0.6)" /></div>
            <p className="font-serif italic" style={{ fontSize: "clamp(20px, 2.5vw, 28px)", lineHeight: 1.5, color: "var(--cream)", maxWidth: "500px" }}>
              "Your product is not a backdrop. It is woven into the story."
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}