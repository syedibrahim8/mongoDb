import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();

async function dbConnect(){
    try {
        const URI = process.env.DBURI
        await mongoose.connect(URI)
        console.log("Database connected");
    } catch (error) {
        console.log(error);
    }
}
dbConnect()