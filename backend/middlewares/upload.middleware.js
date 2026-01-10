import multer from "multer";



import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary"
import dotenv from "dotenv"

dotenv.config()


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "userdetails",
        resource_type: "auto",
        public_id: (req, file) =>
            file.fieldname + "-" + Date.now(),
    },
});





export const CloudinaryStorageUpload = multer({
    storage: storage, limits: { fileSize: 6 * 1024 * 1024 }

})





