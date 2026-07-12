import jwt from 'jsonwebtoken'
import { User } from '../models/user.model.js';


export const isLoggedIn = async (req, res , next) => {
    // token chaiye cookies se
    try {
        const token = req.cookies.jwt;
        // console.log(token);
        if(!token){
            return res.status(400).json({message:"Unauthorized - token is required!"})
        }

        // check token is valid or not
        const decodedToken= jwt.verify(token, process.env.JWT_SECRET)
        // console.log("decoded token : ", decodedToken)
        if(!decodedToken){
            return res.status(400).json({message: "Unauthorized - Invalid Token"})
        }
        // get userid from token
        const user = await User.findById(decodedToken.userId).select("-password")
        if(!user){
            return res.status(404).json({message: "user not found"})
        }
        // console.log(user)

        req.user = user
        next();

    } catch (error) {
        console.error(`error in auth middleware : ${error}`);
        res.status(500).json({message: "internal server error "})
    }
}