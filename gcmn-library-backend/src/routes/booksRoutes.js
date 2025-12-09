import express from 'express';
import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  getCategories,
} from '../controllers/booksController.js';
import { verifyToken, verifyAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllBooks);
router.get('/categories', getCategories);
router.get('/:id', getBookById);

// Admin only routes
router.post('/', verifyToken, verifyAdmin, createBook);
router.put('/:id', verifyToken, verifyAdmin, updateBook);
router.delete('/:id', verifyToken, verifyAdmin, deleteBook);

export default router;