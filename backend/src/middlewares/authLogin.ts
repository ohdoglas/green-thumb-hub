import { Request, Response, NextFunction } from "express";
import prisma from "../prisma";
import comparePassword from "../security/passwordCompare";
// import { trackLoginAttempt } from "../security/tacker";

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

            if (!validateHash) {
                // await trackLoginAttempt(user.userId, req.ip, false);
                return res.status(401).json({
                    message: "Invalid email/username or password"
                });
            }

            // await trackLoginAttempt(user.userId, req.ip, true);

            next();

        } catch (error) {
            const erro = error as Error;
            return res.status(400).json({
                message: erro.message})
        }
    }


    // private async trackFailedAttempt(email: string) {

    // }

    // private async resetFailedAttempts(email: string) {

    // }
}