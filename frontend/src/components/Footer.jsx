import React from 'react';
import { FaLinkedin, FaTwitter, FaGithub, FaEnvelope } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-white text-lg font-semibold">Career Connect</h3>
            <p className="text-sm">
              Connecting talented professionals with dream opportunities since 2025.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaLinkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaTwitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaGithub className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaEnvelope className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-sm hover:text-white transition-colors">Home</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">Browse Jobs</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">Companies</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">Career Resources</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white text-lg font-semibold">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-sm hover:text-white transition-colors">Resume Tips</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">Interview Prep</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">Career Blog</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-lg font-semibold">Contact Us</h3>
            <address className="mt-4 not-italic space-y-2 text-sm">
              <p>123 Career Street</p>
              <p>San Francisco, CA 94107</p>
              <p>Email: <a href="mailto:info@careerconnect.com" className="hover:text-white transition-colors">info@careerconnect.com</a></p>
              <p>Phone: (555) 123-4567</p>
            </address>
          </div>
        </div>

        {/* Copyright and Legal */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">© 2025 Career Connect. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-sm hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;