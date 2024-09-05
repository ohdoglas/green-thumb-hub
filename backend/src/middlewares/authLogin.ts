import { Request, Response, NextFunction } from "express";
import prisma from "../prisma";
import comparePassword from "../security/passwordCompare";

export default class authLogin {
    async authLogin(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;

        try {

            if (!email || !password) {
                return res.status(400).json({
                    message: "All fields are required"
                })
            }

            const emailExists = await prisma.user.findUnique({
                where: {
                    email
                }
            })

            if (!emailExists) {
                return res.status(401).json({
                    message: "Invalid email or password"
                })
            }

            const findPassword = await prisma.user.findUnique({
                where: {
                    email: email
                },
                select: {
                    password: true
                }
            });

            if (!findPassword) {
                return res.status(401).json({
                    message: "Invalid email or password"
                })
            }

            const storePassword = findPassword.password;

            const validateHash = await comparePassword(password, storePassword);

            if (!validateHash) {
                return res.status(401).json({
                    message: "Invalid email or password"
                })
            }

            next();

        } catch (error) {
            const erro = error as Error;
            return res.status(400).json({
                message: erro.message})
        }
    }
}