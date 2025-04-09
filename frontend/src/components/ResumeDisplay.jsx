
import React from 'react';

const ResumeDisplay = ({ resume, onEdit, onDelete }) => {
  if (!resume) return <p className="text-gray-500 text-center">No resume found.</p>;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold">{resume.name}</h2>
        <p className="mt-2">{resume.email}</p>
        <p>{resume.phone || 'Phone not provided'}</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-blue-800 mb-3">Skills</h3>
        <ul className="list-disc list-inside space-y-1">
          {resume.skills.map((skill, idx) => (
            <li key={idx} className="text-gray-700">{skill}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-blue-800 mb-3">Experience</h3>
        {resume.experience.map((exp, idx) => (
          <div key={idx} className="border border-gray-200 p-4 rounded-lg mb-4">
            <p className="font-semibold">{exp.role} at {exp.company}</p>
            <p className="text-gray-600">
              {new Date(exp.startDate).toLocaleDateString()} - {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : 'Present'}
            </p>
            <p className="text-gray-700 mt-2">{exp.description || 'No description provided'}</p>
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-lg font-semibold text-blue-800 mb-3">Education</h3>
        {resume.education.map((edu, idx) => (
          <div key={idx} className="border border-gray-200 p-4 rounded-lg mb-4">
            <p className="font-semibold">{edu.degree} from {edu.institution}</p>
            <p className="text-gray-600">
              {new Date(edu.startDate).toLocaleDateString()} - {edu.endDate ? new Date(edu.endDate).toLocaleDateString() : 'Present'}
            </p>
          </div>
        ))}
      </div>

      <div className="flex space-x-4">
        <button
          onClick={onEdit}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Edit Resume
        </button>
        <button
          onClick={onDelete}
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          Delete Resume
        </button>
      </div>
    </div>
  );
};

export default ResumeDisplay;