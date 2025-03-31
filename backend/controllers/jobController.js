import Job from '../models/Job.js';
import Notification from '../models/Notification.js';

export const createJob = async (req, res) => {
  const { title, description, location, salary, type, deadline } = req.body;
  const job = new Job({ title, description, location, salary, type, deadline, employer: req.user._id });
  await job.save();
  res.status(201).json(job);
};

export const getJobs = async (req, res) => {
  const { title, location, salary, type } = req.query;
  const query = {};
  if (title) query.title = new RegExp(title, 'i');
  if (location) query.location = new RegExp(location, 'i');
  if (salary) query.salary = { $gte: salary };
  if (type) query.type = type;
  const jobs = await Job.find(query).populate('employer', 'email');
  res.json({ jobs });
};

export const getJobById = async (req, res) => {
  const job = await Job.findById(req.params.id).populate('employer', 'email');
  if (!job) return res.status(404).json({ message: 'Job not found' });
  res.json(job);
};

export const updateJob = async (req, res) => {
  const job = await Job.findOneAndUpdate(
    { _id: req.params.id, employer: req.user._id },
    req.body,
    { new: true }
  );
  if (!job) return res.status(404).json({ message: 'Job not found or unauthorized' });
  res.json(job);
};

export const deleteJob = async (req, res) => {
  const job = await Job.findOneAndDelete({ _id: req.params.id, employer: req.user._id });
  if (!job) return res.status(404).json({ message: 'Job not found or unauthorized' });
  res.json({ message: 'Job deleted' });
};

export const applyToJob = async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) return res.status(404).json({ message: 'Job not found' });
  if (job.applicants.includes(req.user._id)) {
    return res.status(400).json({ message: 'Already applied' });
  }
  job.applicants.push(req.user._id);
  await job.save();
  
  const notification = new Notification({
    user: job.employer,
    message: `${req.user.email} applied to your job: ${job.title}`
  });
  await notification.save();
  
  res.json({ message: 'Application submitted' });
};