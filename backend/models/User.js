import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['job_seeker', 'employer', 'admin'], required: true },
  profile: {
    name: String,
    resume: String,
  }
}, { timestamps: true });

export default mongoose.model('User', userSchema);