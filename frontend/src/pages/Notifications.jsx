import { useState, useEffect } from 'react'
import api from '../api'
import NotificationList from '../components/NotificationList'

function Notifications() {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await api.get('/notifications')
        setNotifications(res.data)
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch notifications')
      } finally {
        setLoading(false)
      }
    }
    fetchNotifications()
  }, [])

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  )

  if (error) return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded shadow">
      <p className="font-bold">Error</p>
      <p>{error}</p>
    </div>
  )

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Notifications</h2>
        {notifications.length > 0 && (
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
            {notifications.length} new
          </span>
        )}
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <NotificationList 
          notifications={notifications} 
          setNotifications={setNotifications} 
        />
        
        {notifications.length === 0 && (
          <div className="text-center py-10">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">No notifications yet</h3>
            <p className="mt-1 text-sm text-gray-500">We'll notify you when something arrives.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Notifications