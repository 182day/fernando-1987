// src/Router.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';

// Layout y Vistas
import { Layout } from './layouts/Layout';

// Vistas de la aplicación
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { NotFound } from './pages/NotFound';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/" element={<Login />} />
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
        </Route>

        {/* Ruta para cualquier URL inexistente */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;