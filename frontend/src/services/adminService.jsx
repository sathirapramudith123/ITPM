import axios from 'axios';

const API_URL = 'http://localhost:5000/api/admin';

export const createCategory = async (categoryData) => {
  const response = await axios.post(`${API_URL}/categories`, categoryData, { withCredentials: true });
  return response.data;
};

export const getCategories = async () => {
  const response = await axios.get(`${API_URL}/categories`, { withCredentials: true });
  return response.data;
};

export const updateCategory = async (id, categoryData) => {
  const response = await axios.put(`${API_URL}/categories/${id}`, categoryData, { withCredentials: true });
  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await axios.delete(`${API_URL}/categories/${id}`, { withCredentials: true });
  return response.data;
};

export const getAnalytics = async () => {
  const response = await axios.get(`${API_URL}/analytics`, { withCredentials: true });
  return response.data;
};

export const getUsers = async () => {
  const response = await axios.get(`${API_URL}/users`, { withCredentials: true });
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await axios.delete(`${API_URL}/users/${id}`, { withCredentials: true });
  return response.data;
};