import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const register = async (data) => {
  const response = await axios.post(`${API_URL}/register`, data, { withCredentials: true });
  return response.data;
};

export const login = async (data) => {
  const response = await axios.post(`${API_URL}/login`, data, { withCredentials: true });
  return response.data;
};

export const logout = async () => {
  const response = await axios.post(`${API_URL}/logout`, null, { withCredentials: true });
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await axios.get(`${API_URL}/me`, { withCredentials: true });
  return response.data;
};