import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function ResumeForm() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Initial state for the form
  const [formData, setFormData] = useState({
    summary: 'A dedicated professional with a passion for technology and innovation.',
    skills: ['JavaScript', 'React', 'Node.js', 'CSS'],
    phone: '(555) 123-4567',
    email: user?.email || '',
    education: [
      {
        degree: 'Bachelor of Science in Computer Science',
        institution: 'University Name',
        years: '2018-2022',
      },
    ],
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle skills (comma-separated input)
  const handleSkillsChange = (e) => {
    const skillsArray = e.target.value.split(',').map((skill) => skill.trim());
    setFormData((prev) => ({ ...prev, skills: skillsArray }));
  };

  // Handle education change (simplified for one entry)
  const handleEducationChange = (e, field) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      education: [{ ...prev.education[0], [field]: value }],
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you could save the data to AuthContext, localStorage, or an API
    console.log('Form submitted:', formData);
    navigate('/resume'); // Redirect to the resume display page
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

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white max-w-2xl w-full rounded-xl shadow-2xl p-8"
      >
        <h1 className="text-3xl font-extrabold text-center text-indigo-600 mb-6">
          Edit Resume
        </h1>

        {/* Summary */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-indigo-500 mb-2">Summary About Me</h2>
          <textarea
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-300"
            rows="4"
          />
        </section>

        {/* Skills */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-indigo-500 mb-2">Skills</h2>
          <input
            type="text"
            name="skills"
            value={formData.skills.join(', ')}
            onChange={handleSkillsChange}
            placeholder="Enter skills separated by commas"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-300"
          />
        </section>

        {/* Contact */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-indigo-500 mb-2">Contact</h2>
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
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-300"
              //disabled // Email might be tied to the user account
            />
          </div>
        </section>

        {/* Education */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-indigo-500 mb-2">Education</h2>
          <div className="space-y-3">
            <input
              type="text"
              value={formData.education[0].degree}
              onChange={(e) => handleEducationChange(e, 'degree')}
              placeholder="Degree"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-300"
            />
            <input
              type="text"
              value={formData.education[0].institution}
              onChange={(e) => handleEducationChange(e, 'institution')}
              placeholder="Institution"
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

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-300"
        >
          Save Resume
        </button>
      </form>
    </div>
  );
}

export default ResumeForm;