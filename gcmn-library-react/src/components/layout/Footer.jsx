import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* About Section */}
            <div className="footer-col">
              <h3 className="footer-title">GCMN Library</h3>
              <p className="footer-text">
                Gov. College For Men Nazimabad Library is committed to providing
                quality educational resources and fostering a culture of learning
                and academic excellence.
              </p>
              <div className="footer-social">
                <a href="https://www.facebook.com/GCNKARACHI/" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Facebook">
                  <Facebook size={20} />
                </a>
                <a href="#" className="footer-social-link" aria-label="Twitter">
                  <Twitter size={20} />
                </a>
                <a href="#" className="footer-social-link" aria-label="Instagram">
                  <Instagram size={20} />
                </a>
                <a href="#" className="footer-social-link" aria-label="Youtube">
                  <Youtube size={20} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-col">
              <h3 className="footer-title">Quick Links</h3>
              <ul className="footer-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/books">Books</Link></li>
                <li><Link to="/notes">Notes & Syllabus</Link></li>
                <li><Link to="/rare-books">Rare Books</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>

            {/* Services */}
            <div className="footer-col">
              <h3 className="footer-title">Services</h3>
              <ul className="footer-links">
                <li><Link to="/books">Book Borrowing</Link></li>
                <li><Link to="/notes">Study Materials</Link></li>
                <li><Link to="/rare-books">Digital Archive</Link></li>
                <li><Link to="/my-borrowings">My Borrowings</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="footer-col">
              <h3 className="footer-title">Contact Us</h3>
              <ul className="footer-contact">
                <li>
                  <MapPin size={18} />
                  <span>Nazimabad, Karachi, Pakistan</span>
                </li>
                <li>
                  <Phone size={18} />
                  <span>+92 21 XXXX XXXX</span>
                </li>
                <li>
                  <Mail size={18} />
                  <span>library@gcmn.edu.pk</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              © {currentYear} GCMN Library. All rights reserved.
            </p>
            <div className="footer-bottom-links">
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;