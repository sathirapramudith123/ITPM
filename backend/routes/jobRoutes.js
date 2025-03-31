import express from 'express';
import { createJob, getJobs, getJobById, updateJob, deleteJob, applyToJob } from '../controllers/jobController.js';
import auth from '../middleware/auth.js';
import role from '../middleware/role.js';

const router = express.Router();

router.post('/', auth, role(['employer']), createJob);
router.get('/', getJobs);
router.get('/:id', getJobById);
router.put('/:id', auth, role(['employer']), updateJob);
router.delete('/:id', auth, role(['employer']), deleteJob);
router.post('/:id/apply', auth, role(['job_seeker']), applyToJob);

export default router;