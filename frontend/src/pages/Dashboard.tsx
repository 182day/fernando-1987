// src/pages/Dashboard.tsx
import React from 'react';
import { useUserStore } from '../stores/useUserStore';
import { useNavigate } from 'react-router-dom';

export const Dashboard: React.FC = () => {
    const { user, logout } = useUserStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-app-bg text-app-text p-6 transition-colors duration-200">
            <div className="flex justify-between items-center bg-app-card border border-app-border p-6 shadow-sm rounded-xl mb-6">
                <div>
                    <h1 className="text-2xl font-bold font-display">Sistema de Caracoles</h1>
                    <p className="text-sm text-app-muted">Bienvenido, <span className="font-semibold text-app-text">{user?.name}</span></p>
                </div>
                

                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition shadow-sm cursor-pointer"
                >
                    Cerrar Sesión
                </button>
            </div>
        </div>
    );
};