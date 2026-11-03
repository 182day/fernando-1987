// src/pages/NotFoundPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../stores/useUserStore';
import { AlertTriangle, Home, LogIn } from 'lucide-react';

export const NotFound: React.FC = () => {
  const { user } = useUserStore();
  const navigate = useNavigate();

  const handleNavigation = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-app-bg text-app-text flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-app-card border border-app-border rounded-2xl p-8 text-center shadow-xl">
        {/* Ícono Ilustrativo */}
        <div className="mx-auto w-16 h-16 bg-rose-500/10 text-rose-500 rounded-full flex items-center justify-center mb-6">
          <AlertTriangle className="w-8 h-8" />
        </div>

        {/* Mensaje de Error */}
        <h1 className="text-6xl font-extrabold text-app-text mb-2">404</h1>
        <h2 className="text-2xl font-bold mb-3">Página no encontrada</h2>
        <p className="text-app-muted text-sm mb-8">
          La ruta a la que intentas acceder no existe.
        </p>

        {/* Botón Dinámico usando la clase global btn-primary o app-primary */}
        <button
          onClick={handleNavigation}
          className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-2.5 rounded-lg transition shadow-md cursor-pointer mt-2 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {user ? (
            <>
              <Home className="w-5 h-5" />
              <span>Ir al Dashboard</span>
            </>
          ) : (
            <>
              <LogIn className="w-5 h-5" />
              <span>Ir al Login</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};