import uploadOnCloudinary from "../config/cloudinary.js";
import { Story } from "../models/story.model.js";
import { User } from "../models/user.model.js"


export const uploadStory = async (req , res ) => {
    try {
        // yah story uplaod karne ka controller hoga
        /**
         * jisme agar koi story hogito phelevo delete hogi fir new story lagegi
         * yah sirf ek hi story lag sakti hai 
         */

        // deleting the story
        const user = await User.findById(req.userId);
        if(user.story){
            // delete karo story kari
            await Story.findByIdAndDelete(user.story)
            user.story = null;
        }

        // get the mediatype from body;
        const {mediaType} = req.body;
        if(!mediaType){
            return res.status(400).json({message: "Media type is required"})
        }

        // upload media to cloudinary 
        let media;
        if(req.file){
            media = await uploadOnCloudinary(req.file.path);
        }
        else{
            return res.status(400).json({message: "media is not uploaded to cloudinary"})
        }


        // creating story collection 
        const story = await Story.create({
            author: req.userId,
            mediaType ,
            media
        })

        // push story id in user.story
        user.story.push(story._id);
        user.save();


        // populate the author and viewwers
        const populatedStory = await story.populate("author","name username profileImage")
        .populate("viewers", "name username profileImage")

        // send response
        return res.status(200).json(populatedStory)



        
    } catch (error) {
        console.log(`error in upload  story controller ${error.message}`)
        return res.status(500).json({message: `Internal server error`})
    }
}

export const viewStory = async (req , res ) => {
    try {
        /**
         * storyview total kitne hai ya kitne logo ne view ki hai uska controller ayega
         * step 1: get story id from req.params
         * step 2: find story and validate 
         * step 3: check story viewed or not
         *          if yes then nothing to do
         *          if no then add userId in sotry.viewers
         * 
         * step 4: story .save()
         * step 5: populate story (author viewwers)
         */

        // step 1: get storyId from req.params
        const {storyId} = req.params;
        if(!storyId){
            return res.status(400).json({message: "StoryId is required"})
        }

        // step 2: find story
        const story = await Story.findById(storyId);

        if(!story){
            return res.status(400).json({message: "Story Not Found"})
        }

        // step 3: check story is viewed or not
        const alreadyViewed = story.viewers.some((id) => id.toString() === req.userId.toString());

        if(!alreadyViewed){
            story.viewers.push(req.userId);
        }

        // step 4: save story
        await story.save();

        // step 5: populate story;
        const populatedStory = await Story.findById(story._id).populate("author", "name username profileImage").populate("viewers","name username profileImage")

        // return response
        return res.status(200).json(populatedStory);

    } catch (error) {
        console.log(`error in view  story controller ${error.message}`)
        return res.status(500).json({message: `Internal server error`})
    }
}

export const getStoryByUsername = async (req , res) => {
    try {
        /**
         * yah story ko username se get karne ke liye controller ayega
         *
         * step 1: get username  from req.params
         * step 2: find user and validate 
         * step 3: find story({author: user._id})
         *         
         * 
         * step 4: story .save()
         * step 5: populate story (author viewwers)
         * step 6: return response
         * 
         */

        // step 1: get username 
        const {username} = req.params;
        if(!username){
            return res.status(400).json({message: "username is Required"})
        }

        // step 2: find user
        const user = await User.findOne({username});

        // validate user
        if(!user){
            return res.status(400).json({message: "User Not Found"})
        }

        // find story by user
        const story = await Story.findOne({author: user._id}).populate("author", "name username profileImage").populate("viewers","name username profileImage")

       if(!story){
        return res.status(400).json({message: "story not found"})
       }

        // return response
        return res.status(200).json(story);


    } catch (error) {
        console.log(`error in get story by username controller ${error.message}`)
        return res.status(500).json({message: `Internal server error`})
    }
}