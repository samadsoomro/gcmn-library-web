import express from 'express';
import {
  getAllNotes,
  getNoteById,
  getNotesByClassAndSubject,
  createNote,
  updateNote,
  deleteNote,
  getClasses,
  getSubjectsByClass,
} from '../controllers/notesController.js';
import { verifyToken, verifyAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllNotes);
router.get('/classes', getClasses);
router.get('/subjects', getSubjectsByClass);
router.get('/by-class-subject', getNotesByClassAndSubject);
router.get('/:id', getNoteById);

// Admin only routes
router.post('/', verifyToken, verifyAdmin, createNote);
router.put('/:id', verifyToken, verifyAdmin, updateNote);
router.delete('/:id', verifyToken, verifyAdmin, deleteNote);

export default router;