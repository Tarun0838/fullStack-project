import jwt from 'jsonwebtoken';



const generateToken = async (userId) => {
    try {
        // generating token 
        const token = await jwt.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        })

        return token;
    } catch (error) {
        console.log(`Error occur in generating token  ${error.message}`);
        throw error;
    }
}


export default generateToken;