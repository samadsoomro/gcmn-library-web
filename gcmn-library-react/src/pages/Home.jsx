import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/layout/Hero';
import { BookOpen, Users, Award, TrendingUp } from 'lucide-react';
import './Home.css';

const Home = () => {
  const stats = [
    {
      icon: <BookOpen size={40} />,
      number: '5000+',
      label: 'Books Available',
      color: '#0A6638',
    },
    {
      icon: <Users size={40} />,
      number: '1000+',
      label: 'Active Students',
      color: '#14854F',
    },
    {
      icon: <Award size={40} />,
      number: '500+',
      label: 'Study Materials',
      color: '#D4AF37',
    },
    {
      icon: <TrendingUp size={40} />,
      number: '95%',
      label: 'Satisfaction Rate',
      color: '#50C878',
    },
  ];

  const features = [
    {
      title: 'Easy Book Borrowing',
      description: 'Browse our extensive collection and borrow books with just a few clicks. Track your borrowings and due dates easily.',
      image: '📚',
    },
    {
      title: 'Digital Study Materials',
      description: 'Access course notes, syllabus, and study guides organized by subjects and semesters.',
      image: '📖',
    },
    {
      title: 'Rare Books Archive',
      description: 'Explore our digital archive of rare and historical books with secure viewing technology.',
      image: '🏛️',
    },
    {
      title: 'Admin Dashboard',
      description: 'Efficient management system for librarians to handle requests, inventory, and user accounts.',
      image: '⚙️',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />

      {/* Stats Section */}
      <section className="home-stats">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="stat-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="stat-icon" style={{ color: stat.color }}>
                  {stat.icon}
                </div>
                <h3 className="stat-number">{stat.number}</h3>
                <p className="stat-label">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="home-features pakistan-bg">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Why Choose GCMN Library?</h2>
            <p className="section-description">
              Discover the features that make our library management system
              efficient, modern, and user-friendly.
            </p>
          </motion.div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="feature-image">{feature.image}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="home-cta">
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="cta-title">Ready to Start Your Learning Journey?</h2>
            <p className="cta-description">
              Join thousands of students who trust GCMN Library for their
              academic resources and study materials.
            </p>
            <div className="cta-actions">
              <a href="/register" className="btn btn-white btn-lg">
                Get Started Today
              </a>
              <a href="/books" className="btn btn-outline btn-lg">
                Browse Books
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;