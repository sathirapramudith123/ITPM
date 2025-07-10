import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: { 
    type: String, required: true 
  },
  description: { 
    type: String, required: true 
  },
  category: { 
    type: String, required: true 
  },
  companyId: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'Company',
     required: true 
  },
  jobType: { 
    type: String, required: true 
  },
  applicants: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    appliedAt: { type: Date, default: Date.now }
  }],
}, { timestamps: true });

export default mongoose.model('Job', jobSchema);
