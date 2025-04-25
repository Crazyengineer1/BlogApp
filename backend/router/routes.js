const express = require("express");
const authController = require("../controllers/auth-controller")
const validator = require("../middleware/validation-middleware")
const authMiddleware = require("../middleware/auth-middleware")
const uploadMiddleware = require("../middleware/upload")
const registrationValidator = require("../validators/registration-validator")
const loginValidator = require("../validators/login-validator")
const passwordValidator = require("../validators/change-password-validator")
const router = express.Router();

router.route("/").get(authController.home)

router.route("/register").post(validator(registrationValidator), authController.register)

router.route("/login").post(validator(loginValidator), authController.login)

router.route("/contacts").post(authMiddleware, authController.contact)

router.route("/profile").get(authMiddleware, authController.getProfile)

router.route("/create").post(authMiddleware, authController.create)

router.route("/upload-profile-image").post(authMiddleware, uploadMiddleware, authController.upload)

router.route("/change-password").post(validator(passwordValidator), authMiddleware, authController.changePassword)

router.route("/blog/:id").get(authController.fetchBlog)

router.route("/messages").get(authMiddleware, authController.messages)

router.route("/delete-message").post(authController.deleteMessage)

router.route("/delete-blog").post(authMiddleware, authController.deleteBlogs)

module.exports = router;