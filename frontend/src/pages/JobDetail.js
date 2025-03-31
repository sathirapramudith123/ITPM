import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getJobById, applyToJob } from '../services/jobService';

function JobDetail() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const data = await getJobById(id);
        setJob(data);
      } catch (error) {
        console.error('Failed to fetch job', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleApply = async () => {
    if (!user) {
      alert('Please log in to apply');
      return;
    }
    try {
      await applyToJob(id);
      alert('Application submitted!');
    } catch (error) {
      console.error('Failed to apply', error);
      alert('Failed to apply');
    }
  };

  if (loading) return <div className="container mx-auto p-4">Loading...</div>;
  if (!job) return <div className="container mx-auto p-4">Job not found</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{job.title}</h1>
      <p className="text-gray-600">{job.location} | {job.type}</p>
      <p className="text-gray-800">${job.salary}</p>
      <p className="mt-4">{job.description}</p>
      {user && user.role === 'job_seeker' && (
        <button
          onClick={handleApply}
          className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Apply Now
        </button>
      )}
    </div>
  );
}

export default JobDetail;