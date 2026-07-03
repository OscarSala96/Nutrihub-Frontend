'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import PageHeader from '@/components/Pageheader';

const HISTORY = [
  { date: 'Hace 1 mes',     label: 'Semana 1', weight: 78.2, waist: 88, chest: 98, hip: 97, photos: { front: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&auto=format&fit=crop', left: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=400&auto=format&fit=crop', right: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=400&auto=format&fit=crop' } },
  { date: 'Hace 2 semanas', label: 'Semana 3', weight: 76.5, waist: 85, chest: 96, hip: 95, photos: { front: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=400&auto=format&fit=crop', left: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=400&auto=format&fit=crop', right: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&auto=format&fit=crop' } },
  { date: 'Semana pasada',  label: 'Semana 5', weight: 75.4, waist: 82, chest: 94, hip: 93, photos: { front: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=400&auto=format&fit=crop', left: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&auto=format&fit=crop', right: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=400&auto=format&fit=crop' } },
];

// Solo medidas que el paciente puede tomar con cinta métrica
const METRICS = [
  { key: 'weight', label: 'Peso',          unit: 'kg', icon: 'bi-speedometer2',    placeholder: '75.0', step: '0.1', color: '#10b981' },
  { key: 'waist',  label: 'Cintura',       unit: 'cm', icon: 'bi-rulers',          placeholder: '82',   step: '0.5', color: '#3b82f6' },
  { key: 'chest',  label: 'Pecho',         unit: 'cm', icon: 'bi-heart',           placeholder: '96',   step: '0.5', color: '#f59e0b' },
  { key: 'hip',    label: 'Cadera',        unit: 'cm', icon: 'bi-arrow-left-right',placeholder: '95',   step: '0.5', color: '#a855f7' },
  { key: 'arm',    label: 'Brazo',         unit: 'cm', icon: 'bi-lightning-charge', placeholder: '32',  step: '0.5', color: '#ef4444' },
  { key: 'thigh',  label: 'Muslo',         unit: 'cm', icon: 'bi-arrow-down',      placeholder: '56',   step: '0.5', color: '#06b6d4' },
];

const ENERGY = [
  { label: 'Energía General',   key: 'energy',  icons: ['😴', '😐', '😊', '⚡', '🔥'] },
  { label: 'Calidad del Sueño', key: 'sleep',   icons: ['😩', '😪', '😴', '🌙', '✨'] },
  { label: 'Hambre / Saciedad', key: 'hunger',  icons: ['🍽️', '😤', '😌', '✅', '💪'] },
];

const ANGLES = [
  { key: 'front', label: 'Frontal',    icon: 'bi-person-fill' },
  { key: 'left',  label: 'Lado Izq.',  icon: 'bi-person-walking' },
  { key: 'right', label: 'Lado Der.',  icon: 'bi-person-walking' },
] as const;

type AngleKey = 'front' | 'left' | 'right';

export default function ProgressPage() {
  const [activeTab, setActiveTab]   = useState<'mediciones' | 'bienestar'>('mediciones');
  const [ratings, setRatings]       = useState<Record<string, number>>({});
  const [values, setValues]         = useState<Record<string, string>>({});
  const [notes, setNotes]           = useState('');
  const [submitted, setSubmitted]   = useState(false);
  const [selectedHistory, setSelectedHistory] = useState<number | null>(null);
  const [selectedAngle, setSelectedAngle]     = useState<AngleKey>('front');
  const [photos, setPhotos]         = useState<Record<AngleKey, string | null>>({ front: null, left: null, right: null });
  const [dragOver, setDragOver]     = useState<AngleKey | null>(null);

  const handleFile = (angle: AngleKey, file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => setPhotos(p => ({ ...p, [angle]: reader.result as string }));
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const lastWeight  = HISTORY[HISTORY.length - 1].weight;
  const firstWeight = HISTORY[0].weight;
  const currentWeight = parseFloat(values['weight'] || '0');
  const delta = currentWeight ? (currentWeight - lastWeight).toFixed(1) : null;

  const uploadedCount = Object.values(photos).filter(Boolean).length;

  return (
    <div className="flex min-h-screen bg-background font-sans">

      <main className="flex-1 overflow-auto flex flex-col">
        <PageHeader
          title="Registrar Progreso"
          description="Sube tus datos semanales para que tu nutricionista pueda ajustar tu plan."
          icon={<i className="bi bi-graph-up-arrow" />}
        />

        <div className="p-6 lg:p-10 max-w-[1400px] mx-auto w-full space-y-6">

          {/* Banner éxito */}
          {submitted && (
            <div className="bg-[#10b981] text-white rounded-2xl px-6 py-4 flex items-center gap-3 shadow-lg animate-in slide-in-from-top-2 duration-300">
              <i className="bi bi-check-circle-fill text-xl"></i>
              <div>
                <p className="font-black text-sm">¡Registro enviado correctamente!</p>
                <p className="text-xs text-white/80">Tu nutricionista recibirá una notificación.</p>
              </div>
            </div>
          )}

          
          {/* Grid principal */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

            {/* ── Formulario 3/5 ── */}
            <div className="lg:col-span-3 space-y-5">

              {/* Tabs */}
              <div className="flex gap-2 p-1.5 bg-muted rounded-2xl w-fit">
                {(['mediciones', 'bienestar'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${
                      activeTab === tab
                        ? 'bg-card shadow-sm text-foreground border border-border'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {tab === 'mediciones' ? '📏 Mediciones' : '🧠 Bienestar'}
                  </button>
                ))}
              </div>

              {/* Tab Mediciones */}
              {activeTab === 'mediciones' && (
                <div className="bg-card border border-border rounded-[2.5rem] p-8 space-y-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-black text-foreground flex items-center gap-2">
                        <i className="bi bi-rulers text-[#10b981]"></i>
                        Mediciones con Cinta
                      </h2>
                      <p className="text-[11px] text-muted-foreground mt-0.5">Todas las medidas se toman con cinta métrica en reposo</p>
                    </div>
                    {delta && (
                      <span className={`text-xs font-black px-3 py-1.5 rounded-full shrink-0 ${
                        parseFloat(delta) < 0 ? 'bg-[#10b981]/10 text-[#10b981]' : 'bg-rose-500/10 text-rose-500'
                      }`}>
                        {parseFloat(delta) < 0 ? '↓' : '↑'} {Math.abs(parseFloat(delta))} kg
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {METRICS.map(m => (
                      <div key={m.key} className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                          <i className={`bi ${m.icon}`} style={{ color: m.color }}></i>
                          {m.label} <span className="opacity-50">({m.unit})</span>
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            step={m.step}
                            placeholder={m.placeholder}
                            value={values[m.key] || ''}
                            onChange={e => setValues(v => ({ ...v, [m.key]: e.target.value }))}
                            className="w-full bg-muted/50 border border-border rounded-2xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#10b981]/30 focus:border-[#10b981] transition-all font-black text-foreground pr-12"
                          />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-muted-foreground">{m.unit}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Instrucciones cinta */}
                  <div className="bg-muted/50 rounded-2xl p-4 space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Cómo medirte correctamente</p>
                    {[
                      { zone: 'Cintura', tip: 'A la altura del ombligo, exhalando suavemente.' },
                      { zone: 'Pecho',   tip: 'En la parte más ancha, paralelo al suelo.' },
                      { zone: 'Cadera',  tip: 'En la parte más prominente de los glúteos.' },
                      { zone: 'Brazo',   tip: 'En el punto medio del bíceps, relajado.' },
                      { zone: 'Muslo',   tip: 'En el tercio superior, de pie y relajado.' },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-2 text-[11px]">
                        <span className="font-black text-foreground shrink-0 w-14">{item.zone}:</span>
                        <span className="text-muted-foreground">{item.tip}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                      <i className="bi bi-chat-text text-[#10b981]"></i>
                      Notas para tu Nutricionista
                    </label>
                    <textarea
                      placeholder="¿Cómo te has sentido esta semana? ¿Alguna dificultad con el plan? ¿Cambios en tu rutina?..."
                      rows={3}
                      value={notes}
                      onChange={e => setNotes(e.target.value.slice(0, 500))}
                      className="w-full bg-muted/50 border border-border rounded-2xl px-5 py-4 focus:ring-2 focus:ring-[#10b981]/30 focus:border-[#10b981] outline-none transition-all text-sm resize-none text-foreground"
                    />
                    <p className="text-[10px] text-muted-foreground text-right">{notes.length}/500</p>
                  </div>
                </div>
              )}

              {/* Tab Bienestar */}
              {activeTab === 'bienestar' && (
                <div className="bg-card border border-border rounded-[2.5rem] p-8 space-y-7">
                  <div>
                    <h2 className="text-lg font-black text-foreground flex items-center gap-2">
                      <i className="bi bi-heart-pulse text-[#10b981]"></i>
                      Bienestar Subjetivo
                    </h2>
                    <p className="text-xs text-muted-foreground mt-1">Ayuda a tu nutricionista a ajustar el plan según tu estado real.</p>
                  </div>

                  {ENERGY.map(row => (
                    <div key={row.key} className="space-y-3">
                      <label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">{row.label}</label>
                      <div className="flex gap-2">
                        {row.icons.map((icon, i) => (
                          <button
                            key={i}
                            onClick={() => setRatings(r => ({ ...r, [row.key]: i + 1 }))}
                            className={`flex-1 aspect-square rounded-2xl text-xl flex items-center justify-center transition-all border-2 ${
                              ratings[row.key] === i + 1
                                ? 'border-[#10b981] bg-[#10b981]/10 scale-110 shadow-lg'
                                : 'border-border bg-muted/50 hover:border-[#10b981]/40 hover:scale-105'
                            }`}
                          >
                            {icon}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}

                  <div className="space-y-3">
                    <label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">Adherencia al Plan Alimentario</label>
                    <div className="grid grid-cols-4 gap-2">
                      {['<50%', '50–75%', '75–90%', '+90%'].map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => setRatings(r => ({ ...r, adherence: i }))}
                          className={`py-3 rounded-2xl text-[11px] font-black transition-all border-2 ${
                            ratings['adherence'] === i
                              ? 'border-[#10b981] bg-[#10b981]/10 text-[#10b981]'
                              : 'border-border bg-muted/50 text-muted-foreground hover:border-[#10b981]/40'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Consejo + botón */}
              <div className="bg-[#10b981]/8 border border-[#10b981]/20 rounded-[2rem] p-5 flex gap-4 items-start">
                <div className="w-8 h-8 rounded-xl bg-[#10b981]/20 flex items-center justify-center shrink-0">
                  <i className="bi bi-info-circle-fill text-[#10b981] text-sm"></i>
                </div>
                <p className="text-xs text-foreground/70 font-medium leading-relaxed">
                  <strong className="text-foreground">Consejo:</strong> Pésate y mídete siempre a la misma hora — preferiblemente en ayunas — para obtener datos comparables semana a semana.
                </p>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-[#10b981] hover:bg-[#059669] text-white font-black rounded-2xl py-5 transition-all shadow-xl shadow-[#10b981]/20 active:scale-[0.98] uppercase tracking-widest text-xs flex items-center justify-center gap-2"
              >
                <i className="bi bi-send-fill"></i>
                Enviar registro semanal
              </button>
            </div>

            {/* ── Fotos 2/5 ── */}
            <div className="lg:col-span-2">
              <div className="bg-card border border-border rounded-[2.5rem] p-8 flex flex-col gap-5 h-full">
                <div>
                  <h2 className="text-lg font-black text-foreground flex items-center gap-2">
                    <i className="bi bi-camera text-[#10b981]"></i>
                    Fotos del Progreso
                  </h2>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1.5">
                    <i className="bi bi-lock-fill text-[#10b981] text-[10px]"></i>
                    Privadas · Solo tú y tu nutricionista
                  </p>
                </div>

                {/* Selector de ángulo */}
                <div className="flex gap-2 p-1 bg-muted rounded-2xl">
                  {ANGLES.map(a => (
                    <button
                      key={a.key}
                      onClick={() => setSelectedAngle(a.key)}
                      className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                        selectedAngle === a.key
                          ? 'bg-card shadow-sm text-foreground border border-border'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <i className={`bi ${a.icon} text-xs ${a.key === 'right' ? 'scale-x-[-1]' : ''}`}></i>
                      {a.label}
                      {photos[a.key] && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] ml-0.5"></span>
                      )}
                    </button>
                  ))}
                </div>

                {/* Dropzone */}
                <div
                  className={`border-2 border-dashed rounded-[2rem] flex flex-col items-center justify-center relative overflow-hidden cursor-pointer transition-all ${
                    dragOver === selectedAngle
                      ? 'border-[#10b981] bg-[#10b981]/5'
                      : photos[selectedAngle]
                      ? 'border-[#10b981]/40'
                      : 'border-border bg-muted/20 hover:border-[#10b981]/50 hover:bg-[#10b981]/3'
                  }`}
                  style={{ minHeight: '220px' }}
                  onDragOver={e => { e.preventDefault(); setDragOver(selectedAngle); }}
                  onDragLeave={() => setDragOver(null)}
                  onDrop={e => {
                    e.preventDefault();
                    setDragOver(null);
                    const file = e.dataTransfer.files?.[0];
                    if (file) handleFile(selectedAngle, file);
                  }}
                >
                  {photos[selectedAngle] ? (
                    <div className="absolute inset-0 w-full h-full p-2">
                      <img src={photos[selectedAngle]!} alt={selectedAngle} className="w-full h-full object-cover rounded-[1.8rem]" />
                      <button
                        onClick={e => { e.stopPropagation(); setPhotos(p => ({ ...p, [selectedAngle]: null })); }}
                        className="absolute top-4 right-4 w-9 h-9 bg-rose-500 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all"
                      >
                        <i className="bi bi-trash text-sm"></i>
                      </button>
                      <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full">
                        {ANGLES.find(a => a.key === selectedAngle)?.label}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center p-8 text-center">
                      <div className="w-14 h-14 bg-card rounded-2xl shadow-sm border border-border flex items-center justify-center mb-3 text-muted-foreground">
                        <i className="bi bi-cloud-arrow-up text-2xl"></i>
                      </div>
                      <p className="text-sm font-black text-foreground">
                        {ANGLES.find(a => a.key === selectedAngle)?.label}
                      </p>
                      <p className="text-[10px] text-muted-foreground uppercase font-black tracking-tighter mt-1">Arrastra o haz click</p>
                      <p className="text-[10px] text-muted-foreground/50 mt-2">JPG, PNG · Máx. 10 MB</p>
                    </div>
                  )}
                  {!photos[selectedAngle] && (
                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => { const f = e.target.files?.[0]; if(f) handleFile(selectedAngle, f); }} accept="image/*" />
                  )}
                </div>

                {/* Miniaturas de los 3 ángulos */}
                <div className="grid grid-cols-3 gap-2">
                  {ANGLES.map(a => (
                    <button
                      key={a.key}
                      onClick={() => setSelectedAngle(a.key)}
                      className={`aspect-square rounded-2xl border-2 overflow-hidden relative transition-all ${
                        selectedAngle === a.key ? 'border-[#10b981]' : 'border-border hover:border-[#10b981]/40'
                      }`}
                    >
                      {photos[a.key] ? (
                        <img src={photos[a.key]!} className="w-full h-full object-cover" alt={a.label} />
                      ) : (
                        <div className="w-full h-full bg-muted flex flex-col items-center justify-center gap-1">
                          <i className={`bi ${a.icon} text-muted-foreground/40 text-base ${a.key === 'right' ? 'scale-x-[-1]' : ''}`}></i>
                          <span className="text-[9px] font-black text-muted-foreground/40 uppercase">{a.label}</span>
                        </div>
                      )}
                      {photos[a.key] && (
                        <div className="absolute bottom-1 inset-x-1 bg-black/60 backdrop-blur-sm rounded-lg py-0.5">
                          <p className="text-[8px] font-black text-white text-center uppercase">{a.label}</p>
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                {/* Progreso de subida */}
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{uploadedCount}/3 fotos subidas</p>
                  <div className="flex gap-1.5">
                    {ANGLES.map(a => (
                      <div key={a.key} className={`w-6 h-1.5 rounded-full transition-all ${photos[a.key] ? 'bg-[#10b981]' : 'bg-border'}`} />
                    ))}
                  </div>
                </div>

                {/* Tips */}
                <div className="space-y-2 pt-1 border-t border-border">
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Para mejores fotos</p>
                  {[
                    'Misma hora que la semana anterior',
                    'Ropa ajustada o mínima',
                    'Iluminación frontal uniforme',
                    'Misma distancia a la cámara',
                  ].map((tip, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 rounded-full bg-[#10b981]/15 flex items-center justify-center shrink-0">
                        <i className="bi bi-check text-[#10b981] text-[9px]"></i>
                      </span>
                      <p className="text-[11px] text-muted-foreground">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── HISTORIAL VISUAL ── */}
          <div className="bg-card border border-border rounded-[2.5rem] p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-black text-foreground">Tu Evolución Visual</h2>
                <p className="text-xs text-muted-foreground mt-0.5">Haz clic en un registro para ver los detalles y comparar ángulos</p>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest bg-[#10b981]/10 text-[#10b981] px-3 py-1.5 rounded-full">
                {HISTORY.length} registros
              </span>
            </div>

            <div className="space-y-4">
              {HISTORY.map((item, i) => (
                <div
                  key={i}
                  className={`border-2 rounded-3xl overflow-hidden transition-all cursor-pointer ${
                    selectedHistory === i ? 'border-[#10b981]' : 'border-border hover:border-[#10b981]/30'
                  }`}
                  onClick={() => setSelectedHistory(selectedHistory === i ? null : i)}
                >
                  {/* Fila resumen siempre visible */}
                  <div className="flex items-center gap-4 p-4 bg-card">
                    {/* Thumbnail frontal */}
                    <div className="w-14 h-14 rounded-2xl overflow-hidden shrink-0 border border-border">
                      <img src={item.photos.front} className="w-full h-full object-cover" alt="frontal" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-wider">{item.date}</p>
                      <p className="text-lg font-black text-foreground">{item.weight} kg</p>
                    </div>
                    <div className="hidden sm:flex gap-6 text-center">
                      {[
                        { label: 'Cintura', value: `${item.waist} cm` },
                        { label: 'Pecho',   value: `${item.chest} cm` },
                        { label: 'Cadera',  value: `${item.hip} cm` },
                      ].map((m, j) => (
                        <div key={j}>
                          <p className="text-[9px] font-black text-muted-foreground uppercase">{m.label}</p>
                          <p className="text-sm font-black text-foreground">{m.value}</p>
                        </div>
                      ))}
                    </div>
                    {i > 0 && (
                      <span className="text-[10px] font-black text-[#10b981] bg-[#10b981]/10 px-3 py-1.5 rounded-full shrink-0 hidden sm:block">
                        −{(firstWeight - item.weight).toFixed(1)} kg total
                      </span>
                    )}
                    <i className={`bi bi-chevron-down text-muted-foreground transition-transform ${selectedHistory === i ? 'rotate-180' : ''}`}></i>
                  </div>

                  {/* Panel expandido: 3 fotos */}
                  {selectedHistory === i && (
                    <div className="border-t border-border p-4 bg-muted/30">
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3">Fotos del registro</p>
                      <div className="grid grid-cols-3 gap-3">
                        {ANGLES.map(a => (
                          <div key={a.key} className="space-y-1.5">
                            <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-border">
                              <img
                                src={item.photos[a.key as keyof typeof item.photos]}
                                className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-500"
                                alt={a.label}
                              />
                            </div>
                            <p className="text-[9px] font-black text-center text-muted-foreground uppercase tracking-wider">{a.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Slot próximo registro */}
              <div className="border-2 border-dashed border-border rounded-3xl p-6 flex items-center gap-4 bg-muted/20">
                <div className="w-14 h-14 rounded-2xl border border-dashed border-border bg-muted flex items-center justify-center shrink-0">
                  <i className="bi bi-plus text-2xl text-muted-foreground/30"></i>
                </div>
                <div>
                  <p className="text-xs font-black text-muted-foreground/60 uppercase tracking-widest">Semana 6 · Próximo registro</p>
                  <p className="text-[11px] text-muted-foreground/40 mt-0.5">Completa el formulario y pulsa Enviar para añadirlo</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}