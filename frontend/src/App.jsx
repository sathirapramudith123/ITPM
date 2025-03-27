import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Jobs from './pages/Jobs.jsx'
import ResumeBuilder from './pages/ResumerBuilder.jsx'
import CareerResources from './pages/CareerResources.jsx'
import Notifications from './pages/Notifications.jsx'
import EmployerDashboard from './pages/EmployerDashboard.jsx'
import Footer from './components/Footer.jsx'
import About from './pages/About.jsx'
import Profile from './pages/Profile.jsx'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/resume" element={<ResumeBuilder />} />
          <Route path="/resources" element={<CareerResources />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/employer" element={<EmployerDashboard />} />
          <Route path="/about" element={<About />} /> 
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App