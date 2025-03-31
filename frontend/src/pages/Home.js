import React from 'react';
import { FaSearch, FaBriefcase, FaUserTie, FaBuilding, FaMapMarkerAlt, FaMoneyBillAlt } from 'react-icons/fa';

function Home() {
  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section bg-primary text-white py-5">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <h1 className="display-4 fw-bold mb-4">Find Your Dream Job Today</h1>
              <p className="lead mb-5">Join thousands of companies and candidates finding the perfect match</p>
              
              {/* Search Bar */}
              <div className="card shadow-lg">
                <div className="card-body p-0">
                  <div className="input-group">
                    <input 
                      type="text" 
                      className="form-control form-control-lg border-0" 
                      placeholder="Job title, keywords, or company"
                    />
                    <span className="input-group-text bg-white border-0">
                      <FaMapMarkerAlt className="text-muted" />
                      <input 
                        type="text" 
                        className="form-control form-control-lg border-0" 
                        placeholder="Location"
                      />
                    </span>
                    <button className="btn btn-dark btn-lg px-4">
                      <FaSearch className="me-2" /> Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-3 col-sm-6">
              <div className="card h-100 text-center p-4 shadow-sm">
                <div className="card-body">
                  <FaBriefcase className="text-primary fs-1 mb-3" />
                  <h3 className="card-title">10,000+</h3>
                  <p className="card-text text-muted">Jobs Available</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="card h-100 text-center p-4 shadow-sm">
                <div className="card-body">
                  <FaUserTie className="text-primary fs-1 mb-3" />
                  <h3 className="card-title">5,000+</h3>
                  <p className="card-text text-muted">Successful Hires</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="card h-100 text-center p-4 shadow-sm">
                <div className="card-body">
                  <FaBuilding className="text-primary fs-1 mb-3" />
                  <h3 className="card-title">1,200+</h3>
                  <p className="card-text text-muted">Companies</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="card h-100 text-center p-4 shadow-sm">
                <div className="card-body">
                  <div className="text-primary fs-1 mb-3 fw-bold">100%</div>
                  <h3 className="card-title">Satisfaction</h3>
                  <p className="card-text text-muted">Guaranteed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold">Featured Jobs</h2>
          <div className="row g-4">
            {[1, 2, 3, 4, 5, 6].map((job) => (
              <div key={job} className="col-lg-4 col-md-6">
                <div className="card h-100 shadow-sm hover-shadow transition">
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-3">
                      <div className="bg-primary bg-opacity-10 rounded-circle p-3 me-3">
                        <FaBuilding className="text-primary fs-4" />
                      </div>
                      <div>
                        <h5 className="card-title mb-0">Senior Frontend Developer</h5>
                        <p className="card-text text-muted">TechCorp Inc.</p>
                      </div>
                    </div>
                    <div className="mb-3">
                      <span className="badge bg-primary bg-opacity-10 text-primary me-2">React</span>
                      <span className="badge bg-primary bg-opacity-10 text-primary me-2">TypeScript</span>
                      <span className="badge bg-primary bg-opacity-10 text-primary">Remote</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <FaMoneyBillAlt className="text-muted me-2" />
                        <span className="fw-bold">$90,000 - $120,000</span>
                      </div>
                      <button className="btn btn-primary">Apply Now</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <button className="btn btn-outline-primary btn-lg px-4">
              View All Jobs
            </button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-dark text-white py-5">
        <div className="container text-center">
          <h2 className="display-5 fw-bold mb-4">Are You Hiring?</h2>
          <p className="lead mb-5 mx-auto" style={{maxWidth: "600px"}}>
            Post your job openings and find the best talent for your company
          </p>
          <button className="btn btn-light btn-lg px-5">
            Post a Job
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;