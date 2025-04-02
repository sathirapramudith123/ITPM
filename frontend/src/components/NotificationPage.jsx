import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getNotifications, markNotificationAsRead, deleteNotification } from '../services/notificationService';
import { FiCheckCircle, FiAlertCircle, FiInfo, FiAlertTriangle, FiX } from 'react-icons/fi';

function NotificationPage() {
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNotifications = async () => {
      if (!user) return;
      try {
        setLoading(true);
        const { notifications } = await getNotifications();
        setNotifications(notifications);
      } catch (error) {
        console.error('Failed to fetch notifications', error);
      } finally {
        setLoading(false);
      }
    };
    loadNotifications();
  }, [user]);

  const handleMarkAsRead = async (id) => {
    try {
      const updatedNotification = await markNotificationAsRead(id);
      setNotifications(
        notifications.map((notif) =>
          notif._id === id ? { ...notif, read: updatedNotification.read } : notif
        )
      );
    } catch (error) {
      console.error('Failed to mark notification as read', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNotification(id);
      setNotifications(notifications.filter((notif) => notif._id !== id));
    } catch (error) {
      console.error('Failed to delete notification', error);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-center transform transition duration-500 hover:scale-105">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
            Please log in to view your notifications.
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-800 dark:via-gray-900 dark:to-black flex items-center justify-center p-6">
      <div className="bg-white dark:bg-gray-800 max-w-2xl w-full rounded-xl shadow-2xl p-8 transform transition-all duration-500 hover:shadow-3xl">
        <h1 className="text-3xl font-extrabold text-center text-indigo-600 dark:text-indigo-400 mb-6 animate-fade-in">
          Notifications
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <svg
              className="animate-spin h-8 w-8 text-indigo-600 dark:text-indigo-400"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
          </div>
        ) : notifications.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-300">
            No notifications to display.
          </p>
        ) : (
          <ul className="space-y-4">
            {notifications.map((notif) => (
              <li
                key={notif._id}
                className={`flex items-start p-4 rounded-lg shadow-sm transition-all duration-300 ${
                  notif.read
                    ? 'bg-gray-50 dark:bg-gray-700'
                    : 'bg-indigo-50 dark:bg-indigo-900'
                } hover:bg-gray-100 dark:hover:bg-gray-600`}
              >
                {notif.type === 'success' ? (
                  <FiCheckCircle className="text-green-500 text-xl mr-3 mt-0.5 flex-shrink-0" />
                ) : notif.type === 'error' ? (
                  <FiAlertCircle className="text-red-500 text-xl mr-3 mt-0.5 flex-shrink-0" />
                ) : notif.type === 'warning' ? (
                  <FiAlertTriangle className="text-yellow-500 text-xl mr-3 mt-0.5 flex-shrink-0" />
                ) : (
                  <FiInfo className="text-blue-500 text-xl mr-3 mt-0.5 flex-shrink-0" />
                )}

                <div className="flex-1">
                  <p
                    className={`text-sm font-medium text-gray-800 dark:text-gray-200 ${
                      notif.read ? 'font-normal' : 'font-semibold'
                    }`}
                  >
                    {notif.message}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {new Date(notif.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="flex space-x-2 ml-2">
                  {!notif.read && (
                    <button
                      onClick={() => handleMarkAsRead(notif._id)}
                      className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 text-sm font-medium"
                    >
                      Mark as Read
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(notif._id)}
                    className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                    aria-label="Delete notification"
                  >
                    <FiX className="text-lg" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default NotificationPage;