import { Request, Response, NextFunction } from "express";
import prisma from "../prisma";
import validateEmail from "../security/validadeEmail";
import validatePassword from "../security/validatePassword";
import isValidUsername from "../security/validateUsername";

export default class authRegister {
    async registerValidation (req: Request, res: Response, next: NextFunction) {
        const { username, email, password } = req.body;

        try {
            if (!username || !email || !password) {
                return res.status(400).json({
                    message: "All fields are required"
                });
            }

            const validUsername = isValidUsername(username);

            const validEmail = validateEmail(email);

            if (!validEmail) {
                return res.status(400).json({
                    message: "Please, enter a valid e-mail"
                });
            }

            if (!validUsername) {
                return res.status(400).json({
                    message: "Please, enter a valid username"
                });
            }

            const userExists = await prisma.user.findUnique({
                where: {
                    username
                }
            });

            const emailExists = await prisma.user.findUnique({
                where: {
                    email
                }
            });

            if (userExists) {
                return res.status(400).json({
                    message: "Username already in use"
                });
            }

            if (emailExists) {
                return res.status(400).json({
                    message: "Email already in use"
                });
            }

            const validPassword = validatePassword(password);

            if (!validPassword) {
                return res.status(400).json({
                    message: `
        Your password must have at least 5 characters, an uppercase letter and a number. Also containing one of the following special characters; ($, *, &, @, #)`
                })
            }

            next();
        } catch (error) {
            const erro = error as Error;
            return res.status(400).json({
                message: erro.message
            });
        }
    }
}
