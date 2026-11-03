// src/Router.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Vistas de la aplicación
import { Login } from './pages/Login';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/login" element={<Login />} />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;