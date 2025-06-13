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
  companyProfile: { 
    type: String, required: true 
  },
  jobType: { 
    type: String, required: true 
  },
}, { timestamps: true });

export default mongoose.model('Job', jobSchema);
