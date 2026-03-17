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

const IMG = {
  ocean: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1400&q=80",
  tea: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&q=80",
  conversation: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",
  coast: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1000&q=80",
};

export default function About() {
  const [heroRef, heroVis] = useReveal(0.05);
  const [showRef, showVis] = useReveal(0.1);
  const [quoteRef, quoteVis] = useReveal(0.15);
  const [hostRef, hostVis] = useReveal(0.1);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* ═══ HERO BANNER ═══ */}
      <section ref={heroRef} className="relative overflow-hidden" style={{ height: "45vh", minHeight: "320px" }}>
        <img src={IMG.ocean} alt="Ocean waves" className="absolute top-0 left-0 w-full h-full object-cover" />
        <div className="absolute top-0 left-0 w-full h-full" style={{ background: "linear-gradient(to top, var(--cream) 5%, rgba(21,42,47,0.5) 50%, rgba(21,42,47,0.7) 100%)" }} />
        <div className="ct-grain" />
        <div className={`ct-reveal ${heroVis ? "ct-visible" : ""} relative flex flex-col justify-end h-full p-6 md:p-12 lg:p-16 pb-14`} style={{ zIndex: 2, transitionDelay: "0.1s" }}>
          <span className="font-medium block mb-2" style={{ fontSize: "11px", letterSpacing: "4px", color: "var(--gold)" }}>ABOUT CABIN TEA</span>
          <h1 className="font-display italic font-bold" style={{ fontSize: "clamp(30px, 4.5vw, 48px)", color: "white", lineHeight: 1.15 }}>
            Every great conversation starts<br className="ct-hide-mobile" /> with a cup of tea.
          </h1>
        </div>
      </section>

      {/* ═══ THE SHOW ═══ */}
      <section ref={showRef} className="relative" style={{ background: "var(--cream)" }}>
        <div className="flex flex-col lg:flex-row">
          {/* Text */}
          <div className={`ct-reveal ${showVis ? "ct-visible" : ""} lg:w-1/2 p-8 md:p-14 lg:p-16 flex flex-col justify-center`} style={{ transitionDelay: "0.15s" }}>
            <span className="font-medium block mb-3" style={{ fontSize: "11px", letterSpacing: "4px", color: "var(--teal)" }}>THE SHOW</span>
            <div className="mb-6" style={{ maxWidth: "300px" }}><WaveLine /></div>

            <p className="font-light mb-5" style={{ fontSize: "15.5px", lineHeight: 1.85, color: "var(--dark)", maxWidth: "500px" }}>
              Cabin Tea is a live podcast series rooted in the Gulf of Guinea and the ocean communities of West Africa. We bring together the people who know the sea — marine scientists, fishers, maritime lawyers, port officers, and the artists, economists, and community leaders whose lives are shaped by the ocean.
            </p>
            <p className="font-light mb-6" style={{ fontSize: "15.5px", lineHeight: 1.85, color: "var(--dark)", maxWidth: "500px" }}>
              Each episode — <span className="font-serif italic" style={{ color: "var(--teal)" }}>Sipping with [Guest Name]</span> — is recorded live before a curated audience in Accra, and distributed globally on YouTube, Spotify and Apple Podcasts.
            </p>

            {/* Stats inline */}
            <div className="flex gap-8 flex-wrap">
              {[
                { val: "60", label: "MIN / EPISODE" },
                { val: "3+", label: "PLATFORMS" },
                { val: "Live", label: "FROM ACCRA" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <span className="font-display font-bold block" style={{ fontSize: "36px", color: "var(--teal-dark)", lineHeight: 1 }}>{s.val}</span>
                  <span className="font-medium block mt-1" style={{ fontSize: "9px", letterSpacing: "2px", color: "var(--text-muted)" }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className={`ct-reveal-right ${showVis ? "ct-visible" : ""} lg:w-1/2 relative overflow-hidden`} style={{ minHeight: "450px", transitionDelay: "0.3s" }}>
            <img src={IMG.tea} alt="Tea ceremony" className="ct-img-cover ct-img-zoom" style={{ position: "absolute", top: 0, left: 0 }} />
            <div className="absolute top-0 left-0 w-full h-full ct-hide-mobile" style={{ background: "linear-gradient(to left, transparent 70%, var(--cream) 100%)" }} />
          </div>
        </div>
      </section>

      {/* ═══ QUOTE SECTION ═══ */}
      <section ref={quoteRef} className="relative overflow-hidden py-20 px-6 md:px-12" style={{ background: "var(--dark)" }}>
        <div className="ct-grain" />
        <div className="absolute top-0 left-0 w-full h-full" style={{ opacity: 0.04 }}>
          <img src={IMG.coast} alt="" className="ct-img-cover" />
        </div>

        <div className={`ct-reveal ${quoteVis ? "ct-visible" : ""} relative max-w-3xl mx-auto text-center`} style={{ transitionDelay: "0.15s" }}>
          <div className="mx-auto mb-6" style={{ maxWidth: "180px" }}><WaveLine /></div>
          <p className="font-serif italic mb-6" style={{ fontSize: "clamp(22px, 3vw, 32px)", lineHeight: 1.5, color: "var(--cream)" }}>
            "The name matters. A ship's cabin is where honest conversations happen — below deck, away from performance, between people who trust each other. That's what we're building."
          </p>
          <span className="font-medium" style={{ fontSize: "12px", letterSpacing: "2px", color: "var(--gold)" }}>— CABIN TEA</span>
        </div>
      </section>

      {/* ═══ HOST ═══ */}
      <section ref={hostRef} className="relative" style={{ background: "var(--cream)" }}>
        <div className="flex flex-col lg:flex-row-reverse">
          {/* Host text */}
          <div className={`ct-reveal ${hostVis ? "ct-visible" : ""} lg:w-1/2 p-8 md:p-14 lg:p-16 flex flex-col justify-center`} style={{ transitionDelay: "0.15s" }}>
            <span className="font-medium block mb-3" style={{ fontSize: "11px", letterSpacing: "4px", color: "var(--teal)" }}>YOUR HOST</span>

            {/* Host avatar placeholder */}
            <div className="flex items-center gap-5 mb-6">
              <div className="shrink-0 rounded-full flex items-center justify-center" style={{ width: "80px", height: "80px", background: "var(--teal)", border: "3px solid var(--gold)" }}>
                <span className="font-medium" style={{ fontSize: "10px", letterSpacing: "2px", color: "var(--dark)" }}>HOST</span>
              </div>
              <div>
                <h3 className="font-display font-bold mb-0.5" style={{ fontSize: "24px", color: "var(--dark)" }}>Your Name</h3>
                <p style={{ fontSize: "13px", color: "var(--gold)", letterSpacing: "0.5px" }}>Host & Creator, Cabin Tea</p>
                <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>Gulf of Guinea Maritime Institute, Accra</p>
              </div>
            </div>

            <div className="mb-5" style={{ maxWidth: "250px" }}><WaveLine color="var(--teal)" /></div>

            <p className="font-serif italic" style={{ fontSize: "16px", lineHeight: 1.75, color: "rgba(21,42,47,0.65)", maxWidth: "460px" }}>
              Add your bio here — your background, your connection to the ocean, and what drove you to create Cabin Tea. This is your moment to make the audience feel like they already know you before the show even starts.
            </p>
          </div>

          {/* Image */}
          <div className={`ct-reveal-left ${hostVis ? "ct-visible" : ""} lg:w-1/2 relative overflow-hidden`} style={{ minHeight: "420px", transitionDelay: "0.3s" }}>
            <img src={IMG.conversation} alt="Podcast recording" className="ct-img-cover ct-img-zoom" style={{ position: "absolute", top: 0, left: 0 }} />
            <div className="absolute top-0 right-0 w-full h-full ct-hide-mobile" style={{ background: "linear-gradient(to right, transparent 70%, var(--cream) 100%)" }} />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}