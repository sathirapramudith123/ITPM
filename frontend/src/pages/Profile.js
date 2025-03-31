import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../context/AuthContext';
import { updateProfile } from '../services/userService';

function Profile() {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (user) {
      setProfile({ email: user.email, role: user.role, name: user.profile?.name });
    }
  }, [user]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    if (data.resume[0]) formData.append('resume', data.resume[0]);

    try {
      const updatedUser = await updateProfile(formData);
      setProfile({ ...profile, name: updatedUser.profile.name });
      alert('Profile updated!');
    } catch (error) {
      console.error('Failed to update profile', error);
      alert('Failed to update profile');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300">
        <div className="p-6 bg-white rounded-lg shadow-lg text-center transform transition duration-500 hover:scale-105">
          <h2 className="text-xl font-semibold text-gray-700">Please log in to view your profile.</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-6">
      <div className="bg-white max-w-lg w-full rounded-xl shadow-2xl p-8 transform transition-all duration-500 hover:shadow-3xl">
        <h1 className="text-3xl font-extrabold text-center text-indigo-600 mb-6 animate-fade-in">
          Your Profile
        </h1>

        {/* Profile Info */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg shadow-sm">
            <span className="text-indigo-500 font-medium">Email:</span>
            <p className="text-gray-700">{profile?.email}</p>
          </div>
          <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg shadow-sm">
            <span className="text-indigo-500 font-medium">Role:</span>
            <p className="text-gray-700 capitalize">{profile?.role}</p>
          </div>
          <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg shadow-sm">
            <span className="text-indigo-500 font-medium">Name:</span>
            <p className="text-gray-700">{profile?.name || 'Not set'}</p>
          </div>
        </div>

        {/* Update Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="relative">
            <input
              {...register('name', { required: 'Name is required' })}
              placeholder="Update your name"
              className="w-full p-4 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1 animate-slide-in">{errors.name.message}</p>
            )}
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-600 mb-1">Upload Resume</label>
            <input
              type="file"
              {...register('resume')}
              className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition-all duration-300"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-300 transform hover:-translate-y-1"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;