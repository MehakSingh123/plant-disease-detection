import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const username = localStorage.getItem("name");

  const testimonials = [
    {
      text: "PlantGuard saved my tomato plants! Quick diagnosis and effective treatment recommendations.",
      author: "Sarah M.",
      location: "Home Gardener"
    },
    {
      text: "As a farmer, this tool helps me identify diseases early and prevent crop losses.",
      author: "Raj P.",
      location: "Agricultural Farmer"
    },
    {
      text: "Perfect for my botanical research. Accurate results and detailed remedies.",
      author: "Dr. Emily Chen",
      location: "Plant Researcher"
    }
  ];

  const stats = [
    { number: "50K+", label: "Plants Analyzed" },
    { number: "95%", label: "Accuracy Rate" },
    { number: "200+", label: "Disease Types" },
    { number: "24/7", label: "Available" }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handleNavClick = () => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="home">
      {/* Navbar Section */}
      

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to PlantGuard 🌿</h1>
          <p className="hero-subtitle">
            Upload a photo of a plant leaf and get instant disease diagnosis with expert remedies powered by advanced AI technology.
          </p>
          <div className="cta-section">
            <Link to="/upload" onClick={handleNavClick}>
              <button className="home-btn primary">
                <span>🚀 Get Started</span>
              </button>
            </Link>
            <Link to="/about" onClick={handleNavClick}>
              <button className="home-btn secondary">
                <span>📖 Learn More</span>
              </button>
            </Link>
          </div>
        </div>
        
        <div className="hero-image">
          <div className="plant-illustration">
            <div className="leaf leaf-1">🍃</div>
            <div className="leaf leaf-2">🌱</div>
            <div className="leaf leaf-3">🍀</div>
            <div className="leaf leaf-4">🌿</div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <h2>Trusted by Thousands</h2>
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card" style={{ '--delay': `${index * 0.1}s` }}>
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <h2>Why Choose PlantGuard?</h2>
        <div className="features">
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Fast Detection</h3>
            <p>Detect plant leaf diseases in seconds with our advanced AI model trained on millions of plant images.</p>
            <ul className="feature-list">
              <li>✓ Instant results</li>
              <li>✓ Multiple disease detection</li>
              <li>✓ Real-time analysis</li>
            </ul>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Highly Accurate</h3>
            <p>Trained on real-world images for precise classification with 95%+ accuracy rate across 200+ disease types.</p>
            <ul className="feature-list">
              <li>✓ Research-backed AI</li>
              <li>✓ Continuous learning</li>
              <li>✓ Expert validation</li>
            </ul>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">💊</div>
            <h3>Complete Remedies</h3>
            <p>Get comprehensive treatment plans including prevention tips, organic solutions, and chemical treatments.</p>
            <ul className="feature-list">
              <li>✓ Organic treatments</li>
              <li>✓ Chemical solutions</li>
              <li>✓ Prevention strategies</li>
            </ul>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="how-it-works">
        <h2>How PlantGuard Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-icon">📸</div>
            <h3>Upload Photo</h3>
            <p>Take a clear photo of the affected leaf and upload it to our platform</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-icon">🤖</div>
            <h3>AI Analysis</h3>
            <p>Our advanced AI analyzes the image and identifies potential diseases</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-icon">📋</div>
            <h3>Get Results</h3>
            <p>Receive detailed diagnosis with treatment recommendations and care tips</p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="testimonials-section">
        <h2>What Our Users Say</h2>
        <div className="testimonial-container">
          <div className="testimonial-card">
            <div className="quote-icon">"</div>
            <p className="testimonial-text">{testimonials[currentTestimonial].text}</p>
            <div className="testimonial-author">
              <strong>{testimonials[currentTestimonial].author}</strong>
              <span>{testimonials[currentTestimonial].location}</span>
            </div>
          </div>
          <div className="testimonial-dots">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentTestimonial ? 'active' : ''}`}
                onClick={() => setCurrentTestimonial(index)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="final-cta">
        <div className="cta-content">
          <h2>Ready to Protect Your Plants?</h2>
          <p>Join thousands of gardeners and farmers who trust PlantGuard for plant health management</p>
          <Link to="/upload" onClick={handleNavClick}>
            <button className="home-btn primary large">
              <span>🌱 Start Diagnosis Now</span>
            </button>
          </Link>
        </div>
        <div className="cta-features">
          <div className="mini-feature">
            <span className="mini-icon">⚡</span>
            <span>Instant Results</span>
          </div>
          <div className="mini-feature">
            <span className="mini-icon">🔒</span>
            <span>Secure & Private</span>
          </div>
          <div className="mini-feature">
            <span className="mini-icon">💯</span>
            <span>100% Free</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;