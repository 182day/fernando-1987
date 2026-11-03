// src/components/ThemeToggle.tsx
import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  className?: string; // Permite pasar clases adicionales de posicionamiento si se necesita
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2.5 rounded-xl bg-app-card border border-app-border hover:bg-app-button-hover text-app-text transition shadow-sm flex items-center gap-2 cursor-pointer ${className}`}
      title="Cambiar tema"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-amber-400" />
      ) : (
        <Moon className="w-5 h-5 text-app-text" />
      )}
      <span className="text-xs font-medium hidden sm:inline">
        {theme === 'dark' ? 'Claro' : 'Oscuro'}
      </span>
    </button>
  );
};