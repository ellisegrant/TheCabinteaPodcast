import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EpisodeArtwork from "../components/EpisodeArtwork";
import PlayIcon from "../components/PlayIcon";

const episodes = [
  {
    num: "01",
    guest: "Amara Diallo",
    role: "Maritime Lawyer",
    location: "Dakar",
    title: '"Who Really Owns the Sea?"',
    tag: "Governance",
    tagColor: "#C4A44E",
    season: 1,
  },
  {
    num: "02",
    guest: "Kofi Mensah",
    role: "Documentary Filmmaker",
    location: "Accra",
    title: '"The Last Fisher"',
    tag: "Community",
    tagColor: "#2C8C7C",
    season: 1,
  },
  {
    num: "03",
    guest: "Nkechi Obi",
    role: "Marine Economist",
    location: "Lagos",
    title: '"Blue Money"',
    tag: "Blue Economy",
    tagColor: "#1E6B5F",
    season: 1,
  },
];

const filters = ["All Episodes", "Season 1", "Most Recent"];

export default function Episodes() {
  const [activeFilter, setActiveFilter] = useState("All Episodes");

  return (
    <div className="min-h-screen flex flex-col overflow-hidden" style={{ background: "var(--dark)" }}>

      <Navbar activePage="EPISODES" />

      {/* ═══ PAGE HEADER ═══ */}
      <section className="px-6 md:px-12 pt-10 pb-6">
        <span
          className="font-medium block mb-2"
          style={{ fontSize: "12px", letterSpacing: "3px", color: "var(--gold)" }}
        >
          EPISODES
        </span>
        <h1
          className="font-serif italic"
          style={{ fontSize: "clamp(24px, 3.5vw, 36px)", color: "var(--gold)", lineHeight: 1.3 }}
        >
          Every conversation. Every cup.
        </h1>
      </section>

      {/* ═══ FILTER TABS ═══ */}
      <div className="px-6 md:px-12 pb-8">
        <div className="flex gap-3 flex-wrap">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className="ct-filter-tab py-2.5 px-6 text-xs font-medium cursor-pointer"
              style={{
                letterSpacing: "1.5px",
                background: activeFilter === filter ? "var(--gold)" : "transparent",
                color: activeFilter === filter ? "var(--dark)" : "var(--text-muted)",
                border: activeFilter === filter
                  ? "1px solid var(--gold)"
                  : "1px solid rgba(138,158,165,0.35)",
              }}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* ═══ EPISODES GRID ═══ */}
      <section className="flex-1 px-6 md:px-12 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {episodes.map((ep, i) => (
            <div
              key={ep.num}
              className={`ct-episode-card rounded overflow-hidden flex flex-col anim-fade-up${i > 0 ? `-d${i}` : ""}`}
            >
              {/* Artwork section */}
              <div className="p-6 pb-4" style={{ background: "var(--teal-dark)" }}>
                <EpisodeArtwork num={ep.num} size={180} />
              </div>

              {/* Tag */}
              <div className="px-6 pt-4">
                <span
                  className="inline-block py-1 px-3 rounded-sm text-xs font-medium"
                  style={{
                    background: ep.tagColor,
                    color: ep.tagColor === "#C4A44E" ? "var(--dark)" : "white",
                    letterSpacing: "1px",
                    fontSize: "11px",
                  }}
                >
                  {ep.tag}
                </span>
              </div>

              {/* Info section */}
              <div className="px-6 pt-4 pb-6 flex flex-col flex-1">
                <p
                  className="font-serif mb-0.5"
                  style={{ fontSize: "14px", color: "var(--text-muted)" }}
                >
                  Sipping with
                </p>
                <h3
                  className="font-display text-white font-bold mb-1.5"
                  style={{ fontSize: "24px", lineHeight: 1.2 }}
                >
                  {ep.guest}
                </h3>
                <p
                  className="mb-4"
                  style={{ fontSize: "13px", letterSpacing: "0.5px", color: "var(--gold)" }}
                >
                  {ep.role} · {ep.location}
                </p>
                <p
                  className="font-serif italic mb-6"
                  style={{ fontSize: "15px", lineHeight: 1.5, color: "var(--text-main)" }}
                >
                  {ep.title}
                </p>

                {/* Play row */}
                <div className="mt-auto flex items-center gap-3">
                  <PlayIcon size={36} />
                  <span
                    className="font-medium"
                    style={{ fontSize: "11px", letterSpacing: "2px", color: "var(--text-muted)" }}
                  >
                    PLAY · 60 MIN
                  </span>
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