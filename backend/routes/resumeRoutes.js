// routes/resumeRoutes.js
import express from 'express';
import { createResume, getResume, updateResume, deleteResume } from '../controllers/resumeController.js';
import authMiddleware from '../middleware/auth.js'; // Your authentication middleware

const router = express.Router();

// Protect all routes with authentication
router.use(authMiddleware);

// CRUD routes
router.post('/', createResume);     // Create resume
router.get('/', getResume);         // Read resume
router.put('/', updateResume);      // Update resume
router.delete('/', deleteResume);   // Delete resume

export default router;