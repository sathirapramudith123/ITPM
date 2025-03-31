import Feedback from '../models/Feedback.js';

export const submitFeedback = async (req, res) => {
  const { comment, rating } = req.body;
  const feedback = new Feedback({ user: req.user._id, comment, rating });
  await feedback.save();
  res.status(201).json(feedback);
};

export const getFeedback = async (req, res) => {
  const feedback = await Feedback.find().populate('user', 'email');
  res.json({ feedback });
};

export const updateFeedback = async (req, res) => {
  const feedback = await Feedback.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!feedback) return res.status(404).json({ message: 'Feedback not found' });
  res.json(feedback);
};

export const deleteFeedback = async (req, res) => {
  const feedback = await Feedback.findByIdAndDelete(req.params.id);
  if (!feedback) return res.status(404).json({ message: 'Feedback not found' });
  res.json({ message: 'Feedback deleted' });
};