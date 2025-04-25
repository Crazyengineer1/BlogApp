const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true }

})

const Blog = new mongoose.model('Blog', blogSchema);
module.exports = Blog;