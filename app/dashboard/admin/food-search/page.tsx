'use client';

import { useState, useEffect, useMemo } from 'react';
import PageHeader from '@/components/Pageheader';
import Sidebar from '@/components/Sidebar';

interface FoodResult {
  id: string;
  label: string;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  quantity?: number; // Gramos seleccionados por el usuario
}

export default function AdminFoodSearchPage() {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [foods, setFoods] = useState<FoodResult[]>([]);
  const [selectedFoods, setSelectedFoods] = useState<FoodResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  // --- Buscador asíncrono con Debounce integrado conectado a tu API ---
  // ─── LÓGICA DE BÚSQUEDA ULTRA-RÁPIDA Y ESTABLE (FATSECRET) ───
useEffect(() => {
  const cleanQuery = query.trim();

  // Bajamos a 2 caracteres para mantener la consistencia con la API optimizada
  if (cleanQuery.length < 2) {
    setFoods([]);
    setError(null);
    setIsSearching(false);
    return;
  }

  // Creamos el controlador de aborto para evitar Race Conditions (carreras de peticiones)
  const controller = new AbortController();
  const { signal } = controller;

  // Ajustado a 250ms: absorbe la escritura manual sin saltos ni congelamientos
  const delayDebounce = setTimeout(async () => {
    try {
      setIsSearching(true);
      setError(null);

      const response = await fetch(`/api/foods?search=${encodeURIComponent(cleanQuery)}`, {
        signal
      });
      
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error ?? 'Error al conectar con la base de datos.');
      }
      
      // Solo actualizamos el estado si el usuario no ha seguido escribiendo
      if (!signal.aborted) {
        setFoods(Array.isArray(data) ? data : []);
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name !== 'AbortError' && !signal.aborted) {
        setError(err.message);
      }
    } finally {
      if (!signal.aborted) {
        setIsSearching(false);
      }
    }
  }, 250);

  return () => {
    clearTimeout(delayDebounce);
    controller.abort(); // Cancela la petición anterior de inmediato en la red
  };
}, [query]);

  // --- Agregar Alimento a la Bandeja de Comparación ---
  const handleAddFood = (food: FoodResult) => {
    // Evitamos duplicar exactamente la misma instancia usando una estampa de tiempo en el ID
    const newFoodItem: FoodResult = {
      ...food,
      id: `${food.id}-${Date.now()}`,
      quantity: 100 // Por defecto añadimos 100g
    };
    setSelectedFoods(prev => [...prev, newFoodItem]);
  };

  // --- Actualizar Gramos de un Alimento específico ---
  const handleUpdateQuantity = (id: string, grams: number) => {
    setSelectedFoods(prev => 
      prev.map(item => item.id === id ? { ...item, quantity: grams } : item)
    );
  };

  // --- Eliminar un Alimento mediante la Papelera ---
  const handleRemoveFood = (id: string) => {
    setSelectedFoods(prev => prev.filter(item => item.id !== id));
  };

  // --- Cálculo del Perfil Nutricional Acumulado ---
  const totalMacros = useMemo(() => {
    return selectedFoods.reduce((acc, current) => {
      const currentGrams = current.quantity || 0;
      const factor = currentGrams / 100;

      return {
        kcal: acc.kcal + Math.round(current.kcal * factor),
        protein: acc.protein + (current.protein * factor),
        carbs: acc.carbs + (current.carbs * factor),
        fat: acc.fat + (current.fat * factor),
      };
    }, { kcal: 0, protein: 0, carbs: 0, fat: 0 });
  }, [selectedFoods]);

  return (
    <div className="flex min-h-screen bg-background font-sans">
      
      <main className="flex-1 overflow-auto flex flex-col">
        <PageHeader 
          title="Fichas Técnicas e Historial Combinado" 
          description="Busca alimentos del supermercado o mercado tradicional y agrégalos al panel para evaluar perfiles macros compuestos." 
          icon={<i className="bi bi-search" />} 
        />
        
        <div className="p-6 lg:p-10 max-w-[1600px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* COLUMNA IZQUIERDA: BUSCADOR DE ALIMENTOS */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-card border border-border rounded-[2.5rem] p-8 shadow-sm space-y-6">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#10b981]">Buscador del Sistema</h3>
              
              <div className="relative">
                <i className={`bi ${isSearching ? 'bi-arrow-repeat animate-spin' : 'bi-search'} absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm`} />
                <input 
                  type="text" 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar pechuga, huevo, marcas de súper..." 
                  className="w-full pl-11 pr-4 py-4 bg-background border border-border rounded-2xl text-sm font-bold focus:outline-none focus:border-[#10b981] text-foreground transition-all" 
                />
              </div>

              {error && <p className="text-xs font-bold text-rose-500 px-1">{error}</p>}

              <div className="border border-border rounded-2xl overflow-hidden bg-background/50">
                <div className="p-4 bg-muted/40 border-b border-border text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                  {foods.length > 0 ? 'Resultados Disponibles' : 'Introduce un término (Mín. 2 letras)'}
                </div>
                
                <div className="divide-y divide-border max-h-[450px] overflow-y-auto">
                  {foods.map((food) => (
                    <div 
                      key={food.id} 
                      onClick={() => handleAddFood(food)}
                      className="flex items-center justify-between p-4 text-sm cursor-pointer hover:bg-muted/40 transition-colors group"
                    >
                      <div className="pr-4">
                        <p className="font-bold text-foreground text-xs uppercase tracking-tight group-hover:text-[#10b981] transition-colors">{food.label}</p>
                        <p className="text-[11px] text-muted-foreground font-semibold mt-0.5">
                          P: {food.protein}g / C: {food.carbs}g / G: {food.fat}g
                        </p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-xs font-black text-foreground bg-background border border-border px-3 py-1.5 rounded-xl">{food.kcal} kcal</span>
                        <i className="bi bi-plus-circle-fill text-[#10b981] text-lg opacity-40 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  ))}
                  
                  {foods.length === 0 && !isSearching && (
                    <div className="p-8 text-center text-xs text-muted-foreground font-medium">
                      Escribe para consultar la base de datos de alimentos.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: BANDEJA ACUMULATIVA DE ALIMENTOS */}
          <div className="lg:col-span-7 space-y-6">
            {selectedFoods.length > 0 ? (
              <>
                {/* MACROS ACUMULADOS TOTALES */}
                <div className="bg-card border border-border rounded-[2.5rem] p-8 shadow-sm space-y-6">
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-widest bg-[#10b981]/10 text-[#10b981] px-3 py-1 rounded-full">Reporte Combinado</span>
                    <h2 className="text-base font-black text-foreground uppercase tracking-tight mt-2">Sumatorio Nutricional de la Selección</h2>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { l: 'Calorías Totales', v: `${totalMacros.kcal} kcal`, c: 'text-foreground' },
                      { l: 'Proteínas', v: `${totalMacros.protein.toFixed(1)} g`, c: 'text-[#10b981]' },
                      { l: 'Carbohidratos', v: `${totalMacros.carbs.toFixed(1)} g`, c: 'text-blue-500' },
                      { l: 'Grasas', v: `${totalMacros.fat.toFixed(1)} g`, c: 'text-amber-500' }
                    ].map(m => (
                      <div key={m.l} className="bg-background border border-border rounded-2xl p-4 text-center">
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-wider mb-1">{m.l}</p>
                        <p className={`text-base font-black ${m.c}`}>{m.v}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* LISTA DINÁMICA */}
                <div className="bg-card border border-border rounded-[2.5rem] p-8 shadow-sm space-y-4">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-2">Alimentos en Análisis</h3>
                  
                  <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                    {selectedFoods.map((food) => {
                      const currentGrams = food.quantity || 100;
                      const factor = currentGrams / 100;
                      
                      return (
                        <div key={food.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-background border border-border rounded-2xl hover:border-[#10b981]/40 transition-all">
                          <div className="space-y-1 flex-1">
                            <p className="text-xs font-black text-foreground uppercase tracking-tight">{food.label}</p>
                            <div className="flex gap-3 text-[10px] font-bold text-muted-foreground">
                              <span>P: {(food.protein * factor).toFixed(1)}g</span>
                              <span>C: {(food.carbs * factor).toFixed(1)}g</span>
                              <span>G: {(food.fat * factor).toFixed(1)}g</span>
                              <span className="text-[#10b981]">Kcal: {Math.round(food.kcal * factor)}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 justify-between sm:justify-end shrink-0">
                            {/* Input de gramos */}
                            <div className="flex items-center gap-2 bg-muted/60 rounded-xl px-3 py-1.5 border border-border">
                              <input 
                                type="number" 
                                value={food.quantity || ''} 
                                onChange={(e) => handleUpdateQuantity(food.id, Number(e.target.value))}
                                className="w-14 bg-transparent text-xs font-black focus:outline-none text-foreground text-center"
                              />
                              <span className="text-[10px] font-bold text-muted-foreground">g</span>
                            </div>

                            {/* Botón de papelera */}
                            <button 
                              onClick={() => handleRemoveFood(food.id)}
                              className="p-2 text-muted-foreground hover:text-rose-500 bg-muted/30 hover:bg-rose-500/10 rounded-xl transition-colors"
                              title="Eliminar de la lista"
                            >
                              <i className="bi bi-trash text-sm" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-card border border-border border-dashed rounded-[2.5rem] p-12 text-center h-full flex flex-col items-center justify-center text-muted-foreground space-y-3 min-h-[450px]">
                <i className="bi bi-layer-forward text-3xl text-muted-foreground/40" />
                <div className="max-w-sm space-y-1">
                  <p className="text-xs">Al seleccionar alimentos del buscador izquierdo se irán apilando aquí para calcular automáticamente el sumatorio total de macronutrientes.</p>
                </div>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}
