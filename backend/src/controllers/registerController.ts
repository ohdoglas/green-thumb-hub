import { Request, Response } from "express";
import prisma from "../prisma";
import hash from "../security/hash";
import 'dotenv/config'
import generateConfirmationToken from "../security/confirmToken";
import sendConfirmationEmail from "../security/confirmationEmail";


export default class registerController {
    async register(req: Request, res: Response) {
        const { username, email, password } = req.body;

        try {
            const hashed = await hash(password);
            const confirmationToken = await generateConfirmationToken();
            // const newUser = await prisma.user.create({
            //     data: {
            //         username,
            //         email,
            //         password: hashed,
            //         confirmationToken,
            //         isConfirmed: false
            //     }
            // });

            await sendConfirmationEmail(email, confirmationToken);

            return res.status(200).json({
                message: "Registration successful, please check your email to confirm your registration.",
                user: {
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