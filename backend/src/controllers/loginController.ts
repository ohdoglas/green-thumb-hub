import { Request, Response } from "express";
import prisma from "../prisma";
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || "";

export default class loginController {
    async login (req: Request, res: Response) {
        const { email, username, password } = req.body

        try {

            const userId = await prisma.user.findFirst({
                where: {
                    OR: [
                        { email },
                        { username }
                    ]
                },
                select: { userId: true }
            });

            if ( userId === null ) {
                return res.status(401).json({
                    message: "Authentication failed"
            })
        }
            const payLoad = {
                sub: userId,
                iat: Math.floor(Date.now() / 1000)
            };

            const token = jwt.sign(payLoad, secretKey, { expiresIn: '1h'});

            return res.status(200).json({
                message: "Authentication sucessful",
                token: token
            })
        } catch (error) {
            const erro = error as Error;
            return res.status(400).json({
                message: erro.message})
        }
    }
}