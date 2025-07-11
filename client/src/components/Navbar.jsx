import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="bg-blue-700 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:underline">
          Career Pulse
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden block text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Links */}
        <div className={`md:flex ${menuOpen ? 'block' : 'hidden'} space-x-0 md:space-x-6 mt-4 md:mt-0`}>

          {user?.role === 'jobseeker' && (
            <>
              <Link to="/joblist" className="block md:inline hover:underline">Find Jobs</Link>
              <Link to="/applicants" className="block md:inline hover:underline">Applicants</Link>
              <Link to="/resume" className="block md:inline hover:underline">Resume</Link>
              <Link to="/profile" className="block md:inline hover:underline">My Profile</Link>
            </>
          )}

          {user?.role === 'jobemployer' && (
            <>
              <Link to="/jobs" className="block md:inline hover:underline">Post Job</Link>
              <Link to="/applicants" className="block md:inline hover:underline">Applicants</Link>
              <Link to="/companies" className="block md:inline hover:underline">Company</Link>
              <Link to="/profile" className="block md:inline hover:underline">My Profile</Link>
            </>
          )}

          {user?.role === 'admin' && (
            <>
              <Link to="/admin" className="block md:inline hover:underline">Admin Dashboard</Link>
              <Link to="/profile" className="block md:inline hover:underline">My Profile</Link>
            </>
          )}

          {!user ? (
            <>
              <Link to="/login" className="block md:inline hover:underline">Login</Link>
              <Link to="/register" className="block md:inline hover:underline">Register</Link>
            </>
          ) : (
            <button onClick={handleLogout} className="block md:inline hover:underline">
              Logout
            </button>
          )}

          {/* Optional: Show Role */}
          {user && (
            <span className="block md:inline text-sm text-gray-200 ml-2">
              ({user.role})
            </span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
