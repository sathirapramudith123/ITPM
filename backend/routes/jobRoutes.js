import express from 'express';
import { createJob, getJobs, getJobById, updateJob, deleteJob, getEmployerJobs } from '../controller/jobController.js';
import { authenticateUser } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes (job seekers)
router.get('/', getJobs); // Search and filter jobs
router.get('/:id', getJobById); // Get job details

// Protected routes (employers)
router.post('/', authenticateUser, createJob); // Create job
router.put('/:id', authenticateUser, updateJob); // Update job
router.delete('/:id', authenticateUser, deleteJob); // Delete job
router.get('/employer/jobs', authenticateUser, getEmployerJobs); // Employer dashboard

export default router;