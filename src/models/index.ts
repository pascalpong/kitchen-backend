import { Admin, Employee } from "@prisma/client"
import { Request } from "express"


export interface RequestWithUser extends Request {
    user: Admin|Employee,
    verifyUser: any,
    accessToken: string
}

export interface googleAuthGeneral { 
    uid: string, 
    email: string, 
    displayName: string, 
    photoURL: string, 
    providerData: [], 
    phoneNumber: string
}