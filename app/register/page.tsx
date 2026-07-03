'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1); // Control del paso actual (1 o 2)
  const [selectedPlan, setSelectedPlan] = useState('mensual'); // 'mensual' o 'anual'
  
  // Datos del formulario
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [colegiado, setColegiado] = useState('');
  
  // Datos de pago simulados
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2); // Pasamos a la pasarela de pago
  };

  const handleRegisterAndPay = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulamos la validación del pago y el guardado en base de datos
    setTimeout(() => {
      const newUser = {
        id: `uuid-nutri-${Date.now()}`,
        nombre,
        email,
        role: 'NUTRICIONISTA',
        colegiado,
        plan: selectedPlan,
        status: 'ACTIVE'
      };
      
      localStorage.setItem('user', JSON.stringify(newUser));
      setLoading(false);
      setSuccess(true);
      
      setTimeout(() => {
        router.push('/dashboard/admin');
      }, 1500);
    }, 2000); // Damos un poco más de margen para simular el "procesando pago"
  };

  return (
    <div className="min-h-screen flex font-sans bg-background">
      <div className="w-full lg:w-1/2 flex flex-col relative z-10">
        <nav className="flex items-center px-8 lg:px-12 py-8">
          <Link href="/" className="flex items-center gap-3">
            <span className="text-foreground text-xl font-extrabold tracking-tight">
              Nutri<span className="text-[#10b981]">Hub</span>
            </span>
          </Link>
        </nav>

        <main className="flex-1 flex items-center justify-center px-6 lg:px-12 py-6">
          <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Indicador de pasos */}
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
              <span className={`text-xs font-black uppercase tracking-wider ${step === 1 ? 'text-[#10b981]' : 'text-muted-foreground/40'}`}>
                1. Datos Clínicos
              </span>
              <i className="bi bi-chevron-right text-xs text-muted-foreground/30"></i>
              <span className={`text-xs font-black uppercase tracking-wider ${step === 2 ? 'text-[#10b981]' : 'text-muted-foreground/40'}`}>
                2. Pago Seguro
              </span>
            </div>

            <div className="mb-8 text-center lg:text-left">
              <h1 className="text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight mb-3">
                {step === 1 ? 'Únete como Profesional' : 'Confirmar Suscripción'}
              </h1>
              <p className="text-muted-foreground text-base">
                {step === 1 
                  ? 'Crea tu cuenta de Nutricionista para configurar tu consulta digital.' 
                  : 'Introduce tu tarjeta para activar la licencia profesional de NutriHub.'}
              </p>
            </div>

            {success && (
              <div className="rounded-2xl px-5 py-4 mb-6 flex items-center gap-3 bg-[#10b981]/10 border border-[#10b981]/20 animate-in zoom-in-95">
                <i className="bi bi-shield-check text-[#10b981] text-lg"></i>
                <p className="text-[#10b981] text-sm font-bold">¡Pago procesado y cuenta activada! Entrando...</p>
              </div>
            )}

            {/* ── PASO 1: DATOS DE USUARIO ── */}
            {step === 1 && (
              <form onSubmit={handleNextStep} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-foreground px-1">Nombre Completo</label>
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Dr/Dra. Tu Nombre"
                    required
                    className="w-full bg-card border border-input rounded-2xl px-5 py-3.5 text-sm focus:ring-2 focus:ring-[#10b981]/30 focus:border-[#10b981] transition-all shadow-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-foreground px-1">Correo Electrónico</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="profesional@ejemplo.com"
                    required
                    className="w-full bg-card border border-input rounded-2xl px-5 py-3.5 text-sm focus:ring-2 focus:ring-[#10b981]/30 focus:border-[#10b981] transition-all shadow-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-foreground px-1">Contraseña</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mínimo 6 caracteres"
                    required
                    className="w-full bg-card border border-input rounded-2xl px-5 py-3.5 text-sm focus:ring-2 focus:ring-[#10b981]/30 focus:border-[#10b981] transition-all shadow-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-foreground text-background font-black rounded-2xl px-4 py-4 mt-4 hover:bg-[#10b981] hover:text-white transition-all active:scale-[0.98] shadow-xl flex items-center justify-center gap-2 uppercase tracking-widest text-[11px]"
                >
                  Continuar al pago <i className="bi bi-arrow-right"></i>
                </button>
              </form>
            )}

            {/* ── PASO 2: SELECCIÓN DE PLAN Y PASARELA DE PAGO ── */}
{step === 2 && !success && (
  <form onSubmit={handleRegisterAndPay} className="space-y-4 animate-in fade-in duration-300">
    
    {/* Selector de los 4 Planes Reales (Grilla 2x2) */}
    <div className="space-y-1.5 px-1">
      <label className="text-sm font-bold text-foreground">Selecciona tu Plan Licencia</label>
      <div className="grid grid-cols-2 gap-3 mt-1">
        
        {/* PLAN BÁSICO */}
        <div 
          onClick={() => setSelectedPlan('basico')}
          className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
            selectedPlan === 'basico' ? 'border-[#10b981] bg-[#10b981]/5 ring-1 ring-[#10b981]' : 'border-border bg-card hover:bg-foreground/5'
          }`}
        >
          <div>
            <p className="text-[10px] font-black text-[#10b981] uppercase tracking-wider">Básico</p>
            <p className="text-[10px] text-muted-foreground font-medium mt-0.5">Hasta 10 pacientes</p>
          </div>
          <p className="text-xl font-black text-foreground mt-2">30€<span className="text-[10px] font-medium text-muted-foreground">/mes</span></p>
        </div>

        {/* PLAN ESTÁNDAR */}
        <div 
          onClick={() => setSelectedPlan('estandar')}
          className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
            selectedPlan === 'estandar' ? 'border-[#10b981] bg-[#10b981]/5 ring-1 ring-[#10b981]' : 'border-border bg-card hover:bg-foreground/5'
          }`}
        >
          <div>
            <p className="text-[10px] font-black text-blue-500 uppercase tracking-wider">Estándar</p>
            <p className="text-[10px] text-muted-foreground font-medium mt-0.5">Hasta 50 pacientes</p>
          </div>
          <p className="text-xl font-black text-foreground mt-2">60€<span className="text-[10px] font-medium text-muted-foreground">/mes</span></p>
        </div>

        {/* PLAN PROFESIONAL */}
        <div 
          onClick={() => setSelectedPlan('profesional')}
          className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
            selectedPlan === 'profesional' ? 'border-[#10b981] bg-[#10b981]/5 ring-1 ring-[#10b981]' : 'border-border bg-card hover:bg-foreground/5'
          }`}
        >
          <div>
            <p className="text-[10px] font-black text-indigo-500 uppercase tracking-wider">Profesional</p>
            <p className="text-[10px] text-muted-foreground font-medium mt-0.5">Pacientes ilimitados</p>
          </div>
          <p className="text-xl font-black text-foreground mt-2">120€<span className="text-[10px] font-medium text-muted-foreground">/mes</span></p>
        </div>

        {/* PLAN PREMIUM */}
        <div 
          onClick={() => setSelectedPlan('premium')}
          className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
            selectedPlan === 'premium' ? 'border-[#10b981] bg-[#10b981]/5 ring-1 ring-[#10b981]' : 'border-border bg-card hover:bg-foreground/5'
          }`}
        >
          <div>
            <p className="text-[10px] font-black text-purple-500 uppercase tracking-wider">Premium</p>
            <p className="text-[10px] text-muted-foreground font-medium mt-0.5">Soporte prioritario</p>
          </div>
          <p className="text-xl font-black text-foreground mt-2">250€<span className="text-[10px] font-medium text-muted-foreground">/mes</span></p>
        </div>

      </div>
    </div>

    {/* Formulario de tarjeta simulado (Sigue igual que antes) */}
    <div className="bg-card border border-border rounded-2xl p-5 space-y-4 shadow-sm">
      <div className="flex items-center justify-between border-b border-border/60 pb-3 mb-2">
        <span className="text-xs font-bold text-foreground uppercase tracking-wider">Tarjeta de Crédito</span>
        <div className="flex gap-2 text-muted-foreground text-lg">
          <i className="bi bi-credit-card-2-front-fill text-[#10b981]"></i>
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-bold text-muted-foreground">Nombre en la tarjeta</label>
        <input
          type="text"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          placeholder="JUAN PEREZ DUEÑAS"
          required
          className="w-full bg-background border border-input rounded-xl px-4 py-2.5 text-sm focus:ring-1 focus:ring-[#10b981] focus:border-[#10b981] transition-all"
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs font-bold text-muted-foreground">Número de Tarjeta</label>
        <input
          type="text"
          maxLength={16}
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          placeholder="4500 1234 5678 9012"
          required
          className="w-full bg-background border border-input rounded-xl px-4 py-2.5 text-sm focus:ring-1 focus:ring-[#10b981] focus:border-[#10b981] transition-all font-mono"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-bold text-muted-foreground">Caducidad</label>
          <input
            type="text"
            maxLength={5}
            value={cardExpiry}
            onChange={(e) => setCardExpiry(e.target.value)}
            placeholder="MM/AA"
            required
            className="w-full bg-background border border-input rounded-xl px-4 py-2.5 text-sm focus:ring-1 focus:ring-[#10b981] focus:border-[#10b981] transition-all text-center"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-muted-foreground">CVC / CVC2</label>
          <input
            type="password"
            maxLength={3}
            value={cardCvc}
            onChange={(e) => setCardCvc(e.target.value)}
            placeholder="•••"
            required
            className="w-full bg-background border border-input rounded-xl px-4 py-2.5 text-sm focus:ring-1 focus:ring-[#10b981] focus:border-[#10b981] transition-all text-center font-mono"
          />
        </div>
      </div>
    </div>

    {/* Botonera de acciones */}
    <div className="flex gap-3 pt-2">
      <button
        type="button"
        onClick={() => setStep(1)}
        disabled={loading}
        className="w-1/3 border border-input bg-card hover:bg-foreground/5 text-foreground font-bold rounded-2xl px-4 py-4 text-[11px] uppercase tracking-widest transition-all"
      >
        Atrás
      </button>
      <button
        type="submit"
        disabled={loading}
        className="w-2/3 bg-foreground text-background font-black rounded-2xl px-4 py-4 hover:bg-[#10b981] hover:text-white transition-all active:scale-[0.98] disabled:opacity-50 shadow-xl flex items-center justify-center gap-2 uppercase tracking-widest text-[11px]"
      >
        {loading ? <i className="bi bi-arrow-repeat animate-spin text-lg"></i> : `Pagar y Registrarse`}
      </button>
    </div>
    
    <p className="text-[10px] text-center text-muted-foreground font-medium pt-2">
      🔒 Pago seguro encriptado. Puedes cancelar tu suscripción en cualquier momento desde tu panel de control.
    </p>
  </form>
)}

            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-center text-muted-foreground text-sm font-medium">
                ¿Ya tienes una cuenta registrada?{' '}
                <Link href="/login" className="text-[#10b981] font-bold hover:underline">
                  Inicia sesión aquí.
                </Link>
              </p>
            </div>
          </div>
        </main>
      </div>

      {/* LADO DERECHO IDÉNTICO */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#020617] items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1543362906-acfc16c67564?q=80&w=2000&auto=format&fit=crop" 
          alt="Healthy food" 
          className="absolute inset-0 w-full h-full object-cover opacity-40 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-[#020617]/50"></div>
        <div className="relative z-10 max-w-lg p-12">
          <div className="w-16 h-16 bg-[#10b981] rounded-2xl flex items-center justify-center shadow-2xl shadow-[#10b981]/40 mb-8">
             <i className="bi bi-journal-check text-white text-3xl"></i>
          </div>
          <h2 className="text-4xl xl:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight">
            Digitaliza tu consulta médica y nutricional.
          </h2>
          <p className="text-lg text-white/70 font-medium leading-relaxed">
            Automatiza el envío de dietas, interactúa en tiempo real y analiza de forma matemática el progreso biométrico.
          </p>
        </div>
      </div>
    </div>
  );
}