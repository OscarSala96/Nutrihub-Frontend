'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '@/components/Sidebar';
import PageHeader from '@/components/Pageheader';
import { ESPANA_MOCK_FOODS, FoodResult } from '@/components/mockFoods';

// --- Interfaces ---
interface Patient {
  id: string;
  name: string;
  weight: number;
  goalKcal: number;
}

type MealType = 'Desayuno' | 'Comida' | 'Cena';

interface AllDiets {
  [patientId: string]: {
    Desayuno: FoodResult[][];
    Comida: FoodResult[][];
    Cena: FoodResult[][];
  };
}

export default function DietCreatorAdvanced() {
  // --- Estados de la Interfaz ---
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<FoodResult[]>([]);
  const [selectedMeal, setSelectedMeal] = useState<MealType>('Desayuno');
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  // --- Estados de Animación ---
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const patients: Patient[] = useMemo(() => [
    { id: '1', name: 'Óscar Sala', weight: 75, goalKcal: 2200 },
    { id: '2', name: 'María García', weight: 62, goalKcal: 1800 },
    { id: '3', name: 'Carlos Ruiz', weight: 90, goalKcal: 2800 },
    { id: '4', name: 'Juan Pérez', weight: 85, goalKcal: 1900 },
    { id: '5', name: 'Roberto Jara', weight: 70, goalKcal: 2100 },
    { id: '7', name: 'Sergio Torres', weight: 78, goalKcal: 3000 },
    { id: '8', name: 'Lucía Fernández', weight: 64, goalKcal: 1550 },
    { id: '9', name: 'Diego Delgado', weight: 92, goalKcal: 2400 },
    { id: '10', name: 'Clara Ortiz', weight: 58, goalKcal: 1750 },
    { id: '11', name: 'Javier Marín', weight: 81, goalKcal: 2900 },
    { id: '12', name: 'Patricia Silva', weight: 66, goalKcal: 1850 },
    { id: '14', name: 'Marta Vicente', weight: 55, goalKcal: 2300 },
    { id: '15', name: 'Alejandro Ramos', weight: 79, goalKcal: 2150 }
  ], []);

  const [selectedPatient, setSelectedPatient] = useState<Patient>(patients[0]);

  const [allDiets, setAllDiets] = useState<AllDiets>({
    '1': { Desayuno: [[]], Comida: [[]], Cena: [[]] },
    '2': { Desayuno: [[]], Comida: [[]], Cena: [[]] },
    '3': { Desayuno: [[]], Comida: [[]], Cena: [[]] },
  });

  const currentDiet = useMemo(() => {
    return allDiets[selectedPatient.id] || { Desayuno: [[]], Comida: [[]], Cena: [[]] };
  }, [allDiets, selectedPatient]);

  // --- Lógica del Buscador ---
  useEffect(() => {
    const cleanQuery = query.trim().toLowerCase();
    if (cleanQuery.length < 2) {
      setResults([]);
      setError(null);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const delayDebounceFn = setTimeout(() => {
      try {
        const filteredFoods = ESPANA_MOCK_FOODS.filter((food) =>
          food.label.toLowerCase().includes(cleanQuery)
        );
        setResults(filteredFoods);
        setError(null);
      } catch (err) {
        setError('Error al procesar la lista de alimentos.');
      } finally {
        setIsSearching(false);
      }
    }, 250);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  // --- Cálculos ---
  const calculateMacros = (food: FoodResult, grams: number) => {
    const factor = grams / 100;
    return {
      kcal: Math.round(food.kcal * factor),
      protein: Number((food.protein * factor).toFixed(1)),
      carbs: Number((food.carbs * factor).toFixed(1)),
      fat: Number((food.fat * factor).toFixed(1)),
    };
  };

  const targets = useMemo(() => ({
    protein: Math.round(selectedPatient.weight * 1.8),
    fat: Math.round(selectedPatient.weight * 1.0),
    kcal: selectedPatient.goalKcal
  }), [selectedPatient]);

  const totals = useMemo(() => {
    const getActiveOption = (meal: MealType) => {
        // Solo sumamos la opción que esté seleccionada visualmente o la primera por defecto
        const options = currentDiet[meal];
        const index = meal === selectedMeal ? selectedOptionIndex : 0;
        return options[index] || [];
    };

    const allFoods = [
        ...getActiveOption('Desayuno'),
        ...getActiveOption('Comida'),
        ...getActiveOption('Cena')
    ];

    return allFoods.reduce((acc, food) => {
      const macros = calculateMacros(food, food.quantity || 100);
      return {
        kcal: acc.kcal + macros.kcal,
        protein: acc.protein + macros.protein,
        fat: acc.fat + macros.fat,
        carbs: acc.carbs + macros.carbs,
      };
    }, { kcal: 0, protein: 0, fat: 0, carbs: 0 });
  }, [currentDiet, selectedMeal, selectedOptionIndex]);

  // --- Acciones ---
  const handleSaveDiet = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1800)); // Simulación API
    setIsSaving(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const addFoodToMeal = (food: FoodResult) => {
    const newFood = { ...food, quantity: 100, id: `${food.id}-${Date.now()}` };
    setAllDiets(prev => {
      const patientDiet = prev[selectedPatient.id] || { Desayuno: [[]], Comida: [[]], Cena: [[]] };
      const currentMealOptions = [...patientDiet[selectedMeal]];
      if (!currentMealOptions[selectedOptionIndex]) currentMealOptions[selectedOptionIndex] = [];
      currentMealOptions[selectedOptionIndex] = [...currentMealOptions[selectedOptionIndex], newFood];
      return { ...prev, [selectedPatient.id]: { ...patientDiet, [selectedMeal]: currentMealOptions } };
    });
    setQuery('');
  };

  const updateQuantity = (meal: MealType, foodIndex: number, grams: number) => {
    setAllDiets(prev => {
      const patientDiet = prev[selectedPatient.id];
      const currentMealOptions = [...patientDiet[meal]];
      const targetOption = [...currentMealOptions[selectedOptionIndex]];
      if (targetOption[foodIndex]) {
        targetOption[foodIndex] = { ...targetOption[foodIndex], quantity: grams };
        currentMealOptions[selectedOptionIndex] = targetOption;
      }
      return { ...prev, [selectedPatient.id]: { ...patientDiet, [meal]: currentMealOptions } };
    });
  };

  const removeFood = (meal: MealType, foodIndex: number) => {
    setAllDiets(prev => {
      const patientDiet = prev[selectedPatient.id];
      const currentMealOptions = [...patientDiet[meal]];
      currentMealOptions[selectedOptionIndex] = currentMealOptions[selectedOptionIndex].filter((_, i) => i !== foodIndex);
      return { ...prev, [selectedPatient.id]: { ...patientDiet, [meal]: currentMealOptions } };
    });
  };

  const addNewOption = () => {
    setAllDiets(prev => {
      const patientDiet = prev[selectedPatient.id] || { Desayuno: [[]], Comida: [[]], Cena: [[]] };
      const currentMealOptions = [...patientDiet[selectedMeal], []];
      setSelectedOptionIndex(currentMealOptions.length - 1);
      return { ...prev, [selectedPatient.id]: { ...patientDiet, [selectedMeal]: currentMealOptions } };
    });
  };

  const activeFoods = currentDiet[selectedMeal][selectedOptionIndex] || [];

  return (
    <div className="flex min-h-screen bg-background font-sans relative overflow-hidden">
      
      {/* ANIMACIÓN DE ÉXITO */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.8, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.8, opacity: 0 }}
              className="bg-card border border-border p-10 rounded-[3rem] shadow-2xl flex flex-col items-center space-y-4"
            >
              <div className="w-20 h-20 bg-[#10b981]/10 rounded-full flex items-center justify-center">
                <i className="bi bi-check-lg text-4xl text-[#10b981]"></i>
              </div>
              <h2 className="text-xl font-black uppercase tracking-tighter text-foreground">Dieta Actualizada</h2>
              <p className="text-muted-foreground text-xs font-bold">Los cambios para {selectedPatient.name} se han guardado.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      <main className="flex-1 overflow-auto flex flex-col">
        <PageHeader title="Planificador de Dietas" description={`Editando dieta para ${selectedPatient.name}`} icon={<i className="bi bi-egg-fried" />} />

        <div className="p-6 lg:p-10 max-w-[1600px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* PANEL IZQUIERDO: METRICAS */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card border border-border rounded-[2.5rem] p-8 shadow-sm">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3 block px-1">Paciente</label>
              <select 
                value={selectedPatient.id}
                onChange={(e) => {
                  const found = patients.find(p => p.id === e.target.value);
                  if (found) { setSelectedPatient(found); setSelectedOptionIndex(0); }
                }}
                className="w-full bg-muted/50 border border-border rounded-2xl px-5 py-4 font-bold outline-none text-foreground"
              >
                {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>

            <div className="bg-card border border-border rounded-[2.5rem] p-8 shadow-sm">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-6 text-[#10b981]">Balance Diario Estimado</h3>
              <div className="space-y-6">
                {[
                  { label: 'Proteína', val: totals.protein, target: targets.protein, color: 'bg-[#10b981]' },
                  { label: 'Grasas', val: totals.fat, target: targets.fat, color: 'bg-amber-500' },
                  { label: 'Carbohidratos', val: totals.carbs, target: 250, color: 'bg-blue-500' }
                ].map((macro) => (
                  <div key={macro.label} className="space-y-2">
                    <div className="flex justify-between items-end">
                      <span className="text-xs font-bold uppercase text-foreground">{macro.label}</span>
                      <span className="text-sm font-black text-foreground">{macro.val.toFixed(1)}g <span className="text-[10px] text-muted-foreground">/ {macro.target}g</span></span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }} animate={{ width: `${Math.min((macro.val / macro.target) * 100, 100)}%` }}
                        className={`h-full ${macro.color}`} 
                      />
                    </div>
                  </div>
                ))}
                <div className="pt-4 border-t border-border flex justify-between items-center text-foreground">
                  <span className="text-[10px] font-bold uppercase text-muted-foreground">Kcal Totales</span>
                  <span className="text-2xl font-black">{totals.kcal} <span className="text-xs text-muted-foreground">/ {targets.kcal}</span></span>
                </div>
              </div>
            </div>
          </div>

          {/* PANEL DERECHO: CONSTRUCTOR */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-card border border-border rounded-[2.5rem] p-8 shadow-sm min-h-[750px] flex flex-col">
              
              {/* Buscador */}
              <div className="mb-8 relative">
                <div className="flex items-center gap-3 bg-muted rounded-2xl px-5 py-4 border border-transparent focus-within:border-[#10b981] transition-all">
                  <i className={`bi ${isSearching ? 'bi-arrow-repeat animate-spin' : 'bi-search'} text-[#10b981]`}></i>
                  <input 
                    type="text" value={query} onChange={(e) => setQuery(e.target.value)}
                    placeholder={`Buscar alimento para ${selectedMeal}...`}
                    className="bg-transparent border-none text-sm font-bold focus:outline-none w-full text-foreground"
                  />
                </div>

                <AnimatePresence>
                  {results.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-2xl shadow-2xl z-50 max-h-64 overflow-y-auto divide-y divide-border"
                    >
                      {results.map(food => (
                        <button key={food.id} onClick={() => addFoodToMeal(food)} className="w-full flex items-center justify-between p-4 hover:bg-muted/60 transition-colors">
                          <span className="text-sm font-bold text-foreground">{food.label} <span className="text-[10px] text-muted-foreground">({food.kcal} kcal)</span></span>
                          <i className="bi bi-plus-circle-fill text-[#10b981]"></i>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* TABS Comidas */}
              <div className="flex gap-2 mb-6 border-b border-border pb-4">
                {(['Desayuno', 'Comida', 'Cena'] as MealType[]).map(meal => (
                  <button 
                    key={meal} onClick={() => { setSelectedMeal(meal); setSelectedOptionIndex(0); }}
                    className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedMeal === meal ? 'bg-foreground text-background scale-105' : 'bg-muted text-muted-foreground'}`}
                  >
                    {meal}
                  </button>
                ))}
              </div>

              {/* TABS Alternativas */}
              <div className="flex flex-wrap items-center gap-2 mb-6 bg-muted/40 p-2 rounded-2xl border border-border">
                {currentDiet[selectedMeal].map((_, index) => (
                  <button
                    key={index} onClick={() => setSelectedOptionIndex(index)}
                    className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${selectedOptionIndex === index ? 'bg-[#10b981] text-white' : 'bg-card text-foreground'}`}
                  >
                    Opción {String.fromCharCode(65 + index)}
                  </button>
                ))}
                <button onClick={addNewOption} className="px-4 py-2 rounded-xl text-xs font-bold border border-dashed border-border text-[#10b981] hover:bg-[#10b981]/5 ml-auto">
                  + Añadir Alternativa
                </button>
              </div>

              {/* Lista de Alimentos */}
              <div className="flex-1 space-y-3">
                {activeFoods.map((food, i) => {
                  const itemMacros = calculateMacros(food, food.quantity || 100);
                  return (
                    <motion.div 
                      layout initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                      key={food.id} className="flex items-center gap-4 p-5 bg-background border border-border rounded-3xl"
                    >
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="text-sm font-black uppercase text-foreground">{food.label}</h4>
                          <span className="text-xs font-black text-[#10b981]">{itemMacros.kcal} Kcal</span>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-2 bg-muted/60 px-3 py-1.5 rounded-xl border border-border">
                            <input 
                              type="number" value={food.quantity} 
                              onChange={(e) => updateQuantity(selectedMeal, i, Number(e.target.value))}
                              className="w-12 bg-transparent text-xs font-black focus:outline-none text-center text-foreground"
                            />
                            <span className="text-[10px] font-bold text-muted-foreground">g</span>
                          </div>
                          <div className="flex gap-3 text-[10px] font-bold text-muted-foreground uppercase">
                            <span>P: {itemMacros.protein}g</span>
                            <span>C: {itemMacros.carbs}g</span>
                            <span>G: {itemMacros.fat}g</span>
                          </div>
                        </div>
                      </div>
                      <button onClick={() => removeFood(selectedMeal, i)} className="p-2 text-muted-foreground hover:text-rose-500 transition-colors">
                        <i className="bi bi-trash"></i>
                      </button>
                    </motion.div>
                  );
                })}
              </div>

              {/* Footer Acciones */}
              <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row gap-4 items-center justify-between">
                 <div className="text-foreground">
                    <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Resumen Opción {String.fromCharCode(65 + selectedOptionIndex)}</p>
                    <div className="flex gap-4 text-xs font-bold">
                       <span>P: {activeFoods.reduce((a, b) => a + calculateMacros(b, b.quantity || 100).protein, 0).toFixed(1)}g</span>
                       <span className="text-[#10b981]">Kcal: {activeFoods.reduce((a, b) => a + calculateMacros(b, b.quantity || 100).kcal, 0)}</span>
                    </div>
                 </div>
                 
                 <button 
                  disabled={isSaving} onClick={handleSaveDiet}
                  className={`relative overflow-hidden px-12 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all min-w-[220px] ${
                    isSaving ? 'bg-muted text-muted-foreground' : 'bg-[#10b981] text-white hover:scale-105 shadow-lg'
                  }`}
                 >
                   {isSaving ? (
                     <span className="flex items-center justify-center gap-2">
                       <motion.i animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="bi bi-arrow-repeat"></motion.i>
                       Guardando...
                     </span>
                   ) : "Guardar Plan"}
                 </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}