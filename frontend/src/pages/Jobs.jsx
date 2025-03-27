// src/pages/Jobs.jsx
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import JobCard from '../components/JobCard'
import { AuthContext } from '../context/authContext.jsx'
import { FaSpinner, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa'

function Jobs() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const { user } = useContext(AuthContext)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/job', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        setJobs(res.data)
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch jobs')
      } finally {
        setLoading(false)
      }
    }
    fetchJobs()
  }, [])

  const handleApply = async (jobId) => {
    try {
      await axios.post(`http://localhost:5000/api/job/${jobId}/apply`, null, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      setSuccess('Application submitted successfully!')
      setTimeout(() => setSuccess(null), 3000)
      
      const res = await axios.get('HTTP://localhost:5000/api/job', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      setJobs(res.data)
    } catch (err) {
      setError('Error applying: ' + (err.response?.data?.message || 'Unknown error'))
      setTimeout(() => setError(null), 3000)
    }
  }

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <FaSpinner className="animate-spin text-4xl text-blue-500 mb-4" />
      <p className="text-lg text-gray-600">Loading job listings...</p>
    </div>
  )

  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <FaExclamationTriangle className="text-4xl text-red-500 mb-4" />
      <p className="text-lg text-red-600">{error}</p>
      <button 
        onClick={() => window.location.reload()}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Try Again
      </button>
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-8">
      {success && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded relative">
          <FaCheckCircle className="inline mr-2" />
          {success}
        </div>
      )}
      
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Available Job Opportunities</h2>
        {user && (
          <span className="px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
            {user.role === 'job_seeker' ? 'Job Seeker' : 'Employer'}
          </span>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map(job => (
          <div 
            key={job._id} 
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100"
          >
            <JobCard job={job} />
            {user && user.role === 'job_seeker' && (
              <div className="p-4 border-t border-gray-100">
                <button
                  onClick={() => handleApply(job._id)}
                  className="w-full py-2 px-4 bg-gradient-to-r from-green-500 to-teal-500 text-white font-medium rounded-md hover:from-green-600 hover:to-teal-600 transition-all transform hover:scale-[1.02]"
                >
                  Apply Now
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {jobs.length === 0 && !loading && (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-500">No job listings available at the moment</h3>
          <p className="text-gray-400 mt-2">Please check back later</p>
        </div>
      )}
    </div>
  )
}

export default Jobs