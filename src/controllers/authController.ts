import { Admin, Employee, PrismaClient } from '@prisma/client';
import { Request, Response } from "express"; 
import { RequestWithUser, googleAuthGeneral } from '../models';
import { generateKey } from '../utils/generateKeys';
import { generateAccessToken, generateRefreshToken } from '../utils/tokens';

const prisma = new PrismaClient;

export const verifyUser = async (req: RequestWithUser, res: Response) => {
    try {
        const data = {...req.verifyUser, accessToken: req.accessToken};
        return res.status(200).json({ success: true, data})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
}

export const googleAuth = async (req: Request, res: Response) => {
    try {
        const { uid, email, displayName, photoURL, providerData, phoneNumber }: googleAuthGeneral = req.body;
        let user: any
        let data: any
        user = await prisma.admin.findUnique({
            where: {
                email
            }
        });
        if(!user) {
            data = await register({ uid, email, displayName, photoURL, providerData, phoneNumber }) 
            return res.status(200).json({ success: true, data})
        } else {
            data = await updateTokens(user)
            return res.status(200).json({ success: true, data})
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
}

const updateTokens = async (user: Admin|Employee) => {
    try {
        const tokens = await getTokens(user)
        const updatedUser = await prisma.admin.update({
            where: {
                email: user.email,
            },
            data: {
                refreshToken: tokens.refreshToken
            },
        });
        const { refreshToken, details, ...data } = {...updatedUser, ...tokens};
        return data
    } catch (error) {
        console.log(error)
    }
}
 
const register = async (data: googleAuthGeneral) => {
    try {
        const { uid, email, displayName, photoURL, providerData, phoneNumber } = data;
        const user = await prisma.admin.create({
            data: {
                name: displayName,
                email,
                phone: phoneNumber,
                photoURL,
                details: providerData,
                publicKey: await generateKey()
            }
        })
        const updated = await updateTokens(user)
        return updated
    } catch (error) {
        console.log(error);
    }
}

const getTokens = async (user: Admin|Employee) => {

    const accessToken = await generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user)
    const tokens = {
        accessToken,
        refreshToken
    }
    return tokens;
}

