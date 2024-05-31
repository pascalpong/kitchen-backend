import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { RequestWithUser } from "../models";
import { Admin, Employee, PrismaClient } from "@prisma/client";
import { generateAccessToken } from "../utils/tokens";

const prisma = new PrismaClient();

const accessSecret = process.env.ACCESS_SECRET
const refreshSecret = process.env.REFRESH_SECRET

export const verifyToken = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    const publicKey = req.headers['user-key'];
    if (!token || !publicKey) {
        return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
    }
    try {
        const decoded = jwt.verify(token, publicKey + accessSecret);
        req.accessToken = token;
        req.verifyUser = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Invalid token.' });
    }
};


export const refreshToken = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ success: false, message: 'No token provided' });
        }
        const falseDecode = jwt.decode(token) as Admin | Employee | null;
        if (!falseDecode) {
            return res.status(401).json({ success: false, message: 'Failed to decode token' });
        }
        const { id, email, publicKey } = falseDecode;
        const findUser = await prisma.admin.findUnique({
            where: { id, email, publicKey }
        });
        if (!findUser) {
            return res.status(401).json({ success: false, message: 'User not found' });
        }
        try {
            const refreshToken = findUser.refreshToken;
            const decoded = jwt.verify(refreshToken, publicKey + refreshSecret) as Admin | Employee;
            const newAccessToken = await generateAccessToken(decoded);
            req.accessToken = newAccessToken;
            req.verifyUser = decoded;
            next();
        } catch (error) {
            console.error('Error refreshing token:', error);
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }
    } catch (error) {
        console.log(error)
        return res.status(401).json({ success: false, message: 'Invalid token.dddd' });
    }
}