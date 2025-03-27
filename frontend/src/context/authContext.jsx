// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from 'react'
import api from '../api' // Importing the Axios instance

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          const res = await api.get('/auth/profile') // Using Axios via api
          setUser(res.data)
        } catch (err) {
          setError(err.response?.data?.message || 'Failed to fetch profile')
          localStorage.removeItem('token')
        } finally {
          setLoading(false)
        }
      } else {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [])

  const login = async (email, password) => {
    try {
      setError(null)
      const res = await api.post('/auth/login', { email, password }) // Using Axios via api
      localStorage.setItem('token', res.data.token)
      setUser(res.data.user)
      return res.data
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
      throw err
    }
  }

  const register = async (username, email, password, role) => {
    try {
      setError(null)
      const res = await api.post('/auth/register', { username, email, password, role }) // Using Axios via api
      localStorage.setItem('token', res.data.token)
      setUser(res.data.user)
      return res.data
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
      throw err
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    setError(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}