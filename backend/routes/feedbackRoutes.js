// routes/feedbackRoutes.js
import express from 'express';
import { authenticateUser, authenticateAdmin } from '../middleware/authMiddleware.js';
import { 
  submitFeedback, 
  getAllFeedback, 
  updateFeedbackStatus, 
  analyzeFeedback,
  updateFeedback,      // New
  deleteFeedback       // New
} from '../controller/feedbackController.js';

const router = express.Router();

// Any authenticated user (job_seeker, employer, admin)
router.post('/submit', authenticateUser, submitFeedback);
router.put('/update/:feedbackId', authenticateUser, updateFeedback);  // New
router.delete('/delete/:feedbackId', authenticateUser, deleteFeedback); // New

// Admin-only routes
router.get('/all', authenticateAdmin, getAllFeedback);
router.put('/status/:feedbackId', authenticateAdmin, updateFeedbackStatus);
router.get('/analyze', authenticateAdmin, analyzeFeedback);

export default router;