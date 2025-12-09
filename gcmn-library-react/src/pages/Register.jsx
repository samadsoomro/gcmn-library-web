import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Phone, BookOpen, AlertCircle, GraduationCap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { CLASSES } from '../utils/constants';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    roll_number: '',
    department: '',
    class: '', // Changed from semester to class
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const departments = [
    'Computer Science',
    'Pre-Medical',
    'Pre-Engineering',
    'Humanities',
    'Commerce'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!formData.full_name || !formData.email || !formData.password || !formData.class) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    // Prepare data for API (map class to semester for backend compatibility)
    const registrationData = {
      ...formData,
      semester: formData.class // Backend expects 'semester' field
    };

    const result = await register(registrationData);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <motion.div
      className="auth-page pakistan-bg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="auth-container" style={{ maxWidth: '600px', gridTemplateColumns: '1fr' }}>
        <motion.div
          className="auth-card"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="auth-header">
            <div className="auth-logo">
              <img src="/src/assets/images/college-logo.png" alt="GCMN Logo" />
            </div>
            <h1 className="auth-title">Create Account</h1>
            <p className="auth-subtitle">Join GCMN Library today</p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              className="auth-error"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AlertCircle size={18} />
              <span>{error}</span>
            </motion.div>
          )}

          {/* Register Form */}
          <form onSubmit={handleSubmit} className="auth-form">
            {/* Full Name */}
            <div className="form-group">
              <label className="form-label">
                <User size={18} />
                Full Name *
              </label>
              <input
                type="text"
                name="full_name"
                className="form-control"
                placeholder="Enter your full name"
                value={formData.full_name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label className="form-label">
                <Mail size={18} />
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Phone */}
            <div className="form-group">
              <label className="form-label">
                <Phone size={18} />
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                className="form-control"
                placeholder="+92 300 1234567"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            {/* Roll Number */}
            <div className="form-group">
              <label className="form-label">
                <BookOpen size={18} />
                Roll Number
              </label>
              <input
                type="text"
                name="roll_number"
                className="form-control"
                placeholder="e.g., 2024-CS-001"
                value={formData.roll_number}
                onChange={handleChange}
              />
            </div>

            {/* Department */}
            <div className="form-group">
              <label className="form-label">
                <GraduationCap size={18} />
                Program / Group
              </label>
              <select
                name="department"
                className="form-control"
                value={formData.department}
                onChange={handleChange}
              >
                <option value="">Select Program/Group</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            {/* Class/Semester */}
            <div className="form-group">
              <label className="form-label">
                <BookOpen size={18} />
                Class *
              </label>
              <select
                name="class"
                className="form-control"
                value={formData.class}
                onChange={handleChange}
                required
              >
                <option value="">Select Class</option>
                {CLASSES.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
            </div>

            {/* Password */}
            <div className="form-group">
              <label className="form-label">
                <Lock size={18} />
                Password *
              </label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
              />
            </div>

            {/* Confirm Password */}
            <div className="form-group">
              <label className="form-label">
                <Lock size={18} />
                Confirm Password *
              </label>
              <input
                type="password"
                name="confirmPassword"
                className="form-control"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                minLength={6}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary btn-lg btn-block"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {/* Footer */}
          <div className="auth-footer">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="auth-link">
                Login here
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Register;