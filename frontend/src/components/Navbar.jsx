// src/components/Navbar.jsx
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'

function Navbar() {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="bg-gradient-to-r from-blue-800 to-blue-600 shadow-xl p-4 text-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Logo/Brand */}
        <Link 
          to="/" 
          className="text-2xl font-extrabold tracking-tight hover:text-blue-100 transition-colors"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-100">
            JobConnect
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
          {/* Common Links */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <Link 
              to="/jobs" 
              className="px-3 py-1 rounded-lg hover:bg-blue-700 hover:text-white transition-all font-medium"
            >
              Jobs
            </Link>
            <Link 
              to="/about" 
              className="px-3 py-1 rounded-lg hover:bg-blue-700 hover:text-white transition-all font-medium"
            >
              About
            </Link>

            {/* Authenticated User Links */}
            {user ? (
              <>
                <Link 
                  to="/profile" 
                  className="px-3 py-1 rounded-lg hover:bg-blue-700 hover:text-white transition-all font-medium flex items-center gap-1"
                >
                  <span>Profile</span>
                  <span className="text-xs bg-yellow-400 text-blue-900 rounded-full px-1.5 py-0.5">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </Link>
                
                {user.role === 'job_seeker' && (
                  <>
                    <Link 
                      to="/resume" 
                      className="px-3 py-1 rounded-lg hover:bg-blue-700 hover:text-white transition-all font-medium"
                    >
                      Resume
                    </Link>
                    <Link 
                      to="/resources" 
                      className="px-3 py-1 rounded-lg hover:bg-blue-700 hover:text-white transition-all font-medium"
                    >
                      Resources
                    </Link>
                  </>
                )}
                
                {user.role === 'employer' && (
                  <Link 
                    to="/employer" 
                    className="px-3 py-1 rounded-lg bg-blue-900 hover:bg-blue-800 transition-all font-medium"
                  >
                    Dashboard
                  </Link>
                )}
                
                <Link 
                  to="/notifications" 
                  className="px-3 py-1 rounded-lg hover:bg-blue-700 hover:text-white transition-all font-medium relative"
                >
                  Notifications
                  <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    2
                  </span>
                </Link>
              </>
            ) : null}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            {user ? (
              <button 
                onClick={handleLogout} 
                className="bg-gradient-to-r from-red-500 to-red-600 px-4 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg font-medium flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                </svg>
                Logout
              </button>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="px-4 py-2 rounded-lg border border-blue-300 hover:bg-blue-700 transition-colors font-medium"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-gradient-to-r from-green-500 to-green-600 px-4 py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg font-medium"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar