import { useRef, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { episodes, journalArticles } from "../data/episodes";

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

/* ── Article data, keyed by slug ── */
const ARTICLES = {
  "christopher-trelawny": {
    tag: "Community",
    guest: "Christopher Trelawny",
    role: "Deputy Secretary-General, Office of Secretary General INTERPORTPOLICE, former Special Adviser to the IMO Secretary General",
    location: "Kenya",
    title: "The 200 Mile Strategic Blindspot: Christopher Trelawny on the Real Cost of Africa's Wealth Blindness",
    deck: "In the grand narrative of a rising Africa, the conversation almost always turns toward the red earth of the interior. We speak of cross border rails, new tech hubs in the highlands, and the potential of the Sahel. But according to Christopher Trelawny, a veteran strategist and former Special Adviser to the IMO Secretary General, we are looking in the wrong direction. While the land gets the headlines, the true engine of the continent's future is idling 200 miles offshore.",
    lead: "On the latest episode of the Cabin Tea podcast, Trelawny delivered a blunt assessment of why the continent is struggling to monetize its waters. It isn't just about a lack of patrol boats or high tech surveillance. It is about a fundamental misunderstanding of what maritime security actually is and who it is for.",
    date: "May 13, 2026",
    duration: "47 min",
    img: "/christopher2.jpeg",
    imgCaption: "Christopher Trelawny, recorded on location in Kenya, argues Africa's blue economy is a current reality waiting for a better business plan.",
    youtube: "https://www.youtube.com/watch?v=PfKqXzdO4u0",
    youtubeEmbed: "https://www.youtube.com/embed/PfKqXzdO4u0",
    videoTeaser: "Watch the full conversation on Africa's maritime identity.",
    sections: [
      {
        heading: "The Problem of Wealth Blindness",
        paragraphs: [
          "The most critical takeaway from Trelawny's decades at the International Maritime Organization is the concept of Wealth Blindness. He argues that many African states have a cultural tendency to view their maritime domain as a security headache rather than a commercial asset. We see the ocean as a border to be guarded rather than a field to be harvested.",
          "“Security is an enabler, not an end in itself,” Trelawny notes. The overlooked detail here is the return on investment. When a nation fails to secure its Exclusive Economic Zone, it isn't just inviting illegal fishing or piracy. It is driving up insurance premiums and shipping costs that act as an invisible tax on every citizen. Whether you live in a coastal port or a landlocked city like Ouagadougou, you are paying for the insecurity of the waves every time you buy a bag of grain.",
        ],
      },
      {
        heading: "A Tale of Two Codes",
        paragraphs: [
          "Trelawny highlights a structural flaw in how maritime policy is built across the continent. He points to the stark difference between the Djibouti Code in East Africa and the Yaoundé Code in West Africa. One was driven by transport ministers and focused on the civilian side of trade, while the other was born from a military led initiative.",
          "For the Blue Economy to truly take root, these two worlds must finally merge. You cannot have a thriving port if the Navy and the Port Authority are operating in different silos. The solution is a unified maritime governance model that treats the ocean with the same administrative respect we give the land. It is about recognizing that the sea is just as much a part of the national estate as any province or region.",
        ],
      },
      {
        heading: "The Seafarer's Dilemma",
        paragraphs: [
          "One of the most technical yet vital parts of the discussion centered on the human element: the Seafarer's Dilemma. Trelawny pulls back the curtain on the intense negotiations regarding whether to arm merchant ships.",
          "The reality is that the industry's refusal to arm sailors wasn't just a safety choice; it was a legal and moral necessity. If a sailor picks up a weapon, they lose their protected status as a civilian worker under international law. This is a crucial point for African states to understand. We cannot fix a security problem by turning our maritime workforce into combatants. We must protect the dignity of the profession to ensure the next generation of African youth sees the sea as a viable, honorable career.",
        ],
      },
      {
        heading: "The Spirit of Yaoundé",
        paragraphs: [
          "Trelawny recounts a rare moment of clarity in 2013 when thirteen African Heads of State gathered in a single room to sign the Yaoundé Code. He describes it as a moment where the political will finally matched the scale of the problem. It was a rare instance of the continent's kings and presidents looking at the water and claiming it as their own.",
          "His message to current leaders is that this spirit needs to be reactivated. Maritime security shouldn't be a niche topic for admirals discussed in dark rooms. It should be a standing item on every President's economic agenda. The ocean is the thread that stitches the entire continent's economy together, and it is time we treated it with that level of gravity.",
        ],
      },
      {
        heading: "The Bottom Line",
        paragraphs: [
          "Christopher Trelawny's briefing is a reminder that Africa's Blue Economy isn't a distant dream. It is a current reality that is simply waiting for a better business plan. Until the continent stops being blind to the wealth within its reach, the 200 miles of opportunity will remain a 200 mile liability.",
        ],
      },
    ],
    timestamps: [
      { t: "00:00", label: "The “Sea Blindness” & “Wealth Blindness” issue" },
      { t: "10:12", label: "The 200-mile zone of opportunity: security as a wealth enabler" },
      { t: "13:34", label: "The birth of the Djibouti Code of Conduct" },
      { t: "19:10", label: "The controversial debate over armed guards on ships" },
      { t: "20:42", label: "Piracy vs. armed robbery: the 12-mile jurisdictional difference" },
      { t: "27:17", label: "The Yaoundé Code of Conduct: political support & architecture" },
      { t: "30:52", label: "Comparing the Djibouti & Yaoundé Code approaches" },
      { t: "36:33", label: "Sustainable blue economy: protecting fisheries & licenses" },
      { t: "46:11", label: "Final thoughts: wealth creation for African economies" },
    ],
  },
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
  "gulf-of-guinea-vs-strait-of-hormuz": {
    tag: "Opinion",
    byline: "Lawrence Dogli",
    bylineRole: "Curator and Creative Director, Cabin Tea",
    title: "If the Gulf of Guinea Is Safer than the Strait of Hormuz, Why Aren't the Tankers Coming?",
    deck: "Cabin Tea founder Lawrence Dogli argues that safety alone won't pull tankers toward West Africa — the Gulf of Guinea needs the loading architecture, infrastructure and commercial confidence that made the Strait of Hormuz indispensable in the first place.",
    lead: "The question of whether the Gulf of Guinea is safer than the Strait of Hormuz may be less straightforward than it first appears. Safer for whom? Safer against what? And safer in relation to which conception of maritime security?",
    date: "August 14, 2026",
    readTime: "5 min read",
    img: "/gog-hormuz-tankers.jpeg",
    imgCaption: "A small boat sails past cargo ships and other commercial vessels anchored in the Strait of Hormuz off Bandar Abbas, Iran, Wednesday, Aug. 5, 2026.",
    imgCredit: "Amirhosein Khorgooi/ISNA via AP",
    sections: [
      {
        heading: "Different Waters, Different Dangers",
        paragraphs: [
          "The Gulf of Guinea and the Strait of Hormuz have very different security environments. The Gulf of Guinea has historically been associated with piracy, armed robbery, kidnapping, illegal bunkering, trafficking and IUU fishing. Hormuz presents a different risk profile, shaped far more heavily by geopolitical tensions, military confrontation and the vulnerability of a critical energy chokepoint. The International Energy Agency estimates that about 20 million barrels per day of crude oil and oil products moved through Hormuz in 2025, representing around a quarter of global seaborne oil trade. At the same time, the IMO continues to maintain dedicated reporting on piracy and armed robbery in the Gulf of Guinea and other regions.",
          "So perhaps asking which waterway is simply “safer” misses the point. Different maritime spaces have different degrees and types of insecurity.",
        ],
      },
      {
        heading: "Tankers Follow Cargo, Not Safety",
        paragraphs: [
          "But let us accept the proposition for a moment: if the Gulf of Guinea can provide a comparatively safer environment for commercial shipping, why are the oil tankers not choosing alternative sources of oil and gas from West Africa? There is an obvious answer: a tanker does not choose a sea simply because it is safe. It follows the cargo, and the cargo follows an energy system.",
          "Hormuz is not strategically important merely because tankers pass through it. Its importance comes from the enormous concentration of oil and gas production, export infrastructure, storage, pipelines, terminals, refineries, markets and established commercial relationships surrounding it. The geography has been reinforced by decades of investment and geopolitical interest. Its vulnerability is therefore also a consequence of its strategic importance.",
        ],
      },
      {
        heading: "Ghana, Nigeria, and the Resources Already in Place",
        paragraphs: [
          "Ghana has oil and is developing a Petroleum Hub in Jomoro, with plans that include refineries, petrochemical facilities, substantial storage capacity and jetties for import and export activities. The project is explicitly conceived as part of a regional energy and petroleum ecosystem. Nigeria provides the scale, with its established oil and gas industry and ambitions to connect its gas resources to European markets through the Trans-Saharan Gas Pipeline. Construction of Algeria's section of that project has now commenced.",
          "The resources, therefore, are not the central question. The question is whether the Gulf of Guinea can develop the loading architecture, storage, pipelines, ports, processing capacity, markets, insurance environment and maritime-security arrangements required to make those resources commercially attractive to international shipping.",
        ],
      },
      {
        heading: "More Than Safe Waters: Building a Complete Energy Corridor",
        paragraphs: [
          "If tankers are to choose the Gulf of Guinea, the region must offer more than safe waters. It must offer a complete and reliable energy corridor. And security is only one part of that proposition.",
          "There must be confidence that a tanker can load efficiently. That cargo will be available reliably. That ports can handle the required volumes. That infrastructure will function. That insurance costs will remain commercially viable. That contracts and regulations will be predictable. And that the sea line connecting the cargo to its market will remain secure.",
          "The Mahanian conception of sea power reminds us that maritime power is closely connected to commerce and the ability to maintain the communications through which commerce moves. A naval or maritime-security posture is therefore not valuable only because it can confront threats. Its deeper economic value lies in creating confidence that commercial activity can continue.",
        ],
      },
      {
        heading: "From Protecting Waters to Creating Confidence",
        paragraphs: [
          "That raises a different question for the Gulf of Guinea: Can we build a maritime-security architecture that does not merely protect our waters, but makes those waters commercially attractive? A region can have oil without becoming an energy corridor. It can have ports without becoming a maritime hub. It can have naval assets without creating commercial confidence. And it can reduce piracy without necessarily attracting greater energy investment.",
          "Ghana's Petroleum Hub, Nigeria's energy resources, the ports and offshore infrastructure of the region, and the emerging architecture of Gulf of Guinea maritime cooperation should not be viewed as isolated developments. They can be understood as components of a wider regional economic-security system.",
          "Even the current Ghana-Togo maritime-boundary proceedings remind us that the Gulf of Guinea is not simply an expanse of water. Maritime space carries questions of jurisdiction, resources, infrastructure, security and economic opportunity. Ghana and Togo's delimitation dispute was submitted to a Special Chamber of the International Tribunal for the Law of the Sea in June 2026.",
        ],
      },
      {
        heading: "The Bottom Line",
        paragraphs: [
          "The strategic question is therefore bigger than whether Ghana or Nigeria can produce more oil. It is whether the Gulf of Guinea can become a predictable, secure and commercially compelling maritime energy environment. This does not mean replacing Hormuz. That would be unrealistic. The lesson from Hormuz is instead that excessive concentration in one strategic corridor creates systemic vulnerability. A more resilient global energy system needs diversified sources, routes and infrastructure.",
          "The Gulf of Guinea could contribute to that diversification. But to do so, the region would need to think differently about maritime security. Instead of asking only whether our waters are safe, we should ask what economic value that security enables. If the answer is greater energy production, more tanker traffic, stronger ports, investment in loading and storage infrastructure, better insurance conditions, deeper regional cooperation and more secure sea lines of communication, then maritime security becomes more than a defence objective. It becomes economic infrastructure.",
          "Perhaps, then, the most important question is not whether the Gulf of Guinea is safer than Hormuz. It is this: Can we make the Gulf of Guinea demonstrably safe, commercially reliable and strategically attractive enough that an international tanker owner looks at Ghana or Nigeria and says: “Yes, I will take my cargo from here”? If we can answer that question, then safety ceases to be merely a description of our maritime environment.",
          "It becomes a competitive advantage.",
        ],
      },
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
                  {article.byline ? article.byline.toUpperCase() : "CABIN TEA STAFF"}
                </p>
                <p style={{ fontSize: "11px", color: MUTED, margin: 0 }}>
                  {article.bylineRole ? `${article.bylineRole} · ` : ""}{article.date} · {article.readTime || `${article.duration} watch`}
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
            <span style={{ color: "rgba(214,207,194,0.3)" }}>
              {article.imgCredit ? `Photo: ${article.imgCredit}.` : "Photo courtesy of Cabin Tea."}
            </span>
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
          {article.lead && (
            <p style={{ fontSize: "16px", lineHeight: 1.85, color: CREAM, fontWeight: 300, margin: "0 0 20px" }}>{article.lead}</p>
          )}
          {article.sections.map((section, i) => (
            <div key={i} style={{ marginBottom: "8px" }}>
              <h2 style={{ fontSize: "20px", fontWeight: 700, color: "white", margin: i === 0 && !article.lead ? "0 0 16px" : "36px 0 16px" }}>
                {section.heading}
              </h2>
              {section.paragraphs.map((p, j) => (
                <p key={j} style={{ fontSize: "16px", lineHeight: 1.85, color: CREAM, fontWeight: 300, margin: "0 0 20px" }}>{p}</p>
              ))}
            </div>
          ))}

          {/* Key moments */}
          {article.timestamps && (
            <>
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
            </>
          )}

          {/* Video embed */}
          {article.youtubeEmbed && (
            <>
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
            </>
          )}
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
