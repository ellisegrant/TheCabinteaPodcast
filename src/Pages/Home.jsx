import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WaveLine from "../components/WaveLine";
import EpisodeArtwork from "../components/EpisodeArtwork";
import PlayIcon from "../components/PlayIcon";
import CornerArc from "../components/CornerArc";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden">

      <Navbar activePage="HOME" />

      {/* ═══ HERO SECTION ═══ */}
      <main className="flex-1 flex flex-col relative">
        <CornerArc />

        <div className="flex-1 flex flex-col lg:flex-row p-6 md:p-12 pb-8 gap-10 relative">

          {/* ─── LEFT: Hero content ─── */}
          <div className="lg:flex-1 flex flex-col justify-center lg:pr-6">

            <h1
              className="anim-fade-up font-display text-white font-black mb-1"
              style={{
                fontSize: "clamp(72px, 10vw, 140px)",
                lineHeight: 0.88,
                letterSpacing: "-2px",
              }}
            >
              CABIN<br />TEA
            </h1>

            <p
              className="anim-fade-up-d1 font-serif italic mb-3"
              style={{
                color: "var(--gold)",
                fontSize: "clamp(18px, 2.2vw, 26px)",
                lineHeight: 1.3,
              }}
            >
              Sipping with the people who know the sea.
            </p>

            <div className="anim-fade-up-d2 mb-7" style={{ maxWidth: "420px" }}>
              <WaveLine />
            </div>

            <p
              className="anim-fade-up-d2 mb-8 font-light"
              style={{
                fontSize: "15px",
                lineHeight: 1.75,
                color: "rgba(214,207,194,0.8)",
                maxWidth: "520px",
              }}
            >
              A live conversation series where ocean professionals and unexpected
              ocean-adjacent voices come together over a carefully chosen cup of
              tea. Recorded in Accra. Heard everywhere.
            </p>

            <div className="anim-fade-up-d3 flex gap-4 flex-wrap mb-7">
              <button
                className="ct-btn-outline py-3.5 px-8 font-medium text-xs cursor-pointer"
                style={{ letterSpacing: "3px" }}
              >
                LISTEN NOW
              </button>
              <button
                className="ct-btn-gold py-3.5 px-8 font-medium text-xs cursor-pointer"
                style={{ letterSpacing: "3px" }}
              >
                PARTNER WITH US
              </button>
            </div>

            <div className="anim-fade-up-d4 flex gap-3 flex-wrap">
              {["YouTube", "Spotify", "Apple Podcasts"].map((platform) => (
                <a
                  key={platform}
                  href="#"
                  className="ct-platform py-2.5 px-6 text-xs no-underline"
                  style={{ letterSpacing: "1.5px" }}
                >
                  {platform}
                </a>
              ))}
            </div>
          </div>

          {/* ─── RIGHT: Latest Episode Card ─── */}
          <div
            className="anim-slide-right ct-episode-card rounded p-8 pb-9 flex flex-col self-center relative overflow-hidden mt-4 lg:mt-0"
            style={{ flex: "0 1 460px", maxWidth: "460px" }}
          >
            {/* Gold top accent line */}
            <div className="absolute top-0 left-6 right-6 h-[3px]" style={{ background: "var(--gold)" }} />

            <span
              className="font-medium mb-5"
              style={{ fontSize: "11px", letterSpacing: "3px", color: "rgba(255,255,255,0.7)" }}
            >
              LATEST EPISODE
            </span>

            <div className="ct-episode-artwork-wrap rounded p-5 mb-6">
              <EpisodeArtwork num="01" size={180} />
            </div>

            <p
              className="font-serif mb-0.5"
              style={{ fontSize: "17px", color: "rgba(255,255,255,0.75)" }}
            >
              Sipping with
            </p>

            <h3
              className="font-display text-white font-bold mb-2 leading-tight"
              style={{ fontSize: "28px" }}
            >
              Amara Diallo
            </h3>

            <p
              className="mb-4"
              style={{ fontSize: "13px", letterSpacing: "1px", color: "rgba(214,207,194,0.65)" }}
            >
              Maritime Lawyer · Dakar
            </p>

            <p
              className="font-serif italic leading-relaxed mb-6"
              style={{ fontSize: "15.5px", color: "var(--gold)" }}
            >
              "Who Really Owns the Sea?" — ocean governance, identity and the
              politics of West African waters.
            </p>

            <button className="flex items-center gap-3.5 bg-transparent border-none p-0 cursor-pointer hover:opacity-80 transition-opacity duration-300">
              <PlayIcon size={40} />
              <span
                className="font-medium text-xs"
                style={{ letterSpacing: "2.5px", color: "rgba(255,255,255,0.7)" }}
              >
                PLAY EPISODE
              </span>
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}