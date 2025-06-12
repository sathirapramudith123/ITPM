import React, { useState } from 'react';

const ResumeProfile = () => {
  const [profiles, setProfiles] = useState([]);
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

  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updated = [...profiles];
      updated[editIndex] = formData;
      setProfiles(updated);
      setEditIndex(null);
    } else {
      setProfiles([...profiles, formData]);
    }

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
  };

  const handleEdit = (index) => {
    setFormData(profiles[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setProfiles(profiles.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Resume Builder
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            Create and manage your professional profiles
          </p>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              {editIndex !== null ? 'Edit Profile' : 'Add New Profile'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                    required
                  />
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Education</h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label htmlFor="educationTitle" className="block text-sm font-medium text-gray-700 mb-1">
                      Degree/Title
                    </label>
                    <input
                      type="text"
                      id="educationTitle"
                      name="educationTitle"
                      value={formData.educationTitle}
                      onChange={handleChange}
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                      required
                    />
                  </div>
                  
                  <div className="sm:col-span-2">
                    <label htmlFor="educationDescription" className="block text-sm font-medium text-gray-700 mb-1">
                      Institution/Description
                    </label>
                    <input
                      type="text"
                      id="educationDescription"
                      name="educationDescription"
                      value={formData.educationDescription}
                      onChange={handleChange}
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="educationStart" className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      id="educationStart"
                      name="educationStart"
                      value={formData.educationStart}
                      onChange={handleChange}
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="educationEnd" className="block text-sm font-medium text-gray-700 mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      id="educationEnd"
                      name="educationEnd"
                      value={formData.educationEnd}
                      onChange={handleChange}
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Professional Details</h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">
                      Skills (comma separated)
                    </label>
                    <input
                      type="text"
                      id="skills"
                      name="skills"
                      value={formData.skills}
                      onChange={handleChange}
                      placeholder="e.g. JavaScript, React, Project Management"
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="workStart" className="block text-sm font-medium text-gray-700 mb-1">
                      Work Start Date
                    </label>
                    <input
                      type="date"
                      id="workStart"
                      name="workStart"
                      value={formData.workStart}
                      onChange={handleChange}
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="workEnd" className="block text-sm font-medium text-gray-700 mb-1">
                      Work End Date
                    </label>
                    <input
                      type="date"
                      id="workEnd"
                      name="workEnd"
                      value={formData.workEnd}
                      onChange={handleChange}
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-6">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                >
                  {editIndex !== null ? 'Update Profile' : 'Save Profile'}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Profiles</h2>

          {profiles.length === 0 ? (
            <div className="bg-white shadow rounded-lg p-8 text-center">
              <p className="text-gray-500">No profiles available. Please create one.</p>
            </div>
          ) : (
            <ul className="space-y-6">
              {profiles.map((profile, index) => (
                <li key={index} className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-900">
                      {profile.firstName} {profile.lastName}
                    </h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(index)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">📧 {profile.email} | 📞 {profile.phone}</p>
                  <div className="mt-4">
                    <h4 className="font-semibold">Education</h4>
                    <p>{profile.educationTitle} - {profile.educationDescription}</p>
                    <p className="text-sm text-gray-500">{profile.educationStart} to {profile.educationEnd}</p>
                  </div>
                  <div className="mt-4">
                    <h4 className="font-semibold">Skills</h4>
                    <p>{profile.skills}</p>
                  </div>
                  <div className="mt-4">
                    <h4 className="font-semibold">Work Experience</h4>
                    <p className="text-sm text-gray-500">{profile.workStart} to {profile.workEnd}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeProfile;
