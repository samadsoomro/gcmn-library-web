import React from 'react';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ padding: '120px 20px 60px', minHeight: '100vh' }}
    >
      <div className="container">
        <h1>Admin Dashboard</h1>
        <p>Manage books, borrowings, and users.</p>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;