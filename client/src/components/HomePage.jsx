import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import {
  FaStar,
  FaSearch,
  FaCommentAlt,
  FaBuilding,
  FaBriefcase,
  FaArrowRight,
} from 'react-icons/fa';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const backgroundImages = [
  'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
];

const HomePage = () => {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [jobs, setJobs] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) =>
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobRes = await axios.get('http://localhost:5000/api/jobs?featured=true');
        const feedbackRes = await axios.get('http://localhost:5000/api/feedback?publicOnly=true');
        setJobs(jobRes.data);
        setFeedbacks(feedbackRes.data);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    fetchData();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024, // tablets and below
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 640, // mobile
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const feedbackSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024, // tablets and below
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 640, // mobile
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl mb-16 shadow-xl">
        <div className="absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out">
          {backgroundImages.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
                index === currentBgIndex ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ backgroundImage: `url(${img})` }}
            />
          ))}
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        <div className="relative z-10 text-center py-24 md:py-32 px-4 sm:px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Welcome to Career Pulse
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-8">
            Connecting talented professionals with their dream opportunities
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/joblist"
              className="bg-white hover:bg-gray-100 text-blue-600 px-6 py-3 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
            >
              Browse Jobs
            </Link>
            <Link
              to="/companylist"
              className="bg-white/10 hover:bg-white/20 text-white border border-white px-6 py-3 rounded-lg font-medium transition-colors hover:shadow-lg"
            >
              Explore Companies
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <SectionWrapper title="How It Works">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<FaSearch className="text-blue-600" size={24} />}
            title="Find Opportunities"
            description="Discover jobs that match your skills and aspirations"
            to="/joblist"
            color="blue"
          />
          <FeatureCard
            icon={<FaCommentAlt className="text-purple-600" size={24} />}
            title="Get Feedback"
            description="Receive valuable insights from industry experts"
            to="/feedback"
            color="purple"
          />
          <FeatureCard
            icon={<FaBuilding className="text-green-600" size={24} />}
            title="Company List"
            description="Browse trusted companies and explore career opportunities"
            to="/companylist"
            color="green"
          />
        </div>
      </SectionWrapper>

      {/* Featured Jobs Section with react-slick slider */}
      <SectionWrapper title="Featured Opportunities">
        {jobs.length > 0 ? (
          <Slider {...sliderSettings} className="pb-8">
            {jobs.map((job) => (
              <div key={job._id} className="px-3">
                <JobCard job={job} />
              </div>
            ))}
          </Slider>
        ) : (
          <EmptyState message="No featured jobs available at the moment" />
        )}
        <div className="text-center mt-8">
          <Link
            to="/joblist"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            View all job opportunities <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </SectionWrapper>

      {/* Feedback Section with slider */}
      <SectionWrapper title="Success Stories">
        {feedbacks.length > 0 ? (
          <Slider {...feedbackSliderSettings} className="pb-8">
            {feedbacks.map((feedback, index) => (
              <div key={index} className="px-3">
                <FeedbackCard feedback={feedback} />
              </div>
            ))}
          </Slider>
        ) : (
          <EmptyState message="No testimonials available yet" />
        )}
      </SectionWrapper>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 md:p-12 text-center text-white mb-16 shadow-xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Ready to advance your career?
        </h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto opacity-90">
          Join thousands of professionals who found their dream jobs through Career Pulse
        </p>
        <Link
          to="/register"
          className="inline-block bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-bold transition-colors shadow-lg hover:shadow-xl"
        >
          Get Started Now
        </Link>
      </div>
    </div>
  );
};

const SectionWrapper = ({ title, children }) => (
  <div className="mb-20">
    <h2 className="text-3xl font-bold text-center mb-12 relative">
      <span className="relative inline-block">
        {title}
        <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></span>
      </span>
    </h2>
    {children}
  </div>
);

const FeatureCard = ({ icon, title, description, to, color }) => {
  const colorClasses = {
    blue: 'bg-blue-50 hover:bg-blue-100 border-blue-200',
    green: 'bg-green-50 hover:bg-green-100 border-green-200',
    purple: 'bg-purple-50 hover:bg-purple-100 border-purple-200',
  };

  return (
    <Link
      to={to}
      className={`flex flex-col items-center text-center p-8 rounded-xl border-2 transition-all duration-300 hover:shadow-lg ${colorClasses[color]}`}
    >
      <div className="mb-4 p-4 bg-white rounded-full shadow-sm">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </Link>
  );
};

const JobCard = ({ job }) => (
  <Link
    to={`/jobs/${job._id}`}
    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100"
  >
    <div className="p-6">
      <div className="flex items-start">
        <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg mr-4">
          <FaBriefcase className="text-blue-600" size={20} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">{job.title}</h3>
          <p className="text-sm text-gray-500 mb-2">{job.companyProfile?.name}</p>
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {job.jobType}
          </span>
        </div>
      </div>
      <p className="mt-4 text-gray-600 text-sm line-clamp-2">{job.description}</p>
    </div>
  </Link>
);

const FeedbackCard = ({ feedback }) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 border border-gray-100 hover:shadow-lg transition-shadow">
    <div className="flex mb-4">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          size={18}
          className={star <= feedback.rating ? 'text-yellow-400' : 'text-gray-300'}
        />
      ))}
    </div>
    <p className="text-gray-700 mb-4 italic">"{feedback.review}"</p>
    <div className="flex items-center">
      <div className="bg-blue-100 text-blue-800 rounded-full w-10 h-10 flex items-center justify-center font-bold">
        {feedback.userName ? feedback.userName.charAt(0).toUpperCase() : 'A'}
      </div>
      <div className="ml-3">
        <p className="text-sm font-medium text-gray-900">
          {feedback.userName || 'Anonymous'}
        </p>
        <p className="text-sm text-gray-500">
          {feedback.jobTitle ? `Former ${feedback.jobTitle}` : 'Job Seeker'}
        </p>
      </div>
    </div>
  </div>
);

const EmptyState = ({ message }) => (
  <div className="text-center py-12 bg-gray-50 rounded-xl">
    <p className="text-gray-500">{message}</p>
  </div>
);

export default HomePage;
