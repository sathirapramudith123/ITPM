import axios from 'axios';

const API_URL = 'http://localhost:5000/api/feedback';

export const submitFeedback = async (feedbackData) => {
  const response = await axios.post(API_URL, feedbackData, { withCredentials: true });
  return response.data;
};

export const fetchFeedbacksByJobId = async (jobId) => {
  const response = await axios.get(`${API_URL}/feedbacks/job/${jobId}`);
  return response.data;
};

export const updateFeedback = async (id, feedbackData) => {
  const response = await axios.put(`${API_URL}/${id}`, feedbackData, { withCredentials: true });
  return response.data;
};

export const deleteFeedback = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, { withCredentials: true });
  return response.data;
};
