import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "",
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(`Failed to connect to MongoDB: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;