import React from 'react';
import { Link } from 'react-router-dom';

function JobCard({ job }) {
  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body">
        <h5 className="card-title fw-bold text-dark">{job.title}</h5>
        <p className="card-text text-muted">{job.location} | {job.type}</p>
        <p className="card-text text-success fw-medium">${job.salary}</p>
        <Link to={`/jobs/${job.id}`} className="btn btn-primary">View Details</Link>
      </div>
    </div>
  );
}

export default JobCard;