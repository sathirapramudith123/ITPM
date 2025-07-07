import express from 'express';
import {
  registerUser,
  loginUser,
  getAllUsers,
  getUserCounts,
  getUserById,
  updateUser,
  deleteUser
} from '../controller/userController.js';

import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', protect, adminOnly, getAllUsers);
router.get('/counts', getUserCounts);
router.get('/:id', protect, getUserById);
router.put('/:id', protect, updateUser);
router.delete('/:id', protect, deleteUser);

export default router;
