'use client';

import { useState } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import PageHeader from '@/components/Pageheader';

interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  objective: string;
  lastReview: string;
  status: 'Activo' | 'Inactivo';
  /*planType: 'Premium' | 'Estándar' | 'Seguimiento';*/
  hasNewProgress?: boolean;
  progressDate?: string;
}

const MOCK_PATIENTS: Patient[] = [
  { id: '1',  name: 'Juan Pérez',      email: 'juan.perez@email.com',  phone: '+34 611 223 344', age: 34, objective: 'Pérdida de Grasa',         lastReview: 'Hoy, 07:15',      status: 'Activo',    hasNewProgress: true,  progressDate: 'Hoy, 07:15' },
  { id: '2',  name: 'María García',    email: 'maria.g@email.com',     phone: '+34 622 334 455', age: 28, objective: 'Recomposición Corporal',    lastReview: 'Ayer, 09:15',      status: 'Activo',   hasNewProgress: false },
  { id: '3',  name: 'Carlos Pérez',    email: 'carlos.ruiz@email.com', phone: '+34 633 445 566', age: 42, objective: 'Ganancia de Masa Muscular', lastReview: 'Hoy, 9:50',      status: 'Activo', hasNewProgress: true,  progressDate: 'Hoy, 09:50' },
  { id: '4',  name: 'Óscar Sala',      email: 'oscar.sala@email.com',  phone: '+34 644 556 677', age: 31, objective: 'Rendimiento Deportivo',     lastReview: 'Ayer, 18:20',     status: 'Activo',   hasNewProgress: false },
  { id: '5',  name: 'Roberto Jara',    email: 'roberto.j@email.com',   phone: '+34 655 667 788', age: 25, objective: 'Salud y Bienestar',         lastReview: 'Hace 2 días',     status: 'Activo', hasNewProgress: false },
  { id: '6',  name: 'Ana Belén',       email: 'ana.belen@email.com',   phone: '+34 666 778 899', age: 39, objective: 'Pérdida de Grasa',         lastReview: 'Hace 1 semana',   status: 'Inactivo', hasNewProgress: false },
  { id: '7',  name: 'Sergio Torres',   email: 'sergio.t@email.com',    phone: '+34 677 889 900', age: 29, objective: 'Ganancia de Masa Muscular', lastReview: 'Hoy, 12:30',      status: 'Activo',   hasNewProgress: true,  progressDate: 'Hoy, 12:30' },
  { id: '8',  name: 'Lucía Fernández', email: 'laura.mendez@email.com',phone: '+34 688 990 011', age: 35, objective: 'Pérdida de Grasa',         lastReview: 'Ayer, 11:15',     status: 'Activo',   hasNewProgress: false },
  { id: '9',  name: 'Diego Delgado',   email: 'diego.d@email.com',     phone: '+34 699 001 122', age: 46, objective: 'Salud y Bienestar',         lastReview: 'Hace 3 días',     status: 'Activo', hasNewProgress: false },
  { id: '10', name: 'Clara Ortiz',     email: 'clara.ortiz@email.com', phone: '+34 600 112 233', age: 24, objective: 'Recomposición Corporal',    lastReview: 'Hoy, 07:40',      status: 'Activo',   hasNewProgress: true,  progressDate: 'Hoy, 07:40' },
  { id: '11', name: 'Javier Marín',    email: 'javi.marin@email.com',  phone: '+34 611 334 455', age: 33, objective: 'Rendimiento Deportivo',     lastReview: 'Ayer, 09:30',     status: 'Activo',   hasNewProgress: false },
  { id: '12', name: 'Patricia Silva',  email: 'patricia.s@email.com',  phone: '+34 622 445 566', age: 51, objective: 'Salud y Bienestar',         lastReview: 'Ayer, 17:00',     status: 'Activo',   hasNewProgress: false },
  { id: '13', name: 'Marcos Ruiz',     email: 'manuel.soto@email.com', phone: '+34 633 556 677', age: 38, objective: 'Pérdida de Grasa',         lastReview: 'Hace 2 semanas',  status: 'Inactivo', hasNewProgress: false },
  { id: '14', name: 'Marta Vicente',   email: 'marta.v@email.com',     phone: '+34 644 667 788', age: 27, objective: 'Ganancia de Masa Muscular', lastReview: 'Hace 4 días',     status: 'Activo', hasNewProgress: false },
  { id: '15', name: 'Alejandro Ramos', email: 'alex.ramos@email.com',  phone: '+34 655 778 899', age: 30, objective: 'Recomposición Corporal',    lastReview: 'Hoy, 10:55',      status: 'Activo',   hasNewProgress: true,  progressDate: 'Hoy, 10:55' },
];

const PLAN_COLORS: Record<string, string> = {
  Premium:     'bg-indigo-500/10 text-indigo-500',
  Estándar:    'bg-blue-500/10 text-blue-500',
  Seguimiento: 'bg-amber-500/10 text-amber-500',
};

const STATUS_CONFIG: Record<string, { dot: string; text: string }> = {
  Activo:    { dot: 'bg-emerald-500', text: 'text-emerald-500' },
  'En Pausa':{ dot: 'bg-amber-500',   text: 'text-amber-500'   },
  Inactivo:  { dot: 'bg-muted-foreground', text: 'text-muted-foreground' },
};

const INITIALS = (name: string) => name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

const AVATAR_COLORS = [
  'bg-emerald-500/20 text-emerald-600',
  'bg-blue-500/20 text-blue-600',
  'bg-purple-500/20 text-purple-600',
  'bg-amber-500/20 text-amber-600',
  'bg-rose-500/20 text-rose-600',
  'bg-cyan-500/20 text-cyan-600',
];

export default function PatientsPage() {
  const [patients]      = useState<Patient[]>(MOCK_PATIENTS);
  const [searchTerm, setSearchTerm]     = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [planFilter, setPlanFilter]     = useState('Todos');

  const newProgressCount = patients.filter(p => p.hasNewProgress).length;

  const filtered = patients.filter(p => {
    const q = searchTerm.toLowerCase();
    const matchSearch = p.name.toLowerCase().includes(q) || p.email.toLowerCase().includes(q);
    const matchStatus = statusFilter === 'Todos' || p.status === statusFilter;
   /* const matchPlan   = planFilter   === 'Todos' || p.planType === planFilter;*/
    return matchSearch && matchStatus;
  });

  return (
    <div className="flex min-h-screen bg-background font-sans">

      <main className="flex-1 overflow-auto flex flex-col">
        <PageHeader
          title="Gestión de Pacientes"
          description="Visualiza, filtra y accede al progreso de cada paciente."
          icon={<i className="bi bi-people-fill" />}
        />

        <div className="p-6 lg:p-10 flex-1 space-y-6 max-w-[1400px] mx-auto w-full">

          {/* Banner nuevos registros */}
          {newProgressCount > 0 && (
            <div className="bg-[#10b981]/10 border border-[#10b981]/30 rounded-2xl px-5 py-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#10b981]/20 flex items-center justify-center shrink-0">
                <i className="bi bi-bell-fill text-[#10b981] text-sm"></i>
              </div>
              <div className="flex-1">
                <p className="text-sm font-black text-foreground">
                  {newProgressCount} paciente{newProgressCount > 1 ? 's han' : ' ha'} enviado nuevos registros de progreso hoy
                </p>
                <p className="text-xs text-muted-foreground">Revisa los progresos marcados en <span className="text-[#10b981] font-bold">verde</span> en la tabla</p>
              </div>
            </div>
          )}

          {/* KPIs */}
          <div className="grid grid-cols-3 lg:grid-cols-3 gap-4">
            {[
              { label: 'Total Pacientes', value: patients.length,                                   icon: 'bi-people-fill',          color: 'text-[#10b981]', bg: 'bg-[#10b981]/10' },
              { label: 'Activos',         value: patients.filter(p => p.status === 'Activo').length, icon: 'bi-check-circle-fill',    color: 'text-blue-500',  bg: 'bg-blue-500/10'  },
              { label: 'Nuevos Registros',value: newProgressCount,                                   icon: 'bi-graph-up-arrow',       color: 'text-purple-500',bg: 'bg-purple-500/10'},
            ].map((k, i) => (
              <div key={i} className="bg-card border border-border rounded-3xl p-5 flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl ${k.bg} flex items-center justify-center shrink-0`}>
                  <i className={`bi ${k.icon} ${k.color} text-base`}></i>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{k.label}</p>
                  <p className="text-2xl font-black text-foreground">{k.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Barra de herramientas */}
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center bg-card border border-border rounded-[1.5rem] p-4">
            <div className="relative flex-1">
              <i className="bi bi-search absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm" />
              <input
                type="text"
                placeholder="Buscar por nombre o email..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-background border border-border rounded-xl text-sm font-medium text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#10b981] transition-colors"
              />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
                className="px-4 py-2.5 bg-background border border-border rounded-xl text-xs font-bold text-foreground focus:outline-none focus:border-[#10b981] transition-colors cursor-pointer">
                <option value="Todos">Todos los estados</option>
                <option value="Activo">Activos</option>
                <option value="Inactivo">Inactivos</option>
              </select>
              <Link href="/dashboard/admin/patients/new"
                className="flex items-center gap-2 px-5 py-2.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all active:scale-95 shadow-md shadow-[#10b981]/20">
                <i className="bi bi-person-plus-fill text-sm" />
                Nuevo Paciente
              </Link>
            </div>
          </div>

          {/* Tabla */}
          <div className="bg-card border border-border rounded-[2rem] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    {['Paciente', 'Objetivo', 'Último Registro', 'Progreso', 'Estado', 'Acciones'].map(h => (
                      <th key={h} className="p-5 text-[10px] font-black text-muted-foreground uppercase tracking-widest whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filtered.length > 0 ? filtered.map((p, idx) => (
                    <tr key={p.id} className="hover:bg-muted/20 transition-colors group">

                      {/* Paciente */}
                      <td className="p-5">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm shrink-0 ${AVATAR_COLORS[idx % AVATAR_COLORS.length]}`}>
                            {INITIALS(p.name)}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-foreground truncate group-hover:text-[#10b981] transition-colors">{p.name}</p>
                            <p className="text-xs text-muted-foreground truncate">{p.email} · {p.age} años</p>
                          </div>
                        </div>
                      </td>

                      {/* Objetivo */}
                      <td className="p-5">
                        <span className="text-xs font-semibold text-foreground whitespace-nowrap">{p.objective}</span>
                      </td>

                      {/* Plan */}
                      {/* <td className="p-5">
                        <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${PLAN_COLORS[p.planType]}`}>
                          {p.planType}
                        </span>
                      </td> */}

                      {/* Último registro */}
                      <td className="p-5">
                        <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground whitespace-nowrap">
                          <i className="bi bi-clock text-sm" />
                          {p.lastReview}
                        </div>
                      </td>

                      {/* Nuevo progreso */}
                      <td className="p-5">
                        {p.hasNewProgress ? (
                          <div className="flex flex-col gap-1">
                            <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-[#10b981] bg-[#10b981]/10 px-2.5 py-1 rounded-full w-fit animate-pulse">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></span>
                              Nuevo registro
                            </span>
                            <span className="text-[10px] text-muted-foreground pl-1">{p.progressDate}</span>
                          </div>
                        ) : (
                          <span className="text-[10px] text-muted-foreground/50 font-medium">—</span>
                        )}
                      </td>

                      {/* Estado */}
                      <td className="p-5">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-bold ${STATUS_CONFIG[p.status].text}`}>
                          <span className={`w-2 h-2 rounded-full ${STATUS_CONFIG[p.status].dot}`} />
                          {p.status}
                        </span>
                      </td>

                      {/* Acciones */}
                      <td className="p-5">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/dashboard/admin/patients/${p.id}`}
                            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${
                              p.hasNewProgress
                                ? 'bg-[#10b981] text-white hover:bg-[#059669] shadow-md shadow-[#10b981]/20'
                                : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground border border-border'
                            }`}
                          >
                            <i className="bi bi-graph-up-arrow text-xs"></i>
                            Progreso
                          </Link>
                          <Link
                            href={`/dashboard/admin/patients/${p.id}`}
                            className="p-2 rounded-xl bg-muted border border-border text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-all"
                          >
                            <i className="bi bi-person-lines-fill text-sm"></i>
                          </Link>
                        </div>
                      </td>

                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={7} className="p-10 text-center text-sm font-medium text-muted-foreground">
                        <i className="bi bi-people text-3xl block mb-2 opacity-30" />
                        No se encontraron pacientes con los filtros aplicados.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer tabla */}
            <div className="border-t border-border px-5 py-3 flex items-center justify-between bg-muted/10">
              <p className="text-[11px] text-muted-foreground font-medium">
                Mostrando <span className="font-black text-foreground">{filtered.length}</span> de <span className="font-black text-foreground">{patients.length}</span> pacientes
              </p>
              {filtered.length !== patients.length && (
                <button onClick={() => { setSearchTerm(''); setStatusFilter('Todos'); setPlanFilter('Todos'); }}
                  className="text-[11px] font-black text-[#10b981] hover:underline">
                  Limpiar filtros
                </button>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}