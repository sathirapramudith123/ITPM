import React, { useState } from 'react';
import PropTypes from 'prop-types';

const JobForm = ({ onSubmit, initialData = {}, categories = [], loading = false }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    description: initialData.description || '',
    salary: initialData.salary || '',
    location: initialData.location || '',
    category: initialData.category?._id || '',
    jobType: initialData.jobType || 'full-time',
    requirements: initialData.requirements?.join(', ') || '',
    deadline: initialData.deadline || '',
  });

  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      setError('Job title is required');
      return false;
    }
    if (!formData.category) {
      setError('Category is required');
      return false;
    }
    if (formData.deadline && new Date(formData.deadline) < new Date()) {
      setError('Deadline must be in the future');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    if (!validateForm()) return;

    setSubmitLoading(true);
    
    try {
      const dataToSubmit = {
        ...formData,
        salary: Number(formData.salary),
        requirements: formData.requirements.split(',').map(req => req.trim()),
        deadline: new Date(formData.deadline).toISOString()
      };
      
      await onSubmit(dataToSubmit);
    } catch (err) {
      setError(err.message || 'Failed to submit job');
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-2 mb-4 text-red-700 bg-red-100 rounded">
          {error}
        </div>
      )}

      <div>
        <label className="block mb-1 font-medium">Job Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          rows={4}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Salary</label>
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
            min="0"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
      </div>

      <div>
        <label className="block mb-1 font-medium">Category</label>
        {loading ? (
          <select className="w-full p-2 border rounded bg-gray-100 animate-pulse" disabled>
            <option>Loading categories...</option>
          </select>
        ) : (
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">Job Type</label>
        <select
          name="jobType"
          value={formData.jobType}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="full-time">Full-Time</option>
          <option value="part-time">Part-Time</option>
          <option value="contract">Contract</option>
          <option value="remote">Remote</option>
          <option value="internship">Internship</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">Requirements (comma separated)</label>
        <input
          type="text"
          name="requirements"
          value={formData.requirements}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
          placeholder="e.g. 5+ years experience, React, Node.js"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Deadline</label>
        <input
          type="date"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
          min={new Date().toISOString().split('T')[0]}
        />
      </div>

      <button
        type="submit"
        disabled={submitLoading}
        className={`w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition ${
          submitLoading ? 'opacity-70 cursor-not-allowed' : ''
        }`}
      >
        {submitLoading ? 'Processing...' : (initialData._id ? 'Update Job' : 'Post Job')}
      </button>
    </form>
  );
};

JobForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.object,
  categories: PropTypes.array,
  loading: PropTypes.bool,
};

export default JobForm;