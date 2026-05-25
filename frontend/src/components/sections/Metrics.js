'use client';
import { useReveal, useCountUp } from '@/lib/hooks';

const metrics = [
  {
    value:  '450',
    suffix: '+',
    label:  'Tech Founders & Enterprise Executives',
    accent: 'violet',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2L18 7V13L10 18L2 13V7L10 2Z" stroke="currentColor" strokeWidth="1.2" fill="rgba(124,77,255,0.12)"/>
        <circle cx="10" cy="10" r="3" fill="currentColor" opacity="0.8"/>
      </svg>
    ),
  },
  {
    value:  '25',
    suffix: '+',
    label:  'Elite AI Engineers & Infrastructure Pioneers',
    accent: 'cyan',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.2" fill="rgba(6,182,212,0.12)"/>
        <path d="M7 10H13M10 7V13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    value:  '15',
    suffix: '+',
    label:  'Practical Deep-Dive Case Studies',
    accent: 'violet',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M4 16V6L10 3L16 6V16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="rgba(124,77,255,0.12)"/>
        <path d="M7 10H13M7 13H11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    value:  '50',
    suffix: '+',
    label:  'Breakthrough Autonomous Agents Showcased',
    accent: 'cyan',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.2" fill="rgba(6,182,212,0.12)"/>
        <path d="M10 6V10L13 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
];

function MetricCard({ metric, visible, delay }) {
  const count = useCountUp(metric.value, visible, 1600);
  const isViolet = metric.accent === 'violet';

  return (
    <div
      className="relative glass rounded-2xl p-8 border border-[rgba(255,255,255,0.07)] overflow-hidden group hover:-translate-y-1 transition-all duration-300"
      style={{
        transitionDelay: `${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms, box-shadow 0.3s ease`,
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at top left, ${isViolet ? 'rgba(124,77,255,0.08)' : 'rgba(6,182,212,0.07)'} 0%, transparent 70%)` }}
      />

      {/* Icon */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-6"
        style={{
          background: isViolet ? 'rgba(124,77,255,0.12)' : 'rgba(6,182,212,0.12)',
          border: `1px solid ${isViolet ? 'rgba(124,77,255,0.25)' : 'rgba(6,182,212,0.25)'}`,
          color: isViolet ? '#9b7dff' : '#22d3ee',
        }}
      >
        {metric.icon}
      </div>

      {/* Number */}
      <div className="flex items-baseline gap-1 mb-3">
        <span
          className="font-display font-800 text-6xl leading-none tabular-nums"
          style={{ color: isViolet ? '#9b7dff' : '#22d3ee' }}
        >
          {count}
        </span>
        <span
          className="font-display font-700 text-3xl"
          style={{ color: isViolet ? '#9b7dff' : '#22d3ee', opacity: 0.7 }}
        >
          {metric.suffix}
        </span>
      </div>

      {/* Label */}
      <p className="font-body text-sm text-slate-400 leading-snug">{metric.label}</p>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-40"
        style={{ background: `linear-gradient(90deg, transparent, ${isViolet ? 'rgba(124,77,255,0.6)' : 'rgba(6,182,212,0.6)'}, transparent)` }}
      />
    </div>
  );
}

export default function Metrics() {
  const [ref, visible] = useReveal();

  return (
    <section className="relative py-24">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, transparent, rgba(124,77,255,0.03) 50%, transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div
          ref={ref}
          className={`flex items-center gap-4 mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <span className="section-label">02 — By The Numbers</span>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(124,77,255,0.3), transparent)' }} />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, i) => (
            <MetricCard key={metric.label} metric={metric} visible={visible} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}
