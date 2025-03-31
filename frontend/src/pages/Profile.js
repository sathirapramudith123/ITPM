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

  if (!user) return <div className="container mx-auto p-4">Please log in to view your profile.</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <p>Email: {profile?.email}</p>
      <p>Role: {profile?.role}</p>
      <p>Name: {profile?.name || 'Not set'}</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4 max-w-md">
        <div>
          <input
            {...register('name', { required: 'Name is required' })}
            placeholder="Name"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
        <div>
          <input
            type="file"
            {...register('resume')}
            className="w-full p-2 border rounded"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600">Update Profile</button>
      </form>
    </div>
  );
}

export default Profile;