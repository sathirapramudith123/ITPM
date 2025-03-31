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
    <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-wrap gap-3 p-3 bg-white rounded shadow-sm mb-4">
      <input
        {...register('title')}
        placeholder="Job Title"
        className="form-control flex-grow-1"
        style={{ minWidth: '150px' }}
      />
      <input
        {...register('location')}
        placeholder="Location"
        className="form-control flex-grow-1"
        style={{ minWidth: '150px' }}
      />
      <input
        {...register('salary')}
        type="number"
        placeholder="Min Salary"
        className="form-control flex-grow-1"
        style={{ minWidth: '150px' }}
      />
      <select {...register('type')} className="form-select flex-grow-1" style={{ minWidth: '150px' }}>
        <option value="">Job Type</option>
        <option value="full-time">Full-Time</option>
        <option value="part-time">Part-Time</option>
        <option value="remote">Remote</option>
        <option value="contract">Contract</option>
        <option value="internship">Internship</option>
      </select>
      <button type="submit" className="btn btn-primary">Filter</button>
    </form>
  );
}

export default FilterBar;