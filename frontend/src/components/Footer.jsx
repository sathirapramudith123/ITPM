import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedin, FaTwitter, FaGithub, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand / About */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">CareerPlus</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Revolutionizing the job search experience with AI-powered matching and seamless connections between employers and top talent.
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com" className="text-gray-400 hover:text-blue-400 transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="https://linkedin.com" className="text-gray-400 hover:text-blue-600 transition-colors">
                <FaLinkedin size={20} />
              </a>
              <a href="https://github.com" className="text-gray-400 hover:text-white transition-colors">
                <FaGithub size={20} />
              </a>
            </div>
          </div>

          {/* Job Seekers */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">For Job Seekers</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/jobs" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link to="/resume-builder" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Resume Builder
                </Link>
              </li>
              <li>
                <Link to="/career-advice" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Career Advice
                </Link>
              </li>
              <li>
                <Link to="/salary-tool" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Salary Calculator
                </Link>
              </li>
            </ul>
          </div>

          {/* Employers */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">For Employers</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/post-job" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Post a Job
                </Link>
              </li>
              <li>
                <Link to="/talent-pool" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Browse Talent Pool
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link to="/hr-solutions" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  HR Solutions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-400">123 Career Street, Tech City, TC 10001</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-blue-500 mr-3" />
                <a href="mailto:info@careerplus.com" className="text-gray-400 hover:text-white transition-colors">
                  info@careerplus.com
                </a>
              </li>
              <li className="flex items-center">
                <FaPhone className="text-blue-500 mr-3" />
                <a href="tel:+15551234567" className="text-gray-400 hover:text-white transition-colors">
                  +1 (555) 123-4567
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-6"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <div className="mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} CareerPlus. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;