import React, { useEffect, useState } from "react";
import axios from "../axios";
import { motion } from "framer-motion";

const JobManagement = () => {
  const [jobs, setJobs] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("/admin/jobs", { params: { status: statusFilter } });
        setJobs(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [statusFilter]);

  const handleAction = async (jobId, action) => {
    try {
      await axios.post("/admin/jobs", { jobId, action });
      setJobs(jobs.map((job) => (job._id === jobId ? { ...job, status: action === "approve" ? "approved" : "rejected" } : job)));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="text-center p-8">Loading...</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <h3 className="text-2xl font-semibold mb-4">Job Management</h3>
      <div className="mb-4 flex items-center space-x-2">
        <label className="text-sm">Filter by Status:</label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full card">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">Title</th>
              <th className="py-2 px-4 text-left">Employer</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <motion.tr key={job._id} whileHover={{ backgroundColor: "#f1f5f9" }} className="border-b">
                <td className="py-2 px-4">{job.title}</td>
                <td className="py-2 px-4">{job.employer.username}</td>
                <td className="py-2 px-4">{job.status}</td>
                <td className="py-2 px-4">
                  {job.status === "pending" && (
                    <div className="space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAction(job._id, "approve")}
                        className="btn btn-secondary px-3 py-1"
                      >
                        Approve
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAction(job._id, "reject")}
                        className="btn bg-red-500 text-white px-3 py-1 hover:bg-red-600"
                      >
                        Reject
                      </motion.button>
                    </div>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default JobManagement;