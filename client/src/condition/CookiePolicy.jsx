import React from 'react';
import { Link } from 'react-router-dom';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Cookie Policy</h1>
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
                <h2 className="text-xl font-semibold text-gray-800 mb-4">1. What Are Cookies</h2>
                <p className="text-gray-600">
                  Cookies are small text files stored on your device when you visit websites. They help the site remember information about your visit, which can make it easier to visit again and make the site more useful to you.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">2. How We Use Cookies</h2>
                <p className="text-gray-600 mb-4">
                  JobHub uses cookies for several purposes:
                </p>
                <ul className="list-disc pl-5 text-gray-600 space-y-1 mb-4">
                  <li><strong>Essential Cookies:</strong> Necessary for the website to function properly</li>
                  <li><strong>Preference Cookies:</strong> Remember your choices and preferences</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our site</li>
                  <li><strong>Marketing Cookies:</strong> Used to track visitors across websites for relevant advertising</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">3. Types of Cookies We Use</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cookie</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-3 text-sm text-gray-600">session_id</td>
                        <td className="px-4 py-3 text-sm text-gray-600">Maintain user session</td>
                        <td className="px-4 py-3 text-sm text-gray-600">Session</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm text-gray-600">pref_lang</td>
                        <td className="px-4 py-3 text-sm text-gray-600">Store language preference</td>
                        <td className="px-4 py-3 text-sm text-gray-600">1 year</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm text-gray-600">_ga</td>
                        <td className="px-4 py-3 text-sm text-gray-600">Google Analytics</td>
                        <td className="px-4 py-3 text-sm text-gray-600">2 years</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm text-gray-600">_fbp</td>
                        <td className="px-4 py-3 text-sm text-gray-600">Facebook Pixel</td>
                        <td className="px-4 py-3 text-sm text-gray-600">3 months</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">4. Third-Party Cookies</h2>
                <p className="text-gray-600 mb-4">
                  We may use services that place cookies on our behalf, including:
                </p>
                <ul className="list-disc pl-5 text-gray-600 space-y-1 mb-4">
                  <li><strong>Google Analytics:</strong> For understanding site usage</li>
                  <li><strong>Hotjar:</strong> For user behavior analytics</li>
                  <li><strong>Facebook Pixel:</strong> For advertising effectiveness</li>
                  <li><strong>LinkedIn Insight Tag:</strong> For tracking conversions</li>
                </ul>
                <p className="text-gray-600">
                  These third-party services have their own privacy policies and may use information (not including your name or email) for their own purposes.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">5. Managing Cookies</h2>
                <p className="text-gray-600 mb-4">
                  You can control and/or delete cookies as you wish. Most browsers allow you to:
                </p>
                <ul className="list-disc pl-5 text-gray-600 space-y-1 mb-4">
                  <li>Delete all cookies from your browser</li>
                  <li>Block all cookies</li>
                  <li>Allow cookies only from selected sites</li>
                </ul>
                <p className="text-gray-600 mb-4">
                  To manage cookies in your browser, consult your browser's help documentation. Please note that disabling cookies may affect the functionality of our website.
                </p>
                <h3 className="text-lg font-medium text-gray-700 mb-2">Cookie Consent</h3>
                <p className="text-gray-600">
                  When you first visit our website, we ask for your consent to use non-essential cookies. You can change your cookie preferences at any time by clicking the "Cookie Settings" link in our website footer.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">6. Changes to This Policy</h2>
                <p className="text-gray-600">
                  We may update this Cookie Policy from time to time. We will notify you of any changes by posting the new policy on this page with an updated "Last Updated" date. We recommend reviewing this policy periodically.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">7. Contact Us</h2>
                <p className="text-gray-600">
                  For questions about our use of cookies, please contact us at:
                </p>
                <address className="text-gray-600 not-italic mt-2">
                  JobHub Inc.<br />
                  123 Privacy Lane, Suite 100<br />
                  Tech City, TC 12345<br />
                  United States<br />
                  <a href="mailto:privacy@jobhub.com" className="text-blue-600 hover:underline">privacy@jobhub.com</a>
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

export default CookiePolicy;