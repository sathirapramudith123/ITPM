import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ResumeForm() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    summary: '',
    skills: [],
    phone: '',
    email: user?.email || '',
    education: [{ degree: '', institution: '', years: '' }],
  });
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/resume');
        const resume = response.data || {
          summary: '',
          skills: [],
          phone: '',
          email: user?.email || '',
          education: [{ degree: '', institution: '', years: '' }],
        };
        setFormData(resume);
        setUser((prev) => ({ ...prev, profile: { ...prev.profile, resume } }));
      } catch (error) {
        //console.error('Error fetching resume:', error);
        setError('Failed to load resume. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchResume();
  }, [user, setUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillsChange = (e) => {
    const skillsArray = e.target.value.split(',').map((skill) => skill.trim()).filter(Boolean);
    setFormData((prev) => ({ ...prev, skills: skillsArray }));
  };

  const handleEducationChange = (e, field) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      education: [{ ...prev.education[0], [field]: value }],
    }));
  };

  const validateForm = () => {
    if (!formData.summary && !formData.skills.length && !formData.phone && !formData.education[0].degree) {
      setError('Please fill in at least one field to save your resume.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setActionLoading(true);
    setError(null);

    try {
      const hasExistingResume = formData.summary || formData.skills.length || formData.phone || formData.education[0].degree;
      const method = hasExistingResume ? axios.put : axios.post;
      const response = await method('http://localhost:5000/api/resume', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setUser((prev) => ({ ...prev, profile: { ...prev.profile, resume: response.data } }));
      navigate('/profile');
    } catch (error) {
      console.error(hasExistingResume ? 'Error updating resume:' : 'Error creating resume:', {
        message: error.message,
        response: error.response ? error.response.data : 'No response data',
        status: error.response ? error.response.status : 'No status',
        config: error.config,
      });
      setError(hasExistingResume ? 'Failed to update resume.' : 'Failed to create resume.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete your resume?')) return;
    setActionLoading(true);
    setError(null);

    try {
      await axios.delete('http://localhost:5000/api/resume');
      setFormData({
        summary: '',
        skills: [],
        phone: '',
        email: user?.email || '',
        education: [{ degree: '', institution: '', years: '' }],
      });
      setUser((prev) => ({ ...prev, profile: { ...prev.profile, resume: null } }));
      navigate('/profile');
    } catch (error) {
      console.error('Error deleting resume:', error);
      setError('Failed to delete resume. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300">
        <div className="p-6 bg-white rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-semibold text-gray-700">Please log in to edit your resume.</h2>
        </div>
      </div>
    );
  }

  if (loading) return <div className="text-center text-gray-600">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-6">
      <div className="bg-white max-w-2xl w-full rounded-xl shadow-2xl p-8">
        <h1 className="text-3xl font-extrabold text-center text-indigo-600 mb-6">
          Edit Resume
        </h1>

        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit}>
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-indigo-500 mb-2">Summary About Me</h2>
            <textarea
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-300"
              rows="4"
              placeholder="Write a brief summary about yourself..."
            />
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-indigo-500 mb-2">Skills</h2>
            <input
              type="text"
              name="skills"
              value={formData.skills.join(', ')}
              onChange={handleSkillsChange}
              placeholder="Enter skills separated by commas (e.g., JavaScript, React)"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-300"
            />
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-indigo-500 mb-2">Contact</h2>
            <div className="space-y-3">
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone (e.g., +1 123-456-7890)"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-300"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-300"
              />
            </div>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-indigo-500 mb-2">Education</h2>
            <div className="space-y-3">
              <input
                type="text"
                value={formData.education[0].degree}
                onChange={(e) => handleEducationChange(e, 'degree')}
                placeholder="Degree (e.g., B.S. Computer Science)"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-300"
              />
              <input
                type="text"
                value={formData.education[0].institution}
                onChange={(e) => handleEducationChange(e, 'institution')}
                placeholder="Institution (e.g., University Name)"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-300"
              />
              <input
                type="text"
                value={formData.education[0].years}
                onChange={(e) => handleEducationChange(e, 'years')}
                placeholder="Years (e.g., 2018-2022)"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-300"
              />
            </div>
          </section>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-300"
              disabled={actionLoading}
            >
              {actionLoading ? 'Saving...' : 'Save Resume'}
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="flex-1 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-all duration-300"
              disabled={actionLoading}
            >
              {actionLoading ? 'Deleting...' : 'Delete Resume'}
            </button>
          </div>
          <button
            type="button"
            onClick={() => navigate('/profile')}
            className="w-full mt-4 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all duration-300"
          >
            Back to Profile
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResumeForm;