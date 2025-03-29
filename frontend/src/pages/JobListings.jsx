import React, { useEffect, useState } from "react";
import axios from "../axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiBriefcase, FiMapPin, FiDollarSign, FiClock, FiChevronRight } from "react-icons/fi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("/job/employer/jobs");
        setJobs(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || job.jobType === filter;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <Skeleton height={24} width="70%" />
                <Skeleton height={16} width="50%" className="mt-2" />
                <div className="flex flex-wrap gap-2 mt-4">
                  <Skeleton height={20} width={80} />
                  <Skeleton height={20} width={80} />
                  <Skeleton height={20} width={80} />
                </div>
                <Skeleton height={16} count={3} className="mt-4" />
                <Skeleton height={40} width={120} className="mt-6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Find Your Dream Job</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Browse through our curated list of job opportunities and take the next step in your career.
          </p>
          <div className="max-w-3xl mx-auto relative">
            <input
              type="text"
              placeholder="Search for jobs, keywords, or companies..."
              className="w-full py-4 px-6 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="absolute right-2 top-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md transition duration-200">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Filter Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
            {filteredJobs.length} {filteredJobs.length === 1 ? "Job" : "Jobs"} Available
          </h2>
          <div className="flex space-x-2 bg-white p-2 rounded-lg shadow-sm">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-md ${filter === "all" ? "bg-blue-100 text-blue-600" : "text-gray-600"}`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("Full-time")}
              className={`px-4 py-2 rounded-md ${filter === "Full-time" ? "bg-blue-100 text-blue-600" : "text-gray-600"}`}
            >
              Full-time
            </button>
            <button
              onClick={() => setFilter("Part-time")}
              className={`px-4 py-2 rounded-md ${filter === "Part-time" ? "bg-blue-100 text-blue-600" : "text-gray-600"}`}
            >
              Part-time
            </button>
            <button
              onClick={() => setFilter("Remote")}
              className={`px-4 py-2 rounded-md ${filter === "Remote" ? "bg-blue-100 text-blue-600" : "text-gray-600"}`}
            >
              Remote
            </button>
          </div>
        </div>

        {/* Job Listings */}
        {filteredJobs.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">No jobs found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredJobs.map((job) => (
              <motion.div
                key={job._id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-1">{job.title}</h3>
                      <p className="text-gray-600 mb-4">{job.employer.username}</p>
                    </div>
                    {job.featured && (
                      <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        Featured
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center bg-blue-50 text-blue-600 text-sm px-3 py-1 rounded-full">
                      <FiBriefcase className="mr-1" /> {job.jobType}
                    </span>
                    <span className="inline-flex items-center bg-green-50 text-green-600 text-sm px-3 py-1 rounded-full">
                      <FiMapPin className="mr-1" /> {job.location}
                    </span>
                    <span className="inline-flex items-center bg-purple-50 text-purple-600 text-sm px-3 py-1 rounded-full">
                      <FiDollarSign className="mr-1" /> ${job.salary.toLocaleString()}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-6 line-clamp-3">{job.description.substring(0, 150)}...</p>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      <FiClock className="inline mr-1" /> Posted {new Date(job.createdAt).toLocaleDateString()}
                    </span>
                    <Link
                      to={`/jobs/${job._id}`}
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                    >
                      View Details <FiChevronRight className="ml-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Call to Action */}
      <div className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Can't find what you're looking for?</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Sign up for job alerts and we'll notify you when new positions matching your criteria become available.
          </p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-8 rounded-lg shadow-lg transition duration-200">
            Get Job Alerts
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobListings;