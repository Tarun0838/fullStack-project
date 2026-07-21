import mongoose from 'mongoose'
import {DB_NAME} from '../constant.js'
const connectDb = async () => {
    try {
        // connecting the database 
       const connectionInstance =  await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
       console.log(`Database is Connected Successfully:  ${connectionInstance.connection.host}`)

    } catch (error) {
        // database is not connected 
        console.error(`DATABASE IS NOT CONNECTED ! ` );
        console.log(`url: ${error.message}`);
        process.exit(1);
    }
}

export default connectDb;