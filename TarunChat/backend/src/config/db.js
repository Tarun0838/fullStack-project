import mongoose from 'mongoose'
import { DB_NAME } from '../constants.js';

const connectDb = async ()=> {
    try {
        console.log(process.env.MONGODB_URI)
        console.log(DB_NAME)
        const connectionInstace = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log('MONGODB IS CONNECTED SUCCESSFULLY ');
        console.log("Url: ",connectionInstace.connection.host);
    } catch (error) {
        console.error("MONGODB IS NOT CONNECTED ", error.message)
        process.exit(1);
    }
}

export default connectDb;