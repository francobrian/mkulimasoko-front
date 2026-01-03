import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../common/LoadingSpinner';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles.length > 0) {
    const userRole = user?.role || user?.roles?.[0];
    if (!userRole || !allowedRoles.includes(userRole)) {
      return <Navigate to="/" />;
    }
  }

  return children;
};

export default ProtectedRoute;