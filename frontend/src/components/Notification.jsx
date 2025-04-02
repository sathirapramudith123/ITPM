import React, { useEffect } from 'react';
import { FiCheckCircle, FiAlertCircle, FiInfo, FiX, FiAlertTriangle } from 'react-icons/fi';

function Notification({ message, type = 'success', onDismiss, autoClose = 5000 }) {
  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        onDismiss?.();
      }, autoClose);
      return () => clearTimeout(timer);
    }
  }, [autoClose, onDismiss]);

  const getNotificationStyles = () => {
    const baseStyles = "flex items-start p-4 rounded-lg shadow-lg fixed top-4 right-4 max-w-xs z-50 transform transition-all duration-300";
    switch (type) {
      case 'success':
        return `${baseStyles} bg-green-50 border border-green-100 text-green-800`;
      case 'error':
        return `${baseStyles} bg-red-50 border border-red-100 text-red-800`;
      case 'warning':
        return `${baseStyles} bg-yellow-50 border border-yellow-100 text-yellow-800`;
      case 'info':
        return `${baseStyles} bg-blue-50 border border-blue-100 text-blue-800`;
      default:
        return `${baseStyles} bg-gray-50 border border-gray-100 text-gray-800`;
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FiCheckCircle className="text-green-500 text-xl mr-3 mt-0.5 flex-shrink-0" />;
      case 'error':
        return <FiAlertCircle className="text-red-500 text-xl mr-3 mt-0.5 flex-shrink-0" />;
      case 'warning':
        return <FiAlertTriangle className="text-yellow-500 text-xl mr-3 mt-0.5 flex-shrink-0" />;
      case 'info':
        return <FiInfo className="text-blue-500 text-xl mr-3 mt-0.5 flex-shrink-0" />;
      default:
        return <FiInfo className="text-gray-500 text-xl mr-3 mt-0.5 flex-shrink-0" />;
    }
  };

  return (
    <div className={getNotificationStyles()}>
      {getIcon()}
      <div className="flex-1">
        <p className="text-sm font-medium">{message}</p>
      </div>
      <button
        onClick={onDismiss}
        className="ml-2 text-gray-400 hover:text-gray-500 focus:outline-none"
        aria-label="Close notification"
      >
        <FiX className="text-lg" />
      </button>
    </div>
  );
}

export default Notification;