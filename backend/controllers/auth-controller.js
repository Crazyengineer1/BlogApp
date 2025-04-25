const fs = require('fs');
const path = require('path');
const bcrypt = require("bcryptjs");
const cloudinary = require("../config/cloudinary");
const User = require("../models/user");
const Contact = require("../models/contact")
const blog = require("../models/blog");
const { error } = require('console');

const home = async (req, res) => {
    try {
        const blogs = await blog.find({}, '_id title content');

        res.status(200).json(blogs)
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: err })
    }
}

const register = async (req, res) => {
    try {
        const { username, email, password, isAdmin } = req.body;
        const userExist = await User.findOne({ username })

        if (userExist) {
            return res.status(400).json({ msg: "User already exists" })
        }

        const userCreated = await User.create({ username, email, password, isAdmin })

        res.status(201).json({
            msg: "User created",
            token: await userCreated.generateToken()
        })

    } catch (error) {
        res.status(500).json({ msg: `${error}` })
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const userExist = await User.findOne({ username })

        if (!userExist) {
            return res.status(400).json({ msg: "Invalid Credentials" })
        }

        const passwordCheck = await bcrypt.compare(password, userExist.password)

        if (passwordCheck) {
            res.status(200).json({
                msg: "Login Successful",
                token: await userExist.generateToken(),
            })
        } else {
            res.status(401).json({ msg: "Invalid Credentials" })
        }

    } catch (error) {
        res.status(500).json({ msg: error })
    }
};

const contact = async (req, res) => {
    try {
        const { message } = req.body;

        const username = req.user.username;

        const userExist = await User.findOne({ username })

        if (!userExist) {
            return res.status(400).json({ msg: "Invalid Username" })
        }

        await Contact.create({ username, message })
        return res.status(200).json({ msg: "Message sent" })

    } catch (err) {
        return res.status(500).json({ msg: "Message sending failed" })
    }

};

const getProfile = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.user.username });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const { username, email, isAdmin, profileImage } = user;

        res.status(200).json({
            message: "Profile fetched successfully",
            user: { username, email, isAdmin, profileImage },
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching profile", error: error.message });
    }
};
const create = async (req, res) => {
    try {

        const username = req.user.username;

        const user = await User.findOne({ username });

        if (!user.isAdmin) {
            res.status(401).json({ redirect: "/", message: "Admin access only" });
            return;
        }

        const { title, content } = req.body;

        await blog.create({ title, content })

        res.status(201).json({ msg: "Blog added" })
    } catch (err) {
        res.status(500).json({ msg: err })
    }

}

const upload = async (req, res) => {
    try {
        const username = req.user.username;
        const imagePath = req.file.path;
        const publicId = req.file.filename || req.file.public_id;

        const user = await User.findOne({ username });

        // Delete old image from filesystem if it exists
        if (user.profileImageId) {
            await cloudinary.uploader.destroy(user.profileImageId);
        }

        user.profileImage = imagePath;
        user.profileImageId = publicId;
        await user.save();
        res.status(200).json({ message: "Image uploaded", imageUrl: imagePath });
        console.log("Image saved");

    } catch (error) {
        res.status(500).json({ message: "Upload failed", error: error.message });
        console.log("Image", error);

    }
}

const changePassword = async (req, res) => {
    try {
        const { op, np } = req.body;

        const username = req.user.username;

        const user = await User.findOne({ username })

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const passwordCheck = await bcrypt.compare(op, user.password)

        if (!passwordCheck) {
            return res.status(401).json({ message: "Incorrect current password" });
        }

        user.password = np;
        await user.save();

        res.status(200).json({ message: "Password Changed" })
    } catch (e) {
        res.status(500).json({ message: "Changing password failed", error: e.message })
        console.error(e);
    }
}

const fetchBlog = async (req, res) => {
    const { id } = req.params;
    try {
        const blogData = await blog.findOne({ _id: id })
        res.status(200).json(blogData)
    } catch (err) {
        res.status(500).json({ message: "Error fetching blog", error: err.message })
        console.error(err);

    }
}

const messages = async (req, res) => {
    const username = req.user.username;

    const user = await User.findOne({ username })

    if (!user.isAdmin) {
        res.status(401).json({ message: "Admin access only", redirect: "/" })
        return;
    }
    try {
        const messages = await Contact.find({}, '_id username message')
        res.status(200).json(messages)
    } catch (err) {
        res.status(500).json({ message: err })
    }
}

const deleteMessage = async (req, res) => {
    const { id } = req.body;
    try {
        const deletedMessage = await Contact.findByIdAndDelete(id);

        if (!deletedMessage) {
            return res.status(404).json({ message: 'Message not found' });
        }

        res.status(200).json({ message: 'Message deleted successfully' });
    } catch (err) {
        console.error("Delete Message Error:", err);
        res.status(500).json({ message: 'Server error' });
    }
}

const deleteBlogs = async (req, res) => {
    try {
        const username = req.user.username;

        const user = await User.findOne({ username });

        if (!user.isAdmin) {
            res.status(401).json({ redirect: "/", message: "Admin access only" });
            return;
        }
        const { id } = req.body;
        const deletdBlog = await blog.findByIdAndDelete(id);

        if (!deletdBlog) {
            return res.status(404).json({ message: "Blog deleted successfully" })
        }
        res.status(200).json({ message: "Blog deleted successfully" })
    } catch (err) {
        console.log("Delete Blogs", err);
        res.status(500).json({ message: "Internal server error" });
    }


}

module.exports = { register, login, contact, home, getProfile, create, upload, changePassword, fetchBlog, messages, deleteMessage, deleteBlogs };