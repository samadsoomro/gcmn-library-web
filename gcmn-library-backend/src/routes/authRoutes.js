import express from 'express';
import { register, login, verifyToken } from '../controllers/authController.js';
import { verifyToken as verifyTokenMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/verify', verifyTokenMiddleware, verifyToken);

export default router;