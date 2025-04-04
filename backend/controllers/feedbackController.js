import Feedback from '../models/Feedback.js';

// Submit Feedback
export const submitFeedback = async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully', feedback });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit feedback' });
  }
};

// Fetch All Feedbacks (Admin only)
export const fetchAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch feedbacks' });
  }
};

// Fetch Feedbacks by Job ID
export const fetchFeedbacksByJobId = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ jobId: req.params.jobId });
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch feedbacks for this job' });
  }
};

// Update Feedback
export const updateFeedback = async (req, res) => {
  try {
    const updatedFeedback = await Feedback.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: 'Feedback updated successfully', updatedFeedback });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update feedback' });
  }
};

// Delete Feedback
export const deleteFeedback = async (req, res) => {
  try {
    await Feedback.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete feedback' });
  }
};
