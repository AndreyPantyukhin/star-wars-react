import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Characters from "./Characters";
import Planets from "./Planets";  
import PlanetDetails from "./PlanetDetails";

function App() {
  return (
    <Router>
      <nav style={{ padding: 20, background: "#222", color: "#fff" }}>
        <Link to="/" style={{ color: "#fff", marginRight: 15 }}>Home</Link>
        <Link to="/characters" style={{ color: "#fff" }}>Characters</Link>
        <Link to="/planets" style={{ color: "#fff", marginLeft: 15 }}>Planets</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/planets" element={<Planets />} />
        <Route path="/planets/:name" element={<PlanetDetails />} />
      </Routes>
    </Router>
  );
}





export default App;