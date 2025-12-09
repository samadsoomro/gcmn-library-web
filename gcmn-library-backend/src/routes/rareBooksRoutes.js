import express from 'express';
import {
  getAllRareBooks,
  getRareBookById,
  createRareBook,
  updateRareBook,
  deleteRareBook,
  getCategories,
} from '../controllers/rareBooksController.js';
import { verifyToken, verifyAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllRareBooks);
router.get('/categories', getCategories);
router.get('/:id', getRareBookById);

// Admin only routes
router.post('/', verifyToken, verifyAdmin, createRareBook);
router.put('/:id', verifyToken, verifyAdmin, updateRareBook);
router.delete('/:id', verifyToken, verifyAdmin, deleteRareBook);

export default router;