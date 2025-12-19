import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  element: ReactNode;
}

export const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
  const token = localStorage.getItem('token');

  if (!token) {
    console.log(" no token ");
    return <Navigate to="/signin" replace />;
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000;
    console.log(exp);
    if (Date.now() > exp) {
      localStorage.removeItem('token');
      return <Navigate to="/signin" replace />;
    }
  } catch (e) {
    localStorage.removeItem('token');
    return <Navigate to="/signin" replace />;
  }

  return <>{element}</>;
};
