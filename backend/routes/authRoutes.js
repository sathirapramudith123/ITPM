// authRoutes.js
import express from 'express';
import { check } from 'express-validator';
import { register, login, getProfile, updateProfile } from '../controller/authController.js';
import { authenticateUser } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post(
  '/register',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
    check('role', 'Role must be either job_seeker, employer, or admin')
      .exists({ checkFalsy: true }) // Ensures role is provided
      .isIn(['job_seeker', 'employer', 'admin']) // Only these roles allowed
  ],
  register
);

router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  login
);

router.get('/profile', authenticateUser, getProfile);
router.put('/profile', authenticateUser, updateProfile);

export default router;