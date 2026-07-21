import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs'

export const registerUser = async(req ,res)=> {
    // here user ko register karana hai 

    // data lo
    try {
        const {fullname , username , password , confirmPassword, gender} = req.body;
    
        // validate karo
        if(!fullname ||  !username ||  !password || !gender){
            return res.status(400).json({message: 'All fields are required'})
    
        }
    
        // password = confirmpassword
        if(password!= confirmPassword){
            return res.status(400).json({message: 'password & confirm password must be match'})
    
        }
    
        // check user is already exist or not
    
        const existUser = await User.findOne({username})
        if(existUser){
            return res.status(400).json({message: 'user is already exists! '})
        }
    
        // password ko hash karlo
        const hashPassword = await bcrypt.hash(password, 10);
    
        // db mai store karlo
        const user = await User.create({
            fullname,
            username,
            password: hashPassword,
            profilePhoto: "",
            gender
        })

        res.status(201).json({
            success: true,
            message: "usr register successfully",
            data: user
        })


    } catch (error) {
        console.error("error occur in register user", error.message);
        res.status(500).json("internal server error ");
    }
}