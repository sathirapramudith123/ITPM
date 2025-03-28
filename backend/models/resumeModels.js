import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true, // One resume per user
  },
  personalInfo: {
    fullName: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
    linkedin: { type: String },
    portfolio: { type: String },
  },
  education: [
    {
      institution: { type: String, required: true },
      degree: { type: String, required: true },
      startDate: { type: Date, required: true },
      endDate: { type: Date },
      currentlyStudying: { type: Boolean, default: false },
    },
  ],
  experience: [
    {
      company: { type: String, required: true },
      position: { type: String, required: true },
      startDate: { type: Date, required: true },
      endDate: { type: Date },
      currentlyWorking: { type: Boolean, default: false },
      responsibilities: [String],
    },
  ],
  skills: [String],
  careerPreferences: {
    jobTypes: [{ type: String, enum: ["full-time", "part-time", "remote"] }],
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    locations: [String],
    minSalary: { type: Number },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

export default mongoose.model("Resume", resumeSchema);