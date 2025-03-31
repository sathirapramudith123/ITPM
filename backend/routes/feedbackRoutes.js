import express from 'express';
import { submitFeedback, getFeedback, updateFeedback, deleteFeedback } from '../controllers/feedbackController.js';
import auth from '../middleware/auth.js';
import role from '../middleware/role.js';

const router = express.Router();

router.post('/', auth, submitFeedback);
router.get('/', auth, role(['admin', 'employer']), getFeedback);
router.put('/:id', auth, role(['admin']), updateFeedback);
router.delete('/:id', auth, role(['admin']), deleteFeedback);

export default router;