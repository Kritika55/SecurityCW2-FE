import React from 'react';
import './Footer.css';
import logo from '../Assets/images/Logo.png';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <img src={logo} alt="Wheels on Lease Logo" className="footer-logo" />
          <p>Telephone: +977- XXXXXXXXXX</p>
          <p>Email: info@wheelsonlease.com</p>
          <div className="footer-socials">
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
        <div className="footer-right">
          <nav>
            <a href="/contact">Contact Us</a>
            <a href="/profile">Profile</a>
            <a href="/about">About Us</a>
            <a href="/chat">Chat</a>
          </nav>
          <div className="footer-subscribe">
            <p>Subscribe to stay tuned for new vehicles <br/> and latest updates.</p>
            <div className="subscribe-form">
              <input type="email" placeholder="Enter your email address" />
              <button type="button">Subscribe</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
