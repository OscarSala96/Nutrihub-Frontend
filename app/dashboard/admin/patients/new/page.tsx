'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import PageHeader from '@/components/Pageheader';

const OBJECTIVES = [
  { value: 'Pérdida de Grasa',         icon: '🔥', desc: 'Reducción de masa grasa manteniendo músculo' },
  { value: 'Ganancia de Masa Muscular', icon: '💪', desc: 'Hipertrofia y aumento de masa magra' },
  { value: 'Recomposición Corporal',    icon: '⚡', desc: 'Perder grasa y ganar músculo simultáneamente' },
  { value: 'Rendimiento Deportivo',     icon: '🏅', desc: 'Optimización para deporte de competición' },
  { value: 'Salud y Bienestar',         icon: '🌱', desc: 'Hábitos saludables y bienestar general' },
];

const PLAN_TYPES = [
  { value: 'Premium',     price: '89€/mes', features: ['Plan personalizado', 'Revisiones semanales', 'Chat ilimitado', 'Análisis biométrico'] },
  { value: 'Estándar',    price: '59€/mes', features: ['Plan personalizado', 'Revisiones quincenales', 'Chat con límite'] },
  { value: 'Seguimiento', price: '29€/mes', features: ['Plan base', 'Revisión mensual', 'Seguimiento básico'] },
];

const ACTIVITY_LEVELS = [
  { value: 'Sedentario',        desc: 'Trabajo de oficina, sin ejercicio' },
  { value: 'Ligero',            desc: '1–2 días de ejercicio/semana' },
  { value: 'Moderado',          desc: '3–4 días de ejercicio/semana' },
  { value: 'Activo',            desc: '5–6 días de ejercicio/semana' },
  { value: 'Muy activo',        desc: 'Ejercicio diario o trabajo físico' },
];

const STEPS = ['Datos Personales', 'Métricas Iniciales', 'Objetivo y Plan', 'Confirmación'];

export default function NewPatientPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    // Paso 1
    name: '', email: '', phone: '', age: '', gender: '',
    // Paso 2
    weight: '', height: '', waist: '', chest: '', hip: '', arm: '', thigh: '', activity: '',
    // Paso 3
    objective: '', planType: '', notes: '',
  });

  const set = (key: string, val: string) => setForm(f => ({ ...f, [key]: val }));

  const imc = form.weight && form.height
    ? (parseFloat(form.weight) / Math.pow(parseFloat(form.height) / 100, 2)).toFixed(1)
    : null;

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => router.push('/dashboard/admin/patients'), 2000);
  };

  const canNext = () => {
    if (step === 0) return form.name && form.age && form.gender;
    if (step === 1) return form.weight && form.height && form.activity;
    if (step === 2) return form.objective;
    return true;
  };

  return (
    <div className="flex min-h-screen bg-background font-sans">

      <main className="flex-1 overflow-auto flex flex-col">
        <PageHeader
          title="Nuevo Paciente"
          description="Registra los datos iniciales para crear el perfil clínico."
          icon={<i className="bi bi-person-plus-fill" />}
          backUrl='/dashboard/admin/patients'
        />

        <div className="p-6 lg:p-10 max-w-5xl mx-auto w-full space-y-6">

          {/* Steps */}
          <div className="flex items-center gap-0">
            {STEPS.map((s, i) => (
              <div key={i} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center gap-1.5">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                    i < step ? 'bg-[#10b981] text-white'
                    : i === step ? 'bg-[#10b981] text-white ring-4 ring-[#10b981]/20'
                    : 'bg-muted border-2 border-border text-muted-foreground'
                  }`}>
                    {i < step ? <i className="bi bi-check text-sm"></i> : i + 1}
                  </div>
                  <span className={`text-[9px] font-black uppercase tracking-wider hidden sm:block ${i === step ? 'text-[#10b981]' : 'text-muted-foreground'}`}>{s}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 mb-4 rounded-full transition-all ${i < step ? 'bg-[#10b981]' : 'bg-border'}`} />
                )}
              </div>
            ))}
          </div>

          {/* Card principal */}
          <div className="bg-card border border-border rounded-[2.5rem] p-8 space-y-6">

            {/* ── PASO 1: Datos Personales ── */}
            {step === 0 && (
              <>
                <div>
                  <h2 className="text-lg font-black text-foreground flex items-center gap-2">
                    <i className="bi bi-person-vcard text-[#10b981]"></i>
                    Datos Personales
                  </h2>
                  <p className="text-xs text-muted-foreground mt-1">Información de contacto e identificación del paciente</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { key: 'name',  label: 'Nombre Completo', placeholder: 'Ej. Juan Pérez',         type: 'text',   col: 2 },
                    { key: 'age',   label: 'Edad',            placeholder: 'Ej. 30',                  type: 'number', col: 1 },
                  ].map(f => (
                    <div key={f.key} className={`space-y-2 ${f.col === 2 ? 'sm:col-span-2' : ''}`}>
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{f.label}</label>
                      <input
                        type={f.type}
                        placeholder={f.placeholder}
                        value={(form as any)[f.key]}
                        onChange={e => set(f.key, e.target.value)}
                        className="w-full bg-muted/50 border border-border rounded-2xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#10b981]/30 focus:border-[#10b981] transition-all font-medium text-foreground"
                      />
                    </div>
                  ))}

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Sexo Biológico</label>
                    <div className="flex gap-3">
                      {['Hombre', 'Mujer'].map(g => (
                        <button key={g} onClick={() => set('gender', g)}
                          className={`flex-1 py-3.5 rounded-2xl text-xs font-black uppercase tracking-wider border-2 transition-all ${
                            form.gender === g ? 'border-[#10b981] bg-[#10b981]/10 text-[#10b981]' : 'border-border bg-muted/50 text-muted-foreground hover:border-[#10b981]/40'
                          }`}>
                          {g === 'Hombre' ? '♂ ' : '♀ '}{g}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* ── PASO 2: Métricas Iniciales ── */}
            {step === 1 && (
              <>
                <div>
                  <h2 className="text-lg font-black text-foreground flex items-center gap-2">
                    <i className="bi bi-rulers text-[#10b981]"></i>
                    Métricas Corporales Iniciales
                  </h2>
                  <p className="text-xs text-muted-foreground mt-1">Estas medidas serán el punto de partida para calcular la evolución del paciente</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { key: 'weight', label: 'Peso',    unit: 'kg', placeholder: '75.0', icon: 'bi-speedometer2',     color: '#10b981' },
                    { key: 'height', label: 'Altura',  unit: 'cm', placeholder: '175',  icon: 'bi-arrow-up',         color: '#3b82f6' },
                    { key: 'waist',  label: 'Cintura', unit: 'cm', placeholder: '82',   icon: 'bi-rulers',           color: '#f59e0b' },
                    { key: 'chest',  label: 'Pecho',   unit: 'cm', placeholder: '96',   icon: 'bi-heart',            color: '#ef4444' },
                    { key: 'hip',    label: 'Cadera',  unit: 'cm', placeholder: '95',   icon: 'bi-arrow-left-right', color: '#a855f7' },
                    { key: 'arm',    label: 'Brazo',   unit: 'cm', placeholder: '32',   icon: 'bi-lightning-charge', color: '#06b6d4' },
                  ].map(m => (
                    <div key={m.key} className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                        <i className={`bi ${m.icon}`} style={{ color: m.color }}></i>
                        {m.label} <span className="opacity-50">({m.unit})</span>
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          step="0.1"
                          placeholder={m.placeholder}
                          value={(form as any)[m.key]}
                          onChange={e => set(m.key, e.target.value)}
                          className="w-full bg-muted/50 border border-border rounded-2xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#10b981]/30 focus:border-[#10b981] transition-all font-black text-foreground pr-12"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-muted-foreground">{m.unit}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* IMC calculado */}
                {imc && (
                  <div className="bg-muted/50 border border-border rounded-2xl px-5 py-4 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">IMC Calculado</p>
                      <p className="text-2xl font-black text-foreground">{imc}</p>
                    </div>
                    <span className={`text-xs font-black px-3 py-1.5 rounded-full ${
                      parseFloat(imc) < 18.5 ? 'bg-blue-500/10 text-blue-500' :
                      parseFloat(imc) < 25   ? 'bg-[#10b981]/10 text-[#10b981]' :
                      parseFloat(imc) < 30   ? 'bg-amber-500/10 text-amber-500' :
                                               'bg-rose-500/10 text-rose-500'
                    }`}>
                      {parseFloat(imc) < 18.5 ? 'Bajo peso' : parseFloat(imc) < 25 ? 'Normopeso' : parseFloat(imc) < 30 ? 'Sobrepeso' : 'Obesidad'}
                    </span>
                  </div>
                )}

                {/* Nivel de actividad */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Nivel de Actividad Física</label>
                  <div className="space-y-2">
                    {ACTIVITY_LEVELS.map(a => (
                      <button key={a.value} onClick={() => set('activity', a.value)}
                        className={`w-full flex items-center justify-between px-5 py-3.5 rounded-2xl border-2 text-left transition-all ${
                          form.activity === a.value ? 'border-[#10b981] bg-[#10b981]/10' : 'border-border bg-muted/30 hover:border-[#10b981]/30'
                        }`}>
                        <span className={`text-sm font-black ${form.activity === a.value ? 'text-[#10b981]' : 'text-foreground'}`}>{a.value}</span>
                        <span className="text-xs text-muted-foreground">{a.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* ── PASO 3: Objetivo y Plan ── */}
            {step === 2 && (
              <>
                <div>
                  <h2 className="text-lg font-black text-foreground flex items-center gap-2">
                    <i className="bi bi-bullseye text-[#10b981]"></i>
                    Objetivo y Tipo de Plan
                  </h2>
                  <p className="text-xs text-muted-foreground mt-1">Define el objetivo terapéutico y el plan de seguimiento</p>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Objetivo Terapéutico</label>
                  <div className="space-y-2">
                    {OBJECTIVES.map(o => (
                      <button key={o.value} onClick={() => set('objective', o.value)}
                        className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl border-2 text-left transition-all ${
                          form.objective === o.value ? 'border-[#10b981] bg-[#10b981]/10' : 'border-border bg-muted/30 hover:border-[#10b981]/30'
                        }`}>
                        <span className="text-2xl">{o.icon}</span>
                        <div>
                          <p className={`text-sm font-black ${form.objective === o.value ? 'text-[#10b981]' : 'text-foreground'}`}>{o.value}</p>
                          <p className="text-xs text-muted-foreground">{o.desc}</p>
                        </div>
                        {form.objective === o.value && <i className="bi bi-check-circle-fill text-[#10b981] ml-auto"></i>}
                      </button>
                    ))}
                  </div>
                </div>

           

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Notas Clínicas Iniciales</label>
                  <textarea
                    placeholder="Alergias, patologías, medicación, restricciones dietéticas, historial relevante..."
                    rows={3}
                    value={form.notes}
                    onChange={e => set('notes', e.target.value)}
                    className="w-full bg-muted/50 border border-border rounded-2xl px-5 py-4 focus:ring-2 focus:ring-[#10b981]/30 focus:border-[#10b981] outline-none transition-all text-sm resize-none text-foreground"
                  />
                </div>
              </>
            )}

            {/* ── PASO 4: Confirmación ── */}
            {step === 3 && (
              <>
                <div>
                  <h2 className="text-lg font-black text-foreground flex items-center gap-2">
                    <i className="bi bi-clipboard-check text-[#10b981]"></i>
                    Resumen del Paciente
                  </h2>
                  <p className="text-xs text-muted-foreground mt-1">Revisa los datos antes de crear el perfil clínico</p>
                </div>

                <div className="space-y-4">
                  {[
                    { title: 'Datos Personales', items: [
                      { label: 'Nombre',   value: form.name },
                      { label: 'Edad',     value: form.age ? `${form.age} años` : '—' },
                      { label: 'Sexo',     value: form.gender || '—' },
                    ]},
                    { title: 'Métricas Iniciales', items: [
                      { label: 'Peso',     value: form.weight ? `${form.weight} kg` : '—' },
                      { label: 'Altura',   value: form.height ? `${form.height} cm` : '—' },
                      { label: 'IMC',      value: imc || '—' },
                      { label: 'Cintura',  value: form.waist ? `${form.waist} cm` : '—' },
                      { label: 'Actividad',value: form.activity || '—' },
                    ]},
                    { title: 'Plan', items: [
                      { label: 'Objetivo', value: form.objective || '—' },
                      { label: 'Notas',    value: form.notes || '—' },]},
                  ].map((section, i) => (
                    <div key={i} className="bg-muted/40 rounded-2xl p-5 space-y-3">
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{section.title}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {section.items.map((item, j) => (
                          <div key={j}>
                            <p className="text-[10px] text-muted-foreground">{item.label}</p>
                            <p className="text-sm font-black text-foreground">{item.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {submitted && (
                  <div className="bg-[#10b981]/10 border border-[#10b981]/30 rounded-2xl px-5 py-4 flex items-center gap-3 animate-in slide-in-from-bottom-2 duration-300">
                    <i className="bi bi-check-circle-fill text-[#10b981] text-xl"></i>
                    <div>
                      <p className="text-sm font-black text-foreground">¡Paciente creado correctamente!</p>
                      <p className="text-xs text-muted-foreground">Redirigiendo a la lista de pacientes...</p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Navegación */}
          <div className="flex gap-3">
            {step > 0 && (
              <button onClick={() => setStep(s => s - 1)}
                className="px-8 py-4 bg-muted border border-border text-foreground rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-muted/80 transition-all">
                ← Atrás
              </button>
            )}
            {step < STEPS.length - 1 ? (
              <button
                onClick={() => canNext() && setStep(s => s + 1)}
                disabled={!canNext()}
                className={`flex-1 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                  canNext()
                    ? 'bg-[#10b981] hover:bg-[#059669] text-white shadow-xl shadow-[#10b981]/20 active:scale-[0.98]'
                    : 'bg-muted text-muted-foreground cursor-not-allowed'
                }`}>
                Continuar →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={submitted}
                className="flex-1 py-4 bg-[#10b981] hover:bg-[#059669] text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-[#10b981]/20 active:scale-[0.98] flex items-center justify-center gap-2">
                <i className="bi bi-person-check-fill"></i>
                Crear Perfil Clínico
              </button>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}