import User from '../models/User.js';
import Job from '../models/Job.js';

export const updateProfile = async (req, res) => {
  const { name } = req.body;
  const updateData = { 'profile.name': name };
  if (req.file) updateData['profile.resume'] = req.file.path;
  const user = await User.findByIdAndUpdate(req.user._id, updateData, { new: true });
  res.json(user);
};

export const getJobRecommendations = async (req, res) => {
  const appliedJobs = await Job.find({ applicants: req.user._id }).select('_id');
  const appliedJobIds = appliedJobs.map(job => job._id);
  const recommendations = await Job.find({ _id: { $nin: appliedJobIds } }).limit(5);
  res.json({ recommendations });
};