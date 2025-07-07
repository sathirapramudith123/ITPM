import express from 'express';
import * as jobController from '../controller/jobsController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/applied', protect, jobController.getAppliedJobs); // <-- must be before /:id
router.post('/:jobId/apply', protect, jobController.applyToJob);
router.get('/', jobController.getAllJobs);
router.post('/', jobController.createJob);
router.get('/:id', jobController.getJobById);
router.put('/:id', jobController.updateJob);
router.delete('/:id', jobController.deleteJob);

export default router;
