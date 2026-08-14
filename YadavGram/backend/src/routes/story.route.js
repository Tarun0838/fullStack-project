import {Router } from 'express'
import authMiddleware from '../middlewares/auth.middleware.js';
import { upload } from "../middlewares/multer.middleware.js";
import { getStoryByUsername, uploadStory, viewStory } from '../controllers/story.controller.js';
const storyRouter = Router();

storyRouter.get('/upload',authMiddleware, upload.single("media") , uploadStory)
storyRouter.get('/view/:storyId',authMiddleware , viewStory)
storyRouter.get('/getByUsername/:username',authMiddleware , getStoryByUsername)


export default storyRouter;