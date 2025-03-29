import Job from "../models/jobModels.js";
import Category from "../models/categoryModels.js";
import { validationResult } from "express-validator";
//import { notifyEmployer, notifyJobSeekers } from "./notificationController.js";

// Create a new job posting
export const createJob = async (req, res) => {
  try {
    const { title, description, salary, location, category, jobType, requirements, deadline } = req.body;
    const categoryExists = await Category.findById(category);
    if (!categoryExists) return res.status(400).json({ message: "Invalid category" });

    const job = new Job({
      title, description, salary, location, category, jobType, requirements, deadline,
      employer: req.user._id,
    });
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get all approved jobs with optional filters
export const getJobs = async (req, res) => {
  try {
    const { title, location, salary, jobType, category } = req.query;
    const query = { status: "approved" };

    if (title) query.title = { $regex: title, $options: "i" };
    if (location) query.location = { $regex: location, $options: "i" };
    if (salary) query.salary = { $gte: Number(salary) };
    if (jobType) query.jobType = jobType;
    if (category) query.category = category;

    const jobs = await Job.find(query)
      .populate("employer", "username email")
      .populate("category", "name");
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs", error: error.message });
  }
};

// Get a specific job by ID
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate("employer", "username email")
      .populate("category", "name")
      .populate("applicants", "username email");
    if (!job) return res.status(404).json({ message: "Job not found" });

    job.views += 1;
    await job.save();
    await notifyEmployer(job._id, "job_view");

    res.json(job);
  } catch (error) {
    res.status(500).json({ message: "Error fetching job", error: error.message });
  }
};

// Update an existing job
export const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    if (job.employer.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to update this job" });
    }
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate(
      "category",
      "name"
    );
    res.json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: "Error updating job", error: error.message });
  }
};

// Delete a job
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    if (job.employer.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to delete this job" });
    }
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting job", error: error.message });
  }
};

// Get all jobs posted by the authenticated employer
export const getEmployerJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ employer: req.user._id }).populate("category", "name");
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching employer jobs", error: error.message });
  }
};

// Apply for a job
export const applyForJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    if (job.status !== "approved") {
      return res.status(400).json({ message: "Job is not available for applications" });
    }
    if (job.applicants.includes(req.user._id)) {
      return res.status(400).json({ message: "You have already applied for this job" });
    }

    job.applicants.push(req.user._id);
    await job.save();
    await notifyEmployer(job._id, "job_application");
    res.json({ message: "Application submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error applying for job", error: error.message });
  }
};

// Get all categories for job posting (new function)
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().select("name description");
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 