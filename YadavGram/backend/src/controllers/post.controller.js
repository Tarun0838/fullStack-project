import uploadOnCloudinary from "../config/cloudinary.js";
import { Post } from "../models/post.model";
import { User } from "../models/user.model.js";


export const uploadPost = async (req , res ) => {
    try {
        /**
         * post ko upload karne ka controller likhenge
         * 1. req.body se caption and media type lunga
         * 2. media ko cloudinary par upload karke url lo 
         * 3. post collection create karunga
         * 4. find user (loggedIn)
         * 5. user.posts.push(post ki id)
         * 6. post ko populate kara lo (author ko )
         * 7. return response
         *
         */

        // step 1 get the data from body
        const {caption , mediaType} = req.body;

        if(!caption || !mediaType){
            return res.status(400).json({message: "All fields are required"})
        }

        // step 2 media upload karke url ko (cloudinary)
        let media; 
        if(req.file){
            media = await uploadOnCloudinary(req.file.path);
        }else{
            return res.status(400).json({message: "Error occur in uploading media to cloudinaryˀ"})
        }
    } catch (error) {
        
    }
}