import React, { useEffect, useState } from "react";
import axios from "../axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiBriefcase, FiUsers, FiDollarSign, FiMapPin, FiCalendar, FiFileText, FiPlus, FiEye } from "react-icons/fi";

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
  const [activeTab, setActiveTab] = useState("active");

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
      setNewJob({ 
        title: "", 
        description: "", 
        salary: "", 
        location: "", 
        category: "", 
        jobType: "full-time", 
        requirements: "", 
        deadline: "" 
      });
    } catch (err) {
      alert(err.response?.data?.message || "Failed to post job");
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  const filteredJobs = jobs.filter(job => 
    activeTab === "active" ? job.status === "active" : job.status !== "active"
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 max-w-7xl"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Employer Dashboard</h2>
          <p className="text-gray-600">Manage your job postings and applicants</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link 
            to="/applicants" 
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all flex items-center"
          >
            <FiUsers className="mr-2" /> View All Applicants
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Job Postings Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
              <h3 className="text-xl font-semibold text-white flex items-center">
                <FiBriefcase className="mr-2" /> Your Job Postings
              </h3>
            </div>
            
            <div className="p-4 border-b">
              <div className="flex space-x-2">
                <button
                  onClick={() => setActiveTab("active")}
                  className={`px-4 py-2 rounded-lg ${activeTab === "active" ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  Active Jobs
                </button>
                <button
                  onClick={() => setActiveTab("inactive")}
                  className={`px-4 py-2 rounded-lg ${activeTab === "inactive" ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  Closed Jobs
                </button>
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <motion.div 
                    key={job._id} 
                    whileHover={{ y: -3 }}
                    className="p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-bold text-gray-800">{job.title}</h4>
                        <div className="flex flex-wrap items-center text-gray-600 mt-2 space-x-4">
                          <span className="flex items-center">
                            <FiMapPin className="mr-1" /> {job.location}
                          </span>
                          <span className="flex items-center">
                            <FiDollarSign className="mr-1" /> ${job.salary}
                          </span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            {job.jobType}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          job.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {job.status}
                        </span>
                        <div className="mt-2 text-sm text-gray-600">
                          <span className="font-medium">{job.applicants.length}</span> applicants
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-4">
                      <div className="text-sm text-gray-500">
                        <FiCalendar className="inline mr-1" /> Deadline: {new Date(job.deadline).toLocaleDateString()}
                      </div>
                      <div className="flex space-x-2">
                        <Link 
                          to={`/jobs/${job._id}`} 
                          className="px-3 py-1 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center text-sm"
                        >
                          <FiEye className="mr-1" /> View
                        </Link>
                        <Link 
                          to={`/jobs/${job._id}/applicants`} 
                          className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center text-sm"
                        >
                          <FiUsers className="mr-1" /> Applicants
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="p-8 text-center text-gray-500">
                  {activeTab === "active" ? (
                    <p>You don't have any active job postings</p>
                  ) : (
                    <p>You don't have any closed job postings</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* New Job Form Section */}
        <div>
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 sticky top-4">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
              <h3 className="text-xl font-semibold text-white flex items-center">
                <FiPlus className="mr-2" /> Post a New Job
              </h3>
            </div>
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Senior Web Developer"
                    value={newJob.title}
                    onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    placeholder="Detailed job description"
                    value={newJob.description}
                    onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Salary ($)</label>
                    <input
                      type="number"
                      placeholder="e.g. 80000"
                      value={newJob.salary}
                      onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      placeholder="e.g. New York"
                      value={newJob.location}
                      onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={newJob.category}
                    onChange={(e) => setNewJob({ ...newJob, category: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
                  <select
                    value={newJob.jobType}
                    onChange={(e) => setNewJob({ ...newJob, jobType: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="full-time">Full-Time</option>
                    <option value="part-time">Part-Time</option>
                    <option value="contract">Contract</option>
                    <option value="remote">Remote</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Requirements (comma separated)</label>
                  <input
                    type="text"
                    placeholder="e.g. 5+ years experience, React, Node.js"
                    value={newJob.requirements}
                    onChange={(e) => setNewJob({ ...newJob, requirements: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Application Deadline</label>
                  <input
                    type="date"
                    value={newJob.deadline}
                    onChange={(e) => setNewJob({ ...newJob, deadline: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg shadow hover:shadow-md transition-all"
                >
                  Post Job
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EmployerDashboard;