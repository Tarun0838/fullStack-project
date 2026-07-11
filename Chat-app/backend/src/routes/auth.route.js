import { Router } from "express";
import { signUp } from "../controllers/auth.controller.js";

const router = Router();

router.post('/signup', signUp)

router.get('/login', (req, res)=> {
    res.send('login endpoint ')
})
router.get('/logout', (req, res)=> {
    res.send('logout endpoint ')
})
router.get('/update', (req, res)=> {
    res.send('update endpoint ')
})

export default router;