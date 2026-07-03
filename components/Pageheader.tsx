'use client';

import React from 'react';
import Link from 'next/link';

interface PageHeaderProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  backUrl?: string;
  onBack?: () => void;
}

export default function PageHeader({
  title,
  description,
  icon,
  action,
  backUrl,
  onBack,
}: PageHeaderProps) {
  const hasBack = backUrl || onBack;

  const backButton = backUrl ? (
    <Link
      href={backUrl}
      title="Volver"
      className="w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center
                 text-white/90 bg-white/5 border border-white/10
                 hover:bg-white/10 hover:text-white hover:border-white/20
                 active:scale-95 transition-all duration-300 group shrink-0
                 shadow-lg backdrop-blur-md"
    >
      <i className="bi bi-arrow-left text-lg md:text-xl transition-transform group-hover:-translate-x-1" />
    </Link>
  ) : onBack ? (
    <button
      onClick={onBack}
      title="Volver"
      className="w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center
                 text-white/90 bg-white/5 border border-white/10
                 hover:bg-white/10 hover:text-white hover:border-white/20
                 active:scale-95 transition-all duration-300 group shrink-0
                 shadow-lg backdrop-blur-md"
    >
      <i className="bi bi-arrow-left text-lg md:text-xl transition-transform group-hover:-translate-x-1" />
    </button>
  ) : null;

  return (
    <div
      className="
        bg-[oklch(0.48_0.11_190)]
        px-4 md:px-6 lg:px-10 py-3
        flex flex-row items-center justify-between gap-3
        relative overflow-hidden
        border-b border-white/[0.06]
        shrink-0 min-h-[72px] z-30
      "
    >
      {/* Blobs decorativos */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute -top-40 -left-20 w-[600px] h-[600px]
                     bg-[#00FFD5] opacity-30 blur-[90px]
                     animate-[travel-blob-1_12s_ease-in-out_infinite]
                     mix-blend-screen rounded-full"
        />
        <div
          className="absolute -bottom-40 -right-20 w-[600px] h-[600px]
                     bg-[#E600FF] opacity-[0.15] blur-[100px]
                     animate-[travel-blob-2_15s_ease-in-out_infinite]
                     mix-blend-screen rounded-full"
        />
      </div>

      {/* Izquierda: botón volver + icono + título */}
      <div className="flex items-center gap-3 md:gap-6 z-10 min-w-0 flex-1">
        {hasBack && backButton}

        {hasBack && (
          <div className="hidden sm:block w-px h-10 bg-gradient-to-b from-transparent via-white/20 to-transparent shrink-0" />
        )}

        <div className="flex items-center gap-3 md:gap-5 min-w-0">
          {icon && (
            <div
              className="text-base md:text-lg text-white
                         bg-white/10 w-9 h-9 md:w-11 md:h-11
                         rounded-xl border border-white/20
                         shrink-0 flex items-center justify-center
                         shadow-lg backdrop-blur-md"
            >
              {icon}
            </div>
          )}

          <div className="min-w-0 flex flex-col justify-center">
            <h1
              className="text-base md:text-xl lg:text-2xl font-semibold text-white
                         tracking-tight leading-tight py-0.5 mb-1 drop-shadow-md truncate"
            >
              {title}
            </h1>
            <p
              className="hidden sm:block text-white/80 text-[11px] lg:text-xs
                         font-medium uppercase tracking-[0.15em] drop-shadow-sm truncate"
            >
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* Derecha: acción */}
      {action && (
        <div className="relative z-10 shrink-0">
          {action}
        </div>
      )}
    </div>
  );
}