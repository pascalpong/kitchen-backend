import * as express from 'express';
import { googleAuth, verifyUser } from '../controllers/authController';
import { refreshToken, verifyToken } from '../middlewares/authentication';

const router = express.Router();

router.post('/google', googleAuth);
router.post('/verify-user', verifyToken, verifyUser);
router.post('/refresh-token', refreshToken, verifyUser);

export default router;