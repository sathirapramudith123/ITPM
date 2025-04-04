import React, { createContext, useState, useEffect } from 'react';
import { login, logout, getCurrentUser } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser();
        setUser(data?.user || null);
      } catch (error) {
        console.error('Failed to fetch current user:', error.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const signIn = async (data) => {
    try {
      const response = await login(data);
      if (!response?.user) throw new Error('No user data in login response');
      setUser(response.user);
      return response;
    } catch (error) {
      console.error('Sign in failed:', error.message);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await logout();
      setUser(null);
    } catch (error) {
      console.error('Sign out failed:', error.message);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};