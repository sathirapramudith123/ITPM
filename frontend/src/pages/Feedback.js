import React from 'react';
import { useForm } from 'react-hook-form';
import { submitFeedback } from '../services/feedbackService';

function Feedback() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await submitFeedback(data);
      alert('Feedback submitted!');
    } catch (error) {
      console.error('Failed to submit feedback', error);
      alert('Failed to submit feedback');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Submit Feedback</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto">
        <div>
          <textarea
            {...register('comment', { required: 'Comment is required' })}
            placeholder="Your feedback"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.comment && <p className="text-red-500 text-sm">{errors.comment.message}</p>}
        </div>
        <div>
          <input
            {...register('rating', { required: 'Rating is required', min: { value: 1, message: 'Min 1' }, max: { value: 5, message: 'Max 5' } })}
            type="number"
            placeholder="Rating (1-5)"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.rating && <p className="text-red-500 text-sm">{errors.rating.message}</p>}
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600">Submit</button>
      </form>
    </div>
  );
}

export default Feedback;