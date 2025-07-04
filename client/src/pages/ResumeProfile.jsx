import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';

const API_URL = 'http://localhost:5000/api/resumes';

const ResumeProfile = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    educationTitle: '',
    educationDescription: '',
    educationStart: '',
    educationEnd: '',
    skills: '',
    workStart: '',
    workEnd: '',
  });

  const [profiles, setProfiles] = useState([]);
  const [editId, setEditId] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    const res = await axios.get(API_URL);
    setProfiles(res.data);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`${API_URL}/${editId}`, formData);
      } else {
        await axios.post(API_URL, formData);
      }
      fetchProfiles();
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        educationTitle: '',
        educationDescription: '',
        educationStart: '',
        educationEnd: '',
        skills: '',
        workStart: '',
        workEnd: '',
      });
      setEditId(null);
      setIsFormVisible(false);
    } catch (err) {
      alert(err.response?.data?.error || 'Something went wrong!');
    }
  };

  const handleEdit = (profile) => {
    setFormData(profile);
    setEditId(profile._id);
    setIsFormVisible(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this profile?')) {
      await axios.delete(`${API_URL}/${id}`);
      fetchProfiles();
    }
  };

  const generatePDF = (profile) => {
    const doc = new jsPDF();
    const marginLeft = 15;
    let currentY = 20;

    doc.setFontSize(22);
    doc.setTextColor(40, 40, 40);
    doc.text(`${profile.firstName} ${profile.lastName}`, marginLeft, currentY);
    currentY += 10;

    doc.setFontSize(12);
    doc.setTextColor(70, 70, 70);
    doc.text(`Email: ${profile.email}`, marginLeft, currentY);
    currentY += 6;
    doc.text(`Phone: ${profile.phone}`, marginLeft, currentY);
    currentY += 10;

    doc.setFontSize(14);
    doc.setTextColor(0, 102, 204);
    doc.text('Education', marginLeft, currentY);
    currentY += 8;

    doc.setFontSize(12);
    doc.setTextColor(50, 50, 50);
    doc.text(`${profile.educationTitle} - ${profile.educationDescription}`, marginLeft, currentY);
    currentY += 6;
    doc.text(`From: ${profile.educationStart} To: ${profile.educationEnd}`, marginLeft, currentY);
    currentY += 10;

    doc.setFontSize(14);
    doc.setTextColor(0, 102, 204);
    doc.text('Skills', marginLeft, currentY);
    currentY += 8;

    doc.setFontSize(12);
    doc.setTextColor(50, 50, 50);
    doc.text(profile.skills, marginLeft, currentY);
    currentY += 10;

    doc.setFontSize(14);
    doc.setTextColor(0, 102, 204);
    doc.text('Work Experience', marginLeft, currentY);
    currentY += 8;

    doc.setFontSize(12);
    doc.setTextColor(50, 50, 50);
    doc.text(`From: ${profile.workStart} To: ${profile.workEnd}`, marginLeft, currentY);
    currentY += 20;

    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text("Generated via Resume Profile Manager", marginLeft, 285);

    doc.save(`${profile.firstName}_${profile.lastName}_Resume.pdf`);
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
    if (!isFormVisible && editId) {
      setEditId(null);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        educationTitle: '',
        educationDescription: '',
        educationStart: '',
        educationEnd: '',
        skills: '',
        workStart: '',
        workEnd: '',
      });
    }
  };

  const formatLabel = (name) => {
    return name
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase());
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Resume Profile Manager
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            Create, manage, and export professional resumes
          </p>
        </div>

        <div className="mb-8 flex justify-center">
          <button
            onClick={toggleFormVisibility}
            className={`px-6 py-3 rounded-md font-medium ${isFormVisible ? 'bg-gray-500 hover:bg-gray-600' : 'bg-blue-600 hover:bg-blue-700'} text-white transition-colors`}
          >
            {isFormVisible ? 'Cancel' : 'Create New Profile'}
          </button>
        </div>

        {isFormVisible && (
          <div className="bg-white shadow-md rounded-lg p-6 mb-10 transition-all duration-300">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              {editId ? 'Edit Profile' : 'Create New Profile'}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: 'firstName', type: 'text', colSpan: '' },
                { name: 'lastName', type: 'text', colSpan: '' },
                { name: 'email', type: 'email', colSpan: '' },
                { name: 'phone', type: 'text', colSpan: '' },
                { name: 'educationTitle', type: 'text', colSpan: 'md:col-span-2' },
                { name: 'educationDescription', type: 'text', colSpan: 'md:col-span-2' },
                { name: 'educationStart', type: 'date', colSpan: '' },
                { name: 'educationEnd', type: 'date', colSpan: '' },
                { name: 'skills', type: 'text', colSpan: 'md:col-span-2' },
                { name: 'workStart', type: 'date', colSpan: '' },
                { name: 'workEnd', type: 'date', colSpan: '' },
              ].map(({ name, type, colSpan }) => (
                <div key={name} className={`${colSpan}`}>
                  <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                    {formatLabel(name)}
                  </label>
                  <input
                    id={name}
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              ))}
              <div className="md:col-span-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {editId ? 'Update Profile' : 'Save Profile'}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Resume Profiles</h2>
          
          {profiles.length === 0 ? (
            <div className="bg-white shadow rounded-lg p-8 text-center">
              <p className="text-gray-500">No profiles found. Create your first resume profile!</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {profiles.map((profile) => (
                <div key={profile._id} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="flex-shrink-0 h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-bold text-lg">
                          {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {profile.firstName} {profile.lastName}
                        </h3>
                        <p className="text-sm text-gray-500">{profile.email}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Education</h4>
                        <p className="text-sm text-gray-900">
                          {profile.educationTitle} - {profile.educationDescription}
                        </p>
                        <p className="text-xs text-gray-500">
                          {profile.educationStart} to {profile.educationEnd}
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Skills</h4>
                        <p className="text-sm text-gray-900">{profile.skills}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Work Experience</h4>
                        <p className="text-xs text-gray-500">
                          {profile.workStart} to {profile.workEnd}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 px-6 py-4 flex justify-between">
                    <button
                      onClick={() => handleEdit(profile)}
                      className="text-sm font-medium text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </button>
                    <div className="flex space-x-4">
                      <button
                        onClick={() => handleDelete(profile._id)}
                        className="text-sm font-medium text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => generatePDF(profile)}
                        className="text-sm font-medium text-green-600 hover:text-green-800"
                      >
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeProfile;