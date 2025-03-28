import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Home = () => {
  // Carousel images data
  const carouselData = [
    {
      id: 1,
      imageUrl: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      title: "Tech Career Success",
      description: "Join thousands who found their dream tech jobs through our platform"
    },
    {
      id: 2,
      imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      title: "Diverse Opportunities",
      description: "Discover jobs across all industries and experience levels"
    },
    {
      id: 3,
      imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      title: "Top Companies Hiring",
      description: "Get connected with leading employers worldwide"
    }
  ];

  // Testimonials data
  const testimonialsData = [
    {
      quote: "Found my dream job in just 2 weeks! The platform made it so easy to connect with employers.",
      author: "Sarah, Software Engineer",
      role: "Now at Google"
    },
    {
      quote: "The platform connected me with amazing companies I wouldn't have found otherwise.",
      author: "Michael, Marketing Director",
      role: "Now at Shopify"
    },
    {
      quote: "Simplified my job search tremendously. I had multiple offers within a month.",
      author: "Jessica, UX Designer",
      role: "Now at Airbnb"
    }
  ];

  // State for carousel
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Auto slide functionality for main carousel
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        nextSlide();
      }
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isHovered]);

  // Auto slide functionality for testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev === testimonialsData.length - 1 ? 0 : prev + 1));
    }, 6000); // Change testimonial every 6 seconds

    return () => clearInterval(interval);
  }, []);

  // Navigation functions for main carousel
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === carouselData.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? carouselData.length - 1 : prev - 1));
  };

  // Go to specific slide
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center text-center px-4 py-12"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Main Header */}
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-800">
            Find Your <span className="text-blue-600">Dream Job</span> Today
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of companies and candidates connecting through our platform.
            Your next career opportunity is just a click away.
          </p>
        </motion.div>

        {/* Call-to-Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
        >
          <Link
            to="/jobs"
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Browse Job Listings
          </Link>
          <Link
            to="/register"
            className="px-8 py-4 bg-white hover:bg-gray-100 text-blue-600 font-semibold border border-blue-600 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
          >
            Post Your Resume
          </Link>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white p-6 rounded-xl shadow-lg max-w-4xl mx-auto mb-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4">
              <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
              <div className="text-gray-600">Jobs Available</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-blue-600 mb-2">5K+</div>
              <div className="text-gray-600">Companies Hiring</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-blue-600 mb-2">100+</div>
              <div className="text-gray-600">Career Fields</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-blue-600 mb-2">1M+</div>
              <div className="text-gray-600">Successful Hires</div>
            </div>
          </div>
        </motion.div>

        {/* Image Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="relative w-full max-w-5xl mx-auto mb-16 overflow-hidden rounded-xl shadow-xl"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative h-64 md:h-96 lg:h-[500px]">
            {carouselData.map((slide, index) => (
              <motion.div
                key={slide.id}
                className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: index === currentSlide ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={slide.imageUrl}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                  <div className="text-white text-left">
                    <h3 className="text-xl md:text-2xl font-bold mb-2">{slide.title}</h3>
                    <p className="text-sm md:text-base">{slide.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-all"
            aria-label="Previous slide"
          >
            <FiChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-all"
            aria-label="Next slide"
          >
            <FiChevronRight size={24} />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
            {carouselData.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide ? 'bg-white w-6' : 'bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800">Success Stories</h2>
          
          {/* Testimonial Carousel */}
          <div className="relative overflow-hidden">
            <div className="relative h-64">
              {testimonialsData.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className={`absolute inset-0 p-6 bg-white rounded-lg shadow-md flex flex-col justify-center ${
                    index === currentTestimonial ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: index === currentTestimonial ? 1 : 0,
                    x: index > currentTestimonial ? 100 : index < currentTestimonial ? -100 : 0
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-gray-700 mb-4 text-lg">"{testimonial.quote}"</p>
                  <div>
                    <p className="text-gray-800 font-medium">{testimonial.author}</p>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Navigation Dots */}
            <div className="flex justify-center mt-6 gap-2">
              {testimonialsData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentTestimonial ? 'bg-blue-600 w-6' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating animated elements */}
      <motion.div
        className="absolute top-20 left-10 w-16 h-16 bg-blue-200 rounded-full opacity-20"
        animate={{
          y: [0, 20, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-24 h-24 bg-indigo-200 rounded-full opacity-20"
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      />
    </motion.div>
  );
};

export default Home;