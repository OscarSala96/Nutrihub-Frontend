'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Mock de usuarios basados en tu esquema SQL
const MOCK_USERS = {
  nutri: {
    email: 'nutri@pro.com',
    password: '123',
    user: {
      id: 'uuid-nutri-1',
      nombre: 'Dr. Carlos Nutri',
      email: 'nutri@pro.com',
      role: 'NUTRICIONISTA'
    }
  },
  paciente: {
    email: 'paciente@test.com',
    password: '123',
    user: {
      id: 'uuid-paciente-1',
      nombre: 'Juan Pérez',
      email: 'paciente@test.com',
      role: 'PACIENTE',
      idNutri: 'uuid-nutri-1' // Relacionado con el nutri de arriba
    }
  }
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // --- LÓGICA MOCKEADA ---
    setTimeout(() => {
      let foundUser = null;

      if (email === MOCK_USERS.nutri.email && password === MOCK_USERS.nutri.password) {
        foundUser = MOCK_USERS.nutri.user;
      } else if (email === MOCK_USERS.paciente.email && password === MOCK_USERS.paciente.password) {
        foundUser = MOCK_USERS.paciente.user;
      }

      if (foundUser) {
        localStorage.setItem('user', JSON.stringify(foundUser));
        window.dispatchEvent(new Event('user:login'));

        // Redirección por Rol
        if (foundUser.role === 'NUTRICIONISTA') {
          router.push('/dashboard/admin');
        } else {
          router.push('/dashboard/user');
        }
      } else {
        setError('Credenciales incorrectas. Prueba con nutri@pro.com / 123');
        setLoading(false);
      }
    }, 1000); // Simulamos latencia de red
  };

  return (
    <div className="min-h-screen flex font-sans bg-background">
      
      {/* LADO IZQUIERDO: FORMULARIO */}
      <div className="w-full lg:w-1/2 flex flex-col relative z-10">
        
        <nav className="flex items-center px-8 lg:px-12 py-8">
          <div className="flex items-center gap-3">
            <span className="text-foreground text-xl font-extrabold tracking-tight">
              Nutri<span className="text-[#10b981]">Hub</span>
            </span>
          </div>
        </nav>

        <main className="flex-1 flex items-center justify-center px-6 lg:px-12 py-10">
          <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            <div className="mb-10 text-center lg:text-left">
              <h1 className="text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight mb-3">
                ¡Hola de nuevo!
              </h1>
              <p className="text-muted-foreground text-base">
                Introduce tus datos para acceder a tu panel de NutriHub.
              </p>
              {/*<div className="mt-4 p-3 bg-muted rounded-xl text-[10px] text-muted-foreground font-mono">
                💡 Mock: <b>nutri@pro.com</b> o <b>paciente@test.com</b> (Pass: 123)
              </div>*/}
            </div>

            {error && (
              <div className="rounded-2xl px-5 py-4 mb-8 flex items-center gap-3 bg-destructive/10 border border-destructive/20 animate-in shake">
                <i className="bi bi-exclamation-circle-fill text-destructive text-lg"></i>
                <p className="text-destructive text-sm font-bold">{error}</p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-foreground px-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nombre@ejemplo.com"
                  required
                  className="w-full bg-card border border-input rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-[#10b981]/30 focus:border-[#10b981] transition-all shadow-sm"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between px-1">
                  <label className="text-sm font-bold text-foreground">Contraseña</label>
                  <Link href="/forgot-pass" className="text-[#10b981] text-xs font-bold hover:underline">¿Olvidaste tu clave?</Link>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-card border border-input rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-[#10b981]/30 focus:border-[#10b981] transition-all shadow-sm"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-foreground text-background font-black rounded-2xl px-4 py-4 mt-6 hover:bg-[#10b981] hover:text-white transition-all active:scale-[0.98] disabled:opacity-50 shadow-xl flex items-center justify-center gap-2 uppercase tracking-widest text-[11px]"
              >
                {loading ? <i className="bi bi-arrow-repeat animate-spin text-lg"></i> : 'Entrar en NutriHub'}
              </button>
            </form>

            <div className="mt-10 pt-8 border-t border-border">
              <p className="text-center text-muted-foreground text-sm font-medium">
                ¿Aún no eres parte de la plataforma?{' '}
                <Link href="/register" className="text-[#10b981] font-bold hover:underline transition-all">
                  Crea tu cuenta de profesional.
                </Link>
              </p>
            </div>
          </div>
        </main>
      </div>

      {/* LADO DERECHO: BRANDING */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#020617] items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1543362906-acfc16c67564?q=80&w=2000&auto=format&fit=crop" 
          alt="Healthy food" 
          className="absolute inset-0 w-full h-full object-cover opacity-40 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-[#020617]/50"></div>

        <div className="relative z-10 max-w-lg p-12 animate-in fade-in zoom-in-95 duration-1000">
          <div className="w-16 h-16 bg-[#10b981] rounded-2xl flex items-center justify-center shadow-2xl shadow-[#10b981]/40 mb-8">
             <i className="bi bi-heart-pulse-fill text-white text-3xl"></i>
          </div>
          <h2 className="text-4xl xl:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight">
            La salud es el resultado de lo que haces cada día.
          </h2>
          <p className="text-lg text-white/70 font-medium leading-relaxed">
            Tu panel inteligente para el seguimiento de dietas, control de peso y comunicación directa con tu nutricionista.
          </p>
        </div>
      </div>
    </div>
  );
}