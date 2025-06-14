import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const API_URL = 'http://localhost:5000/api/feedback';

const JobFeedbackManager = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [formData, setFormData] = useState({ rating: 1, review: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => setFeedbacks(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleRatingClick = (value) => {
    setFormData((prev) => ({ ...prev, rating: value }));
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        const res = await axios.put(`${API_URL}/${editId}`, formData);
        setFeedbacks(feedbacks.map((f) => (f._id === editId ? res.data : f)));
        setEditId(null);
      } else {
        const res = await axios.post(API_URL, formData);
        setFeedbacks([res.data, ...feedbacks]);
      }
      setFormData({ rating: 1, review: '' });
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (id) => {
    const fb = feedbacks.find((f) => f._id === id);
    setFormData({ rating: fb.rating, review: fb.review });
    setEditId(id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setFeedbacks(feedbacks.filter((f) => f._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleGeneratePDF = () => {
    const feedbackListElement = document.getElementById('feedback-list');
    if (!feedbackListElement) return;

    html2canvas(feedbackListElement).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('feedbacks.pdf');
    });
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">
        {editId ? 'Edit Feedback' : 'Leave Feedback'}
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
            {editId ? 'Update Feedback' : 'Submit Feedback'}
          </button>
        </div>
      </form>



      <div id="feedback-list" className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Feedback List</h3>
        {feedbacks.length === 0 ? (
          <p className="text-gray-500">No feedback yet.</p>
        ) : (
          <ul className="space-y-4">
            {feedbacks.map((fb) => (
              <li key={fb._id} className="p-4 border rounded-md bg-gray-50 shadow-sm">
                <div className="flex text-yellow-400 mb-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      size={20}
                      className={star <= fb.rating ? '' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-700">{fb.review}</p>
                <div className="mt-2 space-x-3">
                  <button
                    onClick={() => handleEdit(fb._id)}
                    className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(fb._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>

                  <button
                    onClick={handleGeneratePDF}
                    className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600"
                  >
                    Download PDF
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
