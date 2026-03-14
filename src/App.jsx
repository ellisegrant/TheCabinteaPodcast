import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Episodes from "./Pages/Episodes";
import Partner from "./Pages/Partner";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/episodes" element={<Episodes />} />
        <Route path="/partner" element={<Partner />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;