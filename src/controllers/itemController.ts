import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient


export const getItems = async (req: Request, res: Response) => {
    try { 
        let where = {
            deletedAt: null
        }
        if(req.query) {
            where = { ...where, ...req.query }
        }
        const items = await prisma.item.findMany({ where })
        return res.status(200).json({ success: true, data: items})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
}

export const createItems = async (req: Request, res: Response) => {
    try {
        const { items: data } = req.body;
        console.log(req.body)
        const items = await prisma.item.createMany({ data })
        return res.status(200).json({ success: true, data: items})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
}
export const updateItems = (req: Request, res: Response) => {
    try { 

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
}
export const deleteItems = (req: Request, res: Response) => {
    try { 

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
}