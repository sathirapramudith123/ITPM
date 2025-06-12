import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-700 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          JobHub
        </h1>
        <div className="space-x-6">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/feedback" className="hover:underline">
            Feedback
          </Link>
          <Link to="/jobs" className="hover:underline">
            Jobs
          </Link>
          <Link to="/profile" className="hover:underline">
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
