import React from 'react';

function Notification({ message }) {
  return (
    <div className="bg-green-500 text-white p-2 rounded fixed top-4 right-4">
      {message}
    </div>
  );
}

export default Notification;