// src/interfaces/auth.ts

export interface UserData {
  name: string; // Opcional para el Login, requerido para el Register
  email: string;
  password: string;
  confirmPassword: string; // Opcional para el Login
}

export type LoginData = Omit<UserData, 'name' | 'confirmPassword'>;