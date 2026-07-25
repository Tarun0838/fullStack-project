import generateToken from "../config/token.js";
import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs';


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