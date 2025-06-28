import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="prose max-w-none">
              <p className="text-gray-600 mb-6">
                Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">1. Introduction</h2>
                <p className="text-gray-600 mb-4">
                  Welcome to JobHub. We are committed to protecting your personal information and your right to privacy.
                  If you have any questions or concerns about this privacy notice, or our practices with regards to your
                  personal information, please contact us at privacy@jobhub.com.
                </p>
                <p className="text-gray-600">
                  This Privacy Policy applies to all information collected through our services (including our website and
                  mobile application), as well as any related services, sales, marketing or events.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">2. Information We Collect</h2>
                <p className="text-gray-600 mb-4">
                  We collect personal information that you voluntarily provide to us when you register on the website,
                  express an interest in obtaining information about us or our products and services, or otherwise when
                  you contact us.
                </p>
                <h3 className="text-lg font-medium text-gray-700 mb-2">Personal Information You Disclose to Us</h3>
                <ul className="list-disc pl-5 text-gray-600 mb-4 space-y-1">
                  <li>Name and contact details (email, phone number, address)</li>
                  <li>Resume/CV and work history</li>
                  <li>Education and professional qualifications</li>
                  <li>Job preferences and search criteria</li>
                  <li>Any other information you include in your profile or applications</li>
                </ul>
                <h3 className="text-lg font-medium text-gray-700 mb-2">Information Automatically Collected</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>IP address and device characteristics</li>
                  <li>Browser type and version</li>
                  <li>Pages you visit and time spent on those pages</li>
                  <li>Other diagnostic data</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">3. How We Use Your Information</h2>
                <p className="text-gray-600 mb-4">
                  We use the information we collect or receive:
                </p>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>To facilitate account creation and logon process</li>
                  <li>To provide and maintain our service</li>
                  <li>To notify you about changes to our service</li>
                  <li>To allow you to participate in interactive features of our service</li>
                  <li>To provide customer support</li>
                  <li>To gather analysis or valuable information so that we can improve our service</li>
                  <li>To monitor the usage of our service</li>
                  <li>To detect, prevent and address technical issues</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">4. Sharing Your Information</h2>
                <p className="text-gray-600 mb-4">
                  We only share information with your consent, to comply with laws, to provide you with services, to
                  protect your rights, or to fulfill business obligations. We may process or share your data that we
                  hold based on the following legal basis:
                </p>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li><strong>Consent:</strong> We may process your data if you have given us specific consent.</li>
                  <li><strong>Legitimate Interests:</strong> We may process your data when reasonably necessary.</li>
                  <li><strong>Legal Obligations:</strong> We may disclose your information where legally required.</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">5. Data Security</h2>
                <p className="text-gray-600 mb-4">
                  We have implemented appropriate technical and organizational security measures designed to protect the
                  security of any personal information we process. However, please also remember that we cannot guarantee
                  that the internet itself is 100% secure.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">6. Your Privacy Rights</h2>
                <p className="text-gray-600 mb-4">
                  Depending on your location, you may have certain rights regarding your personal information, including:
                </p>
                <ul className="list-disc pl-5 text-gray-600 mb-4 space-y-1">
                  <li>Request access to your personal information</li>
                  <li>Request correction of your personal information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Object to processing of your personal information</li>
                  <li>Request restriction of processing your personal information</li>
                  <li>Request transfer of your personal information</li>
                  <li>Withdraw your consent</li>
                </ul>
                <p className="text-gray-600">
                  To exercise these rights, please contact us at privacy@jobhub.com.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">7. Updates to This Policy</h2>
                <p className="text-gray-600">
                  We may update this Privacy Policy from time to time. The updated version will be indicated by an
                  updated "Last Updated" date and the updated version will be effective as soon as it is accessible.
                  We encourage you to review this privacy policy frequently to stay informed.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">8. Contact Us</h2>
                <p className="text-gray-600 mb-2">
                  If you have questions or comments about this policy, you may email us at privacy@jobhub.com or by post to:
                </p>
                <address className="text-gray-600 not-italic">
                  JobHub Inc.<br />
                  123 Privacy Lane, Suite 100<br />
                  Tech City, TC 12345<br />
                  United States
                </address>
              </section>
            </div>
          </div>
        </div>
      </main>

      {/* Back to Home Link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link
          to="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition"
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

export default PrivacyPolicy;