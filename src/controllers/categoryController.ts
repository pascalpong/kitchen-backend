import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { RequestWithUser } from "../models";

const prisma = new PrismaClient;

export const getCategories = async (req: Request, res: Response) => {
    try { 
        const categories = await prisma.category.findMany({
            select: {
                id: true,
                name: true,
                User: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            },
            where: { deletedAt: null }
        })
        return res.status(200).json({ success: true, data: categories})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
}

export const createCategory = async (req: RequestWithUser, res: Response) => {
    try { 
        const { names } = req.body;
        const create = names.map((name: string) => {
            return { name, userId: req.verifyUser.id }
        }) as any[]
        const categories = await prisma.category.createMany({
            data: create
        })
        return res.status(200).json({ success: true, data: categories})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
}
export const updateCategory = async (req: Request, res: Response) => {
    try { 
        const { categoryId, categoryName } = req.body;
        const category = await prisma.category.update({
            select: {
                name: true,
                userId: true
            },
            where: {id: categoryId},
            data: {name: categoryName}
        })
        return res.status(200).json({ success: true, data: category})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
}
export const deleteCategory = async (req: Request, res: Response) => {
    try { 
        const { categoryId } = req.params;
        const category = await prisma.category.update({
            where: { id: parseInt(categoryId) },
            data: { deletedAt: new Date() }
        })
        return res.status(200).json({ success: true, data: category})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
}