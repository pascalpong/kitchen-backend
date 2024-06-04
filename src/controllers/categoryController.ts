import { Request, Response } from "express";


export const getCategories = (req: Request, res: Response) => {
    try { 

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
}

export const createCategory = (req: Request, res: Response) => {
    try { 

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
}
export const updateCategory = (req: Request, res: Response) => {
    try { 

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
}
export const deleteCategory = (req: Request, res: Response) => {
    try { 

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
}