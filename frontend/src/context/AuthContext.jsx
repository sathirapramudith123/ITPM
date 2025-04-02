import React, { createContext, useState, useEffect } from 'react';
import { login, logout, getCurrentUser } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch current user on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser();
        setUser(data?.user || null); // Ensure data.user exists, fallback to null
      } catch (error) {
        console.error('Failed to fetch current user:', error.message); // Log error for debugging
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []); // Empty dependency array is fine since this runs once on mount

  // Sign in function with error handling
  const signIn = async (data) => {
    try {
      const response = await login(data);
      if (!response?.user) throw new Error('No user data in login response');
      setUser(response.user);
      return response; // Return response for potential use in components
    } catch (error) {
      console.error('Sign in failed:', error.message);
      throw error; // Re-throw to allow calling component to handle
    }
  };

  // Sign out function with error handling
  const signOut = async () => {
    try {
      await logout();
      setUser(null);
    } catch (error) {
      console.error('Sign out failed:', error.message);
      setUser(null); // Still clear user even if logout fails (e.g., token expired)
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};