import React from 'react';
import { Link } from 'react-router-dom';

function JobCard({ job }) {
  return (
    <div className="border p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-bold">{job.title}</h3>
      <p>{job.location} | {job.type}</p>
      <p className="text-gray-600">${job.salary}</p>
      <Link to={`/jobs/${job.id}`} className="text-blue-500 hover:underline">View Details</Link>
    </div>
  );
}

export default JobCard;