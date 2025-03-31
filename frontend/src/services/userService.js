import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

// Update user profile (e.g., upload resume)
export const updateProfile = async (profileData) => {
  const response = await axios.put(`${API_URL}/profile`, profileData, {
    withCredentials: true,
    headers: { 'Content-Type': 'multipart/form-data' } // For file uploads
  });
  return response.data;
};

// Get personalized job recommendations
export const getJobRecommendations = async () => {
  const response = await axios.get(`${API_URL}/recommendations`, { withCredentials: true });
  return response.data;
};