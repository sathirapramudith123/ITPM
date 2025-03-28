import axios from "axios";

// Create a configured Axios instance
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// Add token interceptor
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Export named methods
export const get = instance.get;
export const post = instance.post;

// Optionally, keep the default export if other components need it
export default instance;