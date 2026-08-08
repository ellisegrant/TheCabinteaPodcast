import { useRef, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { episodes } from "../data/episodes";

function useReveal(threshold = 0.08) {
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

const BG    = "#0F1912";
const PANEL = "#141F18";
const GOLD  = "#C4A44E";
const CREAM = "rgba(214,207,194,0.75)";
const MUTED = "rgba(214,207,194,0.42)";
const display = { fontFamily: "var(--font-display, 'Cormorant Garamond', Georgia, serif)" };

/* ── Article data, keyed by slug ──
   Only "captain-francis-micah" is populated for now. */
const ARTICLES = {
  "captain-francis-micah": {
    tag: "Governance",
    guest: "Captain Francis K.B. Micah",
    role: "Maritime Consultant, former CEO of PSC Tema Shipyard & Harbour Master, Port of Tema",
    location: "Accra, Ghana",
    title: "Captain Micah on Reviving Ghana's Maritime Pride and the Future of the Black Star Line",
    deck: "In a deep-dive conversation on the Cabin Tea Podcast, Captain Micah, former Chief Executive Officer of the Tema Shipyard, shared a vision for Ghana's maritime industry that blends nostalgia with hard-nosed economic reality. From the legacy of the Black Star Line to the critical need for a dedicated maritime ministry, Micah lays out the blueprint for how Ghana can reclaim its status as a leading maritime nation.",
    date: "July 22, 2026",
    duration: "19 min",
    img: "/cap-micah.jpeg",
    imgCaption: "Captain Micah traces his proposal for Ghana's shipping line back to a career that began as a Deck Cadet Officer on the country's original Black Star Line.",
    youtube: "https://www.youtube.com/watch?v=kTQFyOVTqyE",
    youtubeEmbed: "https://www.youtube.com/embed/kTQFyOVTqyE",
    videoTeaser: "Captain Micah exposes why Ghana's maritime industry is broken.",
    sections: [
      {
        heading: "The Legacy of the Black Star Line",
        paragraphs: [
          "The conversation began with the emotional weight of the Black Star Line. Founded shortly after independence, it was more than just a shipping company; it was a symbol of Ghanaian sovereignty. Captain Micah recounted how the generator sets and transformers for the Akosombo Dam were brought into the country by Black Star Line ships, specifically the Lake Bosomtwe.",
          "“It gave us that sense of pride as a nation,” Micah explained. “But today, the dynamics are entirely different. We don’t necessarily need a 100% state-owned shipping line, but we need a state that has a vested interest and a clear policy direction.”",
        ],
      },
      {
        heading: "Why Policy is the Ultimate Navigator",
        paragraphs: [
          "One of the most striking points Micah raised was the comparison to landlocked Ethiopia. Despite having no coastline, Ethiopia maintains a robust shipping line and a world-class nautical institute. The secret? State policy.",
          "Micah argued that Ghana’s maritime efforts are currently fragmented across too many agencies. He pointed to the “Blue Economy” ministries in Kenya, Nigeria, and South Africa as models for success. “Maritime is huge,” he noted. “You don't box up maritime issues with road or rail transport. It requires a dedicated focus and political will.”",
        ],
      },
      {
        heading: "The “Sad” Reality of the Tema Shipyard",
        paragraphs: [
          "As the former head of the Tema Shipyard, Micah didn't hold back on the challenges facing Ghana’s infrastructure. He revealed a “sensitive” and “sad” detail: the official legal title for the shipyard is still PSC Tema Shipyard - named after the Penang Shipyard Corporation that once bought into it.",
          "“If we haven't even been able to change the legal name, how can we move forward with developing the place?” he asked. He emphasized that the shipyard needs a massive injection of capital for modern equipment like high-pressure water blasting and specialized marine steel plates to handle the world's largest vessels.",
        ],
      },
      {
        heading: "A Crisis in Training",
        paragraphs: [
          "Perhaps the most urgent part of the discussion focused on the Regional Maritime University. Micah highlighted a “spanner in the wheel of progress”: the lack of a dedicated training vessel.",
          "Currently, students complete their academic work but have no way to get the mandatory practical sea-time required for their certifications. “I’ve had students who graduated in 2017 come to me in 2023 saying they still haven't had an opportunity to be on a vessel,” Micah shared. He warned that if the state doesn't intervene to provide these training opportunities, the university risks failing its core purpose.",
        ],
      },
      {
        heading: "A Message to the Youth",
        paragraphs: [
          "Despite the hurdles, Captain Micah remains a champion for the industry. His message to the young Ghanaians entering maritime finance, insurance, and engineering was one of resilience. “Do not give up. Remain hopeful that the point will come where these challenges are a thing of the past.”",
        ],
      },
    ],
    timestamps: [
      { t: "01:17", label: "Introduction and initial position on the Black Star Line" },
      { t: "02:20", label: "The changing dynamics of modern shipping lines and state ownership" },
      { t: "03:21", label: "Ethiopian shipping model as a case study for landlocked nations" },
      { t: "04:02", label: "Cabotage and moving goods along the West African corridor" },
      { t: "04:47", label: "Government's role and posture in maritime enterprises" },
      { t: "05:25", label: "Policy fragmentation and the need for a dedicated maritime ministry" },
      { t: "08:52", label: "Tema Shipyard (PSC) and the potential for local shipbuilding" },
      { t: "12:16", label: "The Regional Maritime University and the need for training vessels" },
      { t: "17:42", label: "A final message to the youth" },
    ],
  },
};

/* ── Share icons ── */
function ShareFacebook() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h11.049V14.706h-3.007v-3.63h3.007V8.51c0-2.978 1.816-4.6 4.472-4.6 1.271 0 2.365.095 2.683.137v3.11h-1.842c-1.444 0-1.723.686-1.723 1.694v2.221h3.446l-.449 3.63h-2.997V24h5.873c.978 0 1.771-.773 1.771-1.729V1.729C24 .774 23.203 0 22.225 0z"/></svg>;
}
function ShareX() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
}
function ShareWhatsApp() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.15-.198.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12.05 22h-.005a9.94 9.94 0 01-5.076-1.394L2 21.999l1.42-4.877A9.943 9.943 0 012.05 12C2.05 6.477 6.528 2 12.05 2c2.65 0 5.14 1.037 7.008 2.917A9.936 9.936 0 0122 12.023C22 17.545 17.573 22 12.05 22zm0-18.15c-4.5 0-8.166 3.664-8.166 8.166 0 1.79.578 3.44 1.556 4.786l-.973 3.353 3.44-.955a8.14 8.14 0 004.143 1.13h.004c4.5 0 8.166-3.664 8.166-8.166a8.11 8.11 0 00-2.393-5.783 8.109 8.109 0 00-5.777-2.53z"/></svg>;
}

export default function EpisodeArticle() {
  const { slug } = useParams();
  const article = ARTICLES[slug];

  const [heroRef,    heroVis]    = useReveal(0.05);
  const [bodyRef,     bodyVis]    = useReveal(0.05);
  const [relatedRef, relatedVis] = useReveal(0.08);

  if (!article) {
    return (
      <div style={{ minHeight: "100vh", background: BG, color: "white" }}>
        <Navbar />
        <div style={{ padding: "160px 5vw 120px", textAlign: "center" }}>
          <p style={{ fontSize: "10px", letterSpacing: "3px", color: GOLD, marginBottom: "16px", fontWeight: 600 }}>
            STORY NOT FOUND
          </p>
          <h1 style={{ ...display, fontWeight: 700, fontSize: "clamp(28px, 4vw, 44px)", margin: "0 0 24px" }}>
            This story hasn't been published yet.
          </h1>
          <Link to="/episodes" style={{
            display: "inline-block", padding: "12px 28px",
            background: GOLD, color: BG, textDecoration: "none",
            fontSize: "11px", letterSpacing: "1.5px", fontWeight: 700,
          }}>VIEW ALL EPISODES</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const related = episodes.filter(e => e.slug !== slug).slice(-2);

  return (
    <div style={{ minHeight: "100vh", background: BG, color: "white", overflowX: "hidden" }}>
      <Navbar />

      {/* ════════ HEADER ════════ */}
      <section ref={heroRef} style={{ padding: "128px 5vw 0" }}>
        <div style={{
          maxWidth: "760px", margin: "0 auto",
          opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(16px)",
          transition: "opacity 0.7s, transform 0.7s",
        }}>
          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "22px" }}>
            <Link to="/episodes" style={{
              fontSize: "10px", letterSpacing: "2.5px", color: MUTED,
              textDecoration: "none", fontWeight: 700,
            }}>PODCASTS</Link>
            <span style={{ color: MUTED, fontSize: "10px" }}>·</span>
            <span style={{ fontSize: "10px", letterSpacing: "2.5px", color: GOLD, fontWeight: 700 }}>
              {article.tag.toUpperCase()}
            </span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontWeight: 700, fontSize: "clamp(30px, 4.6vw, 52px)",
            lineHeight: 1.08, letterSpacing: "-0.5px",
            color: "white", margin: "0 0 22px",
          }}>{article.title}</h1>

          {/* Deck */}
          <p style={{ fontSize: "17px", lineHeight: 1.7, color: CREAM, fontWeight: 300, margin: "0 0 28px" }}>
            {article.deck}
          </p>

          {/* Byline row */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            flexWrap: "wrap", gap: "16px",
            paddingBottom: "24px", borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <img src="/YellowNoLogo.png" alt="" style={{ width: "30px", height: "30px", objectFit: "contain", flexShrink: 0 }} />
              <div>
                <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.5px", color: "white", margin: 0 }}>
                  CABIN TEA STAFF
                </p>
                <p style={{ fontSize: "11px", color: MUTED, margin: 0 }}>
                  {article.date} · {article.duration} watch
                </p>
              </div>
            </div>

            {/* Share */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook" style={{
                width: "32px", height: "32px", borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                border: "1px solid rgba(255,255,255,0.15)", color: CREAM, transition: "border-color 0.2s, color 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.color = GOLD; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = CREAM; }}
              ><ShareFacebook /></a>
              <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(article.title)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on X" style={{
                width: "32px", height: "32px", borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                border: "1px solid rgba(255,255,255,0.15)", color: CREAM, transition: "border-color 0.2s, color 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.color = GOLD; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = CREAM; }}
              ><ShareX /></a>
              <a href={`https://wa.me/?text=${encodeURIComponent(`${article.title} ${shareUrl}`)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp" style={{
                width: "32px", height: "32px", borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                border: "1px solid rgba(255,255,255,0.15)", color: CREAM, transition: "border-color 0.2s, color 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.color = GOLD; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = CREAM; }}
              ><ShareWhatsApp /></a>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ HERO IMAGE ════════ */}
      <section style={{ padding: "40px 5vw 0" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <div style={{ background: PANEL, overflow: "hidden" }}>
            <img src={article.img} alt={article.title} style={{ width: "100%", height: "auto", display: "block" }} />
          </div>
          <p style={{ fontSize: "12px", lineHeight: 1.6, color: MUTED, margin: "12px 0 0" }}>
            {article.imgCaption}{" "}
            <span style={{ color: "rgba(214,207,194,0.3)" }}>Photo courtesy of Cabin Tea.</span>
          </p>
        </div>
      </section>

      {/* ════════ BODY ════════ */}
      <section ref={bodyRef} style={{ padding: "40px 5vw 0" }}>
        <div style={{
          maxWidth: "760px", margin: "0 auto",
          opacity: bodyVis ? 1 : 0, transform: bodyVis ? "none" : "translateY(16px)",
          transition: "opacity 0.7s, transform 0.7s",
        }}>
          {article.sections.map((section, i) => (
            <div key={i} style={{ marginBottom: "8px" }}>
              <h2 style={{ fontSize: "20px", fontWeight: 700, color: "white", margin: i === 0 ? "0 0 16px" : "36px 0 16px" }}>
                {section.heading}
              </h2>
              {section.paragraphs.map((p, j) => (
                <p key={j} style={{ fontSize: "16px", lineHeight: 1.85, color: CREAM, fontWeight: 300, margin: "0 0 20px" }}>{p}</p>
              ))}
            </div>
          ))}

          {/* Key moments */}
          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "white", margin: "0 0 18px" }}>Key Moments</h2>
          <div style={{ marginBottom: "40px" }}>
            {article.timestamps.map((ts, i) => (
              <div key={ts.t} style={{
                display: "flex", gap: "16px", alignItems: "baseline",
                padding: "12px 0",
                borderTop: i === 0 ? "1px solid rgba(255,255,255,0.08)" : "none",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
              }}>
                <span style={{ fontSize: "12px", color: GOLD, fontWeight: 700, letterSpacing: "0.5px", flexShrink: 0, width: "42px" }}>{ts.t}</span>
                <span style={{ fontSize: "14px", color: CREAM, fontWeight: 300, lineHeight: 1.5 }}>{ts.label}</span>
              </div>
            ))}
          </div>

          {/* Video embed */}
          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "white", margin: "0 0 12px" }}>Watch the Episode</h2>
          {article.videoTeaser && (
            <p style={{ fontSize: "15px", lineHeight: 1.7, color: CREAM, fontWeight: 300, margin: "0 0 18px" }}>{article.videoTeaser}</p>
          )}
          <div style={{ position: "relative", paddingTop: "56.25%", background: PANEL, marginBottom: "20px" }}>
            <iframe
              src={article.youtubeEmbed}
              title={article.title}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <a href={article.youtube} target="_blank" rel="noopener noreferrer" style={{
            display: "inline-flex", alignItems: "center", gap: "9px",
            padding: "12px 26px", background: GOLD, color: BG,
            textDecoration: "none", fontSize: "10px",
            letterSpacing: "2px", fontWeight: 700, marginBottom: "56px",
          }}>
            <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor"><path d="M0 0l10 6-10 6V0z"/></svg>
            WATCH ON YOUTUBE
          </a>
        </div>
      </section>

      {/* ════════ RELATED ════════ */}
      {related.length > 0 && (
        <section ref={relatedRef} style={{ background: PANEL, padding: "56px 5vw" }}>
          <div style={{
            maxWidth: "760px", margin: "0 auto",
            opacity: relatedVis ? 1 : 0, transform: relatedVis ? "none" : "translateY(16px)",
            transition: "opacity 0.7s, transform 0.7s",
          }}>
            <p style={{ fontSize: "10px", letterSpacing: "3px", color: GOLD, marginBottom: "22px", fontWeight: 600 }}>
              MORE EPISODES
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>
              {related.map(ep => (
                <Link key={ep.num} to="/episodes" style={{ textDecoration: "none", display: "block" }}>
                  <div style={{ height: "160px", overflow: "hidden", marginBottom: "12px" }}>
                    <img src={ep.img.startsWith("/") ? ep.img : `/${ep.img}`} alt={ep.guest} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </div>
                  <p style={{ fontSize: "9px", letterSpacing: "2px", color: GOLD, fontWeight: 700, margin: "0 0 6px" }}>
                    EP. {ep.num} · {ep.tag.toUpperCase()}
                  </p>
                  <p style={{ fontSize: "15px", fontWeight: 700, color: "white", margin: 0, lineHeight: 1.35 }}>{ep.guest}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
