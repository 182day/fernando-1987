// src/layouts/Layout.tsx
import { useState, useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Menu as Sidebar } from '../components/Menu';
import { Footer } from '../components/Footer';
import { Menu, X, LogOut, LayoutDashboard, LayoutPanelLeft } from 'lucide-react';
import { useUserStore } from '../stores/useUserStore';
import { ThemeToggle } from '../components/ThemeToggle';

export const Layout = () => {
    const { user, logout } = useUserStore();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();

    const fetchUsers = useUserStore((state: any) => state.fetchUsers);

    const isExecuted = useRef(false);
    useEffect(() => {
        // Si ya se ejecutó en este ciclo de vida, prevenimos la segunda llamada
        if (isExecuted.current) return;
        isExecuted.current = true;

        if (fetchUsers) {
            fetchUsers();
        }
    }, [fetchUsers]);

    const getHeaderInfo = () => {
        const path = location.pathname;

        if (path === '/dashboard') {
            return {
                title: 'Dashboard',
                icon: <LayoutPanelLeft className="layout-icons" />,
            };
        }

        return {
            title: 'Pagina 404',
            icon: <LayoutDashboard className="layout-icons" />,
        };
    };

    const currentHeader = getHeaderInfo();

    return (
        <div className="h-screen bg-app-bg text-app-text flex flex-col overflow-hidden transition-colors duration-200">
            {/* Topbar Superior */}
            <header className="bg-app-card border-b border-app-border z-30 shrink-0 transition-colors duration-200">
                <div className="px-4 sm:px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {/* Botón Abrir / Cerrar Menú */}
                        {user && (
                            <button
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                className="p-2 rounded-lg bg-app-button hover:bg-app-button-hover text-app-text transition-colors cursor-pointer"
                                title={isSidebarOpen ? "Cerrar menú" : "Abrir menú"}
                            >
                                {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </button>
                        )}

                        {/* Ícono de la vista actual */}
                        <div className="p-2 bg-brand-blue/10 text-app-primary rounded-lg">
                            {currentHeader.icon}
                        </div>

                        {/* Título */}
                        <h1 className="text-xl font-bold text-app-text hidden min-[400px]:block">
                            {currentHeader.title}
                        </h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <ThemeToggle />
                        <button
                            onClick={logout}
                            className="flex items-center gap-2 bg-brand-magenta/10 hover:bg-brand-magenta/20 text-brand-magenta border border-brand-magenta/20 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer"
                        >
                            <LogOut className="w-4 h-4" />
                            <span className="hidden sm:inline">Cerrar Sesión</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Estructura Principal */}
            <div className="flex-1 flex overflow-hidden w-full h-full relative">
                <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

                {isSidebarOpen && (
                    <div
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 top-16 bg-black/50 backdrop-blur-[2px] z-30 lg:hidden cursor-pointer"
                    />
                )}

                {/* Área de contenido principal con scroll */}
                <main className="flex-1 min-w-0 h-full custom-scrollbar flex flex-col justify-between overflow-y-auto">

                    {/* Contenedor central de las vistas */}
                    <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto w-full flex-1">
                        <Outlet />
                    </div>

                    {/* Footer */}
                    <Footer />
                </main>
            </div>
        </div>
    );
};