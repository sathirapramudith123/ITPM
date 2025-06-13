import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/jobs'; 

const JobVacancyManager = ({ companies }) => {
  const [jobs, setJobs] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    companyProfile: '',
    jobType: '',
  });
  const [editIndex, setEditIndex] = useState(null);
  const [editJobId, setEditJobId] = useState(null);

  // Fetch all jobs on component mount
  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => setJobs(res.data))
      .catch((err) => console.error('Error fetching jobs:', err));
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission for create or update
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editJobId) {
      // Update existing job
      axios
        .put(`${API_URL}/${editJobId}`, formData)
        .then((res) => {
          const updatedJobs = jobs.map((job) =>
            job._id === editJobId ? res.data : job
          );
          setJobs(updatedJobs);
          setEditIndex(null);
          setEditJobId(null);
          setFormData({
            title: '',
            description: '',
            category: '',
            companyProfile: '',
            jobType: '',
          });
        })
        .catch((err) => console.error('Error updating job:', err));
    } else {
      // Create new job
      axios
        .post(API_URL, formData)
        .then((res) => {
          setJobs([...jobs, res.data]);
          setFormData({
            title: '',
            description: '',
            category: '',
            companyProfile: '',
            jobType: '',
          });
        })
        .catch((err) => console.error('Error posting job:', err));
    }
  };

  // Populate form to edit selected job
  const handleEdit = (index) => {
    const job = jobs[index];
    setFormData({
      title: job.title,
      description: job.description,
      category: job.category,
      companyProfile: job.companyProfile,
      jobType: job.jobType,
    });
    setEditIndex(index);
    setEditJobId(job._id);
  };

  // Delete job by id
  const handleDelete = (index) => {
    const jobId = jobs[index]._id;
    axios
      .delete(`${API_URL}/${jobId}`)
      .then(() => {
        setJobs(jobs.filter((_, i) => i !== index));
      })
      .catch((err) => console.error('Error deleting job:', err));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {editIndex !== null ? 'Edit Job' : 'Post New Job'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Job Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full border px-3 py-2 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="mt-1 block w-full border px-3 py-2 rounded-md shadow-sm"
            required
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 block w-full border px-3 py-2 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Company
          </label>
          <select
            name="companyProfile"
            value={formData.companyProfile}
            onChange={handleChange}
            className="mt-1 block w-full border px-3 py-2 rounded-md shadow-sm"
            required
          >
            <option value="">Select a company</option>
            {companies.map((company, idx) => (
              <option key={idx} value={company.name}>
                {company.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Job Type
          </label>
          <select
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            className="mt-1 block w-full border px-3 py-2 rounded-md shadow-sm"
            required
          >
            <option value="">Select</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Internship">Internship</option>
            <option value="Remote">Remote</option>
          </select>
        </div>
        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            {editIndex !== null ? 'Update Job' : 'Post Job'}
          </button>
        </div>
      </form>

      <div className="mt-10">
        <h3 className="text-xl font-bold mb-4">Posted Jobs</h3>
        {jobs.length === 0 ? (
          <p className="text-gray-500">No job posts yet.</p>
        ) : (
          <ul className="space-y-4">
            {jobs.map((job, index) => (
              <li
                key={job._id}
                className="p-4 border rounded-md shadow-sm bg-gray-50"
              >
                <h4 className="text-lg font-semibold">{job.title}</h4>
                <p className="text-sm text-gray-700">{job.description}</p>
                <p className="text-sm text-gray-500">Category: {job.category}</p>
                <p className="text-sm text-gray-500">
                  Company: {job.companyProfile}
                </p>
                <p className="text-sm text-gray-500">Type: {job.jobType}</p>
                <div className="mt-2 space-x-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default JobVacancyManager;
