const mongoose = require('mongoose');

const connectDB = async () => {
    const URI = process.env.MONGO_URI;
    try {
        const conn = await mongoose.connect(URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        console.log("MongoDB connected");
    } catch (error) {
        // console.error(`Error: ${error.message}`);
        console.error("MongoDB connection error: ", err);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
