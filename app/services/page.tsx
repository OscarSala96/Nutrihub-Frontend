'use client';

import Link from 'next/link';

const SERVICES_LIST = [
  {
    icon: "bi-layout-text-window-reverse",
    title: "Planificador de Dietas",
    desc: "Plataforma de alimentos para estructurar menús por días y comidas con cálculos automáticos de macros basados en el peso objetivo.",
  },
  {
    icon: "bi-search",
    title: "Buscador Nutricional Integrado",
    desc: "Acceso inmediato a miles de alimentos con desglose de kilocalorías, proteínas, hidratos de carbono y grasas medidos en crudo.",
  },
  {
    icon: "bi-graph-up-arrow",
    title: "Gráficas de Evolución",
    desc: "Conversión de mediciones corporales en reportes interactivos para comprobar la progresión real.",
  },
  {
    icon: "bi-shield-lock-fill",
    title: "Mensajería Directa Protegida",
    desc: "Canal de chat directo interno entre el nutricionista y el paciente para resolver dudas de menús, enviar avisos y ajustar planificación.",
  },
  {
    icon: "bi-camera-fill",
    title: "Historial de Progreso Visual",
    desc: "Almacenamiento de fotografías para contrastar cambios físicos reales.",
  },
  {
    icon: "bi-hand-index-thumb-fill",
    title: "Usabilidad Sencilla",
    desc: "Disposición visual intuitiva diseñada específicamente para fomentar el uso diario de la app y mejorar la adherencia.",
  }
];

export default function ServicesPage() {
  return (
    <div className="bg-background text-foreground min-h-screen font-sans selection:bg-[#10b981]/30">
      
      {/* HEADER SIMPLE */}
      <header className="max-w-7xl mx-auto px-6 lg:px-24 py-10 flex items-center justify-between border-b border-border/40">
        <Link href="/" className="text-xl font-extrabold tracking-tight">
          Nutri<span className="text-[#10b981]">Hub</span>
        </Link>
        <Link href="/login" className="px-6 py-2.5 text-[10px] font-black uppercase tracking-widest bg-foreground text-background rounded-full hover:scale-105 transition-all shadow-md">
          Acceder
        </Link>
      </header>

      {/* TITULAR PRINCIPAL */}
      <section className="max-w-4xl mx-auto text-center px-6 pt-20 pb-16">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#10b981] bg-[#10b981]/10 px-4 py-2 rounded-full">
          Prestaciones de la plataforma
        </span>
        <h1 className="text-4xl sm:text-6xl font-black text-foreground tracking-tighter mt-6 mb-6 leading-none">
          Servicios Digitales <br />
          Hechos para la <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10b981] to-[#3b82f6]">Nutrición Real.</span>
        </h1>
      </section>

      {/* GRILLA DE SERVICIOS - ESTILO BENTO REFINADO */}
      <section className="max-w-7xl mx-auto px-6 lg:px-24 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_LIST.map((srv, index) => (
            <div 
              key={index} 
              className="bg-card border border-border rounded-[2.5rem] p-8 hover:border-[#10b981]/40 transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-xl"
            >
              <div>
                <div className="w-12 h-12 bg-foreground/5 group-hover:bg-[#10b981]/10 rounded-2xl flex items-center justify-center border border-border mb-6 transition-colors">
                  <i className={`bi ${srv.icon} text-foreground group-hover:text-[#10b981] text-xl transition-colors`}></i>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 tracking-tight">
                  {srv.title}
                </h3>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                  {srv.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA FINAL DE LA PÁGINA */}
        <div className="mt-20 rounded-[3rem] bg-[#020617] border border-white/10 p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-[#10b981]/10 to-transparent pointer-events-none"></div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4 relative z-10">
            ¿Preparado para dar el siguiente paso?
          </h2>
          <p className="text-white/60 text-sm max-w-lg mx-auto mb-8 relative z-10 font-medium">
            Únete a los profesionales que ya han abandonado los archivos en papel y las hojas de cálculo tradicionales por la automatización inteligente.
          </p>
          <div className="flex justify-center gap-4 relative z-10">
            <Link href="/register" className="px-8 py-4 bg-[#10b981] text-white font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-[#059669] transition-all">
              Crear Cuenta
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}