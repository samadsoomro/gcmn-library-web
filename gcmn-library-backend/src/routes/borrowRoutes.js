import express from 'express';
import {
  createBorrowRequest,
  getUserBorrows,
  getAllBorrows,
  updateBorrowStatus,
} from '../controllers/borrowController.js';
import { verifyToken, verifyAdmin } from '../middleware/auth.js';

const router = express.Router();

// User routes
router.post('/', verifyToken, createBorrowRequest);
router.get('/user', verifyToken, getUserBorrows);

// Admin routes
router.get('/', verifyToken, verifyAdmin, getAllBorrows);
router.put('/:id', verifyToken, verifyAdmin, updateBorrowStatus);

export default router;