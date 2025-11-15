import React from "react";
import "./Footer.css"; // optional styling

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="container">
        <div className="footer-content">
          {/* About Section */}
          <div className="footer-section">
            <h3 className="footer-title">About</h3>
            <p className="footer-text">
              Our AI-powered system helps farmers and gardeners identify plant diseases 
              quickly and accurately, enabling early intervention and better crop management.
            </p>
          </div>

          {/* Features Section */}
          <div className="footer-section">
            <h3 className="footer-title">Features</h3>
            <ul className="footer-list">
              <li>• Instant disease detection</li>
              <li>• High accuracy predictions</li>
              <li>• Multiple plant species support</li>
              <li>• Easy-to-use interface</li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="footer-section">
            <h3 className="footer-title">Support</h3>
            <p className="footer-text">
              Need help? Contact our support team:
            </p>
            <p className="footer-contact">support@plantdisease.ai</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 Plant Disease Detection System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
