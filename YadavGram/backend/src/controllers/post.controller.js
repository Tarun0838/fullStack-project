import uploadOnCloudinary from "../config/cloudinary.js";
import { Post } from "../models/post.model.js";
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

        // step 3 creating post collection
        const post = await Post.create({
            caption , mediaType , media , author: req.userId
        })

        // step 4 finding the user 
        const user = await User.findById(req.userId)
        user.posts.push(post._id);
        await user.save();

        // step 5 populate the post
        const populatedPost = await Post.findById(post._id).populate("author", "name username profileImage")

        // step 6 return response
        return res.status(201).json(populatedPost);
    } catch (error) {
        console.log(`error in upload post controller ${error.message}`)
        return res.status(500).json({message: `Internal server error`})
    }
}

export const getAllPost = async (req, res) => {
    try {
        /**
         * get all post of user 
         * 
         */
        const posts = await Post.find({}).populate("author", "name username profileImage").sort({createdAt:-1})

        return res.status(200).json(posts)
    } catch (error) {
         console.log(`error in getAll post controller ${error.message}`)
        return res.status(500).json({message: `Internal server error`})
    }
}

export const likes = async (req , res ) => {
    try {
        /**
         * so likes controller ke steps
         * step 1 : post id lo req.params se
         * step 2 : find post
         * step 3: check user ne already post ko like kiya hai ya na
         * step 4: if yes => unlike => remove the user
         * sttep 5: if no => like => add the user 
         * step 6: post.populate (author)
         * step 7 : return response
         */

        // step 1: get post id
        const postId = req.params.postId;

        // step 2: find post 
        const post = await Post.findById(postId);
       
        if(!post){
            return res.status(400).json({message:`post not found `})
        }

        // step 3 : check user already like the post or not
        const likeAlready =  post.likes.some((id) => id.toString() === req.userId.toString() )

        if(likeAlready){
            // unlike karunga
            post.likes = post.likes.filter((id) => id.toString() !== req.userId.toString())
        }
        else{
            post.likes.push(req.userId)
        }

        await post.save();

        await post.populate("author","name username profileImage")
       return res.status(201).json(post);
        
    } catch (error) {
        console.log(`error in likes post controller ${error.message}`)
        return res.status(500).json({message: `Internal server error`})
    }
}

export const comments = async (req, res) => {
    try {
        /**
         * yah comments ka controller hoga ek author and message
         */
        const {message} = req.body;
        const postId = req.params.postId;

        if(!message){
            return res.status(400).json({message: "comment message is required"})
        }


        const post = await Post.findById(postId);
       
       
        post.comment.push({
            author: req.userId,
            message: message
        });

        // Step 5: database mein save karo
        await post.save();


        post.populate("author","name username profileImage");
        post.populate("comment.author")

    } catch (error) {
        console.log(`error in likes post controller ${error.message}`)
        return res.status(500).json({message: `Internal server error`})
    }
}

export const saved = async (req , res ) => {
    try {
        /**
         * post saved ka controller likhna hai
         * step 1: get postId from req.params
         * step 2: find the user (loggedIn user )
         * step 3: check post is saved or not
         *         if yes => unSaved Post -> removed user from saved[]
         *         if no => saved Post -> add user in saved[]
         * step 4: user.save()
         * step 5: populate saved[]
         * step 6: return user
         */



    // step 1: get post id
        const postId = req.params.postId;

        // step 2: find post 
        const post = await Post.findById(postId);
        const user = await User.findById(req.userId)
       
        if(!post){
            return res.status(400).json({message:`post not found `})
        }

        // step 3 : check user already like the post or not
        const alreadySaved =  user.saved.some((id) => id.toString() === req.postId.toString() )

        if(alreadySaved){
            // unlike karunga
            user.saved = user.saved.filter((id) => id.toString() !== req.postId.toString())
        }
        else{
            user.saved.push(req.postId)
        }

        await user.save();

        await user.populate("saved")
       return res.status(201).json(user);

    } catch (error) {
        console.log(`error in saved post controller ${error.message}`)
        return res.status(500).json({message: `Internal server error`})
    }
}