// src/pages/Dashboard.tsx
import React from 'react';
import { useUserStore } from '../stores/useUserStore';
import { useNavigate } from 'react-router-dom';
import { formatearPesos } from '../utils/formUtils';
import { ChartsSection } from '../components/ChartsSection';

export const Dashboard: React.FC = () => {
    const { user, balance, logout } = useUserStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-app-bg text-app-text p-6 transition-colors duration-200">
            {/* Cabecera del Dashboard */}
            <div className="flex justify-between items-center bg-app-card border border-app-border p-6 shadow-sm rounded-xl mb-6">
                <div>
                    <h1 className="text-2xl font-bold font-display">Sistema de Caracoles</h1>
                    <p className="text-sm text-app-muted">Bienvenido, <span className="font-semibold text-app-text">{user?.name}</span></p>
                </div>

                <div className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-4 py-2 rounded-lg font-bold border border-emerald-500/20">
                    Saldo: {formatearPesos(balance)}
                </div>

                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition shadow-sm cursor-pointer"
                >
                    Cerrar Sesión
                </button>
            </div>

            {/* Sección de Gráficas */}
            <ChartsSection />
        </div>
    );
};