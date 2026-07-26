import { Router } from "express";
import { login, logout, resetPassword, sendOtp, signup, verifyOtp } from "../controllers/auth.controller.js";

const authRouter = Router();


authRouter.route('/signup').post(signup);
authRouter.route('/login').post(login);
authRouter.route('/send-otp').post(sendOtp);
authRouter.route('/verify-otp').post(verifyOtp);
authRouter.route('/reset-password').post(resetPassword);

authRouter.route('/logout').post(logout);


export default authRouter;