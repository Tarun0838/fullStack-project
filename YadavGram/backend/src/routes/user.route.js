import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { currentUser, editProfile, getProfile, suggestedUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";


const userRouter = Router();


userRouter.get('/current', authMiddleware, currentUser);
userRouter.get('/suggested', authMiddleware, suggestedUser);
userRouter.get('/getProfile/:username', authMiddleware, getProfile);
userRouter.post('/edit-profile', authMiddleware, upload.single("profileImage") ,editProfile);


export default userRouter;;  