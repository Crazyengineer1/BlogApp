const mongoose = require("mongoose")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { boolean } = require("zod");

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    profileImage: { type: String, default: "", },
    profileImageId: { type: String, default: "" },
});

UserSchema.pre("save", async function (next) {
    // console.log(this);
    const user = this;

    if (!user.isModified("password")) {
        return next()
    }

    try {
        const saltRound = await bcrypt.genSalt(15);
        const hashPassword = await bcrypt.hash(user.password, saltRound)
        user.password = hashPassword;
    } catch (error) {
        next(error)
    }

})



UserSchema.methods.generateToken = async function () {
    try {
        return jwt.sign(
            {
                username: this.username,
                email: this.email,
                isAdmin: this.isAdmin,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "60d",
            }
        )
    } catch (error) {
        console.log(error);
    }
}

const User = new mongoose.model('User', UserSchema);
module.exports = User;
