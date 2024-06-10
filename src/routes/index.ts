import * as express from "express";
import authRouter from "./authRoutes";
import categoryRouter from "./categoryRoutes";
import userRouter from "./userRoutes";
import itemRouter from "./itemRoutes";
import orderRouter from "./orderRoutes";
import lotRouter from "./lotRoutes";

const router = express.Router();

router.use('/auth', authRouter);
router.use('/category', categoryRouter)
router.use('/user', userRouter)
router.use('/item', itemRouter)
router.use('/order', orderRouter)
router.use('/lot', lotRouter)

export default router;