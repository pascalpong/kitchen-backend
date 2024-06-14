import * as express from 'express';
import { verifyToken } from '../middlewares/authentication';
import { createLots, deleteLot, getLots, updateLotStatus } from '../controllers/lotController';


const router = express.Router();

router.get('/', verifyToken, getLots);
router.get('/:id', verifyToken, getLots);
router.post('/create', verifyToken, createLots);
router.patch('/update/status', verifyToken, updateLotStatus);
router.delete('/delete', verifyToken, deleteLot);

export default router;