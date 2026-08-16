import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { comments, getAllPost, likes, saved, uploadPost } from "../controllers/post.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const postRouter = Router();

postRouter.post('/upload',authMiddleware, upload.single("media") , uploadPost)
postRouter.get('/getAll',authMiddleware , getAllPost)
postRouter.post('/likes/:postId',authMiddleware , likes)
postRouter.get('/saved/:postId',authMiddleware , saved)
postRouter.post('/comment',authMiddleware , comments)

export default postRouter;