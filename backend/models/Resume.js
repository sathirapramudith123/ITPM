
import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  skills: [{ type: String }],
  experience: [{
    company: String,
    role: String,
    startDate: Date,
    endDate: Date,
    description: String
  }],
  education: [{
    institution: String,
    degree: String,
    startDate: Date,
    endDate: Date
  }],
}, { timestamps: true });

export default mongoose.model('Resume', resumeSchema);