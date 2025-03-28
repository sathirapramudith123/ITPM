import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Disclosure, Menu } from "@headlessui/react";
import { motion } from "framer-motion";

const Navbar = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <Disclosure as="nav" className="bg-primary text-white">
      {({ open }) => (
        <>
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <Link to="/" className="text-xl font-bold">
              Job Vacancy System
            </Link>
            <div className="hidden md:flex space-x-6 items-center">
              <Link to="/jobs" className="hover:underline">
                Browse Jobs
              </Link>
              {!isAuthenticated ? (
                <>
                  <Link to="/login" className="hover:underline">
                    Login
                  </Link>
                  <Link to="/register" className="btn btn-secondary">
                    Register
                  </Link>
                </>
              ) : (
                <>
                  {role === "job_seeker" && <Link to="/job-seeker" className="hover:underline">Dashboard</Link>}
                  {role === "employer" && <Link to="/employer" className="hover:underline">Dashboard</Link>}
                  {role === "admin" && <Link to="/admin" className="hover:underline">Admin Dashboard</Link>}
                  <button onClick={handleLogout} className="btn btn-secondary">
                    Logout
                  </button>
                </>
              )}
            </div>
            <Disclosure.Button className="md:hidden p-2 rounded focus:outline-none">
              <span className="sr-only">Open main menu</span>
              {open ? "✕" : "☰"}
            </Disclosure.Button>
          </div>
          <Disclosure.Panel as={motion.div} className="md:hidden" initial={{ height: 0 }} animate={{ height: open ? "auto" : 0 }}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Disclosure.Button as={Link} to="/jobs" className="block px-3 py-2 hover:bg-blue-600 rounded">
                Browse Jobs
              </Disclosure.Button>
              {!isAuthenticated ? (
                <>
                  <Disclosure.Button as={Link} to="/login" className="block px-3 py-2 hover:bg-blue-600 rounded">
                    Login
                  </Disclosure.Button>
                  <Disclosure.Button as={Link} to="/register" className="block px-3 py-2 bg-secondary rounded text-white">
                    Register
                  </Disclosure.Button>
                </>
              ) : (
                <>
                  {role === "job_seeker" && (
                    <Disclosure.Button as={Link} to="/job-seeker" className="block px-3 py-2 hover:bg-blue-600 rounded">
                      Dashboard
                    </Disclosure.Button>
                  )}
                  {role === "employer" && (
                    <Disclosure.Button as={Link} to="/employer" className="block px-3 py-2 hover:bg-blue-600 rounded">
                      Dashboard
                    </Disclosure.Button>
                  )}
                  {role === "admin" && (
                    <Disclosure.Button as={Link} to="/admin" className="block px-3 py-2 hover:bg-blue-600 rounded">
                      Admin Dashboard
                    </Disclosure.Button>
                  )}
                  <Disclosure.Button as="button" onClick={handleLogout} className="block px-3 py-2 bg-secondary rounded text-white">
                    Logout
                  </Disclosure.Button>
                </>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;