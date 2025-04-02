// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['job_seeker', 'employer', 'admin'], required: true },
  profile: {
    name: { type: String, default: '' },
    resume: {
      summary: { type: String, default: '' },
      skills: { type: [String], default: [] },
      phone: { type: String, default: '' },
      education: [{
        degree: { type: String, default: '' },
        institution: { type: String, default: '' },
        years: { type: String, default: '' },
      }],
    },
  },
}, { timestamps: true });

export default mongoose.model('User', userSchema);