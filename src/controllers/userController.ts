import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient;

export const getUsers = async (req: Request, res: Response) => {
    try { 
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                type: true,
                status: true,
                phone: true,
                photoURL: true,
                createdAt: true,
                updatedAt: true,
            },
            where: {
                deletedAt: null
            }
        })
        return res.status(200).json({ success: true, data: users})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
}

export const assignUserType = async (req: Request, res: Response) => {
    try { 
        const { userId, type } = req.body;
        const assign = await prisma.user.update({
            select: {
                id: true,
                name: true,
                type: true
            },
            where: { id: userId },
            data: {
                type
            }
        })
        return res.status(200).json({ success: true, data: assign})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
}
export const updateUsers = (req: Request, res: Response) => {
    try { 

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
}
export const deleteUsers = (req: Request, res: Response) => {
    try { 

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
}