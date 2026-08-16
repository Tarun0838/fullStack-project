import {Router } from 'express'
import { comments, getAllReel, likes, uploadReel } from '../controllers/reel.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import { upload } from "../middlewares/multer.middleware.js";
const reelRouter = Router();

reelRouter.post('/upload',authMiddleware, upload.single("media") , uploadReel)
reelRouter.get('/getAll',authMiddleware , getAllReel)
reelRouter.get('/likes/:reelId',authMiddleware , likes)
reelRouter.post('/comment',authMiddleware , comments)

export default reelRouter;