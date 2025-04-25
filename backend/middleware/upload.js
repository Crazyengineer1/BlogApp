const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "profile_images", // Cloudinary folder name
        allowed_formats: ["jpeg", "jpg", "png"],
        transformation: [{ width: 500, height: 500, crop: "limit" }]
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 }, // 1MB
});

module.exports = upload.single("profileImage");
