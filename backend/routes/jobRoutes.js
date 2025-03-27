import express from 'express';
import { createJob, getJobs, getJobById, updateJob, deleteJob, getEmployerJobs } from '../controllers/jobController.js';
import auth from '../middleware/auth.js'; // Assuming auth middleware exists

const router = express.Router();

// Public routes (job seekers)
router.get('/', getJobs); // Search and filter jobs
router.get('/:id', getJobById); // Get job details

// Protected routes (employers)
router.post('/', auth, createJob); // Create job
router.put('/:id', auth, updateJob); // Update job
router.delete('/:id', auth, deleteJob); // Delete job
router.get('/employer/jobs', auth, getEmployerJobs); // Employer dashboard

export default router;