import axios from 'axios';

const API_URL = 'http://localhost:5000/api/feedback';

// Submit Feedback (Create)
export const submitFeedback = async (feedbackData) => {
  const response = await axios.post(API_URL, feedbackData, { withCredentials: true });
  return response.data;
};

// Fetch Feedbacks by Job ID (Read)
export const fetchFeedbacksByJobId = async (jobId) => {
  const response = await axios.get(`${API_URL}/job/${jobId}`);
  return response.data;
};

// Update Feedback (Update)
export const updateFeedback = async (id, feedbackData) => {
  const response = await axios.put(`${API_URL}/${id}`, feedbackData, { withCredentials: true });
  return response.data;
};

// Delete Feedback (Delete)
export const deleteFeedback = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, { withCredentials: true });
  return response.data;
};

// Fetch All Feedbacks (For Admin or Analytics Purposes)
export const fetchAllFeedbacks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
