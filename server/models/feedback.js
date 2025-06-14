// models/feedback.js
import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  rating: { 
    type: Number, 
    required: true, min: 1, max: 5 },
  review: { 
    type: String, 
    required: true },
}, { timestamps: true });

const Feedback = mongoose.model('Feedback', feedbackSchema);
export default Feedback;
