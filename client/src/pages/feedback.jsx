import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const JobFeedbackManager = ({ feedbacks, setFeedbacks }) => {
  const [formData, setFormData] = useState({ rating: 1, review: '' });
  const [editIndex, setEditIndex] = useState(null);

  const handleRatingClick = (value) => {
    setFormData(prev => ({ ...prev, rating: value }));
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      const updated = [...feedbacks];
      updated[editIndex] = formData;
      setFeedbacks(updated);
      setEditIndex(null);
    } else {
      setFeedbacks([...feedbacks, formData]);
    }

    setFormData({ rating: 1, review: '' });
  };

  const handleEdit = (index) => {
    setFormData(feedbacks[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setFeedbacks(feedbacks.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">
        {editIndex !== null ? 'Edit Feedback' : 'Leave Feedback'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium text-gray-700 mb-1">Rating</label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                size={28}
                className={`cursor-pointer ${star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                onClick={() => handleRatingClick(star)}
              />
            ))}
          </div>
        </div>

        <div>
          <label className="block font-medium text-gray-700">Review</label>
          <textarea
            name="review"
            rows="3"
            value={formData.review}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border rounded-md"
            required
          />
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            {editIndex !== null ? 'Update Feedback' : 'Submit Feedback'}
          </button>
        </div>
      </form>

      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Feedback List</h3>
        {feedbacks.length === 0 ? (
          <p className="text-gray-500">No feedback yet.</p>
        ) : (
          <ul className="space-y-4">
            {feedbacks.map((fb, index) => (
              <li key={index} className="p-4 border rounded-md bg-gray-50 shadow-sm">
                <div className="flex justify-between items-center mb-1">
                  <div className="flex text-yellow-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        size={20}
                        className={star <= fb.rating ? '' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-700">{fb.review}</p>
                <div className="mt-2 space-x-3">
                  <button
                    onClick={() => handleEdit(index)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-red-600 hover:underline"
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
  );
};

export default JobFeedbackManager;
