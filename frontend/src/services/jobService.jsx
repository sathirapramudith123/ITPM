import axios from 'axios';

const API_URL = 'http://localhost:5000/api/jobs';

export const createJob = async (jobData) => {
  const response = await axios.post(API_URL, jobData, { withCredentials: true });
  return response.data;
};

export const getJobs = async (filters = {}) => {
  const query = new URLSearchParams(filters).toString();
  const response = await axios.get(`${API_URL}?${query}`, { withCredentials: true });
  return response.data;
};

export const getJobById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`, { withCredentials: true });
  return response.data;
};

export const updateJob = async (id, jobData) => {
  const response = await axios.put(`${API_URL}/${id}`, jobData, { withCredentials: true });
  return response.data;
};

export const deleteJob = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, { withCredentials: true });
  return response.data;
};

export const applyToJob = async (id) => {
  const response = await axios.post(`${API_URL}/${id}/apply`, null, { withCredentials: true });
  return response.data;
};