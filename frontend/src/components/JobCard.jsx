import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaMapMarkerAlt, 
  FaClock, 
  FaBriefcase, 
  FaMoneyBillAlt, 
  FaBuilding,
  FaHeart,
  FaRegHeart
} from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';

function JobCard({ job, isFavorite = false, onFavoriteToggle }) {
  const formattedSalary = job.salary?.toLocaleString('en-US') || 'Negotiable';
  const postedDate = job.postedDate ? new Date(job.postedDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  }) : 'Recently';

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-all duration-300 h-full flex flex-col group hover:border-blue-100">
      {/* Company Header with Favorite Button */}
      <div className="px-5 pt-5 pb-3 border-b border-gray-100 relative">
        <div className="flex items-start">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-3 rounded-lg mr-4 flex-shrink-0">
            {job.companyLogo ? (
              <img 
                src={job.companyLogo} 
                alt={job.company} 
                className="w-10 h-10 object-contain"
              />
            ) : (
              <FaBuilding className="text-blue-600 text-xl" />
            )}
          </div>
          <div className="flex-grow min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
              {job.title}
            </h3>
            <p className="text-sm text-gray-600 truncate">{job.company}</p>
          </div>
          <button 
            onClick={(e) => {
              e.preventDefault();
              onFavoriteToggle?.(job.id);
            }}
            className="text-gray-300 hover:text-red-500 transition-colors ml-2 mt-1"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite ? (
              <FaHeart className="text-red-500" />
            ) : (
              <FaRegHeart />
            )}
          </button>
        </div>
      </div>

      {/* Job Details */}
      <div className="p-5 flex-grow">
        <div className="space-y-3.5">
          {/* Location */}
          <div className="flex items-start">
            <FaMapMarkerAlt className="text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700 text-sm">{job.location || 'Remote'}</span>
          </div>

          {/* Job Type */}
          <div className="flex items-start">
            <FaBriefcase className="text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700 text-sm capitalize">{job.type || 'Full-time'}</span>
          </div>

          {/* Salary */}
          <div className="flex items-start">
            <FaMoneyBillAlt className="text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700 text-sm">
              {job.salary ? `$${formattedSalary}/year` : 'Salary not disclosed'}
            </span>
          </div>

          {/* Posted Date */}
          <div className="flex items-start">
            <FaClock className="text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
            <span className="text-gray-500 text-sm">{postedDate} posted</span>
          </div>
        </div>

        {/* Skills/Tags */}
        {job.skills?.length > 0 && (
          <div className="mt-5">
            <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Skills Required</h4>
            <div className="flex flex-wrap gap-2">
              {job.skills.slice(0, 4).map((skill, index) => (
                <span 
                  key={index} 
                  className="bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-full border border-blue-100"
                >
                  {skill}
                </span>
              ))}
              {job.skills.length > 4 && (
                <span className="bg-gray-50 text-gray-600 text-xs px-2.5 py-1 rounded-full border border-gray-200">
                  +{job.skills.length - 4}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer with CTA */}
      <div className="px-5 pb-5">
        <Link 
          to={`/jobs/${job.id}`} 
          className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 py-2.5 px-4 rounded-lg hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 group/button"
        >
          <span className="font-medium text-sm">View Details</span>
          <FiExternalLink className="opacity-0 group-hover/button:opacity-100 transition-opacity duration-300" />
        </Link>
      </div>
    </div>
  );
}

export default JobCard;