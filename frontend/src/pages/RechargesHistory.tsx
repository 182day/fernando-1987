// src/pages/RechargesHistory.tsx
import React from 'react';
import { useUserStore } from '../stores/useUserStore';
import { useRechargeStore } from '../stores/useRechargeStore';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, History, ShieldAlert } from 'lucide-react';

export const RechargesHistory: React.FC = () => {
  const { user } = useUserStore();
  const { getUserRecharges } = useRechargeStore();
  const navigate = useNavigate();

  const userRecharges = user ? getUserRecharges(user.email) : [];

  return (
    <div className="space-y-3">
      <div className="max-w-4xl mx-auto">
        {/* Botón para regresar al Dashboard */}
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 mb-6 text-sm font-medium text-app-muted hover:text-app-text transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al Dashboard
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="bg-amber-500/10 text-amber-600 p-3 rounded-xl">
            <History className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-display">Historial de Recargas</h1>
            <p className="text-sm text-app-muted">
              Consulta todas las transacciones realizadas
            </p>
          </div>
        </div>

        {userRecharges.length === 0 ? (
          <div className="bg-app-card border border-app-border rounded-xl p-12 text-center">
            <p className="text-app-muted">Aún no has realizado ninguna recarga de saldo.</p>
          </div>
        ) : (
          <div className="bg-app-card border border-app-border rounded-xl shadow-sm overflow-hidden">
            <div className="divide-y divide-app-border">
              {userRecharges.map((recharge) => (
                <div key={recharge.id} className="p-4 flex items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    {recharge.status === 'approved' ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    ) : (
                      <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="font-semibold text-sm">Recarga SnailPay</p>
                      <p className="text-xs text-app-muted">
                        Ref: {recharge.reference} {recharge.authorizationCode && `• Auth: ${recharge.authorizationCode}`}
                      </p>
                      <p className="text-[10px] text-app-muted mt-1">
                        {new Date(recharge.date).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      +${recharge.amount.toFixed(2)} MXN
                    </span>
                    <p className="text-[10px] uppercase font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full mt-1 inline-block">
                      {recharge.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};