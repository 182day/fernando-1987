// src/components/SnailPayModal.tsx
import React from 'react';
import { CreditCard, X } from 'lucide-react';

interface SnailPayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SnailPayModal: React.FC<SnailPayModalProps> = ({ isOpen, onClose }) => {
  // Si no está abierto, no renderizamos nada
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative">
        {/* Botón de Cierre */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Encabezado del Modal */}
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-amber-100 text-amber-700 p-2 rounded-lg">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Recarga con SnailPay</h2>
            <p className="text-xs text-gray-500">Pasarela de pagos simulada</p>
          </div>
        </div>

        {/* Contenido temporal del cuerpo */}
        <div className="text-sm text-gray-600">
          Formulario de pago en construcción...
        </div>
      </div>
    </div>
  );
};