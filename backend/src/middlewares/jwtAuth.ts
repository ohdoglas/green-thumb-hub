import { Request, Response, NextFunction } from "express";
import prisma from "../prisma";
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || "";


export default class jwtAuth {
    async validateToken (req: Request, res: Response, next: NextFunction) {
        const authReq = req.headers.authorization;
        const token = authReq && authReq.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                message: "Authentication failed"
            })
        }

        try {
            const authJwt = jwt.verify(token, secretKey)
            if (typeof authJwt === 'object' && authJwt.sub && typeof authJwt.sub === 'object' && 'userId' in authJwt.sub) {
                const subNum = (authJwt.sub as { userId: number }).userId;

                const findId = await prisma.user.findUniqueOrThrow({
                    where: { userId: subNum },
                    select: { userId: true }
                });

                if (findId === null) {
                    return res.status(401).json({
                        message: "Authentication failed"
                    });
                }

                next();

            } else {
                return res.status(400).json({
                    message: "Invalid token structure"
                });
            }

        } catch (error) {
            const erro = error as Error;
            return res.status(400).json({
                message: erro.message})
        }

    }

}