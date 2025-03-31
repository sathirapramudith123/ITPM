import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { register as registerUser } from '../services/authService';
import { FaUser, FaLock, FaEnvelope, FaUserTie, FaBriefcase } from 'react-icons/fa';

function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await registerUser(data);
      navigate('/login');
    } catch (error) {
      console.error('Registration failed', error);
      alert('Registration failed: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h1 className="h3 mb-0 text-center">Create Your Account</h1>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Email Field */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    <FaEnvelope className="me-2" />
                    Email Address
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaEnvelope />
                    </span>
                    <input
                      id="email"
                      {...register('email', { 
                        required: 'Email is required', 
                        pattern: { 
                          value: /^\S+@\S+$/i, 
                          message: 'Please enter a valid email address' 
                        } 
                      })}
                      type="email"
                      placeholder="your@email.com"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    />
                  </div>
                  {errors.email && (
                    <div className="invalid-feedback d-block">
                      {errors.email.message}
                    </div>
                  )}
                </div>

                {/* Password Field */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    <FaLock className="me-2" />
                    Password
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaLock />
                    </span>
                    <input
                      id="password"
                      {...register('password', { 
                        required: 'Password is required', 
                        minLength: { 
                          value: 6, 
                          message: 'Password must be at least 6 characters' 
                        } 
                      })}
                      type="password"
                      placeholder="Create a password"
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    />
                  </div>
                  {errors.password && (
                    <div className="invalid-feedback d-block">
                      {errors.password.message}
                    </div>
                  )}
                  <small className="text-muted">Minimum 6 characters</small>
                </div>

                {/* Role Selection */}
                <div className="mb-4">
                  <label htmlFor="role" className="form-label">
                    <FaUser className="me-2" />
                    I am a...
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaUser />
                    </span>
                    <select
                      id="role"
                      {...register('role', { required: 'Please select your role' })}
                      className={`form-select ${errors.role ? 'is-invalid' : ''}`}
                    >
                      <option value="">Select your role</option>
                      <option value="job_seeker">
                        <FaUserTie className="me-2" />
                        Job Seeker
                      </option>
                      <option value="employer">
                        <FaBriefcase className="me-2" />
                        Employer
                      </option>
                    </select>
                  </div>
                  {errors.role && (
                    <div className="invalid-feedback d-block">
                      {errors.role.message}
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <div className="d-grid mb-3">
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-lg"
                  >
                    Register Now
                  </button>
                </div>

                {/* Login Link */}
                <div className="text-center">
                  <p className="mb-0">
                    Already have an account?{' '}
                    <a href="/login" className="text-decoration-none">
                      Sign in
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;