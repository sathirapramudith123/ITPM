import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  type: { type: String, enum: ['success', 'error', 'warning', 'info'], default: 'info' }, // Added type
}, { timestamps: true });

export default mongoose.model('Notification', notificationSchema);