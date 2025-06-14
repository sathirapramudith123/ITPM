// routes/feedbackRoutes.js
import express from 'express';
import {
  getAllFeedback,
  createFeedback,
  updateFeedback,
  deleteFeedback,
} from '../controller/feedbackController.js';

const router = express.Router();

router.get('/', getAllFeedback);
router.post('/', createFeedback);
router.put('/:id', updateFeedback);
router.delete('/:id', deleteFeedback);

export default router;
