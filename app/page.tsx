'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Aurora from '@/components/Aurora'; 

// Gradiente corporativo NutriHub: Verde Esmeralda a Azul Marino
const PREMIUM_GRADIENT = "bg-gradient-to-r from-[#10b981] via-[#3b82f6] to-[#1e3a8a]";

const NUTRIHUB_FEATURES = [
  {
    title: "IA Nutricional",
    desc: "Algoritmos avanzados que ajustan macros y micronutrientes basados en la evolución biométrica diaria.",
    img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80",
    color: "text-[#10b981]"
  },
  {
    title: "+500 Pacientes",
    desc: "Una comunidad en crecimiento que transforma su salud mediante el seguimiento clínico digital.",
    img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80",
    color: "text-blue-400"
  },
  {
    title: "Análisis Clínico",
    desc: "Visualización de biomarcadores y tendencias de peso para un diagnóstico nutricional de alta precisión.",
    img: "https://images.unsplash.com/photo-1551288049-bbdac8626ad1?auto=format&fit=crop&q=80",
    color: "text-emerald-300"
  },
  {
    title: "Gestión Pro",
    desc: "Herramientas integradas para nutricionistas: desde el planificador hasta la mensajería encriptada.",
    img: "https://images.unsplash.com/photo-1454165833767-0274b0596dba?auto=format&fit=crop&q=80",
    color: "text-indigo-400"
  }
];

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const iconRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    gsap.registerPlugin(ScrollTrigger);

    const savedTheme = document.cookie.split('; ').find(row => row.startsWith('theme='))?.split('=')[1];
    const initialTheme = savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    setIsDark(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme);

    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
    const raf = (time: number) => { lenis.raf(time * 1000); };
    gsap.ticker.add(raf);

    return () => { gsap.ticker.remove(raf); lenis.destroy(); };
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    gsap.to(iconRef.current, {
        rotation: isDark ? 180 : 0,
        scale: 0,
        duration: 0.25,
        onComplete: () => {
            setIsDark(newTheme);
            document.documentElement.classList.toggle('dark', newTheme);
            document.cookie = `theme=${newTheme ? 'dark' : 'light'}; path=/; max-age=31536000`;
            gsap.to(iconRef.current, {
                scale: 1,
                rotation: isDark ? 360 : 180,
                duration: 0.5,
                ease: "elastic.out(1, 0.6)"
            });
        }
    });
  };

  if (!mounted) return null;

  return (
    <div className="bg-[#f8fafc] dark:bg-background text-foreground transition-colors duration-500 overflow-x-hidden selection:bg-[#10b981]/30">
      
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 p-2 rounded-full border border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/3 backdrop-blur-3xl shadow-xl transition-all duration-500 w-[90%] max-w-fit">
        <button onClick={toggleTheme} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
          <div ref={iconRef} className="w-5 h-5 flex items-center justify-center">
            {isDark ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-400">
                <circle cx="12" cy="12" r="5" fill="currentColor"/>
                <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-indigo-600">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor" />
              </svg>
            )}
          </div>
        </button>
        <div className="h-4 w-px bg-black/10 dark:bg-white/10 mx-2"></div>
        <Link href="/login" className="px-6 py-2.5 text-[10px] font-black uppercase tracking-widest bg-foreground text-background rounded-full hover:scale-105 transition-all shadow-lg">
          Acceder
        </Link>
      </nav>

      <section className="relative min-h-screen flex items-center px-6 lg:px-24 pt-32 pb-20 overflow-hidden bg-slate-100 dark:bg-transparent">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-30 dark:opacity-60">
            <Aurora colorStops={isDark ? ["#10b981", "#1e3a8a", "#020617"] : ["#dcfce7", "#3b82f6", "#f8fafc"]} amplitude={1.2} blend={0.6} />
        </div>

        <div className="absolute inset-0 pointer-events-none hidden lg:flex items-center justify-end px-24 z-10">
          <div className="w-96 rounded-[3rem] backdrop-blur-3xl bg-white/40 dark:bg-white/3 border border-black/5 dark:border-white/10 shadow-2xl pointer-events-auto p-10 flex flex-col gap-8">
             <div className="relative z-10 flex flex-col gap-8">
                <div className="space-y-3">
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#10b981]">Smart Health</span>
                    <h3 className="text-3xl font-extrabold text-foreground tracking-tighter leading-tight text-balance">Nutrición de <br /> Precisión.</h3>
                    <p className="text-xs font-medium text-muted-foreground leading-relaxed">Software clínico diseñado para optimizar el rendimiento metabólico y el control dietético profesional.</p>
                </div>
                <div className="space-y-4">
                    {[
                        { title: 'Planes Dinámicos', desc: 'Ajuste automático de kcal.', icon: 'bi-lightning-charge' },
                        { title: 'Biometría', desc: 'Control de peso y composición.', icon: 'bi-graph-up-arrow' },
                        { title: 'Base de Datos', desc: 'Miles de alimentos disponibles.', icon: 'bi-database-check' },
                        { title: 'Seguimiento', desc: 'Chat directo Nutri-Paciente.', icon: 'bi-chat-heart' }
                    ].map((serv, i) => (
                        <div key={i} className="flex items-start gap-4">
                            <div className="w-8 h-8 rounded-lg bg-foreground/5 border border-foreground/10 flex items-center justify-center shrink-0">
                                <i className={`bi ${serv.icon} text-[#10b981] text-sm`}></i>
                            </div>
                            <div className="space-y-0.5">
                                <p className="text-xs font-bold text-foreground uppercase tracking-wider">{serv.title}</p>
                                <p className="text-[10px] text-muted-foreground font-medium">{serv.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
             </div>
          </div>
        </div>

        <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-2 items-center z-10">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-foreground/5 border border-foreground/10 backdrop-blur-md text-[10px] font-black uppercase tracking-[0.2em] text-neutral-600 dark:text-muted-foreground mb-8">
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
              Plataforma de Salud Digital
            </div>
            <div className="flex flex-col gap-0 mb-10">
              <h1 className="text-6xl sm:text-7xl lg:text-[100px] font-black tracking-tighter leading-[0.9] text-foreground">NutriHub</h1>
              
              <h2 className="text-3xl lg:text-[55px] font-black tracking-tighter leading-tight text-slate-400 dark:text-white/30">
                Tu ecosistema de
              </h2>
              
              <h2 className={`text-5xl lg:text-[90px] font-black tracking-tighter leading-[0.9] text-transparent bg-clip-text pb-2 ${PREMIUM_GRADIENT}`}>Nutrición.</h2>
            </div>
            <p className="max-w-md mx-auto lg:mx-0 text-lg lg:text-xl font-medium text-muted-foreground leading-relaxed mb-12">Gestiona planes nutricionales, analiza progresos y alcanza tus objetivos con tecnología de vanguardia.</p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <Link href="/register" className="px-12 py-5 bg-[#10b981] hover:bg-[#059669] text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] transition-all hover:scale-105 shadow-xl shadow-[#10b981]/20">Empieza Ahora</Link>
              <Link href="/services" className="px-12 py-5 bg-white/5 border border-foreground/10 hover:bg-foreground/5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] transition-all">Ver Servicios</Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative w-full border-t border-black/10 dark:border-white/10 py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-black tracking-tighter text-foreground">Nutri<span className="text-[#10b981]">Hub</span></h3>
            <p className="text-xs text-muted-foreground mt-2 font-medium">
              © {new Date().getFullYear()} NutriHub Digital S.L. <br /> Tecnología al servicio de la nutrición clínica.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            <Link href="#" className="hover:text-[#10b981] transition-colors">Privacidad</Link>
            <Link href="#" className="hover:text-[#10b981] transition-colors">Términos</Link>
            <Link href="#" className="hover:text-[#10b981] transition-colors">Cookies</Link>
          </div>
          <div className="flex gap-4">
            {['bi-instagram', 'bi-linkedin', 'bi-apple'].map((icon, i) => (
              <Link key={i} href="#" className="w-11 h-11 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center text-muted-foreground hover:text-[#10b981] hover:border-[#10b981]/50 transition-all">
                <i className={`bi ${icon} text-lg`}></i>
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}