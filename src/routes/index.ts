import * as express from "express";
import authRouter from "./authRoutes";
// import { verifyToken } from "../middlewares/authentication";

const router = express.Router();

router.use('/auth', authRouter);

export default router;