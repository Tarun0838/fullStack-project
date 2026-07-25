import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { currentUser } from "../controllers/user.controller.js";


const userRouter = Router();


userRouter.get('/current', authMiddleware, currentUser);


export default userRouter;