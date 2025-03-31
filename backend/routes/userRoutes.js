import express from 'express';
import { updateProfile, getJobRecommendations } from '../controllers/userController.js';
import auth from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.put('/profile', auth, upload.single('resume'), updateProfile);
router.get('/recommendations', auth, getJobRecommendations);

export default router;