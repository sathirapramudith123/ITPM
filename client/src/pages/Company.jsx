import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CompanyManager = () => {
  const [companies, setCompanies] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    description: '',
    location: '',
    website: '',
  });
  const [editId, setEditId] = useState(null); // store id of company being edited

  const industryOptions = [
    'Technology', 'Healthcare', 'Finance', 'Education',
    'Retail', 'Manufacturing', 'Construction', 'Transportation', 'Hospitality'
  ];

  // Fetch companies on component mount
  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/companies');
      setCompanies(res.data);
    } catch (error) {
      console.error('Failed to fetch companies', error);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        // Update existing company
        await axios.put(`http://localhost:5000/api/companies/${editId}`, formData);
      } else {
        // Add new company
        await axios.post('http://localhost:5000/api/companies/', formData);
      }
      // Refresh companies list after update/add
      fetchCompanies();
      setFormData({ name: '', industry: '', description: '', location: '', website: '' });
      setEditId(null);
    } catch (error) {
      console.error('Failed to save company', error);
    }
  };

  const handleEdit = (company) => {
    setFormData({
      name: company.name,
      industry: company.industry,
      description: company.description,
      location: company.location,
      website: company.website,
    });
    setEditId(company._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/companies/${id}`);
      fetchCompanies();
    } catch (error) {
      console.error('Failed to delete company', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {editId ? 'Edit Company' : 'Add New Company'}
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
            {editId ? 'Update Company' : 'Add Company'}
          </button>
        </div>
      </form>

      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Companies List</h3>
        {companies.length === 0 ? (
          <p className="text-gray-500">No companies added yet.</p>
        ) : (
          <ul className="space-y-4">
            {companies.map((company) => (
              <li key={company._id} className="p-4 border rounded-md shadow-sm bg-gray-50">
                <h4 className="text-lg font-semibold">{company.name}</h4>
                <p className="text-sm text-gray-600">Industry: {company.industry}</p>
                <p className="text-sm text-gray-600">Location: {company.location}</p>
                <p className="text-sm text-gray-600">
                  Website: <a href={company.website} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">{company.website}</a>
                </p>
                <p className="text-sm text-gray-600 mt-1">{company.description}</p>
                <div className="mt-2 space-x-2">
                  <button
                    onClick={() => handleEdit(company)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(company._id)}
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
