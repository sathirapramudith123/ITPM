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
    } catch (err) {
      alert(err.response?.data?.error || 'Something went wrong!');
    }
  };

  const handleEdit = (profile) => {
    setFormData(profile);
    setEditId(profile._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this profile?')) {
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

  return (
    <div className="max-w-5xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Resume Profile Manager</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {[
          { name: 'firstName', type: 'text' },
          { name: 'lastName', type: 'text' },
          { name: 'email', type: 'email' },
          { name: 'phone', type: 'text' },
          { name: 'educationTitle', type: 'text' },
          { name: 'educationDescription', type: 'text' },
          { name: 'educationStart', type: 'date' },
          { name: 'educationEnd', type: 'date' },
          { name: 'skills', type: 'text' },
          { name: 'workStart', type: 'date' },
          { name: 'workEnd', type: 'date' },
        ].map(({ name, type }) => (
          <input
            key={name}
            type={type}
            name={name}
            value={formData[name]}
            onChange={handleChange}
            placeholder={name.replace(/([A-Z])/g, ' $1')}
            className="p-2 border rounded-md"
            required
          />
        ))}
        <button type="submit" className="col-span-full bg-blue-600 text-white py-2 rounded-md">
          {editId ? 'Update Profile' : 'Create Profile'}
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-4">All Profiles</h2>
      <div className="grid gap-4">
        {profiles.map((profile) => (
          <div key={profile._id} className="border p-4 rounded-md shadow-sm bg-gray-50">
            <p><strong>Name:</strong> {profile.firstName} {profile.lastName}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Phone:</strong> {profile.phone}</p>
            <p><strong>Education:</strong> {profile.educationTitle} - {profile.educationDescription} ({profile.educationStart} to {profile.educationEnd})</p>
            <p><strong>Skills:</strong> {profile.skills}</p>
            <p><strong>Work:</strong> {profile.workStart} to {profile.workEnd}</p>
            <div className="mt-2 flex gap-2">
              <button onClick={() => handleEdit(profile)} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
              <button onClick={() => handleDelete(profile._id)} className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
              <button onClick={() => generatePDF(profile)} className="bg-green-600 text-white px-3 py-1 rounded">Download PDF</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumeProfile;
