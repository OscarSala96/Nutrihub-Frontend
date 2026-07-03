'use client';

import { useState } from 'react';
import PageHeader from '@/components/Pageheader';
import Sidebar from '@/components/Sidebar';

export default function UserDietPage() {
  // Estados para controlar qué alternativa visualiza el paciente en cada comida
  const [activeDesayuno, setActiveDesayuno] = useState<'A' | 'B'>('A');
  const [activeComida, setActiveComida] = useState<'A' | 'B'>('A');
  const [activeCena, setActiveCena] = useState<'A' | 'B'>('A');

  return (
    <div className="flex min-h-screen bg-background font-sans">
      <main className="flex-1 overflow-auto flex flex-col">
        <PageHeader 
          title="Mi Plan Nutricional" 
          description="Sigue tu dieta estructurada prescrita por tu nutricionista." 
          icon={<i className="bi bi-calendar-check" />} 
        />
        
        <div className="p-6 lg:p-10 max-w-7xl mx-auto w-full space-y-8">
          
          {/* DESAYUNO */}
          <div className="bg-card border border-border rounded-[2.5rem] p-8 shadow-sm hover:border-[#10b981]/30 transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <h2 className="text-lg font-black text-foreground tracking-tight uppercase text-xs tracking-widest text-[#10b981] flex items-center">
                <i className="bi bi-brightness-alt-high-fill mr-2"></i>Comida 1: Desayuno
              </h2>
              
              {/* Selector de Opciones alternativas */}
              <div className="flex bg-muted p-1 rounded-xl self-start sm:self-center">
                <button
                  onClick={() => setActiveDesayuno('A')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all ${
                    activeDesayuno === 'A' ? 'bg-[#10b981] text-white shadow-sm' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Opción A
                </button>
                <button
                  onClick={() => setActiveDesayuno('B')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all ${
                    activeDesayuno === 'B' ? 'bg-[#10b981] text-white shadow-sm' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Opción B
                </button>
              </div>
            </div>

            {/* Renderizado Condicional de Alimentos según la opción */}
            {activeDesayuno === 'A' ? (
              <div className="p-5 bg-muted/40 border border-border rounded-2xl space-y-3 animation-fade-in">
                <p className="text-sm font-bold text-foreground flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#10b981]"></span>
                  YOGUR PROTEÍNAS +PROTEINAS ARÁNDANOS (HACENDADO) — 100 gr
                </p>
                <p className="text-sm font-bold text-foreground flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#10b981]"></span>
                  LECHE DESNATADA CALCIO (HACENDADO) - 150 ml
                </p>
                <p className="text-sm font-bold text-foreground flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#10b981]"></span>
                  COPOS DE AVENA INTEGRAL - 70 gr
                </p>
              </div>
            ) : (
              <div className="p-5 bg-muted/40 border border-border rounded-2xl space-y-3 animation-fade-in">
                <p className="text-sm font-bold text-foreground flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#10b981]"></span>
                  PAN DE MOLDE INTEGRAL 100% SIN AZÚCARES (HACENDADO) — 100 gr
                </p>
                <p className="text-sm font-bold text-foreground flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#10b981]"></span>
                  PECHUGA DE PAVO BAJO EN SAL 92% (HACENDADO) - 70 gr
                </p>
                <p className="text-sm font-bold text-foreground flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#10b981]"></span>
                  LECHE DESNATADA CALCIO (HACENDADO) — 150 ml
                </p>
              </div>
            )}
          </div>

          {/* COMIDA */}
          {/*<div className="bg-card border border-border rounded-[2.5rem] p-8 shadow-sm hover:border-blue-500/30 transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <h2 className="text-lg font-black text-foreground tracking-tight uppercase text-xs tracking-widest text-blue-500 flex items-center">
                <i className="bi bi-sun-fill mr-2"></i>Comida 2: Almuerzo / Comida
              </h2>
              
              <div className="flex bg-muted p-1 rounded-xl self-start sm:self-center">
                <button
                  onClick={() => setActiveComida('A')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all ${
                    activeComida === 'A' ? 'bg-blue-500 text-white shadow-sm' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Opción A
                </button>
                <button
                  onClick={() => setActiveComida('B')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all ${
                    activeComida === 'B' ? 'bg-blue-500 text-white shadow-sm' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Opción B
                </button>
              </div>
            </div>

            {activeComida === 'A' ? (
              <div className="p-5 bg-muted/40 border border-border rounded-2xl space-y-3">
                <p className="text-sm font-bold text-foreground flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                  Arroz Integral — 100 gr
                </p>
                <p className="text-sm font-bold text-foreground flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                  Pechuga de Pollo — 150 gr
                </p>
                <p className="text-sm font-bold text-foreground flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                  1 Manzana mediana
                </p>
              </div>
            ) : (
              <div className="p-5 bg-muted/40 border border-border rounded-2xl space-y-3">
                <p className="text-sm font-bold text-foreground flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                  Pasta Integral (Macarrones/Espaguetis) — 90 gr
                </p>
                <p className="text-sm font-bold text-foreground flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                  Tacos de Ternera magra a la plancha — 140 gr
                </p>
                <p className="text-sm font-bold text-foreground flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                  1 Taza de Fresas troceadas — 150 gr
                </p>
              </div>
            )}
          </div>*/}

          {/* CENA */}
          {/*<div className="bg-card border border-border rounded-[2.5rem] p-8 shadow-sm hover:border-amber-500/30 transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <h2 className="text-lg font-black text-foreground tracking-tight uppercase text-xs tracking-widest text-amber-500 flex items-center">
                <i className="bi bi-moon-stars-fill mr-2"></i>Comida 3: Cena
              </h2>
              
              <div className="flex bg-muted p-1 rounded-xl self-start sm:self-center">
                <button
                  onClick={() => setActiveCena('A')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all ${
                    activeCena === 'A' ? 'bg-amber-500 text-white shadow-sm' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Opción A
                </button>
                <button
                  onClick={() => setActiveCena('B')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all ${
                    activeCena === 'B' ? 'bg-amber-500 text-white shadow-sm' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Opción B
                </button>
              </div>
            </div>

            {activeCena === 'A' ? (
              <div className="p-5 bg-muted/40 border border-border rounded-2xl space-y-3">
                <p className="text-sm font-bold text-foreground flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                  Salmón — 150 gr
                </p>
                <p className="text-sm font-bold text-foreground flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                  Patatas — 180 gr
                </p>
                <p className="text-sm font-bold text-foreground flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                  Aceite de oliva virgen extra — 5 gr
                </p>
              </div>
            ) : (
              <div className="p-5 bg-muted/40 border border-border rounded-2xl space-y-3">
                <p className="text-sm font-bold text-foreground flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                  Lomo de Merluza o Bacalao al horno — 180 gr
                </p>
                <p className="text-sm font-bold text-foreground flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                  Boniato / Camote asado — 150 gr
                </p>
                <p className="text-sm font-bold text-foreground flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                  Aguacate fresco mediano — 50 gr
                </p>
              </div>
            )}
          </div>*/}

        </div>
      </main>
    </div>
  );
}