// src/pages/ResumePage.jsx
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import ResumeForm from '../components/ResumeForm.jsx';
import ResumeDisplay from '../components/ResumeDisplay.jsx';
import resumeService from '../services/resumeService.jsx';
import { FaFileAlt } from 'react-icons/fa';

const ResumePage = () => {
  const { user } = useContext(AuthContext);
  const [resume, setResume] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const data = await resumeService.getResume();
      setResume(data);
    } catch (error) {
      console.log('No resume yet or error:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrUpdate = async (data) => {
    try {
      if (resume) {
        const updatedResume = await resumeService.updateResume(data);
        setResume(updatedResume.resume); // Adjust based on your API response structure
        setIsEditing(false);
      } else {
        const newResume = await resumeService.createResume(data);
        setResume(newResume.resume); // Adjust based on your API response structure
      }
      alert('Resume saved successfully!');
    } catch (error) {
      alert(error.message || 'Something went wrong');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your resume?')) {
      try {
        await resumeService.deleteResume();
        setResume(null);
        alert('Resume deleted successfully!');
      } catch (error) {
        alert(error.message || 'Error deleting resume');
      }
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (user?.role !== 'job_seeker') {
    return (
      <div className="text-center mt-10 text-red-600">
        Only job seekers can access this page.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-800 mb-6 flex items-center">
        <FaFileAlt className="mr-2" /> My Resume
      </h1>
      {isEditing || !resume ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            {resume ? 'Edit Resume' : 'Create Resume'}
          </h2>
          <ResumeForm initialData={resume || {}} onSubmit={handleCreateOrUpdate} />
          {resume && (
            <button
              onClick={() => setIsEditing(false)}
              className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <ResumeDisplay resume={resume} onEdit={() => setIsEditing(true)} onDelete={handleDelete} />
        </div>
      )}
    </div>
  );
};

export default ResumePage;