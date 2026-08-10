import uploadOnCloudinary from "../config/cloudinary.js";
import { User } from "../models/user.model.js";



export const currentUser = async (req, res) => {
    try {
        // loggedIn usr ki user id lo
        const userId = req.userId;
        // ab user find karo
        const loggedInUser = await User.findById(userId);
        if (!loggedInUser) {
            return res.status(400).json({ message: "user Not Found" });

        }
        // send response

        res.status(200).json({ success: true, loggedInUser, message: "current user found successfully" })
    } catch (error) {
        console.error("error ", error.message);
        return res.status(500).json({ message: "Internal server error in currentUser " });
    }
}

export const suggestedUser = async (req, res) => {
    
    
    try {

        /**
         *  suggested user get karenge 
         * to uske liye aisa karenge ki sare logged in user ko show kar denge
         */
       const allUser = await  User.find({
        _id: { $ne: req.userId }
       }).select("-password")
       if(!allUser){
        return res.status(200).json({message: "No suggested User"})
       }
       return res.status(200).json(allUser)
    } catch (error) {
        console.error("error", error.message)
        res.status(500).josn({message: "Internal server error "})
    }
}

export const editProfile = async (req, res) => {
    try {
        // yah edit profile ka controlller likhenge jiski help se profile image edit karenge

        // sabse phele data lo
        const {name , username , bio , profession , gender} = req.body;

        // loggedInUser find karo
        const loggedInUser = await User.findById(req.userId).select("-password");

        if(!loggedInUser){
            return res.status(400).json({message: "user not found!"})
        }

        // check given username is equal with loggedInUsernamee

        const UserWithSameUsername = await User.findOne({username}).select("-password")

        if(UserWithSameUsername && UserWithSameUsername._id != req.userId){
            return res.status(400).json({message: "username already exist!"})
        }

        // upload the profile
        let profileImage;
        if(req.file){
           profileImage =  await uploadOnCloudinary(req.file.path)
        }
        
        // now edit the detail
        loggedInUser.name = name;
        loggedInUser.username = username;
        loggedInUser.profileImage = profileImage
        loggedInUser.bio = bio;
        loggedInUser.profession = profession;
        loggedInUser.gender = gender;


        await loggedInUser.save();

        return res.status(201).json(loggedInUser)
    } catch (error) {
         return res.status(500).json(`Internal server error: ${error.message}`)
    }
}

export const getProfile = async (req, res) => {
    try {
      

        const { username } = req.params;

     

        if(!username) {
            return res.status(400).json({message: "username is required!"})

        }

        const user = await User.findOne({username}).select("-password");
        
        if(!user){
            return res.status(400).json({message: "user not found!"})
        }

        return res.status(200).json(user);

    } catch (error) {
        return res.status(500).json(`Internal server error ${error.message}`)
    }
}