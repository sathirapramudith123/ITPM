// src/services/resumeService.jsx
import axios from 'axios';

// Base URL for your backend API (adjust if different)
const API_URL = 'http://localhost:5000/api/resumes';

// Create an axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to every request (if authenticated)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Assumes token is stored after login
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Resume Service object with CRUD methods
const resumeService = {
  // Create a new resume
  createResume: async (resumeData) => {
    try {
      const response = await api.post('/', resumeData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error creating resume' };
    }
  },

  // Get the user's resume
  getResume: async () => {
    try {
      const response = await api.get('/');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error fetching resume' };
    }
  },

  // Update the user's resume
  updateResume: async (resumeData) => {
    try {
      const response = await api.put('/', resumeData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error updating resume' };
    }
  },

  // Delete the user's resume
  deleteResume: async () => {
    try {
      const response = await api.delete('/');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error deleting resume' };
    }
  },
};

export default resumeService;