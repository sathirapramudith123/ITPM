import React, { useState } from 'react';

const ResumeProfile = () => {
  const [profiles, setProfiles] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
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
    <div className="min-h-screen  p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Resume Profile</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="border p-2 rounded"
            required
          />
          <input
            type="date"
            name="educationStart"
            value={formData.educationStart}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="date"
            name="educationEnd"
            value={formData.educationEnd}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="Professional Skill"
            className="border p-2 rounded col-span-1 md:col-span-2"
            required
          />
          <input
            type="date"
            name="workStart"
            value={formData.workStart}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="date"
            name="workEnd"
            value={formData.workEnd}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 col-span-1 md:col-span-2"
          >
            {editIndex !== null ? 'Update Profile' : 'Add Profile'}
          </button>
        </form>

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Saved Profiles</h3>
          {profiles.length === 0 ? (
            <p className="text-gray-500">No profiles yet.</p>
          ) : (
            <ul className="space-y-4">
              {profiles.map((profile, index) => (
                <li
                  key={index}
                  className="border rounded p-4 flex flex-col md:flex-row justify-between items-start md:items-center"
                >
                  <div>
                    <p><strong>Name:</strong> {profile.firstName} {profile.lastName}</p>
                    <p><strong>Education:</strong> {profile.educationStart} - {profile.educationEnd}</p>
                    <p><strong>Skill:</strong> {profile.skills}</p>
                    <p><strong>Experience:</strong> {profile.workStart} - {profile.workEnd}</p>
                  </div>
                  <div className="mt-2 md:mt-0 flex gap-2">
                    <button
                      onClick={() => handleEdit(index)}
                      className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
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
