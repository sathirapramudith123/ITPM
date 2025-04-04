import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { submitFeedback } from '../services/feedbackService';

function Feedback() {
  const { jobId } = useParams();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [rating, setRating] = useState(0);

  const onSubmit = async (data) => {
    try {
      await submitFeedback({ ...data, rating, jobId });
      alert('Feedback submitted successfully!');
    } catch (error) {
      alert('Failed to submit feedback.');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 border border-gray-300 rounded-lg">
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
        Submit
      </button>
    </form>
  );
}

export default Feedback;
