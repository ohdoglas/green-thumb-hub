import { Request, Response } from "express";
import prisma from "../prisma";
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || "";

export default class loginController {
    async login (req: Request, res: Response) {
        const { email, password } = req.body


        try {
            const token = jwt.sign( { email: email}, secretKey, { expiresIn: '1h'});

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