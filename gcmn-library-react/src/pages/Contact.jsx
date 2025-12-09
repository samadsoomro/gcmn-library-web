import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Globe } from 'lucide-react';
import PakistanMap from '../assets/icons/PakistanMap';
import { LIBRARY_LOCATION } from '../utils/constants';
import './Contact.css';

const Contact = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ padding: '120px 20px 60px', minHeight: '100vh' }}
    >
      <div className="container">
        <h1>Contact Us</h1>
        <div style={{ marginTop: '2rem' }}>
          <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MapPin size={20} />
            <span>Nazimabad, Karachi, Pakistan</span>
          </div>
          <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Phone size={20} />
            <span>+92 21 XXXX XXXX</span>
          </div>
          <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Mail size={20} />
            <span>library@gcmn.edu.pk</span>
          </div>
          <div className="contact-map-section">
            <div className="map-container-split">
              {/* Pakistan Map Visual */}
              <div className="pakistan-map-visual">
                <PakistanMap opacity={0.15} />
                <div className="map-overlay-text">
                  <h3>Visit Us</h3>
                  <p>Government College for Men Nazimabad</p>
                </div>
              </div>

              {/* Google Maps Embed */}
              <div className="google-map-embed">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3619.0!2d67.0338!3d24.9207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDU1JzE0LjUiTiA2N8KwMDInMDEuNyJF!5e0!3m2!1sen!2s!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: '12px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="GCMN Library Location"
                ></iframe>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: 'var(--space-xl)' }}>
              <a
                href="https://maps.app.goo.gl/erR98wVW9iwRzXi6A"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg"
              >
                <MapPin size={20} />
                View on Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;