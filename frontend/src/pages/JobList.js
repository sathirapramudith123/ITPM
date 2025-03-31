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

  if (loading) return <div className="container text-center py-5">Loading...</div>;

  return (
    <div className="container py-5 bg-light min-vh-100">
      <h1 className="display-5 fw-bold text-center mb-5">Job Listings</h1>
      <FilterBar onFilter={handleFilter} />
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mt-4">
        {jobs.map(job => (
          <div key={job._id} className="col">
            <JobCard job={{ ...job, id: job._id }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default JobList;