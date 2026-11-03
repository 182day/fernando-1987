// src/stores/useUserStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type UserData, type LoginData } from '../interfaces/user';
import { STORAGE_KEY } from '../utils/formUtils';

// Tipo para los usuarios almacenados (omitiendo confirmPassword)
export interface StoredUser extends Omit<UserData, 'confirmPassword'> { }

interface UserState {
    user: StoredUser | null;
    registeredUsers: StoredUser[];
    isAuthenticated: boolean;
    register: (userData: UserData) => boolean;
    login: (credentials: LoginData) => { success: boolean; message?: string };
}

export const useUserStore = create<UserState>()(
    persist(
        (set, get) => ({
            user: null,
            registeredUsers: [],
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
                    name: userData.name.trim(),
                    email: cleanEmail,
                    password: userData.password,
                };

                const updatedUsers = [...registeredUsers, newUser];

                set({
                    registeredUsers: updatedUsers,
                    user: newUser,
                    isAuthenticated: true,
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
                    });
                    return { success: true };
                }

                return { success: false, message: 'Correo o contraseña incorrectos.' };
            }
        }),
        {
            name: STORAGE_KEY, // Clave en LocalStorage
        }
    )
);