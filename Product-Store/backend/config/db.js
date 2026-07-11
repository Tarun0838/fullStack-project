import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDb = async () => {
    try {
        console.log(`${process.env.MONGODB_URI}/${DB_NAME}`);
        const conn = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`MONGODB CONNECTED SUCCESSFULLY : ${conn.connection.host}`)
    } catch (error) {
        console.log(`MongoDB is Not Connected`)
        console.error(`Error : ${error}`)
        process.exit(1)
    }
}

export default connectDb;