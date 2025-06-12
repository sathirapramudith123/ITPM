import React, { useState } from 'react';

const JobListView = ({ jobs, companies }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const getCompanyName = (companyId) => {
    const company = companies.find((c) => c.id === companyId);
    return company ? company.name : 'Unknown';
  };

  const filteredJobs = jobs.filter((job) => {
    const companyName = getCompanyName(job.companyId).toLowerCase();
    return (
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      companyName.includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Job Listings</h1>

      <input
        type="text"
        placeholder="Search by title, category, or company"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full mb-6 p-3 border rounded-md shadow-sm"
      />

      {filteredJobs.length === 0 ? (
        <p className="text-gray-500 text-center">No jobs found.</p>
      ) : (
        <ul className="space-y-4">
          {filteredJobs.map((job, index) => (
            <li
              key={index}
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
