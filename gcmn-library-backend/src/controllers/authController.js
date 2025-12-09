import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/database.js';

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    {
      user_id: user.user_id,
      email: user.email,
      role: user.role,
      full_name: user.full_name,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

// Register new user
export const register = async (req, res) => {
  try {
    const { full_name, email, password, phone, roll_number, department, semester } = req.body;

    // Validate required fields
    if (!full_name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields.',
      });
    }

    // Check if user already exists
    const [existingUsers] = await pool.query(
      'SELECT user_id FROM users WHERE email = ? OR roll_number = ?',
      [email, roll_number]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'User with this email or roll number already exists.',
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // Insert new user
    const [result] = await pool.query(
      `INSERT INTO users (full_name, email, password_hash, phone, roll_number, department, semester, role)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'student')`,
      [full_name, email, password_hash, phone, roll_number, department, semester]
    );

    // Get created user
    const [users] = await pool.query(
      'SELECT user_id, full_name, email, phone, roll_number, role, department, semester FROM users WHERE user_id = ?',
      [result.insertId]
    );

    const user = users[0];
    const token = generateToken(user);

    res.status(201).json({
      success: true,
      message: 'User registered successfully.',
      token,
      user,
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration.',
    });
  }
};

// Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password.',
      });
    }

    // Find user
    const [users] = await pool.query(
      'SELECT * FROM users WHERE email = ? AND status = "active"',
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    const user = users[0];

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    // Update last login
    await pool.query('UPDATE users SET last_login = NOW() WHERE user_id = ?', [user.user_id]);

    // Generate token
    const token = generateToken(user);

    // Remove password from response
    delete user.password_hash;

    res.json({
      success: true,
      message: 'Login successful.',
      token,
      user,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login.',
    });
  }
};

// Verify token
export const verifyToken = async (req, res) => {
  try {
    const [users] = await pool.query(
      'SELECT user_id, full_name, email, phone, roll_number, role, department, semester FROM users WHERE user_id = ? AND status = "active"',
      [req.user.user_id]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    res.json({
      success: true,
      user: users[0],
    });
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during token verification.',
    });
  }
};