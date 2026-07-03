import Sidebar from '@/components/Sidebar'; // Ajusta la ruta exacta a tu componente

export default function NutricionistaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background font-sans">
      {/* Pasamos explícitamente el rol correspondiente */}
      <Sidebar role="NUTRICIONISTA" />

      {/* Contenedor principal que se expande y permite el scroll correcto */}
      <main className="flex-1 min-w-0 overflow-auto flex flex-col">
        {children}
      </main>
    </div>
  );
}