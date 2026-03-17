import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WaveLine from "../components/WaveLine";
import EpisodeArtwork from "../components/EpisodeArtwork";
import PlayIcon from "../components/PlayIcon";

/* ─── Scroll reveal hook ─── */
function useReveal(threshold = 0.15) {
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

/* ─── Animated counter ─── */
function Counter({ value, suffix = "", label, visible }) {
  const [count, setCount] = useState(0);
  const num = parseInt(value) || 0;
  useEffect(() => {
    if (!visible || !num) return;
    let start = 0;
    const dur = 1400;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * num));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [visible, num]);
  return (
    <div className="text-center">
      <span className="font-display font-bold block" style={{ fontSize: "52px", color: "var(--gold)", lineHeight: 1 }}>
        {num ? count : value}{suffix}
      </span>
      <span className="block mt-2 font-medium" style={{ fontSize: "11px", letterSpacing: "2.5px", color: "var(--text-muted)" }}>
        {label}
      </span>
    </div>
  );
}

/* ─── Platform icons ─── */
function SpotifyIcon() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>;
}
function AppleIcon() {
  return <svg width="20" height="24" viewBox="0 0 20 24" fill="currentColor"><path d="M16.5 12.5c0-2.8 2.3-4.1 2.4-4.2-1.3-1.9-3.3-2.2-4-2.2-1.7-.2-3.4 1-4.2 1s-2.2-1-3.7-1C5.1 6.1 3.4 7.2 2.4 8.8.5 12.2 1.9 17.2 3.8 20c.9 1.3 2 2.8 3.5 2.8 1.4-.1 1.9-.9 3.6-.9s2.2.9 3.7.9 2.5-1.4 3.4-2.7c1.1-1.5 1.5-3 1.5-3.1-.1 0-2.9-1.1-3-4.5zM13.7 4.3c.8-1 1.3-2.3 1.1-3.6-1.1 0-2.5.7-3.3 1.7-.7.8-1.3 2.1-1.2 3.4 1.3.1 2.5-.6 3.4-1.5z"/></svg>;
}
function YoutubeIcon() {
  return <svg width="26" height="18" viewBox="0 0 26 18" fill="currentColor"><path d="M25.456 2.818A3.26 3.26 0 0023.162.51C21.13 0 13 0 13 0S4.87 0 2.838.51A3.26 3.26 0 00.544 2.818C0 4.862 0 9 0 9s0 4.138.544 6.182a3.26 3.26 0 002.294 2.308C4.87 18 13 18 13 18s8.13 0 10.162-.51a3.26 3.26 0 002.294-2.308C26 13.138 26 9 26 9s0-4.138-.544-6.182zM10.4 12.857V5.143L17.143 9 10.4 12.857z"/></svg>;
}

/* ─── Images ─── */
const IMG = {
  ocean: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1400&q=80",
  tea: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&q=80",
  coast: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=80",
  conversation: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",
  accra: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1200&q=80",
};

export default function Home() {
  const [heroRef, heroVis] = useReveal(0.05);
  const [aboutRef, aboutVis] = useReveal(0.1);
  const [statsRef, statsVis] = useReveal(0.2);
  const [epRef, epVis] = useReveal(0.1);
  const [sponsorRef, sponsorVis] = useReveal(0.1);
  const [ctaRef, ctaVis] = useReveal(0.1);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* ═══ HERO ═══ */}
      <section ref={heroRef} className="relative overflow-hidden" style={{ minHeight: "94vh", background: "var(--dark)" }}>
        {/* Background video */}
        <video autoPlay muted loop playsInline className="absolute top-0 left-0 w-full h-full object-cover" style={{ zIndex: 0 }}>
          <source src="/herovideo.mp4" type="video/mp4" />
        </video>

        {/* Overlays */}
        <div className="absolute top-0 left-0 w-full h-full" style={{ zIndex: 1, background: "linear-gradient(135deg, rgba(21,42,47,0.92) 30%, rgba(21,42,47,0.6) 70%, rgba(30,107,95,0.4) 100%)" }} />
        <div className="absolute bottom-0 left-0 w-full" style={{ zIndex: 1, height: "160px", background: "linear-gradient(to top, var(--dark), transparent)" }} />
        <div className="ct-grain" style={{ zIndex: 2 }} />

        <div className="relative flex flex-col lg:flex-row p-6 md:p-12 lg:p-16 gap-10 lg:gap-16" style={{ zIndex: 3, minHeight: "calc(94vh - 64px)" }}>

          {/* LEFT */}
          <div className="lg:flex-1 flex flex-col justify-center lg:pr-6">
            <span className={`ct-reveal ${heroVis ? "ct-visible" : ""} font-medium block mb-5`} style={{ fontSize: "11px", letterSpacing: "4px", color: "var(--teal)", transitionDelay: "0.1s" }}>
              A PODCAST FROM THE GULF OF GUINEA
            </span>

            <h1 className={`ct-reveal ${heroVis ? "ct-visible" : ""} font-display text-white font-black mb-4`} style={{ fontSize: "clamp(60px, 9vw, 130px)", lineHeight: 0.88, letterSpacing: "-3px", transitionDelay: "0.2s" }}>
              CABIN<br />TEA
            </h1>

            <p className={`ct-reveal ${heroVis ? "ct-visible" : ""} font-serif italic mb-5`} style={{ color: "var(--gold)", fontSize: "clamp(18px, 2.2vw, 26px)", lineHeight: 1.35, transitionDelay: "0.35s" }}>
              Sipping with the people who know the sea.
            </p>

            <div className={`ct-reveal ${heroVis ? "ct-visible" : ""} mb-8`} style={{ maxWidth: "350px", transitionDelay: "0.45s" }}>
              <WaveLine />
            </div>

            <p className={`ct-reveal ${heroVis ? "ct-visible" : ""} mb-8 font-light`} style={{ fontSize: "15.5px", lineHeight: 1.85, color: "rgba(214,207,194,0.75)", maxWidth: "460px", transitionDelay: "0.5s" }}>
              A live conversation series where ocean professionals and unexpected ocean-adjacent voices come together over a carefully chosen cup of tea.
            </p>

            <div className={`ct-reveal ${heroVis ? "ct-visible" : ""} flex gap-4 flex-wrap mb-9`} style={{ transitionDelay: "0.6s" }}>
              <Link to="/episodes" className="ct-btn-primary py-4 px-10 font-medium text-xs no-underline inline-block" style={{ letterSpacing: "3px" }}>
                LISTEN NOW
              </Link>
              <Link to="/partner" className="ct-btn-gold py-4 px-10 font-medium text-xs no-underline inline-block" style={{ letterSpacing: "3px" }}>
                PARTNER WITH US
              </Link>
            </div>

            <div className={`ct-reveal ${heroVis ? "ct-visible" : ""} flex items-center gap-6`} style={{ transitionDelay: "0.7s" }}>
              <span style={{ fontSize: "11px", letterSpacing: "2px", color: "var(--text-muted)" }}>LISTEN ON</span>
              <div className="flex items-center gap-5">
                <a href="#" className="ct-icon-link"><YoutubeIcon /></a>
                <a href="#" className="ct-icon-link"><SpotifyIcon /></a>
                <a href="#" className="ct-icon-link"><AppleIcon /></a>
              </div>
            </div>
          </div>

          {/* RIGHT — Latest Episode */}
          <div className={`ct-reveal ${heroVis ? "ct-visible" : ""} ct-episode-card rounded-lg p-7 pb-8 flex flex-col self-center relative overflow-hidden mt-4 lg:mt-0`} style={{ flex: "0 1 420px", maxWidth: "420px", transitionDelay: "0.4s" }}>
            <div className="absolute top-0 left-6 right-6 h-[3px]" style={{ background: "var(--gold)" }} />
            <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(44,140,124,0.12) 0%, transparent 40%)" }} />

            <span className="font-medium mb-4 relative" style={{ fontSize: "11px", letterSpacing: "3px", color: "rgba(255,255,255,0.55)" }}>LATEST EPISODE</span>

            <div className="ct-episode-artwork-wrap rounded-lg p-5 mb-5 relative">
              <EpisodeArtwork num="01" size={165} />
            </div>

            <p className="font-serif mb-0.5 relative" style={{ fontSize: "15px", color: "rgba(255,255,255,0.6)" }}>Sipping with</p>
            <h3 className="font-display text-white font-bold mb-2 leading-tight relative" style={{ fontSize: "24px" }}>Amara Diallo</h3>
            <p className="mb-3 relative" style={{ fontSize: "12px", letterSpacing: "1.5px", color: "var(--gold)" }}>Maritime Lawyer · Dakar</p>
            <p className="font-serif italic leading-relaxed mb-5 relative" style={{ fontSize: "14.5px", color: "rgba(214,207,194,0.65)" }}>
              "Who Really Owns the Sea?" — ocean governance, identity and the politics of West African waters.
            </p>
            <button className="ct-play-btn flex items-center gap-3.5 bg-transparent border-none p-0 cursor-pointer relative">
              <PlayIcon size={38} />
              <span className="font-medium text-xs" style={{ letterSpacing: "2.5px", color: "rgba(255,255,255,0.55)" }}>PLAY EPISODE</span>
            </button>
          </div>
        </div>
      </section>

      {/* ═══ ABOUT STRIP — Image left, text right ═══ */}
      <section ref={aboutRef} className="relative" style={{ background: "var(--cream)" }}>
        <div className="flex flex-col lg:flex-row">
          {/* Image */}
          <div className={`ct-reveal-left ${aboutVis ? "ct-visible" : ""} lg:w-1/2 relative overflow-hidden`} style={{ minHeight: "400px", transitionDelay: "0.1s" }}>
            <img src={IMG.tea} alt="Tea preparation" className="ct-img-cover ct-img-zoom" style={{ position: "absolute", top: 0, left: 0 }} />
            <div className="absolute top-0 left-0 w-full h-full" style={{ background: "linear-gradient(to right, transparent 60%, var(--cream) 100%)" }} />
          </div>
          {/* Text */}
          <div className={`ct-reveal-right ${aboutVis ? "ct-visible" : ""} lg:w-1/2 flex flex-col justify-center p-8 md:p-14 lg:p-16`} style={{ transitionDelay: "0.3s" }}>
            <span className="font-medium block mb-3" style={{ fontSize: "11px", letterSpacing: "4px", color: "var(--teal)" }}>THE SHOW</span>
            <h2 className="font-display italic font-bold mb-5" style={{ fontSize: "clamp(26px, 3.5vw, 38px)", color: "var(--dark)", lineHeight: 1.2 }}>
              Every great conversation starts with a cup of tea.
            </h2>
            <p className="font-light mb-6" style={{ fontSize: "15px", lineHeight: 1.85, color: "rgba(21,42,47,0.7)", maxWidth: "460px" }}>
              Cabin Tea is a live podcast series rooted in the Gulf of Guinea. We bring together marine scientists, fishers, maritime lawyers, artists, and coastal community voices for honest, unhurried dialogue.
            </p>
            <div className="ct-quote mb-6" style={{ maxWidth: "420px" }}>
              <p className="font-serif italic" style={{ fontSize: "17px", lineHeight: 1.7, color: "var(--teal-dark)" }}>
                A ship's cabin is where honest conversations happen — below deck, away from performance, between people who trust each other.
              </p>
            </div>
            <Link to="/about" className="font-medium no-underline inline-flex items-center gap-2" style={{ fontSize: "13px", letterSpacing: "2px", color: "var(--gold)", transition: "gap 0.3s" }}>
              LEARN MORE <span style={{ fontSize: "18px" }}>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section ref={statsRef} style={{ background: "var(--dark)", borderTop: "3px solid var(--gold)" }}>
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 py-14 px-6 md:px-12">
          <Counter value="60" suffix="min" label="PER EPISODE" visible={statsVis} />
          <div className="ct-hide-mobile" style={{ width: "1px", height: "50px", background: "rgba(138,158,165,0.2)" }} />
          <Counter value="3" suffix="+" label="PLATFORMS" visible={statsVis} />
          <div className="ct-hide-mobile" style={{ width: "1px", height: "50px", background: "rgba(138,158,165,0.2)" }} />
          <Counter value="Live" label="FROM ACCRA, GHANA" visible={statsVis} />
          <div className="ct-hide-mobile" style={{ width: "1px", height: "50px", background: "rgba(138,158,165,0.2)" }} />
          <Counter value="1" suffix="hr" label="UNHURRIED" visible={statsVis} />
        </div>
      </section>

      {/* ═══ FEATURED EPISODES — with images ═══ */}
      <section ref={epRef} className="relative py-20 px-6 md:px-12 lg:px-16" style={{ background: "var(--dark-alt)" }}>
        <div className="ct-grain" />
        <div className="relative max-w-6xl mx-auto">
          <div className={`ct-reveal ${epVis ? "ct-visible" : ""} text-center mb-14`} style={{ transitionDelay: "0.1s" }}>
            <span className="font-medium block mb-3" style={{ fontSize: "11px", letterSpacing: "4px", color: "var(--teal)" }}>LATEST EPISODES</span>
            <h2 className="font-display italic font-bold" style={{ fontSize: "clamp(28px, 3.5vw, 40px)", color: "var(--cream)" }}>
              Every conversation. Every cup.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { num: "01", guest: "Amara Diallo", role: "Maritime Lawyer · Dakar", title: '"Who Really Owns the Sea?"', tag: "Governance", img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80" },
              { num: "02", guest: "Kofi Mensah", role: "Documentary Filmmaker · Accra", title: '"The Last Fisher"', tag: "Community", img: "https://images.unsplash.com/photo-1504164996022-09080787b6b3?w=600&q=80" },
              { num: "03", guest: "Nkechi Obi", role: "Marine Economist · Lagos", title: '"Blue Money"', tag: "Blue Economy", img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80" },
            ].map((ep, i) => (
              <div key={ep.num} className={`ct-reveal ${epVis ? "ct-visible" : ""} ct-episode-card ct-image-card rounded-lg overflow-hidden flex flex-col`} style={{ transitionDelay: `${0.2 + i * 0.15}s` }}>
                <div className="relative overflow-hidden" style={{ height: "200px" }}>
                  <img src={ep.img} alt={ep.guest} className="ct-img-cover" />
                  <div className="absolute top-0 left-0 w-full h-full" style={{ background: "linear-gradient(to top, var(--teal-dark) 5%, transparent 60%)" }} />
                  <span className="absolute top-3 left-3 py-1 px-3 rounded-sm font-medium" style={{ fontSize: "10px", letterSpacing: "1.5px", background: "var(--gold)", color: "var(--dark)" }}>
                    {ep.tag.toUpperCase()}
                  </span>
                  <span className="absolute bottom-3 right-4 font-display font-bold italic" style={{ fontSize: "32px", color: "rgba(255,255,255,0.15)" }}>
                    EP. {ep.num}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <p className="font-serif mb-0.5" style={{ fontSize: "14px", color: "var(--text-muted)" }}>Sipping with</p>
                  <h3 className="font-display text-white font-bold mb-1" style={{ fontSize: "22px", lineHeight: 1.2 }}>{ep.guest}</h3>
                  <p className="mb-3" style={{ fontSize: "12px", letterSpacing: "0.5px", color: "var(--gold)" }}>{ep.role}</p>
                  <p className="font-serif italic mb-5 flex-1" style={{ fontSize: "15px", lineHeight: 1.5, color: "var(--text-main)" }}>{ep.title}</p>
                  <div className="flex items-center gap-3 mt-auto">
                    <PlayIcon size={34} />
                    <span className="font-medium" style={{ fontSize: "11px", letterSpacing: "2px", color: "var(--text-muted)" }}>PLAY · 60 MIN</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={`ct-reveal ${epVis ? "ct-visible" : ""} text-center mt-12`} style={{ transitionDelay: "0.6s" }}>
            <Link to="/episodes" className="ct-btn-outline py-3.5 px-10 font-medium text-xs no-underline inline-block" style={{ letterSpacing: "3px" }}>
              ALL EPISODES
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ SPONSORS ═══ */}
      <section ref={sponsorRef} className="relative py-20 px-6 md:px-12 lg:px-16 overflow-hidden" style={{ background: "var(--dark)" }}>
        <div className="ct-grain" />

        {/* Background image accent */}
        <div className="absolute top-0 right-0 w-1/3 h-full ct-hide-mobile" style={{ opacity: 0.06 }}>
          <img src={IMG.coast} alt="" className="ct-img-cover" />
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className={`ct-reveal ${sponsorVis ? "ct-visible" : ""} text-center mb-14`} style={{ transitionDelay: "0.1s" }}>
            <span className="font-medium block mb-3" style={{ fontSize: "11px", letterSpacing: "4px", color: "var(--teal)" }}>OUR PARTNERS</span>
            <h2 className="font-display italic font-bold mb-4" style={{ fontSize: "clamp(28px, 3.5vw, 40px)", color: "var(--cream)" }}>
              Brewed with intention. Backed by purpose.
            </h2>
            <p className="mx-auto font-light" style={{ fontSize: "15px", lineHeight: 1.85, color: "rgba(214,207,194,0.6)", maxWidth: "500px" }}>
              We partner exclusively with organic and herbal tea brands who share our values — sustainability, storytelling, and the sea.
            </p>
          </div>

          {/* Partner tiers */}
          <div className={`ct-reveal ${sponsorVis ? "ct-visible" : ""} grid grid-cols-1 md:grid-cols-3 gap-6 mb-12`} style={{ transitionDelay: "0.3s" }}>
            {[
              { title: "FOUNDING BLEND", sub: "Season Partner", desc: "Full season tea integration, branded keepsake tins, logo on all platforms, co-branded social content." },
              { title: "SINGLE ORIGIN", sub: "Episode Partner", desc: "Per-episode tea integration, keepsake tin for the guest, logo on artwork, intro mention." },
              { title: "TEA HOUSE", sub: "Experience Partner", desc: "Live event branding, product sampling for audience, social media feature, community association." },
            ].map((t, i) => (
              <div key={t.title} className="ct-tier-home rounded-lg p-6">
                <h4 className="font-medium mb-1" style={{ fontSize: "14px", letterSpacing: "2.5px", color: "var(--gold)" }}>{t.title}</h4>
                <p className="font-serif italic mb-3" style={{ fontSize: "14px", color: "rgba(255,255,255,0.55)" }}>{t.sub}</p>
                <p className="font-light" style={{ fontSize: "13.5px", lineHeight: 1.75, color: "rgba(214,207,194,0.5)" }}>{t.desc}</p>
              </div>
            ))}
          </div>

          <div className={`ct-reveal ${sponsorVis ? "ct-visible" : ""} text-center`} style={{ transitionDelay: "0.5s" }}>
            <Link to="/partner" className="ct-btn-gold py-3.5 px-10 font-medium text-xs no-underline inline-block" style={{ letterSpacing: "3px" }}>
              BECOME A PARTNER
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ BOTTOM CTA — with background image ═══ */}
      <section ref={ctaRef} className="relative overflow-hidden" style={{ minHeight: "400px" }}>
        <img src={IMG.accra} alt="Accra coastline" className="absolute top-0 left-0 w-full h-full object-cover" />
        <div className="absolute top-0 left-0 w-full h-full" style={{ background: "linear-gradient(135deg, rgba(30,107,95,0.9) 0%, rgba(21,42,47,0.85) 100%)" }} />
        <div className="ct-grain" style={{ zIndex: 1 }} />

        <div className={`ct-reveal ${ctaVis ? "ct-visible" : ""} relative flex flex-col items-center justify-center text-center py-24 px-6`} style={{ zIndex: 2, transitionDelay: "0.1s" }}>
          <div className="mx-auto mb-6" style={{ maxWidth: "180px" }}>
            <WaveLine color="rgba(196,164,78,0.6)" />
          </div>
          <h2 className="font-display italic font-bold mb-4" style={{ fontSize: "clamp(26px, 3.5vw, 42px)", color: "var(--cream)" }}>
            Recorded live in Accra. Heard everywhere.
          </h2>
          <p className="mx-auto mb-10 font-light" style={{ fontSize: "15.5px", lineHeight: 1.85, color: "rgba(214,207,194,0.7)", maxWidth: "460px" }}>
            New episodes released on YouTube, Spotify, and Apple Podcasts. Subscribe wherever you listen.
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <Link to="/episodes" className="ct-btn-primary py-4 px-10 font-medium text-xs no-underline inline-block" style={{ letterSpacing: "3px" }}>
              EXPLORE EPISODES
            </Link>
            <Link to="/shop" className="ct-btn-outline py-4 px-10 font-medium text-xs no-underline inline-block" style={{ letterSpacing: "3px", borderColor: "rgba(255,255,255,0.3)", color: "white" }}>
              VISIT SHOP
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}