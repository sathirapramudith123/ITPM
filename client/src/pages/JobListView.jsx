import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JobListView = ({ companies }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async (term = '') => {
    try {
      const res = await axios.get('http://localhost:5000/api/jobs', {
        params: { search: term }
      });
      setJobs(res.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    fetchJobs(term);
  };

  const getCompanyName = (companyId) => {
    const company = companies.find((c) => c.id === companyId);
    return company ? company.name : 'Unknown';
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Job Listings</h1>

      <input
        type="text"
        placeholder="Search by title or category"
        value={searchTerm}
        onChange={handleSearch}
        className="w-full mb-6 p-3 border rounded-md shadow-sm"
      />

      {jobs.length === 0 ? (
        <p className="text-gray-500 text-center">No jobs found.</p>
      ) : (
        <ul className="space-y-4">
          {jobs.map((job) => (
            <li
              key={job._id}
              className="p-4 border rounded-lg shadow-md bg-white"
            >
              <h2 className="text-xl font-semibold text-blue-700">
                {job.title}
              </h2>
              <p className="text-gray-700">{job.description}</p>
              <p className="text-sm text-gray-500">Category: {job.category}</p>
              <p className="text-sm text-gray-500">
                Company: {getCompanyName(job.companyId)}
              </p>
              <p className="text-sm text-gray-500">Type: {job.jobType}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JobListView;
