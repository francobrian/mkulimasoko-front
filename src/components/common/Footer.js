import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-grid">
          <div className="footer-column">
            <div className="footer-logo">
              <h2>MkulimaSoko</h2>
              <p>Connecting farmers directly to consumers</p>
            </div>
            <div className="footer-contact">
              <p><FaMapMarkerAlt /> 123 Farm Road, Nairobi, Kenya</p>
              <p><FaPhone /> +254 712 345 678</p>
              <p><FaEnvelope /> info@mkulimasoko.com</p>
            </div>
            <div className="footer-social">
              <a href="https://facebook.com/mkulimasoko" aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="facebook"><FaFacebook /></a>
              <a href="https://twitter.com/mkulimasoko" aria-label="Twitter" target="_blank" rel="noopener noreferrer" className="twitter"><FaTwitter /></a>
              <a href="https://instagram.com/mkulimasoko" aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="instagram"><FaInstagram /></a>
              <a href="https://linkedin.com/company/mkulimasoko" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className="linkedin"><FaLinkedin /></a>
            </div>
          </div>

          <div className="footer-column">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/farmers">Farmers</Link></li>
              <li><Link to="/market">Market Updates</Link></li>
              <li><Link to="/weather">Weather</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Categories</h3>
            <ul>
              <li><Link to="/products/vegetables">Vegetables</Link></li>
              <li><Link to="/products/fruits">Fruits</Link></li>
              <li><Link to="/products/dairy">Dairy Products</Link></li>
              <li><Link to="/products/grains">Grains & Cereals</Link></li>
              <li><Link to="/products/meat">Meat & Poultry</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Subscribe</h3>
            <p>Subscribe to our newsletter for updates</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Your email address" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p className="footer-copyright">&copy; {currentYear} MkulimaSoko. All rights reserved.</p>
          <div className="footer-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/sitemap">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;