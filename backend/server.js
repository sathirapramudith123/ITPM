import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./DB/db.js";
import express from "express";
import cors from "cors";




dotenv.config();  // Load the environment variables

const app = express();
app.use(express.json());
app.use(cors());


const PORT = process.env.PORT || 5000; 
connectDB();


// Connect to the MongoDB database
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); // Check the port
});





