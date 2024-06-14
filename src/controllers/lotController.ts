import { Lot, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { generateQRCode } from "../utils/generateQRcode";
import * as crypto from "crypto";

const prisma = new PrismaClient


export const getLots = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        let where = {
            deletedAt: null
        }
        if(id) {
            where = { ...where, ...{id: parseInt(id)} }
        }
        const items = await prisma.lot.findMany({ 
            where,
            select: {
                id: true,
                name: true,
                code: true,
                amount: true,
                status: true,
                qrcode: true,
                createdAt: true,
                Bill: {
                    orderBy: {
                        createdAt: 'desc',
                    },
                    take: 1,
                    select: {
                        id: true,
                        code: true,
                        status: true,
                        people: true,
                        createdAt: true,
                    },
                },
            }
        }); 
        return res.status(200).json({ success: true, data: items})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
}

export const createLots = async (req: Request, res: Response) => {
    try { 
        const { data } = req.body;
        const url = `${req.protocol}://${req.get('host')}`
        const create: any[] = data.map((datum: any) => {
            const { name, amount } = datum; 
            const code = crypto.randomBytes(10).toString('hex')
            const qrLocation = `public/qr-code/${code}-qr.png`;
            generateQRCode(`${url}/lot/${code}`, qrLocation);
            return { name, amount: parseInt(amount), qrcode: qrLocation, code, status: "inactive" }
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