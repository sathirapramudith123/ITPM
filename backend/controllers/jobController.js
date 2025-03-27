import Job from '../models/jobModels.js';

// Create a job posting
export const createJob = async (req, res) => {
  try {
    const { title, description, salary, location, jobType, requirements, deadline } = req.body;
    const job = new Job({
      title,
      description,
      salary,
      location,
      jobType,
      requirements,
      deadline,
      employer: req.user.id,
    });
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: 'Error creating job', error: error.message });
  }
};

// Get all jobs
export const getJobs = async (req, res) => {
  try {
    const { title, location, salary, jobType } = req.query;
    const query = {};

    if (title) query.title = { $regex: title, $options: 'i' };
    if (location) query.location = { $regex: location, $options: 'i' };
    if (salary) query.salary = { $gte: salary };
    if (jobType) query.jobType = jobType;

    const jobs = await Job.find(query).populate('employer', 'name email');
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs', error: error.message });
  }
};

// Get a single job by ID
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('employer', 'name email');
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching job', error: error.message });
  }
};

// Update a job posting
export const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    if (job.employer.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this job' });
    }
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: 'Error updating job', error: error.message });
  }
};

// Delete a job posting
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    if (job.employer.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this job' });
    }
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting job', error: error.message });
  }
};

// Get employer's jobs (dashboard)
export const getEmployerJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ employer: req.user.id });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employer jobs', error: error.message });
  }
};