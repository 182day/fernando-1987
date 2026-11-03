// src/components/Menu.tsx
import { NavLink } from 'react-router-dom';
import {
    X, ChevronRight, LayoutPanelLeft
} from 'lucide-react';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export const Menu = ({ isOpen, onClose }: SidebarProps) => {

    const navItems = [
        { path: '/dashboard', label: 'Dasboard', icon: LayoutPanelLeft },
    ];

    return (
        <aside
            className={`fixed lg:relative top-16 lg:top-0 left-0 z-40 lg:z-auto bg-app-card border-r border-app-border 
                transition-all duration-300 ease-in-out flex flex-col shrink-0 h-[calc(100vh-4rem)] lg:h-full 
                ${isOpen
                    ? 'w-full sm:w-64 translate-x-0'
                    : '-translate-x-full lg:translate-x-0 lg:w-0 overflow-hidden border-none'
                }`}
        >
            {/* Cabecera del sidebar */}
            <div className="p-4 border-b border-app-border flex items-center justify-between shrink-0">
                <span className="text-xs font-semibold text-app-muted uppercase tracking-wider">
                    Navegación
                </span>
                <button
                    onClick={onClose}
                    className="p-1 rounded-lg text-app-muted hover:text-app-text hover:bg-app-button transition-colors cursor-pointer"
                    title="Cerrar menú"
                >
                    <X className="file-icons" />
                </button>
            </div>

            <nav className="p-3 space-y-1 flex-1 overflow-y-auto text-sm custom-scrollbar">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.path === '/' || item.path === '/empresas' || item.path === '/mapa'}
                            onClick={() => {
                                // Cierra el menú al presionar una opción en dispositivos móviles
                                if (window.innerWidth < 1024) onClose();
                            }}
                            className={({ isActive }) =>
                                `flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors font-medium cursor-pointer ${isActive
                                    ? 'bg-brand-blue/10 text-app-primary font-semibold'
                                    : 'text-app-muted hover:bg-app-button hover:text-app-text'
                                }`
                            }
                        >
                            <div className="flex items-center gap-3">
                                <Icon className="btn-icons" />
                                <span>{item.label}</span>
                            </div>
                            <ChevronRight className="btn-icons opacity-60" />
                        </NavLink>
                    );
                })}
            </nav>

            <div className="p-5 border-t border-app-border text-xs text-app-muted text-center shrink-0">
                Sistema de Caracoles v1.0.0
            </div>
        </aside>
    );
};