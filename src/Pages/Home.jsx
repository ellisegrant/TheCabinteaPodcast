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
  tea:   "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&q=80",
  coast: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=80",
  accra: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1200&q=80",
};

/* ─── Typography — Playfair Display + Jost ─── */
const display = { fontFamily: "var(--font-display, 'Playfair Display', Georgia, serif)" };
const body    = { fontFamily: "var(--font-body, 'Jost', sans-serif)" };
const label   = { ...body, fontSize: "10px", letterSpacing: "3.5px", textTransform: "uppercase", fontWeight: 400 };

export default function Home() {
  const [heroRef,    heroVis]    = useReveal(0.05);
  const [aboutRef,   aboutVis]   = useReveal(0.1);
  const [epRef,      epVis]      = useReveal(0.1);
  const [sponsorRef, sponsorVis] = useReveal(0.1);
  const [ctaRef,     ctaVis]     = useReveal(0.1);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* ═══ HERO ═══ */}
      <section
        ref={heroRef}
        className="relative overflow-hidden"
        style={{ minHeight: "94vh", background: "var(--dark)" }}
      >
        <video
          autoPlay muted loop playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
          style={{ zIndex: 0 }}
        >
          <source src="/herovideo.mp4" type="video/mp4" />
        </video>
        <div className="absolute top-0 left-0 w-full h-full" style={{ zIndex: 1, background: "rgba(21,42,47,0.80)" }} />
        <div className="absolute bottom-0 left-0 w-full" style={{ zIndex: 1, height: "120px", background: "linear-gradient(to top, var(--dark), transparent)" }} />
        <div className="ct-grain" style={{ zIndex: 2 }} />

        <div
          className="relative flex flex-col lg:flex-row p-6 md:p-12 lg:p-16 gap-10 lg:gap-16"
          style={{ zIndex: 3, minHeight: "calc(94vh - 64px)" }}
        >
          {/* LEFT */}
          <div className="lg:flex-1 flex flex-col justify-center lg:pr-6">
            <span
              className={`ct-reveal ${heroVis ? "ct-visible" : ""} block mb-6`}
              style={{ ...label, color: "var(--teal)", transitionDelay: "0.1s" }}
            >
              A PODCAST FROM THE GULF OF GUINEA
            </span>

            <h1
              className={`ct-reveal ${heroVis ? "ct-visible" : ""} text-white mb-4`}
              style={{
                ...display,
                fontWeight: 700,
                fontSize: "clamp(64px, 9vw, 134px)",
                lineHeight: 0.88,
                letterSpacing: "-3px",
                transitionDelay: "0.2s",
              }}
            >
              CABIN<br />TEA
            </h1>

            <p
              className={`ct-reveal ${heroVis ? "ct-visible" : ""} mb-6`}
              style={{
                ...display,
                fontStyle: "italic",
                color: "var(--gold)",
                fontSize: "clamp(18px, 2vw, 24px)",
                fontWeight: 400,
                lineHeight: 1.4,
                transitionDelay: "0.35s",
              }}
            >
              Sipping with the people who know the sea.
            </p>

            <div className={`ct-reveal ${heroVis ? "ct-visible" : ""} mb-8`} style={{ maxWidth: "350px", transitionDelay: "0.45s" }}>
              <WaveLine />
            </div>

            <p
              className={`ct-reveal ${heroVis ? "ct-visible" : ""} mb-8`}
              style={{
                ...body,
                fontWeight: 300,
                fontSize: "15px",
                lineHeight: 1.9,
                color: "rgba(214,207,194,0.72)",
                maxWidth: "440px",
                transitionDelay: "0.5s",
              }}
            >
              A live conversation series where ocean professionals and unexpected
              ocean-adjacent voices come together over a carefully chosen cup of tea.
            </p>

            <div className={`ct-reveal ${heroVis ? "ct-visible" : ""} flex gap-4 flex-wrap mb-10`} style={{ transitionDelay: "0.6s" }}>
              <Link
                to="/episodes"
                className="ct-btn-primary py-4 px-10 no-underline inline-block"
                style={{ ...label, letterSpacing: "3px" }}
              >
                LISTEN NOW
              </Link>
              <Link
                to="/partner"
                className="ct-btn-gold py-4 px-10 no-underline inline-block"
                style={{ ...label, letterSpacing: "3px" }}
              >
                PARTNER WITH US
              </Link>
            </div>

            <div className={`ct-reveal ${heroVis ? "ct-visible" : ""} flex items-center gap-6`} style={{ transitionDelay: "0.7s" }}>
              <span style={{ ...label, color: "var(--text-muted)" }}>LISTEN ON</span>
              <div className="flex items-center gap-5">
                <a href="#" className="ct-icon-link"><YoutubeIcon /></a>
                <a href="#" className="ct-icon-link"><SpotifyIcon /></a>
                <a href="#" className="ct-icon-link"><AppleIcon /></a>
              </div>
            </div>
          </div>

          {/* RIGHT — Latest Episode card */}
          <div
            className={`ct-reveal ${heroVis ? "ct-visible" : ""} ct-episode-card rounded-lg p-7 pb-8 flex flex-col self-center relative overflow-hidden mt-4 lg:mt-0`}
            style={{ flex: "0 1 420px", maxWidth: "420px", transitionDelay: "0.4s" }}
          >
            <div className="absolute top-0 left-6 right-6 h-[2px]" style={{ background: "var(--gold)" }} />
            <span style={{ ...label, color: "rgba(255,255,255,0.45)", marginBottom: "16px", display: "block" }}>
              LATEST EPISODE
            </span>
            <div className="ct-episode-artwork-wrap rounded-lg p-5 mb-5">
              <EpisodeArtwork num="01" size={165} />
            </div>
            <p style={{ ...body, fontWeight: 300, fontSize: "13px", color: "rgba(255,255,255,0.5)", marginBottom: "2px" }}>
              Sipping with
            </p>
            <h3 style={{ ...display, fontWeight: 700, fontSize: "26px", color: "white", marginBottom: "6px", lineHeight: 1.15 }}>
              Amara Diallo
            </h3>
            <p style={{ ...label, color: "var(--gold)", marginBottom: "14px" }}>
              Maritime Lawyer · Dakar
            </p>
            <p style={{ ...display, fontStyle: "italic", fontSize: "15px", lineHeight: 1.7, color: "rgba(214,207,194,0.6)", marginBottom: "22px" }}>
              "Who Really Owns the Sea?" — ocean governance, identity and the politics of West African waters.
            </p>
            <button className="ct-play-btn flex items-center gap-3.5 bg-transparent border-none p-0 cursor-pointer">
              <PlayIcon size={38} />
              <span style={{ ...label, color: "rgba(255,255,255,0.5)", letterSpacing: "2.5px" }}>PLAY EPISODE</span>
            </button>
          </div>
        </div>
      </section>

      {/* ═══ ABOUT — Clean editorial two-column ═══ */}
      <section ref={aboutRef} style={{ background: "var(--cream)" }}>
        <div className="flex flex-col lg:flex-row" style={{ minHeight: "520px" }}>
          {/* Image */}
          <div
            className={`ct-reveal-left ${aboutVis ? "ct-visible" : ""} lg:w-5/12 relative overflow-hidden`}
            style={{ minHeight: "380px", transitionDelay: "0.1s" }}
          >
            <img
              src={IMG.tea}
              alt="Tea preparation"
              className="ct-img-cover ct-img-zoom"
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div
              className="absolute top-0 right-0 h-full"
              style={{ width: "3px", background: "var(--gold)", opacity: 0.7 }}
            />
          </div>

          {/* Text */}
          <div
            className={`ct-reveal-right ${aboutVis ? "ct-visible" : ""} lg:w-7/12 flex flex-col justify-center`}
            style={{ padding: "clamp(40px, 6vw, 80px) clamp(32px, 6vw, 80px)", transitionDelay: "0.25s" }}
          >
            <span style={{ ...label, color: "var(--teal)", marginBottom: "16px", display: "block" }}>
              THE SHOW
            </span>
            <h2
              style={{
                ...display,
                fontStyle: "italic",
                fontWeight: 700,
                fontSize: "clamp(28px, 3.2vw, 42px)",
                color: "var(--dark)",
                lineHeight: 1.15,
                marginBottom: "20px",
                maxWidth: "520px",
              }}
            >
              Every great conversation starts with a cup of tea.
            </h2>
            <div style={{ width: "48px", height: "2px", background: "var(--gold)", marginBottom: "24px" }} />
            <p
              style={{
                ...body,
                fontWeight: 300,
                fontSize: "15px",
                lineHeight: 1.9,
                color: "rgba(21,42,47,0.65)",
                maxWidth: "500px",
                marginBottom: "28px",
              }}
            >
              Cabin Tea is a live podcast series rooted in the Gulf of Guinea. We bring together
              marine scientists, fishers, maritime lawyers, artists, and coastal community voices
              for honest, unhurried dialogue.
            </p>
            <div
              style={{
                borderLeft: "3px solid var(--teal)",
                paddingLeft: "20px",
                marginBottom: "32px",
                maxWidth: "460px",
              }}
            >
              <p
                style={{
                  ...display,
                  fontStyle: "italic",
                  fontSize: "18px",
                  lineHeight: 1.65,
                  color: "var(--teal-dark)",
                  fontWeight: 400,
                }}
              >
                A ship's cabin is where honest conversations happen — below deck,
                away from performance, between people who trust each other.
              </p>
            </div>
            <Link
              to="/about"
              className="no-underline inline-flex items-center gap-2"
              style={{ ...label, color: "var(--gold)", letterSpacing: "2.5px", transition: "opacity 0.2s" }}
            >
              LEARN MORE <span style={{ fontSize: "16px", fontFamily: "sans-serif" }}>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ FEATURED EPISODES ═══ */}
      <section ref={epRef} className="relative py-20 px-6 md:px-12 lg:px-16" style={{ background: "var(--dark-alt)" }}>
        <div className="ct-grain" />
        <div className="relative max-w-6xl mx-auto">
          <div className={`ct-reveal ${epVis ? "ct-visible" : ""} text-center mb-14`} style={{ transitionDelay: "0.1s" }}>
            <span style={{ ...label, color: "var(--teal)", display: "block", marginBottom: "12px" }}>
              LATEST EPISODES
            </span>
            <h2 style={{ ...display, fontStyle: "italic", fontWeight: 700, fontSize: "clamp(28px, 3.5vw, 42px)", color: "var(--cream)" }}>
              Every conversation. Every cup.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { num: "01", guest: "Amara Diallo",  role: "Maritime Lawyer · Dakar",       title: '"Who Really Owns the Sea?"', tag: "Governance",   img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80" },
              { num: "02", guest: "Kofi Mensah",   role: "Documentary Filmmaker · Accra", title: '"The Last Fisher"',          tag: "Community",    img: "https://images.unsplash.com/photo-1504164996022-09080787b6b3?w=600&q=80" },
              { num: "03", guest: "Nkechi Obi",    role: "Marine Economist · Lagos",      title: '"Blue Money"',               tag: "Blue Economy", img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80" },
            ].map((ep, i) => (
              <div
                key={ep.num}
                className={`ct-reveal ${epVis ? "ct-visible" : ""} ct-episode-card ct-image-card rounded-lg overflow-hidden flex flex-col`}
                style={{ transitionDelay: `${0.2 + i * 0.15}s` }}
              >
                <div className="relative overflow-hidden" style={{ height: "200px" }}>
                  <img src={ep.img} alt={ep.guest} className="ct-img-cover" />
                  <div className="absolute top-0 left-0 w-full h-full" style={{ background: "rgba(21,42,47,0.35)" }} />
                  <span
                    className="absolute top-3 left-3 py-1 px-3 rounded-sm"
                    style={{ ...label, fontSize: "9px", background: "var(--gold)", color: "var(--dark)", letterSpacing: "1.5px" }}
                  >
                    {ep.tag.toUpperCase()}
                  </span>
                  <span
                    className="absolute bottom-3 right-4"
                    style={{ ...display, fontWeight: 700, fontStyle: "italic", fontSize: "32px", color: "rgba(255,255,255,0.13)" }}
                  >
                    EP. {ep.num}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <p style={{ ...body, fontWeight: 300, fontSize: "13px", color: "var(--text-muted)", marginBottom: "2px" }}>
                    Sipping with
                  </p>
                  <h3 style={{ ...display, fontWeight: 700, fontSize: "24px", color: "white", lineHeight: 1.2, marginBottom: "6px" }}>
                    {ep.guest}
                  </h3>
                  <p style={{ ...label, color: "var(--gold)", marginBottom: "14px" }}>
                    {ep.role}
                  </p>
                  <p style={{ ...display, fontStyle: "italic", fontSize: "15px", lineHeight: 1.55, color: "var(--text-main)", marginBottom: "20px", flex: 1 }}>
                    {ep.title}
                  </p>
                  <div className="flex items-center gap-3 mt-auto">
                    <PlayIcon size={34} />
                    <span style={{ ...label, color: "var(--text-muted)", letterSpacing: "2px" }}>PLAY · 60 MIN</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={`ct-reveal ${epVis ? "ct-visible" : ""} text-center mt-12`} style={{ transitionDelay: "0.6s" }}>
            <Link
              to="/episodes"
              className="ct-btn-outline py-3.5 px-10 no-underline inline-block"
              style={{ ...label, letterSpacing: "3px" }}
            >
              ALL EPISODES
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ SPONSORS ═══ */}
      <section ref={sponsorRef} className="relative py-20 px-6 md:px-12 lg:px-16 overflow-hidden" style={{ background: "var(--dark)" }}>
        <div className="ct-grain" />
        <div className="absolute top-0 right-0 w-1/3 h-full ct-hide-mobile" style={{ opacity: 0.05 }}>
          <img src={IMG.coast} alt="" className="ct-img-cover" />
        </div>
        <div className="relative max-w-5xl mx-auto">
          <div className={`ct-reveal ${sponsorVis ? "ct-visible" : ""} text-center mb-14`} style={{ transitionDelay: "0.1s" }}>
            <span style={{ ...label, color: "var(--teal)", display: "block", marginBottom: "12px" }}>OUR PARTNERS</span>
            <h2 style={{ ...display, fontStyle: "italic", fontWeight: 700, fontSize: "clamp(28px, 3.5vw, 40px)", color: "var(--cream)", marginBottom: "16px" }}>
              Brewed with intention. Backed by purpose.
            </h2>
            <p
              className="mx-auto"
              style={{ ...body, fontWeight: 300, fontSize: "15px", lineHeight: 1.85, color: "rgba(214,207,194,0.58)", maxWidth: "480px" }}
            >
              We partner exclusively with organic and herbal tea brands who share our values —
              sustainability, storytelling, and the sea.
            </p>
          </div>

          <div className={`ct-reveal ${sponsorVis ? "ct-visible" : ""} grid grid-cols-1 md:grid-cols-3 gap-6 mb-12`} style={{ transitionDelay: "0.3s" }}>
            {[
              { title: "FOUNDING BLEND",  sub: "Season Partner",     desc: "Full season tea integration, branded keepsake tins, logo on all platforms, co-branded social content." },
              { title: "SINGLE ORIGIN",   sub: "Episode Partner",    desc: "Per-episode tea integration, keepsake tin for the guest, logo on artwork, intro mention." },
              { title: "TEA HOUSE",       sub: "Experience Partner", desc: "Live event branding, product sampling for audience, social media feature, community association." },
            ].map((t) => (
              <div key={t.title} className="ct-tier-home rounded-lg p-6">
                <h4 style={{ ...label, color: "var(--gold)", fontSize: "12px", marginBottom: "6px" }}>{t.title}</h4>
                <p style={{ ...display, fontStyle: "italic", fontSize: "14px", color: "rgba(255,255,255,0.5)", marginBottom: "12px" }}>{t.sub}</p>
                <p style={{ ...body, fontWeight: 300, fontSize: "13.5px", lineHeight: 1.8, color: "rgba(214,207,194,0.48)" }}>{t.desc}</p>
              </div>
            ))}
          </div>

          <div className={`ct-reveal ${sponsorVis ? "ct-visible" : ""} text-center`} style={{ transitionDelay: "0.5s" }}>
            <Link
              to="/partner"
              className="ct-btn-gold py-3.5 px-10 no-underline inline-block"
              style={{ ...label, letterSpacing: "3px" }}
            >
              BECOME A PARTNER
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ BOTTOM CTA ═══ */}
      <section ref={ctaRef} className="relative overflow-hidden" style={{ minHeight: "400px" }}>
        <img src={IMG.accra} alt="Accra coastline" className="absolute top-0 left-0 w-full h-full object-cover" />
        <div className="absolute top-0 left-0 w-full h-full" style={{ background: "rgba(21,42,47,0.82)" }} />
        <div className="ct-grain" style={{ zIndex: 1 }} />
        <div
          className={`ct-reveal ${ctaVis ? "ct-visible" : ""} relative flex flex-col items-center justify-center text-center py-24 px-6`}
          style={{ zIndex: 2, transitionDelay: "0.1s" }}
        >
          <div className="mx-auto mb-6" style={{ maxWidth: "180px" }}>
            <WaveLine color="rgba(196,164,78,0.55)" />
          </div>
          <h2
            style={{
              ...display,
              fontStyle: "italic",
              fontWeight: 700,
              fontSize: "clamp(26px, 3.5vw, 44px)",
              color: "var(--cream)",
              marginBottom: "16px",
            }}
          >
            Recorded live in Accra. Heard everywhere.
          </h2>
          <p
            className="mx-auto mb-10"
            style={{ ...body, fontWeight: 300, fontSize: "15px", lineHeight: 1.9, color: "rgba(214,207,194,0.65)", maxWidth: "440px" }}
          >
            New episodes released on YouTube, Spotify, and Apple Podcasts.
            Subscribe wherever you listen.
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <Link
              to="/episodes"
              className="ct-btn-primary py-4 px-10 no-underline inline-block"
              style={{ ...label, letterSpacing: "3px" }}
            >
              EXPLORE EPISODES
            </Link>
            <Link
              to="/shop"
              className="ct-btn-outline py-4 px-10 no-underline inline-block"
              style={{ ...label, letterSpacing: "3px", borderColor: "rgba(255,255,255,0.28)", color: "white" }}
            >
              VISIT SHOP
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
