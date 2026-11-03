// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserStore } from '../stores/useUserStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Obtenemos el estado de autenticación desde nuestro store de Zustand
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  // Si no está autenticado, lo redirigimos a la vista de login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado, renderizamos los componentes hijos (ej. Dashboard)
  return <>{children}</>;
};