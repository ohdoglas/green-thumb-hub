import { Router } from "express";
import { Request, Response } from "express";
import registerController from "./controllers/registerController";
import authRegister from "./middlewares/authRegister";


const routes = Router();
const registerValidation = new authRegister().registerValidation;
const register = new registerController().register;

routes.get('/', (req: Request, res: Response) => {
    return res.status(200).json("Server OK")
})

routes.post('/register', registerValidation, register);

export default routes;