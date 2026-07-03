'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex font-sans bg-background">
      <div className="w-full lg:w-1/2 flex flex-col justify-between">
        <nav className="flex items-center px-8 lg:px-12 py-8">
          <Link href="/" className="flex items-center gap-3">
            <span className="text-foreground text-xl font-extrabold tracking-tight">
              Nutri<span className="text-[#10b981]">Hub</span>
            </span>
          </Link>
        </nav>

        <main className="flex-1 flex items-center justify-center px-6 lg:px-12 py-10">
          <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="mb-10 text-center lg:text-left">
              <h1 className="text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight mb-3">
                ¿Olvidaste tu clave?
              </h1>
              <p className="text-muted-foreground text-base">
                No pasa nada. Introduce tu correo y te enviaremos las instrucciones de restauración de forma inmediata.
              </p>
            </div>

            {sent ? (
              <div className="bg-[#10b981]/10 border border-[#10b981]/20 rounded-2xl p-6 text-center lg:text-left animate-in zoom-in-95">
                <div className="w-12 h-12 bg-[#10b981] rounded-xl flex items-center justify-center mx-auto lg:mx-0 mb-4 text-white">
                  <i className="bi bi-envelope-check-fill text-xl"></i>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-1">Comprueba tu bandeja de entrada</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Hemos enviado un enlace de recuperación seguro a <b>{email}</b>.
                </p>
                <Link href="/login" className="text-sm font-bold text-[#10b981] hover:underline">
                  Volver al inicio de sesión
                </Link>
              </div>
            ) : (
              <form onSubmit={handleReset} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-foreground px-1">Email de tu cuenta</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nombre@ejemplo.com"
                    required
                    className="w-full bg-card border border-input rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-[#10b981]/30 focus:border-[#10b981] transition-all shadow-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-foreground text-background font-black rounded-2xl px-4 py-4 mt-4 hover:bg-[#10b981] hover:text-white transition-all active:scale-[0.98] disabled:opacity-50 shadow-xl flex items-center justify-center gap-2 uppercase tracking-widest text-[11px]"
                >
                  {loading ? <i className="bi bi-arrow-repeat animate-spin text-lg"></i> : 'Enviar enlace de recuperación'}
                </button>

                <div className="pt-4 text-center lg:text-left">
                  <Link href="/login" className="text-sm text-muted-foreground font-bold hover:text-[#10b981] transition-colors">
                    <i className="bi bi-arrow-left mr-2"></i>Volver al Login
                  </Link>
                </div>
              </form>
            )}
          </div>
        </main>
        
        <div className="p-8"></div>
      </div>

      <div className="hidden lg:flex lg:w-1/2 relative bg-[#020617] items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1543362906-acfc16c67564?q=80&w=2000&auto=format&fit=crop" 
          alt="Healthy food" 
          className="absolute inset-0 w-full h-full object-cover opacity-40 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-[#020617]/50"></div>
      </div>
    </div>
  );
}