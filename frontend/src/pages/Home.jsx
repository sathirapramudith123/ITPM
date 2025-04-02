import React from 'react';
import { 
  FaSearch, 
  FaBriefcase, 
  FaUserTie, 
  FaBuilding, 
  FaMapMarkerAlt, 
  FaMoneyBillAlt,
  FaRegClock,
  FaRegStar,
  FaRegSmile
} from 'react-icons/fa';
import { FiFilter } from 'react-icons/fi';

function Home() {
  return (
    <div className="homepage bg-gray-50">
      {/* Hero Section */}
      <section className="hero-section bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 leading-tight">Find Your <span className="text-yellow-300">Dream Job</span> Today</h1>
            <p className="text-xl mb-10 opacity-90">Join thousands of companies and candidates finding their perfect match</p>
            
            {/* Search Bar */}
            <div className="bg-white rounded-xl shadow-2xl p-2">
              <div className="flex flex-col md:flex-row gap-2">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaSearch className="text-gray-400" />
                  </div>
                  <input 
                    type="text" 
                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    placeholder="Job title, keywords, or company"
                  />
                </div>
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaMapMarkerAlt className="text-gray-400" />
                  </div>
                  <input 
                    type="text" 
                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    placeholder="Location or Remote"
                  />
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg flex items-center justify-center transition-all duration-300 shadow-lg">
                  <FaSearch className="mr-2" /> Search Jobs
                </button>
              </div>
              <div className="mt-3 flex justify-start pl-4">
                <button className="text-blue-600 text-sm font-medium flex items-center">
                  <FiFilter className="mr-1" /> Advanced Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaBriefcase className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">10,000+</h3>
              <p className="text-gray-600">Jobs Available</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUserTie className="text-green-600 text-2xl" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">5,000+</h3>
              <p className="text-gray-600">Successful Hires</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaBuilding className="text-purple-600 text-2xl" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">1,200+</h3>
              <p className="text-gray-600">Trusted Companies</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaRegSmile className="text-yellow-600 text-2xl" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">98%</h3>
              <p className="text-gray-600">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured <span className="text-blue-600">Jobs</span></h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Browse through our most recent and popular job listings</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((job) => (
              <div key={job} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start mb-4">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <FaBuilding className="text-blue-600 text-2xl" />
                  </div>
                  <div>
                    <h5 className="text-xl font-semibold text-gray-900">Senior Frontend Developer</h5>
                    <p className="text-gray-600">TechCorp Inc.</p>
                    <div className="flex items-center mt-2">
                      <FaMapMarkerAlt className="text-gray-400 mr-1" />
                      <span className="text-sm text-gray-500">Remote / San Francisco</span>
                    </div>
                  </div>
                  <button className="ml-auto text-gray-400 hover:text-blue-600">
                    <FaRegStar />
                  </button>
                </div>
                
                <div className="mb-4">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded mr-1">React</span>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded mr-1">TypeScript</span>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Remote</span>
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <div className="flex items-center">
                    <FaMoneyBillAlt className="text-gray-500 mr-2" />
                    <span className="font-semibold text-gray-900">$90k - $120k</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <FaRegClock className="mr-1" />
                    <span>2 days ago</span>
                  </div>
                </div>
                
                <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg transition-all duration-300">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <button className="bg-white border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-50 transition-all duration-300 shadow-sm">
              View All Jobs
            </button>
          </div>
        </div>
      </section>

      {/* Job Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Popular <span className="text-blue-600">Categories</span></h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Find jobs in your area of expertise</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {['Technology', 'Healthcare', 'Finance', 'Education', 'Marketing', 'Design', 'Engineering', 'Sales', 'Customer Service', 'Human Resources', 'Operations', 'Writing'].map((category) => (
              <div key={category} className="bg-gray-50 hover:bg-blue-50 p-4 rounded-lg border border-gray-200 text-center cursor-pointer transition-all duration-300">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FaBriefcase className="text-blue-600" />
                </div>
                <h4 className="font-medium text-gray-900">{category}</h4>
                <p className="text-sm text-gray-500 mt-1">1,240 jobs</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-700 to-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Are You Hiring?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Post your job openings and find the best talent for your company</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-blue-900 px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-100 transition-all duration-300 shadow-lg">
              Post a Job - It's Free
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-white hover:bg-opacity-10 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;