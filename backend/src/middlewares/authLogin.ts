import { Request, Response, NextFunction } from "express";
import prisma from "../prisma";
import comparePassword from "../security/passwordCompare";
import { resetFailedAttempts, trackLoginAttempt } from "../security/tacker";

export default class authLogin {
    private static MAX_ATTEMPTS = 5;
    private static LOCK_TIME = 10 * 30 * 1000;




    async authLogin(req: Request, res: Response, next: NextFunction) {
        const { email, password, username } = req.body;

        try {

            if (!email && !username) {
                return res.status(400).json({
                    message: "Email or username is required"
                })
            };

            if (!password) {
                return res.status(400).json({
                    message: "Password is required required"
                })
            };

            const user = await prisma.user.findFirst({
                where: {
                    OR: [
                        { email },
                        { username }
                    ]
                }
            });

            if (!user) {
                return res.status(401).json({
                    message: "Invalid email/username or password"
                })
            }

            const verifyConfirmation = await prisma.user.findUnique({
                where: { userId: user.userId},
                select: { isConfirmed: true}
            })

            if (verifyConfirmation?.isConfirmed === false || verifyConfirmation === null) {
                return res.status(401).json({
                    message: "Please confirm your email to log in"
                })
            }


            const findPassword = await prisma.user.findUnique({
                where: { userId: user.userId },
                select: { password: true }
            });

            if (!findPassword) {
                return res.status(401).json({
                    message: "Invalid email/username or password"
                });
            }

            const storePassword = findPassword.password;

            const validateHash = await comparePassword(password, storePassword);

            const userIp = req.ip || "unknown";

            if (!validateHash) {
                await trackLoginAttempt(user.userId, userIp, false);
                return res.status(401).json({
                    message: "Invalid email/username or password"
                });
            }

            const findAttempts = await prisma.loginAttempt.findFirst({
                where: { userId: user.userId },
                select: { id: true }
            });

            if (findAttempts) {
                await resetFailedAttempts(user.email);
            }

            next();

        } catch (error) {
            const erro = error as Error;
            return res.status(400).json({
                message: erro.message})
        }
    }
}