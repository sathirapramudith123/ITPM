import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    avatar: '',
    preferences: '',
    address: ''
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [avatarPreview, setAvatarPreview] = useState(userData.avatar || '');
  const [editMode, setEditMode] = useState(false);

  const token = localStorage.getItem('token');
  const decoded = token ? JSON.parse(atob(token.split('.')[1])) : null;
  const userId = decoded?.id;

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUserData(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setMessage('Failed to load profile');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserData({ ...userData, avatar: file });
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('username', userData.username);
      formDataToSend.append('address', userData.address);
      formDataToSend.append('preferences', userData.preferences);
      if (userData.avatar instanceof File) {
        formDataToSend.append('avatar', userData.avatar);
      }
      const res = await axios.put(`http://localhost:5000/api/users/${userId}`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Profile updated successfully!');
      if (res.data.avatar) setAvatarPreview(res.data.avatar);
    } catch (error) {
      console.error(error);
      setMessage('Profile update failed.');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete your profile? This action cannot be undone.')) return;
    setMessage('');
    try {
      await axios.delete(`http://localhost:5000/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('Profile deleted. Logging out...');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    } catch (error) {
      console.error(error);
      setMessage('Failed to delete profile.');
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      {message && <p className="mb-4 text-blue-600">{message}</p>}
      <button
        className="mb-4 px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
        onClick={() => setEditMode((prev) => !prev)}
      >
        {editMode ? 'View Profile' : 'Edit Profile'}
      </button>
      {editMode ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col items-center mb-4">
            {avatarPreview && (
              <img
                src={avatarPreview}
                alt="Avatar Preview"
                className="w-24 h-24 rounded-full object-cover mb-2 border"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="username"
              value={userData.username}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              disabled
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={userData.address}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-gray-700">Preferences</label>
            <input
              type="text"
              name="preferences"
              value={userData.preferences}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Update Profile
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="ml-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Delete Profile
          </button>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="flex flex-col items-center mb-4">
            {userData.avatar && (
              <img
                src={userData.avatar.startsWith('http') ? userData.avatar : `${window.location.origin}${userData.avatar}`}
                alt="Avatar"
                className="w-24 h-24 rounded-full object-cover mb-2 border"
              />
            )}
          </div>
          <div>
            <span className="block text-gray-700 font-semibold">Name:</span>
            <span>{userData.username}</span>
          </div>
          <div>
            <span className="block text-gray-700 font-semibold">Email:</span>
            <span>{userData.email}</span>
          </div>
          <div>
            <span className="block text-gray-700 font-semibold">Address:</span>
            <span>{userData.address}</span>
          </div>
          <div>
            <span className="block text-gray-700 font-semibold">Preferences:</span>
            <span>{userData.preferences}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
