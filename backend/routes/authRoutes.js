import express from 'express';
import { check } from 'express-validator';
import { register, login, getProfile, updateProfile } from '../controller/authController.js';
import auth from '../middleware/authMiddleware.js';

const router = express.Router();

router.post(
  '/register',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
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

router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);

export default router;