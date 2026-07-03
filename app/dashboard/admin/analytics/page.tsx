'use client';

import { useEffect, useState } from 'react';
import PageHeader from '@/components/Pageheader';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  RadialLinearScale
} from 'chart.js';
import { Line, Bar, Doughnut, Radar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, ArcElement, RadialLinearScale, Title, Tooltip, Legend, Filler
);

const PATIENTS = [
  { id: '1',  name: 'Juan Pérez',       age: 34, objective: 'Pérdida de Grasa',          status: 'Activo',    planType: 'Premium',     lastReview: 'Hoy, 08:30' },
  { id: '2',  name: 'María García',     age: 28, objective: 'Recomposición Corporal',     status: 'Activo',    planType: 'Estándar',    lastReview: 'Hoy, 09:15' },
  { id: '3',  name: 'Carlos Pérez',     age: 42, objective: 'Ganancia de Masa Muscular',  status: 'Activo',    planType: 'Premium',     lastReview: 'Hoy, 10:05' },
  { id: '4',  name: 'Elena Sanz',       age: 31, objective: 'Rendimiento Deportivo',      status: 'Activo',    planType: 'Premium',     lastReview: 'Ayer, 18:20' },
  { id: '5',  name: 'Roberto Jara',     age: 25, objective: 'Salud y Bienestar',          status: 'Activo',  planType: 'Seguimiento', lastReview: 'Hace 2 días' },
  { id: '6',  name: 'Ana Belén',        age: 39, objective: 'Pérdida de Grasa',           status: 'Inactivo',  planType: 'Estándar',    lastReview: 'Hace 1 semana' },
  { id: '7',  name: 'Sergio Torres',    age: 29, objective: 'Ganancia de Masa Muscular',  status: 'Activo',    planType: 'Estándar',    lastReview: 'Hoy, 12:40' },
  { id: '8',  name: 'Lucía Fernández',  age: 35, objective: 'Pérdida de Grasa',           status: 'Activo',    planType: 'Premium',     lastReview: 'Ayer, 11:15' },
  { id: '9',  name: 'Diego Delgado',    age: 46, objective: 'Salud y Bienestar',          status: 'Activo',  planType: 'Estándar',    lastReview: 'Hace 3 días' },
  { id: '10', name: 'Clara Ortiz',      age: 24, objective: 'Recomposición Corporal',     status: 'Activo',    planType: 'Premium',     lastReview: 'Hoy, 07:45' },
  { id: '11', name: 'Javier Marín',     age: 33, objective: 'Rendimiento Deportivo',      status: 'Activo',    planType: 'Estándar',    lastReview: 'Ayer, 09:30' },
  { id: '12', name: 'Patricia Silva',   age: 51, objective: 'Salud y Bienestar',          status: 'Activo',    planType: 'Seguimiento', lastReview: 'Ayer, 17:00' },
  { id: '13', name: 'Marcos Ruiz',      age: 38, objective: 'Pérdida de Grasa',           status: 'Inactivo',  planType: 'Estándar',    lastReview: 'Hace 2 semanas' },
  { id: '14', name: 'Marta Vicente',    age: 27, objective: 'Ganancia de Masa Muscular',  status: 'Activo',  planType: 'Premium',     lastReview: 'Hace 4 días' },
  { id: '15', name: 'Alejandro Ramos',  age: 30, objective: 'Recomposición Corporal',     status: 'Activo',    planType: 'Premium',     lastReview: 'Hoy, 11:00' },
];

const totalPatients = PATIENTS.length;
const activos       = PATIENTS.filter(p => p.status === 'Activo').length;
const inactivos     = PATIENTS.filter(p => p.status === 'Inactivo').length;
const riesgoAbandono = + inactivos;

const objectiveCounts = PATIENTS.reduce((acc, p) => {
  acc[p.objective] = (acc[p.objective] || 0) + 1;
  return acc;
}, {} as Record<string, number>);

const planCounts = PATIENTS.reduce((acc, p) => {
  acc[p.planType] = (acc[p.planType] || 0) + 1;
  return acc;
}, {} as Record<string, number>);

const ageGroups = { '18–29': 0, '30–39': 0, '40–49': 0, '50+': 0 };
PATIENTS.forEach(p => {
  if (p.age < 30) ageGroups['18–29']++;
  else if (p.age < 40) ageGroups['30–39']++;
  else if (p.age < 50) ageGroups['40–49']++;
  else ageGroups['50+']++;
});

export default function AdminAnalyticsPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const gridColor = 'rgba(128,128,128,0.08)';
  const tickColor = '#888888';

  const statusData = {
    labels: ['Activos', 'Inactivos'],
    datasets: [{ data: [activos, inactivos], backgroundColor: ['#10b981', '#f59e0b', '#ef4444'], borderWidth: 0, hoverOffset: 4 }]
  };
  const doughnutOptions = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom' as const, labels: { color: tickColor, font: { weight: 'bold' as const, size: 11 }, padding: 14, usePointStyle: true } } }
  };

  const objectiveData = {
    labels: Object.keys(objectiveCounts),
    datasets: [{ data: Object.values(objectiveCounts), backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#a855f7', '#f97316'], borderRadius: 8, barThickness: 18 }]
  };
  const objectiveOptions = {
    indexAxis: 'y' as const, responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { max: 5, ticks: { color: tickColor, stepSize: 1 }, grid: { color: gridColor } },
      y: { grid: { display: false }, ticks: { color: tickColor, font: { weight: 'bold' as const, size: 10 } } }
    }
  };

  const planData = {
    labels: Object.keys(planCounts),
    datasets: [{ data: Object.values(planCounts), backgroundColor: ['#6366f1', '#10b981', '#f59e0b'], borderWidth: 0, hoverOffset: 4 }]
  };

  const ageData = {
    labels: Object.keys(ageGroups),
    datasets: [{ data: Object.values(ageGroups), backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#a855f7'], borderRadius: 8, barThickness: 32 }]
  };
  const ageOptions = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { grid: { color: gridColor }, ticks: { color: tickColor, stepSize: 1 } },
      x: { grid: { display: false }, ticks: { color: tickColor, font: { weight: 'bold' as const } } }
    }
  };

  const radarData = {
    labels: ['Adherencia', 'Frec. Consulta', 'Progreso', 'Riesgo Abandono', 'Complejidad'],
    datasets: [
      { label: 'Pérdida de Grasa',    data: [72, 80, 68, 45, 60], borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.1)',  pointBackgroundColor: '#10b981', borderWidth: 2 },
      { label: 'Ganancia Muscular',   data: [85, 70, 80, 20, 75], borderColor: '#3b82f6', backgroundColor: 'rgba(59,130,246,0.1)',  pointBackgroundColor: '#3b82f6', borderWidth: 2 },
      { label: 'Recomposición',       data: [78, 85, 74, 30, 88], borderColor: '#a855f7', backgroundColor: 'rgba(168,85,247,0.1)', pointBackgroundColor: '#a855f7', borderWidth: 2 },
    ]
  };
  const radarOptions = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom' as const, labels: { color: tickColor, font: { weight: 'bold' as const, size: 10 }, usePointStyle: true, padding: 12 } } },
    scales: { r: { min: 0, max: 100, ticks: { display: false }, grid: { color: 'rgba(128,128,128,0.12)' }, pointLabels: { color: tickColor, font: { weight: 'bold' as const, size: 10 } } } }
  };

  const reviewData = {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Hoy'],
    datasets: [{
      label: 'Revisiones',
      data: [2, 3, 1, 2, 3, PATIENTS.filter(p => p.lastReview.startsWith('Hoy')).length],
      borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.08)',
      tension: 0.4, fill: true, pointBackgroundColor: '#10b981', pointHoverRadius: 7,
    }]
  };
  const reviewOptions = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { grid: { color: gridColor }, ticks: { color: tickColor, stepSize: 1 }, min: 0 },
      x: { grid: { display: false }, ticks: { color: tickColor, font: { weight: 'bold' as const } } }
    }
  };

  const riskPatients = PATIENTS.filter(p => p.status !== 'Activo');
  const todayPatients = PATIENTS.filter(p => p.lastReview.startsWith('Hoy'));

  if (!mounted) return null;

  return (
    <div className="flex min-h-screen bg-background font-sans">
      <main className="flex-1 overflow-auto flex flex-col">
        <PageHeader
          title="Estadísticas"
          description="Estadísticas en tiempo real basadas en tus pacientes."
          icon={<i className="bi bi-graph-up-arrow" />}
        />

        <div className="p-6 lg:p-10 max-w-[1600px] mx-auto w-full space-y-6">

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-[2.5rem] p-8 flex flex-col min-h-[360px]">
              <div className="mb-4">
                <span className="text-[9px] font-black uppercase tracking-widest bg-[#10b981]/10 text-[#10b981] px-3 py-1 rounded-full">Cartera</span>
                <h2 className="text-base font-black text-foreground uppercase tracking-tight mt-2">Estado de Pacientes</h2>
              </div>
              <div className="flex-1 min-h-[220px] relative">
                <Doughnut data={statusData} options={doughnutOptions} />
              </div>
            </div>

            <div className="lg:col-span-2 bg-card border border-border rounded-[2.5rem] p-8 flex flex-col min-h-[360px]">
              <div className="mb-4">
                <span className="text-[9px] font-black uppercase tracking-widest bg-blue-500/10 text-blue-500 px-3 py-1 rounded-full">Objetivos</span>
                <h2 className="text-base font-black text-foreground uppercase tracking-tight mt-2">Distribución por Objetivo Terapéutico</h2>
                <p className="text-xs text-muted-foreground">Número de pacientes por cada tipo de objetivo activo</p>
              </div>
              <div className="flex-1 min-h-[220px] relative">
                <Bar data={objectiveData} options={objectiveOptions} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            <div className="bg-card border border-border rounded-[2.5rem] p-8 flex flex-col min-h-[340px]">
              <div className="mb-4">
                <span className="text-[9px] font-black uppercase tracking-widest bg-amber-500/10 text-amber-500 px-3 py-1 rounded-full">Demografía</span>
                <h2 className="text-base font-black text-foreground uppercase tracking-tight mt-2">Rango de Edad de la Cartera</h2>
                <p className="text-xs text-muted-foreground">Número de pacientes por tramo de edad</p>
              </div>
              <div className="flex-1 min-h-[200px] relative">
                <Bar data={ageData} options={ageOptions} />
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-[2.5rem] p-8 flex flex-col min-h-[420px]">
              <div className="mb-4">
                <span className="text-[9px] font-black uppercase tracking-widest bg-[#10b981]/10 text-[#10b981] px-3 py-1 rounded-full">Actividad</span>
                <h2 className="text-base font-black text-foreground uppercase tracking-tight mt-2">Revisiones Realizadas esta Semana</h2>
              </div>
              <div className="flex-1 min-h-[200px] relative">
                <Line data={reviewData} options={reviewOptions} />
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}