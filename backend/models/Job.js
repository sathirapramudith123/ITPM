import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: Number, required: true },
  type: { type: String, enum: ['full-time', 'part-time', 'remote', 'contract', 'internship'], required: true },
  employer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  deadline: { type: Date }
}, { timestamps: true });

export default mongoose.model('Job', jobSchema);