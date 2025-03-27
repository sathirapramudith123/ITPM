import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./DB/db.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


dotenv.config();  // Load the environment variables


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173'
}));


// Routes
import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";

const PORT = process.env.PORT || 5000; 
connectDB();


// Connect to the MongoDB database
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); // Check the port
});


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/feedback", feedbackRoutes);



