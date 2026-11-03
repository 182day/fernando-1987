// src/stores/useUserStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type UserData, type LoginData } from '../interfaces/user';
import { STORAGE_KEY, generateMongoId } from '../utils/formUtils';

// Interfaz interna para los usuarios guardados (omitiendo confirmPassword y añadiendo balance)
export interface StoredUser extends Omit<UserData, 'confirmPassword'> {
    id: string;
    balance?: number;
}

interface UserState {
    user: StoredUser | null;
    registeredUsers: StoredUser[];
    balance: number;
    isAuthenticated: boolean;
    register: (userData: UserData) => boolean;
    login: (credentials: LoginData) => { success: boolean; message?: string };
    logout: () => void;
    updateBalance: (amount: number) => void;
}

export const useUserStore = create<UserState>()(
    persist(
        (set, get) => ({
            user: null,
            registeredUsers: [],
            balance: 0,
            isAuthenticated: false,

            register: (userData) => {
                const { registeredUsers } = get();
                const cleanEmail = userData.email.trim().toLowerCase();
                const exists = registeredUsers.some((u) => u.email === cleanEmail);

                if (exists) {
                    return false;
                }

                // Creamos el nuevo usuario omitiendo confirmPassword
                const newUser: StoredUser = {
                    id: generateMongoId(),
                    name: userData.name.trim(),
                    email: cleanEmail,
                    password: userData.password,
                    balance: 0,
                };

                const updatedUsers = [...registeredUsers, newUser];

                set({
                    registeredUsers: updatedUsers,
                    user: newUser,
                    isAuthenticated: true,
                    balance: 0,
                });

                return true;
            },

            login: ({ email, password }) => {
                const { registeredUsers } = get();
                const cleanEmail = email.trim().toLowerCase();

                const found = registeredUsers.find(
                    (u) => u.email === cleanEmail && u.password === password
                );

                if (found) {
                    set({
                        user: found,
                        isAuthenticated: true,
                        balance: found.balance ?? 0, // Cargamos su balance guardado o 0 por defecto
                    });
                    return { success: true };
                }

                return { success: false, message: 'Correo o contraseña incorrectos.' };
            },

            updateBalance: (amount) => {
                set((state) => {
                    const newBalance = state.balance + amount;
                    const updatedUser = state.user ? { ...state.user, balance: newBalance } : null;

                    // Actualizar el saldo también dentro de la lista de usuarios registrados
                    const updatedRegisteredUsers = state.registeredUsers.map((u) =>
                        (u.id === state.user?.id && u.email === state.user?.email) ? { ...u, balance: newBalance } : u
                    );

                    return {
                        balance: newBalance,
                        user: updatedUser,
                        registeredUsers: updatedRegisteredUsers,
                    };
                });
            },

            logout: () =>
                set({
                    user: null,
                    isAuthenticated: false,
                    balance: 0,
                }),
        }),
        {
            name: STORAGE_KEY, // Clave en LocalStorage
        }
    )
);