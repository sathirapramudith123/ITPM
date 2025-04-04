import Feedback from '../models/Feedback.js';

// Submit Feedback
export const submitFeedback = async (req, res) => {
  try {
    const { comment, rating, jobId } = req.body;
    const userId = req.user._id; // Extracted from auth middleware

    if (!comment || !rating || !jobId) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const feedback = new Feedback({ userId, comment, rating, jobId });
    await feedback.save();
    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit feedback', error: error.message });
  }
};

// Get Feedback for a Specific Job
export const getFeedbackByJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const feedback = await Feedback.find({ jobId }).populate('userId', 'email');
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve feedback', error: error.message });
  }
};

// Update Feedback
export const updateFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const feedback = await Feedback.findByIdAndUpdate(id, req.body, { new: true });

    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update feedback', error: error.message });
  }
};

// Delete Feedback
export const deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const feedback = await Feedback.findByIdAndDelete(id);

    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    res.json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete feedback', error: error.message });
  }
};
