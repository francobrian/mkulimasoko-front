import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState(localStorage.getItem('mkulimasoko_token'));

  // Check if token exists and validate it on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('mkulimasoko_token');
      if (token) {
        try {
          // Verify token with backend
          const response = await authAPI.verifyToken(token);
          if (response.data.valid) {
            setUser(response.data.user);
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem('mkulimasoko_token');
          }
        } catch (error) {
          console.error('Token validation failed:', error);
          localStorage.removeItem('mkulimasoko_token');
        }
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await authAPI.login({ email, password });
      
      const { token, user } = response.data;
      
      // Store token and user data
      localStorage.setItem('mkulimasoko_token', token);
      localStorage.setItem('mkulimasoko_user', JSON.stringify(user));
      
      // Update state
      setAuthToken(token);
      setUser(user);
      setIsAuthenticated(true);
      
      toast.success('Login successful!');
      return { success: true, user };
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed. Please try again.';
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await authAPI.register(userData);
      
      const { token, user } = response.data;
      
      // Store token and user data
      localStorage.setItem('mkulimasoko_token', token);
      localStorage.setItem('mkulimasoko_user', JSON.stringify(user));
      
      // Update state
      setAuthToken(token);
      setUser(user);
      setIsAuthenticated(true);
      
      toast.success('Registration successful!');
      return { success: true, user };
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = useCallback(() => {
    localStorage.removeItem('mkulimasoko_token');
    localStorage.removeItem('mkulimasoko_user');
    setAuthToken(null);
    setUser(null);
    setIsAuthenticated(false);
    toast.info('Logged out successfully');
  }, []);

  // Update user profile
  const updateUser = (updatedUser) => {
    const currentUser = JSON.parse(localStorage.getItem('mkulimasoko_user') || '{}');
    const mergedUser = { ...currentUser, ...updatedUser };
    localStorage.setItem('mkulimasoko_user', JSON.stringify(mergedUser));
    setUser(mergedUser);
  };

  // Check if user has specific role
  const hasRole = (role) => {
    return user?.roles?.includes(role) || user?.role === role;
  };

  // Check if user has any of the specified roles
  const hasAnyRole = (roles) => {
    return roles.some(role => hasRole(role));
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    authToken,
    login,
    register,
    logout,
    updateUser,
    hasRole,
    hasAnyRole
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};