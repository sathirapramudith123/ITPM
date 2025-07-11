import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HomeContainer = () => {
  const [jobs, setJobs] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobsResponse = await axios.get('http://localhost:5000/api/jobs');
        const feedbackResponse = await axios.get('http://localhost:5000/api/feedbacks');

        setJobs(jobsResponse.data);
        setFeedbacks(feedbackResponse.data);
      } catch (err) {
        console.error('Error fetching home page data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return <HomePage jobs={jobs} feedbacks={feedbacks} />;
};

export default HomeContainer;
