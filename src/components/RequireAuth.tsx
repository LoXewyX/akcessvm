import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

interface RequireAuthProps {
  allowedRoles: number[];
  children?: React.ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ allowedRoles, children }) => {
  const { auth } = useAuth();

  if (auth?.roles?.some(role => allowedRoles.includes(role))) {
    return <>{children}</>;
  }

  if (auth?.accessToken) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Navigate to="/login" replace />;
};

export default RequireAuth;
