import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import JobSeekerDashboard from "./pages/JobSeekerDashboard";
import EmployerDashboard from "./pages/EmployerDashboard";
import JobListings from "./pages/JobListings";
import JobDetail from "./components/JobDetails";

function App() {
  const isAuthenticated = !!localStorage.getItem("token");
  const role = localStorage.getItem("role");

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={isAuthenticated && role === "admin" ? <AdminDashboard /> : <Navigate to="/login" />} />
        <Route path="/job-seeker" element={isAuthenticated && role === "job_seeker" ? <JobSeekerDashboard /> : <Navigate to="/login" />} />
        <Route path="/employer" element={isAuthenticated && role === "employer" ? <EmployerDashboard /> : <Navigate to="/login" />} />
        <Route path="/jobs" element={<JobListings />} />
        <Route path="/jobs/:id" element={<JobDetail />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;