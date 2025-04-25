require('dotenv').config();
const express = require("express")
const app = express()
const cors = require("cors");
const router = require("./router/routes")
const connectDB = require("./config/db")

const port = process.env.PORT;

connectDB()


app.use(express.json())
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
    origin: process.env.FRONTEND_URL,
    method: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
};

app.use(cors(corsOptions));
app.use(router)

app.use('/uploads', express.static('uploads'));

app.listen(port, () => {
    console.log(`App running on port ${port}`);
})