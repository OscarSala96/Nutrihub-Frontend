'use client';

import { useState } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import PageHeader from '@/components/Pageheader';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, BarElement, Title, Tooltip, Legend, Filler
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler);

// Datos del paciente Juan Pérez (simulado, normalmente vendrían de params.id)
const PATIENT = {
  id: '1', name: 'Juan Pérez', email: 'juan.perez@email.com',
  phone: '+34 611 223 344', age: 34, gender: 'Hombre',
  objective: 'Pérdida de Grasa', planType: 'Premium', status: 'Activo',
  startDate: 'Enero 2025', activity: 'Moderado',
};

const WEEKS = ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6 (Nuevo)'];

const RECORDS = [
  { week: 'Sem 1', date: 'Hace 5 sem.', weight: 78.2, waist: 88, chest: 98, hip: 97, arm: 34, thigh: 57, energy: 3, sleep: 2, hunger: 3, adherence: '50–75%', notes: 'Me cuesta adaptarme a las nuevas cantidades, sobre todo a mediodía.', isNew: false, photos: { front: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=400&auto=format&fit=crop', left: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=400&auto=format&fit=crop', right: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=400&auto=format&fit=crop' } },
  { week: 'Sem 2', date: 'Hace 4 sem.', weight: 77.1, waist: 86, chest: 97, hip: 96, arm: 34, thigh: 56, energy: 3, sleep: 3, hunger: 3, adherence: '75–90%', notes: 'Esta semana mejor. He podido seguir el plan casi al 100%.', isNew: false, photos: { front: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=400&auto=format&fit=crop', left: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=400&auto=format&fit=crop', right: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=400&auto=format&fit=crop' } },
  { week: 'Sem 3', date: 'Hace 3 sem.', weight: 76.5, waist: 85, chest: 96, hip: 95, arm: 33, thigh: 56, energy: 4, sleep: 4, hunger: 4, adherence: '+90%',   notes: 'Muy buena semana. Me siento con más energía y menos hinchado.', isNew: false, photos: { front: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=400&auto=format&fit=crop', left: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=400&auto=format&fit=crop', right: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=400&auto=format&fit=crop' } },
  { week: 'Sem 4', date: 'Hace 2 sem.', weight: 75.8, waist: 83, chest: 95, hip: 94, arm: 33, thigh: 55, energy: 3, sleep: 3, hunger: 3, adherence: '75–90%', notes: 'Tuve una cena familiar y me pasé un poco. El resto de la semana bien.', isNew: false, photos: { front: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=400&auto=format&fit=crop', left: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=400&auto=format&fit=crop', right: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=400&auto=format&fit=crop' } },
  { week: 'Sem 5', date: 'Sem pasada',  weight: 75.4, waist: 82, chest: 94, hip: 93, arm: 32, thigh: 55, energy: 4, sleep: 4, hunger: 4, adherence: '+90%',   notes: 'Excelente semana. El entrenamiento va genial y me siento muy bien.', isNew: false, photos: { front: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=400&auto=format&fit=crop', left: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=400&auto=format&fit=crop', right: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=400&auto=format&fit=crop' } },
  { week: 'Sem 6', date: 'Hoy, 07:15', weight: 74.8, waist: 81, chest: 93, hip: 92, arm: 32, thigh: 54, energy: 5, sleep: 4, hunger: 5, adherence: '+90%',   notes: 'Ha sido la mejor semana hasta ahora. Me veo diferente en el espejo y mi ropa me queda mejor.', isNew: true, photos: { front: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=400&auto=format&fit=crop', left: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=400&auto=format&fit=crop', right: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=400&auto=format&fit=crop' } },
];

const ANGLE_LABELS = ['Frontal', 'Lado Izq.', 'Lado Der.'] as const;
const ANGLE_KEYS   = ['front', 'left', 'right'] as const;

const EMOJI_ENERGY = ['😴', '😐', '😊', '⚡', '🔥'];
const ADHERENCE_COLOR: Record<string, string> = {
  '<50%':    'bg-rose-500/10 text-rose-500',
  '50–75%':  'bg-amber-500/10 text-amber-500',
  '75–90%':  'bg-blue-500/10 text-blue-500',
  '+90%':    'bg-[#10b981]/10 text-[#10b981]',
};

export default function PatientProgressPage() {
  const [selectedWeek, setSelectedWeek]   = useState(RECORDS.length - 1);
  const [selectedAngle, setSelectedAngle] = useState<'front' | 'left' | 'right'>('front');
  const [nutriNote, setNutriNote]         = useState('');
  const [noteSent, setNoteSent]           = useState(false);

  const record = RECORDS[selectedWeek];
  const first  = RECORDS[0];
  const weightLost = (first.weight - record.weight).toFixed(1);
  const waistLost  = first.waist - record.waist;

  const chartGrid  = 'rgba(128,128,128,0.08)';
  const chartTick  = '#888888';

  const weightChartData = {
    labels: RECORDS.map(r => r.week),
    datasets: [{
      label: 'Peso (kg)',
      data: RECORDS.map(r => r.weight),
      borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.08)',
      tension: 0.4, fill: true, pointBackgroundColor: RECORDS.map((r, i) => i === selectedWeek ? '#10b981' : '#10b981'),
      pointRadius: RECORDS.map((r, i) => i === selectedWeek ? 7 : 4),
    }]
  };

  const metricsChartData = {
    labels: RECORDS.map(r => r.week),
    datasets: [
      { label: 'Cintura', data: RECORDS.map(r => r.waist), borderColor: '#f59e0b', backgroundColor: 'transparent', tension: 0.4, pointBackgroundColor: '#f59e0b', pointRadius: 4 },
      { label: 'Pecho',   data: RECORDS.map(r => r.chest), borderColor: '#3b82f6', backgroundColor: 'transparent', tension: 0.4, pointBackgroundColor: '#3b82f6', pointRadius: 4 },
      { label: 'Cadera',  data: RECORDS.map(r => r.hip),   borderColor: '#a855f7', backgroundColor: 'transparent', tension: 0.4, pointBackgroundColor: '#a855f7', pointRadius: 4 },
    ]
  };

  const lineOptions = (yLabel: string) => ({
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { position: 'top' as const, labels: { color: chartTick, font: { weight: 'bold' as const, size: 11 }, usePointStyle: true, padding: 12 } } },
    scales: {
      y: { grid: { color: chartGrid }, ticks: { color: chartTick, callback: (v: any) => `${v} ${yLabel}` } },
      x: { grid: { display: false }, ticks: { color: chartTick, font: { weight: 'bold' as const } } }
    }
  });

  const handleSendNote = () => {
    setNoteSent(true);
    setNutriNote('');
    setTimeout(() => setNoteSent(false), 3000);
  };

  return (
    <div className="flex min-h-screen bg-background font-sans">

      <main className="flex-1 overflow-auto flex flex-col">
        <PageHeader
          title={`Progreso · ${PATIENT.name}`}
          description={`${PATIENT.objective} · Plan ${PATIENT.planType} · Desde ${PATIENT.startDate}`}
          icon={<i className="bi bi-graph-up-arrow" />}
          backUrl='/dashboard/admin/patients'
        />

        <div className="p-6 lg:p-10 max-w-[1400px] mx-auto w-full space-y-6">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
            <Link href="/dashboard/admin/patients" className="hover:text-[#10b981] transition-colors">Pacientes</Link>
            <i className="bi bi-chevron-right text-[10px]"></i>
            <span className="text-foreground font-black">{PATIENT.name}</span>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Peso Inicial',   value: `${first.weight} kg`,    icon: 'bi-speedometer2',       color: 'text-muted-foreground', bg: 'bg-muted/50' },
              { label: 'Peso Actual',    value: `${record.weight} kg`,   icon: 'bi-speedometer2',       color: 'text-[#10b981]',        bg: 'bg-[#10b981]/10' },
              { label: 'Total Perdido',  value: `−${weightLost} kg`,     icon: 'bi-arrow-down-circle',  color: 'text-blue-500',         bg: 'bg-blue-500/10' },
              { label: 'Cintura −',      value: `−${waistLost} cm`,      icon: 'bi-rulers',             color: 'text-amber-500',        bg: 'bg-amber-500/10' },
            ].map((k, i) => (
              <div key={i} className="bg-card border border-border rounded-3xl p-5 flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl ${k.bg} flex items-center justify-center shrink-0`}>
                  <i className={`bi ${k.icon} ${k.color} text-base`}></i>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{k.label}</p>
                  <p className="text-xl font-black text-foreground">{k.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Gráficas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-[2.5rem] p-8 flex flex-col min-h-[320px]">
              <div className="mb-4">
                <span className="text-[9px] font-black uppercase tracking-widest bg-[#10b981]/10 text-[#10b981] px-3 py-1 rounded-full">Evolución</span>
                <h2 className="text-base font-black text-foreground mt-2">Tendencia de Peso</h2>
              </div>
              <div className="flex-1 min-h-[200px] relative">
                <Line data={weightChartData} options={lineOptions('kg')} />
              </div>
            </div>
            <div className="bg-card border border-border rounded-[2.5rem] p-8 flex flex-col min-h-[320px]">
              <div className="mb-4">
                <span className="text-[9px] font-black uppercase tracking-widest bg-amber-500/10 text-amber-500 px-3 py-1 rounded-full">Medidas</span>
                <h2 className="text-base font-black text-foreground mt-2">Evolución de Medidas (cm)</h2>
              </div>
              <div className="flex-1 min-h-[200px] relative">
                <Line data={metricsChartData} options={lineOptions('cm')} />
              </div>
            </div>
          </div>

          {/* Selector semana + detalle */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Lista semanas */}
            <div className="bg-card border border-border rounded-[2.5rem] p-6 space-y-2">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4">Registros Semanales</p>
              {RECORDS.map((r, i) => (
                <button key={i} onClick={() => setSelectedWeek(i)}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all border-2 ${
                    selectedWeek === i ? 'border-[#10b981] bg-[#10b981]/10' : 'border-border hover:border-[#10b981]/30 bg-muted/20'
                  }`}>
                  <div className="flex items-center gap-3">
                    <span className={`text-sm font-black ${selectedWeek === i ? 'text-[#10b981]' : 'text-foreground'}`}>{r.week}</span>
                    {r.isNew && <span className="text-[9px] font-black text-[#10b981] bg-[#10b981]/10 px-2 py-0.5 rounded-full animate-pulse">Nuevo</span>}
                  </div>
                  <span className="text-xs font-black text-muted-foreground">{r.weight} kg</span>
                </button>
              ))}
            </div>

            {/* Detalle semana */}
            <div className="lg:col-span-2 space-y-4">

              {/* Datos numéricos */}
              <div className="bg-card border border-border rounded-[2.5rem] p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-black text-foreground">{record.week} — {record.date}</h3>
                    {record.isNew && <span className="text-[10px] font-black text-[#10b981] bg-[#10b981]/10 px-2 py-0.5 rounded-full">Nuevo registro</span>}
                  </div>
                  <span className={`text-xs font-black px-3 py-1.5 rounded-full ${ADHERENCE_COLOR[record.adherence]}`}>
                    Adherencia {record.adherence}
                  </span>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                  {[
                    { label: 'Peso',    value: `${record.weight} kg`, color: '#10b981' },
                    { label: 'Cintura', value: `${record.waist} cm`,  color: '#f59e0b' },
                    { label: 'Pecho',   value: `${record.chest} cm`,  color: '#3b82f6' },
                    { label: 'Cadera',  value: `${record.hip} cm`,    color: '#a855f7' },
                    { label: 'Brazo',   value: `${record.arm} cm`,    color: '#ef4444' },
                  ].map((m, i) => (
                    <div key={i} className="bg-muted/40 rounded-2xl p-3 text-center">
                      <p className="text-[9px] font-black text-muted-foreground uppercase tracking-wider">{m.label}</p>
                      <p className="text-base font-black" style={{ color: m.color }}>{m.value}</p>
                    </div>
                  ))}
                </div>

                {/* Bienestar */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Energía', val: record.energy, emojis: EMOJI_ENERGY },
                    { label: 'Sueño',   val: record.sleep,  emojis: ['😩','😪','😴','🌙','✨'] },
                    { label: 'Saciedad',val: record.hunger, emojis: ['🍽️','😤','😌','✅','💪'] },
                  ].map((row, i) => (
                    <div key={i} className="bg-muted/40 rounded-2xl p-3 text-center">
                      <p className="text-[9px] font-black text-muted-foreground uppercase tracking-wider mb-1">{row.label}</p>
                      <span className="text-2xl">{row.emojis[row.val - 1]}</span>
                      <p className="text-[10px] font-black text-foreground mt-0.5">{row.val}/5</p>
                    </div>
                  ))}
                </div>

                {/* Notas del paciente */}
                {record.notes && (
                  <div className="bg-muted/30 border border-border rounded-2xl p-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">Notas del Paciente</p>
                    <p className="text-sm text-foreground leading-relaxed">"{record.notes}"</p>
                  </div>
                )}
              </div>

              {/* Fotos */}
              <div className="bg-card border border-border rounded-[2.5rem] p-6 space-y-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Fotos del Registro</p>

                {/* Selector ángulo */}
                <div className="flex gap-2 p-1 bg-muted rounded-2xl w-fit">
                  {ANGLE_KEYS.map((k, i) => (
                    <button key={k} onClick={() => setSelectedAngle(k)}
                      className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${
                        selectedAngle === k ? 'bg-card shadow-sm text-foreground border border-border' : 'text-muted-foreground hover:text-foreground'
                      }`}>
                      {ANGLE_LABELS[i]}
                    </button>
                  ))}
                </div>

                <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-border">
                  <img
                    src={record.photos[selectedAngle]}
                    className="w-full h-full object-cover"
                    alt={selectedAngle}
                  />
                </div>

                {/* Miniaturas */}
                <div className="grid grid-cols-3 gap-2">
                  {ANGLE_KEYS.map((k, i) => (
                    <button key={k} onClick={() => setSelectedAngle(k)}
                      className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                        selectedAngle === k ? 'border-[#10b981]' : 'border-border hover:border-[#10b981]/40'
                      }`}>
                      <img src={record.photos[k]} className="w-full h-full object-cover" alt={ANGLE_LABELS[i]} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Nota del nutricionista */}
              <div className="bg-card border border-border rounded-[2.5rem] p-6 space-y-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Respuesta del Nutricionista</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Tu comentario se enviará al paciente como feedback del registro</p>
                </div>
                {noteSent && (
                  <div className="bg-[#10b981]/10 border border-[#10b981]/30 rounded-2xl px-4 py-3 flex items-center gap-2 text-sm font-black text-[#10b981]">
                    <i className="bi bi-check-circle-fill"></i> Feedback enviado al paciente
                  </div>
                )}
                <textarea
                  placeholder="Ej: ¡Excelente semana Juan! La bajada de cintura es notable. Para la próxima semana aumentamos las proteínas del desayuno..."
                  rows={4}
                  value={nutriNote}
                  onChange={e => setNutriNote(e.target.value)}
                  className="w-full bg-muted/50 border border-border rounded-2xl px-5 py-4 focus:ring-2 focus:ring-[#10b981]/30 focus:border-[#10b981] outline-none transition-all text-sm resize-none text-foreground"
                />
                <button
                  onClick={handleSendNote}
                  disabled={!nutriNote.trim()}
                  className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                    nutriNote.trim() ? 'bg-[#10b981] hover:bg-[#059669] text-white shadow-lg shadow-[#10b981]/20' : 'bg-muted text-muted-foreground cursor-not-allowed'
                  }`}>
                  <i className="bi bi-send-fill"></i>
                  Enviar feedback al paciente
                </button>
              </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}