import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Logo and Description */}
        <div className="footer-about">
          <h2>YourCompany</h2>
          <p>Providing quality services since 2024. We prioritize customer satisfaction and excellence in our field.</p>
        </div>
        
        {/* Navigation Links */}
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#about">About Us</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
        </div>
        
        {/* Social Media Links */}
        <div className="footer-social">
          <h3>Follow Us</h3>
          <ul>
            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          </ul>
        </div>
        
        {/* Contact Information */}
        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p>Email: support@yourcompany.com</p>
          <p>Phone: +123 456 7890</p>
          <p>Address: 1234 Elm St, Cityville, State</p>
        </div>
      </div>
      
      {/* Copyright Section */}
      <div className="footer-bottom">
        <p>&copy; 2024 YourCompany. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
