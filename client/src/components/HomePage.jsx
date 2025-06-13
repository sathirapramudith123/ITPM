import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

const HomePage = ({ feedbacks, jobs }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-700">
        Welcome to JobHub
      </h1>
      <p className="text-center text-lg text-gray-700 mb-10">
        A smarter way to connect job seekers and employers.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <Link to="/joblist" className="p-6 bg-blue-100 rounded-xl hover:shadow-md">
          <h3 className="text-xl font-semibold mb-2">Find Jobs</h3>
          <p className="text-sm text-gray-600">Browse available job postings and apply now.</p>
        </Link>

        <Link to="/feedback" className="p-6 bg-green-100 rounded-xl hover:shadow-md">
          <h3 className="text-xl font-semibold mb-2">Give Feedback</h3>
          <p className="text-sm text-gray-600">Share your job experiences through reviews and ratings.</p>
        </Link>

        <Link to="/resume" className="p-6 bg-purple-100 rounded-xl hover:shadow-md">
          <h3 className="text-xl font-semibold mb-2">Your Profile</h3>
          <p className="text-sm text-gray-600">Manage your resume, skills, and work history.</p>
        </Link>
      </div>

      {/* Feedback Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-4 text-center">Recent Feedbacks</h2>
        {feedbacks.length === 0 ? (
          <p className="text-center text-gray-500">No feedback yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {feedbacks.map((fb, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow border">
                <div className="flex text-yellow-400 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      size={20}
                      className={star <= fb.rating ? '' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <p className="text-gray-700 text-sm">{fb.review}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Job Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-4 text-center">Latest Job Posts</h2>
        {jobs.length === 0 ? (
          <p className="text-center text-gray-500">No job posts yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobs.map((job, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow border">
                <h3 className="text-lg font-semibold text-blue-700">{job.title}</h3>
                <p className="text-sm text-gray-600 mb-1">{job.description}</p>
                <p className="text-sm text-gray-500">Company: {job.companyProfile}</p>
                <p className="text-sm text-gray-500">Type: {job.jobType}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
