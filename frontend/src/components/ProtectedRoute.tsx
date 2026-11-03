// src/components/ProtectedRoute.tsx
import React, { useRef } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUserStore } from '../stores/useUserStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const location = useLocation();

  const hadSession = useRef(isAuthenticated);
  if (isAuthenticated) hadSession.current = true;

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={hadSession.current ? undefined : { from: location, denied: true }}
      />
    );
  }

  // Si está autenticado, renderiza la ruta protegida (ej. Dashboard)
  return <>{children}</>;
};