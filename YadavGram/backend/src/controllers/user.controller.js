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