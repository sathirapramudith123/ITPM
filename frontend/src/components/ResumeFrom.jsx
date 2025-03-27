import { useState } from 'react';
import api from '../api.js';

function ResumeForm({ existingResume, onSubmit }) {
  const [formData, setFormData] = useState(existingResume || {
    personalInfo: { fullName: '', phone: '', address: '', linkedin: '', portfolio: '' },
    education: [{ institution: '', degree: '', startDate: '', endDate: '', currentlyStudying: false }],
    experience: [{ company: '', position: '', startDate: '', endDate: '', currentlyWorking: false, responsibilities: [''] }],
    skills: [''],
    careerPreferences: { jobTypes: [], categories: [], locations: [], minSalary: '' }
  });

  const handleChange = (e, section, index, field) => {
    const updatedData = { ...formData };
    if (section === 'personalInfo') {
      updatedData.personalInfo[field] = e.target.value;
    } else if (section === 'careerPreferences') {
      updatedData.careerPreferences[field] = e.target.value;
    } else {
      updatedData[section][index][field] = e.target.value;
    }
    setFormData(updatedData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      alert('Resume saved successfully!');
    } catch (error) {
      alert('Error saving resume: ' + error.response?.data?.message || error.message);
    }
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        { institution: '', degree: '', startDate: '', endDate: '', currentlyStudying: false }
      ]
    });
  };

  const removeEducation = (index) => {
    const updatedEducation = [...formData.education];
    updatedEducation.splice(index, 1);
    setFormData({
      ...formData,
      education: updatedEducation
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Resume Builder</h1>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Info Section */}
        <div className="bg-blue-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={formData.personalInfo.fullName}
                onChange={(e) => handleChange(e, 'personalInfo', null, 'fullName')}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="text"
                value={formData.personalInfo.phone}
                onChange={(e) => handleChange(e, 'personalInfo', null, 'phone')}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="(123) 456-7890"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
              <input
                type="text"
                value={formData.personalInfo.linkedin}
                onChange={(e) => handleChange(e, 'personalInfo', null, 'linkedin')}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="linkedin.com/in/yourprofile"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Portfolio</label>
              <input
                type="text"
                value={formData.personalInfo.portfolio}
                onChange={(e) => handleChange(e, 'personalInfo', null, 'portfolio')}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="yourportfolio.com"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input
                type="text"
                value={formData.personalInfo.address}
                onChange={(e) => handleChange(e, 'personalInfo', null, 'address')}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="123 Main St, City, Country"
              />
            </div>
          </div>
        </div>

        {/* Education Section */}
        <div className="bg-green-50 p-6 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-green-800">Education</h2>
            <button
              type="button"
              onClick={addEducation}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Add Education
            </button>
          </div>
          
          {formData.education.map((edu, index) => (
            <div key={index} className="mb-6 p-4 bg-white rounded-md shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium text-gray-700">Education #{index + 1}</h3>
                {formData.education.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeEducation(index)}
                    className="text-red-500 hover:text-red-700 text-sm font-medium"
                  >
                    Remove
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                  <input
                    type="text"
                    placeholder="University of Example"
                    value={edu.institution}
                    onChange={(e) => handleChange(e, 'education', index, 'institution')}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                  <input
                    type="text"
                    placeholder="Bachelor of Science"
                    value={edu.degree}
                    onChange={(e) => handleChange(e, 'education', index, 'degree')}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={edu.startDate}
                    onChange={(e) => handleChange(e, 'education', index, 'startDate')}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="date"
                    value={edu.endDate}
                    onChange={(e) => handleChange(e, 'education', index, 'endDate')}
                    disabled={edu.currentlyStudying}
                    className={`w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 ${edu.currentlyStudying ? 'bg-gray-100' : ''}`}
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`currentlyStudying-${index}`}
                    checked={edu.currentlyStudying}
                    onChange={(e) => {
                      const updatedData = { ...formData };
                      updatedData.education[index].currentlyStudying = e.target.checked;
                      setFormData(updatedData);
                    }}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`currentlyStudying-${index}`} className="ml-2 block text-sm text-gray-700">
                    Currently studying here
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md shadow-sm transition-colors"
          >
            Save Resume
          </button>
        </div>
      </form>
    </div>
  );
}

export default ResumeForm;