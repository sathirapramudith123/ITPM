import React from 'react';
import { useForm } from 'react-hook-form';

function FilterBar({ onFilter }) {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    onFilter(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex space-x-4 p-4 bg-gray-100 rounded-lg">
      <input {...register('title')} placeholder="Job Title" className="p-2 border rounded" />
      <input {...register('location')} placeholder="Location" className="p-2 border rounded" />
      <input {...register('salary')} placeholder="Min Salary" type="number" className="p-2 border rounded" />
      <select {...register('type')} className="p-2 border rounded">
        <option value="">Job Type</option>
        <option value="full-time">Full-Time</option>
        <option value="part-time">Part-Time</option>
        <option value="remote">Remote</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Filter</button>
    </form>
  );
}

export default FilterBar;