// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import JobList from './pages/JobList.jsx';
import JobDetail from './pages/JobDetail.jsx';
import Profile from './pages/Profile.jsx';
import EmployerDashboard from './pages/EmployerDashboard.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import Feedback from './pages/Feedback.jsx';
import NotificationPage from './components/NotificationPage.jsx';
import ResumePage from './pages/ResumePage.jsx'; // Added ResumePage import
import ProtectedRoute from './components/ProtectedRoute.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/jobs" element={<JobList />} />
              <Route path="/jobs/:id" element={<JobDetail />} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route
                path="/resume"
                element={<ProtectedRoute><ResumePage /></ProtectedRoute>}
              /> {/* Added Resume route */}
              <Route
                path="/employer-dashboard"
                element={<ProtectedRoute><EmployerDashboard /></ProtectedRoute>}
              />
              <Route
                path="/admin-dashboard"
                element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>}
              />
              <Route path="/feedback/:jobId" element={<Feedback />} />
              <Route
                path="/notifications"
                element={<ProtectedRoute><NotificationPage /></ProtectedRoute>}
              />
              {/* Optional 404 route */}
              <Route
                path="*"
                element={<div className="text-center py-10 text-gray-700">404 - Page Not Found</div>}
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;