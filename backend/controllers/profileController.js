// controllers/profileController.js
import User from '../models/User.js';

const createResume = async (req, res) => {
  try {
    const { summary, skills, phone, education } = req.body;
    const user = await User.findOneAndUpdate(
      { email: req.user.email }, // Assume email from auth middleware
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
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const getResume = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user.profile.resume);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const updateResume = async (req, res) => {
  try {
    const { summary, skills, phone, education } = req.body;
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
    res.status(500).json({ message: 'Server error', error });
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
    res.json(user.profile.resume);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export { createResume, getResume, updateResume, deleteResume };