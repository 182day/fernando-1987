// src/pages/Login.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, ShieldAlert, Loader2 } from 'lucide-react';
import { EMAIL_REGEX } from '../utils/formUtils';
import { type LoginData } from '../interfaces/user';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginData>({
    email: '',
    password: '',
  });
  
  // Estado para registrar qué campos tienen error individualmente (marcar en rojo)
  const [error, setError] = useState<Record<string, boolean>>({});
  
  // Mensaje de alerta general dinámico
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const [loading, setLoading] = useState<boolean>(false);

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
    const { email, password } = formData;

    const newErrors: Record<string, boolean> = {};
    let firstErrorMsg = '';

    // 1. Validar correo electrónico (vacío o formato incorrecto)
    if (!email.trim()) {
      newErrors.email = true;
      firstErrorMsg = 'Por favor, ingresa un correo electrónico.';
    } else if (!EMAIL_REGEX.test(email.trim())) {
      newErrors.email = true;
      firstErrorMsg = 'Por favor, ingresa un correo electrónico válido.';
    }

    // 2. Validar contraseña (vacía)
    if (!password) {
      newErrors.password = true;
      if (!firstErrorMsg) firstErrorMsg = 'Por favor, ingresa tu contraseña.';
    }

    // Si hay algún error de formato, actualizamos los estados y detenemos el envío
    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      setErrorMessage(firstErrorMsg);
      return;
    }

    // 3. Verificar credenciales en localStorage ('snail-racing-user-storage')
    const STORAGE_KEY = 'snail-racing-user-storage';
    const storedData = localStorage.getItem(STORAGE_KEY);
    let registeredUsers: any[] = [];

    if (storedData) {
      try {
        registeredUsers = JSON.parse(storedData) || [];
      } catch (err) {
        registeredUsers = [];
      }
    }

    const cleanEmail = email.trim().toLowerCase();
    const foundUser = registeredUsers.find(
      (u: any) => u.email === cleanEmail && u.password === password
    );

    if (!foundUser) {
      setError({ email: true, password: true });
      setErrorMessage('Credenciales incorrectas.');
      return;
    }

    setError({});
    setErrorMessage(null);
    setLoading(true);

    try {
      // Simulación de petición de red
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log('Inicio de sesión exitoso:', foundUser);

      navigate('/dashboard');

    } catch (err) {
      setErrorMessage('Ocurrió un error en el servidor al iniciar sesión.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-full mb-3">
            <LogIn className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Sistema de Caracoles</h1>
          <p className="text-sm text-gray-500 mt-1">Inicia sesión en tu cuenta</p>
        </div>

        {errorMessage && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600 text-sm">
            <ShieldAlert className="w-5 h-5 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correo Electrónico <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                disabled={loading}
                value={formData.email}
                onChange={handleChange}
                placeholder="fernando@example.com"
                className={`w-full border rounded-lg py-2 pl-10 pr-4 text-gray-800 focus:outline-none transition-colors ${
                  error.email 
                    ? 'border-red-500 bg-red-500/5 focus:border-red-500' 
                    : 'border-gray-300 focus:border-blue-500'
                }`}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                name="password"
                disabled={loading}
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full border rounded-lg py-2 pl-10 pr-4 text-gray-800 focus:outline-none transition-colors ${
                  error.password 
                    ? 'border-red-500 bg-red-500/5 focus:border-red-500' 
                    : 'border-gray-300 focus:border-blue-500'
                }`}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition shadow-md cursor-pointer mt-2 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Ingresando...
              </>
            ) : (
              'Ingresar'
            )}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          ¿No tienes una cuenta?{' '}
          <Link to="/register" className="text-blue-600 font-medium hover:underline">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
};