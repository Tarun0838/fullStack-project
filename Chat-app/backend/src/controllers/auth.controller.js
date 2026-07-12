import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
import { User } from '../models/user.model.js'
import generateToken from "../lib/utils.js";
import { sendWelcomeEmail } from "../Emails/emailHandler.js";
import cloudinary from "../lib/cloudinary.js";


export const signUp = async (req, res) => {

    // data lo req.body se

    const { fullname, email, password } = req.body;

    try {
        // validate all fields
        if (!fullname || !email || !password) {
            return res.status(400).json({ message: "All Fields are required" })
        }

        // check email is valid or not
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email " })
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'password must be at least 6 character' })
        }
        // check user is exist or not 
        const existingUser = await User.findOne({ email: email })
        if (existingUser) {
            return res.status(400).json({ message: "User is already exists" })
        }

        // hash password
        // creating salt 
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // entry in db
        const newUser = await new User({
            fullname,
            email,
            password: hashPassword
        })

        if (newUser) {
            generateToken(newUser._id, res);
            await newUser.save()

            // seding welcome email to user
            try {
                await sendWelcomeEmail(newUser.fullname, newUser.email, process.env.CLIENT_URL)
            } catch (error) {
                console.log(`Error occur in sendind email : ${error}`)
                console.dir(error, { depth: null });
                return res.status(500).json({ message: " Email is not send properly by server " })
            }

            res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                email: newUser.email,
                password: newUser.password,
                profilePic: newUser.profilePic
            })
        }
        else {

            res.status(400).json({ message: "Invalid user Data" })
        }


        // sending welcome email 

    } catch (error) {
        console.error(`error in creating signup controller :  ${error.message}`)
        res.status(500).json({ message: "Internal server error " })
    }


}

export const login = async (req, res) => {
    // get the data for login 
    const {email , password}= req.body;

    try {
        // validate the fields
        if(!email || !password){
            return res.status(400).json({message: "All fields are required!"})
        }
    
        // check user exist or not
       const user= await  User.findOne({email})
       if(!user){
        return res.status(400).json({message: "Invalid Credentials"})
       }
    
       // compare password
       const idPasswordCorrect = await bcrypt.compare(password , user.password)
       if(!idPasswordCorrect){
        return res.status(400).json({message: "Invalid Credentials"})
       }
    
       // generating token
       generateToken(user._id, res);
    
       // sending the response to user
       res.status(201).json({
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        profilePic: user.profilePic,
        message: `${user.fullname} is loggedIn Successfully`
       })
    } catch (error) {
        console.error(`error occur in login controller : ${error}`)
        res.status(500).json({message: 'internal server error '})
    }
}

export const logout = async (req, res) => {
    // logout mai to simply cookie ko reset karna hai 
    try {
        res.cookie('jwt', "", {
            maxAge:0
        })
        res.status(201).json({message:"user Logged Out Successfully"})
    } catch (error) {
        console.error(`error occur in logout controller : ${error}`)
        res.status(500).json({message:"Internal server error"})
    }
}

export const updateProfile = async (req, res)=> {
    // get profiePic from req.body
    try {
        const {profilePic} = req.body;
        const userId = req.user._id
    
        if(!profilePic){
            return res.status(400).json("profile pic is required!");
        }
    
        // upload profile to cloudinary
       const uploadResponse = await  cloudinary.uploader.upload(profilePic);
    
       if(!uploadResponse){
         return res.status(400).json({message: "profilePic is not uploaded to cloudinary"})
    
       }
       console.log(`Profile pic is uploaded to Cloudinary Successfully ${uploadResponse.secure_url}`)
    
       // store url in database
       console.log(userId)
      const updatedUser = await  User.findByIdAndUpdate(userId, {profilePic: uploadResponse.secure_url},{new: true}).select("-password")

      console.log(updatedUser)
      if(!updatedUser){
        return res.status(500).json({message: "something went wrong in server"})
      }
    
      // return response
      res.status(201).json({
        success: true,
        data: updatedUser,
        message: "profile is updated Successfully"
      })
    
    } catch (error) {
        console.error(`error occur in updating profile pic : ${error}`)
        res.status(500).json({message: "internal server eror "})
    }


}