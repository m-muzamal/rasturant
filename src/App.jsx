import "./App.css";
import Dashboard from "./Pages/Dashboard.jsx";
import Footer from "./Pages/Footer.jsx";
import Home from "./Pages/Home";
import Navbar from "./Pages/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
