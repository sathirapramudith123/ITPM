import React, { useEffect, useState } from "react";
import axios from "../axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("/job");
        setJobs(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (loading) return <div className="text-center p-8">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Job Listings</h2>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {jobs.map((job) => (
          <motion.div
            key={job._id}
            whileHover={{ scale: 1.03 }}
            className="card"
          >
            <h3 className="text-lg font-medium">{job.title}</h3>
            <p className="text-sm text-gray-600">{job.employer.username} - {job.location}</p>
            <p className="text-sm">{job.jobType} - ${job.salary}</p>
            <Link to={`/jobs/${job._id}`} className="btn btn-primary mt-4 inline-block">
              View Details
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default JobListings;