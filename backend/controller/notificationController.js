import Notification from "../models/notificationModels.js";
import Job from "../models/jobModels.js";
import Resume from "../models/resumeModels.js";

export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .populate("relatedJob", "title");
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notifications", error: error.message });
  }
};

export const markNotificationAsRead = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    if (notification.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    notification.isRead = true;
    await notification.save();
    res.json({ message: "Notification marked as read" });
  } catch (error) {
    res.status(500).json({ message: "Error updating notification", error: error.message });
  }
};

export const notifyEmployer = async (jobId, type) => {
  try {
    const job = await Job.findById(jobId);
    if (!job) return;

    const message =
      type === "job_application"
        ? `New applicant for your job: ${job.title}`
        : `Your job posting "${job.title}" was viewed`;

    const notification = new Notification({
      userId: job.employer,
      type,
      message,
      relatedJob: jobId,
    });
    await notification.save();
  } catch (error) {
    console.error("Error notifying employer:", error.message);
  }
};

export const notifyJobSeekers = async (jobId) => {
  try {
    const job = await Job.findById(jobId).populate("category", "name");
    if (!job || job.status !== "approved") return;

    const resumes = await Resume.find({
      "careerPreferences.jobTypes": job.jobType,
      "careerPreferences.categories": job.category,
      "careerPreferences.locations": { $in: [job.location] },
      "careerPreferences.minSalary": { $lte: job.salary },
    });

    const notifications = resumes.map((resume) => ({
      userId: resume.userId,
      type: "job_match",
      message: `New job matches your preferences: ${job.title}`,
      relatedJob: jobId,
    }));

    await Notification.insertMany(notifications);
  } catch (error) {
    console.error("Error notifying job seekers:", error.message);
  }
};