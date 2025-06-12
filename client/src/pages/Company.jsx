import React, { useState } from 'react';

const CompanyManager = ({ companies, setCompanies }) => {
  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    description: '',
    location: '',
    website: '',
  });
  const [editIndex, setEditIndex] = useState(null);

  const industryOptions = [
    'Technology', 'Healthcare', 'Finance', 'Education',
    'Retail', 'Manufacturing', 'Construction', 'Transportation', 'Hospitality'
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updated = [...companies];
      updated[editIndex] = formData;
      setCompanies(updated);
      setEditIndex(null);
    } else {
      setCompanies([...companies, formData]);
    }
    setFormData({ name: '', industry: '', description: '', location: '', website: '' });
  };

  const handleEdit = (index) => {
    setFormData(companies[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setCompanies(companies.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {editIndex !== null ? 'Edit Company' : 'Add New Company'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Company Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Industry</label>
          <select
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 border rounded-md"
            required
          >
            <option value="" disabled>Select industry</option>
            {industryOptions.map((industry, index) => (
              <option key={index} value={industry}>{industry}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="mt-1 w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Website</label>
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            {editIndex !== null ? 'Update Company' : 'Add Company'}
          </button>
        </div>
      </form>

      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Companies List</h3>
        {companies.length === 0 ? (
          <p className="text-gray-500">No companies added yet.</p>
        ) : (
          <ul className="space-y-4">
            {companies.map((company, index) => (
              <li key={index} className="p-4 border rounded-md shadow-sm bg-gray-50">
                <h4 className="text-lg font-semibold">{company.name}</h4>
                <p className="text-sm text-gray-600">Industry: {company.industry}</p>
                <p className="text-sm text-gray-600">Location: {company.location}</p>
                <p className="text-sm text-gray-600">Website: <a href={company.website} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">{company.website}</a></p>
                <p className="text-sm text-gray-600 mt-1">{company.description}</p>
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

export default CompanyManager;
