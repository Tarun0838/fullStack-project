import { Router } from "express";
import { login, logout, signUp, updateProfile } from "../controllers/auth.controller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";

const router = Router();
router.use(arcjetProtection)
router.post('/signup', signUp)
router.post('/login', login)
router.post('/logout', logout)
// yah update profile se phele check karenge uesr loggedIN haiya nhi 
// so for this we are using an middleware called isLoggedIn
router.post('/update-profile',isLoggedIn,  updateProfile);

// now creating a check route that check user is authenticated or not
// agar usr loggedIN hoga to ye ussi user ka data response mai de dega
router.get('/check', isLoggedIn, (req,res)=> res.status(200).json(req.user))


export default router;