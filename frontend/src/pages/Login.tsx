// src/pages/Login.tsx
import React, { useState } from 'react';
import { Mail, Lock, LogIn, ShieldAlert, Loader2 } from 'lucide-react';
import { EMAIL_REGEX, PASSWORD_REGEX } from '../utils/formUtils'

interface FormValues {
  email: string;
  password: string;
}

export const Login: React.FC = () => {
  const [formData, setFormData] = useState<FormValues>({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Desestructuramos el estado actual
    const { email, password } = formData;

    // 1. Validar correo electrónico con .trim() y la expresión regular
    if (!email.trim() || !EMAIL_REGEX.test(email.trim())) {
      setError('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    // 2. Validar contraseña
    if (!PASSWORD_REGEX.test(password)) {
      setError('La contraseña debe tener al menos 6 caracteres, una mayúscula y un carácter especial.');
      return;
    }

    setError(null);
    setLoading(true);


    try {
      // Limpiamos espacios del email al enviar si es necesario
      console.log('Iniciando sesión con:', { email: email.trim().toLowerCase(), password });

      // Simulación de petición de red
      await new Promise((resolve) => setTimeout(resolve, 1500));

    } catch (err) {
      setError('Credenciales incorrectas o error en el servidor.');
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

        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600 text-sm">
            <ShieldAlert className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                disabled={loading}
                value={formData.email}
                onChange={handleChange}
                placeholder="fernando@example.com"
                className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-4 text-gray-800 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                name="password"
                required
                disabled={loading}
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-4 text-gray-800 focus:outline-none focus:border-blue-500"
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
      </div>
    </div>
  );
};