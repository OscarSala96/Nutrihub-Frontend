'use client';

import { useState } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import PageHeader from '@/components/Pageheader';
// ─── Tipos ────────────────────────────────────────────────────────────────────

interface DashboardStats {
  totalPatients: number;
  activePlans: number;
  appointmentsToday: number;
  pendingReviews: number;
}

interface UpcomingAppointment {
  id: string;
  patientName: string;
  time: string;
  type: 'Presencial' | 'Online';
  photoUrl?: string;
}

interface PatientActivity {
  id: string;
  patientName: string;
  action: string;
  time: string;
  status: 'alert' | 'success' | 'info';
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_STATS: DashboardStats = {
  totalPatients: 15,
  activePlans: 10,
  appointmentsToday: 6,
  pendingReviews: 3,
};

const MOCK_APPOINTMENTS: UpcomingAppointment[] = [
  { id: '1', patientName: 'Carlos García', time: '10:30', type: 'Presencial' },
  { id: '2', patientName: 'Lucía Fernández', time: '12:00', type: 'Online' },
  { id: '3', patientName: 'Marcos Ruiz', time: '16:30', type: 'Presencial' },
];

const MOCK_ACTIVITY: PatientActivity[] = [
  { id: '1', patientName: 'Óscar Sala', action: 'Subió peso semanal (+0.5kg)', time: 'Hace 10 min', status: 'info' },
  { id: '2', patientName: 'Roberto Jara', action: 'Completó diario de comidas', time: 'Hace 1 hora', status: 'success' },
  { id: '3', patientName: 'Ana Belén', action: 'Mensaje pendiente: duda dieta', time: 'Hace 3 horas', status: 'alert' },
];

// ─── Utilidades ───────────────────────────────────────────────────────────────

export default function NutricionistaDashboard() {
  const [stats] = useState<DashboardStats>(MOCK_STATS);
  const [appointments] = useState<UpcomingAppointment[]>(MOCK_APPOINTMENTS);
  const [activities] = useState<PatientActivity[]>(MOCK_ACTIVITY);

  const statCards = [
    {
      label: 'Pacientes Totales',
      value: stats.totalPatients,
      icon: 'bi-people',
      subColor: 'text-emerald-500',
    },
    {
      label: 'Planes Activos',
      value: stats.activePlans,
      icon: 'bi-file-earmark-medical',
      subColor: 'text-muted-foreground',
    },
    {
      label: 'Progresos Hoy',
      value: stats.appointmentsToday,
      icon: 'bi-calendar-check',
      subColor: 'text-amber-500',
    },
    {
      label: 'Pendientes Revisión',
      value: stats.pendingReviews,
      icon: 'bi-clipboard-pulse',
      subColor: stats.pendingReviews > 5 ? 'text-rose-500' : 'text-emerald-500',
    },
  ];

  const quickActions = [
    { label: 'Nuevo Paciente', icon: 'bi-person-plus', href: '/pacientes/nuevo', color: 'text-primary' },
    { label: 'Crear Dieta', icon: 'bi-egg-fried', href: '/dietas/crear', color: 'text-secondary' },
    { label: 'Revisar Progresos', icon: 'bi-clock-history', href: '/agenda', color: 'text-primary' },
    { label: 'Mensajería', icon: 'bi-chat-dots', href: '/mensajes', color: 'text-secondary' },
  ];

  return (
    <div className="flex min-h-screen bg-background font-sans">

      <main className="flex-1 overflow-auto flex flex-col">
        <PageHeader
          title="Panel NutriHub"
          description="Bienvenido de nuevo. Aquí tienes un resumen de tus pacientes y agenda para hoy."
          icon={<i className="bi bi-person-badge-fill" />}
        />

        <div className="p-6 lg:p-10 flex-1 space-y-6">
          
          {/* ── STATS ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {statCards.map((stat) => (
              <div key={stat.label} className="bg-card rounded-3xl border border-border p-6 shadow-sm hover:shadow-md transition-all group">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{stat.label}</span>
                  <div className={`w-9 h-9 bg-muted/50 border border-border rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform text-primary`}>
                    <i className={`bi ${stat.icon}`} />
                  </div>
                </div>
                <div className="text-3xl font-black text-foreground tracking-tight mb-2">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* ── COLUMNA IZQUIERDA: Citas y Actividad ── */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Sección de Revisiones de Progreso */}
<div className="bg-card border border-border rounded-[2rem] p-8 shadow-sm">
  <div className="flex items-center justify-between mb-6">
    <div>
      <h2 className="text-xl font-bold text-foreground tracking-tight">Revisiones de progreso</h2>
      <p className="text-xs text-muted-foreground font-medium">Últimos registros recibidos hoy</p>
    </div>
    <Link href="/dashboard/pro/logs" className="text-xs font-black text-secondary uppercase tracking-widest hover:underline">
      Ver todo el historial
    </Link>
  </div>

  <div className="space-y-3">
    {[
      { id: 1, name: 'Juan Pérez', weight: '75.4 kg', trend: '-0.5kg', time: '08:30' },
      { id: 2, name: 'Maria García', weight: '62.1 kg', trend: '+0.2kg', time: '09:15' },
      { id: 3, name: 'Carlos Ruiz', weight: '88.9 kg', trend: '-1.2kg', time: '10:05' },
    ].map((log) => (
      <div key={log.id} className="flex items-center gap-4 p-4 bg-background border border-border rounded-2xl hover:border-primary/50 transition-all group">
        <div className="w-14 h-12 bg-primary/10 rounded-xl flex flex-col items-center justify-center text-primary font-black">
          <span className="text-[10px] uppercase leading-none opacity-70">Hora</span>
          <span className="text-sm leading-none">{log.time}</span>
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-foreground truncate group-hover:text-primary transition-colors">
            {log.name}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-muted-foreground uppercase tracking-tighter font-bold">
              Peso registrado: <span className="text-foreground">{log.weight}</span>
            </span>
            <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${
              log.trend.startsWith('-') ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
            }`}>
              {log.trend}
            </span>
          </div>
        </div>

        <Link 
          href={`/dashboard/pro/patients/${log.id}`} 
          className="px-4 py-2 bg-muted text-foreground text-[10px] font-black uppercase rounded-lg hover:bg-primary hover:text-white transition-all active:scale-95"
        >
          Analizar
        </Link>
      </div>
    ))}
  </div>
</div>

              {/* Actividad de pacientes */}
              <div className="bg-card border border-border rounded-[2rem] p-8 shadow-sm">
                <h2 className="text-xl font-bold text-foreground tracking-tight mb-6">Actividad reciente</h2>
                <div className="space-y-4">
                  {activities.map((act) => (
                    <div key={act.id} className="flex items-start gap-4 p-2">
                      <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                        act.status === 'alert' ? 'bg-rose-500' : act.status === 'success' ? 'bg-emerald-500' : 'bg-blue-500'
                      }`} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-bold text-foreground">{act.patientName}</p>
                          <span className="text-[10px] text-muted-foreground">{act.time}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{act.action}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── COLUMNA DERECHA: Acciones y Notas ── */}
            <div className="space-y-6">
              
              {/* Acciones Rápidas */}
              <div className="bg-card border border-border rounded-[2rem] p-8 shadow-sm">
                <h2 className="text-xl font-bold text-foreground tracking-tight mb-6">Acciones rápidas</h2>
                <div className="grid grid-cols-1 gap-2">
                  {quickActions.map((action) => (
                    <Link key={action.label} href={action.href} className="flex items-center gap-3 p-4 bg-muted/30 border border-border rounded-2xl hover:bg-background hover:border-secondary transition-all group">
                      <i className={`bi ${action.icon} text-xl ${action.color} group-hover:scale-110 transition-transform`} />
                      <span className="text-sm font-bold text-foreground">{action.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}