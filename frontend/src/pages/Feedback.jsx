import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { submitFeedback, fetchFeedbacksByJobId, updateFeedback, deleteFeedback } from '../services/feedbackService';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function Feedback() {
  const { jobId } = useParams();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [rating, setRating] = useState(0);
  const [feedbacks, setFeedbacks] = useState([]);
  const [editId, setEditId] = useState(null);

  // Fetch feedbacks for the job
  useEffect(() => {
    const fetchFeedbacks = async () => {
      const data = await fetchFeedbacksByJobId(jobId);
      setFeedbacks(data);
    };
    fetchFeedbacks();
  }, [jobId]);

  const onSubmit = async (data) => {
    try {
      if (editId) {
        await updateFeedback(editId, { ...data, rating });
        alert('Feedback updated successfully!');
        setEditId(null);
      } else {
        await submitFeedback({ ...data, rating, jobId });
        alert('Feedback submitted successfully!');
      }
      reset();
      setRating(0);
      const updatedFeedbacks = await fetchFeedbacksByJobId(jobId);
      setFeedbacks(updatedFeedbacks);
    } catch (error) {
      alert('Failed to submit/update feedback.');
      console.error(error);
    }
  };

  const handleEdit = (feedback) => {
    setEditId(feedback._id);
    reset({ comment: feedback.comment });
    setRating(feedback.rating);
  };

  const handleDelete = async (id) => {
    try {
      await deleteFeedback(id);
      alert('Feedback deleted successfully!');
      setFeedbacks(feedbacks.filter(feedback => feedback._id !== id));
    } catch (error) {
      alert('Failed to delete feedback.');
      console.error(error);
    }
  };

  const exportPDF = () => {
    if (feedbacks.length === 0) {
      alert('No feedbacks to export.');
      return;
    }

    const doc = new jsPDF();
    doc.text('Feedback Report', 14, 10); // Title at the top

    // Add a table with feedback data
    doc.autoTable({
      head: [['Comment', 'Rating', 'Created At']], // Table headers
      body: feedbacks.map(fb => [
        fb.comment || 'No comment', // Comment column
        fb.rating || 'N/A',         // Rating column
        fb.createdAt ? new Date(fb.createdAt).toLocaleString() : 'Unknown Date', // Created At column
      ]),
      headStyles: {
        fillColor: [22, 160, 133],  // Green header color
        textColor: 255,             // White text
        fontSize: 12,
        halign: 'center',
      },
      bodyStyles: {
        fillColor: [236, 240, 241], // Light gray background for rows
        fontSize: 10,
        halign: 'left',
      },
      alternateRowStyles: {
        fillColor: [255, 255, 255], // Alternate row color (white)
      },
      margin: { top: 20 },  // Top margin
    });

    // Save the generated PDF
    doc.save('feedback_report.pdf');
  };

  return (
    <div className="p-4 border border-gray-300 rounded-lg">
      <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
        <textarea
          {...register('comment', { required: 'Comment is required' })}
          placeholder="Your feedback"
          className="w-full p-2 mb-2 border rounded"
        />
        {errors.comment && <p>{errors.comment.message}</p>}

        <div>
          <label>Rating:</label>
          {[...Array(5)].map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setRating(index + 1)}
              className={index < rating ? 'text-yellow-500' : 'text-gray-400'}
            >
              ★
            </button>
          ))}
        </div>

        <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
          {editId ? 'Update Feedback' : 'Submit Feedback'}
        </button>
      </form>

      <button onClick={exportPDF} className="mb-4 bg-green-500 text-white px-4 py-2 rounded">
        Export to PDF
      </button>

      <div>
        {feedbacks.map(feedback => (
          <div key={feedback._id} className="p-2 mb-2 border rounded">
            <p><strong>Comment:</strong> {feedback.comment}</p>
            <p><strong>Rating:</strong> {feedback.rating}</p>
            <p><strong>Date:</strong> {new Date(feedback.createdAt).toLocaleString()}</p>
            <button onClick={() => handleEdit(feedback)} className="bg-yellow-500 text-white px-2 py-1 mr-2 rounded">
              Edit
            </button>
            <button onClick={() => handleDelete(feedback._id)} className="bg-red-500 text-white px-2 py-1 rounded">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Feedback;
