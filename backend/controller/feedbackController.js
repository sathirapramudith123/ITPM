import Feedback from '../models/Feedback.js';

export const submitFeedback = async (req, res) => {
  try {
    const { rating, comment, suggestion } = req.body;
    
    const feedback = new Feedback({
      userId: req.user._id,
      rating,
      comment,
      suggestion
    });

    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully', feedback });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting feedback', error: error.message });
  }
};

export const getAllFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find()
      .populate('userId', 'username email')
      .sort({ createdAt: -1 });
    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching feedback', error: error.message });
  }
};

export const updateFeedbackStatus = async (req, res) => {
  try {
    const { feedbackId } = req.params;
    const { status, adminResponse } = req.body;

    const feedback = await Feedback.findByIdAndUpdate(
      feedbackId,
      { status, adminResponse, updatedAt: Date.now() },
      { new: true }
    );

    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    res.status(200).json({ message: 'Feedback status updated', feedback });
  } catch (error) {
    res.status(500).json({ message: 'Error updating feedback', error: error.message });
  }
};

export const analyzeFeedback = async (req, res) => {
  try {
    const keywords = await Feedback.aggregate([
      {
        $project: {
          words: {
            $split: [
              { $concat: ['$comment', ' ', '$suggestion'] },
              ' '
            ]
          }
        }
      },
      { $unwind: '$words' },
      {
        $group: {
          _id: '$words',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    res.status(200).json({ keywords });
  } catch (error) {
    res.status(500).json({ message: 'Error analyzing feedback', error: error.message });
  }
};