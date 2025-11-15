import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-content">
          <h1>Get In Touch</h1>
          <p className="contact-tagline">We'd love to hear from you. Let's grow together! 🌱</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="contact-main">
        <div className="contact-container">
          <div className="contact-content">
            {/* Contact Info */}
            <div className="contact-info-section">
              <h2>Contact Information</h2>
              <p className="info-subtitle">Reach out to us through any of these channels</p>

              <div className="contact-cards">
                <div className="contact-card">
                  <div className="contact-card-icon">📧</div>
                  <h3>Email Support</h3>
                  <p>For general support or questions</p>
                  <a href="mailto:support@plantdisease.ai">support@plantdisease.ai</a>
                </div>

                <div className="contact-card">
                  <div className="contact-card-icon">💼</div>
                  <h3>Business Inquiries</h3>
                  <p>Partnership and collaboration opportunities</p>
                  <a href="mailto:business@plantdisease.ai">business@plantdisease.ai</a>
                </div>

                <div className="contact-card">
                  <div className="contact-card-icon">🐛</div>
                  <h3>Report Issues</h3>
                  <p>Technical problems and bug reports</p>
                  <a href="mailto:bugs@plantdisease.ai">bugs@plantdisease.ai</a>
                </div>

                <div className="contact-card">
                  <div className="contact-card-icon">🌍</div>
                  <h3>Location</h3>
                  <p>Global Remote Team</p>
                  <span className="location-text">Serving farmers worldwide</span>
                </div>
              </div>

              {/* FAQ Quick Links */}
              <div className="faq-section">
                <h3>Frequently Asked Questions</h3>
                <ul className="faq-list">
                  <li>
                    <span className="faq-icon">❓</span>
                    <div className="faq-content">
                      <strong>How does PlantAI work?</strong>
                      <p>Upload a photo of your plant leaf and our AI analyzes it instantly to detect diseases.</p>
                    </div>
                  </li>
                  <li>
                    <span className="faq-icon">📸</span>
                    <div className="faq-content">
                      <strong>What image formats are supported?</strong>
                      <p>We support JPG, PNG, and WEBP formats. Images should be clear and well-lit.</p>
                    </div>
                  </li>
                  <li>
                    <span className="faq-icon">⚡</span>
                    <div className="faq-content">
                      <strong>How accurate are the results?</strong>
                      <p>Our AI model has a 95% accuracy rate, trained on thousands of plant disease images.</p>
                    </div>
                  </li>
                  <li>
                    <span className="faq-icon">💰</span>
                    <div className="faq-content">
                      <strong>Is PlantAI free to use?</strong>
                      <p>Yes! PlantAI is completely free for all users to help farmers worldwide.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Hours */}
      <section className="support-hours">
        <div className="contact-container">
          <div className="hours-content">
            <div className="hours-icon">⏰</div>
            <div className="hours-text">
              <h3>Support Hours</h3>
              <p>Our team is available Monday - Friday, 9:00 AM - 6:00 PM (EST)</p>
              <p className="response-time">Average email response time: 24 hours</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;