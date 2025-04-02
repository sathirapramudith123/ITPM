import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Profile() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
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
        setUser((prev) => ({ ...prev, profile: { ...prev.profile, resume } }));
      } catch (error) {
        console.error('Error fetching resume:', error);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchResume();
  }, [user, setUser]);

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

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillsChange = (e) => {
    const skillsArray = e.target.value.split(',').map((skill) => skill.trim());
    setFormData((prev) => ({ ...prev, skills: skillsArray }));
  };

  const handleEducationChange = (index, field, value) => {
    const newEducation = [...formData.education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    setFormData((prev) => ({ ...prev, education: newEducation }));
  };

  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [...prev.education, { degree: '', institution: '', years: '' }],
    }));
  };

  const removeEducation = (index) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  // CRUD Handlers
  const handleCreate = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/resume', formData);
      setUser((prev) => ({ ...prev, profile: { ...prev.profile, resume: response.data } }));
      setIsEditing(false);
    } catch (error) {
      console.error('Error creating resume:', error);
    }
  };

  const handleSave = async () => {
    try {
      const response = await axios.put('http://localhost:5000/api/resume', formData);
      setUser((prev) => ({ ...prev, profile: { ...prev.profile, resume: response.data } }));
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating resume:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your resume?')) {
      try {
        const response = await axios.delete('http://localhost:5000/api/resume');
        setFormData({ summary: '', skills: [], phone: '', education: [] });
        setUser((prev) => ({ ...prev, profile: { ...prev.profile, resume: response.data } }));
      } catch (error) {
        console.error('Error deleting resume:', error);
      }
    }
  };

  const handleCancel = () => {
    setFormData(user.profile?.resume || { summary: '', skills: [], phone: '', education: [] });
    setIsEditing(false);
  };

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
            {!isEditing && (
              <div className="space-x-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300"
                >
                  Edit Resume
                </button>
                <button
                  onClick={handleDelete}
                  className="py-2 px-4 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-all duration-300"
                >
                  Delete Resume
                </button>
              </div>
            )}
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-indigo-500 mb-2">Summary About Me</h3>
              {isEditing ? (
                <textarea
                  name="summary"
                  value={formData.summary}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-300"
                  rows="4"
                />
              ) : (
                <p className="text-gray-700">{formData.summary || 'No summary provided'}</p>
              )}
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-indigo-500 mb-2">Skills</h3>
              {isEditing ? (
                <input
                  type="text"
                  name="skills"
                  value={formData.skills.join(', ')}
                  onChange={handleSkillsChange}
                  placeholder="Enter skills separated by commas"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-300"
                />
              ) : (
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
              )}
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-indigo-500 mb-2">Contact</h3>
              {isEditing ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-300"
                  />
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    disabled
                    className="w-full p-3 border rounded-lg bg-gray-100"
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-gray-700">
                    <span className="font-medium">Phone:</span> {formData.phone || 'Not provided'}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Email:</span> {user.email}
                  </p>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-xl font-semibold text-indigo-500 mb-2">Education</h3>
              {isEditing ? (
                <div className="space-y-4">
                  {formData.education.map((edu, index) => (
                    <div key={index} className="space-y-3">
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                        placeholder="Degree"
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-300"
                      />
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                        placeholder="Institution"
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-300"
                      />
                      <input
                        type="text"
                        value={edu.years}
                        onChange={(e) => handleEducationChange(index, 'years', e.target.value)}
                        placeholder="Years (e.g., 2018-2022)"
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-300"
                      />
                      <button
                        onClick={() => removeEducation(index)}
                        className="py-1 px-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={addEducation}
                    className="py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Add Education
                  </button>
                </div>
              ) : (
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
              )}
            </div>
          </div>

          {isEditing && (
            <div className="flex space-x-4 mt-6">
              <button
                onClick={formData.summary || formData.skills.length || formData.phone || formData.education.length ? handleSave : handleCreate}
                className="flex-1 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300"
              >
                {formData.summary || formData.skills.length || formData.phone || formData.education.length ? 'Save' : 'Create'}
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          )}
        </section>

        {!isEditing && (
          <button
            onClick={() => navigate('/')}
            className="w-full py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all duration-300"
          >
            Back to Home
          </button>
        )}
      </div>
    </div>
  );
}

export default Profile;