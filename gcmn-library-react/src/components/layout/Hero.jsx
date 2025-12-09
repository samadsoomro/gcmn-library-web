import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, FileText, Archive, ArrowRight } from 'lucide-react';
import PakistanMap from '../../assets/icons/PakistanMap';
import './Hero.css';

const Hero = () => {
  const features = [
    {
      icon: <BookOpen size={32} />,
      title: 'Book Borrowing',
      description: 'Access thousands of books with easy borrowing system',
      link: '/books',
    },
    {
      icon: <FileText size={32} />,
      title: 'Notes & Syllabus',
      description: 'Download study materials and course notes',
      link: '/notes',
    },
    {
      icon: <Archive size={32} />,
      title: 'Rare Books',
      description: 'Explore our digital archive of rare collections',
      link: '/rare-books',
    },
  ];

  return (
    <section className="hero pakistan-bg">
      {/* Watermark Logo Background */}
      <div className="hero-watermark">
        <img
          src="/src/assets/images/college-logo.png"
          alt=""
          className="hero-watermark-img"
        />
      </div>

      {/* Pakistan Map Background */}
      <div className="hero-pakistan-map">
        <PakistanMap opacity={0.03} />
      </div>

      <div className="container">
        <div className="hero-content">
          {/* Main Content */}
          <motion.div
            className="hero-text"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="hero-badge"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="hero-badge-text">Welcome to GCMN Library</span>
            </motion.div>

            <h1 className="hero-title">
              Your Gateway to
              <span className="hero-title-highlight"> Knowledge & Excellence</span>
            </h1>

            <p className="hero-description">
              Discover a world of learning at Gov. College For Men Nazimabad Library.
              Access thousands of books, study materials, and rare collections to
              support your academic journey.
            </p>

            <div className="hero-actions">
              <Link to="/books" className="btn btn-primary btn-lg">
                Explore Books
                <ArrowRight size={20} />
              </Link>
              <Link to="/register" className="btn btn-white btn-lg">
                Get Started
              </Link>
            </div>

            {/* Stats */}
            <motion.div
              className="hero-stats"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="hero-stat">
                <h3 className="hero-stat-number">5000+</h3>
                <p className="hero-stat-label">Books Available</p>
              </div>
              <div className="hero-stat">
                <h3 className="hero-stat-number">1000+</h3>
                <p className="hero-stat-label">Active Students</p>
              </div>
              <div className="hero-stat">
                <h3 className="hero-stat-number">500+</h3>
                <p className="hero-stat-label">Study Materials</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            className="hero-features"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="hero-feature-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="hero-feature-icon">{feature.icon}</div>
                <h3 className="hero-feature-title">{feature.title}</h3>
                <p className="hero-feature-description">{feature.description}</p>
                <Link to={feature.link} className="hero-feature-link">
                  Learn More <ArrowRight size={16} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="hero-decoration hero-decoration-1"></div>
      <div className="hero-decoration hero-decoration-2"></div>
    </section>
  );
};

export default Hero;