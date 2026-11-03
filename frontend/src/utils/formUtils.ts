// src/utils/formUtils.ts

// --- VALIDAR EMAIL ---
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// --- VALIDAR PASSWORD ---
// Mínimo 6 caracteres, al menos una mayúscula y al menos un carácter especial
export const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|_<>+\-=]).{6,}$/;

// --- VALIDACIONES DE SMAILPAY ---
// Número de tarjeta: Exactamente 16 dígitos numéricos
export const CARD_NUMBER_REGEX = /^\d{16}$/;

// Fecha de vencimiento: Formato MM/YY válido (meses del 01 al 12 y 2 dígitos para el año)
export const EXPIRATION_DATE_REGEX = /^(0[1-9]|1[0-2])\/\d{2}$/;

// CVV: 3 o 4 dígitos numéricos
export const CVV_REGEX = /^\d{3,4}$/;

// Monto: Número positivo mayor a 0 (permite hasta 2 decimales)
export const AMOUNT_REGEX = /^\d+(\.\d{1,2})?$/;


// Storage Key's
export const STORAGE_KEY = 'snail-racing-user-storage';
export const STORAGE_RECHARGES_KEY = 'snail-racing-recharges-storage';

// --- Formatea un número en pesos mexicanos ($ MXN) ---
const formateadorMXN = new Intl.NumberFormat('es-MX', { 
  style: 'currency', 
  currency: 'MXN' 
});

export const formatearPesos = (cantidad: number): string => {
  return formateadorMXN.format(cantidad);
};

// --- GENERAR ID RANDOM TIPO MONGODB ---
export const generateMongoId = (): string => {
  return Array.from({ length: 24 }, () => 
    Math.floor(Math.random() * 16).toString(16)
  ).join('');
};