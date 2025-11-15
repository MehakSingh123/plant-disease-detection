import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>About PlantAI</h1>
          <p className="about-tagline">Revolutionizing Agriculture with Artificial Intelligence</p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="about-section mission-section">
        <div className="about-container">
          <div className="mission-content">
            <div className="mission-text">
              <h2>Our Mission</h2>
              <p>
                PlantAI is an AI-powered platform designed to empower farmers, gardeners, and researchers
                with cutting-edge technology for early plant disease detection. Our mission is to reduce
                crop losses, increase food security, and promote sustainable agriculture worldwide.
              </p>
              <p>
                Simply upload a photo of an affected leaf, and our advanced machine learning model will
                instantly identify the disease and provide actionable remedies—helping you protect your
                plants before it's too late.
              </p>
            </div>
            <div className="mission-icon">
              <span className="large-emoji">🌱</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="about-section features-grid-section">
        <div className="about-container">
          <h2 className="section-title">Why Choose PlantAI?</h2>
          <div className="features-grid">
            <div className="feature-box">
              <div className="feature-icon">🤖</div>
              <h3>AI-Powered Detection</h3>
              <p>Advanced machine learning algorithms trained on thousands of plant disease images.</p>
            </div>
            <div className="feature-box">
              <div className="feature-icon">⚡</div>
              <h3>Instant Results</h3>
              <p>Get disease diagnosis and treatment recommendations in seconds.</p>
            </div>
            <div className="feature-box">
              <div className="feature-icon">🌍</div>
              <h3>Global Impact</h3>
              <p>Supporting farmers worldwide in protecting their crops and livelihoods.</p>
            </div>
            <div className="feature-box">
              <div className="feature-icon">📱</div>
              <h3>Easy to Use</h3>
              <p>Simple interface—just snap a photo and let AI do the rest.</p>
            </div>
            <div className="feature-box">
              <div className="feature-icon">🔬</div>
              <h3>Research-Backed</h3>
              <p>Built on peer-reviewed agricultural science and data.</p>
            </div>
            <div className="feature-box">
              <div className="feature-icon">💚</div>
              <h3>Sustainable Solutions</h3>
              <p>Promoting eco-friendly treatment methods and practices.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="about-section how-it-works-section">
        <div className="about-container">
          <h2 className="section-title">How PlantAI Works</h2>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <div className="step-icon">📸</div>
              <h3>Upload Image</h3>
              <p>Take a clear photo of the affected plant leaf</p>
            </div>
            <div className="process-arrow">→</div>
            <div className="process-step">
              <div className="step-number">2</div>
              <div className="step-icon">🧠</div>
              <h3>AI Analysis</h3>
              <p>Our AI model analyzes the image instantly</p>
            </div>
            <div className="process-arrow">→</div>
            <div className="process-step">
              <div className="step-number">3</div>
              <div className="step-icon">💊</div>
              <h3>Get Solution</h3>
              <p>Receive disease name and treatment options</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="about-section stats-section">
        <div className="about-container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">10K+</div>
              <div className="stat-label">Images Analyzed</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">95%</div>
              <div className="stat-label">Accuracy Rate</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Diseases Detected</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team/Vision Section */}
      <section className="about-section vision-section">
        <div className="about-container">
          <div className="vision-content">
            <h2>Our Vision</h2>
            <p>
              We envision a world where every farmer and gardener has access to advanced agricultural
              technology, regardless of their location or resources. By democratizing AI-powered plant
              disease detection, we're helping create a more sustainable and food-secure future for all.
            </p>
            <div className="vision-values">
              <div className="value-item">
                <span className="value-icon">🌾</span>
                <span className="value-text">Empowering Farmers</span>
              </div>
              <div className="value-item">
                <span className="value-icon">🔬</span>
                <span className="value-text">Scientific Excellence</span>
              </div>
              <div className="value-item">
                <span className="value-icon">🌿</span>
                <span className="value-text">Environmental Care</span>
              </div>
              <div className="value-item">
                <span className="value-icon">🤝</span>
                <span className="value-text">Community Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="about-container">
          <h2>Ready to Protect Your Plants?</h2>
          <p>Join thousands of users who trust PlantAI for plant disease detection</p>
          <a href="/detect" className="cta-button">Get Started Now</a>
        </div>
      </section>
    </div>
  );
};

export default About;