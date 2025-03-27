import express from 'express';
import { check } from 'express-validator';
import { createResume, updateResume, getResume, getCareerResources } from '../controller/resumeController.js';
import { authenticateUser } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post(
  '/create',
  [
    check('personalInfo.fullName', 'Full name is required').not().isEmpty(),
    check('education', 'Education must be an array').isArray(),
    check('experience', 'Experience must be an array').isArray(),
    check('skills', 'Skills must be an array').isArray()
  ],
  authenticateUser,
  createResume
);

router.put('/update', authenticateUser, updateResume);
router.get('/my-resume', authenticateUser, getResume);
router.get('/resources', authenticateUser, getCareerResources);

export default router;