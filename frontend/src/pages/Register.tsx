// src/pages/Register.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, UserPlus, ShieldAlert, Loader2 } from 'lucide-react';
import { EMAIL_REGEX, PASSWORD_REGEX } from '../utils/formUtils';
import { type UserData } from '../interfaces/user';
import { useUserStore } from '../stores/useUserStore';
import { ThemeToggle } from '../components/ThemeToggle';

export const Register: React.FC = () => {
    const navigate = useNavigate();
    const registerUser = useUserStore((state) => state.register);

    const [formData, setFormData] = useState<UserData>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [loading, setLoading] = useState<boolean>(false);

    // Estado para registrar qué campos tienen error individualmente (marcar en rojo)
    const [error, setError] = useState<Record<string, boolean>>({});

    // Mensaje de alerta general dinámico
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Limpiamos el error del input específico y la alerta al empezar a escribir
        if (error[name]) {
            setError((prev) => ({ ...prev, [name]: false }));
            setErrorMessage(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Desestructuramos el estado dentro de handleSubmit
        const { name, email, password, confirmPassword } = formData;

        const newErrors: Record<string, boolean> = {};
        let firstErrorMsg = '';

        // 1. Validar nombre completo
        if (!name.trim()) {
            newErrors.name = true;
            firstErrorMsg = 'Por favor, ingresa tu nombre completo.';
        }

        // 2. Validar correo electrónico
        if (!email.trim()) {
            newErrors.email = true;
            if (!firstErrorMsg) firstErrorMsg = 'Por favor, ingresa un correo electrónico.';
        } else if (!EMAIL_REGEX.test(email.trim())) {
            newErrors.email = true;
            if (!firstErrorMsg) firstErrorMsg = 'Por favor, ingresa un correo electrónico válido.';
        }

        // 3. Validar contraseña
        if (!password) {
            newErrors.password = true;
            if (!firstErrorMsg) firstErrorMsg = 'Por favor, ingresa una contraseña.';
        } else if (!PASSWORD_REGEX.test(password)) {
            newErrors.password = true;
            if (!firstErrorMsg) firstErrorMsg = 'La contraseña debe tener al menos 6 caracteres, una mayúscula y un carácter especial.';
        }

        // 4. Validar confirmación de contraseña
        if (!confirmPassword) {
            newErrors.confirmPassword = true;
            if (!firstErrorMsg) firstErrorMsg = 'Por favor, confirma tu contraseña.';
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = true;
            if (!firstErrorMsg) firstErrorMsg = 'Las contraseñas no coinciden.';
        }

        // Si hay errores de formato, actualizamos los estados y detenemos el envío
        if (Object.keys(newErrors).length > 0) {
            setError(newErrors);
            setErrorMessage(firstErrorMsg);
            return;
        }

        setLoading(true);

        try {
            // Simulación de petición de red
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // 5. Registrar usuario mediante Zustand
            const success = registerUser(formData);

            if (!success) {
                setError({ email: true });
                setErrorMessage('Este correo electrónico ya está registrado.');
                setLoading(false);
                return;
            }

            setError({});
            setErrorMessage(null);
            console.log('Usuario registrado exitosamente mediante Zustand:', { name: name.trim(), email: email.trim().toLowerCase() });

            navigate('/login');
        } catch (err) {
            setErrorMessage('Ocurrió un error en el servidor al registrar la cuenta.');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-app-bg text-app-text flex items-center justify-center p-4 relative transition-colors duration-200">
            
            <ThemeToggle className="absolute top-6 right-6" />

            <div className="w-full max-w-md bg-app-card border border-app-border rounded-xl shadow-lg p-8">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-500/10 text-amber-500 rounded-full mb-3">
                        <UserPlus className="w-6 h-6" />
                    </div>
                    <h1 className="text-2xl font-bold font-display">Registro - Sistema de Caracoles</h1>
                    <p className="text-sm text-app-muted mt-1">Crea tu cuenta para comenzar</p>
                </div>

                {errorMessage && (
                    <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-500 text-sm">
                        <ShieldAlert className="w-5 h-5 shrink-0" />
                        <span>{errorMessage}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-app-text mb-1">
                            Nombre Completo <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-app-muted" />
                            <input
                                type="text"
                                name="name"
                                disabled={loading}
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Fernando Contreras"
                                className={`w-full bg-transparent border rounded-lg py-2 pl-10 pr-4 text-app-text placeholder:text-app-muted focus:outline-none transition-colors ${
                                    error.name
                                        ? 'border-red-500 bg-red-500/5 focus:border-red-500'
                                        : 'border-app-border focus:border-amber-500'
                                }`}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-app-text mb-1">
                            Correo Electrónico <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-app-muted" />
                            <input
                                type="email"
                                name="email"
                                disabled={loading}
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="fernando@example.com"
                                className={`w-full bg-transparent border rounded-lg py-2 pl-10 pr-4 text-app-text placeholder:text-app-muted focus:outline-none transition-colors ${
                                    error.email
                                        ? 'border-red-500 bg-red-500/5 focus:border-red-500'
                                        : 'border-app-border focus:border-amber-500'
                                }`}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-app-text mb-1">
                            Contraseña <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-app-muted" />
                            <input
                                type="password"
                                name="password"
                                disabled={loading}
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className={`w-full bg-transparent border rounded-lg py-2 pl-10 pr-4 text-app-text placeholder:text-app-muted focus:outline-none transition-colors ${
                                    error.password
                                        ? 'border-red-500 bg-red-500/5 focus:border-red-500'
                                        : 'border-app-border focus:border-amber-500'
                                }`}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-app-text mb-1">
                            Confirmar Contraseña <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-app-muted" />
                            <input
                                type="password"
                                name="confirmPassword"
                                disabled={loading}
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className={`w-full bg-transparent border rounded-lg py-2 pl-10 pr-4 text-app-text placeholder:text-app-muted focus:outline-none transition-colors ${
                                    error.confirmPassword
                                        ? 'border-red-500 bg-red-500/5 focus:border-red-500'
                                        : 'border-app-border focus:border-amber-500'
                                }`}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-2.5 rounded-lg transition shadow-md cursor-pointer mt-2 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                Registrando...
                            </>
                        ) : (
                            'Registrarse'
                        )}
                    </button>
                </form>

                <p className="text-center text-sm text-app-muted mt-6">
                    ¿Ya tienes una cuenta?{' '}
                    <Link to="/login" className="text-amber-500 font-medium hover:underline">
                        Inicia sesión aquí
                    </Link>
                </p>
            </div>
        </div>
    );
};