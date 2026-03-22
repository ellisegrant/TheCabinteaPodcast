import { useState, useRef, useEffect } from "react";

/* ─────────────────────────────────────────
   EpisodePlayer
   A persistent bottom bar that plays audio
   across all pages — like Monocle's radio bar.
   Usage: wrap your app with <PlayerProvider>
   and call usePlayer() from any component.
───────────────────────────────────────── */

import { createContext, useContext } from "react";

const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
  const [track, setTrack] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.play().catch(() => setPlaying(false));
    } else {
      audioRef.current.pause();
    }
  }, [playing, track]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
  }, [volume]);

  const play = (episode) => {
    if (track?.id === episode.id) {
      setPlaying((p) => !p);
    } else {
      setTrack(episode);
      setProgress(0);
      setPlaying(true);
    }
  };

  const togglePlay = () => setPlaying((p) => !p);

  const seek = (pct) => {
    if (!audioRef.current || !duration) return;
    audioRef.current.currentTime = pct * duration;
    setProgress(pct);
  };

  return (
    <PlayerContext.Provider value={{ track, playing, progress, duration, volume, play, togglePlay, seek, setVolume }}>
      {children}
      {track && (
        <audio
          ref={audioRef}
          src={track.audioUrl}
          onTimeUpdate={() => {
            const a = audioRef.current;
            if (a && a.duration) setProgress(a.currentTime / a.duration);
          }}
          onLoadedMetadata={() => {
            if (audioRef.current) setDuration(audioRef.current.duration);
          }}
          onEnded={() => setPlaying(false)}
        />
      )}
      <PlayerBar />
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  return useContext(PlayerContext);
}

/* ── Format seconds → mm:ss ── */
function fmt(s) {
  if (!s || isNaN(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

function PlayerBar() {
  const ctx = useContext(PlayerContext);
  const [visible, setVisible] = useState(false);
  const [dragging, setDragging] = useState(false);
  const barRef = useRef(null);

  useEffect(() => {
    if (ctx?.track) {
      setTimeout(() => setVisible(true), 50);
    } else {
      setVisible(false);
    }
  }, [ctx?.track]);

  if (!ctx?.track) return null;

  const { track, playing, progress, duration, volume, togglePlay, seek, setVolume } = ctx;

  const handleBarClick = (e) => {
    const rect = barRef.current.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    seek(Math.max(0, Math.min(1, pct)));
  };

  return (
    <div style={{
      position: "fixed",
      bottom: 0, left: 0, right: 0,
      zIndex: 200,
      background: "rgba(18,36,40,0.97)",
      backdropFilter: "blur(20px)",
      borderTop: "1px solid rgba(196,164,78,0.25)",
      transform: visible ? "translateY(0)" : "translateY(100%)",
      transition: "transform 0.45s cubic-bezier(0.16,1,0.3,1)",
      boxShadow: "0 -8px 32px rgba(0,0,0,0.4)",
    }}>
      {/* Progress bar — top edge, clickable */}
      <div
        ref={barRef}
        onClick={handleBarClick}
        style={{
          position: "absolute", top: 0, left: 0, right: 0,
          height: "3px", cursor: "pointer",
          background: "rgba(255,255,255,0.08)",
        }}
      >
        <div style={{
          height: "100%",
          width: `${progress * 100}%`,
          background: "var(--gold, #c4a44e)",
          transition: dragging ? "none" : "width 0.25s linear",
          borderRadius: "0 2px 2px 0",
        }} />
      </div>

      <div style={{
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
        height: "68px",
        gap: "20px",
        maxWidth: "1400px",
        margin: "0 auto",
      }}>

        {/* Episode info */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px", flex: "0 0 auto", maxWidth: "260px", minWidth: 0 }}>
          <div style={{
            width: "40px", height: "40px", borderRadius: "4px",
            background: "rgba(44,140,124,0.3)",
            border: "1px solid rgba(44,140,124,0.4)",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>
            <svg width="10" height="12" viewBox="0 0 10 12" fill="var(--gold, #c4a44e)">
              <path d="M0 0l10 6-10 6V0z" />
            </svg>
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{
              fontSize: "9px", letterSpacing: "2px",
              color: "rgba(196,164,78,0.6)", marginBottom: "2px",
            }}>EP. {track.num || "01"}</div>
            <div style={{
              fontSize: "13px", fontWeight: 500, color: "white",
              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            }}>{track.guest}</div>
          </div>
        </div>

        {/* Playback controls — center */}
        <div style={{ display: "flex", alignItems: "center", gap: "24px", flex: 1, justifyContent: "center" }}>
          {/* Skip back 15s */}
          <button onClick={() => { if(ctx.seek && ctx.duration) ctx.seek(Math.max(0, progress - 15/duration)); }}
            style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.45)", padding: "4px", transition: "color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.color = "white"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.45)"}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M1 4v6h6"/><path d="M3.51 15a9 9 0 1 0 .49-3.96"/>
              <text x="8" y="14" fontSize="7" fill="currentColor" stroke="none" fontWeight="600">15</text>
            </svg>
          </button>

          {/* Play / Pause */}
          <button
            onClick={togglePlay}
            style={{
              width: "44px", height: "44px", borderRadius: "50%",
              background: "var(--gold, #c4a44e)",
              border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "transform 0.2s, opacity 0.2s", flexShrink: 0,
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >
            {playing ? (
              <svg width="14" height="16" viewBox="0 0 14 16" fill="var(--dark, #152a2f)">
                <rect x="0" y="0" width="4.5" height="16" rx="1.5"/>
                <rect x="9.5" y="0" width="4.5" height="16" rx="1.5"/>
              </svg>
            ) : (
              <svg width="13" height="15" viewBox="0 0 10 12" fill="var(--dark, #152a2f)">
                <path d="M0 0l10 6-10 6V0z" />
              </svg>
            )}
          </button>

          {/* Skip forward 30s */}
          <button onClick={() => { if(ctx.seek && ctx.duration) ctx.seek(Math.min(1, progress + 30/duration)); }}
            style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.45)", padding: "4px", transition: "color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.color = "white"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.45)"}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M23 4v6h-6"/><path d="M20.49 15a9 9 0 1 1-.49-3.96"/>
              <text x="8" y="14" fontSize="7" fill="currentColor" stroke="none" fontWeight="600">30</text>
            </svg>
          </button>
        </div>

        {/* Time */}
        <div style={{
          fontSize: "11px", fontWeight: 500,
          color: "rgba(255,255,255,0.35)",
          letterSpacing: "1px", flexShrink: 0,
          display: "flex", gap: "4px",
        }}>
          <span style={{ color: "rgba(255,255,255,0.65)" }}>{fmt(progress * duration)}</span>
          <span>/</span>
          <span>{fmt(duration)}</span>
        </div>

        {/* Volume — desktop only */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }} className="ct-desktop-nav">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.8" strokeLinecap="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            {volume > 0.5 && <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>}
            {volume > 0 && <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>}
          </svg>
          <input
            type="range" min="0" max="1" step="0.02"
            value={volume}
            onChange={e => setVolume(parseFloat(e.target.value))}
            style={{ width: "72px", accentColor: "var(--gold, #c4a44e)", cursor: "pointer" }}
          />
        </div>

        {/* Close */}
        <button
          onClick={() => { ctx.togglePlay && ctx.playing && ctx.togglePlay(); setVisible(false); setTimeout(() => ctx.play && (ctx.track = null), 500); }}
          style={{
            background: "none", border: "none", cursor: "pointer",
            color: "rgba(255,255,255,0.25)", padding: "6px",
            transition: "color 0.2s", flexShrink: 0,
          }}
          onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.7)"}
          onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.25)"}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M1 1l12 12M13 1L1 13"/>
          </svg>
        </button>
      </div>
      <style>{`
        @media (max-width: 767px) { .ct-desktop-nav { display: none !important; } }
      `}</style>
    </div>
  );
}
