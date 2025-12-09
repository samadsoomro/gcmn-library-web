import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Sparkles } from 'lucide-react';
import './SplashScreen.css';

const SplashScreen = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Auto-hide splash screen after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onComplete && onComplete();
      }, 500);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="splash-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Pakistan Flag Colors Background */}
          <div className="splash-bg">
            <motion.div
              className="splash-bg-green"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
            <motion.div
              className="splash-bg-white"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            />
          </div>

          {/* Animated Content */}
          <div className="splash-content">
            {/* Book Opening Animation */}
            <motion.div
              className="splash-book-container"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <motion.div
                className="splash-book-left"
                initial={{ rotateY: 0 }}
                animate={{ rotateY: -25 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <BookOpen size={80} strokeWidth={1.5} />
              </motion.div>
              <motion.div
                className="splash-book-right"
                initial={{ rotateY: 0 }}
                animate={{ rotateY: 25 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <BookOpen size={80} strokeWidth={1.5} />
              </motion.div>
            </motion.div>

            {/* Floating Pages */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="splash-page"
                initial={{ y: 0, opacity: 0, rotate: 0 }}
                animate={{
                  y: [-20, -60, -100],
                  opacity: [0, 1, 0],
                  rotate: [0, 10 * (i - 2), 20 * (i - 2)],
                }}
                transition={{
                  duration: 2,
                  delay: 1.2 + i * 0.1,
                  ease: 'easeOut',
                }}
                style={{
                  left: `${45 + i * 2}%`,
                }}
              />
            ))}

            {/* Logo and Text */}
            <motion.div
              className="splash-logo-container"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.8 }}
            >
              <motion.div
                className="splash-logo-circle"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 2 }}
              >
                <img
                  src="/src/assets/images/college-logo.png"
                  alt="GCMN Logo"
                  className="splash-logo-img"
                />
              </motion.div>

              <motion.h1
                className="splash-title"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 2.2 }}
              >
                GCMN Library
              </motion.h1>

              <motion.p
                className="splash-subtitle"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 2.4 }}
              >
                Gov. College For Men Nazimabad
              </motion.p>

              {/* Sparkles */}
              <motion.div
                className="splash-sparkles"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 2.5 }}
              >
                <Sparkles className="splash-sparkle" size={20} />
                <Sparkles className="splash-sparkle" size={16} />
                <Sparkles className="splash-sparkle" size={18} />
              </motion.div>
            </motion.div>

            {/* Loading Bar */}
            <motion.div
              className="splash-loading-bar"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 2.5, delay: 0.5 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;