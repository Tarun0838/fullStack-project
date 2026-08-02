import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { currentUser, suggestedUser } from "../controllers/user.controller.js";


const userRouter = Router();


userRouter.get('/current', authMiddleware, currentUser);
userRouter.get('/suggested', authMiddleware, suggestedUser);


export default userRouter;