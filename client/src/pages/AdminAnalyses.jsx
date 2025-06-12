import React from 'react';
import {
  BarChart, Bar, PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const usageStats = {
  jobSeekers: {
    totalSignUps: 1200,
    completedProfiles: 850,
    avgJobsApplied: 5.2,
  },
  jobEmployers: {
    totalEmployers: 200,
    avgJobsPosted: 12,
    avgViewsPerJob: 150,
    avgApplicationsPerJob: 45,
  },
  weeklyActivity: [
    { day: 'Mon', seekers: 300, employers: 50 },
    { day: 'Tue', seekers: 350, employers: 60 },
    { day: 'Wed', seekers: 400, employers: 65 },
    { day: 'Thu', seekers: 370, employers: 58 },
    { day: 'Fri', seekers: 390, employers: 62 },
    { day: 'Sat', seekers: 200, employers: 30 },
    { day: 'Sun', seekers: 180, employers: 25 },
  ]
};

const PlatformUsageDashboard = () => {
  const profileCompletionRate = ((usageStats.jobSeekers.completedProfiles / usageStats.jobSeekers.totalSignUps) * 100).toFixed(1);

  const pieData = [
    { name: 'Completed', value: usageStats.jobSeekers.completedProfiles },
    { name: 'Incomplete', value: usageStats.jobSeekers.totalSignUps - usageStats.jobSeekers.completedProfiles }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Platform Usage Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Pie Chart for Profile Completion */}
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-xl font-semibold mb-4 text-center">Job Seeker Profile Completion</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie dataKey="value" data={pieData} cx="50%" cy="50%" outerRadius={80} fill="#3182ce" label />
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart for Employer Stats */}
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-xl font-semibold mb-4 text-center">Employer Job Statistics</h2>
          <BarChart width={400} height={250} data={[usageStats.jobEmployers]}>
            <XAxis dataKey="avgJobsPosted" hide />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="avgJobsPosted" fill="#48bb78" name="Avg Jobs Posted" />
            <Bar dataKey="avgViewsPerJob" fill="#4299e1" name="Views per Job" />
            <Bar dataKey="avgApplicationsPerJob" fill="#f6ad55" name="Applications per Job" />
          </BarChart>
        </div>

        {/* Line Chart for Weekly Activity */}
        <div className="col-span-1 md:col-span-2 bg-white rounded-xl shadow p-4">
          <h2 className="text-xl font-semibold mb-4 text-center">Weekly Activity</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={usageStats.weeklyActivity}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="seekers" stroke="#63b3ed" name="Job Seekers" />
              <Line type="monotone" dataKey="employers" stroke="#68d391" name="Job Employers" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PlatformUsageDashboard;
