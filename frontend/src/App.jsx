// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Upload from "../pages/Upload";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import NotFound from "../pages/NotFound";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./App.css"; // ✅ Import global resets (see below)

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
