import React, { useEffect, useState } from "react";
import axios from "../axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const JobSeekerDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [jobRes, resumeRes] = await Promise.all([
          axios.get("/job"),
          axios.get("/resume/my-resume"),
        ]);
        setJobs(jobRes.data);
        setResume(resumeRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleApply = async (jobId) => {
    try {
      await axios.post(`/job/${jobId}/apply`);
      alert("Application submitted successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to apply");
    }
  };

  if (loading) return <div className="text-center p-8">Loading...</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <h2 className="text-2xl font-bold mb-6">Job Seeker Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-4">Recommended Jobs</h3>
          {jobs.slice(0, 5).map((job) => (
            <motion.div key={job._id} whileHover={{ scale: 1.02 }} className="card mb-4">
              <h4 className="text-lg font-medium">{job.title}</h4>
              <p className="text-sm text-gray-600">{job.employer.username} - {job.location}</p>
              <div className="flex space-x-2 mt-2">
                <Link to={`/jobs/${job._id}`} className="btn btn-primary">View Details</Link>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleApply(job._id)}
                  className="btn btn-secondary"
                >
                  Apply
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Your Resume</h3>
          {resume ? (
            <div className="card">
              <p><strong>Name:</strong> {resume.personalInfo.fullName}</p>
              <p><strong>Skills:</strong> {resume.skills.join(", ")}</p>
              <p><strong>Preferences:</strong> {resume.careerPreferences.jobTypes.join(", ")}</p>
            </div>
          ) : (
            <p className="text-gray-600">No resume found. Please create one.</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default JobSeekerDashboard;