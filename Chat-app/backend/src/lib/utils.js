import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config();


 const generateToken = async(userId , res)=> {
    // here we are going to generate token for authentication
    const token = jwt.sign(
        {userId : userId},
        process.env.JWT_SECRET,
        {expiresIn: '7d'}
    )

    // cookies mai send kardo token ko
    res.cookie('jwt', token, {
        maxAge: 1000*60*60*24*7,
        httpOnly: true,
        sameSite: true,
        secure: process.env.NODE_ENV === 'developement'? false: true
    })
}

export default generateToken