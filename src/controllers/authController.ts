import { PrismaClient } from '@prisma/client';
import { Request, Response } from "express"; 


export const googleAuth = async (req: Request, res: Response) => {
    try {
        console.log(req.body,'req.bodyreq.bodyreq.bodyreq.body')
    } catch (error) {
        console.log(error);
    }
}
 
