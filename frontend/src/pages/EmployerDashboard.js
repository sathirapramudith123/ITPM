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
    return <div className="container mx-auto p-4">Unauthorized access.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Employer Dashboard</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md mb-8">
        <input {...register('title', { required: 'Title is required' })} placeholder="Job Title" className="w-full p-2 border rounded" />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        <textarea {...register('description', { required: 'Description is required' })} placeholder="Description" className="w-full p-2 border rounded" />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        <input {...register('location', { required: 'Location is required' })} placeholder="Location" className="w-full p-2 border rounded" />
        {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
        <input {...register('salary', { required: 'Salary is required' })} type="number" placeholder="Salary" className="w-full p-2 border rounded" />
        {errors.salary && <p className="text-red-500 text-sm">{errors.salary.message}</p>}
        <select {...register('type', { required: 'Type is required' })} className="w-full p-2 border rounded">
          <option value="">Select Type</option>
          <option value="full-time">Full-Time</option>
          <option value="part-time">Part-Time</option>
          <option value="remote">Remote</option>
          <option value="contract">Contract</option>
          <option value="internship">Internship</option>
        </select>
        {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
        <input {...register('deadline')} type="date" className="w-full p-2 border rounded" />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600">Create Job</button>
      </form>
      <h2 className="text-xl font-bold mb-4">Your Jobs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jobs.map(job => (
          <div key={job._id} className="border p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">{job.title}</h3>
            <p>{job.location} | {job.type}</p>
            <button onClick={() => handleDelete(job._id)} className="mt-2 bg-red-500 text-white p-1 rounded hover:bg-red-600">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmployerDashboard;