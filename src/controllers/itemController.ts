import { Request, Response } from "express";


export const getItems = (req: Request, res: Response) => {
    try { 

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
}

export const createItems = (req: Request, res: Response) => {
    try { 

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