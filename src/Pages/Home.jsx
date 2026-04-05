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

/* ── Palette: one dark, one gold, generous white space ── */
const BG    = "#0F1912";   /* very dark forest — distinct, not generic black */
const PANEL = "#141F18";
const GOLD  = "#C4A44E";
const CREAM = "rgba(214,207,194,0.75)";
const MUTED = "rgba(214,207,194,0.38)";
const TEAL  = "#2C8C7C";

/* ── Image paths ── */
const IMGS = {
  hero:      "/podcast.jpg",
  host:      "/podcastimage.jpg",
  afrocean:  "/africanface.jpg",
  anchorage: "/fisherman.jpg",
  agency:    "/creativeagency.jpg",
  ep1:       "/flagwoman.jpg",
  ep2:       "/africanwomen.jpg",
  ep3:       "/maritimeheritage.jpg",
  cta:       "/ship.jpg",
};

/* ── Platform icons ── */
function Spotify() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
    </svg>
  );
}
function Apple() {
  return (
    <svg width="18" height="20" viewBox="0 0 20 24" fill="currentColor">
      <path d="M16.5 12.5c0-2.8 2.3-4.1 2.4-4.2-1.3-1.9-3.3-2.2-4-2.2-1.7-.2-3.4 1-4.2 1s-2.2-1-3.7-1C5.1 6.1 3.4 7.2 2.4 8.8.5 12.2 1.9 17.2 3.8 20c.9 1.3 2 2.8 3.5 2.8 1.4-.1 1.9-.9 3.6-.9s2.2.9 3.7.9 2.5-1.4 3.4-2.7c1.1-1.5 1.5-3 1.5-3.1-.1 0-2.9-1.1-3-4.5zM13.7 4.3c.8-1 1.3-2.3 1.1-3.6-1.1 0-2.5.7-3.3 1.7-.7.8-1.3 2.1-1.2 3.4 1.3.1 2.5-.6 3.4-1.5z"/>
    </svg>
  );
}
function Youtube() {
  return (
    <svg width="22" height="16" viewBox="0 0 26 18" fill="currentColor">
      <path d="M25.456 2.818A3.26 3.26 0 0023.162.51C21.13 0 13 0 13 0S4.87 0 2.838.51A3.26 3.26 0 00.544 2.818C0 4.862 0 9 0 9s0 4.138.544 6.182a3.26 3.26 0 002.294 2.308C4.87 18 13 18 13 18s8.13 0 10.162-.51a3.26 3.26 0 002.294-2.308C26 13.138 26 9 26 9s0-4.138-.544-6.182zM10.4 12.857V5.143L17.143 9 10.4 12.857z"/>
    </svg>
  );
}

/* ── Featured episodes ── */
const EPISODES = [
  { num: "EP. 12", guest: "Featured Guest", title: "The Future of Africa's Blue Economy", duration: "48 min", img: IMGS.ep1 },
  { num: "EP. 11", guest: "Featured Guest", title: "Maritime Trade & the Diaspora Connection", duration: "52 min", img: IMGS.ep2 },
  { num: "EP. 10", guest: "Featured Guest", title: "Navigating the Gulf of Guinea", duration: "44 min", img: IMGS.ep3 },
];

/* ── Sub-brands ── */
const BRANDS = [
  {
    tag: "GATHERING",
    name: "Afrocean",
    desc: "A dynamic gathering that unites the African Diaspora with their maritime heritage through cultural exchange and networking.",
    img: IMGS.afrocean,
    to: "/afrocean",
  },
  {
    tag: "MEDIA HUB",
    name: "Anchorage",
    desc: "A centralized media hub curating personalized maritime content for the Diaspora, reshaping how we engage with the ocean economy.",
    img: IMGS.anchorage,
    to: "/anchorage",
  },
  {
    tag: "AGENCY",
    name: "Creative Agency",
    desc: "Connecting brands to the vibrancy and commercial power of African maritime culture through strategy and immersive experiences.",
    img: IMGS.agency,
    to: "/creative-agency",
  },
];

export default function Home() {
  const [heroRef,    heroVis]    = useReveal(0.05);
  const [aboutRef,   aboutVis]   = useReveal(0.1);
  const [epRef,      epVis]      = useReveal(0.08);
  const [brandsRef,  brandsVis]  = useReveal(0.08);
  const [ctaRef,     ctaVis]     = useReveal(0.1);

  return (
    <div style={{ minHeight: "100vh", background: BG, color: "white", overflowX: "hidden" }}>
      <Navbar />


      <section ref={heroRef} style={{
        height: "100vh", minHeight: "640px",
        position: "relative", overflow: "hidden",
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
      }}>
        <video autoPlay muted loop playsInline
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}>
          <source src="/herovideo.mp4" type="video/mp4" />
          <img src={IMGS.hero} alt="Cabin Tea"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        </video>
        {/* Single clean gradient — bottom only */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(15,25,18,1) 0%, rgba(15,25,18,0.55) 45%, transparent 80%)",
        }} />
        <div className="ct-grain" style={{ zIndex: 1 }} />

        <div style={{
          position: "relative", zIndex: 2,
          padding: "0 5vw 72px",
        }}>

        

          {/* Headline — large, confident, nothing else */}
          <h1 style={{
            fontWeight: 700,
            fontSize: "clamp(38px, 5vw, 96px)",
            lineHeight: 1, letterSpacing: "normal",
            color: "white", margin: "0 0 10px",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(24px)",
            transition: "opacity 0.7s 0.18s, transform 0.7s 0.18s",
          }}>
            Sipping with the
          </h1>
          <h1 style={{
            fontWeight: 700,
            fontSize: "clamp(38px, 5vw, 96px)",
            lineHeight: 1, letterSpacing: "normal",
            color: GOLD, margin: "0 0 36px",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(24px)",
            transition: "opacity 0.7s 0.26s, transform 0.7s 0.26s",
          }}>
            people who know the sea.
          </h1>

          {/* Bottom row — short description + CTAs + platforms */}
          <div style={{
            display: "flex", alignItems: "flex-end",
            justifyContent: "space-between", gap: "40px", flexWrap: "wrap",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(12px)",
            transition: "opacity 0.7s 0.36s, transform 0.7s 0.36s",
          }}>
            <div>
              <p style={{
                fontSize: "16px", color: CREAM, lineHeight: 1.7,
                fontWeight: 300, maxWidth: "400px", marginBottom: "24px",
              }}>
                Africa's maritime podcast. Live conversations with the people shaping the continent's blue economy.
              </p>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <Link to="/episodes" style={{
                  display: "inline-block", padding: "13px 32px",
                  background: GOLD, color: "#0F1912",
                  textDecoration: "none", fontSize: "11px",
                  letterSpacing: "2px", fontWeight: 700,
                  transition: "opacity 0.2s",
                }}
                  onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                  onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                >LISTEN NOW</Link>
                <Link to="/about" style={{
                  display: "inline-block", padding: "13px 32px",
                  border: "1px solid rgba(255,255,255,0.2)", color: CREAM,
                  textDecoration: "none", fontSize: "11px",
                  letterSpacing: "2px", fontWeight: 500,
                  transition: "border-color 0.2s, color 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; e.currentTarget.style.color = "white"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = CREAM; }}
                >ABOUT THE SHOW</Link>
              </div>
            </div>

            {/* Listen on */}
            <div style={{ display: "flex", alignItems: "center", gap: "20px", flexShrink: 0 }}>
              <span style={{ fontSize: "9px", letterSpacing: "2.5px", color: MUTED }}>LISTEN ON</span>
              {[[<Youtube/>, "#"], [<Spotify/>, "#"], [<Apple/>, "#"]].map(([icon, href], i) => (
                <a key={i} href={href} style={{
                  color: MUTED, display: "inline-flex",
                  transition: "color 0.2s",
                }}
                  onMouseEnter={e => e.currentTarget.style.color = GOLD}
                  onMouseLeave={e => e.currentTarget.style.color = MUTED}
                >{icon}</a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          ABOUT STRIP — one sentence, the host photo,
          a stat or two. Clean. No decoration.
      ════════════════════════════════════════════════ */}
      <section ref={aboutRef} style={{ background: PANEL, padding: "96px 5vw" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: "80px", alignItems: "center",
          }}>
            {/* Left — host photo */}
            <div style={{
              position: "relative",
              opacity: aboutVis ? 1 : 0, transform: aboutVis ? "none" : "translateX(-20px)",
              transition: "opacity 0.8s, transform 0.8s",
            }}>
              <div style={{ aspectRatio: "4/5", overflow: "hidden" }}>
                <img
                  src={IMGS.host}
                  alt="Host"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
              {/* Floating stat */}
              <div style={{
                position: "absolute", bottom: "-1px", right: "-1px",
                background: GOLD, color: "#0F1912",
                padding: "20px 24px",
              }}>
                <span style={{
                   fontSize: "36px",
                  fontWeight: 700, display: "block", lineHeight: 1,
                }}>360°</span>
                <span style={{ fontSize: "9px", letterSpacing: "2px", fontWeight: 600, display: "block", marginTop: "4px" }}>
                  MARITIME MEDIA
                </span>
              </div>
            </div>

            {/* Right — about text */}
            <div style={{
              opacity: aboutVis ? 1 : 0, transform: aboutVis ? "none" : "translateX(20px)",
              transition: "opacity 0.8s 0.15s, transform 0.8s 0.15s",
            }}>
              <p style={{ fontSize: "10px", letterSpacing: "3px", color: GOLD, marginBottom: "20px", fontWeight: 600 }}>
                ABOUT CABIN TEA
              </p>
              <h2 style={{
                fontWeight: 700,
                fontSize: "clamp(28px, 3.5vw, 44px)", lineHeight: 1.1,
                letterSpacing: "normal", color: "white", marginBottom: "24px",
              }}>
                Africa's #1 maritime media brand.
              </h2>
              <p style={{
                fontSize: "16px", lineHeight: 1.85,
                color: CREAM, fontWeight: 300, marginBottom: "20px",
              }}>
                A 360° maritime media and industry network built for the African community and Diaspora. Through live conversations, community events, and digital media, we amplify African maritime culture and bring the voices of the Diaspora into the heart of the continent's blue economy.
              </p>
              <p style={{
                fontSize: "16px", lineHeight: 1.85,
                color: MUTED, fontWeight: 300, marginBottom: "36px",
              }}>
                Recorded live in Accra, Ghana. Heard everywhere.
              </p>

              {/* Stats row */}
              <div style={{
                display: "flex", gap: "40px",
                paddingTop: "28px",
                borderTop: "1px solid rgba(255,255,255,0.07)",
              }}>
                {[
                  { val: "54", label: "African Nations" },
                  { val: "Global", label: "Diaspora Reach" },
                  { val: "Live", label: "Recorded" },
                ].map(s => (
                  <div key={s.label}>
                    <span style={{
                       fontSize: "26px",
                      fontWeight: 700, color: "white", display: "block", lineHeight: 1,
                    }}>{s.val}</span>
                    <span style={{
                      fontSize: "9px", letterSpacing: "2px", color: MUTED,
                      display: "block", marginTop: "5px",
                    }}>{s.label.toUpperCase()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          LATEST EPISODES — editorial card grid
          Each episode: image, number, title, duration
          Clean, consistent, no decoration between cards
      ════════════════════════════════════════════════ */}
      <section ref={epRef} style={{ background: BG, padding: "96px 5vw" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

          {/* Section header */}
          <div style={{
            display: "flex", alignItems: "baseline",
            justifyContent: "space-between", marginBottom: "48px",
            opacity: epVis ? 1 : 0, transform: epVis ? "none" : "translateY(12px)",
            transition: "opacity 0.6s, transform 0.6s",
          }}>
            <h2 style={{
              fontWeight: 700,
              fontSize: "clamp(22px, 3vw, 36px)", color: "white",
              margin: 0, letterSpacing: "normal",
            }}>Latest Episodes</h2>
            <Link to="/episodes" style={{
              fontSize: "11px", letterSpacing: "2px", fontWeight: 600,
              color: MUTED, textDecoration: "none",
              transition: "color 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.color = GOLD}
              onMouseLeave={e => e.currentTarget.style.color = MUTED}
            >ALL EPISODES →</Link>
          </div>

          {/* Episode cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {EPISODES.map((ep, i) => (
              <Link key={i} to="/episodes" style={{
                display: "grid",
                gridTemplateColumns: "80px 240px 1fr 80px",
                gap: "28px", alignItems: "center",
                padding: "20px 0",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                textDecoration: "none",
                transition: "background 0.2s",
                margin: "0 -20px",
                padding: "20px 20px",
                opacity: epVis ? 1 : 0, transform: epVis ? "none" : "translateY(16px)",
                transitionProperty: "background, opacity, transform",
                transitionDuration: "0.2s, 0.6s, 0.6s",
                transitionDelay: `0s, ${0.1 + i * 0.1}s, ${0.1 + i * 0.1}s`,
              }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.03)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                {/* Thumbnail */}
                <div style={{ width: "80px", height: "80px", overflow: "hidden", flexShrink: 0 }}>
                  <img src={ep.img} alt={ep.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>

                {/* Episode number */}
                <span style={{
                  fontSize: "11px", letterSpacing: "2px",
                  color: MUTED, fontWeight: 500,
                }}>{ep.num}</span>

                {/* Title */}
                <div>
                  <p style={{ fontSize: "10px", letterSpacing: "2px", color: GOLD, marginBottom: "6px", fontWeight: 500 }}>
                    {ep.guest}
                  </p>
                  <h3 style={{
                    fontWeight: 600,
                    fontSize: "clamp(16px, 1.8vw, 20px)", color: "white",
                    lineHeight: 1.25, margin: 0, letterSpacing: "0",
                  }}>{ep.title}</h3>
                </div>

                {/* Duration + play */}
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <span style={{ fontSize: "12px", color: MUTED, display: "block", marginBottom: "8px" }}>{ep.duration}</span>
                  <div style={{
                    width: "32px", height: "32px", borderRadius: "50%",
                    border: `1px solid rgba(196,164,78,0.3)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginLeft: "auto",
                  }}>
                    <svg width="10" height="12" viewBox="0 0 10 12" fill={GOLD}>
                      <path d="M0 0l10 6-10 6V0z"/>
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }} />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          THE ECOSYSTEM — three sub-brands
          Simple image grid with text overlay.
          No decoration. Just image + name + link.
      ════════════════════════════════════════════════ */}
      <section ref={brandsRef} style={{ background: PANEL, padding: "96px 5vw" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{
            marginBottom: "48px",
            opacity: brandsVis ? 1 : 0, transform: brandsVis ? "none" : "translateY(12px)",
            transition: "opacity 0.6s, transform 0.6s",
          }}>
            <p style={{ fontSize: "10px", letterSpacing: "3px", color: GOLD, marginBottom: "12px", fontWeight: 600 }}>
              THE ECOSYSTEM
            </p>
            <h2 style={{
              fontWeight: 700,
              fontSize: "clamp(22px, 3vw, 36px)", color: "white",
              margin: 0, letterSpacing: "normal",
            }}>More than a podcast.</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2px" }}>
            {BRANDS.map((brand, i) => {
              const [hovered, setHovered] = useState(false);
              return (
                <Link key={brand.name} to={brand.to}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                  style={{
                    textDecoration: "none", position: "relative",
                    display: "block", overflow: "hidden",
                    opacity: brandsVis ? 1 : 0, transform: brandsVis ? "none" : "translateY(20px)",
                    transition: `opacity 0.6s ${0.1 + i * 0.1}s, transform 0.6s ${0.1 + i * 0.1}s`,
                  }}
                >
                  {/* Image */}
                  <div style={{ aspectRatio: "3/4", overflow: "hidden" }}>
                    <img src={brand.img} alt={brand.name}
                      style={{
                        width: "100%", height: "100%", objectFit: "cover", display: "block",
                        transform: hovered ? "scale(1.04)" : "scale(1)",
                        transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
                      }}
                    />
                  </div>

                  {/* Overlay — only shows on hover */}
                  <div style={{
                    position: "absolute", inset: 0,
                    background: `linear-gradient(to top, rgba(15,25,18,0.95) 0%, rgba(15,25,18,0.5) 50%, transparent 100%)`,
                    opacity: hovered ? 1 : 0.6,
                    transition: "opacity 0.4s",
                  }} />

                  {/* Text */}
                  <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0,
                    padding: "28px 24px",
                  }}>
                    <span style={{
                      fontSize: "9px", letterSpacing: "2.5px",
                      color: GOLD, fontWeight: 600, display: "block", marginBottom: "6px",
                    }}>{brand.tag}</span>
                    <h3 style={{
                      fontWeight: 700,
                      fontSize: "26px", color: "white", margin: "0 0 8px",
                      letterSpacing: "normal",
                    }}>{brand.name}</h3>
                    <p style={{
                      fontSize: "13px", color: CREAM, lineHeight: 1.6,
                      fontWeight: 300, margin: 0,
                      maxHeight: hovered ? "80px" : "0",
                      overflow: "hidden",
                      transition: "max-height 0.4s ease",
                    }}>{brand.desc}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          CTA — full bleed image, two lines of copy,
          one button. That's it.
      ════════════════════════════════════════════════ */}
      <section ref={ctaRef} style={{
        position: "relative", overflow: "hidden",
        minHeight: "440px", display: "flex", alignItems: "center",
      }}>
        <img src={IMGS.cta} alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(105deg, rgba(15,25,18,0.96) 40%, rgba(15,25,18,0.7) 100%)",
        }} />
        <div className="ct-grain" style={{ zIndex: 1 }} />

        <div style={{
          position: "relative", zIndex: 2,
          padding: "80px 5vw", maxWidth: "680px",
          opacity: ctaVis ? 1 : 0, transform: ctaVis ? "none" : "translateY(20px)",
          transition: "opacity 0.8s, transform 0.8s",
        }}>
          <p style={{ fontSize: "10px", letterSpacing: "3px", color: GOLD, marginBottom: "20px", fontWeight: 600 }}>
            NEW EPISODES OUT NOW
          </p>
          <h2 style={{
            fontWeight: 700,
            fontSize: "clamp(32px, 5vw, 64px)", lineHeight: 1,
            letterSpacing: "0", color: "white", marginBottom: "16px",
          }}>
            Recorded live.<br />
            <span style={{ color: GOLD }}>Heard everywhere.</span>
          </h2>
          <p style={{
            fontSize: "16px", color: CREAM, fontWeight: 300,
            lineHeight: 1.7, marginBottom: "36px", maxWidth: "400px",
          }}>
            Subscribe on YouTube, Spotify, or Apple Podcasts and never miss a conversation.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link to="/episodes" style={{
              display: "inline-block", padding: "13px 32px",
              background: GOLD, color: "#0F1912",
              textDecoration: "none", fontSize: "11px",
              letterSpacing: "2px", fontWeight: 700,
              transition: "opacity 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >EXPLORE EPISODES</Link>
            <Link to="/partner" style={{
              display: "inline-block", padding: "13px 32px",
              border: "1px solid rgba(255,255,255,0.2)", color: CREAM,
              textDecoration: "none", fontSize: "11px",
              letterSpacing: "2px", fontWeight: 500,
              transition: "border-color 0.2s, color 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; e.currentTarget.style.color = "white"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = CREAM; }}
            >PARTNER WITH US</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
