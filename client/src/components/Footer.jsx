import React from 'react';
import { FaLinkedin, FaTwitter, FaGithub, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg">JobHub</h3>
            <p className="text-sm">
              Connecting talented professionals with their dream jobs since 2020.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaLinkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaGithub size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-white transition">Home</a></li>
              <li><a href="/joblist" className="hover:text-white transition">Browse Jobs</a></li>
              <li><a href="/companylist" className="hover:text-white transition">Companies</a></li>
              <li><a href="/feedback" className="hover:text-white transition">Feedback</a></li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">Resume Tips</a></li>
              <li><a href="#" className="hover:text-white transition">Interview Prep</a></li>
              <li><a href="#" className="hover:text-white transition">Career Blog</a></li>
              <li><a href="#" className="hover:text-white transition">FAQ</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <FaEnvelope className="mr-2" />
                <a href="mailto:contact@jobhub.com" className="hover:text-white transition">
                  contact@jobhub.com
                </a>
              </li>
              <li>123 Job Street, Tech City</li>
              <li>+1 (555) 123-4567</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">
            © {currentYear} JobHub. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="/privacy-policy" className="text-sm hover:text-white transition">Privacy Policy</a>
            <a href="/terms-of-service" className="text-sm hover:text-white transition">Terms of Service</a>
            <a href="/cookies" className="text-sm hover:text-white transition">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;