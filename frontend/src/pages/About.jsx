// src/pages/About.jsx
function About() {
    return (
      <div className="bg-white p-6 rounded shadow-md max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">About Job Platform</h1>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-700">
            At Job Platform, our mission is to bridge the gap between job seekers and employers by providing a seamless, 
            efficient, and user-friendly platform. We aim to empower individuals to find their dream jobs and help 
            businesses discover top talent.
          </p>
        </section>
  
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Job listings tailored to your skills and preferences.</li>
            <li>A powerful resume builder to showcase your experience.</li>
            <li>Career resources to help you succeed in your job search.</li>
            <li>Tools for employers to manage job postings and applicants.</li>
            <li>Real-time notifications to keep you updated.</li>
          </ul>
        </section>
  
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
          <p className="text-gray-700">
            We are a dedicated team of developers, designers, and career experts working together to create a platform 
            that makes job hunting and hiring easier for everyone. Based in Career City, we’re passionate about 
            transforming the job market.
          </p>
        </section>
  
        <section className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <p className="text-gray-700 mb-4">
            Have questions or feedback? We’d love to hear from you!
          </p>
          <a href="mailto:support@jobplatform.com" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Contact Us
          </a>
        </section>
      </div>
    )
  }
  
  export default About