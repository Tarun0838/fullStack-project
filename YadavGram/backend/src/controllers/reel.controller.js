import uploadOnCloudinary from "../config/cloudinary.js";
import { Reel } from "../models/reel.model.js";
import { User } from "../models/user.model.js";


export const upload = async (req , res ) => {
    try {
        /**
         * yah reels upload ke controller ayenge
         * step 1 : get the caption from body
         * step 2 : upload media to cloudinary 
         * step 3: create reel collection 
         * step 4 : find user 
         * step 5: push reel id to user.reels
         * step 6 : populate reels (author)
         * step 7 : return response 
         */

        // step 1 : get the caption
        const {caption} = req.body;
        if(!caption){
            return res.status(400).json({message: 'Caption is required'})
        }

        let media;
        if(req.file){
            media = await uploadOnCloudinary(req.file.path);
        }
        else{
            return res.status(400).json({message: "Error in Uploading reel to cloudinary"})
        }

        // creating reel collection
        const reel = await Reel.create({
            caption, 
            author: req.userId,
            media,

        })

        const user = await User.findById(req.userId);

        if(!user){
            return res.status(400).json({message: "User Not Found"})
        }

        user.reels.push(reel._id);
        await user.save();

        const populatedReel = await reel.populate("author", "name username profileImage")

        return res.status(200).json(populatedReel)
    
        

    } catch (error) {
        console.log(`Error occur in uploading Reel controller ${error.message}`)
        return res.status(500).json({message: `Internal Server error `})
    }
}

export const likes = async (req , res) => {
    try {
       /**
        * yah like reel ka controller ayega
        * step 1: reelId lo from req.params se
        * step 2: find reel
        * step 3: check reel exist or not
        * step 4: check reel liked or not
        *           if yes => unlike => remove userId from likes
        *           if no => like => add userId in likes
        * step 5: find user
        * step 6: user.reel.push(reelId)
        * step 7: populate reel (author)
        * step 8: return response
        * 
        *  
        * */ 
        
       // step 1 get reelId
       const {reelId} = req.params;

       // step 2 find reel
       const reel = await Reel.findById(reelId);
       
       // check reel exist or not
       if(!reel){
        return res.status(400).json({message: `Reel Not Found`})
       }

       // check reel liked or not
       const alreadyLiked = reel.likes.some((id) => id.toString() === req.userId.toString())
       if(alreadyLiked){
            // dislike
            reel.likes = reel.likes.filter((id) => id.toString() !== req.userId.toString())
       }
       else{
        reel.likes.push(req.userId)
       }

       await reel.save();

       await reel.populate("author", "name username profileImage")

       return res.status(200).json(reel)

    } catch (error) {
           console.log(`error in likes Reel controller ${error.message}`)
        return res.status(500).json({message: `Internal server error`})
    }
}

export const getAllReel = async (req, res) => {
    try {
        /**
         * get all post of user 
         * 
         */
        const reels = await Reel.find({}).populate("author", "name username profileImage").populate("comment.author")

        return res.status(200).json(reels)
    } catch (error) {
         console.log(`error in getAll Reel controller ${error.message}`)
        return res.status(500).json({message: `Internal server error`})
    }
}

export const comments = async (req, res) => {
    try {
        /**
         * yah comments ka controller hoga ek author and message
         */
        const {message} = req.body;
        const reelId = req.params.reelId;

        if(!message){
            return res.status(400).json({message: "comment message is required"})
        }


        const reel = await Reel.findById(reelId);
       
       
        reel.comment.push({
            author: req.userId,
            message: message
        });

        // Step 5: database mein save karo
        await reel.save();


        reel.populate("author","name username profileImage");
        reel.populate("comment.author")

    } catch (error) {
        console.log(`error in comment  reel controller ${error.message}`)
        return res.status(500).json({message: `Internal server error`})
    }
}