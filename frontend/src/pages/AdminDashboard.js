import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import { getAnalytics, getCategories, createCategory, updateCategory, deleteCategory } from '../services/adminService';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function AdminDashboard() {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [analytics, setAnalytics] = useState(null);
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);

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
      alert('Category created!');
      reset();
    } catch (error) {
      console.error('Failed to create category', error);
      alert('Failed to create category');
    }
  };

  const onUpdateSubmit = async (data) => {
    try {
      const updatedCategory = await updateCategory(editingCategory._id, data);
      setCategories(categories.map(cat => (cat._id === updatedCategory._id ? updatedCategory : cat)));
      alert('Category updated!');
      setEditingCategory(null);
      reset();
    } catch (error) {
      console.error('Failed to update category', error);
      alert('Failed to update category');
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
        alert('Category deleted!');
      } catch (error) {
        console.error('Failed to delete category', error);
        alert('Failed to delete category');
      }
    }
  };

  if (!user || user.role !== 'admin') {
    return <div className="container py-5">Unauthorized access.</div>;
  }

  // Chart Data for Analytics
  const chartData = {
    labels: ['Users', 'Job Postings', 'Feedback'],
    datasets: [
      {
        label: 'Counts',
        data: [
          analytics?.userCount || 0,
          analytics?.jobCount || 0,
          analytics?.feedbackCount || 0,
        ],
        backgroundColor: ['#007bff', '#28a745', '#ffc107'],
        borderColor: ['#0056b3', '#218838', '#e0a800'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Platform Analytics' },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="container py-5">
      <h1 className="display-5 fw-bold mb-5">Admin Dashboard</h1>

      {/* Analytics Section */}
      <div className="card shadow mb-5">
        <div className="card-body">
          <h2 className="h4 fw-bold mb-4">Analytics</h2>
          {analytics ? (
            <div className="row">
              <div className="col-md-6">
                <p><strong>Total Users:</strong> {analytics.userCount}</p>
                <p><strong>Total Job Postings:</strong> {analytics.jobCount}</p>
                <p><strong>Total Feedback:</strong> {analytics.feedbackCount}</p>
              </div>
              <div className="col-md-6">
                <Bar data={chartData} options={chartOptions} />
              </div>
            </div>
          ) : (
            <p>Loading analytics...</p>
          )}
        </div>
      </div>

      {/* Categories Section */}
      <div className="card shadow">
        <div className="card-body">
          <h2 className="h4 fw-bold mb-4">Manage Categories</h2>

          {/* Category Form */}
          <form onSubmit={handleSubmit(editingCategory ? onUpdateSubmit : onCreateSubmit)} className="mb-4">
            <div className="input-group">
              <input
                {...register('name', { required: 'Category name is required' })}
                placeholder="Category Name"
                className="form-control"
              />
              <button type="submit" className="btn btn-primary">
                {editingCategory ? 'Update Category' : 'Add Category'}
              </button>
              {editingCategory && (
                <button
                  type="button"
                  className="btn btn-secondary ms-2"
                  onClick={() => {
                    setEditingCategory(null);
                    reset();
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
            {errors.name && <p className="text-danger small mt-1">{errors.name.message}</p>}
          </form>

          {/* Category List */}
          <ul className="list-group">
            {categories.map(category => (
              <li key={category._id} className="list-group-item d-flex justify-content-between align-items-center">
                {category.name}
                <div>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(category)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(category._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;