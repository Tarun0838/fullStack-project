import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
import { User } from '../models/user.model.js'
import generateToken from "../lib/utils.js";
import { sendWelcomeEmail } from "../Emails/emailHandler.js";

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