import * as express from 'express';
import { verifyToken } from '../middlewares/authentication';
import { assignUserType, deleteUsers, getUsers, updateUsers } from '../controllers/userController';

const router = express.Router();

router.get('/', verifyToken, getUsers);
router.patch('/assign', verifyToken, assignUserType);
router.patch('/update', verifyToken, updateUsers);
router.delete('/delete', verifyToken, deleteUsers);

export default router;