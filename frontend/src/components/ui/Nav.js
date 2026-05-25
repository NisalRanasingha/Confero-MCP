'use client';
import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'Overview', href: '#overview' },
  { label: 'Topics',   href: '#topics'   },
  { label: 'Speakers', href: '#speakers' },
  { label: 'Attend',   href: '#attend'   },
];

export default function Nav({ onOpenModal }) {
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'glass-strong border-b border-[rgba(255,255,255,0.06)]' : 'bg-transparent'}`}>
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-7 h-7 rounded bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center shadow-violet-sm">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1L13 4.5V9.5L7 13L1 9.5V4.5L7 1Z" stroke="white" strokeWidth="1.2" fill="rgba(255,255,255,0.15)"/>
              <circle cx="7" cy="7" r="2" fill="white"/>
            </svg>
          </div>
          <span className="font-display font-700 text-sm tracking-wide text-slate-100">
            Confero<span className="text-violet-400"> '26</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(l => (
            <a key={l.href} href={l.href} className="text-sm text-slate-400 hover:text-slate-100 transition-colors duration-200 font-body">
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA — opens modal */}
        <button
          onClick={onOpenModal}
          className="hidden md:inline-flex btn-primary items-center gap-2 px-5 py-2.5 rounded-lg bg-violet-500 hover:bg-violet-400 text-white text-sm font-medium transition-colors duration-200 shadow-violet-sm"
        >
          Secure Pass
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6H10M7 3L10 6L7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5" aria-label="Menu">
          <span className={`w-5 h-px bg-slate-400 transition-all duration-300 ${open ? 'rotate-45 translate-y-1.5' : ''}`} />
          <span className={`w-5 h-px bg-slate-400 transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`w-5 h-px bg-slate-400 transition-all duration-300 ${open ? '-rotate-45 -translate-y-1.5' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`md:hidden glass-strong border-t border-[rgba(255,255,255,0.06)] transition-all duration-300 overflow-hidden ${open ? 'max-h-64' : 'max-h-0'}`}>
        <div className="px-6 py-4 flex flex-col gap-4">
          {navLinks.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm text-slate-400 hover:text-slate-100 transition-colors">
              {l.label}
            </a>
          ))}
          <button onClick={() => { setOpen(false); onOpenModal(); }}
            className="btn-primary text-center py-2.5 rounded-lg bg-violet-500 text-white text-sm font-medium">
            Secure Executive Pass
          </button>
        </div>
      </div>
    </header>
  );
}
