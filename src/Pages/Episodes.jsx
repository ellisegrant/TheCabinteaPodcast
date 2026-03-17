import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PlayIcon from "../components/PlayIcon";

function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

const episodes = [
  { num: "01", guest: "Amara Diallo", role: "Maritime Lawyer", location: "Dakar", title: '"Who Really Owns the Sea?"', tag: "Governance", season: 1, img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80" },
  { num: "02", guest: "Kofi Mensah", role: "Documentary Filmmaker", location: "Accra", title: '"The Last Fisher"', tag: "Community", season: 1, img: "https://images.unsplash.com/photo-1504164996022-09080787b6b3?w=600&q=80" },
  { num: "03", guest: "Nkechi Obi", role: "Marine Economist", location: "Lagos", title: '"Blue Money"', tag: "Blue Economy", season: 1, img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80" },
];

const filters = ["All Episodes", "Season 1", "Most Recent"];

export default function Episodes() {
  const [activeFilter, setActiveFilter] = useState("All Episodes");
  const [gridRef, gridVis] = useReveal(0.05);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--dark)" }}>
      <Navbar />

      {/* ═══ HEADER — with background image ═══ */}
      <section className="relative overflow-hidden" style={{ height: "35vh", minHeight: "260px" }}>
        <img src="https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1400&q=80" alt="Ocean" className="absolute top-0 left-0 w-full h-full object-cover" />
        <div className="absolute top-0 left-0 w-full h-full" style={{ background: "linear-gradient(to top, var(--dark) 10%, rgba(21,42,47,0.6) 50%, rgba(21,42,47,0.75) 100%)" }} />
        <div className="ct-grain" />

        <div className="anim-fade-up relative flex flex-col justify-end h-full p-6 md:p-12 lg:p-16 pb-12" style={{ zIndex: 2 }}>
          <span className="font-medium block mb-2" style={{ fontSize: "11px", letterSpacing: "4px", color: "var(--gold)" }}>EPISODES</span>
          <h1 className="font-serif italic" style={{ fontSize: "clamp(26px, 4vw, 42px)", color: "var(--cream)", lineHeight: 1.2 }}>
            Every conversation. Every cup.
          </h1>
        </div>
      </section>

      {/* ═══ FILTERS ═══ */}
      <section className="px-6 md:px-12 lg:px-16 py-6">
        <div className="flex gap-3 flex-wrap">
          {filters.map((f) => (
            <button key={f} onClick={() => setActiveFilter(f)} className="ct-filter-tab py-2.5 px-6 text-xs font-medium cursor-pointer rounded-sm" style={{
              letterSpacing: "1.5px",
              background: activeFilter === f ? "var(--gold)" : "transparent",
              color: activeFilter === f ? "var(--dark)" : "var(--text-muted)",
              border: activeFilter === f ? "1px solid var(--gold)" : "1px solid rgba(138,158,165,0.25)",
            }}>
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* ═══ EPISODES GRID ═══ */}
      <section ref={gridRef} className="flex-1 px-6 md:px-12 lg:px-16 pb-16 pt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {episodes.map((ep, i) => (
            <div key={ep.num} className={`ct-reveal ${gridVis ? "ct-visible" : ""} ct-episode-card ct-image-card rounded-lg overflow-hidden flex flex-col`} style={{ transitionDelay: `${0.1 + i * 0.12}s` }}>
              {/* Image */}
              <div className="relative overflow-hidden" style={{ height: "220px" }}>
                <img src={ep.img} alt={ep.guest} className="ct-img-cover" />
                <div className="absolute top-0 left-0 w-full h-full" style={{ background: "linear-gradient(to top, var(--teal-dark) 5%, transparent 50%)" }} />
                <span className="absolute top-3 left-3 py-1.5 px-3 rounded-sm font-medium" style={{ fontSize: "10px", letterSpacing: "1.5px", background: "var(--gold)", color: "var(--dark)" }}>
                  {ep.tag.toUpperCase()}
                </span>
                <span className="absolute bottom-3 right-4 font-display font-bold italic" style={{ fontSize: "36px", color: "rgba(255,255,255,0.12)" }}>
                  EP. {ep.num}
                </span>
              </div>

              {/* Info */}
              <div className="p-6 flex flex-col flex-1">
                <p className="font-serif mb-0.5" style={{ fontSize: "14px", color: "var(--text-muted)" }}>Sipping with</p>
                <h3 className="font-display text-white font-bold mb-1.5" style={{ fontSize: "24px", lineHeight: 1.2 }}>{ep.guest}</h3>
                <p className="mb-3" style={{ fontSize: "12px", letterSpacing: "0.5px", color: "var(--gold)" }}>{ep.role} · {ep.location}</p>
                <p className="font-serif italic mb-6 flex-1" style={{ fontSize: "15px", lineHeight: 1.5, color: "var(--text-main)" }}>{ep.title}</p>
                <div className="flex items-center gap-3 mt-auto">
                  <PlayIcon size={36} />
                  <span className="font-medium" style={{ fontSize: "11px", letterSpacing: "2px", color: "var(--text-muted)" }}>PLAY · 60 MIN</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}