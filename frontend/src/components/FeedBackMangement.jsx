import React, { useEffect, useState } from "react";
import axios from "../axios";
import { motion } from "framer-motion";

const FeedbackManagement = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await axios.get("/feedback/all");
        setFeedbacks(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeedback();
  }, []);

  const handleStatusUpdate = async (feedbackId, status) => {
    try {
      await axios.put(`/feedback/status/${feedbackId}`, { status });
      setFeedbacks(feedbacks.map((fb) => (fb._id === feedbackId ? { ...fb, status } : fb)));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="text-center p-8">Loading...</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <h3 className="text-2xl font-semibold mb-4">Feedback Management</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full card">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">User</th>
              <th className="py-2 px-4 text-left">Rating</th>
              <th className="py-2 px-4 text-left">Comment</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((fb) => (
              <motion.tr key={fb._id} whileHover={{ backgroundColor: "#f1f5f9" }} className="border-b">
                <td className="py-2 px-4">{fb.userId.username}</td>
                <td className="py-2 px-4">{fb.rating}</td>
                <td className="py-2 px-4">{fb.comment}</td>
                <td className="py-2 px-4">{fb.status}</td>
                <td className="py-2 px-4">
                  <select
                    value={fb.status}
                    onChange={(e) => handleStatusUpdate(fb._id, e.target.value)}
                    className="p-1 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="pending">Pending</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default FeedbackManagement;