import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    enum: ["job_application", "job_view", "job_match"],
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  relatedJob: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Notification", notificationSchema);