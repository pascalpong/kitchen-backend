import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import * as crypto from "crypto";
import { RequestWithUser } from "../models";

const prisma = new PrismaClient


export const getBills = async (req: Request, res: Response) => {
    try { 
        let where = {
            deletedAt: null
        }
        if(req.query) {
            where = { ...where, ...req.query }
        }
        const bills = await prisma.bill.findMany({ where, orderBy: { createdAt: 'desc' },
            select: {
                lotId: true,
                code: true,
                id: true,
                people: true,
                status: true,
                createdAt: true,
                Lot: {
                    select: {
                        id: true,
                        name: true,
                        amount: true,
                        status: true,
                        qrcode: true,
                        code: true,
                    }
                },
                User: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        photoURL: true,
                        phone: true,
                        type: true,
                        status: true
                    }
                }
            }
        })
        return res.status(200).json({ success: true, data: bills})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
}

export const getOpenBillByLotCode = async (req: RequestWithUser, res: Response) => {
    try {
        const { code } = req.params;
        const bill = await prisma.lot.findFirstOrThrow({
            where: {
                code
            },
            include: {
                Bill: {
                    where: {
                        status: 'open'
                    },
                    orderBy: {
                        createdAt: 'desc'
                    },
                    take: 1
                }
            }
        })
        return res.status(200).json({ success: true, data: bill})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
}

export const createBill = async (req: RequestWithUser, res: Response) => {
    try {
        const { lotId, status } = req.body;
        const bill = await prisma.bill.create({
            data: {
                code: crypto.randomBytes(10).toString('hex'),
                lotId,
                status,
                userId: req.verifyUser.id,
            }
        })
        return res.status(200).json({ success: true, data: bill})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
}

export const closeBill = async (req: RequestWithUser, res: Response) => {
    try {
        const { billId, lotId, status } = req.body;
        const bill = await prisma.bill.update({
            where: {
                id: billId,
                lotId
            },
            data: {
                status
            }
        })
        console.log(bill)
        return res.status(200).json({ success: true, data: bill})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
}