import {Router } from 'express'
import { comments, getAllReel, likes, upload } from '../controllers/reel.controller.js';

const reelRouter = Router();

reelRouter.get('/upload',authMiddleware, upload.single("media") , upload)
reelRouter.get('/getAll',authMiddleware , getAllReel)
reelRouter.get('/likes/:reelId',authMiddleware , likes)
reelRouter.get('/comment',authMiddleware , comments)

export default reelRouter;