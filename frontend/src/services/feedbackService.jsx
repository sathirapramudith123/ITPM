import axios from 'axios';

const API_URL = 'http://localhost:5000/api/feedback';

// Submit Feedback (Create)
export const submitFeedback = async (feedbackData) => {
  try {
    const response = await axios.post(API_URL, feedbackData, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Error submitting feedback:", error.message || error);
    throw error; // Rethrow to handle it in the component
  }
};

// Fetch Feedbacks by Job ID (Read)
export const fetchFeedbacksByJobId = async (jobId) => {
  try {
    const response = await axios.get(`${API_URL}/job/${jobId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    throw error;
  }
};

// Update Feedback (Update)
export const updateFeedback = async (id, feedbackData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, feedbackData, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Error updating feedback:", error);
    throw error;
  }
};

// Delete Feedback (Delete)
export const deleteFeedback = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Error deleting feedback:", error);
    throw error;
  }
};

// Fetch All Feedbacks (For Admin or Analytics Purposes)
export const fetchAllFeedbacks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching all feedbacks:", error);
    throw error;
  }
};
