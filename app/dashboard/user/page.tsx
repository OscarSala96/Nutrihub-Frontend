'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import PageHeader from '@/components/Pageheader';

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface PatientStats {
  currentWeight: number;
  targetWeight: number;
  streakDays: number;
  kcalTarget: number;
}

interface MealPlan {
  id: string;
  type: 'Desayuno' | 'Comida' | 'Cena' | 'Snack'| 'Varias opciones';
  title: string;
  kcal: number;
  status: 'completado' | 'pendiente';
}

interface WeightHistory {
  id: string;
  date: string;
  weight: number;
  diff: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_STATS: PatientStats = {
  currentWeight: 74.5,
  targetWeight: 70.0,
  streakDays: 12,
  kcalTarget: 2150,
};

const MOCK_MEALS: MealPlan[] = [
  { id: '1', type: 'Varias opciones', title: 'Desayuno', kcal: 360, status: 'pendiente' },
  
];

const MOCK_WEIGHT_HISTORY: WeightHistory[] = [
  { id: '1', date: 'Hoy', weight: 74.5, diff: '-0.2kg' },
  { id: '2', date: '12 May', weight: 74.7, diff: '-0.5kg' },
  { id: '3', date: '05 May', weight: 75.2, diff: '-1.0kg' },
];

export default function PatientDashboard() {
  const [stats] = useState<PatientStats>(MOCK_STATS);
  const [meals] = useState<MealPlan[]>(MOCK_MEALS);
  const [history] = useState<WeightHistory[]>(MOCK_WEIGHT_HISTORY);

  // Stats superiores (Mismo diseño que el Admin)
  const statCards = [
    {
      label: 'Peso Actual',
      value: `${stats.currentWeight} kg`,
      icon: 'bi-speedometer2',
      color: 'text-[#10b981]',
    },
    {
      label: 'Racha Activa',
      value: `${stats.streakDays} días`,
      icon: 'bi-fire',
      color: 'text-orange-500',
    },
    {
      label: 'Objetivo Kcal',
      value: stats.kcalTarget,
      icon: 'bi-lightning-charge-fill',
      color: 'text-amber-500',
    },
  ];

  return (
    <div className="flex min-h-screen bg-background font-sans">

      <main className="flex-1 overflow-auto flex flex-col">
        <PageHeader
          title="Mi Progreso"
          description="Llevas 12 días cumpliendo tus objetivos. ¡Sigue así, Óscar!"
          icon={<i className="bi bi-heart-pulse-fill" />}
        />

        <div className="p-6 lg:p-10 flex-1 space-y-6">
          
          {/* ── STATS (Igual que en Admin) ── */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {statCards.map((stat) => (
              <div key={stat.label} className="bg-card rounded-3xl border border-border p-6 shadow-sm hover:shadow-md transition-all group">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{stat.label}</span>
                  <div className={`w-9 h-9 bg-muted/50 border border-border rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform ${stat.color}`}>
                    <i className={`bi ${stat.icon}`} />
                  </div>
                </div>
                <div className="text-3xl font-black text-foreground tracking-tight">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* ── COLUMNA IZQUIERDA: Plan de Comidas ── */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-card border border-border rounded-[2rem] p-8 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-xl font-bold text-foreground tracking-tight">Plan de hoy</h2>
                    <p className="text-xs text-muted-foreground font-medium italic">Fase de definición activa</p>
                  </div>
                  <Link href="/dashboard/user/diet" className="text-[10px] font-black text-[#10b981] uppercase tracking-widest border border-[#10b981]/30 px-4 py-2 rounded-full hover:bg-[#10b981] hover:text-white transition-all">
                    Ver Dieta Completa
                  </Link>
                </div>

                <div className="space-y-3">
                  {meals.map((meal) => (
                    <div key={meal.id} className="flex items-center gap-4 p-5 bg-background border border-border rounded-2xl hover:border-[#10b981]/50 transition-all group">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg ${
                        meal.status === 'completado' ? 'bg-[#10b981]/10 text-[#10b981]' : 'bg-muted text-muted-foreground'
                      }`}>
                        <i className={`bi ${meal.status === 'completado' ? 'bi-check-circle-fill' : 'bi-circle'}`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-tighter">{meal.type}</p>
                        <h2 className="text-sm font-bold text-foreground">{meal.title}</h2>
                      </div>
                      <button className="px-4 py-2 bg-muted text-foreground text-[10px] font-black uppercase rounded-lg hover:bg-[#10b981] hover:text-white transition-all">
                        {meal.status === 'completado' ? 'Revisar' : 'Marcar'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── COLUMNA DERECHA: Historial y Acciones ── */}
            <div className="space-y-6">
              {/* Historial Reciente */}
              <div className="bg-card border border-border rounded-[2rem] p-8 shadow-sm">
                <h2 className="text-xl font-bold text-foreground tracking-tight mb-6">Historial</h2>
                <div className="space-y-4">
                  {history.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-xl border border-transparent hover:border-border transition-all">
                      <div>
                        <p className="text-xs font-black text-foreground">{item.date}</p>
                        <p className="text-[10px] text-muted-foreground uppercase">{item.weight} kg</p>
                      </div>
                      <span className={`text-[10px] font-black px-2 py-1 rounded-full ${
                        item.diff.startsWith('-') ? 'bg-success/10 text-[#10b981]' : 'bg-destructive/10 text-destructive'
                      }`}>
                        {item.diff}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat con el Nutri */}
              <div className="bg-card border border-border rounded-[2rem] p-6 shadow-sm flex items-center gap-4 group cursor-pointer hover:bg-muted/30 transition-all">
                <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center text-white font-black text-xl">
                  C
                </div>
                <div className="flex-1">
                  <p className="text-xs font-black text-foreground leading-none">Carlos García</p>
                </div>
                <i className="bi bi-chat-fill text-muted-foreground group-hover:text-[#10b981] transition-colors"></i>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}