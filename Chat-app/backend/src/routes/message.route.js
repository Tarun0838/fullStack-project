import { Router } from "express";
import { isLoggedIn } from "../middleware/auth.middleware.js";
import { getAllContacts, getMessageByUserId, sendMessage } from "../controllers/message.controller.js";


const router = Router();

// message routes
router.get('/contacts', isLoggedIn,  getAllContacts);
router.get('/chats', getChatUser);
router.get('/:id',isLoggedIn ,getMessageByUserId);
router.post('/send/:id',isLoggedIn, sendMessage);

export default router;