import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import JobManagement from "./JobManagement";
import UserManagement from "./UserMangment";
import CategoryManagement from "../components/CategoryMangement";
import FeedbackManagement from "../components/FeedBackMangement";
import Analytics from "../components/Analystic";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("jobs");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const tabs = [
    { id: "jobs", label: "Job Management", component: <JobManagement /> },
    { id: "users", label: "User Management", component: <UserManagement /> },
    { id: "categories", label: "Category Management", component: <CategoryManagement /> },
    { id: "feedback", label: "Feedback Management", component: <FeedbackManagement /> },
    { id: "analytics", label: "Analytics", component: <Analytics /> },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-screen"
    >
      <div className="w-64 bg-white shadow-lg p-6 flex-shrink-0">
        <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
        <ul className="space-y-2">
          {tabs.map((tab) => (
            <li key={tab.id}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left py-2 px-4 rounded ${
                  activeTab === tab.id ? "bg-primary text-white" : "hover:bg-gray-100"
                }`}
              >
                {tab.label}
              </motion.button>
            </li>
          ))}
          <li>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={handleLogout}
              className="w-full text-left py-2 px-4 rounded bg-red-500 text-white hover:bg-red-600"
            >
              Logout
            </motion.button>
          </li>
        </ul>
      </div>
      <div className="flex-1 p-8">
        {tabs.find((tab) => tab.id === activeTab)?.component}
      </div>
    </motion.div>
  );
};

export default AdminDashboard;