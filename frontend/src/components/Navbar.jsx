import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import {
  FaUser,
  FaBriefcase,
  FaTachometerAlt,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus,
  FaBars,
  FaTimes,
  FaUserShield,
  FaBell,
} from 'react-icons/fa';

function Navbar() {
  const { user, signOut, loading } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/');
    setMobileMenuOpen(false);
  };

  if (loading) {
    return (
      <nav className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 text-white shadow-lg">
        <div className="container mx-auto px-4 text-center">Loading...</div>
      </nav>
    );
  }

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="text-white font-bold text-2xl flex items-center"
            onClick={() => setMobileMenuOpen(false)}
          >
            <FaBriefcase className="mr-2" />
            JobConnect
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/jobs"
              className="text-white hover:text-blue-100 transition-colors flex items-center"
            >
              <FaBriefcase className="mr-1" /> Jobs
            </Link>
            {user ? (
              <>
                {user.role === 'employer' && (
                  <Link
                    to="/employer-dashboard"
                    className="text-white hover:text-blue-100 transition-colors flex items-center"
                  >
                    <FaTachometerAlt className="mr-1" /> Dashboard
                  </Link>
                )}
                {user.role === 'admin' && (
                  <Link
                    to="/admin-dashboard"
                    className="text-white hover:text-blue-100 transition-colors flex items-center"
                  >
                    <FaUserShield className="mr-1" /> Admin
                  </Link>
                )}
                <Link
                  to="/profile"
                  className="text-white hover:text-blue-100 transition-colors flex items-center"
                >
                  <FaUser className="mr-1" /> Profile
                </Link>
                <Link
                  to="/notifications"
                  className="text-white hover:text-blue-100 transition-colors flex items-center"
                >
                  <FaBell className="mr-1" /> Notifications
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-blue-100 transition-colors flex items-center"
                >
                  <FaSignOutAlt className="mr-1" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white hover:text-blue-100 transition-colors flex items-center"
                >
                  <FaSignInAlt className="mr-1" /> Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors flex items-center"
                >
                  <FaUserPlus className="mr-1" /> Register
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:text-blue-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
        </div>

        <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'} pb-4`}>
          <div className="flex flex-col space-y-3 mt-4">
            <Link
              to="/jobs"
              className="text-white hover:bg-blue-700 px-3 py-2 rounded-md flex items-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FaBriefcase className="mr-2" /> Jobs
            </Link>
            {user ? (
              <>
                {user.role === 'employer' && (
                  <Link
                    to="/employer-dashboard"
                    className="text-white hover:bg-blue-700 px-3 py-2 rounded-md flex items-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FaTachometerAlt className="mr-2" /> Dashboard
                  </Link>
                )}
                {user.role === 'admin' && (
                  <Link
                    to="/admin-dashboard"
                    className="text-white hover:bg-blue-700 px-3 py-2 rounded-md flex items-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FaUserShield className="mr-2" /> Admin
                  </Link>
                )}
                <Link
                  to="/profile"
                  className="text-white hover:bg-blue-700 px-3 py-2 rounded-md flex items-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaUser className="mr-2" /> Profile
                </Link>
                <Link
                  to="/notifications"
                  className="text-white hover:bg-blue-700 px-3 py-2 rounded-md flex items-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaBell className="mr-2" /> Notifications
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-left flex items-center"
                >
                  <FaSignOutAlt className="mr-2" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white hover:bg-blue-700 px-3 py-2 rounded-md flex items-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaSignInAlt className="mr-2" /> Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-blue-600 px-3 py-2 rounded-md hover:bg-blue-50 flex items-center justify-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaUserPlus className="mr-2" /> Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;