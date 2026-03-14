import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WaveLine from "../components/WaveLine";

const stats = [
  { value: "60", label: "MIN", sub: "Per Episode" },
  { value: "3", label: "PLATFORMS", sub: "Distribution" },
  { value: "Live", label: "+", sub: "Accra Sessions" },
];

export default function About() {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden">

      <Navbar activePage="ABOUT" />

      {/* ═══ PAGE HEADER ═══ */}
      <section className="px-6 md:px-12 pt-10 pb-6" style={{ background: "var(--cream)" }}>
        <span
          className="font-medium block mb-2"
          style={{ fontSize: "12px", letterSpacing: "3px", color: "var(--text-muted)" }}
        >
          ABOUT CABIN TEA
        </span>
        <h1
          className="font-display italic font-bold"
          style={{ fontSize: "clamp(28px, 4vw, 42px)", color: "var(--dark)", lineHeight: 1.2 }}
        >
          Every great conversation starts with a cup of tea.
        </h1>
      </section>

      {/* ═══ MAIN CONTENT ═══ */}
      <section
        className="flex-1 flex flex-col lg:flex-row px-6 md:px-12 py-10 gap-10"
        style={{ background: "var(--cream)" }}
      >
        {/* ─── LEFT: The Show ─── */}
        <div className="lg:flex-1 anim-fade-up">
          <span
            className="font-medium block mb-3"
            style={{ fontSize: "12px", letterSpacing: "3px", color: "var(--teal)" }}
          >
            THE SHOW
          </span>

          <div className="mb-6" style={{ maxWidth: "420px" }}>
            <WaveLine />
          </div>

          <p
            className="mb-6 font-light"
            style={{ fontSize: "15px", lineHeight: 1.8, color: "var(--dark)", maxWidth: "560px" }}
          >
            Cabin Tea is a live podcast series rooted in the Gulf of Guinea
            and the ocean communities of West Africa. We bring together the
            people who know the sea — marine scientists, fishers, maritime
            lawyers, port officers, and the artists, economists, and community
            leaders whose lives are shaped by the ocean in less visible ways.
          </p>

          <p
            className="mb-8 font-light"
            style={{ fontSize: "15px", lineHeight: 1.8, color: "var(--dark)", maxWidth: "560px" }}
          >
            Each episode — Sipping with [Guest Name] — is recorded live before
            a curated audience in Accra, and distributed globally on YouTube,
            Spotify and Apple Podcasts. The format is intentionally unhurried:
            one hour, one guest, one conversation, one cup of tea.
          </p>

          <p
            className="font-serif italic"
            style={{ fontSize: "17px", lineHeight: 1.7, color: "var(--teal)", maxWidth: "540px" }}
          >
            The name matters. A ship's cabin is where honest conversations
            happen — below deck, away from performance, between people who
            trust each other. That's what we're building.
          </p>
        </div>

        {/* ─── RIGHT: Stats + Host ─── */}
        <div className="lg:flex-1 flex flex-col gap-6 anim-fade-up-d2" style={{ maxWidth: "520px" }}>

          {/* Stats row */}
          <div className="flex gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex-1 rounded p-5 text-center"
                style={{ background: "var(--dark)", border: "1px solid rgba(44,140,124,0.3)" }}
              >
                <span
                  className="font-display font-bold block"
                  style={{ fontSize: "42px", color: "var(--text-main)", lineHeight: 1 }}
                >
                  {stat.value}
                </span>
                <span
                  className="font-medium block mt-1"
                  style={{ fontSize: "10px", letterSpacing: "2px", color: "var(--gold)" }}
                >
                  {stat.label}
                </span>
                <span
                  className="block mt-1"
                  style={{ fontSize: "12px", color: "var(--text-muted)" }}
                >
                  {stat.sub}
                </span>
              </div>
            ))}
          </div>

          {/* Host card */}
          <div
            className="rounded p-6 flex flex-col gap-4"
            style={{ background: "var(--dark)", border: "1px solid rgba(44,140,124,0.3)" }}
          >
            <div className="flex items-center gap-5">
              {/* Host avatar placeholder */}
              <div
                className="shrink-0 rounded-full flex items-center justify-center"
                style={{
                  width: "90px",
                  height: "90px",
                  background: "var(--teal)",
                  border: "2px solid var(--gold)",
                }}
              >
                <span
                  className="font-medium"
                  style={{ fontSize: "10px", letterSpacing: "2px", color: "var(--dark)" }}
                >
                  HOST
                </span>
              </div>

              <div>
                <h3
                  className="font-display text-white font-bold mb-1"
                  style={{ fontSize: "22px" }}
                >
                  YOUR NAME
                </h3>
                <p style={{ fontSize: "13px", color: "var(--gold)", letterSpacing: "0.5px" }}>
                  Host & Creator, Cabin Tea
                </p>
                <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                  Gulf of Guinea Maritime Institute, Accra
                </p>
              </div>
            </div>

            <div style={{ maxWidth: "320px" }}>
              <WaveLine color="var(--teal)" />
            </div>

            <p
              className="font-serif italic"
              style={{ fontSize: "15px", lineHeight: 1.7, color: "var(--text-main)" }}
            >
              Add your bio here — your background, your connection to the ocean,
              and what drove you to create Cabin Tea. This is your moment to make
              the audience feel like they already know you before the show even starts.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}