import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function AdminDashboard() {
  const { user } = useContext(AuthContext);

  if (!user || user.role !== 'admin') {
    return <div className="container mx-auto p-4">Unauthorized access.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p>Manage categories, users, and analytics here.</p>
    </div>
  );
}

export default AdminDashboard;