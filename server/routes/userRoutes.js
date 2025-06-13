import express from 'express';
import {registerUser,loginUser,getAllUsers} from '../controller/userController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', protect, adminOnly, getAllUsers);

export default router;
