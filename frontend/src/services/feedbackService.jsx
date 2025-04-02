import axios from 'axios';

const API_URL = 'http://localhost:5000/api/feedback';

// Submit feedback
export const submitFeedback = async (feedbackData) => {
  const response = await axios.post(API_URL, feedbackData, { withCredentials: true });
  return response.data;
};

// Get all feedback (admin/employer view)
export const getFeedback = async () => {
  const response = await axios.get(API_URL, { withCredentials: true });
  return response.data;
};

// Update feedback (admin only)
export const updateFeedback = async (id, feedbackData) => {
  const response = await axios.put(`${API_URL}/${id}`, feedbackData, { withCredentials: true });
  return response.data;
};

// Delete feedback (admin only)
export const deleteFeedback = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, { withCredentials: true });
  return response.data;
};