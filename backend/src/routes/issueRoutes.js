import express from 'express';
import {
  createIssue,
  getMyIssues,
  getAllIssues,
  updateIssue,
} from '../controllers/issueController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import adminOnly from '../middleware/roleMiddleware.js';

const router = express.Router();

// Student
router.post('/', authMiddleware, createIssue);
router.get('/my', authMiddleware, getMyIssues);

// Admin
router.get('/', authMiddleware, adminOnly, getAllIssues);
router.put('/:id', authMiddleware, adminOnly, updateIssue);

export default router;
