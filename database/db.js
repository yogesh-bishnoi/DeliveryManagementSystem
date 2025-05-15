import mongoose from "mongoose";
import dotenv from "dotenv";
// Configure dotenv
dotenv.config({
    path: './.env'
})

// Database connection
const mongodb = mongoose.connect(process.env.DB_URL
).then(() => {
    console.log("mongodb connected successfully");
}).catch((err) => {
    console.error(err)
});

export default mongodb;