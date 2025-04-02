import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import { getAnalytics, getCategories, createCategory, updateCategory, deleteCategory } from '../services/adminService';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { FiEdit2, FiTrash2, FiPlus, FiX, FiUsers, FiBriefcase, FiMessageSquare, FiPieChart, FiBarChart2 } from 'react-icons/fi';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

function AdminDashboard() {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [analytics, setAnalytics] = useState(null);
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [activeTab, setActiveTab] = useState('analytics');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const analyticsData = await getAnalytics();
        const categoryData = await getCategories();
        setAnalytics(analyticsData);
        setCategories(categoryData.categories);
      } catch (error) {
        console.error('Failed to fetch admin data', error);
      }
    };
    if (user && user.role === 'admin') fetchData();
  }, [user]);

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
      const updatedCategory = await updateCategory(editingCategory._id, data);
      setCategories(categories.map(cat => (cat._id === updatedCategory._id ? updatedCategory : cat)));
      setEditingCategory(null);
      reset();
    } catch (error) {
      console.error('Failed to update category', error);
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    reset({ name: category.name });
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

  // Chart Data for Analytics
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
            {/* Stats Cards */}
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

            {/* Charts */}
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
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold flex items-center">
                <FiBriefcase className="mr-2" /> Job Categories
              </h2>
            </div>

            <div className="p-6">
              <form onSubmit={handleSubmit(editingCategory ? onUpdateSubmit : onCreateSubmit)} className="mb-8">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-grow">
                    <input
                      {...register('name', { required: 'Category name is required' })}
                      placeholder="Enter category name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      type="submit"
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      {editingCategory ? (
                        <>
                          <FiEdit2 className="mr-2" /> Update
                        </>
                      ) : (
                        <>
                          <FiPlus className="mr-2" /> Add
                        </>
                      )}
                    </button>
                    {editingCategory && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingCategory(null);
                          reset();
                        }}
                        className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                      >
                        <FiX className="mr-2" /> Cancel
                      </button>
                    )}
                  </div>
                </div>
              </form>

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
                    {categories.map((category) => (
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
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;