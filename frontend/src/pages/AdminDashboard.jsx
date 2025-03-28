import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FaBriefcase, 
  FaUsers, 
  FaTags, 
  FaComments, 
  FaChartLine, 
  FaSignOutAlt,
  FaHome,
  FaCog,
  FaBell
} from "react-icons/fa";
import JobManagement from "./JobManagement.jsx";
import UserManagement from "./UserMangment.jsx";
import CategoryManagement from "../components/CategoryMangement.jsx";
import FeedbackManagement from "../components/FeedBackMangement.jsx";
import Analytics from "../components/Analystic.jsx";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("jobs");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const tabs = [
    { id: "jobs", label: "Job Management", icon: <FaBriefcase className="mr-3" />, component: <JobManagement /> },
    { id: "users", label: "User Management", icon: <FaUsers className="mr-3" />, component: <UserManagement /> },
    { id: "categories", label: "Categories", icon: <FaTags className="mr-3" />, component: <CategoryManagement /> },
    { id: "feedback", label: "Feedback", icon: <FaComments className="mr-3" />, component: <FeedbackManagement /> },
    { id: "analytics", label: "Analytics", icon: <FaChartLine className="mr-3" />, component: <Analytics /> },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-screen bg-gray-50"
    >
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-blue-800 to-blue-900 text-white shadow-xl p-6 flex-shrink-0 flex flex-col">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center mb-8 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <div className="bg-white text-blue-600 p-2 rounded-lg mr-3">
            <FaBriefcase size={20} />
          </div>
          <h2 className="text-xl font-bold">CareerPlus Admin</h2>
        </motion.div>

        <nav className="flex-1">
          <ul className="space-y-2">
            {tabs.map((tab) => (
              <li key={tab.id}>
                <motion.button
                  whileHover={{ x: 5 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center py-3 px-4 rounded-lg transition-all ${
                    activeTab === tab.id 
                      ? "bg-blue-600 shadow-md" 
                      : "hover:bg-blue-700 hover:bg-opacity-50"
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </motion.button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto">
          <motion.button
            whileHover={{ x: 5 }}
            onClick={handleLogout}
            className="w-full flex items-center py-3 px-4 rounded-lg hover:bg-red-600 transition-all"
          >
            <FaSignOutAlt className="mr-3" />
            <span>Logout</span>
          </motion.button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between px-8 py-4">
            <h1 className="text-2xl font-bold text-gray-800">
              {tabs.find(tab => tab.id === activeTab)?.label}
            </h1>
            
            <div className="flex items-center space-x-6">
              <button className="relative text-gray-500 hover:text-blue-600">
                <FaBell size={20} />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              </button>
              
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold mr-3">
                  A
                </div>
                <span className="text-gray-700 font-medium">Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-8 bg-gray-50">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-sm p-6 h-full"
          >
            {tabs.find((tab) => tab.id === activeTab)?.component}
          </motion.div>
        </main>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;