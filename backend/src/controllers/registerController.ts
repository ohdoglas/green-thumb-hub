import { Request, Response } from "express";
import prisma from "../prisma";
import hash from "../security/hash";
import validatePassword from "../security/validatePassword";
import validateEmail from "../security/validadeEmail";

export default class registerController {
    async register (req: Request, res: Response) {
        const { username, email, password } = req.body;

        try {

            const hashed = await hash(password);

            const newUser = await prisma.user.create({
                data: {
                    username,
                    email,
                    password: hashed
                }
            })

            return res.status(200).json({
                message: "Tudo ok até aqui!",
                use: {
                    username,
                    email
                }
            });
        } catch (error) {
            const erro = error as Error;
            return res.status(400).json({
                message: erro.message
            });
        }
    }
}
