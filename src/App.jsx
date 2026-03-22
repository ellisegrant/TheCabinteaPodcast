import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import AboutHost from "./Pages/AboutHost";
import Episodes from "./Pages/Episodes";
import Partner from "./Pages/Partner";
import Shop from "./Pages/Shop";
import CreativeAgency from "./Pages/CreativeAgency";
import Afrocean from "./Pages/Afrocean";
import Anchorage from "./Pages/Anchorage";
import { PlayerProvider } from "./components/EpisodePlayer";
import CategoryStrip from "./components/CategoryStrip";

function App() {
  return (
    <PlayerProvider>
      <BrowserRouter>
        <CategoryStrip />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/about-host" element={<AboutHost />} />
          <Route path="/episodes" element={<Episodes />} />
          <Route path="/partner" element={<Partner />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/creative-agency" element={<CreativeAgency />} />
          <Route path="/afrocean" element={<Afrocean />} />
          <Route path="/anchorage" element={<Anchorage />} />
        </Routes>
      </BrowserRouter>
    </PlayerProvider>
  );
}

export default App;
