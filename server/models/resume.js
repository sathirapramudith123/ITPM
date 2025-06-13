import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
  firstName: { 
    type: String,
     required: true 
  },
  lastName: { 
    type: String,
    required: true 
  },
  email: { 
    type: String,
    required: true 
  },
  phone: { 
    type: String,
    required: true 
  },
  educationTitle: { 
    type: String,
    required: true 
  },
  educationDescription: { 
    type: String,
    required: true 
  },
  educationStart: { 
    type: String,
    required: true 
  },
  educationEnd: { 
    type: String,
    required: true 
  },
  skills: { 
    type: String,
    required: true 
  },
  workStart: { 
    type: String,
    required: true 
  },
  workEnd: { 
    type: String, required: true 
  },
}, { timestamps: true });

export default mongoose.model('Resume', resumeSchema);
