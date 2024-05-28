import * as express from 'express';
import { googleAuth } from '../controllers/authController';

const router = express.Router();

router.patch('/google', googleAuth);

export default router;