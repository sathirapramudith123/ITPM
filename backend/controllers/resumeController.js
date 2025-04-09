// controllers/resumeController.js
import Resume from '../models/Resume.js';
import User from '../models/User.js';
import Joi from 'joi';

// Validation schema for resume data
const resumeSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^[0-9]{10,15}$/).optional(), // 10-15 digit phone number
  skills: Joi.array().items(Joi.string().max(50)).optional(),
  experience: Joi.array().items(
    Joi.object({
      company: Joi.string().max(100).required(),
      role: Joi.string().max(100).required(),
      startDate: Joi.date().required(),
      endDate: Joi.date().optional(),
      description: Joi.string().max(500).optional()
    })
  ).optional(),
  education: Joi.array().items(
    Joi.object({
      institution: Joi.string().max(100).required(),
      degree: Joi.string().max(100).required(),
      startDate: Joi.date().required(),
      endDate: Joi.date().optional()
    })
  ).optional()
});

// Middleware to check if user is a job seeker
const checkJobSeeker = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user || user.role !== 'job_seeker') {
    return res.status(403).json({ message: 'Only job seekers can perform this action' });
  }
  next();
};

// Create Resume
export const createResume = async (req, res) => {
  try {
    // Validate request body
    const { error } = resumeSchema.validate(req.body);
    if (error) return res.status(400).json({ message: 'Validation error', details: error.details });

    // Check if user is job_seeker (via middleware or here)
    const user = await User.findById(req.user.id);
    if (user.role !== 'job_seeker') {
      return res.status(403).json({ message: 'Only job seekers can create resumes' });
    }

    // Check if user already has a resume (optional restriction)
    const existingResume = await Resume.findOne({ userId: req.user.id });
    if (existingResume) {
      return res.status(400).json({ message: 'User already has a resume' });
    }

    const resumeData = { ...req.body, userId: req.user.id };
    const resume = new Resume(resumeData);
    await resume.save();

    // Link resume to user (optional)
    user.resume = user.resume || [];
    user.resume.push(resume._id);
    await user.save();

    res.status(201).json({ message: 'Resume created', resume });
  } catch (error) {
    res.status(500).json({ message: 'Error creating resume', error: error.message });
  }
};

// Read Resume
export const getResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ userId: req.user.id });
    if (!resume) return res.status(404).json({ message: 'Resume not found' });
    res.status(200).json(resume);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching resume', error: error.message });
  }
};

// Update Resume
export const updateResume = async (req, res) => {
  try {
    // Validate request body
    const { error } = resumeSchema.validate(req.body);
    if (error) return res.status(400).json({ message: 'Validation error', details: error.details });

    // Check if user is job_seeker
    const user = await User.findById(req.user.id);
    if (user.role !== 'job_seeker') {
      return res.status(403).json({ message: 'Only job seekers can update resumes' });
    }

    const resume = await Resume.findOneAndUpdate(
      { userId: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!resume) return res.status(404).json({ message: 'Resume not found' });
    res.status(200).json({ message: 'Resume updated', resume });
  } catch (error) {
    res.status(500).json({ message: 'Error updating resume', error: error.message });
  }
};

// Delete Resume
export const deleteResume = async (req, res) => {
  try {
    // Check if user is job_seeker
    const user = await User.findById(req.user.id);
    if (user.role !== 'job_seeker') {
      return res.status(403).json({ message: 'Only job seekers can delete resumes' });
    }

    const resume = await Resume.findOneAndDelete({ userId: req.user.id });
    if (!resume) return res.status(404).json({ message: 'Resume not found' });

    // Remove resume from user's resume array (optional)
    user.resume = user.resume.filter(id => id.toString() !== resume._id.toString());
    await user.save();

    res.status(200).json({ message: 'Resume deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting resume', error: error.message });
  }
};