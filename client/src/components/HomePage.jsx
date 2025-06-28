import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaSearch, FaCommentAlt, FaUser, FaBriefcase } from 'react-icons/fa';

const HomePage = ({ feedbacks, jobs }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          Welcome to Career Pulse
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Connecting talented professionals with their dream opportunities
        </p>
      </div>

      

      {/* Job Section */}
      <SectionWrapper title="Latest Job Opportunities">
        {jobs.length === 0 ? (
          <EmptyState message="No job posts yet. Check back later!" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.slice(0, 3).map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
        {jobs.length > 0 && (
          <div className="mt-8 text-center">
            <Link 
              to="/joblist" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              View All Jobs <span className="ml-2">→</span>
            </Link>
          </div>
        )}
      </SectionWrapper>

      {/* Feedback Section */}
      <SectionWrapper title="Community Feedback">
        {feedbacks.length === 0 ? (
          <EmptyState message="No feedback yet. Be the first to share!" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {feedbacks.slice(0, 3).map((fb, index) => (
              <FeedbackCard key={index} feedback={fb} />
            ))}
          </div>
        )}
        {feedbacks.length > 0 && (
          <div className="mt-8 text-center">
            <Link 
              to="/feedback" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 transition-colors"
            >
              See More Feedback <span className="ml-2">→</span>
            </Link>
          </div>
        )}
      </SectionWrapper>
    </div>
  );
};

// Reusable Components
const SectionWrapper = ({ title, children }) => (
  <div className="mb-20">
    <h2 className="text-3xl font-bold text-center mb-12 relative">
      <span className="relative inline-block">
        {title}
        <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></span>
      </span>
    </h2>
    {children}
  </div>
);

const FeatureCard = ({ icon, title, description, to, color }) => {
  const colorClasses = {
    blue: 'bg-blue-50 hover:bg-blue-100 border-blue-200',
    green: 'bg-green-50 hover:bg-green-100 border-green-200',
    purple: 'bg-purple-50 hover:bg-purple-100 border-purple-200'
  };

  return (
    <Link 
      to={to} 
      className={`flex flex-col items-center text-center p-8 rounded-xl border-2 transition-all duration-300 hover:shadow-lg ${colorClasses[color]}`}
    >
      <div className="mb-4 p-4 bg-white rounded-full shadow-sm">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </Link>
  );
};

const JobCard = ({ job }) => (
  <Link
    to={`/jobs/${job._id}`}
    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100"
  >
    <div className="p-6">
      <div className="flex items-start">
        <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg mr-4">
          <FaBriefcase className="text-blue-600" size={20} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">{job.title}</h3>
          <p className="text-sm text-gray-500 mb-2">{job.companyProfile}</p>
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {job.jobType}
          </span>
        </div>
      </div>
      <p className="mt-4 text-gray-600 text-sm line-clamp-2">{job.description}</p>
    </div>
  </Link>
);

const FeedbackCard = ({ feedback }) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 border border-gray-100">
    <div className="flex mb-4">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          size={18}
          className={star <= feedback.rating ? 'text-yellow-400' : 'text-gray-300'}
        />
      ))}
    </div>
    <p className="text-gray-700 mb-4 italic">"{feedback.review}"</p>
    <div className="flex items-center">
      <div className="bg-blue-100 text-blue-800 rounded-full w-10 h-10 flex items-center justify-center font-bold">
        {feedback.userName ? feedback.userName.charAt(0).toUpperCase() : 'A'}
      </div>
      <div className="ml-3">
        <p className="text-sm font-medium text-gray-900">
          {feedback.userName || 'Anonymous'}
        </p>
        <p className="text-sm text-gray-500">
          {feedback.jobTitle ? `Former ${feedback.jobTitle}` : 'Job Seeker'}
        </p>
      </div>
    </div>
  </div>
);

const EmptyState = ({ message }) => (
  <div className="text-center py-12 bg-gray-50 rounded-xl">
    <p className="text-gray-500">{message}</p>
  </div>
);

export default HomePage;