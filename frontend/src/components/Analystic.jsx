import React, { useEffect, useState, useMemo } from "react";
import axios from "../axios";
import { motion } from "framer-motion";
import { 
  FiTrendingUp, 
  FiBriefcase, 
  FiUsers, 
  FiBarChart2, 
  FiAward,
  FiRefreshCw
} from "react-icons/fi";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const Analytics = () => {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState("30days");

  const fetchInsights = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(`/analytics/insights?range=${timeRange}`);
      setInsights(res.data);
    } catch (err) {
      console.error("Failed to fetch analytics:", err);
      setError("Failed to load analytics data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, [timeRange]);

  const applicationsData = useMemo(() => {
    return insights?.applicationsTrend?.map(item => ({
      name: new Date(item._id).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      applications: item.count
    })) || [];
  }, [insights]);

  const categoriesData = useMemo(() => {
    return insights?.mostAppliedCategories?.map(cat => ({
      name: cat._id.name,
      applications: cat.totalApplications
    })) || [];
  }, [insights]);

  if (loading) return (
    <div className="flex flex-col justify-center items-center h-64 gap-4">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      <p className="text-gray-500">Loading analytics data...</p>
    </div>
  );

  if (error) return (
    <div className="text-center p-8 flex flex-col items-center gap-4">
      <div className="text-red-500 bg-red-50 p-4 rounded-full">
        <FiRefreshCw className="text-2xl" />
      </div>
      <p className="text-red-500 font-medium">{error}</p>
      <button
        onClick={fetchInsights}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Retry
      </button>
    </div>
  );

  if (!insights) return (
    <div className="text-center p-8 flex flex-col items-center gap-4">
      <div className="text-gray-400 bg-gray-50 p-4 rounded-full">
        <FiBarChart2 className="text-2xl" />
      </div>
      <p className="text-gray-500">No analytics data available</p>
      <button
        onClick={fetchInsights}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Refresh
      </button>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 max-w-7xl"
    >
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <FiTrendingUp className="text-white text-2xl mr-3" />
              <h1 className="text-2xl font-semibold text-white">Platform Analytics</h1>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setTimeRange("7days")}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  timeRange === "7days" 
                    ? 'bg-white text-blue-600' 
                    : 'text-white hover:bg-blue-400'
                }`}
              >
                7 Days
              </button>
              <button
                onClick={() => setTimeRange("30days")}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  timeRange === "30days" 
                    ? 'bg-white text-blue-600' 
                    : 'text-white hover:bg-blue-400'
                }`}
              >
                30 Days
              </button>
              <button
                onClick={() => setTimeRange("90days")}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  timeRange === "90days" 
                    ? 'bg-white text-blue-600' 
                    : 'text-white hover:bg-blue-400'
                }`}
              >
                90 Days
              </button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard
            icon={<FiBriefcase />}
            title="Job Postings"
            value={insights.jobPostings}
            change={insights.jobPostingsChange}
            color="blue"
          />
          
          <MetricCard
            icon={<FiUsers />}
            title="Active Users"
            value={insights.activeUsers}
            change={insights.activeUsersChange}
            color="green"
          />
          
          <MetricCard
            icon={<FiBarChart2 />}
            title="Total Applications"
            value={insights.totalApplications}
            change={insights.applicationsChange}
            color="purple"
          />
        </div>

        {/* Charts Section */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Applications Trend Chart */}
          <ChartCard
            icon={<FiTrendingUp className="text-blue-500" />}
            title="Applications Trend"
          >
            <ResponsiveContainer width="100%" height={300}>
              <BarChart 
                data={applicationsData}
                aria-label="Applications trend over time"
                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: '#6b7280' }}
                  tickLine={false}
                />
                <YAxis 
                  tick={{ fill: '#6b7280' }}
                  tickLine={false}
                />
                <Tooltip 
                  contentStyle={{
                    background: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar 
                  dataKey="applications" 
                  fill="#3B82F6" 
                  radius={[4, 4, 0, 0]}
                  name="Applications"
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Top Categories Chart */}
          <ChartCard
            icon={<FiAward className="text-blue-500" />}
            title="Top Categories"
          >
            <ResponsiveContainer width="100%" height={300}>
              <BarChart 
                data={categoriesData}
                layout="vertical"
                aria-label="Top job categories by applications"
                margin={{ left: 30, top: 5, right: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f0f0f0" />
                <XAxis type="number" tick={{ fill: '#6b7280' }} tickLine={false} />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  width={100}
                  tick={{ fill: '#6b7280' }}
                  tickLine={false}
                />
                <Tooltip 
                  contentStyle={{
                    background: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar 
                  dataKey="applications" 
                  fill="#10B981" 
                  radius={[0, 4, 4, 0]}
                  name="Applications"
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Top Categories List */}
        <div className="p-6">
          <h2 className="text-lg font-medium mb-4 flex items-center">
            <FiBriefcase className="mr-2 text-blue-500" /> Most Applied Categories
          </h2>
          <div className="space-y-3">
            {insights.mostAppliedCategories.map((cat, index) => (
              <motion.div
                key={cat._id._id}
                whileHover={{ x: 5 }}
                className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-100"
              >
                <div className="flex items-center">
                  <span className="text-gray-500 w-6">{index + 1}.</span>
                  <span className="font-medium">{cat._id.name}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-bold text-blue-600 mr-2">{cat.totalApplications}</span>
                  <span className="text-sm text-gray-500">applications</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Reusable Metric Card Component
const MetricCard = ({ icon, title, value, change, color }) => {
  const colorClasses = {
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-100',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      changePositive: 'bg-green-100 text-green-800',
      changeNegative: 'bg-red-100 text-red-800'
    },
    green: {
      bg: 'bg-green-50',
      border: 'border-green-100',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      changePositive: 'bg-green-100 text-green-800',
      changeNegative: 'bg-red-100 text-red-800'
    },
    purple: {
      bg: 'bg-purple-50',
      border: 'border-purple-100',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      changePositive: 'bg-green-100 text-green-800',
      changeNegative: 'bg-red-100 text-red-800'
    }
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className={`rounded-xl p-6 border ${colorClasses[color].bg} ${colorClasses[color].border}`}
    >
      <div className="flex items-center mb-4">
        <div className={`p-3 rounded-full ${colorClasses[color].iconBg} ${colorClasses[color].iconColor} mr-4`}>
          {React.cloneElement(icon, { className: "text-xl" })}
        </div>
        <h3 className="text-lg font-medium text-gray-700">{title}</h3>
      </div>
      <div className="flex justify-between items-end">
        <p className="text-3xl font-bold text-gray-800">{value}</p>
        <span className={`px-2 py-1 rounded-full text-xs ${
          change >= 0 
            ? colorClasses[color].changePositive 
            : colorClasses[color].changeNegative
        }`}>
          {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
        </span>
      </div>
    </motion.div>
  );
};

// Reusable Chart Card Component
const ChartCard = ({ icon, title, children }) => {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
      <h3 className="text-lg font-medium mb-4 flex items-center">
        {icon} <span className="ml-2">{title}</span>
      </h3>
      {children}
    </div>
  );
};

export default Analytics;