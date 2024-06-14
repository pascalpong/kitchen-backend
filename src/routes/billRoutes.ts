import * as express from 'express';
import { verifyToken } from '../middlewares/authentication';
import { createBill, getBills, getOpenBillByLotCode } from '../controllers/billController';


const router = express.Router();

router.get('/', verifyToken, getBills);
router.get('/lotCode/:code', verifyToken, getOpenBillByLotCode);
router.post('/create', verifyToken, createBill);

export default router;