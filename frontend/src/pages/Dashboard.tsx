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
                <div className="flex justify-between items-center bg-app-card border border-app-border p-6 shadow-sm rounded-xl mb-6">
                    <div>
                        <h1 className="text-2xl font-bold font-display">Sistema de Caracoles</h1>
                        <p className="text-sm text-app-muted">Bienvenido, <span className="font-semibold text-app-text">{user?.name}</span></p>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSnailPayOpen(true)}
                            className="bg-amber-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-amber-600 transition shadow-sm cursor-pointer"
                        >
                            Cargar Saldo
                        </button>

                        <div className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-4 py-2 rounded-lg font-bold border border-emerald-500/20">
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