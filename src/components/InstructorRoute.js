import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';

const InstructorRoute = ({ children }) => {
  const { isAuthenticated, role } = useContext(AuthContext);
  return isAuthenticated && (role === 'INSTRUCTOR' || role === 'ADMIN') ? children : <Navigate to="/login" />;
};

export default InstructorRoute;