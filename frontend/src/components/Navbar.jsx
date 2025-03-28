import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import { FaUser, FaBriefcase, FaSignOutAlt, FaChevronDown, FaBell, FaSearch } from "react-icons/fa";

const Navbar = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Disclosure as="nav" className="bg-white shadow-md">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              {/* Logo */}
              <div className="flex items-center">
                <Link to="/" className="flex-shrink-0 flex items-center">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
                  >
                    CareerPlus
                  </motion.div>
                </Link>
                
                {/* Desktop Navigation */}
                <div className="hidden md:ml-10 md:flex md:space-x-8">
                  <Link 
                    to="/jobs" 
                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-700 hover:text-blue-600 hover:border-blue-500 transition-colors"
                  >
                    <FaSearch className="mr-1" /> Browse Jobs
                  </Link>
                  <Link 
                    to="/companies" 
                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-700 hover:text-blue-600 hover:border-blue-500 transition-colors"
                  >
                    <FaBriefcase className="mr-1" /> Companies
                  </Link>
                  <Link 
                    to="/career-resources" 
                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-700 hover:text-blue-600 hover:border-blue-500 transition-colors"
                  >
                    Career Resources
                  </Link>
                </div>
              </div>

              {/* Right side - Auth/User */}
              <div className="hidden md:ml-6 md:flex md:items-center">
                {!isAuthenticated ? (
                  <div className="flex items-center space-x-4">
                    <Link 
                      to="/login" 
                      className="text-sm font-medium text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md transition-colors"
                    >
                      Sign In
                    </Link>
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                      <Link 
                        to="/register" 
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium shadow-sm hover:shadow-md transition-all"
                      >
                        Register
                      </Link>
                    </motion.div>
                  </div>
                ) : (
                  <div className="ml-4 flex items-center md:ml-6 space-x-4">
                    <button className="p-1 rounded-full text-gray-600 hover:text-blue-600 focus:outline-none relative">
                      <FaBell className="h-5 w-5" />
                      <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                    </button>

                    {/* Profile dropdown */}
                    <Menu as="div" className="ml-3 relative">
                      <div>
                        <Menu.Button className="max-w-xs flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                            </div>
                            <span className="ml-2 text-sm font-medium text-gray-700 hidden lg:inline-flex items-center">
                              {user.name || "User"} <FaChevronDown className="ml-1 text-xs" />
                            </span>
                          </div>
                        </Menu.Button>
                      </div>
                      <Transition
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                          {role === "job_seeker" && (
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to="/job-seeker"
                                  className={`${active ? 'bg-gray-100' : ''} block px-4 py-2 text-sm text-gray-700`}
                                >
                                  <FaUser className="inline mr-2" /> My Profile
                                </Link>
                              )}
                            </Menu.Item>
                          )}
                          {role === "employer" && (
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to="/employer"
                                  className={`${active ? 'bg-gray-100' : ''} block px-4 py-2 text-sm text-gray-700`}
                                >
                                  <FaBriefcase className="inline mr-2" /> Employer Dashboard
                                </Link>
                              )}
                            </Menu.Item>
                          )}
                          {role === "admin" && (
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to="/admin"
                                  className={`${active ? 'bg-gray-100' : ''} block px-4 py-2 text-sm text-gray-700`}
                                >
                                  Admin Dashboard
                                </Link>
                              )}
                            </Menu.Item>
                          )}
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={handleLogout}
                                className={`${active ? 'bg-gray-100' : ''} w-full text-left px-4 py-2 text-sm text-gray-700`}
                              >
                                <FaSignOutAlt className="inline mr-2" /> Sign out
                              </button>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                )}
              </div>

              {/* Mobile menu button */}
              <div className="-mr-2 flex items-center md:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none transition-colors">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <Disclosure.Panel as={motion.div} 
            className="md:hidden shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: open ? 1 : 0,
              height: open ? "auto" : 0
            }}
            transition={{ duration: 0.2 }}
          >
            <div className="pt-2 pb-3 space-y-1 bg-white">
              <Disclosure.Button
                as={Link}
                to="/jobs"
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-500 transition-colors"
              >
                Browse Jobs
              </Disclosure.Button>
              <Disclosure.Button
                as={Link}
                to="/companies"
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-500 transition-colors"
              >
                Companies
              </Disclosure.Button>
              <Disclosure.Button
                as={Link}
                to="/career-resources"
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-500 transition-colors"
              >
                Career Resources
              </Disclosure.Button>

              {!isAuthenticated ? (
                <div className="pt-4 pb-3 border-t border-gray-200 px-4 space-y-2">
                  <Disclosure.Button
                    as={Link}
                    to="/login"
                    className="block w-full px-4 py-2 text-center text-base font-medium text-blue-600 hover:text-blue-800"
                  >
                    Sign In
                  </Disclosure.Button>
                  <Disclosure.Button
                    as={Link}
                    to="/register"
                    className="block w-full px-4 py-2 text-center text-base font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-md shadow hover:from-blue-700 hover:to-indigo-700"
                  >
                    Register
                  </Disclosure.Button>
                </div>
              ) : (
                <div className="pt-4 pb-3 border-t border-gray-200">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                        {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                      </div>
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-800">{user.name || "User"}</div>
                      <div className="text-sm font-medium text-gray-500 capitalize">{role?.replace('_', ' ')}</div>
                    </div>
                  </div>
                  <div className="mt-3 px-2 space-y-1">
                    {role === "job_seeker" && (
                      <Disclosure.Button
                        as={Link}
                        to="/job-seeker"
                        className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                      >
                        My Profile
                      </Disclosure.Button>
                    )}
                    {role === "employer" && (
                      <Disclosure.Button
                        as={Link}
                        to="/employer"
                        className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                      >
                        Employer Dashboard
                      </Disclosure.Button>
                    )}
                    {role === "admin" && (
                      <Disclosure.Button
                        as={Link}
                        to="/admin"
                        className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                      >
                        Admin Dashboard
                      </Disclosure.Button>
                    )}
                    <Disclosure.Button
                      as="button"
                      onClick={handleLogout}
                      className="block w-full px-3 py-2 text-left text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                    >
                      Sign Out
                    </Disclosure.Button>
                  </div>
                </div>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;