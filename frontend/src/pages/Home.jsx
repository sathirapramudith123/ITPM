import React, { useState, useEffect } from 'react';
import { 
  FaSearch, 
  FaBriefcase, 
  FaUserTie, 
  FaBuilding, 
  FaMapMarkerAlt, 
  FaMoneyBillAlt,
  FaRegClock,
  FaRegStar,
  FaRegSmile,
  FaChevronLeft,
  FaChevronRight,
  FaQuoteLeft,
  FaStar
} from 'react-icons/fa';
import { FiFilter } from 'react-icons/fi';

function Home() {
  // Background images for hero section slideshow
  const heroBackgrounds = [
    'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  ];

  // Company logos for marquee
  const companies = [
    { name: 'Google', logo: 'https://logo.clearbit.com/google.com' },
    { name: 'Microsoft', logo: 'https://logo.clearbit.com/microsoft.com' },
    { name: 'Apple', logo: 'https://logo.clearbit.com/apple.com' },
    { name: 'Amazon', logo: 'https://logo.clearbit.com/amazon.com' },
    { name: 'Facebook', logo: 'https://logo.clearbit.com/facebook.com' },
    { name: 'Netflix', logo: 'https://logo.clearbit.com/netflix.com' },
    { name: 'Tesla', logo: 'https://logo.clearbit.com/tesla.com' },
    { name: 'Uber', logo: 'https://logo.clearbit.com/uber.com' },
    { name: 'Airbnb', logo: 'https://logo.clearbit.com/airbnb.com' },
    { name: 'Spotify', logo: 'https://logo.clearbit.com/spotify.com' },
  ];

  // Sample jobs data
  const jobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "Remote / San Francisco",
      salary: "$90k - $120k",
      posted: "2 days ago",
      skills: ["React", "TypeScript", "Remote"]
    },
    {
      id: 2,
      title: "UX/UI Designer",
      company: "Creative Studio",
      location: "New York",
      salary: "$80k - $100k",
      posted: "1 week ago",
      skills: ["Figma", "Sketch", "UI/UX"]
    },
    {
      id: 3,
      title: "Backend Engineer",
      company: "DataSystems",
      location: "Austin, TX",
      salary: "$110k - $140k",
      posted: "3 days ago",
      skills: ["Node.js", "Python", "AWS"]
    },
    {
      id: 4,
      title: "Product Manager",
      company: "InnovateCo",
      location: "Chicago, IL",
      salary: "$95k - $125k",
      posted: "5 days ago",
      skills: ["Agile", "Scrum", "Product"]
    },
    {
      id: 5,
      title: "Data Scientist",
      company: "AnalyticsPro",
      location: "Boston, MA",
      salary: "$100k - $130k",
      posted: "1 day ago",
      skills: ["Python", "Machine Learning", "SQL"]
    },
    {
      id: 6,
      title: "DevOps Engineer",
      company: "CloudTech",
      location: "Remote",
      salary: "$105k - $135k",
      posted: "4 days ago",
      skills: ["Docker", "Kubernetes", "CI/CD"]
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Frontend Developer at TechCorp",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      comment: "Found my dream job in just two weeks! The platform is incredibly user-friendly and the job matches were spot on.",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Product Manager at InnovateCo",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      comment: "As a hiring manager, I've found exceptional talent through this platform. The candidate quality is outstanding.",
      rating: 4
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      role: "UX Designer at Creative Studio",
      avatar: "https://randomuser.me/api/portraits/women/63.jpg",
      comment: "The personalized job recommendations saved me so much time. I got multiple interview requests within days!",
      rating: 5
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [currentJobIndex, setCurrentJobIndex] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Auto-rotate hero background
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setCurrentSlide((prev) => (prev + 1) % heroBackgrounds.length);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, heroBackgrounds.length]);

  // Auto-rotate job carousel
  useEffect(() => {
    const jobInterval = setInterval(() => {
      setCurrentJobIndex((prev) => (prev + 1) % Math.ceil(jobs.length / 3));
    }, 6000);
    return () => clearInterval(jobInterval);
  }, [jobs.length]);

  // Auto-rotate testimonials
  useEffect(() => {
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(testimonialInterval);
  }, [testimonials.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroBackgrounds.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroBackgrounds.length) % heroBackgrounds.length);
  };

  const nextJobs = () => {
    setCurrentJobIndex((prev) => (prev + 1) % Math.ceil(jobs.length / 3));
  };

  const prevJobs = () => {
    setCurrentJobIndex((prev) => (prev - 1 + Math.ceil(jobs.length / 3)) % Math.ceil(jobs.length / 3));
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Calculate visible jobs based on current index
  const visibleJobs = jobs.slice(currentJobIndex * 3, currentJobIndex * 3 + 3);

  return (
    <div className="homepage bg-gray-50">
      {/* Hero Section with Slideshow */}
      <section 
        className="hero-section relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Background Slideshow */}
        <div className="absolute inset-0 overflow-hidden">
          {heroBackgrounds.map((bg, index) => (
            <div 
              key={index}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${index === currentSlide ? 'opacity-30' : 'opacity-0'}`}
              style={{ 
                backgroundImage: `url(${bg})`,
                zIndex: 0 
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 leading-tight">Find Your <span className="text-yellow-300">Dream Job</span> Today</h1>
            <p className="text-xl mb-10 opacity-90">Join thousands of companies and candidates finding their perfect match</p>
            
            {/* Search Bar */}
            <div className="bg-white rounded-xl shadow-2xl p-2">
              <div className="flex flex-col md:flex-row gap-2">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaSearch className="text-gray-400" />
                  </div>
                  <input 
                    type="text" 
                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    placeholder="Job title, keywords, or company"
                  />
                </div>
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaMapMarkerAlt className="text-gray-400" />
                  </div>
                  <input 
                    type="text" 
                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    placeholder="Location or Remote"
                  />
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg flex items-center justify-center transition-all duration-300 shadow-lg">
                  <FaSearch className="mr-2" /> Search Jobs
                </button>
              </div>
              <div className="mt-3 flex justify-start pl-4">
                <button className="text-blue-600 text-sm font-medium flex items-center">
                  <FiFilter className="mr-1" /> Advanced Filters
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Slide Controls */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-3 z-20 transition-all duration-300"
          aria-label="Previous slide"
        >
          <FaChevronLeft />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-3 z-20 transition-all duration-300"
          aria-label="Next slide"
        >
          <FaChevronRight />
        </button>
        
        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2 z-20">
          {heroBackgrounds.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white w-6' : 'bg-white bg-opacity-50'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Company Marquee */}
      <section className="py-6 bg-gray-100 border-y border-gray-200 overflow-hidden">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-gray-100 to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-gray-100 to-transparent z-10"></div>
          
          <div className="flex items-center animate-marquee whitespace-nowrap">
            {[...companies, ...companies].map((company, index) => (
              <div key={`${company.name}-${index}`} className="inline-flex items-center mx-8">
                <img 
                  src={company.logo} 
                  alt={company.name} 
                  className="h-8 object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/100x30?text=' + company.name;
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaBriefcase className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">10,000+</h3>
              <p className="text-gray-600">Jobs Available</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUserTie className="text-green-600 text-2xl" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">5,000+</h3>
              <p className="text-gray-600">Successful Hires</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaBuilding className="text-purple-600 text-2xl" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">1,200+</h3>
              <p className="text-gray-600">Trusted Companies</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaRegSmile className="text-yellow-600 text-2xl" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">98%</h3>
              <p className="text-gray-600">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs Carousel */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured <span className="text-blue-600">Jobs</span></h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Browse through our most recent and popular job listings</p>
          </div>
          
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500">
              {visibleJobs.map((job) => (
                <div key={job.id} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start mb-4">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      <FaBuilding className="text-blue-600 text-2xl" />
                    </div>
                    <div>
                      <h5 className="text-xl font-semibold text-gray-900">{job.title}</h5>
                      <p className="text-gray-600">{job.company}</p>
                      <div className="flex items-center mt-2">
                        <FaMapMarkerAlt className="text-gray-400 mr-1" />
                        <span className="text-sm text-gray-500">{job.location}</span>
                      </div>
                    </div>
                    <button className="ml-auto text-gray-400 hover:text-blue-600">
                      <FaRegStar />
                    </button>
                  </div>
                  
                  <div className="mb-4">
                    {job.skills.map((skill, i) => (
                      <span 
                        key={i}
                        className={`${i % 2 === 0 ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'} text-xs font-medium px-2.5 py-0.5 rounded mr-1 mb-1 inline-block`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div className="flex items-center">
                      <FaMoneyBillAlt className="text-gray-500 mr-2" />
                      <span className="font-semibold text-gray-900">{job.salary}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <FaRegClock className="mr-1" />
                      <span>{job.posted}</span>
                    </div>
                  </div>
                  
                  <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg transition-all duration-300">
                    Apply Now
                  </button>
                </div>
              ))}
            </div>
            
            <button 
              onClick={prevJobs}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 bg-white border border-gray-200 rounded-full p-3 shadow-md hover:bg-gray-50 transition-all duration-300 z-10"
              aria-label="Previous jobs"
            >
              <FaChevronLeft className="text-gray-600" />
            </button>
            <button 
              onClick={nextJobs}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6 bg-white border border-gray-200 rounded-full p-3 shadow-md hover:bg-gray-50 transition-all duration-300 z-10"
              aria-label="Next jobs"
            >
              <FaChevronRight className="text-gray-600" />
            </button>
          </div>
          
          <div className="mt-12 text-center">
            <button className="bg-white border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-50 transition-all duration-300 shadow-sm">
              View All Jobs
            </button>
          </div>
        </div>
      </section>

      {/* Job Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Popular <span className="text-blue-600">Categories</span></h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Find jobs in your area of expertise</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {['Technology', 'Healthcare', 'Finance', 'Education', 'Marketing', 'Design', 'Engineering', 'Sales', 'Customer Service', 'Human Resources', 'Operations', 'Writing'].map((category) => (
              <div key={category} className="bg-gray-50 hover:bg-blue-50 p-4 rounded-lg border border-gray-200 text-center cursor-pointer transition-all duration-300">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FaBriefcase className="text-blue-600" />
                </div>
                <h4 className="font-medium text-gray-900">{category}</h4>
                <p className="text-sm text-gray-500 mt-1">1,240 jobs</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Success <span className="text-blue-600">Stories</span></h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">What our users say about their experience</p>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 transition-all duration-500">
              <div className="flex flex-col md:flex-row items-center">
                <div className="mb-6 md:mb-0 md:mr-8">
                  <img 
                    src={testimonials[currentTestimonial].avatar} 
                    alt={testimonials[currentTestimonial].name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
                  />
                </div>
                <div className="text-center md:text-left">
                  <FaQuoteLeft className="text-blue-200 text-3xl mb-4 mx-auto md:mx-0" />
                  <p className="text-lg text-gray-700 mb-6 italic">
                    "{testimonials[currentTestimonial].comment}"
                  </p>
                  <div className="mb-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar 
                        key={i} 
                        className={`inline-block ${i < testimonials[currentTestimonial].rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900">{testimonials[currentTestimonial].name}</h4>
                  <p className="text-gray-600">{testimonials[currentTestimonial].role}</p>
                </div>
              </div>
            </div>
            
            <button 
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 bg-white border border-gray-200 rounded-full p-3 shadow-md hover:bg-gray-50 transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <FaChevronLeft className="text-gray-600" />
            </button>
            <button 
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6 bg-white border border-gray-200 rounded-full p-3 shadow-md hover:bg-gray-50 transition-all duration-300"
              aria-label="Next testimonial"
            >
              <FaChevronRight className="text-gray-600" />
            </button>
            
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentTestimonial ? 'bg-blue-600 w-6' : 'bg-gray-300'}`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-700 to-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Are You Hiring?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Post your job openings and find the best talent for your company</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-blue-900 px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-100 transition-all duration-300 shadow-lg">
              Post a Job - It's Free
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-white hover:bg-opacity-10 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;