import React, { useEffect, useState } from "react";
import axios from "../axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const EmployerDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newJob, setNewJob] = useState({
    title: "",
    description: "",
    salary: "",
    location: "",
    category: "",
    jobType: "full-time",
    requirements: "",
    deadline: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [jobRes, catRes] = await Promise.all([
          axios.get("/job/employer/jobs"),
          axios.post("/admin/categories", { action: "list" }),
        ]);
        setJobs(jobRes.data);
        setCategories(catRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const jobData = {
        ...newJob,
        salary: Number(newJob.salary),
        requirements: newJob.requirements.split(",").map((req) => req.trim()),
        deadline: new Date(newJob.deadline).toISOString(),
      };
      const res = await axios.post("/job", jobData);
      setJobs([...jobs, res.data]);
      setNewJob({ title: "", description: "", salary: "", location: "", category: "", jobType: "full-time", requirements: "", deadline: "" });
    } catch (err) {
      alert(err.response?.data?.message || "Failed to post job");
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
      <h2 className="text-2xl font-bold mb-6">Employer Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-4">Your Job Postings</h3>
          {jobs.map((job) => (
            <motion.div key={job._id} whileHover={{ scale: 1.02 }} className="card mb-4">
              <h4 className="text-lg font-medium">{job.title}</h4>
              <p className="text-sm text-gray-600">Status: {job.status}</p>
              <p className="text-sm">Applicants: {job.applicants.length}</p>
              <Link to={`/jobs/${job._id}`} className="btn btn-primary mt-2 inline-block">
                View Details
              </Link>
            </motion.div>
          ))}
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Post a New Job</h3>
          <form onSubmit={handleSubmit} className="card">
            <input
              type="text"
              placeholder="Title"
              value={newJob.title}
              onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
              className="w-full p-2 mb-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <textarea
              placeholder="Description"
              value={newJob.description}
              onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
              className="w-full p-2 mb-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <input
              type="number"
              placeholder="Salary"
              value={newJob.salary}
              onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
              className="w-full p-2 mb-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <input
              type="text"
              placeholder="Location"
              value={newJob.location}
              onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
              className="w-full p-2 mb-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <select
              value={newJob.category}
              onChange={(e) => setNewJob({ ...newJob, category: e.target.value })}
              className="w-full p-2 mb-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
            <select
              value={newJob.jobType}
              onChange={(e) => setNewJob({ ...newJob, jobType: e.target.value })}
              className="w-full p-2 mb-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="full-time">Full-Time</option>
              <option value="part-time">Part-Time</option>
              <option value="remote">Remote</option>
            </select>
            <input
              type="text"
              placeholder="Requirements (comma-separated)"
              value={newJob.requirements}
              onChange={(e) => setNewJob({ ...newJob, requirements: e.target.value })}
              className="w-full p-2 mb-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <input
              type="date"
              value={newJob.deadline}
              onChange={(e) => setNewJob({ ...newJob, deadline: e.target.value })}
              className="w-full p-2 mb-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="btn btn-primary w-full"
            >
              Post Job
            </motion.button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default EmployerDashboard;