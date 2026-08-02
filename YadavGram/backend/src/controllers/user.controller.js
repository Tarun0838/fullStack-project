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
        /** suggested user get karenge 
         * to uske liye aisa karenge ki sare logged in user ko show kar denge
         */
       const allUser = await  User.find({
        _id: { $ne: [req.userId] }
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