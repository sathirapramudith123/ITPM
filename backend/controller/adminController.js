import Job from "../models/jobModels.js";
import User from "../models/userModels.js";
import Category from "../models/categoryModels.js";
import { notifyJobSeekers } from "./notificationController.js";

export const manageJobPostings = async (req, res) => {
  try {
    const { jobId, action } = req.body;

    if (!["approve", "reject"].includes(action)) {
      return res.status(400).json({ message: "Invalid action" });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    await Job.findByIdAndUpdate(jobId, {
      status: action === "approve" ? "approved" : "rejected",
    });
    if (action === "approve") {
      await notifyJobSeekers(jobId);
    }
    res.json({ message: `Job ${action}d successfully` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const manageUserRoles = async (req, res) => {
  try {
    const { userId, role } = req.body;
    if (!["job_seeker", "employer", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const user = await User.findByIdAndUpdate(userId, { role }, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const manageCategories = async (req, res) => {
  try {
    const { action, categoryId, name, description } = req.body;

    switch (action) {
      case "create":
        const newCategory = new Category({ name, description });
        await newCategory.save();
        return res.status(201).json(newCategory);
      case "update":
        const updatedCategory = await Category.findByIdAndUpdate(
          categoryId,
          { name, description },
          { new: true }
        );
        if (!updatedCategory) {
          return res.status(404).json({ message: "Category not found" });
        }
        return res.json(updatedCategory);
      case "delete":
        const category = await Category.findById(categoryId);
        if (!category) {
          return res.status(404).json({ message: "Category not found" });
        }
        await Job.updateMany({ category: categoryId }, { $unset: { category: "" } });
        await Category.findByIdAndDelete(categoryId);
        return res.json({ message: "Category deleted" });
      case "list":
        const categories = await Category.find();
        return res.json(categories);
      default:
        return res.status(400).json({ message: "Invalid action" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// New: Get all jobs for admin overview
export const getAllJobs = async (req, res) => {
  try {
    const { status } = req.query; // Filter by status (pending, approved, rejected)
    const query = status ? { status } : {};
    const jobs = await Job.find(query)
      .populate("employer", "username email")
      .populate("category", "name");
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// New: Get all users with filtering
export const getAllUsers = async (req, res) => {
  try {
    const { role } = req.query; // Filter by role (job_seeker, employer, admin)
    const query = role ? { role } : {};
    const users = await User.find(query).select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// New: Delete a user
export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.role === "admin") {
      return res.status(403).json({ message: "Cannot delete an admin user" });
    }

    await User.findByIdAndDelete(userId);
    // Optionally, clean up related data (e.g., jobs, resumes)
    await Job.deleteMany({ employer: userId });
    await Resume.deleteOne({ userId });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};