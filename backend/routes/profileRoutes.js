// routes/profileRoutes.js
import express from 'express';
import { createResume, getResume, updateResume, deleteResume } from '../controllers/profileController.js';

const router = express.Router();

// Simulated auth middleware (replace with real auth in production)
const authMiddleware = (req, res, next) => {
  req.user = { email: 'test@example.com' }; // Hardcoded for demo
  next();
};

router.post('/resume', authMiddleware, createResume);    // Create
router.get('/resume', authMiddleware, getResume);       // Read
router.put('/resume', authMiddleware, updateResume);    // Update
router.delete('/resume', authMiddleware, deleteResume); // Delete

export default router;