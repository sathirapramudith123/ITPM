import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaClock, FaBriefcase, FaMoneyBillAlt, FaBuilding } from 'react-icons/fa';

function JobCard({ job }) {
  // Format salary with commas
  const formattedSalary = job.salary.toLocaleString('en-US');

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 h-full flex flex-col group">
      {/* Company Header */}
      <div className="px-6 pt-6 pb-4 border-b border-gray-100">
        <div className="flex items-center">
          <div className="bg-blue-100 p-3 rounded-lg mr-4">
            <FaBuilding className="text-blue-600 text-xl" />
          </div>
          <div>
            <h5 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{job.title}</h5>
            <p className="text-sm text-gray-600">{job.company}</p>
          </div>
        </div>
      </div>

      {/* Job Details */}
      <div className="p-6 flex-grow">
        <div className="space-y-4">
          {/* Location */}
          <div className="flex items-center">
            <FaMapMarkerAlt className="text-gray-400 mr-3 flex-shrink-0" />
            <span className="text-gray-700">{job.location}</span>
          </div>

          {/* Job Type */}
          <div className="flex items-center">
            <FaBriefcase className="text-gray-400 mr-3 flex-shrink-0" />
            <span className="text-gray-700 capitalize">{job.type}</span>
          </div>

          {/* Salary */}
          <div className="flex items-center">
            <FaMoneyBillAlt className="text-gray-400 mr-3 flex-shrink-0" />
            <span className="text-gray-700">${formattedSalary}/year</span>
          </div>

          {/* Posted Date */}
          <div className="flex items-center">
            <FaClock className="text-gray-400 mr-3 flex-shrink-0" />
            <span className="text-gray-500 text-sm">{job.postedDate || 'Recently posted'}</span>
          </div>
        </div>

        {/* Skills/Tags */}
        {job.skills && (
          <div className="mt-6 flex flex-wrap gap-2">
            {job.skills.slice(0, 3).map((skill, index) => (
              <span 
                key={index} 
                className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
            {job.skills.length > 3 && (
              <span className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">
                +{job.skills.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* Footer with CTA */}
      <div className="px-6 pb-6">
        <Link 
          to={`/jobs/${job.id}`} 
          className="block w-full text-center bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300 shadow-sm hover:shadow-md"
        >
          View Job Details
        </Link>
      </div>
    </div>
  );
}

export default JobCard;