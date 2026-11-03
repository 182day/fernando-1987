// src/components/Footer.tsx
import React from 'react';
import './Footer.css';

export const Footer: React.FC = () => {
    return (
        <footer className="w-[80%] max-[1110px]:w-[95%] mx-auto border-t border-app-border py-6 px-4 sm:px-6 z-20 shrink-0 transition-colors duration-200 overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center gap-4">

                {/* Animación caracoles */}
                <div className="snail-race-track">
                    <div className="track-line"></div>
                    <div className="track-dashed"></div>

                    {/* Meta */}
                    <div className="finish-line">
                        <div className="finish-flag"></div>
                        <span className="finish-text">META</span>
                    </div>

                    {/* Caracol #1 */}
                    <div className="snail-track snail-track-1">
                        <div className="snail">
                            <div className="snail-body">
                                <div className="snail-eye-stalk left"><div className="eye"><div className="pupil"></div></div></div>
                                <div className="snail-eye-stalk right"><div className="eye"><div className="pupil"></div></div></div>
                                <div className="snail-head"></div>
                            </div>
                            <div className="snail-shell">
                                1
                                <div className="shell-spiral"></div>
                            </div>
                            <div className="snail-foot"></div>
                        </div>
                        <div className="slime"></div>
                    </div>

                    {/* Caracol #2 */}
                    <div className="snail-track snail-track-2">
                        <div className="snail snail-2">
                            <div className="snail-body">
                                <div className="snail-eye-stalk left"><div className="eye"><div className="pupil"></div></div></div>
                                <div className="snail-eye-stalk right"><div className="eye"><div className="pupil"></div></div></div>
                                <div className="snail-head"></div>
                            </div>
                            <div className="snail-shell">
                                2
                                <div className="shell-spiral"></div>
                            </div>
                            <div className="snail-foot"></div>
                        </div>
                        <div className="slime"></div>
                    </div>

                    {/* Caracol #3 - opcional, bórralo si solo quieres 2 */}
                    <div className="snail-track snail-track-3">
                        <div className="snail snail-3">
                            <div className="snail-body">
                                <div className="snail-eye-stalk left"><div className="eye"><div className="pupil"></div></div></div>
                                <div className="snail-eye-stalk right"><div className="eye"><div className="pupil"></div></div></div>
                                <div className="snail-head"></div>
                            </div>
                            <div className="snail-shell">
                                3
                                <div className="shell-spiral"></div>
                            </div>
                            <div className="snail-foot"></div>
                        </div>
                        <div className="slime"></div>
                    </div>

                    <div className="absolute bottom-2 left-0 w-full h-4 pointer-events-none">
                        <span className="dust dust-1"></span>
                        <span className="dust dust-2"></span>
                        <span className="dust dust-3"></span>
                    </div>
                </div>

                <div className="w-full flex flex-col max-[1085px]:flex-col min-[1086px]:flex-row items-center justify-between gap-2 text-xs text-app-muted mt-2 text-center">
                    <span>Desarrollado por Fernando Contreras de la Garza</span>
                    <span>© {new Date().getFullYear()} Sistema de Caracoles. Todos los derechos reservados.</span>
                </div>
            </div>
        </footer>
    );
};