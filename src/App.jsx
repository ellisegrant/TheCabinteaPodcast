import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import AboutHost from "./Pages/AboutHost";
import Episodes from "./Pages/Episodes";
import Partner from "./Pages/Partner";
import Shop from "./Pages/Shop";
import Contact from "./Pages/Contact";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"            element={<Home />} />
        <Route path="/about"       element={<About />} />
        <Route path="/about/host"  element={<AboutHost />} />
        <Route path="/episodes"    element={<Episodes />} />
        <Route path="/partner"     element={<Partner />} />
        <Route path="/shop"        element={<Shop />} />
        <Route path="/contact"     element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
