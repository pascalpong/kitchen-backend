import { Admin, Employee } from "@prisma/client";
import * as jwt from "jsonwebtoken"

const accessExp = process.env.ACCESS_EXP
const refreshEXP = process.env.REFRESH_EXP

const accessSecret = process.env.ACCESS_SECRET;
const refreshSecret = process.env.REFRESH_SECRET;

export const generateAccessToken = async (user: Admin|Employee) => {
    const secret = user.publicKey + accessSecret
    const { id, name, email, publicKey } = user;
    const accessToken = jwt.sign({ id, name, email, publicKey }, secret, { expiresIn: accessExp });
    return accessToken;
}

export const generateRefreshToken = async (user: Admin|Employee) => {
    const secret = user.publicKey + refreshSecret
    const { id, name, email, publicKey } = user;
    const refresh = jwt.sign({ id, name, email, publicKey }, secret, { expiresIn: refreshEXP });
    return refresh;
}