import React, { useEffect, useState } from "react";
import axios from "../axios";
import { motion } from "framer-motion";

const Analytics = () => {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const res = await axios.get("/analytics/insights");
        setInsights(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchInsights();
  }, []);

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (!insights) return <div className="text-center p-8">No data available</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <h3 className="text-2xl font-semibold mb-4">Platform Analytics</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div whileHover={{ scale: 1.02 }} className="card">
          <h4 className="text-lg font-medium">Total Job Postings</h4>
          <p className="text-3xl font-bold text-primary">{insights.jobPostings}</p>
        </motion.div>
        <motion.div whileHover={{ scale: 1.02 }} className="card">
          <h4 className="text-lg font-medium">Active Users</h4>
          <p className="text-3xl font-bold text-primary">{insights.activeUsers}</p>
        </motion.div>
      </div>
      <div className="mt-6">
        <h4 className="text-lg font-medium mb-2">Most Applied Categories</h4>
        <ul className="space-y-2">
          {insights.mostAppliedCategories.map((cat) => (
            <motion.li
              key={cat._id._id}
              whileHover={{ scale: 1.02 }}
              className="card flex justify-between"
            >
              <span>{cat._id.name}</span>
              <span className="font-bold">{cat.totalApplications} applications</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default Analytics;