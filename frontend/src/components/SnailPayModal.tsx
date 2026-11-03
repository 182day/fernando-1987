// src/components/SnailPayModal.tsx
import React, { useState } from 'react';
import api from '../api/axios';
import { type SnailPayData } from '../interfaces/snailPay';
import { CARD_NUMBER_REGEX, EXPIRATION_DATE_REGEX, CVV_REGEX, AMOUNT_REGEX } from '../utils/formUtils';
import { CreditCard, DollarSign, ShieldAlert, CheckCircle2, Loader2, X } from 'lucide-react';

interface SnailPayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SnailPayModal: React.FC<SnailPayModalProps> = ({ isOpen, onClose }) => {
  // Estado unificado del formulario
  const [form, setForm] = useState<SnailPayData>({
    cardNumber: '',
    expirationDate: '',
    cvv: '',
    cardHolderName: '',
    amount: '',
  });

  const [loading, setLoading] = useState(false);

  // Estado para marcar individualmente los inputs con error (bordes rojos)
  const [error, setError] = useState<Record<string, boolean>>({});

  // Mensaje de alerta general y estados de respuesta adaptados al controlador actual
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [responseMessage, setResponseMessage] = useState<{ 
    type: 'success' | 'error'; 
    text: string; 
  } | null>(null);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error[name]) {
      setError((prev) => ({ ...prev, [name]: false }));
      setErrorMessage(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResponseMessage(null);

    const { cardNumber, expirationDate, cvv, cardHolderName, amount } = form;
    const newErrors: Record<string, boolean> = {};
    let firstErrorMsg = '';

    // 1. Validar Número de Tarjeta (16 dígitos)
    if (!cardNumber.trim()) {
      newErrors.cardNumber = true;
      firstErrorMsg = 'Por favor, ingresa el número de tarjeta.';
    } else if (!CARD_NUMBER_REGEX.test(cardNumber.trim())) {
      newErrors.cardNumber = true;
      if (!firstErrorMsg) firstErrorMsg = 'El número de tarjeta debe tener exactamente 16 dígitos numéricos.';
    }

    // 2. Validar Fecha de Vencimiento (MM/YY)
    if (!expirationDate.trim()) {
      newErrors.expirationDate = true;
      if (!firstErrorMsg) firstErrorMsg = 'Por favor, ingresa la fecha de vencimiento.';
    } else if (!EXPIRATION_DATE_REGEX.test(expirationDate.trim())) {
      newErrors.expirationDate = true;
      if (!firstErrorMsg) firstErrorMsg = 'Formato de fecha inválido. Utiliza el formato MM/YY (ej. 12/26).';
    }

    // 3. Validar CVV (3 o 4 dígitos)
    if (!cvv.trim()) {
      newErrors.cvv = true;
      if (!firstErrorMsg) firstErrorMsg = 'Por favor, ingresa el código CVV.';
    } else if (!CVV_REGEX.test(cvv.trim())) {
      newErrors.cvv = true;
      if (!firstErrorMsg) firstErrorMsg = 'El CVV debe tener 3 o 4 dígitos numéricos.';
    }

    // 4. Validar Nombre del Titular
    if (!cardHolderName.trim()) {
      newErrors.cardHolderName = true;
      if (!firstErrorMsg) firstErrorMsg = 'Por favor, ingresa el nombre del titular de la tarjeta.';
    }

    // 5. Validar Monto de la Recarga
    if (!amount || String(amount).trim() === '') {
      newErrors.amount = true;
      if (!firstErrorMsg) firstErrorMsg = 'Por favor, ingresa el monto de la recarga.';
    } else if (!AMOUNT_REGEX.test(String(amount)) || Number(amount) <= 0) {
      newErrors.amount = true;
      if (!firstErrorMsg) firstErrorMsg = 'Por favor, ingresa un monto válido mayor a 0.';
    }

    // Si hay errores en las validaciones, los mostramos y detenemos el envío
    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      setErrorMessage(firstErrorMsg);
      return;
    }

    setLoading(true);

    try {
      // Petición real al backend
      const response = await api.post('/snailpay/process', {
        cardNumber: cardNumber.trim(),
        expirationDate: expirationDate.trim(),
        cvv: cvv.trim(),
        cardHolderName: cardHolderName.trim(),
        amount: Number(amount),
      });

      const data = response.data;

      // Capturamos el campo 'mensaje' que viene del controlador
      setResponseMessage({
        type: 'success',
        text: data.mensaje || 'Pago procesado exitosamente',
      });
    } catch (error: any) {
      const errorData = error.response?.data;
      setResponseMessage({
        type: 'error',
        text: errorData?.mensaje || 'Error en el servidor',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-app-card border border-app-border rounded-2xl shadow-2xl max-w-md w-full p-6 relative text-app-text">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-app-muted hover:text-app-text cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="bg-amber-500/10 text-amber-500 p-2 rounded-xl">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight">Recarga con SnailPay</h2>
            <p className="text-xs text-app-muted">Pasarela de pagos simulada</p>
          </div>
        </div>

        {/* Alerta general de error de validación */}
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2 text-red-600 dark:text-red-400 text-sm">
            <ShieldAlert className="w-5 h-5 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Alerta de respuesta basada en el controlador */}
        {responseMessage && (
          <div className={`mb-4 p-4 rounded-xl flex items-start gap-3 text-sm ${
            responseMessage.type === 'success' 
              ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400' 
              : 'bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-400'
          }`}>
            {responseMessage.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-emerald-600" />
            ) : (
              <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5 text-red-600" />
            )}
            <div>
              <p className="font-semibold">{responseMessage.text}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-app-muted mb-1">Número de Tarjeta</label>
            <input
              type="text"
              name="cardNumber"
              disabled={loading}
              maxLength={16}
              value={form.cardNumber}
              onChange={handleChange}
              placeholder="1234123412341234"
              className={`w-full bg-app-bg border rounded-xl py-2 px-3 text-sm focus:outline-none transition-colors ${
                error.cardNumber
                  ? 'border-red-500 bg-red-500/5 focus:border-red-500'
                  : 'border-app-border focus:border-amber-500'
              }`}
            />
            <p className="text-[10px] text-app-muted mt-1">
              💡 <strong>Éxito:</strong> 1234123412341234 (12/26, 543) | <strong>Error del Sistema:</strong> 9999999999999999
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-app-muted mb-1">Fecha de Vencimiento</label>
              <input
                type="text"
                name="expirationDate"
                disabled={loading}
                placeholder="12/26"
                value={form.expirationDate}
                onChange={handleChange}
                className={`w-full bg-app-bg border rounded-xl py-2 px-3 text-sm focus:outline-none transition-colors ${
                  error.expirationDate
                    ? 'border-red-500 bg-red-500/5 focus:border-red-500'
                    : 'border-app-border focus:border-amber-500'
                }`}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-app-muted mb-1">CVV</label>
              <input
                type="password"
                name="cvv"
                disabled={loading}
                maxLength={4}
                placeholder="543"
                value={form.cvv}
                onChange={handleChange}
                className={`w-full bg-app-bg border rounded-xl py-2 px-3 text-sm focus:outline-none transition-colors ${
                  error.cvv
                    ? 'border-red-500 bg-red-500/5 focus:border-red-500'
                    : 'border-app-border focus:border-amber-500'
                }`}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-app-muted mb-1">Nombre del Titular</label>
            <input
              type="text"
              name="cardHolderName"
              disabled={loading}
              value={form.cardHolderName}
              onChange={handleChange}
              placeholder="Fernando Contreras"
              className={`w-full bg-app-bg border rounded-xl py-2 px-3 text-sm focus:outline-none transition-colors ${
                error.cardHolderName
                  ? 'border-red-500 bg-red-500/5 focus:border-red-500'
                  : 'border-app-border focus:border-amber-500'
              }`}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-app-muted mb-1">Monto de la Recarga ($ MXN)</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-app-muted" />
              <input
                type="number"
                name="amount"
                disabled={loading}
                min="1"
                step="0.01"
                value={form.amount}
                onChange={handleChange}
                placeholder="500"
                className={`w-full bg-app-bg border rounded-xl py-2 pl-9 pr-3 text-sm focus:outline-none transition-colors ${
                  error.amount
                    ? 'border-red-500 bg-red-500/5 focus:border-red-500'
                    : 'border-app-border focus:border-amber-500'
                }`}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-2.5 rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2 cursor-pointer shadow-sm"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Procesando pago...</span>
              </>
            ) : (
              <span>Pagar / Recargar Saldo</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};