import React, { useEffect, useState } from "react";
import axios from "../axios";
import { motion } from "framer-motion";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [roleFilter, setRoleFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/admin/users", { params: { role: roleFilter } });
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [roleFilter]);

  const handleRoleChange = async (userId, role) => {
    try {
      await axios.post("/admin/users/roles", { userId, role });
      setUsers(users.map((user) => (user._id === userId ? { ...user, role } : user)));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`/admin/users/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="text-center p-8">Loading...</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <h3 className="text-2xl font-semibold mb-4">User Management</h3>
      <div className="mb-4 flex items-center space-x-2">
        <label className="text-sm">Filter by Role:</label>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">All</option>
          <option value="job_seeker">Job Seeker</option>
          <option value="employer">Employer</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full card">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">Username</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Role</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <motion.tr key={user._id} whileHover={{ backgroundColor: "#f1f5f9" }} className="border-b">
                <td className="py-2 px-4">{user.username}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="p-1 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="job_seeker">Job Seeker</option>
                    <option value="employer">Employer</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="py-2 px-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDelete(user._id)}
                    className="btn bg-red-500 text-white px-3 py-1 hover:bg-red-600"
                  >
                    Delete
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default UserManagement;