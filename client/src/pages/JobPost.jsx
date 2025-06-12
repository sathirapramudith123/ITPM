import React, { useState } from 'react';

const JobVacancyManager = ({ jobs, setJobs }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    companyProfile: '',
    jobType: '',
  });
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedJobs = [...jobs];
      updatedJobs[editIndex] = formData;
      setJobs(updatedJobs);
      setEditIndex(null);
    } else {
      setJobs([...jobs, formData]);
    }
    setFormData({
      title: '',
      description: '',
      category: '',
      companyProfile: '',
      jobType: '',
    });
  };

  const handleEdit = (index) => {
    setFormData(jobs[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setJobs(jobs.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {editIndex !== null ? 'Edit Job' : 'Post New Job'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Job Title</label>
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
          <label className="block text-sm font-medium text-gray-700">Description</label>
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
          <label className="block text-sm font-medium text-gray-700">Category</label>
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
          <label className="block text-sm font-medium text-gray-700">Company Profile</label>
          <input
            type="text"
            name="companyProfile"
            value={formData.companyProfile}
            onChange={handleChange}
            className="mt-1 block w-full border px-3 py-2 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Job Type</label>
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
              <li key={index} className="p-4 border rounded-md shadow-sm bg-gray-50">
                <h4 className="text-lg font-semibold">{job.title}</h4>
                <p className="text-sm text-gray-700">{job.description}</p>
                <p className="text-sm text-gray-500">Category: {job.category}</p>
                <p className="text-sm text-gray-500">Company: {job.companyProfile}</p>
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
