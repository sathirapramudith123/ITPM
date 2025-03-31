import Category from '../models/Category.js';
import User from '../models/User.js';
import Job from '../models/Job.js';
import Feedback from '../models/Feedback.js';

export const createCategory = async (req, res) => {
  const { name } = req.body;
  const category = new Category({ name });
  await category.save();
  res.status(201).json(category);
};

export const getCategories = async (req, res) => {
  const categories = await Category.find();
  res.json({ categories });
};

export const updateCategory = async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!category) return res.status(404).json({ message: 'Category not found' });
  res.json(category);
};

export const deleteCategory = async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) return res.status(404).json({ message: 'Category not found' });
  res.json({ message: 'Category deleted' });
};

export const getAnalytics = async (req, res) => {
  const userCount = await User.countDocuments();
  const jobCount = await Job.countDocuments();
  const feedbackCount = await Feedback.countDocuments();
  res.json({ userCount, jobCount, feedbackCount });
};