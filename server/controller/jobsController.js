import Job from '../models/jobs.js';

// Get all jobs
// Get all jobs or search by title/category
export const getAllJobs = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { category: { $regex: search, $options: 'i' } },
        ],
      };
    }

    const jobs = await Job.find(query).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Get a job by ID
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Create a new job
export const createJob = async (req, res) => {
  try {
    const job = new Job(req.body);
    const savedJob = await job.save();
    res.status(201).json(savedJob);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update an existing job
export const updateJob = async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedJob) return res.status(404).json({ error: 'Job not found' });
    res.json(updatedJob);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a job
export const deleteJob = async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);
    if (!deletedJob) return res.status(404).json({ error: 'Job not found' });
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Apply to a job
export const applyToJob = async (req, res) => {
  try {
    const userId = req.user.id;
    const job = await Job.findById(req.params.jobId);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    // Prevent duplicate applications
    if (job.applicants.some(app => app.user.toString() === userId)) {
      return res.status(400).json({ message: 'You have already applied to this job.' });
    }
    job.applicants.push({ user: userId });
    await job.save();
    res.json({ message: 'Application successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get jobs the current user has applied to
export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.user.id;
    const jobs = await Job.find({ 'applicants.user': userId })
      .sort({ createdAt: -1 });
    // Optionally populate company name if needed
    res.json(jobs.map(job => ({
      _id: job._id,
      title: job.title,
      companyName: job.companyProfile,
      appliedAt: job.applicants.find(app => app.user.toString() === userId)?.appliedAt,
    })));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
