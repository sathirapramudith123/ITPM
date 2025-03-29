import React, { useEffect, useState } from 'react';
import axios from '../axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import JobForm from '../pages/JobFrom';
import {
  FiBriefcase,
  FiUsers,
  FiDollarSign,
  FiMapPin,
  FiCalendar,
  FiPlus,
  FiEye,
} from 'react-icons/fi';

const JobCard = ({ job, onViewApplicants }) => {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="p-6 hover:bg-gray-50 transition-colors border-b"
    >
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-lg font-bold text-gray-800">{job.title}</h4>
          <div className="flex flex-wrap items-center text-gray-600 mt-2 space-x-4">
            <span className="flex items-center">
              <FiMapPin className="mr-1" /> {job.location}
            </span>
            <span className="flex items-center">
              <FiDollarSign className="mr-1" /> ${job.salary.toLocaleString()}
            </span>
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
              {job.jobType}
            </span>
          </div>
        </div>
        <div className="text-right">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              job.status === "approved"
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {job.status}
          </span>
          <div className="mt-2 text-sm text-gray-600">
            <span className="font-medium">{job.applicants.length}</span> applicants
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-500">
          <FiCalendar className="inline mr-1" /> Deadline:{" "}
          {new Date(job.deadline).toLocaleDateString()}
        </div>
        <div className="flex space-x-2">
          <Link
            to={`/jobs/${job._id}`}
            className="px-3 py-1 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center text-sm"
          >
            <FiEye className="mr-1" /> View
          </Link>
          <button
            onClick={() => onViewApplicants(job._id)}
            className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center text-sm"
          >
            <FiUsers className="mr-1" /> Applicants
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const EmployerDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("active");
  const [showJobForm, setShowJobForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [jobsResponse, categoriesResponse] = await Promise.all([
          axios.get("/employer/jobs"),
          axios.get("/categories"),
        ]);
        setJobs(jobsResponse.data);
        setCategories(categoriesResponse.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmitJob = async (formData) => {
    try {
      const response = await axios.post("/jobs", formData);
      setJobs([...jobs, response.data]);
      setShowJobForm(false);
    } catch (err) {
      throw new Error(err.response?.data?.message || "Failed to post job");
    }
  };

  const filteredJobs = jobs.filter((job) =>
    activeTab === "active" ? job.status === "approved" : job.status !== "approved"
  );

  const handleViewApplicants = (jobId) => {
    // Implement navigation to applicants page
    console.log(`View applicants for job ${jobId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 max-w-7xl"
    >
      {error && (
        <div className="bg-red-100 text-red-700 p-4 mb-4 rounded-lg">
          {error}
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Employer Dashboard</h2>
          <p className="text-gray-600">Manage your job postings and applicants</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-4">
          <button
            onClick={() => setShowJobForm(true)}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all flex items-center"
          >
            <FiPlus className="mr-2" /> Post New Job
          </button>
          <Link
            to="/applicants"
            className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all flex items-center"
          >
            <FiUsers className="mr-2" /> View All Applicants
          </Link>
        </div>
      </div>

      {showJobForm ? (
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">Post a New Job</h3>
            <button
              onClick={() => setShowJobForm(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          </div>
          <JobForm
            onSubmit={handleSubmitJob}
            categories={categories}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
                <h3 className="text-xl font-semibold text-white flex items-center">
                  <FiBriefcase className="mr-2" /> Your Job Postings
                </h3>
              </div>

              <div className="p-4 border-b">
                <div className="flex space-x-2">
                  <button
                    onClick={() => setActiveTab("active")}
                    className={`px-4 py-2 rounded-lg ${
                      activeTab === "active" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    Active Jobs
                  </button>
                  <button
                    onClick={() => setActiveTab("inactive")}
                    className={`px-4 py-2 rounded-lg ${
                      activeTab === "inactive" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    Closed Jobs
                  </button>
                </div>
              </div>

              <div className="divide-y divide-gray-100">
                {filteredJobs.length > 0 ? (
                  filteredJobs.map((job) => (
                    <JobCard
                      key={job._id}
                      job={job}
                      onViewApplicants={handleViewApplicants}
                    />
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

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-4">
              <h3 className="text-xl font-semibold mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="text-blue-800 font-medium">Total Jobs</div>
                  <div className="text-2xl font-bold">{jobs.length}</div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-green-800 font-medium">Active Jobs</div>
                  <div className="text-2xl font-bold">
                    {jobs.filter(j => j.status === "approved").length}
                  </div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="text-purple-800 font-medium">Total Applicants</div>
                  <div className="text-2xl font-bold">
                    {jobs.reduce((sum, job) => sum + job.applicants.length, 0)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default EmployerDashboard;