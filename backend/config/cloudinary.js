// backend/config/cloudinary.js
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name:  process.env.CLOUDINARY_CLOUD_NAME,
  api_key:     process.env.CLOUDINARY_API_KEY,
  api_secret:  process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload a file buffer to Cloudinary
 * @param {Buffer} buffer     - File buffer from multer memoryStorage
 * @param {string} folder     - Cloudinary folder name e.g. "hirenexon/logos"
 * @param {string} publicId   - Optional custom filename
 * @returns {Promise<string>} - Secure URL of uploaded file
 */
export const uploadToCloudinary = (buffer, folder, publicId = "") => {
  return new Promise((resolve, reject) => {
    const options = {
      folder,
      resource_type: "auto",
      transformation: [{ quality: "auto", fetch_format: "auto" }],
    };
    if (publicId) options.public_id = publicId;

    const stream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) return reject(error);
      resolve(result.secure_url);
    });

    stream.end(buffer);
  });
};

/**
 * Delete a file from Cloudinary by its URL
 * @param {string} url - Cloudinary secure URL
 */
export const deleteFromCloudinary = async (url) => {
  if (!url || !url.includes("cloudinary.com")) return;
  try {
    // Extract public_id from URL
    const parts = url.split("/");
    const folderAndFile = parts.slice(parts.indexOf("upload") + 2).join("/");
    const publicId = folderAndFile.replace(/\.[^/.]+$/, ""); // remove extension
    await cloudinary.uploader.destroy(publicId);
  } catch (err) {
    console.error("Cloudinary delete error:", err);
  }
};

export default cloudinary;
