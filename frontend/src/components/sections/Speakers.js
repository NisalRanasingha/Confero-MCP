'use client';
import { useReveal } from '@/lib/hooks';

const speakers = [
  {
    name:     'Dr. Aris Thorne',
    title:    'Chief AI Architect',
    org:      'Nexus Orchestrations',
    initials: 'AT',
    gradient: 'linear-gradient(135deg, #7c4dff 0%, #4527a0 100%)',
    glow:     'rgba(124,77,255,0.35)',
    tag:      'Agentic Systems',
  },
  {
    name:     'Elena Rostova',
    title:    'Director of Intelligence Systems',
    org:      'Horizon Data Labs',
    initials: 'ER',
    gradient: 'linear-gradient(135deg, #06b6d4 0%, #0e7490 100%)',
    glow:     'rgba(6,182,212,0.35)',
    tag:      'Data Architecture',
  },
  {
    name:     'Marcus Vance',
    title:    'Head of Global AI Policy',
    org:      'Tech Governance Council',
    initials: 'MV',
    gradient: 'linear-gradient(135deg, #9b7dff 0%, #6b2fff 100%)',
    glow:     'rgba(155,125,255,0.35)',
    tag:      'AI Governance',
  },
  {
    name:     'Sanaa Kulkarni',
    title:    'VP of Engineering',
    org:      'CoreStream Infrastructure',
    initials: 'SK',
    gradient: 'linear-gradient(135deg, #22d3ee 0%, #06b6d4 100%)',
    glow:     'rgba(34,211,238,0.35)',
    tag:      'Infrastructure',
  },
];

function SpeakerCard({ speaker, visible, delay }) {
  return (
    <div
      className="speaker-card glass rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.07)] group"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {/* Avatar area */}
      <div className="relative h-44 flex items-center justify-center overflow-hidden" style={{ background: '#0c1018' }}>
        {/* Geometric background */}
        <div className="absolute inset-0 opacity-30">
          <svg viewBox="0 0 300 176" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            <defs>
              <radialGradient id={`rg-${speaker.initials}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={speaker.glow} stopOpacity="0.6"/>
                <stop offset="100%" stopColor="transparent" stopOpacity="0"/>
              </radialGradient>
            </defs>
            <rect width="300" height="176" fill={`url(#rg-${speaker.initials})`}/>
            {/* Grid lines */}
            {[60,120,180,240].map(x => <line key={x} x1={x} y1="0" x2={x} y2="176" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>)}
            {[44,88,132].map(y  => <line key={y} x1="0" y1={y} x2="300" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>)}
            {/* Decorative hexagon */}
            <polygon points="150,30 195,55 195,105 150,130 105,105 105,55" stroke="rgba(255,255,255,0.06)" strokeWidth="1" fill="none"/>
          </svg>
        </div>

        {/* Avatar circle */}
        <div
          className="relative z-10 w-20 h-20 rounded-full flex items-center justify-center shadow-lg"
          style={{ background: speaker.gradient, boxShadow: `0 0 32px ${speaker.glow}` }}
        >
          <span className="font-display font-700 text-2xl text-white">{speaker.initials}</span>
        </div>

        {/* Topic tag */}
        <div
          className="absolute bottom-4 right-4 px-2.5 py-1 rounded-md text-xs font-mono"
          style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)' }}
        >
          {speaker.tag}
        </div>
      </div>

      {/* Info */}
      <div className="p-6">
        <h3 className="font-display font-700 text-lg text-slate-100 mb-1">{speaker.name}</h3>
        <p className="font-body text-sm text-slate-400 mb-0.5">{speaker.title}</p>
        <p className="font-mono text-xs" style={{ color: speaker.glow.replace('rgba', 'rgb').replace(/,\s*[\d.]+\)/, ')') }}>
          {speaker.org}
        </p>

        <div className="mt-5 pt-5 border-t border-[rgba(255,255,255,0.05)] flex items-center justify-between">
          <span className="text-xs text-slate-600 font-body">Keynote Speaker</span>
          <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: 'rgba(124,77,255,0.12)', border: '1px solid rgba(124,77,255,0.2)' }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 5H8M6 3L8 5L6 7" stroke="#9b7dff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Speakers() {
  const [ref, visible] = useReveal();

  return (
    <section id="speakers" className="relative py-24">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(124,77,255,0.04) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={ref} className={`mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex items-center gap-4 mb-8">
            <span className="section-label">06 — Speakers</span>
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(124,77,255,0.3), transparent)' }} />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="font-display font-700 text-4xl lg:text-5xl text-slate-100">
              Voices shaping
              <span className="gradient-text"> enterprise AI</span>
            </h2>
            <span className="font-body text-sm text-slate-500">Full speaker lineup to be announced</span>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {speakers.map((speaker, i) => (
            <SpeakerCard key={speaker.name} speaker={speaker} visible={visible} delay={100 + i * 120} />
          ))}
        </div>
      </div>
    </section>
  );
}
