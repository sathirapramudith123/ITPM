import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, PieChart, Pie,
  XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell,
} from 'recharts';
import axios from 'axios';

const PlatformUsageDashboard = () => {
  const [usageStats, setUsageStats] = useState({
    jobSeekers: {
      totalSignUps: 0,
      completedProfiles: 850,
      avgJobsApplied: 5.2,
    },
    jobEmployers: {
      totalEmployers: 0,
      avgJobsPosted: 12,
      avgViewsPerJob: 150,
      avgApplicationsPerJob: 45,
    },
    admins: 0, // ✅ Added admin state
  });

  const [employerJobCounts, setEmployerJobCounts] = useState([]);

  useEffect(() => {
    const fetchUserCounts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/users/counts');
        setUsageStats(prev => ({
          ...prev,
          jobSeekers: {
            ...prev.jobSeekers,
            totalSignUps: res.data.jobSeekers,
          },
          jobEmployers: {
            ...prev.jobEmployers,
            totalEmployers: res.data.jobEmployers,
          },
          admins: res.data.admins, // ✅ Set admin count
        }));
      } catch (error) {
        console.error('Error fetching user counts:', error);
      }
    };

    fetchUserCounts();
  }, []);

  useEffect(() => {
    const fetchEmployerJobCounts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/jobs/stats/employer-job-counts');
        setEmployerJobCounts(res.data);
      } catch (error) {
        console.error('Error fetching employer job counts:', error);
      }
    };

    fetchEmployerJobCounts();
  }, []);

  const userTypePieData = [
    { name: 'Job Seekers', value: usageStats.jobSeekers.totalSignUps },
    { name: 'Job Employers', value: usageStats.jobEmployers.totalEmployers },
    { name: 'Admins', value: usageStats.admins }, // ✅ Added admins to chart
  ];

  const pieColors = ['#4299e1', '#48bb78', '#f56565']; // ✅ Colors for Job Seeker, Employer, Admin

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Platform Usage Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Pie Chart for User Type Distribution */}
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-xl font-semibold mb-4 text-center">User Type Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                dataKey="value"
                data={userTypePieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {userTypePieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart for Average Employer Stats */}
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-xl font-semibold mb-4 text-center">Average Employer Stats</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={[usageStats.jobEmployers]}>
              <XAxis dataKey="avgJobsPosted" hide />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="avgJobsPosted" fill="#48bb78" name="Avg Jobs Posted" />
              <Bar dataKey="avgViewsPerJob" fill="#4299e1" name="Views per Job" />
              <Bar dataKey="avgApplicationsPerJob" fill="#f6ad55" name="Applications per Job" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar Chart: Total Jobs Posted by Each Employer */}
      <div className="bg-white rounded-xl shadow p-4 mt-10">
        <h2 className="text-xl font-semibold mb-4 text-center">Jobs Posted by Employers</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={employerJobCounts}>
            <XAxis
              dataKey="companyName"
              tick={{ fontSize: 12 }}
              interval={0}
              angle={-20}
              textAnchor="end"
            />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalJobsPosted" fill="#805ad5" name="Total Jobs Posted" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PlatformUsageDashboard;
