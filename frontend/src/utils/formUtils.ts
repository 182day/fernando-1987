// src/utils/formUtils.ts

// --- VALIDAR EMAIL ---
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// --- VALIDAR PASSWORD ---
// Mínimo 6 caracteres, al menos una mayúscula y al menos un carácter especial
export const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|_<>+\-=]).{6,}$/;