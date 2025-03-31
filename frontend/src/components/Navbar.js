import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const { user, signOut, loading } = useContext(AuthContext);

  if (loading) return <nav className="bg-blue-600 p-4 text-white">Loading...</nav>;

  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Job Portal</Link>
        <div className="space-x-4">
          <Link to="/jobs" className="hover:underline">Jobs</Link>
          {user ? (
            <>
              <Link to="/profile" className="hover:underline">Profile</Link>
              {user.role === 'employer' && <Link to="/employer-dashboard" className="hover:underline">Dashboard</Link>}
              {user.role === 'admin' && <Link to="/admin-dashboard" className="hover:underline">Admin</Link>}
              <button onClick={signOut} className="hover:underline">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/register" className="hover:underline">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;