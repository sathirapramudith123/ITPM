import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaSearch, FaCommentAlt, FaUser, FaBriefcase, FaArrowRight } from 'react-icons/fa';

const HomePage = ({ feedbacks, jobs }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          Welcome to Career Pulse
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Connecting talented professionals with their dream opportunities
        </p>
        <div className="flex gap-4 justify-center">
          <Link 
            to="/joblist" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-md"
          >
            Browse Jobs
          </Link>
          <Link 
            to="/companylist" 
            className="bg-white hover:bg-gray-50 text-blue-600 border border-blue-600 px-6 py-3 rounded-lg font-medium transition-colors shadow-sm"
          >
            Explore Companies
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <SectionWrapper title="How It Works">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<FaSearch className="text-blue-600" size={24} />}
            title="Find Opportunities"
            description="Discover jobs that match your skills and aspirations"
            to="/joblist"
            color="blue"
          />
          <FeatureCard 
            icon={<FaCommentAlt className="text-purple-600" size={24} />}
            title="Get Feedback"
            description="Receive valuable insights from industry experts"
            to="/feedback"
            color="purple"
          />
        </div>
      </SectionWrapper>

      {/* Featured Jobs Section */}
      <SectionWrapper title="Featured Opportunities">
        {jobs && jobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.slice(0, 6).map(job => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        ) : (
          <EmptyState message="No featured jobs available at the moment" />
        )}
        <div className="text-center mt-8">
          <Link 
            to="/jobs" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            View all job opportunities <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </SectionWrapper>

      {/* Testimonials Section */}
      <SectionWrapper title="Success Stories">
        {feedbacks && feedbacks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {feedbacks.slice(0, 3).map((feedback, index) => (
              <FeedbackCard key={index} feedback={feedback} />
            ))}
          </div>
        ) : (
          <EmptyState message="No testimonials available yet" />
        )}
      </SectionWrapper>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 md:p-12 text-center text-white mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to advance your career?</h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto opacity-90">
          Join thousands of professionals who found their dream jobs through Career Pulse
        </p>
        <Link 
          to="/register" 
          className="inline-block bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-bold transition-colors shadow-lg"
        >
          Get Started Now
        </Link>
      </div>
    </div>
  );
};

// Reusable Components (keep the same as in your original code)
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