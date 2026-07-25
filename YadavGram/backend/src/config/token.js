import jwt from 'jsonwebtoken';



const generateToken =  (userId) => {
    try {
        // generating token 
        const token =  jwt.sign({ _id:  userId }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        })

        return token;
    } catch (error) {
        console.log(`Error occur in generating token  ${error.message}`);
        throw error;
    }
}


export default generateToken;