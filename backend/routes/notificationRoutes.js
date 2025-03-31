import express from 'express';
import { getNotifications, markNotificationAsRead } from '../controllers/notificationController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, getNotifications);
router.put('/:id/read', auth, markNotificationAsRead);

export default router;