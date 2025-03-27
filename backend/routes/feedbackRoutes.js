import express from 'express';
import * as feedbackController from '../controller/feedbackController.js';
import * as authMiddleware from '../middleware/auth.js';

const router = express.Router();

// User routes
router.post('/submit', authMiddleware.authenticateUser, feedbackController.submitFeedback);

// Admin routes
router.get('/all', authMiddleware.authenticateAdmin, feedbackController.getAllFeedback);
router.put('/:feedbackId', authMiddleware.authenticateAdmin, feedbackController.updateFeedbackStatus);
router.get('/analyze', authMiddleware.authenticateAdmin, feedbackController.analyzeFeedback);

export default router;