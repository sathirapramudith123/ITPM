// routes/analyticsRoutes.js
import express from 'express';
import { getPlatformInsights, getVisualReportData } from '../controller/analyticsController.js';
import { authenticateUser, authenticateEmployerOrAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/insights', authenticateUser, authenticateEmployerOrAdmin, getPlatformInsights);
router.get('/reports', authenticateUser, authenticateEmployerOrAdmin, getVisualReportData);

export default router; // Must have this default export