import api from '../api';
import { useState } from 'react';
import { CheckCircle, Bell, BellOff, X } from 'react-feather'; // Using Feather icons

function NotificationList({ notifications, setNotifications }) {
  const [expandedId, setExpandedId] = useState(null);

  const handleMarkAsRead = async (id) => {
    try {
      await api.put(`http://localhost:5000/api/notifications/${id}/read`);
      setNotifications(notifications.map(notif => 
        notif._id === id ? { ...notif, isRead: true } : notif
      ));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleDismiss = async (id) => {
    try {
      await api.delete(`hhttp://localhost:5000/api/notifications/${id}`);
      setNotifications(notifications.filter(notif => notif._id !== id));
    } catch (error) {
      console.error('Error dismissing notification:', error);
    }
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="max-w-md mx-auto space-y-3">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <Bell className="mr-2" size={20} />
        Notifications
        <span className="ml-auto text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
          {notifications.filter(n => !n.isRead).length} unread
        </span>
      </h2>

      {notifications.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <BellOff className="mx-auto mb-2" size={24} />
          No notifications to display
        </div>
      ) : (
        notifications.map(notif => (
          <div 
            key={notif._id} 
            className={`relative p-4 rounded-lg shadow-sm transition-all duration-200 
              ${notif.isRead ? 'bg-white border border-gray-200' : 'bg-blue-50 border border-blue-100'}
              ${expandedId === notif._id ? 'transform scale-[1.02] shadow-md' : ''}
            `}
          >
            <div className="flex items-start">
              <div className={`flex-shrink-0 h-3 w-3 mt-1 rounded-full mr-3 
                ${notif.isRead ? 'bg-gray-400' : 'bg-blue-500 animate-pulse'}`}
              />
              
              <div 
                className="flex-grow cursor-pointer" 
                onClick={() => toggleExpand(notif._id)}
              >
                <h3 className={`font-medium ${notif.isRead ? 'text-gray-700' : 'text-gray-900'}`}>
                  {notif.title || 'New Notification'}
                </h3>
                <p className={`text-sm ${notif.isRead ? 'text-gray-500' : 'text-gray-600'}`}>
                  {notif.message}
                </p>
                {expandedId === notif._id && notif.details && (
                  <div className="mt-2 text-xs text-gray-500 bg-gray-50 p-2 rounded">
                    {notif.details}
                  </div>
                )}
                <div className="text-xs text-gray-400 mt-1">
                  {new Date(notif.createdAt).toLocaleString()}
                </div>
              </div>
              
              <div className="flex space-x-2 ml-2">
                {!notif.isRead && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMarkAsRead(notif._id);
                    }}
                    className="text-blue-500 hover:text-blue-700 p-1 rounded-full hover:bg-blue-100"
                    title="Mark as read"
                  >
                    <CheckCircle size={16} />
                  </button>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDismiss(notif._id);
                  }}
                  className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                  title="Dismiss"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default NotificationList;