'use client';

import PageHeader from '@/components/Pageheader';
import Sidebar from '@/components/Sidebar';

export default function AdminMessagesPage() {
  return (
    <div className="flex min-h-screen bg-background font-sans">
      <main className="flex-1 overflow-auto flex flex-col">
        <PageHeader 
          title="Mensajería" 
          description="Conversaciones instantáneas uno a uno con tus pacientes." 
          icon={<i className="bi bi-chat-dots-fill" />} 
        />
        <div className="p-6 lg:p-10 flex-1 flex gap-6 items-stretch min-h-[500px]">
          <div className="w-80 bg-card border border-border rounded-[2rem] p-6 hidden md:block space-y-4">
            <h2 className="text-xs font-black text-muted-foreground uppercase tracking-widest">Chats Activos</h2>
            <div className="space-y-2">
              {['Caros Pérez', 'María García', 'Juan Pérez', 'Elena Sanz', 'Sergio Torres', 'Lucía Fernández', 'Clara Ortiz', 'Javier Marín', 'Patricia Silva', 'Alejandro Ramos'].map((p, i) => (
                <div key={i} className={`p-3 rounded-xl border text-sm font-bold cursor-pointer ${i === 0 ? 'bg-primary/10 border-primary/30 text-primary' : 'bg-background border-border text-foreground hover:bg-muted'}`}>
                  {p}
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 bg-card border border-border rounded-[2rem] p-8 flex flex-col justify-between">
            <div className="border-b border-border pb-4 mb-4 flex items-center justify-between">
              <p className="font-bold text-foreground">Carlos Pérez</p>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <div className="flex-1 bg-muted/20 border border-border rounded-2xl p-4 flex items-center justify-center text-xs text-muted-foreground">
              [Historial de Chat]
            </div>
            <div className="mt-4 flex gap-2">
              <input type="text" placeholder="Escribe un mensaje..." className="flex-1 px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:border-primary" />
              <button className="w-11 h-11 bg-primary text-white rounded-xl flex items-center justify-center"><i className="bi bi-send-fill" /></button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}