/**
 * This is a JavaScript function that uploads an image to Cloudinary and returns the secure URL of the
 * uploaded image.
 * @returns A function named `cloudinaryImageUpload` is being exported. This function takes a file as
 * an argument and returns a promise. The promise resolves to an object with a `res` property that
 * contains the secure URL of the uploaded image on Cloudinary.
 */
import cloudinary from "../config/cloudinary.js";
export const cloudinaryImageUpload = async file => {
    return new Promise(resolve => {
        cloudinary.uploader.upload(file, {
            folder: "product"
        }, (err, res) => {
            if (err) return res.status(500).send("upload image error")
            resolve({
                res: res.secure_url
            })
        })
    })
}
export default cloudinaryImageUpload