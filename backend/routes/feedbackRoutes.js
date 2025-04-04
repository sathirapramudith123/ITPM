import express from 'express';
import { submitFeedback, getFeedbackByJob, updateFeedback, deleteFeedback } from '../controllers/feedbackController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, submitFeedback);
router.get('/job/:jobId', auth, getFeedbackByJob);
router.put('/:id', auth, updateFeedback);
router.delete('/:id', auth, deleteFeedback);

export default router;
