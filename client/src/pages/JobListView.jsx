import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JobListView = ({ companies }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchJobs = async (term = '') => {
    setIsLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/jobs', {
        params: { search: term }
      });
      setJobs(res.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    fetchJobs(term);
  };

  const getCompanyName = (companyId) => {
    const company = companies.find((c) => c.id === companyId);
    return company ? company.name : 'Unknown';
  };

  const handleViewDetails = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Job Listings</h1>
        <p className="text-lg text-gray-600">Find your perfect opportunity</p>
      </div>

      <div className="mb-8 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search by title, category, or company"
          value={searchTerm}
          onChange={handleSearch}
          className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No jobs found</h3>
          <p className="mt-1 text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="flex flex-col rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              <div className="flex-1 bg-white p-6 flex flex-col">
                <div className="flex-1">
                  <div className="flex items-center mb-3">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      job.jobType === 'Full-time' ? 'bg-green-100 text-green-800' :
                      job.jobType === 'Part-time' ? 'bg-blue-100 text-blue-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {job.jobType}
                    </span>
                    <span className="ml-2 px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                      {job.category}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">{job.description}</p>
                </div>
                <div className="mt-4 flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                      {getCompanyName(job.companyId).charAt(0)}
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      {getCompanyName(job.companyId)}
                    </p>
                    <div className="flex space-x-1 text-sm text-gray-500">
                      <span>{new Date(job.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-4">
                <button 
                  onClick={() => handleViewDetails(job)}
                  className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Job Details Modal */}
      {isModalOpen && selectedJob && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={closeModal}></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <div className="flex justify-between items-start">
                      <h3 className="text-2xl leading-6 font-bold text-gray-900 mb-2">
                        {selectedJob.title}
                      </h3>
                      <button
                        onClick={closeModal}
                        className="text-gray-400 hover:text-gray-500 focus:outline-none"
                      >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="flex items-center mt-2 mb-4">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        selectedJob.jobType === 'Full-time' ? 'bg-green-100 text-green-800' :
                        selectedJob.jobType === 'Part-time' ? 'bg-blue-100 text-blue-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {selectedJob.jobType}
                      </span>
                      <span className="ml-2 px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                        {selectedJob.category}
                      </span>
                    </div>
                    
                    <div className="flex items-center mb-6">
                      <div className="flex-shrink-0">
                        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
                          {getCompanyName(selectedJob.companyId).charAt(0)}
                        </div>
                      </div>
                      <div className="ml-4">
                        <p className="text-lg font-medium text-gray-900">
                          {getCompanyName(selectedJob.companyId)}
                        </p>
                        <p className="text-sm text-gray-500">
                          Posted on {new Date(selectedJob.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Job Description</h4>
                      <p className="text-gray-700 whitespace-pre-line">{selectedJob.description}</p>
                    </div>
                    
                    {selectedJob.requirements && (
                      <div className="mt-4">
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">Requirements</h4>
                        <ul className="list-disc pl-5 text-gray-700">
                          {selectedJob.requirements.split('\n').map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-sm font-medium text-gray-500">Location</h5>
                        <p className="text-gray-900">{selectedJob.location || 'Not specified'}</p>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-gray-500">Salary</h5>
                        <p className="text-gray-900">{selectedJob.salary || 'Not specified'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Apply Now
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobListView;