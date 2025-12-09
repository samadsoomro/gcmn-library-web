import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen, User, LogOut, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/books', label: 'Books' },
    { path: '/notes', label: 'Notes' },
    { path: '/rare-books', label: 'Rare Books' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  // Add admin link if user is admin
  const displayNavLinks = user?.role === 'admin' 
    ? [...navLinks, { path: '/admin', label: 'Admin', isAdmin: true }]
    : navLinks;

  return (
    <motion.header
      className={`header ${isScrolled ? 'header-scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <nav className="navbar">
          {/* Logo */}
          <Link to="/" className="nav-brand">
            <img
              src="/src/assets/images/college-logo.png"
              alt="GCMN Logo"
              className="nav-logo"
            />
            <div className="nav-brand-text">
              <h1 className="nav-brand-title">GCMN Library</h1>
              <p className="nav-brand-subtitle">Gov. College For Men Nazimabad</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <ul className="nav-menu hide-mobile">
            {displayNavLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* User Actions */}
          <div className="nav-actions">
            {user ? (
              <div className="nav-user-menu">
                <button className="nav-user-btn">
                  <User size={20} />
                  <span className="hide-mobile">{user.full_name}</span>
                </button>
                <div className="nav-user-dropdown">
                  {user.role === 'admin' && (
                    <Link to="/admin" className="nav-dropdown-item">
                      <LayoutDashboard size={18} />
                      Dashboard
                    </Link>
                  )}
                  <Link to="/my-borrowings" className="nav-dropdown-item">
                    <BookOpen size={18} />
                    My Borrowings
                    </Link>
                  <button onClick={logout} className="nav-dropdown-item">
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline btn-sm hide-mobile">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary btn-sm hide-mobile">
                  Register
                </Link>
              </>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="mobile-menu-toggle hide-desktop"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ul className="mobile-menu-list">
                {displayNavLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className={`mobile-menu-link ${
                        location.pathname === link.path ? 'active' : ''
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                {!user && (
                  <>
                    <li>
                      <Link to="/login" className="mobile-menu-link">
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link to="/register" className="mobile-menu-link">
                        Register
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;