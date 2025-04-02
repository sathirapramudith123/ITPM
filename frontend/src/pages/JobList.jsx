import React, { useState, useEffect } from 'react';
import JobCard from '../components/JobCard';
import FilterBar from '../components/FilterBar';
import { getJobs } from '../services/jobService';

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getJobs();
        setJobs(data.jobs);
      } catch (error) {
        console.error('Failed to fetch jobs', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleFilter = async (filters) => {
    try {
      const data = await getJobs(filters);
      setJobs(data.jobs);
    } catch (error) {
      console.error('Failed to filter jobs', error);
    }
  };

  if (loading) return <div className="text-center py-5">Loading...</div>;

  return (
    <div className="container mx-auto py-5 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center mb-8">Job Listings</h1>
      <FilterBar onFilter={handleFilter} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {jobs.map(job => (
          <div key={job._id} className="flex justify-center">
            <JobCard job={{ ...job, id: job._id }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default JobList;
