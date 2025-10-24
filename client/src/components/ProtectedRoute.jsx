import React from 'react';
import { Navigate } from 'react-router-dom';
import { authHelpers } from '../utils/api';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = authHelpers.isAuthenticated();
  
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;