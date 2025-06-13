import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  industry: {
    type: String,
    required: true,
    enum: [
      'Technology', 'Healthcare', 'Finance', 'Education',
      'Retail', 'Manufacturing', 'Construction', 'Transportation', 'Hospitality'
    ],
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Company = mongoose.model('Company', companySchema);

export default Company;
