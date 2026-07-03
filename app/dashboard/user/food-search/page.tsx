'use client';

import { useState, useEffect } from 'react';
import PageHeader from '@/components/Pageheader';
import Sidebar from '@/components/Sidebar';

// Interfaz para tipar los alimentos de la API
interface FoodResult {
  id: string;
  label: string;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
}

export default function AdminFoodSearchPage() {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [foods, setFoods] = useState<FoodResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  // ─── MOTOR DE BÚSQUEDA ULTRA-RÁPIDO CONECTADO A FATSECRET ───
  useEffect(() => {
    const cleanQuery = query.trim();

    // Reacciona rápido desde la segunda letra
    if (cleanQuery.length < 2) {
      setFoods([]);
      setError(null);
      setIsSearching(false);
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;

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
        
        // Evita que peticiones viejas pisen los resultados actuales
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
    }, 250); // 250ms anti-congelamiento

    return () => {
      clearTimeout(delayDebounce);
      controller.abort();
    };
  }, [query]);

  return (
    <div className="flex min-h-screen bg-background font-sans">
      
      <main className="flex-1 overflow-auto flex flex-col">
        <PageHeader 
          title="Base de Datos Nutricional" 
          description="Consulta perfiles analíticos completos de alimentos en tiempo real." 
          icon={<i className="bi bi-search" />} 
        />
        
        <div className="p-6 lg:p-10 space-y-6 max-w-[1200px] mx-auto w-full">
          <div className="bg-card border border-border rounded-[2rem] p-8 shadow-sm space-y-6">
            
            {/* Buscador */}
            <div className="relative">
              <i className={`bi ${isSearching ? 'bi-arrow-repeat animate-spin' : 'bi-search'} absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm`} />
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar alimento (ej: pechuga de pollo, aguacate, marcas...)" 
                className="w-full pl-11 pr-4 py-3 bg-background border border-border rounded-xl text-sm font-medium focus:outline-none focus:border-[#10b981] text-foreground transition-all" 
              />
            </div>

            {error && <p className="text-xs font-bold text-rose-500 px-1">{error}</p>}

            {/* Panel de Resultados */}
            <div className="border border-border rounded-2xl overflow-hidden bg-background/50">
              <div className="p-4 bg-muted/30 border-b border-border text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                {foods.length > 0 ? 'Resultados Encontrados' : 'Introduce un término (Mín. 2 letras)'}
              </div>
              
              <div className="divide-y divide-border max-h-[500px] overflow-y-auto">
                {foods.map((food) => (
                  <div key={food.id} className="flex items-center justify-between p-4 text-sm hover:bg-muted/30 transition-colors">
                    <div>
                      <p className="font-bold text-foreground uppercase text-xs tracking-tight">{food.label}</p>
                      <p className="text-xs text-muted-foreground font-medium mt-0.5">
                        {food.protein}g P / {food.carbs}g HC / {food.fat}g G <span className="text-[10px] text-muted-foreground/60">(por 100g)</span>
                      </p>
                    </div>
                    <span className="text-xs font-black text-[#10b981] bg-card border border-border px-3 py-1.5 rounded-xl">
                      {food.kcal} kcal
                    </span>
                  </div>
                ))}

                {foods.length === 0 && !isSearching && (
                  <div className="p-8 text-center text-xs text-muted-foreground font-medium">
                    {query.trim().length >= 2 
                      ? 'No se encontraron alimentos con ese nombre.' 
                      : 'Escribe en el buscador superior para explorar la base de datos.'}
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
