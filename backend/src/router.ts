import { Router } from "express";
import { Request, Response } from "express";
import registerController from "./controllers/registerController";
import authRegister from "./middlewares/authRegister";
import authLogin from "./middlewares/authLogin";
import loginController from "./controllers/loginController";
import confirmationController from "./controllers/confirmationController";


const routes = Router();
const registerValidation = new authRegister().registerValidation;
const register = new registerController().register;
const loginValidation = new authLogin().authLogin;
const login = new loginController().login;

routes.get('/', (req: Request, res: Response) => {
    return res.status(200).json("Server OK")
})

routes.post('/register', registerValidation, register);
routes.get('/confirm/:token', new confirmationController().confirmRegistration);
routes.post('/login', loginValidation, login);


export default routes;