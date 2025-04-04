import User from '../models/User.js';

// Helper function for input validation
const validateResumeData = (data) => {
  const { summary, skills, phone, education } = data;
  if (!summary && !skills.length && !phone && !education.length) {
    return { valid: false, message: 'Please provide at least one field for the resume.' };
  }
  return { valid: true };
};

const createResume = async (req, res) => {
  try {
    const { summary, skills, phone, education } = req.body;

    // Validate input
    const validation = validateResumeData(req.body);
    if (!validation.valid) return res.status(400).json({ message: validation.message });

    const user = await User.findOneAndUpdate(
      { email: req.user.email },
      {
        'profile.resume': {
          summary: summary || '',
          skills: skills || [],
          phone: phone || '',
          education: education || [],
        },
      },
      { new: true, upsert: true }
    );

    res.status(201).json(user.profile.resume); // Return only the resume
  } catch (error) {
    res.status(500).json({ message: 'Error saving resume', error });
  }
};

const getResume = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user.profile.resume);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching resume', error });
  }
};

const updateResume = async (req, res) => {
  try {
    const { summary, skills, phone, education } = req.body;

    // Validate input
    const validation = validateResumeData(req.body);
    if (!validation.valid) return res.status(400).json({ message: validation.message });

    const user = await User.findOneAndUpdate(
      { email: req.user.email },
      {
        'profile.resume': { summary, skills, phone, education },
      },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user.profile.resume);
  } catch (error) {
    res.status(500).json({ message: 'Error updating resume', error });
  }
};

const deleteResume = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { email: req.user.email },
      {
        'profile.resume': { summary: '', skills: [], phone: '', education: [] },
      },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ message: 'Error deleting resume', error });
  }
};

export { createResume, getResume, updateResume, deleteResume };
