// src/components/charts/ChartsSection.tsx
import React from 'react';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { PieChart as PieChartIcon, Trophy } from 'lucide-react';
import { DONUT_DATA, DONUT_COLORS, BAR_DATA } from '../data/charts';

export const ChartsSection: React.FC = () => {
    // Mapeamos los colores
    const donutDataWithColors = DONUT_DATA.map((entry, index) => ({
        ...entry,
        fill: DONUT_COLORS[index % DONUT_COLORS.length],
    }));

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Gráfica Donut: Apuestas Ganadas / Perdidas */}
            <div className="bg-app-card border border-app-border p-6 rounded-xl shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg">
                        <PieChartIcon className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold leading-none">Estadísticas de Apuestas</h2>
                        <p className="text-xs text-app-muted mt-1">Proporción general de carreras ganadas y perdidas</p>
                    </div>
                </div>

                <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={donutDataWithColors}
                                cx="50%"
                                cy="50%"
                                innerRadius={70}
                                outerRadius={100}
                                paddingAngle={5}
                                dataKey="value"
                                label
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'var(--color-app-card)',
                                    borderColor: 'var(--color-app-border)',
                                    color: 'var(--color-app-text)',
                                    borderRadius: '0.5rem'
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Gráfica de Barras: Victorias de los 6 Caracoles */}
            <div className="bg-app-card border border-app-border p-6 rounded-xl shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-amber-500/10 text-amber-500 rounded-lg">
                        <Trophy className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold leading-none">Victorias de Caracoles</h2>
                        <p className="text-xs text-app-muted mt-1">Rendimiento e historial en las carreras del día</p>
                    </div>
                </div>

                <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={BAR_DATA}>
                            <XAxis dataKey="snail" stroke="var(--color-app-muted)" fontSize={12} />
                            <YAxis stroke="var(--color-app-muted)" fontSize={12} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'var(--color-app-card)',
                                    borderColor: 'var(--color-app-border)',
                                    color: 'var(--color-app-text)',
                                    borderRadius: '0.5rem'
                                }}
                            />
                            <Bar dataKey="victories" fill="var(--color-app-primary)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};