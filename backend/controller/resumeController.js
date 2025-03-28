import Resume from "../models/resumeModels.js";
import { validationResult } from "express-validator";

export const createResume = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const existingResume = await Resume.findOne({ userId: req.user._id });
    if (existingResume) {
      return res.status(400).json({ message: "Resume already exists for this user" });
    }

    const resume = new Resume({
      userId: req.user._id,
      ...req.body,
    });
    await resume.save();
    res.status(201).json(resume);
  } catch (error) {
    res.status(500).json({ message: "Error creating resume", error: error.message });
  }
};

export const updateResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ userId: req.user._id });
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    Object.assign(resume, req.body);
    resume.updatedAt = Date.now();
    await resume.save();
    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: "Error updating resume", error: error.message });
  }
};

export const getResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ userId: req.user._id });
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }
    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: "Error fetching resume", error: error.message });
  }
};

export const getCareerResources = async (req, res) => {
  try {
    const resources = {
      articles: [
        { title: "How to Write a Winning Resume", url: "example.com/resume-tips" },
        { title: "Top Interview Questions", url: "example.com/interview-tips" },
      ],
      tools: [
        { name: "Resume Builder Guide", url: "example.com/resume-builder" },
        { name: "Salary Calculator", url: "example.com/salary-calculator" },
      ],
    };
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: "Error fetching resources", error: error.message });
  }
};