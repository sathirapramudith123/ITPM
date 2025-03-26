import React, { useState } from 'react';
import Login from '../src/components/Login';
import Signup from '../src/components/Register'; // New import
import Profile from '../src/components/Profile';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [isSignup, setIsSignup] = useState(false); // Toggle between login/signup

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {token ? (
        <div className="w-full max-w-md">
          <Profile token={token} />
          <button
            onClick={handleLogout}
            className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="w-full max-w-md">
          {isSignup ? (
            <Signup setToken={setToken} setIsSignup={setIsSignup} />
          ) : (
            <Login setToken={setToken} setIsSignup={setIsSignup} />
          )}
          <p className="mt-4 text-center">
            {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="text-blue-500 hover:underline"
            >
              {isSignup ? 'Login' : 'Sign Up'}
            </button>
          </p>
        </div>
      )}
    </div>
  );
}

export default App;