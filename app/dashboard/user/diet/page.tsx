'use client';

import { useEffect, useState } from 'react';
import PageHeader from '@/components/Pageheader';
import { apiRequest } from '@/lib/api';

type MealName = 'Desayuno' | 'Comida' | 'Cena';
type Meal = { label?: string; quantity?: number; kcal?: number; protein?: number; carbs?: number; fat?: number };
type Diet = {
  idDieta: string;
  fechaInicio: string;
  fechaFin: string;
  descripcion: Record<string, unknown>;
};

const MEALS: MealName[] = ['Desayuno', 'Comida', 'Cena'];

function getMealOptions(diet: Diet, meal: MealName): Meal[][] {
  const meals = diet.descripcion.meals;
  if (!meals || typeof meals !== 'object') return [];
  const value = (meals as Record<string, unknown>)[meal];
  return Array.isArray(value) ? (value as Meal[][]) : [];
}

export default function UserDietPage() {
  const [diets, setDiets] = useState<Diet[]>([]);
  const [selectedDiet, setSelectedDiet] = useState<Diet | null>(null);
  const [options, setOptions] = useState<Record<MealName, number>>({
    Desayuno: 0,
    Comida: 0,
    Cena: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    apiRequest<Diet[]>('/patient/me/diets')
      .then((items) => {
        setDiets(items);
        setSelectedDiet(items[0] ?? null);
      })
      .catch((requestError: unknown) => {
        setError(
          requestError instanceof Error
            ? requestError.message
            : 'No se pudo cargar tu dieta.',
        );
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex min-h-screen bg-background font-sans">
      <main className="flex-1 overflow-auto flex flex-col">
        <PageHeader
          title="Mi Plan Nutricional"
          description="Sigue tu dieta estructurada prescrita por tu nutricionista."
          icon={<i className="bi bi-calendar-check" />}
        />

        <div className="p-6 lg:p-10 max-w-7xl mx-auto w-full space-y-8">
          {error && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-2xl px-5 py-4 text-sm font-bold text-destructive">
              {error}
            </div>
          )}
          {loading && (
            <div className="bg-card border border-border rounded-2xl px-5 py-4 text-sm text-muted-foreground">
              Cargando tu dieta...
            </div>
          )}

          {!loading && diets.length > 0 && (
            <div className="flex flex-wrap items-center gap-3">
              <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                Plan activo
              </label>
              <select
                value={selectedDiet?.idDieta ?? ''}
                onChange={(event) =>
                  setSelectedDiet(
                    diets.find((diet) => diet.idDieta === event.target.value) ??
                      null,
                  )
                }
                className="bg-card border border-border rounded-xl px-4 py-2 text-sm font-bold text-foreground"
              >
                {diets.map((diet) => (
                  <option key={diet.idDieta} value={diet.idDieta}>
                    {new Date(diet.fechaInicio).toLocaleDateString('es-ES')} —{' '}
                    {new Date(diet.fechaFin).toLocaleDateString('es-ES')}
                  </option>
                ))}
              </select>
            </div>
          )}

          {!loading && !selectedDiet && (
            <div className="bg-card border border-border rounded-[2.5rem] p-10 text-center">
              <i className="bi bi-calendar-x text-4xl text-muted-foreground" />
              <p className="mt-4 text-sm font-bold text-muted-foreground">
                Todavía no tienes una dieta asignada.
              </p>
            </div>
          )}

          {selectedDiet && (
            <div className="space-y-6">
              {MEALS.map((meal) => {
                const mealOptions = getMealOptions(selectedDiet, meal);
                const optionIndex = Math.min(
                  options[meal],
                  Math.max(mealOptions.length - 1, 0),
                );
                const foods = mealOptions[optionIndex] ?? [];

                return (
                  <section
                    key={meal}
                    className="bg-card border border-border rounded-[2.5rem] p-8 shadow-sm"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                      <h2 className="text-xs font-black uppercase tracking-widest text-[#10b981] flex items-center">
                        <i className="bi bi-egg-fried mr-2" />
                        {meal}
                      </h2>
                      {mealOptions.length > 1 && (
                        <div className="flex bg-muted p-1 rounded-xl">
                          {mealOptions.map((_, index) => (
                            <button
                              key={index}
                              onClick={() =>
                                setOptions((current) => ({
                                  ...current,
                                  [meal]: index,
                                }))
                              }
                              className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all ${
                                optionIndex === index
                                  ? 'bg-[#10b981] text-white shadow-sm'
                                  : 'text-muted-foreground hover:text-foreground'
                              }`}
                            >
                              Opción {String.fromCharCode(65 + index)}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {foods.length > 0 ? (
                      <div className="p-5 bg-muted/40 border border-border rounded-2xl space-y-3">
                        {foods.map((food, index) => (
                          <div
                            key={`${food.label ?? 'food'}-${index}`}
                            className="flex flex-wrap items-center justify-between gap-2 text-sm font-bold text-foreground"
                          >
                            <span className="flex items-center gap-2">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#10b981]" />
                              {food.label ?? 'Alimento'}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {food.quantity ?? 100} g
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Esta comida no tiene alimentos registrados.
                      </p>
                    )}
                  </section>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
