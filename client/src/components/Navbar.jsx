import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <nav className="bg-blue-700 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="hover:underline">
          <h1 className="text-2xl font-bold">Career Pulse</h1>
        </Link>
        <div className="space-x-6">
          

          {user?.role === 'jobseeker' && (
            <>
              <Link to="/jobs" className="hover:underline">Find Jobs</Link>
              <Link to="/profile" className="hover:underline">My Profile</Link>
            </>
          )}

          {user?.role === 'employer' && (
            <>
              <Link to="/post-job" className="hover:underline">Post Job</Link>
              <Link to="/applicants" className="hover:underline">Applicants</Link>
            </>
          )}

          {user?.role === 'admin' && (
            <>
              <Link to="/admin-dashboard" className="hover:underline">Admin Dashboard</Link>
              <Link to="/manage-users" className="hover:underline">Manage Users</Link>
            </>
          )}

          {!user ? (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/register" className="hover:underline">Register</Link>
            </>
          ) : (
            <Link
              to="/login"
              className="hover:underline"
              onClick={() => {
                localStorage.removeItem('user');
                window.location.reload();
              }}
            >
              Logout
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
