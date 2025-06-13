import express from 'express';
import * as jobController from '../controller/jobsController.js';

const router = express.Router();

router.get('/', jobController.getAllJobs);
router.post('/', jobController.createJob);
router.put('/:id', jobController.updateJob);
router.delete('/:id', jobController.deleteJob);

export default router;
