
import React, { useState } from 'react';

const ResumeForm = ({ initialData = {}, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    email: initialData.email || '',
    phone: initialData.phone || '',
    skills: initialData.skills?.join(', ') || '',
    experience: initialData.experience || [{ company: '', role: '', startDate: '', endDate: '', description: '' }],
    education: initialData.education || [{ institution: '', degree: '', startDate: '', endDate: '' }],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (e, index, field, type) => {
    const updatedArray = [...formData[type]];
    updatedArray[index][field] = e.target.value;
    setFormData({ ...formData, [type]: updatedArray });
  };

  const addField = (type) => {
    setFormData({
      ...formData,
      [type]: [...formData[type], type === 'experience'
        ? { company: '', role: '', startDate: '', endDate: '', description: '' }
        : { institution: '', degree: '', startDate: '', endDate: '' }],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSubmit = {
      ...formData,
      skills: formData.skills.split(',').map(skill => skill.trim()).filter(skill => skill),
    };
    onSubmit(dataToSubmit);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-gray-700 font-semibold mb-1">Full Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="John Doe"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="john.doe@example.com"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-1">Phone</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="123-456-7890"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-1">Skills (comma-separated)</label>
        <input
          type="text"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="JavaScript, React, Node.js"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold text-blue-800 mb-3">Experience</h3>
        {formData.experience.map((exp, index) => (
          <div key={index} className="border border-gray-200 p-4 rounded-lg mb-4 space-y-3">
            <input
              type="text"
              placeholder="Company"
              value={exp.company}
              onChange={(e) => handleArrayChange(e, index, 'company', 'experience')}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
            <input
              type="text"
              placeholder="Role"
              value={exp.role}
              onChange={(e) => handleArrayChange(e, index, 'role', 'experience')}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
            <div className="flex space-x-3">
              <input
                type="date"
                value={exp.startDate}
                onChange={(e) => handleArrayChange(e, index, 'startDate', 'experience')}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
              <input
                type="date"
                value={exp.endDate}
                onChange={(e) => handleArrayChange(e, index, 'endDate', 'experience')}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <textarea
              placeholder="Description"
              value={exp.description}
              onChange={(e) => handleArrayChange(e, index, 'description', 'experience')}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              rows="3"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => addField('experience')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Experience
        </button>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-blue-800 mb-3">Education</h3>
        {formData.education.map((edu, index) => (
          <div key={index} className="border border-gray-200 p-4 rounded-lg mb-4 space-y-3">
            <input
              type="text"
              placeholder="Institution"
              value={edu.institution}
              onChange={(e) => handleArrayChange(e, index, 'institution', 'education')}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
            <input
              type="text"
              placeholder="Degree"
              value={edu.degree}
              onChange={(e) => handleArrayChange(e, index, 'degree', 'education')}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
            <div className="flex space-x-3">
              <input
                type="date"
                value={edu.startDate}
                onChange={(e) => handleArrayChange(e, index, 'startDate', 'education')}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
              <input
                type="date"
                value={edu.endDate}
                onChange={(e) => handleArrayChange(e, index, 'endDate', 'education')}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addField('education')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Education
        </button>
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white p-3 rounded-lg hover:from-blue-700 hover:to-blue-900 transition-colors"
      >
        {initialData.name ? 'Update Resume' : 'Create Resume'}
      </button>
    </form>
  );
};

export default ResumeForm;