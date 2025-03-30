import React, { useEffect, useState } from "react";
import axios from "../axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiBriefcase, FiUser, FiMapPin, FiDollarSign, FiClock, FiAward } from "react-icons/fi";

const JobSeekerDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [jobRes, resumeRes] = await Promise.all([
          axios.get("/job/jobs"),
          axios.get("job /resume/my-resume"),
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

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
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
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back!</h2>
          <p className="text-gray-600">Find your dream job today</p>
        </div>
        {resume ? (
          <Link 
            to="/resume/edit" 
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            Update Resume
          </Link>
        ) : (
          <Link 
            to="/resume/create" 
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            Create Resume
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recommended Jobs Section */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-semibold text-gray-800 flex items-center">
              <FiBriefcase className="mr-2" /> Recommended Jobs
            </h3>
            <Link to="/jobs" className="text-blue-600 hover:underline">View All</Link>
          </div>

          <div className="space-y-6">
            {jobs.slice(0, 5).map((job) => (
              <motion.div 
                key={job._id} 
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:border-blue-100 transition-all"
              >
                <div className="p-6">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="text-xl font-bold text-gray-800 mb-1">{job.title}</h4>
                      <div className="flex items-center text-gray-600 mb-2">
                        <FiUser className="mr-1" />
                        <span className="mr-4">{job.employer.username}</span>
                        <FiMapPin className="mr-1" />
                        <span>{job.location}</span>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {job.type}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.skills.slice(0, 4).map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-gray-700">
                      <FiDollarSign className="mr-1" />
                      <span>${job.salaryRange?.min} - ${job.salaryRange?.max}</span>
                    </div>
                    <div className="flex space-x-3">
                      <Link 
                        to={`/jobs/${job._id}`} 
                        className="px-4 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        View Details
                      </Link>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleApply(job._id)}
                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-sm hover:shadow-md transition-all"
                      >
                        Apply Now
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Resume & Stats Section */}
        <div className="space-y-6">
          {/* Resume Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
              <h3 className="text-xl font-semibold text-white flex items-center">
                <FiUser className="mr-2" /> Your Resume
              </h3>
            </div>
            <div className="p-6">
              {resume ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                      <FiUser className="text-blue-600 text-2xl" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-800">{resume.personalInfo.fullName}</h4>
                      <p className="text-gray-600">{resume.personalInfo.professionalTitle}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h5 className="font-medium text-gray-700 mb-1 flex items-center">
                        <FiAward className="mr-2" /> Skills
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {resume.skills.slice(0, 5).map((skill, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h5 className="font-medium text-gray-700 mb-1 flex items-center">
                        <FiBriefcase className="mr-2" /> Preferences
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {resume.careerPreferences.jobTypes.map((type, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Link 
                    to="/resume/view" 
                    className="block mt-4 text-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    View Full Resume
                  </Link>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                    <FiUser className="text-gray-400 text-2xl" />
                  </div>
                  <p className="text-gray-600 mb-4">You haven't created a resume yet</p>
                  <Link 
                    to="/resume/create" 
                    className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
                  >
                    Create Resume
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Stats Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
              <h3 className="text-xl font-semibold text-white flex items-center">
                <FiClock className="mr-2" /> Application Stats
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">12</div>
                  <div className="text-sm text-gray-600">Applied Jobs</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">3</div>
                  <div className="text-sm text-gray-600">Interviews</div>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-yellow-600 mb-1">5</div>
                  <div className="text-sm text-gray-600">Saved Jobs</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-1">2</div>
                  <div className="text-sm text-gray-600">Offers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default JobSeekerDashboard;