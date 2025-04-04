import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getJobById, applyToJob } from '../services/jobService';

function JobDetail() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const data = await getJobById(id);
        setJob(data);
        if (user && data.applicants?.includes(user.id)) {
          setApplied(true);
        }
      } catch (error) {
        console.error('Failed to fetch job', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id, user]);

  const handleApply = async () => {
    if (!user) {
      alert('Please log in to apply');
      return;
    }
    try {
      await applyToJob(id);
      setApplied(true);
      alert('Application submitted successfully!');
    } catch (error) {
      console.error('Failed to apply:', error?.message || 'An unknown error occurred');
      alert('Failed to apply. Please try again.');
    }
  };

  if (loading) return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="animate-pulse space-y-4">
        <div className="h-10 bg-gray-200 rounded w-3/4"></div>
        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    </div>
  );

  if (!job) return (
    <div className="container mx-auto p-6 max-w-4xl text-center py-12">
      <div className="text-gray-500 text-2xl">Job not found</div>
      <p className="text-gray-400 mt-2">The job you're looking for doesn't exist or may have been removed.</p>
    </div>
  );

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Job Header */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
              <p className="text-lg text-gray-600 mt-1">{job.company?.name || 'Company'}</p>
            </div>
            <div className="bg-white px-3 py-1 rounded-full text-sm font-medium text-blue-600 border border-blue-200">
              {job.type}
            </div>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2">
            <div className="flex items-center text-gray-600">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {job.location}
            </div>
            <div className="flex items-center text-gray-600">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Posted {new Date(job.postedAt).toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Job Content */}
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <span className="text-2xl font-bold text-gray-900">${job.salary.toLocaleString()}</span>
              <span className="text-gray-500">/year</span>
            </div>
            
            {user && user.role === 'job_seeker' && (
              <button
                onClick={handleApply}
                disabled={applied}
                className={`px-6 py-3 rounded-lg font-medium text-white transition-colors ${
                  applied 
                    ? 'bg-green-500 cursor-default'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {applied ? 'Applied ✓' : 'Apply Now'}
              </button>
            )}
          </div>

          {/* Job Description */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Job Description</h2>
            <div className="prose max-w-none text-gray-700">
              {job.description.split('\n').map((paragraph, i) => (
                <p key={i} className="mb-4">{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Job Requirements */}
          {job.requirements && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Requirements</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {job.requirements.map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Benefits */}
          {job.benefits && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Benefits</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {job.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer with Feedback Button */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-between items-center">
          <p className="text-sm text-gray-500">
            Application deadline: {new Date(job.deadline).toLocaleDateString()}
          </p>
          <Link
            to={`/feedback/${id}`}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Leave Feedback
          </Link>
        </div>
      </div>
    </div>
  );
}

export default JobDetail;