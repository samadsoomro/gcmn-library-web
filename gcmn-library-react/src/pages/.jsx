import React from 'react';
import { motion } from 'framer-motion';

const  = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ padding: '120px 20px 60px', minHeight: '100vh' }}
    >
      <div className="container">
        <h1></h1>
        <p> page content coming soon...</p>
      </div>
    </motion.div>
  );
};

export default ;
