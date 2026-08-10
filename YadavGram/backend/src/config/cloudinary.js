import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'

const uploadOnCloudinary = async (filePath) => {

    // configuring the cloudinary setup
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    try {
       const upload = await  cloudinary.uploader.upload(filePath , {resource_type: "auto"})
       if(!upload) {
        console.error("error occur in cloudinary " )
       }
       // deleting the localfile path
       fs.unlinkSync(filePath);

       return upload.secure_url

    } catch (error) {
        fs.unlinkSync(filePath)
        console.error(`Failed to  Upload file cloudinary ${error.message}`)

    }
}

export default uploadOnCloudinary;