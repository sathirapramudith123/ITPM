import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../context/AuthContext';
import { createJob, getJobs, deleteJob, updateJob } from '../services/jobService';
import { getCategories } from '../services/adminService';

function EmployerDashboard() {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
  const [jobs, setJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [jobsData, categoriesData] = await Promise.all([
          getJobs({ employer: user._id }),
          getCategories()
        ]);
        setJobs(jobsData.jobs.filter(job => job.employer._id === user._id));
        setCategories(categoriesData.categories);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch data', error);
        setError('Failed to load dashboard data');
        setLoading(false);
      }
    };
    if (user && user.role === 'employer') fetchData();
  }, [user]);

  const onSubmit = async (data) => {
    setActionLoading(true);
    setError(null);
    try {
      if (editingJob) {
        const updatedJob = await updateJob(editingJob._id, data);
        setJobs(jobs.map(job => job._id === editingJob._id ? updatedJob : job));
        setEditingJob(null);
        alert('Job updated successfully!');
      } else {
        const newJob = await createJob({ ...data, employer: user._id });
        setJobs([...jobs, newJob]);
        alert('Job created successfully!');
      }
      reset();
    } catch (error) {
      console.error('Failed to process job', error);
      setError(editingJob ? 'Failed to update job' : 'Failed to create job');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      setError(null);
      try {
        await deleteJob(id);
        setJobs(jobs.filter(job => job._id !== id));
        alert('Job deleted successfully!');
      } catch (error) {
        console.error('Failed to delete job', error);
        setError('Failed to delete job');
      }
    }
  };

  const handleEdit = (job) => {
    setEditingJob(job);
    setValue('title', job.title);
    setValue('description', job.description);
    setValue('location', job.location);
    setValue('salary', job.salary);
    setValue('type', job.type);
    setValue('category', job.category);
    setValue('deadline', job.deadline ? job.deadline.split('T')[0] : '');
  };

  if (!user || user.role !== 'employer') {
    return <div className="mx-auto p-4 text-center">Unauthorized access.</div>;
  }

  if (loading) {
    return <div className="mx-auto p-4 text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Employer Dashboard</h1>

      {/* Error Display */}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* Job Creation/Update Form */}
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
          <select
            {...register('category', { required: 'Category is required' })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
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
            {...register('salary', { required: 'Salary is required', valueAsNumber: true })}
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

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={actionLoading}
            className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300"
          >
            {actionLoading ? 'Processing...' : editingJob ? 'Update Job' : 'Create Job'}
          </button>
          {editingJob && (
            <button
              type="button"
              onClick={() => {
                setEditingJob(null);
                reset();
              }}
              className="w-full p-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Job Listings */}
      <h2 className="text-xl font-bold mb-4">Your Jobs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobs.map(job => (
          <div key={job._id} className="border p-6 rounded-lg shadow-md bg-white">
            <h3 className="text-lg font-bold mb-2">{job.title}</h3>
            <p className="text-gray-600">
              {job.location} | {job.type} | {categories.find(cat => cat._id === job.category)?.name || 'Uncategorized'}
            </p>
            <p className="text-gray-600">Salary: ${job.salary}</p>
            <p className="text-gray-600">
              Deadline: {job.deadline ? new Date(job.deadline).toLocaleDateString() : 'N/A'}
            </p>
            <div className="mt-4 space-x-2">
              <button
                onClick={() => handleEdit(job)}
                className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(job._id)}
                className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmployerDashboard;