import { Request, Response } from "express";
import prisma from "../prisma";

export default class confirmationController {
    async confirmRegistration ( req: Request, res: Response ) {
        const { token } = req.params;

        try {
            const user = await prisma.user.findUnique({
                where: { confirmationToken: token }
            });

            if (!user) {
                return res.status(400).json({
                    message: "Invalid or expired token"
                });
            }


            await prisma.user.update({
                where: { userId: user.userId },
                data: { isConfirmed: true, confirmationToken: null }
            });

            return res.status(200).json({
                message: "Registration confirmed successfully!"
            });

        } catch (error) {
            const erro = error as Error;
            return res.status(400).json({
                message: erro.message
            });
        }
    }
}