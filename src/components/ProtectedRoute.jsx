// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { authService } from '../lib/auth';

const ProtectedRoute = ({ children }) => {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;