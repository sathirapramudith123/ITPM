import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RegisterForm from './pages/RegisterForm';
import LoginForm from './pages/LoginFrom';
import ResumeProfile from './pages/ResumeProfile';
import JobVacancyManager from './pages/JobPost';
import CompanyManager from './pages/Company';
import PlatformUsageDashboard from './pages/AdminAnalyses';
import JobFeedbackManager from './pages/feedback';
import HomePage from './components/HomePage';

function App() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [jobs, setJobs] = useState([]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage feedbacks={feedbacks} jobs={jobs} />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/resume" element={<ResumeProfile />} />
            <Route path="/jobs" element={<JobVacancyManager jobs={jobs} setJobs={setJobs} />} />
            <Route path="/companies" element={<CompanyManager />} />
            <Route path="/admin" element={<PlatformUsageDashboard />} />
            <Route path="/feedback" element={<JobFeedbackManager feedbacks={feedbacks} setFeedbacks={setFeedbacks} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
