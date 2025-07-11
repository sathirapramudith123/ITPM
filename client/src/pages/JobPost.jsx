import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const JOBS_API_URL = 'http://localhost:5000/api/jobs';
const COMPANIES_API_URL = 'http://localhost:5000/api/companies';

const JobVacancyManager = () => {
  const [jobs, setJobs] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    companyId: '',
    jobType: '',
  });
  const [editIndex, setEditIndex] = useState(null);
  const [editJobId, setEditJobId] = useState(null);

  const pdfRef = useRef(); // PDF Target

  useEffect(() => {
    axios.get(JOBS_API_URL)
      .then((res) => setJobs(res.data))
      .catch((err) => console.error('Error fetching jobs:', err));

    axios.get(COMPANIES_API_URL)
      .then((res) => setCompanies(res.data))
      .catch((err) => console.error('Error fetching companies:', err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editJobId) {
      axios.put(`${JOBS_API_URL}/${editJobId}`, formData)
        .then((res) => {
          const updatedJobs = jobs.map((job) =>
            job._id === editJobId ? res.data : job
          );
          setJobs(updatedJobs);
          resetForm();
        })
        .catch((err) => console.error('Error updating job:', err));
    } else {
      axios.post(JOBS_API_URL, formData)
        .then((res) => {
          setJobs([...jobs, res.data]);
          resetForm();
        })
        .catch((err) => console.error('Error posting job:', err));
    }
    setEditIndex(null);
    setEditJobId(null);
  };

  const handleEdit = (index) => {
    const job = jobs[index];
    setFormData({ ...job });
    setEditIndex(index);
    setEditJobId(job._id);
  };

  const handleDelete = (index) => {
    const jobId = jobs[index]._id;
    axios.delete(`${JOBS_API_URL}/${jobId}`)
      .then(() => {
        setJobs(jobs.filter((_, i) => i !== index));
      })
      .catch((err) => console.error('Error deleting job:', err));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: '',
      companyId: '',
      jobType: '',
    });
  };

  // Generate PDF
  const generatePDF = () => {
    const input = pdfRef.current;
    html2canvas(input, {
      scale: 3,
      useCORS: true,
      allowTaint: false,
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('job-listings.pdf');
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {editIndex !== null ? 'Edit Job' : 'Post New Job'}
      </h2>

      {/* Job Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Job Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full border px-3 py-2 rounded-md shadow-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="mt-1 block w-full border px-3 py-2 rounded-md shadow-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 block w-full border px-3 py-2 rounded-md shadow-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Company</label>
          <select
            name="companyId"
            value={formData.companyId}
            onChange={handleChange}
            className="mt-1 block w-full border px-3 py-2 rounded-md shadow-sm"
            required
          >
            <option value="">Select a company</option>
            {companies.map((company) => (
              <option key={company._id} value={company._id}>
                {company.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Job Type</label>
          <select
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            className="mt-1 block w-full border px-3 py-2 rounded-md shadow-sm"
            required
          >
            <option value="">Select</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Internship">Internship</option>
            <option value="Remote">Remote</option>
          </select>
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            {editIndex !== null ? 'Update Job' : 'Post Job'}
          </button>
        </div>
      </form>

      {/* Job List */}
      <div className="mt-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Posted Jobs</h3>
          {jobs.length > 0 && (
            <button
              onClick={generatePDF}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Download PDF
            </button>
          )}
        </div>

        {/* PDF Export Area */}
        <div ref={pdfRef} className="bg-white p-8 rounded-md space-y-6">
          {/* PDF Header */}
          <div className="text-center border-b pb-4 mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Job Listings Report</h1>
            <p className="text-gray-600 text-sm">Generated on {new Date().toLocaleDateString()}</p>
          </div>

          {jobs.length === 0 ? (
            <p className="text-gray-500">No job posts yet.</p>
          ) : (
            <ul className="space-y-6">
              {jobs.map((job, index) => (
                <li
                  key={job._id}
                  className="border border-gray-300 p-4 rounded-lg shadow-sm"
                >
                  <h2 className="text-xl font-semibold text-blue-800">{job.title}</h2>
                  <p className="text-gray-700 mt-1"><strong>Description:</strong> {job.description}</p>
                  <p className="text-gray-700"><strong>Category:</strong> {job.category}</p>
                  <p className="text-gray-700"><strong>Company:</strong> {job.companyProfile}</p>
                  <p className="text-gray-700"><strong>Type:</strong> {job.jobType}</p>
                  <div className="mt-2 space-x-3 no-print">
                    <button
                      onClick={() => handleEdit(index)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobVacancyManager;
