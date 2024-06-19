import * as express from 'express';
import { verifyToken } from '../middlewares/authentication';
import { createItems, deleteItems, getItems, updateItems } from '../controllers/itemController';
import upload from '../middlewares/upload';

const router = express.Router();

router.get('/', verifyToken, getItems);
router.post('/create', verifyToken, upload.array('items', 10), createItems);
router.patch('/update', verifyToken, updateItems);
router.delete('/delete', verifyToken, deleteItems);

export default router;