import React, { useEffect, useState } from "react";
import axios from "../axios";
import { motion } from "framer-motion";
import { FaCheck, FaTimes, FaSearch, FaFilter, FaEllipsisV } from "react-icons/fa";

// Custom Badge component
const Badge = ({ color, children }) => {
  const colorClasses = {
    green: 'bg-green-100 text-green-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    red: 'bg-red-100 text-red-800',
    blue: 'bg-blue-100 text-blue-800'
  };
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorClasses[color]}`}>
      {children}
    </span>
  );
};

// Custom Spinner component
const Spinner = ({ size = 'md' }) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };
  return (
    <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-blue-500 ${sizes[size]}`}></div>
  );
};

const JobManagement = () => {
  const [jobs, setJobs] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("/job/jobs/manage/admin/jobs", { 
          params: { 
            status: statusFilter,
            search: searchQuery 
          } 
        });
        setJobs(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    const timer = setTimeout(() => fetchJobs(), 500);
    return () => clearTimeout(timer);
  }, [statusFilter, searchQuery]);

  const handleAction = async (jobId, action) => {
    try {
      await axios.post("/admin/jobs", { jobId, action });
      setJobs(jobs.map((job) => 
        job._id === jobId ? { ...job, status: action === "approve" ? "approved" : "rejected" } : job
      ));
      setSelectedJob(null);
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      pending: { color: "yellow", text: "Pending" },
      approved: { color: "green", text: "Approved" },
      rejected: { color: "red", text: "Rejected" }
    };
    return <Badge color={variants[status].color}>{variants[status].text}</Badge>;
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <Spinner size="lg" />
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h3 className="text-2xl font-bold text-gray-800">Job Listings Management</h3>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaFilter className="text-gray-400" />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posted</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {jobs.length > 0 ? (
                jobs.map((job) => (
                  <motion.tr 
                    key={job._id} 
                    whileHover={{ backgroundColor: "#f9fafb" }}
                    className="transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{job.title}</div>
                      <div className="text-sm text-gray-500">{job.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold mr-3">
                          {job.employer?.username?.charAt(0) || "C"}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{job.employer?.username || "Company"}</div>
                          <div className="text-sm text-gray-500">{job.employer?.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(job.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(job.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end items-center space-x-2">
                        {job.status === "pending" && (
                          <>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleAction(job._id, "approve")}
                              className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                              <FaCheck className="mr-1" /> Approve
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleAction(job._id, "reject")}
                              className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                            >
                              <FaTimes className="mr-1" /> Reject
                            </motion.button>
                          </>
                        )}
                        <button 
                          onClick={() => setSelectedJob(job)}
                          className="p-1 text-gray-400 hover:text-gray-600 focus:outline-none"
                        >
                          <FaEllipsisV />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    No jobs found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Job Details Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedJob.title}</h3>
                  <div className="mt-1 flex items-center space-x-2">
                    {getStatusBadge(selectedJob.status)}
                    <span className="text-sm text-gray-500">
                      Posted {new Date(selectedJob.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedJob(null)}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900">Job Details</h4>
                  <div className="mt-2 space-y-2 text-sm text-gray-700">
                    <p><span className="font-medium">Category:</span> {selectedJob.category}</p>
                    <p><span className="font-medium">Type:</span> {selectedJob.type}</p>
                    <p><span className="font-medium">Location:</span> {selectedJob.location}</p>
                    <p><span className="font-medium">Salary:</span> {selectedJob.salary || 'Not specified'}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900">Company Information</h4>
                  <div className="mt-2 flex items-start">
                    <div className="flex-shrink-0 h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold mr-3">
                      {selectedJob.employer?.username?.charAt(0) || "C"}
                    </div>
                    <div>
                      <p className="font-medium">{selectedJob.employer?.username || "Company"}</p>
                      <p className="text-sm text-gray-500">{selectedJob.employer?.email}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-medium text-gray-900">Job Description</h4>
                <div className="mt-2 text-sm text-gray-700 whitespace-pre-line">
                  {selectedJob.description}
                </div>
              </div>

              {selectedJob.status === "pending" && (
                <div className="mt-6 flex justify-end space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      handleAction(selectedJob._id, "approve");
                      setSelectedJob(null);
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Approve Job
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      handleAction(selectedJob._id, "reject");
                      setSelectedJob(null);
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Reject Job
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default JobManagement;