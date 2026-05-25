'use client';
import { useReveal } from '@/lib/hooks';

const sponsors = [
  { name: 'Confero Global Media Group',  tier: 'Host Innovation Partner',        abbr: 'CGM' },
  { name: 'Compute Engine Global',       tier: 'Platinum Enterprise Sponsor',    abbr: 'CEG' },
  { name: 'DataVector Systems',          tier: 'Strategic Architecture Partner', abbr: 'DVS' },
  { name: 'The Next Horizon Review',     tier: 'Official Tech Media Endorsement',abbr: 'NHR' },
];

function SponsorCard({ sponsor, visible, delay }) {
  return (
    <div
      className="glass rounded-xl p-6 border border-[rgba(255,255,255,0.07)] group hover:border-[rgba(124,77,255,0.2)] transition-all duration-300 flex flex-col items-center text-center gap-4"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {/* Logo placeholder */}
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center font-mono font-700 text-base"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.1)',
          color: 'rgba(255,255,255,0.4)',
        }}
      >
        {sponsor.abbr}
      </div>

      <div>
        <p className="font-display font-600 text-sm text-slate-200 mb-1">{sponsor.name}</p>
        <p className="font-mono text-xs text-slate-600">{sponsor.tier}</p>
      </div>
    </div>
  );
}

export default function Sponsors() {
  const [ref, visible] = useReveal();

  // Duplicate for seamless marquee
  const marqueeItems = [...sponsors, ...sponsors];

  return (
    <section className="relative py-24">
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={ref} className={`flex items-center gap-4 mb-16 transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          <span className="section-label">07 — Sponsors & Partners</span>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(124,77,255,0.3), transparent)' }} />
        </div>

        {/* Marquee strip */}
        <div className="relative overflow-hidden mb-16 -mx-6 lg:-mx-8">
          <div className="absolute left-0 top-0 bottom-0 w-24 pointer-events-none z-10" style={{ background: 'linear-gradient(90deg, var(--void), transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-24 pointer-events-none z-10" style={{ background: 'linear-gradient(270deg, var(--void), transparent)' }} />

          <div className="flex gap-0 animate-marquee whitespace-nowrap">
            {marqueeItems.map((s, i) => (
              <div key={i} className="inline-flex items-center gap-4 px-12 py-4 border-r border-[rgba(255,255,255,0.05)]">
                <span className="font-mono text-xs px-2 py-1 rounded" style={{ background: 'rgba(124,77,255,0.1)', color: '#9b7dff' }}>
                  {s.abbr}
                </span>
                <span className="font-body text-sm text-slate-500 font-500">{s.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sponsors.map((sponsor, i) => (
            <SponsorCard key={sponsor.name} sponsor={sponsor} visible={visible} delay={100 + i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}
