import axios from 'axios';

const API_URL = 'http://localhost:5000/api/admin';

// Create a new job category
export const createCategory = async (categoryData) => {
  const response = await axios.post(`${API_URL}/categories`, categoryData, { withCredentials: true });
  return response.data;
};

// Get all categories
export const getCategories = async () => {
  const response = await axios.get(`${API_URL}/categories`, { withCredentials: true });
  return response.data;
};

// Update a category
export const updateCategory = async (id, categoryData) => {
  const response = await axios.put(`${API_URL}/categories/${id}`, categoryData, { withCredentials: true });
  return response.data;
};

// Delete a category
export const deleteCategory = async (id) => {
  const response = await axios.delete(`${API_URL}/categories/${id}`, { withCredentials: true });
  return response.data;
};

// Get analytics (users, jobs, feedback)
export const getAnalytics = async () => {
  const response = await axios.get(`${API_URL}/analytics`, { withCredentials: true });
  return response.data;
};