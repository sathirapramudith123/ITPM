// routes/adminRoutes.js
import express from 'express';
import { manageJobPostings, manageUserRoles, manageCategories } from '../controller/adminController.js';
import { authenticateUser, authenticateAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/jobs', authenticateUser, authenticateAdmin, manageJobPostings);
router.post('/users/roles', authenticateUser, authenticateAdmin, manageUserRoles);
router.post('/categories', authenticateUser, authenticateAdmin, manageCategories);

export default router; // Must have this default export