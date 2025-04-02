import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import { getAnalytics, getCategories, createCategory, updateCategory, deleteCategory } from '../services/adminService';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { FiEdit2, FiTrash2, FiPlus, FiX, FiUsers, FiBriefcase, FiMessageSquare, FiPieChart, FiBarChart2, FiSearch, FiDownload } from 'react-icons/fi';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

function AdminDashboard() {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  const [analytics, setAnalytics] = useState(null);
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [activeTab, setActiveTab] = useState('analytics');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const analyticsData = await getAnalytics();
        const categoryData = await getCategories();
        setAnalytics(analyticsData);
        setCategories(categoryData.categories);
        setFilteredCategories(categoryData.categories);
      } catch (error) {
        console.error('Failed to fetch admin data', error);
      }
    };
    if (user && user.role === 'admin') fetchData();
  }, [user]);

  useEffect(() => {
    const filtered = categories.filter(category => 
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCategories(filtered);
  }, [searchTerm, categories]);

  const onCreateSubmit = async (data) => {
    try {
      const newCategory = await createCategory(data);
      setCategories([...categories, newCategory]);
      reset();
    } catch (error) {
      console.error('Failed to create category', error);
    }
  };

  const onUpdateSubmit = async (data) => {
    try {
      if (!editingCategory) return;
      const updatedCategory = await updateCategory(editingCategory._id, data);
      setCategories(categories.map(cat => 
        cat._id === updatedCategory._id ? updatedCategory : cat
      ));
      setEditingCategory(null);
      reset();
    } catch (error) {
      console.error('Failed to update category', error);
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setValue('name', category.name);
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
    reset();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteCategory(id);
        setCategories(categories.filter(cat => cat._id !== id));
      } catch (error) {
        console.error('Failed to delete category', error);
      }
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Add header
    doc.setFontSize(18);
    doc.setTextColor(40);
    doc.text('Job Categories Report', 14, 22);
    
    // Add date
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 32);
    
    // Prepare table data
    const tableData = filteredCategories.map((category, index) => [
      index + 1,
      category.name
    ]);

    // Generate table
    doc.autoTable({
      startY: 40,
      head: [['#', 'Category Name']],
      body: tableData,
      styles: {
        fontSize: 10,
        cellPadding: 3,
      },
      headStyles: {
        fillColor: [66, 153, 225], // Blue header
        textColor: 255,
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245] // Light gray for alternate rows
      },
      margin: { top: 40 },
    });

    // Add footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(150);
      doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.width - 20, doc.internal.pageSize.height - 10, { align: 'right' });
    }

    // Save the PDF
    doc.save(`categories_report_${new Date().toISOString().slice(0,10)}.pdf`);
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Unauthorized Access</h2>
          <p className="text-gray-600 mb-6">You don't have permission to view this page.</p>
          <a href="/" className="text-blue-600 hover:text-blue-800 font-medium">Return to Home</a>
        </div>
      </div>
    );
  }

  const barChartData = {
    labels: ['Users', 'Job Postings', 'Feedback'],
    datasets: [
      {
        label: 'Counts',
        data: [
          analytics?.userCount || 0,
          analytics?.jobCount || 0,
          analytics?.feedbackCount || 0,
        ],
        backgroundColor: ['#3B82F6', '#10B981', '#F59E0B'],
        borderColor: ['#2563EB', '#059669', '#D97706'],
        borderWidth: 1,
      },
    ],
  };

  const pieChartData = {
    labels: ['Active Users', 'Inactive Users'],
    datasets: [{
      data: [analytics?.activeUsers || 0, (analytics?.userCount || 0) - (analytics?.activeUsers || 0)],
      backgroundColor: ['#10B981', '#EF4444'],
      hoverBackgroundColor: ['#059669', '#DC2626']
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="flex space-x-2 mt-4 md:mt-0">
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-4 py-2 rounded-lg ${activeTab === 'analytics' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
            >
              <FiBarChart2 className="inline mr-2" /> Analytics
            </button>
            <button
              onClick={() => setActiveTab('categories')}
              className={`px-4 py-2 rounded-lg ${activeTab === 'categories' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
            >
              <FiBriefcase className="inline mr-2" /> Categories
            </button>
          </div>
        </div>

        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                  <FiUsers size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Users</p>
                  <h3 className="text-2xl font-bold">{analytics?.userCount || 0}</h3>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                  <FiBriefcase size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Job Postings</p>
                  <h3 className="text-2xl font-bold">{analytics?.jobCount || 0}</h3>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
                  <FiMessageSquare size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Feedback</p>
                  <h3 className="text-2xl font-bold">{analytics?.feedbackCount || 0}</h3>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <FiBarChart2 className="mr-2" /> Platform Analytics
              </h3>
              <div className="h-64">
                <Bar data={barChartData} options={chartOptions} />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <FiPieChart className="mr-2" /> User Status
              </h3>
              <div className="h-64">
                <Pie data={pieChartData} options={chartOptions} />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'categories' && (
          <div className="space-y-6">
            {/* Category Form */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <FiPlus className="mr-2" /> {editingCategory ? 'Update Category' : 'Add New Category'}
              </h3>
              
              <form onSubmit={handleSubmit(editingCategory ? onUpdateSubmit : onCreateSubmit)}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Category Name
                  </label>
                  <input
                    {...register('name', { 
                      required: 'Category name is required',
                      minLength: { value: 2, message: 'Minimum 2 characters required' },
                      maxLength: { value: 50, message: 'Maximum 50 characters allowed' }
                    })}
                    id="name"
                    placeholder="Enter category name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                </div>

                <div className="flex space-x-2 justify-end">
                  {editingCategory && (
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      <FiX className="mr-2" /> Cancel
                    </button>
                  )}
                  <button
                    type="submit"
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    disabled={Object.keys(errors).length > 0}
                  >
                    {editingCategory ? (
                      <>
                        <FiEdit2 className="mr-2" /> Update Category
                      </>
                    ) : (
                      <>
                        <FiPlus className="mr-2" /> Add Category
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Categories List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold flex items-center">
                    <FiBriefcase className="mr-2" /> Job Categories
                  </h2>
                  <button
                    onClick={generatePDF}
                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <FiDownload className="mr-2" /> Export PDF
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-6">
                  <div className="relative">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search categories..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredCategories.map((category) => (
                        <tr key={category._id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {category.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <button
                                onClick={() => handleEdit(category)}
                                className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                                title="Edit"
                              >
                                <FiEdit2 />
                              </button>
                              <button
                                onClick={() => handleDelete(category._id)}
                                className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                                title="Delete"
                              >
                                <FiTrash2 />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;