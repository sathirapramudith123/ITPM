// src/pages/Profile.jsx
import { useState, useEffect, useContext } from 'react'
import api from '../api' // Importing Axios instance
import { AuthContext } from '../context/authContext.jsx'

function Profile() {
  const { user, logout } = useContext(AuthContext)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    email: ''
  })

  // Fetch profile data on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/auth/profile') // Using Axios to fetch profile
        setProfile(res.data)
        setFormData({
          username: res.data.username,
          email: res.data.email
        })
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch profile')
      } finally {
        setLoading(false)
      }
    }
    if (user) fetchProfile()
    else setLoading(false)
  }, [user])

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // Handle profile update
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await api.put('/auth/profile', formData) // Using Axios to update profile
      setProfile(res.data)
      setEditMode(false)
      alert('Profile updated successfully!')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile')
    }
  }

  if (loading) return <div className="text-center">Loading...</div>
  if (!user) return <div className="text-center text-red-500">Please log in to view your profile.</div>
  if (error) return <div className="text-center text-red-500">{error}</div>

  return (
    <div className="bg-white p-6 rounded shadow-md max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">My Profile</h1>

      {editMode ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="flex space-x-4">
            <button type="submit" className="flex-1 bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditMode(false)}
              className="flex-1 bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <div>
            <p className="text-gray-700"><strong>Username:</strong> {profile.username}</p>
            <p className="text-gray-700"><strong>Email:</strong> {profile.email}</p>
            <p className="text-gray-700"><strong>Role:</strong> {profile.role}</p>
            <p className="text-gray-700"><strong>Joined:</strong> {new Date(profile.createdAt).toLocaleDateString()}</p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => setEditMode(true)}
              className="flex-1 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Edit Profile
            </button>
            <button
              onClick={logout}
              className="flex-1 bg-red-500 text-white p-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile