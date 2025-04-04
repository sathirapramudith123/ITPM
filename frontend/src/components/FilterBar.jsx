import React from 'react';
import { useForm } from 'react-hook-form';
import { FiSearch, FiX, FiDollarSign, FiMapPin, FiBriefcase } from 'react-icons/fi';

function FilterBar({ onFilter, onReset }) {
  const { register, handleSubmit, reset, watch } = useForm();
  const hasFilters = watch(['title', 'location', 'salary', 'type']).some(Boolean);

  const onSubmit = (data) => {
    const filters = {};
    if (data.title) filters.title = data.title;
    if (data.location) filters.location = data.location;
    if (data.salary) filters.salary = data.salary;
    if (data.type) filters.type = data.type;
    onFilter(filters);
  };

  const handleReset = () => {
    reset();
    onReset();
  };

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
        {/* Job Title */}
        <div className="md:col-span-3">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Job Title
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              id="title"
              {...register('title')}
              placeholder="Software Engineer"
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition"
            />
          </div>
        </div>

        {/* Location */}
        <div className="md:col-span-3">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiMapPin className="text-gray-400" />
            </div>
            <input
              id="location"
              {...register('location')}
              placeholder="New York"
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition"
            />
          </div>
        </div>

        {/* Salary */}
        <div className="md:col-span-2">
          <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">
            Min Salary ($)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiDollarSign className="text-gray-400" />
            </div>
            <input
              id="salary"
              {...register('salary')}
              type="number"
              placeholder="50000"
              min="0"
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition"
            />
          </div>
        </div>

        {/* Job Type */}
        <div className="md:col-span-2">
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
            Job Type
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiBriefcase className="text-gray-400" />
            </div>
            <select
              id="type"
              {...register('type')}
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition appearance-none bg-white"
            >
              <option value="">All Types</option>
              <option value="full-time">Full-Time</option>
              <option value="part-time">Part-Time</option>
              <option value="remote">Remote</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="md:col-span-2 flex space-x-2">
          <button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-md shadow-sm transition flex items-center justify-center"
          >
            <FiSearch className="mr-2" />
            Filter
          </button>
          {hasFilters && (
            <button
              type="button"
              onClick={handleReset}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2.5 px-4 rounded-md shadow-sm transition flex items-center justify-center"
            >
              <FiX className="mr-2" />
              Reset
            </button>
          )}
        </div>
      </div>
    </form>
  );
}

export default FilterBar;