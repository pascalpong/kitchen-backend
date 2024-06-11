import { Lot, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient


export const getLots = async (req: Request, res: Response) => {
    try {
        const items = await prisma.lot.findMany({ 
            where: {
                deletedAt: null
            }
        })
        return res.status(200).json({ success: true, data: items})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
}

export const createLots = async (req: Request, res: Response) => {
    try { 
        const { data } = req.body;
        const create: any[] = data.map((datum: any) => {
            const { name, amount } = datum 
            return { name, amount: parseInt(amount) }
        })
        const items = await prisma.lot.createMany({ data: create })
        return res.status(200).json({ success: true, data: items})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
}

export const updateLotStatus = async (req: Request, res: Response) => {
    try { 
        const { lotId, status } = req.body;
        const lot = await prisma.lot.update({
            where: {
                id: lotId
            },
            data: {
                status: status ? 'active' : 'inactive'
            }
        })
        return res.status(200).json({ success: true, data: lot})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
}

export const deleteLot = (req: Request, res: Response) => {
    try { 

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
}