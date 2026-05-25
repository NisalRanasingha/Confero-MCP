'use client';
import { useEffect, useState } from 'react';

export default function Hero({ onOpenModal }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="w-screen h-screen relative flex flex-col items-center justify-center overflow-hidden grid-bg">

      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] md:w-[700px] md:h-[700px] rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, rgba(124,77,255,0.25) 0%, transparent 65%)', filter: 'blur(40px)' }} />
        <div className="absolute -bottom-48 right-0 w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] md:w-[600px] md:h-[600px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.25) 0%, transparent 65%)', filter: 'blur(40px)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[250px] sm:w-[600px] sm:h-[300px] md:w-[900px] md:h-[400px] opacity-10"
          style={{ background: 'radial-gradient(ellipse, rgba(124,77,255,0.4) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      </div>

      {/* Grid fade */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 50%, transparent 30%, var(--void) 100%)' }} />

      <div className="relative z-10 w-full h-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center">

        {/* 1. Mulu content ekama vertical center karana wrapper eka */}
        <div className="flex-1 flex flex-col items-center justify-center w-full">
          
          {/* Title */}
          <h1 className={`font-display font-800 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] leading-[0.95] tracking-tight mb-4 sm:mb-6 transition-all duration-700 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <span className="block text-slate-100">Confero Summit 2026</span>
            <span className="block gradient-text mt-2 sm:mt-3">The Enterprise AI Horizon</span>
          </h1>

          {/* Divider */}
          <div className={`mx-auto w-16 sm:w-24 h-px mb-6 sm:mb-8 transition-all duration-700 delay-200 ${mounted ? 'opacity-100' : 'opacity-0'}`}
            style={{ background: 'linear-gradient(90deg, transparent, rgba(124,77,255,0.6), rgba(6,182,212,0.6), transparent)' }} />

          {/* Subtitle */}
          <p className={`font-body text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-12 transition-all duration-700 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            The flagship assembly for tech executives orchestrating next-generation artificial intelligence,
            multi-agent frameworks, and data infrastructure.
          </p>

          {/* CTAs */}
          <div className={`w-full flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 transition-all duration-700 delay-[400ms] ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {/* Primary — opens modal */}
            <button
              onClick={onOpenModal}
              className="btn-primary group relative inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-display font-600 text-sm sm:text-base text-white shadow-violet-md hover:shadow-violet-lg transition-all duration-300 w-full sm:w-auto"
              style={{ background: 'linear-gradient(135deg, #7c4dff 0%, #6b2fff 100%)' }}
            >
              <span className="relative z-10">Secure Executive Pass</span>
              <svg className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 hidden sm:block" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M9 4L13 8L9 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="absolute inset-0 rounded-xl bg-violet-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </button>

            <a href="#overview"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-display font-600 text-sm sm:text-base text-slate-300 hover:text-white border border-[rgba(255,255,255,0.12)] hover:border-[rgba(255,255,255,0.22)] glass transition-all duration-300">
              Request Personalized Agenda
              <svg className="transition-transform duration-300 group-hover:translate-x-1 hidden sm:block" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2.5 7H11.5M8 3.5L11.5 7L8 10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

        </div>

        {/* 2. Scroll hint eka absolute bottom ekata damma central content ekata badha wenne nathi wenna */}
        <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-700 delay-[600ms] ${mounted ? 'opacity-100' : 'opacity-0'}`}>
          <span className="section-label text-slate-600 text-xs sm:text-sm">Scroll to explore</span>
          <div className="w-px h-8 sm:h-12 bg-gradient-to-b from-transparent via-slate-600 to-transparent animate-pulse" />
        </div>

      </div>

      {/* Corner decorations */}
      <div className="absolute top-4 sm:top-8 left-4 sm:left-8 opacity-20 hidden md:block">
        <svg width="40" height="40" viewBox="0 0 60 60" fill="none"><path d="M0 60V0H60" stroke="rgba(124,77,255,0.6)" strokeWidth="1"/></svg>
      </div>
      <div className="absolute top-4 sm:top-8 right-4 sm:right-8 opacity-20 hidden md:block">
        <svg width="40" height="40" viewBox="0 0 60 60" fill="none"><path d="M60 60V0H0" stroke="rgba(6,182,212,0.6)" strokeWidth="1"/></svg>
      </div>
    </section>
  );
}