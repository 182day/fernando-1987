// src/pages/Dashboard.tsx
import React, { useState } from 'react';
import { useUserStore } from '../stores/useUserStore';
import { formatearPesos } from '../utils/formUtils';
import { ChartsSection } from '../components/ChartsSection';
import { SnailPayModal } from '../components/SnailPayModal';

export const Dashboard: React.FC = () => {
    const { user, balance } = useUserStore();

    const [isSnailPayOpen, setIsSnailPayOpen] = useState<boolean>(false);

    return (
        <>
            <div className="space-y-3">
                {/* Cabecera del Dashboard */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-app-card border border-app-border p-6 shadow-sm rounded-xl mb-6 gap-4">
                    <div>
                        <h1 className="text-2xl font-bold font-display">Sistema de Caracoles</h1>
                        <p className="text-sm text-app-muted">Bienvenido, <span className="font-semibold text-app-text">{user?.name}</span></p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                        <button
                            onClick={() => setIsSnailPayOpen(true)}
                            className="w-full md:w-auto bg-amber-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-amber-600 transition shadow-sm cursor-pointer text-sm flex items-center justify-center gap-2"
                        >
                            Cargar Saldo
                        </button>

                        <div className="w-full md:w-auto text-center md:text-left bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-4 py-2 rounded-lg font-bold border border-emerald-500/20 text-sm">
                            Saldo: {formatearPesos(balance)}
                        </div>
                    </div>
                </div>

                {/* Sección de Gráficas */}
                <ChartsSection />
            </div>
            {/* Renderizar el modal */}
            <SnailPayModal isOpen={isSnailPayOpen} onClose={() => setIsSnailPayOpen(false)} />
        </>
    );
};