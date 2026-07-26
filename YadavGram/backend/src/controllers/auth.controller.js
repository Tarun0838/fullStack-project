import generateToken from "../config/token.js";
import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import sendMail from "../config/mail.js";




export const signup = async (req , res ) => {
    try {
        // step 1 data lo 
        const {name , username , email , password} = req.body;
        
        // step 2 validate karo details ko 
        if(!name || !username || !email || !password ){
            return res.status(400).json({message: "All fields are required !"})
        }

        // step 3 check user already exist or not by email and username
        const existEmail = await User.findOne({email});
        if(existEmail){
            return res.status(400).json({message: "Email already exists!"})
        }
        
        const existUsername = await User.findOne({username});
        if(existUsername){
            return res.status(400).json({message: "Username already exists !"})
        }

        // step 4 password ko hash karo 
        const hashPassword = await bcrypt.hash(password , 10);

        // step 5  ab db mai object create karke store karo 

        const user = await User.create({
            name,
            username,
            email,
            password: hashPassword
        })

        // step 6 token create karunga
        const token = await generateToken(user._id);

        // step 7 token ko cookies mai store karo
        res.cookie('jwtToken', token , {
            maxAge: 1000*60*60*24*7,
            httpOnly: true,
            secure: false,
            sameSite: "Strict"
        })
        
        // send res 
        res.status(201).json({
            success: true,
            data: user,
            message: "User signUp successfully"
        })
    } catch (error) {
        console.log("Error occur in signup controller", error.message);
        res.status(500).json({message: "Internal server error "});
    }
}


export const login = async (req , res) => {
    try {
        // data lo
        const {username , password} = req.body;

        // validate karo
        if(!username || !password){
            return res.status(400).json({message: "All fields are required !"})
        }

        // check user exist or not 
        const user = await User.findOne({username});
        if(!user){
            return res.status(400).json({message: "User Not Found !"})
        }

        // password check
        if(password.length < 6) {
            return res.status(400).json({message: "password must be atleast 6 character!"})
        }

        // compare password 
        const isPasswordCorrect = await bcrypt.compare(password , user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message: "Incorrect Password !"})
        }

        // generate token 
        const token = generateToken(user._id);

        // store in cookie
         res.cookie('jwtToken', token , {
            maxAge: 1000*60*60*24*7,
            httpOnly: true,
            secure: false,
            sameSite: "Strict"
        })


        // return res
        return res.status(200).json({
            success: true,
            data: user,
            message: "User loggedIn successfully"
        })
    } catch (error) {
        console.log(`Error occur in login controller ${error.message}`)
        return res.status(500).json({message: `Internal server error `})
    }
}


export const logout = async (req, res) => {
    try {
        // logout 
        res.clearCookie('jwtToken');
        return res.status(200).json({message: "User Logged Out Successfully !"})
    } catch (error) {
        return res.status(500).json({message: "internal server error in Logout!"})
    }
}

export const sendOtp = async (req , res) => {
    try {
        // yah otp send karenge 
        const {email} = req.body;

        // validate email
        if(!email) return res.status(400).json({message: "email is required!"})
        
        // find user using email
        const user = await User.findOne({email});
        if(!user){
           return res.status(400).json({message: "User Not Found!"})
        }

        // ab otp generate karo
        const otp = Math.floor(1000 + Math.random()*9000).toString();
        // console.log(otp);

        user.resetOtp = otp;
        // that means 5 minute. baad otp expires ho jayega

        user.otpExpires = Date.now() + (1000*60*5);
        user.isOtpVerified = false;

        await user.save();

        // now sending the email

        await sendMail(email ,otp);
        res.status(200).json({
            success: true,
            message: `Otp has sent to your email:${email} `
        })
    } catch (error) {
        console.error(`error in otp controller: ${error.message}`)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export const verifyOtp = async (req , res ) => {
    try {
        /**
         * otp verify karna hai to email and otp chaiye 
         * 
         */

        const {email , otp} = req.body;
        // validate karunga
        if(!email || !otp ){
            return res.status(400).json({message: "All fields are required!"})

        }

        // finding the user with this email
        const user = await User.findOne({email});
        if(!user || user.resetOtp !== otp || user.otpExpires < Date.now){
            return res.status(400).json({message: "invalid user "})
        }

        // now verifyOtp ko true karo
        user.verifyOtp = true;
        user.isOtpVerified = true;
        user.resetOtp = undefined;
        user.otpExpires = undefined;
        await user.save();
        res.status(200).json({message: "opt verified successfully"});


    } catch (error) {
        console.log("error: ", error.message)
        res.status(500).json({message: "Internal Server error "});
    }
}

export const resetPassword = async (req, res) => {
    try {
        // step 1: email and password lo 
        const {email , password} = req.body;

        // step 2: inko verify kro
        if(!email || !password) {

            return res.status(400).json({message: "All fields are required!"})
        }
        // finding user using this email

        const user = await User.findOne({email})
        if(!user || !user.isOtpVerified){
            return res.status(400).json({message: "Otp verification is required"})
        }

        // console.log(user.isOtpVerified)
        // password ko hash karunga
        const hashPassword = await bcrypt.hash(password , 10);

        user.password = hashPassword;
        user.isOtpVerified = false;
        await user.save();

        

        return res.status(200).json({message: "password Reset successfully"})
        

        
        
    } catch (error) {
        console.error("error", error.message)
         return res.status(500).json({message: "Internal server error "})
    }
}