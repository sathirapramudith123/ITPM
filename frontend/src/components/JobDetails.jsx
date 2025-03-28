import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "@/axios"; // Use alias with Vite config
import { motion } from "framer-motion";

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const isAuthenticated = !!localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`/job/${id}`);
        setJob(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleApply = async () => {
    try {
      await axios.post(`/job/${id}/apply`);
      alert("Application submitted successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to apply");
    }
  };

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (!job) return <div className="text-center p-8">Job not found</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <h2 className="text-2xl font-bold mb-4">{job.title}</h2>
      <div className="card">
        <p><strong>Employer:</strong> {job.employer.username}</p>
        <p><strong>Location:</strong> {job.location}</p>
        <p><strong>Salary:</strong> ${job.salary}</p>
        <p><strong>Type:</strong> {job.jobType}</p>
        <p><strong>Category:</strong> {job.category.name}</p>
        <p className="mt-2"><strong>Description:</strong> {job.description}</p>
        <p className="mt-2"><strong>Requirements:</strong> {job.requirements.join(", ")}</p>
        <p><strong>Deadline:</strong> {new Date(job.deadline).toLocaleDateString()}</p>
        <p><strong>Applicants:</strong> {job.applicants.length}</p>
        <p><strong>Views:</strong> {job.views}</p>
        {isAuthenticated && role === "job_seeker" && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleApply}
            className="btn btn-secondary mt-4"
          >
            Apply Now
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default JobDetail;