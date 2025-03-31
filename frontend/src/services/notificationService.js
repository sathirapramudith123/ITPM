import axios from 'axios';

const API_URL = 'http://localhost:5000/api/notifications';

// Get user's notifications
export const getNotifications = async () => {
  const response = await axios.get(API_URL, { withCredentials: true });
  return response.data;
};

// Mark a notification as read
export const markNotificationAsRead = async (id) => {
  const response = await axios.put(`${API_URL}/${id}/read`, null, { withCredentials: true });
  return response.data;
};