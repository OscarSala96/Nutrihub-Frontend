'use client';

import { useEffect, useState } from 'react';
import PageHeader from '@/components/Pageheader';
import Sidebar from '@/components/Sidebar';

// Importaciones necesarias de Chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

// Registrar los componentes en el núcleo de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function UserChartsPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Detectar el tema actual para adaptar los colores de las rejillas y textos del gráfico
  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(isDark);
    };

    checkTheme();
    
    // Opcional: Escuchar mutaciones por si cambian el tema con el botón del sidebar
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    
    return () => observer.disconnect();
  }, []);

  // Configuración compartida de estilos de rejilla y fuentes según el tema
  const gridColor = isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)';
  const textColor = isDarkMode ? '#94a3b8' : '#64748b';

  // ─── DATOS MOCK: EVOLUCIÓN DE PESO Y GRASA (LÍNEAS) ─────────────────────────
  const semanasLabels = ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4', 'Semana 5', 'Semana 6', 'Semana 7', 'Semana 8'];

  const weightData = {
    labels: semanasLabels,
    datasets: [
      {
        label: 'Peso Corporal (kg)',
        data: [82.5, 81.8, 80.9, 80.2, 79.5, 79.1, 78.6, 78.0],
        borderColor: '#3b82f6', // Azul Marino de NutriHub
        backgroundColor: 'rgba(59, 130, 246, 0.04)',
        tension: 0.3,
        fill: true,
        yAxisID: 'y',
      },
      {
        label: 'Porcentaje Graso (%)',
        data: [22.4, 21.9, 21.2, 20.5, 19.8, 19.4, 18.9, 18.2],
        borderColor: '#e11d48', // Alerta / Rose
        backgroundColor: 'transparent',
        borderDash: [5, 5],
        tension: 0.3,
        yAxisID: 'y1',
      },
    ],
  };

  // ─── DATOS MOCK: MASA MUSCULAR GANADA (BARRAS) ──────────────────────────────
  const muscleData = {
    labels: semanasLabels,
    datasets: [
      {
        label: 'Masa Muscular Estimada (kg)',
        data: [31.2, 31.3, 31.5, 31.6, 31.9, 32.1, 32.2, 32.5],
        backgroundColor: 'rgba(16, 185, 129, 0.8)', // Verde Esmeralda de NutriHub
        hoverBackgroundColor: '#10b981',
        borderRadius: 8,
      },
    ],
  };

  // ─── OPCIONES DE CONFIGURACIÓN DE LOS GRÁFICOS ──────────────────────────────
  const optionsLine = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: { color: textColor, font: { family: 'sans-serif', weight: '600' as any, size: 11 } },
      },
    },
    scales: {
      x: { grid: { color: gridColor }, ticks: { color: textColor } },
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        grid: { color: gridColor },
        ticks: { color: textColor },
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        grid: { drawOnChartArea: false }, // Evita superponer líneas de rejilla
        ticks: { color: textColor },
      },
    },
  };

  const optionsBar = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: { color: textColor, font: { family: 'sans-serif', weight: '600' as any, size: 11 } },
      },
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: textColor } },
      y: { grid: { color: gridColor }, ticks: { color: textColor }, min: 28 }, // Enfocado en el rango de cambio
    },
  };

  return (
    <div className="flex min-h-screen bg-background font-sans">
      <main className="flex-1 overflow-auto flex flex-col">
        <PageHeader 
          title="Tu Evolución Temporal" 
          description="Visualiza gráficamente tu descenso de porcentaje graso e incremento de masa magra." 
          icon={<i className="bi bi-bar-chart-line-fill" />} 
        />
        
        <div className="p-6 lg:p-10 space-y-6">
          
          {/* Tarjeta 1: Gráfico de Líneas compuesto (Peso vs Grasa) */}
          <div className="bg-card border border-border rounded-[2rem] p-6 lg:p-8 shadow-sm">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-foreground tracking-tight">Composición Corporal General</h2>
              <p className="text-xs text-muted-foreground">Relación entre la pérdida de peso total y la reducción de tejido graso</p>
            </div>
            <div className="h-72 w-full">
              <Line data={weightData} options={optionsLine} />
            </div>
          </div>

          {/* Tarjeta 2: Gráfico de Barras (Masa Muscular) */}
          <div className="bg-card border border-border rounded-[2rem] p-6 lg:p-8 shadow-sm">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-foreground tracking-tight">Evolución de Masa Muscular</h2>
              <p className="text-xs text-muted-foreground">Incremento neto de masa magra estimado</p>
            </div>
            <div className="h-72 w-full">
              <Bar data={muscleData} options={optionsBar} />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}