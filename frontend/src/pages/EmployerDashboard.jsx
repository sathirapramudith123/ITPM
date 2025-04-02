import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../context/AuthContext';
import { createJob, getJobs, deleteJob } from '../services/jobService';

function EmployerDashboard() {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getJobs();
        setJobs(data.jobs.filter(job => job.employer._id === user._id));
      } catch (error) {
        console.error('Failed to fetch jobs', error);
      }
    };
    if (user && user.role === 'employer') fetchJobs();
  }, [user]);

  const onSubmit = async (data) => {
    try {
      const newJob = await createJob(data);
      setJobs([...jobs, newJob]);
      alert('Job created!');
    } catch (error) {
      console.error('Failed to create job', error);
      alert('Failed to create job');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteJob(id);
      setJobs(jobs.filter(job => job._id !== id));
      alert('Job deleted!');
    } catch (error) {
      console.error('Failed to delete job', error);
      alert('Failed to delete job');
    }
  };

  if (!user || user.role !== 'employer') {
    return <div className="mx-auto p-4 text-center">Unauthorized access.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Employer Dashboard</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg mx-auto mb-8">
        <div>
          <input
            {...register('title', { required: 'Title is required' })}
            placeholder="Job Title"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>
        
        <div>
          <textarea
            {...register('description', { required: 'Description is required' })}
            placeholder="Description"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        <div>
          <input
            {...register('location', { required: 'Location is required' })}
            placeholder="Location"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
        </div>

        <div>
          <input
            {...register('salary', { required: 'Salary is required' })}
            type="number"
            placeholder="Salary"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.salary && <p className="text-red-500 text-sm">{errors.salary.message}</p>}
        </div>

        <div>
          <select
            {...register('type', { required: 'Type is required' })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Type</option>
            <option value="full-time">Full-Time</option>
            <option value="part-time">Part-Time</option>
            <option value="remote">Remote</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
          </select>
          {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
        </div>

        <div>
          <input
            {...register('deadline')}
            type="date"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Create Job
        </button>
      </form>

      <h2 className="text-xl font-bold mb-4">Your Jobs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobs.map(job => (
          <div key={job._id} className="border p-6 rounded-lg shadow-md bg-white">
            <h3 className="text-lg font-bold mb-2">{job.title}</h3>
            <p className="text-gray-600">{job.location} | {job.type}</p>
            <button
              onClick={() => handleDelete(job._id)}
              className="mt-4 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmployerDashboard;
