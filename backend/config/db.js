const mongoose = require('mongoose');

const connectDB = async () => {
    const URI = process.env.MONGO_URI;
    try {
        const conn = await mongoose.connect(URI, {
            serverSelectionTimeoutMS: 30000, // Wait up to 30 seconds for server selection
            socketTimeoutMS: 45000,           // Wait up to 45 seconds for socket operations
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        console.log("MongoDB connected");
    } catch (err) {
        // console.error(`Error: ${error.message}`);
        console.error("MongoDB connection error: ", err);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
