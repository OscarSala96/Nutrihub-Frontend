'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface SidebarProps {
  role: 'NUTRICIONISTA' | 'PACIENTE';
}

type NavItem = { label: string; href: string; icon: React.ReactNode };

// ─── Menús por rol (Adaptados a NutriHub) ─────────────────────────────────────

const navItems = {
  NUTRICIONISTA: [
    { label: 'Panel Principal', href: '/dashboard/admin', icon: <i className="bi bi-grid-1x2-fill"></i> },
    { label: 'Mis Pacientes', href: '/dashboard/admin/patients', icon: <i className="bi bi-people-fill"></i> },
    { label: 'Planificador', href: '/dashboard/admin/diets', icon: <i className="bi bi-egg-fried"></i> },
    { label: 'Estadísticas', href: '/dashboard/admin/analytics', icon: <i className="bi bi-graph-up-arrow"></i> },
    { label: 'Alimentos', href: '/dashboard/admin/food-search', icon: <i className="bi bi-search"></i> },
    { label: 'Mensajes', href: '/dashboard/admin/messages', icon: <i className="bi bi-chat-dots-fill"></i> },
  ],
  PACIENTE: [
    { label: 'Panel Principal', href: '/dashboard/user', icon: <i className="bi bi-grid-1x2-fill"></i> },
    { label: 'Mi Dieta', href: '/dashboard/user/diet', icon: <i className="bi bi-calendar-check"></i> },
    { label: 'Alimentos', href: '/dashboard/user/food-search', icon: <i className="bi bi-search"></i> },
    { label: 'Progreso', href: '/dashboard/user/progress', icon: <i className="bi bi-camera-fill"></i> },
    { label: 'Evolución', href: '/dashboard/user/analytics', icon: <i className="bi bi-bar-chart-line-fill"></i> },
    { label: 'Mensajes', href: '/dashboard/user/messages', icon: <i className="bi bi-chat-dots-fill"></i> },
  ],
};

const roleLabels = {
  NUTRICIONISTA: 'Profesional',
  PACIENTE: 'Paciente',
};

const roleColors = {
  NUTRICIONISTA: 'bg-[#1e3a8a] text-white border-transparent', // Azul Marino
  PACIENTE: 'bg-[#10b981] text-white border-transparent',      // Verde Esmeralda
};

// ─── Componente Sidebar ───────────────────────────────────────────────────────

export default function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [user, setUser] = useState<any>(null);
  
  // Badges (ejemplo de alertas de registros pendientes o nuevos mensajes)
  const [alertsCount, setAlertsCount] = useState(0);

  const showText = mobileOpen || !collapsed;

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
    
    const savedTheme = document.cookie.split('; ').find(row => row.startsWith('theme='))?.split('=')[1];
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    setIsDark(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme);
    setMounted(true);

    const checkResizing = () => { if (window.innerWidth < 1024) setCollapsed(true); };
    window.addEventListener('resize', checkResizing);
    return () => window.removeEventListener('resize', checkResizing);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    document.documentElement.classList.toggle('dark', newTheme);
    document.cookie = `theme=${newTheme ? 'dark' : 'light'}; path=/; max-age=31536000`;
    setIsDark(newTheme);
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push('/login');
  };

const checkActive = (href: string) => {
  const isBaseRoute = href.split('/').length <= 3; // Ajusta según tu profundidad de carpetas
  
  if (isBaseRoute) {
    return pathname === href;
  }
  return pathname.startsWith(href);
};
  if (!mounted) return null;

  const currentMenu = navItems[role] || [];
  const displayLogo = "/images/logo-nutrihub.png"; // Cambia esto por tu ruta real

  return (
    <>
      {/* Botón flotante móvil */}
      {!mobileOpen && (
        <button 
          onClick={() => setMobileOpen(true)}
          className="lg:hidden fixed top-15 left-5 z-[9999] w-12 h-12 bg-primary text-white shadow-lg rounded-2xl flex items-center justify-center transition-all active:scale-95"
        >
          <i className="bi bi-list text-2xl"></i>
        </button>
      )}

      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[10000] lg:hidden transition-opacity duration-300 ${mobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMobileOpen(false)}
      />

      <aside className={`
        fixed lg:sticky top-0 left-0 h-screen bg-card border-r border-border flex flex-col transition-all duration-300 z-[10001] shrink-0
        ${mobileOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0'}
        ${collapsed ? 'lg:w-16' : 'lg:w-64'}
      `}>
        
        {/* Header / Logo */}
        <div className={`flex items-center justify-between border-b border-border transition-all duration-300 ${!showText ? 'h-20 px-0 justify-center' : 'h-24 px-4 gap-3'}`}>
          <div className={`
            bg-white rounded-2xl shadow-sm border border-border flex items-center justify-center overflow-hidden transition-all
            ${!showText ? 'w-12 h-12 p-1.5' : 'flex-1 h-14 p-2'}
          `}>
            {showText ? (
              <span className="text-xl font-black tracking-tighter text-[#1e3a8a]">
                NUTRI<span className="text-[#10b981]">HUB</span>
              </span>
            ) : (
              <span className="text-xl font-black text-[#10b981]">N</span>
            )}
          </div>
          
          {showText && !mobileOpen && (
            <button onClick={() => setCollapsed(true)} className="hidden lg:flex text-muted-foreground p-2 rounded-lg hover:bg-muted transition-colors">
              <i className="bi bi-text-indent-right text-lg"></i>
            </button>
          )}

          <button onClick={() => setMobileOpen(false)} className="lg:hidden text-muted-foreground p-2">
            <i className="bi bi-x-lg text-xl"></i>
          </button>
        </div>

        {/* Navegación Principal */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto no-scrollbar">
          {!showText && (
              <button onClick={() => setCollapsed(false)} className="hidden lg:flex w-12 h-12 mx-auto text-muted-foreground rounded-xl hover:bg-muted items-center justify-center mb-4">
                <i className="bi bi-text-indent-left text-xl"></i>
              </button>
          )}

          {currentMenu.map((item) => {
            const isActive = checkActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-[13px] relative group
                  ${isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted'}
                  ${!showText ? 'justify-center w-12 h-12 mx-auto px-0' : ''}
                `}
              >
                <span className={`text-xl transition-transform group-hover:scale-110 ${isActive ? 'text-primary' : ''}`}>
                  {item.icon}
                </span>
                {showText && <span className="flex-1 truncate tracking-tight">{item.label}</span>}

                {/* Badge de alerta (Ej: Mensajes o Alertas de pacientes) */}
                {item.label === 'Mensajes' && alertsCount > 0 && showText && (
                   <span className="bg-destructive text-white text-[9px] font-black px-1.5 py-0.5 rounded-full">3</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer (Perfil, Tema, Logout) */}
        <div className="p-4 border-t border-border bg-card space-y-2">
          <Link href="/dashboard/profile" onClick={() => setMobileOpen(false)} className="block w-full mb-2">
            <div className={`flex items-center gap-3 p-2 rounded-2xl hover:bg-muted/70 transition-all ${!showText ? 'justify-center p-0' : ''}`}>
               <div className={`rounded-full overflow-hidden shrink-0 border-2 border-border ${!showText ? 'w-10 h-10' : 'w-10 h-10'}`}>
                 {user?.avatarUrl ? (
                   <img src={user.avatarUrl} alt="Perfil" className="w-full h-full object-cover" />
                 ) : (
                   <div className="w-full h-full bg-[#10b981]/10 flex items-center justify-center">
                     <span className="text-[#10b981] text-xs font-black">{user?.name?.charAt(0) || 'O'}</span>
                   </div>
                 )}
               </div>
               {showText && (
                 <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-bold truncate text-foreground">{user?.name || 'Óscar Sala'}</p>
                    <span className={`text-[8px] uppercase font-black px-1.5 py-0.5 rounded border ${roleColors[role]}`}>
                      {roleLabels[role]}
                    </span>
                 </div>
               )}
            </div>
          </Link>

          <div className="space-y-1">
            <button 
              onClick={toggleTheme} 
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:bg-muted font-bold text-[13px] transition-all cursor-pointer ${!showText ? 'justify-center' : ''}`}
            >
              <span className="text-lg w-6 flex justify-center">
                <i className={`bi ${isDark ? 'bi-sun-fill text-amber-400' : 'bi-moon-stars-fill text-indigo-400'}`}></i>
              </span>
              {showText && <span>{isDark ? 'Modo Claro' : 'Modo Oscuro'}</span>}
            </button>

            <button 
              onClick={handleLogout} 
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:text-red-500 hover:bg-red-500/10 font-bold text-[13px] transition-all cursor-pointer ${!showText ? 'justify-center' : ''}`}
            >
              <span className="text-lg w-6 flex justify-center">
                <i className="bi bi-box-arrow-right"></i>
              </span>
              {showText && <span>Cerrar sesión</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}