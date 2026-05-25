'use client';
import { useReveal } from '@/lib/hooks';

export default function Overview() {
  const [ref, visible] = useReveal();

  return (
    <section id="overview" className="relative py-32 lg:py-40">
      {/* Subtle section separator */}
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }} />

      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-6 lg:px-8 transition-all duration-800 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        style={{ transitionDuration: '0.8s' }}
      >
        {/* Header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="section-label">01 — Context</span>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(124,77,255,0.3), transparent)' }} />
        </div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left — Large heading */}
          <div>
            <h2 className="font-display font-700 text-4xl lg:text-5xl leading-[1.1] text-slate-100 mb-6">
              Where AI research
              <br />
              <span className="gradient-text-violet">meets enterprise</span>
              <br />
              execution.
            </h2>

            {/* Accent bar */}
            <div className="w-16 h-0.5 bg-gradient-to-r from-violet-500 to-cyan-400 mb-8" />

            <p className="font-body text-slate-400 text-base leading-[1.9]">
              As businesses move past basic AI experimentation, the challenge shifts to scaling intelligent
              systems in production. Enterprises are facing critical hurdles regarding infrastructure costs,
              agent orchestration, data privacy, and the challenges of legacy system integration.
            </p>
          </div>

          {/* Right — Core purpose card */}
          <div className="glass rounded-2xl p-8 border border-[rgba(255,255,255,0.07)] relative overflow-hidden">
            {/* Corner accent */}
            <div
              className="absolute top-0 right-0 w-48 h-48 opacity-10"
              style={{ background: 'radial-gradient(circle at top right, rgba(6,182,212,0.8), transparent 70%)' }}
            />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(6,182,212,0.15)', border: '1px solid rgba(6,182,212,0.3)' }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 2L14 5.5V10.5L8 14L2 10.5V5.5L8 2Z" stroke="rgba(6,182,212,0.9)" strokeWidth="1.2"/>
                    <circle cx="8" cy="8" r="2" fill="rgba(6,182,212,0.9)"/>
                  </svg>
                </div>
                <span className="section-label text-cyan-400">Core Purpose</span>
              </div>

              <p className="font-body text-slate-300 text-base leading-[1.9] mb-8">
                Confero Summit 2026 bridges the gap between raw AI research and real-world corporate
                execution. The summit brings together tech pioneers and enterprise operational leaders to
                unpack production-ready multi-agent ecosystems, hybrid data architectures, and strict AI
                governance models.
              </p>

              {/* Three pillars */}
              <div className="space-y-3">
                {[
                  { label: 'Multi-Agent Ecosystems',      color: 'violet' },
                  { label: 'Hybrid Data Architectures',   color: 'cyan'   },
                  { label: 'AI Governance & Compliance',  color: 'violet' },
                ].map((pillar) => (
                  <div key={pillar.label} className="flex items-center gap-3">
                    <div
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: pillar.color === 'violet' ? '#7c4dff' : '#22d3ee' }}
                    />
                    <span className="text-sm text-slate-400 font-body">{pillar.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
