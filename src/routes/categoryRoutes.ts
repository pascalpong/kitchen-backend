import * as express from 'express';
import { verifyToken } from '../middlewares/authentication';
import { createCategory, deleteCategory, getCategories, updateCategory } from '../controllers/categoryController';

const router = express.Router();

router.get('/', verifyToken, getCategories);
router.post('/create', verifyToken, createCategory);
router.patch('/update', verifyToken, updateCategory);
router.delete('/delete', verifyToken, deleteCategory);

export default router;