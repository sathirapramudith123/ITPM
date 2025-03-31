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

  if (loading) return <div className="container mx-auto p-4">Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Job Listings</h1>
      <FilterBar onFilter={handleFilter} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {jobs.map(job => <JobCard key={job._id} job={{ ...job, id: job._id }} />)}
      </div>
    </div>
  );
}

export default JobList;