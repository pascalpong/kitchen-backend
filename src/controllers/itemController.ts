import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { Buffer } from 'buffer';
import * as path from 'path';
import * as sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

const uploadDir = path.join(__dirname, '..', '..', 'public', 'uploads', 'image');

const resizeAndSaveImage = async (base64Image: string) => {
  const filename = `${uuidv4()}.jpg`;
  const buffer = Buffer.from(base64Image.split(',')[1], 'base64');

  await sharp(buffer)
    .resize({ width: 800, height: 600, fit: 'inside' })
    .toFile(path.join(uploadDir, filename));

  return `/uploads/${filename}`;
};

export const getItems = async (req: Request, res: Response) => {
    try {
        let where = {
            deletedAt: null
        }
        if(req.query) {
            where = { ...where, ...req.query }
        }
        const items = await prisma.item.findMany({
            select: {
                id: true,
                name: true,
                price: true,
                image: true,
                createdAt: true,
                updatedAt: true,
                Category: {
                    select: {
                        name: true
                    }
                }
            },
            where 
        })
        return res.status(200).json({ success: true, data: items})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
}

export const createItems = async (req: Request, res: Response) => {
    try {
        const { items: itemlist } = req.body;

        const items = await Promise.all(itemlist.map(async (item: any) => {
            const image = item.image ? await resizeAndSaveImage(item.image) : null;
            const intPrice = item.price ? parseInt(item.price) : 0;
            return { ...item, image, price: intPrice };
        }));

        const savedItems = await prisma.item.createMany({ data: items });
        return res.status(200).json({ success: true, data: savedItems });
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