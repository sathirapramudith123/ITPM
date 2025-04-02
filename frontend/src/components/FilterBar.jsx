import React from 'react';
import { useForm } from 'react-hook-form';

function FilterBar({ onFilter }) {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const filters = {};
    if (data.title) filters.title = data.title;
    if (data.location) filters.location = data.location;
    if (data.salary) filters.salary = data.salary;
    if (data.type) filters.type = data.type;
    onFilter(filters);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap gap-4 p-6 bg-white rounded-xl shadow-sm mb-6 items-center">
      <input
        {...register('title')}
        placeholder="Job Title"
        aria-label="Job Title"
        className="w-full md:w-1/5 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-400 transition"
      />
      <input
        {...register('location')}
        placeholder="Location"
        aria-label="Location"
        className="w-full md:w-1/5 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-400 transition"
      />
      <input
        {...register('salary')}
        type="number"
        placeholder="Min Salary"
        aria-label="Min Salary"
        className="w-full md:w-1/5 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-400 transition"
      />
      <select
        {...register('type')}
        aria-label="Job Type"
        className="w-full md:w-1/5 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-400 transition"
      >
        <option value="">Job Type</option>
        <option value="full-time">Full-Time</option>
        <option value="part-time">Part-Time</option>
        <option value="remote">Remote</option>
        <option value="contract">Contract</option>
        <option value="internship">Internship</option>
      </select>
      <button
        type="submit"
        className="w-full md:w-auto px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
      >
        Filter
      </button>
    </form>
  );
}

export default FilterBar;
