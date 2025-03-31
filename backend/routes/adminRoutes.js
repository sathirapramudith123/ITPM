import express from 'express';
import { createCategory, getCategories, updateCategory, deleteCategory, getAnalytics } from '../controllers/adminController.js';
import auth from '../middleware/auth.js';
import role from '../middleware/role.js';

const router = express.Router();

router.post('/categories', auth, role(['admin']), createCategory);
router.get('/categories', auth, role(['admin']), getCategories);
router.put('/categories/:id', auth, role(['admin']), updateCategory);
router.delete('/categories/:id', auth, role(['admin']), deleteCategory);
router.get('/analytics', auth, role(['admin']), getAnalytics);

export default router;  