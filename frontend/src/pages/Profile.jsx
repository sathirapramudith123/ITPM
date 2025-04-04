import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Profile() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    summary: '',
    skills: [],
    phone: '',
    education: [],
  });
  const [loading, setLoading] = useState(true);

  // Fetch resume on mount
  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/resume');
        const resume = response.data || { summary: '', skills: [], phone: '', education: [] };
        setFormData(resume);
      } catch (error) {
        console.error('Error fetching resume:', error);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchResume();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300">
        <div className="p-6 bg-white rounded-lg shadow-lg text-center transform transition duration-500 hover:scale-105">
          <h2 className="text-xl font-semibold text-gray-700">Please log in to view your profile.</h2>
        </div>
      </div>
    );
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 bg-indigo-200 rounded-full flex items-center justify-center text-3xl font-bold text-indigo-600">
            {user.email[0].toUpperCase()}
          </div>
          <h1 className="mt-4 text-3xl font-extrabold text-indigo-600">{user.profile?.name || user.email.split('@')[0]}</h1>
          <p className="text-gray-600 mt-2">Role: {user.role}</p>
        </div>

        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-indigo-600">Resume Details</h2>
            <button
              onClick={() => navigate('/resume')}
              className="py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300"
            >
              Resume
            </button>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-indigo-500 mb-2">Summary About Me</h3>
              <p className="text-gray-700">{formData.summary || 'No summary provided'}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-indigo-500 mb-2">Skills</h3>
              <ul className="grid grid-cols-2 gap-2">
                {formData.skills.length > 0 ? (
                  formData.skills.map((skill, index) => (
                    <li key={index} className="text-gray-700 bg-white p-2 rounded-lg shadow-sm">
                      {skill}
                    </li>
                  ))
                ) : (
                  <li className="text-gray-700">No skills listed</li>
                )}
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-indigo-500 mb-2">Contact</h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  <span className="font-medium">Phone:</span> {formData.phone || 'Not provided'}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Email:</span> {user.email}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-indigo-500 mb-2">Education</h3>
              <div className="space-y-4">
                {formData.education.length > 0 ? (
                  formData.education.map((edu, index) => (
                    <div key={index}>
                      <p className="text-gray-700 font-medium">{edu.degree || 'No degree'}</p>
                      <p className="text-gray-600">
                        {edu.institution || 'No institution'} - {edu.years || 'No years'}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-700">No education listed</p>
                )}
              </div>
            </div>
          </div>
        </section>

        <button
          onClick={() => navigate('/')}
          className="w-full py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all duration-300"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default Profile;