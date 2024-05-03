import { v2 as cloudinary } from "cloudinary"
import fs from 'fs'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        const res = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })

        console.log("File is uploaded on Cloudinary.", res.url)
        return res;
    } catch (err) {
        fs.unlinkSync(localFilePath)
        console.log("Error in uploading file on Cloudinary.", err)
        return null;
    }
}

export { uploadOnCloudinary }