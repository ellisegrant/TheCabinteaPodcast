import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import AboutHost from "./Pages/AboutHost";
import Episodes from "./Pages/Episodes";
import EpisodeArticle from "./Pages/EpisodeArticle";
import Partner from "./Pages/Partner";
import Shop from "./Pages/Shop";
import CreativeAgency from "./Pages/CreativeAgency";
import Afrocean from "./Pages/Afrocean";
import Anchorage from "./Pages/Anchorage";
import { PlayerProvider } from "./components/EpisodePlayer";
import CategoryStrip from "./components/CategoryStrip";
import AfricaOceanDynamism from "./Pages/AfricaOceanDynamism";
import OnDeck from "./Pages/OnDeck";
import WhatsRising from "./Pages/WhatsRising";
import Contact from "./Pages/Contact";
import CookieConsent from "./components/CookieConsent";

function App() {
  return (
    <PlayerProvider>
      <BrowserRouter>
        <CategoryStrip />
        <CookieConsent />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/about-host" element={<AboutHost />} />
          <Route path="/episodes" element={<Episodes />} />
          <Route path="/episodes/:slug" element={<EpisodeArticle />} />
          <Route path="/partner" element={<Partner />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/creative-agency" element={<CreativeAgency />} />
          <Route path="/afrocean" element={<Afrocean />} />
          <Route path="/anchorage" element={<Anchorage />} />
          <Route path="/africa-ocean-dynamism" element={<AfricaOceanDynamism />} />
          <Route path="/on-deck" element={<OnDeck />} />
          <Route path="/whats-rising" element={<WhatsRising />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </PlayerProvider>
  );
}

export default App;
