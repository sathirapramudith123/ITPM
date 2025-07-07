import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Applicants = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/jobs/applied', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAppliedJobs(res.data);
      } catch (err) {
        setError('Failed to fetch applied jobs.');
      } finally {
        setLoading(false);
      }
    };
    fetchAppliedJobs();
  }, []);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Jobs You've Applied To</h2>
      {appliedJobs.length === 0 ? (
        <p className="text-gray-600">You haven't applied to any jobs yet.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {appliedJobs.map((job) => (
            <li key={job._id} className="py-4">
              <div className="flex flex-col">
                <span className="font-semibold text-lg">{job.title}</span>
                <span className="text-gray-600">{job.companyName}</span>
                {job.jobType && (
                  <span className="text-gray-500 text-sm">Type: {job.jobType}</span>
                )}
                {job.category && (
                  <span className="text-gray-500 text-sm">Category: {job.category}</span>
                )}
                <span className="text-gray-500 text-sm">Applied on: {job.appliedAt ? new Date(job.appliedAt).toLocaleDateString() : '-'}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Applicants;
