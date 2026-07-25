import jwt from "jsonwebtoken";

const authMiddleware = async (req , res , next) => {
    try {
        // token access karo
        // console.log(req.cookies)
        // console.log(req.cookies.jwtToken)
        const token = await req.cookies.jwtToken;

        if(!token){
            return res.status(400).json({message: "Token Not Found!"})
        }

        // decode that token
        const decodeToken = jwt.verify(token , process.env.JWT_SECRET);

        if(!decodeToken){
             return res.status(400).json({message: "Token Not Found!"})
        }

        const userId = decodeToken._id;

        req.userId = userId;
        next();
        
    } catch (error) {
        console.log("error ", error.message)
         return res.status(500).json({message: "Something Went wrong in authMiddleware!"})
    }
}

export default authMiddleware;