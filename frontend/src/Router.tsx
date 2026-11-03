// src/Router.tsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import { useUserStore } from './stores/useUserStore';

// Layout y Vistas
import { Layout } from './layouts/Layout';

// Vistas de la aplicación
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { RechargesHistory } from './pages/RechargesHistory';
import { NotFound } from './pages/NotFound';

// Componente auxiliar para decidir qué mostrar en la ruta "/"
export const RootRedirect = () => {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  // Si está logeado, lo redirige al dashboard; si no, muestra el Login
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />;
};

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta dinámica */}
        <Route path="/" element={<RootRedirect />} />

        {/* Rutas Públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Layout Principal */}
        <Route element={<Layout />}>
          {/* Rutas Protegidas (Requieren sesión activa en Zustand) */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/recharges"
            element={
              <ProtectedRoute>
                <RechargesHistory />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Ruta para cualquier URL inexistente */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;