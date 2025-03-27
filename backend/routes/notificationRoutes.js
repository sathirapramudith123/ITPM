import express from 'express';
import { getNotifications, markNotificationAsRead } from '../controller/notificationController.js';
import { authenticateUser } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authenticateUser, getNotifications);
router.put('/:id/read', authenticateUser, markNotificationAsRead);

export default router;