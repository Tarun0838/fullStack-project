import mongoose from 'mongoose'


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(`${process.env.MONGODB_URI}/${'chat-app'}`)
        console.log(`MongoDb Is Connected !:  ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDb is Not Connected: ${error.message}`);
        process.exit(1) // 1 means failed 0 means success

    }
}

export default connectDB;