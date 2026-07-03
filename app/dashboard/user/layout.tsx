import Sidebar from '@/components/Sidebar'; // Ajusta la ruta exacta a tu componente

export default function PacienteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background font-sans">
      {/* Pasamos explícitamente el rol correspondiente */}
      <Sidebar role="PACIENTE" />

      {/* Contenedor principal idéntico para mantener simetría visual */}
      <main className="flex-1 min-w-0 overflow-auto flex flex-col">
        {children}
      </main>
    </div>
  );
}