import { useState, useEffect } from 'react'
import api from '../api'

function EmployerDashboard() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('myJobs')

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get('/job/employer/jobs')
        setJobs(res.data)
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch jobs')
      } finally {
        setLoading(false)
      }
    }
    fetchJobs()
  }, [])

  const handleCreateJob = async (e) => {
    e.preventDefault()
    const formData = {
      title: e.target.title.value,
      description: e.target.description.value,
      salary: Number(e.target.salary.value),
      location: e.target.location.value,
      category: 'your_category_id_here',
      jobType: e.target.jobType.value,
      requirements: e.target.requirements.value.split(',').map(req => req.trim()),
      deadline: e.target.deadline.value
    }
    try {
      await api.post('/job', formData)
      const res = await api.get('/job/employer/jobs')
      setJobs(res.data)
      setActiveTab('myJobs')
      // Reset form
      e.target.reset()
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create job')
    }
  }

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  )

  if (error) return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 max-w-3xl mx-auto mt-8">
      <p>{error}</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Employer Dashboard
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            Manage your job postings and applicants
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('myJobs')}
              className={`${activeTab === 'myJobs' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              My Jobs
            </button>
            <button
              onClick={() => setActiveTab('createJob')}
              className={`${activeTab === 'createJob' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Create New Job
            </button>
          </nav>
        </div>

        {/* Create Job Form */}
        {activeTab === 'createJob' && (
          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Job Posting</h2>
            <form onSubmit={handleCreateJob} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">Job Title</label>
                  <input
                    name="title"
                    id="title"
                    placeholder="e.g. Senior React Developer"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="salary" className="block text-sm font-medium text-gray-700">Salary ($)</label>
                  <input
                    name="salary"
                    type="number"
                    id="salary"
                    placeholder="e.g. 80000"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                  <input
                    name="location"
                    id="location"
                    placeholder="e.g. New York, NY or Remote"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="jobType" className="block text-sm font-medium text-gray-700">Job Type</label>
                  <select
                    name="jobType"
                    id="jobType"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="full-time">Full-Time</option>
                    <option value="part-time">Part-Time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                    <option value="remote">Remote</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">Job Description</label>
                  <textarea
                    name="description"
                    id="description"
                    rows={4}
                    placeholder="Detailed description of the job responsibilities and expectations..."
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">Requirements (comma separated)</label>
                  <input
                    name="requirements"
                    id="requirements"
                    placeholder="e.g. 3+ years experience, Bachelor's degree, React proficiency"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">Application Deadline</label>
                  <input
                    name="deadline"
                    type="date"
                    id="deadline"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Post Job
                </button>
              </div>
            </form>
          </div>
        )}

        {/* My Jobs List */}
        {activeTab === 'myJobs' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">My Job Postings</h2>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {jobs.length} {jobs.length === 1 ? 'Job' : 'Jobs'}
              </span>
            </div>

            {jobs.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">No jobs posted yet</h3>
                <p className="mt-1 text-gray-500">Get started by creating your first job posting.</p>
                <div className="mt-6">
                  <button
                    onClick={() => setActiveTab('createJob')}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    New Job
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {jobs.map(job => (
                  <div key={job._id} className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300">
                    <div className="px-4 py-5 sm:p-6">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                          <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <h3 className="text-lg font-medium text-gray-900">{job.title}</h3>
                          <p className="text-sm text-gray-500 truncate">{job.location}</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="text-sm text-gray-600 line-clamp-3">{job.description}</p>
                      </div>
                      <div className="mt-6 grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-xs font-medium text-gray-500">STATUS</p>
                          <p className={`mt-1 text-sm font-medium ${
                            job.status === 'active' ? 'text-green-600' : 'text-yellow-600'
                          }`}>
                            {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-500">APPLICANTS</p>
                          <p className="mt-1 text-sm font-medium text-gray-900">{job.applicants.length}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-500">VIEWS</p>
                          <p className="mt-1 text-sm font-medium text-gray-900">{job.views}</p>
                        </div>
                      </div>
                      <div className="mt-6">
                        <div className="relative pt-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                                Progress
                              </span>
                            </div>
                            <div className="text-right">
                              <span className="text-xs font-semibold inline-block text-blue-600">
                                {Math.min(100, Math.floor((job.applicants.length / 10) * 100))}%
                              </span>
                            </div>
                          </div>
                          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                            <div
                              style={{ width: `${Math.min(100, Math.floor((job.applicants.length / 10) * 100))}%` }}
                              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-4 sm:px-6">
                      <div className="text-sm">
                        <a
                          href={`/job/${job._id}`}
                          className="font-medium text-blue-600 hover:text-blue-500"
                        >
                          View details<span className="sr-only">, {job.title}</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default EmployerDashboard