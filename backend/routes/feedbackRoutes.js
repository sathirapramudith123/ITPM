import express from 'express';
import { submitFeedback, fetchAllFeedbacks, fetchFeedbacksByJobId, updateFeedback, deleteFeedback } from '../controllers/feedbackController.js';

const router = express.Router();

// POST: Submit feedback
router.post('/', submitFeedback);

// GET: Fetch all feedbacks (Admin only)
router.get('/', fetchAllFeedbacks);

// GET: Fetch feedbacks by Job ID
router.get('/job/:jobId', fetchFeedbacksByJobId);

// PUT: Update feedback by ID
router.put('/:id', updateFeedback);

// DELETE: Delete feedback by ID
router.delete('/:id', deleteFeedback);

export default router;
