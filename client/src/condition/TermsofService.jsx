import React from 'react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
          <p className="text-gray-600 mt-2">
            Last Updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="prose max-w-none">
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-600">
                  By accessing or using JobHub ("the Service"), you agree to be bound by these Terms of Service. 
                  If you disagree with any part of the terms, you may not access the Service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">2. Description of Service</h2>
                <p className="text-gray-600 mb-4">
                  JobHub provides a platform connecting job seekers with employers. We offer:
                </p>
                <ul className="list-disc pl-5 text-gray-600 space-y-1 mb-4">
                  <li>Job search and application tools</li>
                  <li>Employer recruitment solutions</li>
                  <li>Career resources and advice</li>
                </ul>
                <p className="text-gray-600">
                  We reserve the right to modify or discontinue any Service features without notice.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">3. User Responsibilities</h2>
                <h3 className="text-lg font-medium text-gray-700 mb-2">Job Seekers</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1 mb-4">
                  <li>Provide accurate and complete profile information</li>
                  <li>Do not misrepresent qualifications or experience</li>
                  <li>Maintain the confidentiality of your account</li>
                </ul>
                <h3 className="text-lg font-medium text-gray-700 mb-2">Employers</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>Post only legitimate job opportunities</li>
                  <li>Do not discriminate based on protected characteristics</li>
                  <li>Provide accurate company and job information</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">4. Prohibited Conduct</h2>
                <p className="text-gray-600 mb-4">
                  You agree not to engage in any of the following prohibited activities:
                </p>
                <ul className="list-disc pl-5 text-gray-600 space-y-1 mb-4">
                  <li>Posting false, inaccurate, or misleading information</li>
                  <li>Using the Service for any illegal purpose</li>
                  <li>Harassing, abusing, or harming others</li>
                  <li>Attempting to bypass any security measures</li>
                  <li>Scraping or collecting data without permission</li>
                  <li>Interfering with the proper working of the Service</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">5. Intellectual Property</h2>
                <p className="text-gray-600 mb-4">
                  The Service and its original content, features, and functionality are owned by JobHub and are protected by international copyright, trademark, and other intellectual property laws.
                </p>
                <p className="text-gray-600">
                  You may not modify, reproduce, distribute, or create derivative works without our express written permission.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">6. Termination</h2>
                <p className="text-gray-600">
                  We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms. Upon termination, your right to use the Service will immediately cease.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">7. Limitation of Liability</h2>
                <p className="text-gray-600 mb-4">
                  In no event shall JobHub, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for:
                </p>
                <ul className="list-disc pl-5 text-gray-600 space-y-1 mb-4">
                  <li>Any indirect, incidental, special or consequential damages</li>
                  <li>Errors or inaccuracies in job postings or candidate information</li>
                  <li>Employment decisions made based on information provided through the Service</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">8. Changes to Terms</h2>
                <p className="text-gray-600">
                  We reserve the right to modify these terms at any time. We will provide notice of significant changes through the Service or via email. Your continued use of the Service after such modifications constitutes your acceptance of the new terms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">9. Governing Law</h2>
                <p className="text-gray-600">
                  These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">10. Contact Information</h2>
                <p className="text-gray-600">
                  For questions about these Terms, please contact us at:
                </p>
                <address className="text-gray-600 not-italic mt-2">
                  JobHub Inc.<br />
                  123 Legal Avenue, Suite 200<br />
                  Tech City, TC 12345<br />
                  United States<br />
                  <a href="mailto:legal@jobhub.com" className="text-blue-600 hover:underline">legal@jobhub.com</a>
                </address>
              </section>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center">
        <Link
          to="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition mb-4 sm:mb-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default TermsOfService;