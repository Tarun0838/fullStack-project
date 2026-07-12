import { Router } from "express";
import { isLoggedIn } from "../middleware/auth.middleware.js";
import { getAllContacts, getChatUser, getMessageByUserId, sendMessage } from "../controllers/message.controller.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";


const router = Router();

// message routes
router.use(arcjetProtection,isLoggedIn)
/**
 * ye upar maine middleware use kiye hai jo phele rate limiter check hoga fir user loggedIn hai ya nhi ye check hoga usek baad routes execute honge
 */

router.get('/contacts', getAllContacts);
router.get('/chats', getChatUser);
router.get('/:id', getMessageByUserId);
router.post('/send/:id', sendMessage);

export default router;