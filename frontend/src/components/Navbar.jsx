import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate for logout redirect
import { FaUser, FaBriefcase, FaSignOutAlt, FaChevronDown, FaBell, FaSearch } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const isAuthenticated = !!localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const navigate = useNavigate(); // For programmatic navigation

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    navigate('/login'); // Use navigate instead of window.location.href for React Router
  };

  // Navigation links based on role
  const navLinks = [
    { name: 'Jobs', href: '/jobs', show: true },
    { name: 'Dashboard', href: role === 'admin' ? '/admin' : role === 'job_seeker' ? '/job-seeker' : '/employer', show: isAuthenticated },
  ];

  return (
    <Disclosure as="nav" className="bg-white dark:bg-gray-800 shadow-md">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              {/* Left side */}
              <div className="flex items-center">
                <Link to="/" className="flex-shrink-0 flex items-center">
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    CareerPlus
                  </span>
                </Link>
                {/* Desktop navigation links */}
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {navLinks.map((item) =>
                    item.show ? (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400"
                      >
                        {item.name}
                      </Link>
                    ) : null
                  )}
                </div>
              </div>

              {/* Right side */}
              <div className="flex items-center space-x-4">
                <ThemeToggle />
                {isAuthenticated ? (
                  <>
                    <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                      <FaSearch className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                      <FaBell className="h-5 w-5" />
                    </button>
                    {/* User Menu */}
                    <Menu as="div" className="relative">
                      <Menu.Button className="flex items-center space-x-2 p-2 text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400">
                        <FaUser className="h-5 w-5" />
                        <span>{user.name || 'User'}</span>
                        <FaChevronDown className="h-4 w-4" />
                      </Menu.Button>
                      <Transition
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to={role === 'admin' ? '/admin' : role === 'job_seeker' ? '/job-seeker' : '/employer'}
                                className={`${
                                  active ? 'bg-gray-100 dark:bg-gray-600' : ''
                                } flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}
                              >
                                <FaBriefcase className="mr-2 h-4 w-4" />
                                Dashboard
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={handleLogout}
                                className={`${
                                  active ? 'bg-gray-100 dark:bg-gray-600' : ''
                                } flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}
                              >
                                <FaSignOutAlt className="mr-2 h-4 w-4" />
                                Logout
                              </button>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="bg-indigo-600 text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Register
                    </Link>
                  </>
                )}
                {/* Mobile menu button */}
                <Disclosure.Button className="sm:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                  {open ? (
                    <span className="text-2xl">×</span>
                  ) : (
                    <span className="text-2xl">☰</span>
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <Disclosure.Panel className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {navLinks.map((item) =>
                item.show ? (
                  <Disclosure.Button
                    key={item.name}
                    as={Link}
                    to={item.href}
                    className="block pl-3 pr-4 py-2 text-base font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {item.name}
                  </Disclosure.Button>
                ) : null
              )}
              {!isAuthenticated && (
                <>
                  <Disclosure.Button
                    as={Link}
                    to="/login"
                    className="block pl-3 pr-4 py-2 text-base font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Login
                  </Disclosure.Button>
                  <Disclosure.Button
                    as={Link}
                    to="/register"
                    className="block pl-3 pr-4 py-2 text-base font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Register
                  </Disclosure.Button>
                </>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}