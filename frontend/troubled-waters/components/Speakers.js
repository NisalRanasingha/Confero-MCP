'use client'
import useInView from './useInView'

const speakers = [
  {
    name: 'Richard Buxton',
    role: 'VP EMEA',
    org: 'Accelalpha',
    initials: 'RB',
    color: '#3b82f6',
    session: 'Welcome Note',
  },
  {
    name: 'Rohan Chitnis',
    role: 'Sales Director Applications',
    org: 'Oracle',
    initials: 'RC',
    color: '#f97316',
    session: 'Welcome Note',
  },
  {
    name: 'Srivatsav Sarvepalli',
    role: 'Regional Director, Supply Chain Solutions, ECEMEA',
    org: 'Oracle',
    initials: 'SS',
    color: '#10b981',
    session: 'Industry Keynote',
  },
  {
    name: 'Joe Spear',
    role: 'Partner',
    org: 'Accelalpha',
    initials: 'JS',
    color: '#6366f1',
    session: 'Practical Guide to Implementation',
  },
  {
    name: 'Ujjwal Kumar',
    role: 'Principal Domain Lead, ECEMEA',
    org: 'Oracle',
    initials: 'UK',
    color: '#ec4899',
    session: 'SCM Innovations',
  },
  {
    name: 'Dr. Raman Kumar',
    role: 'CEO',
    org: 'Al-Futtaim Logistics',
    initials: 'RK',
    color: '#14b8a6',
    session: 'Digital Evolution',
  },
  {
    name: 'David Moono',
    role: 'Global Logistics Manager',
    org: 'Weatherford',
    initials: 'DM',
    color: '#f59e0b',
    session: 'Strategies in Action Panel',
  },
  {
    name: 'Tamer Hamed',
    role: 'CIO',
    org: 'Dubai Cable Company',
    initials: 'TH',
    color: '#a855f7',
    session: 'Strategies in Action Panel',
  },
]

function SpeakerCard({ sp, index }) {
  const [ref, visible] = useInView()

  return (
    <div
      ref={ref}
      className="speaker-card card-hover rounded-2xl p-6 relative"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.6s ease ${index * 0.08}s, transform 0.6s ease ${index * 0.08}s`,
      }}
    >
      {/* Avatar */}
      <div className="relative mb-5">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-lg"
          style={{ background: `linear-gradient(135deg, ${sp.color}, ${sp.color}88)` }}
        >
          {sp.initials}
        </div>
      </div>

      <h3 className="font-bold text-sm mb-1 leading-tight" style={{ color: 'var(--text-primary)' }}>{sp.name}</h3>
      <p className="text-xs font-semibold mb-0.5" style={{ color: sp.color }}>{sp.role}</p>
      <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>{sp.org}</p>

      <div
        className="text-xs px-3 py-1.5 rounded-full inline-block leading-tight"
        style={{
          background: `${sp.color}15`,
          color: sp.color,
          border: `1px solid ${sp.color}30`,
        }}
      >
        {sp.session}
      </div>
    </div>
  )
}

export default function Speakers() {
  const [ref, visible] = useInView()

  return (
    <section id="speakers" className="py-24 px-6" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          ref={ref}
          className="text-center mb-16"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <span className="text-xs font-bold tracking-widest uppercase block mb-3" style={{ color: 'var(--accent)' }}>
            Industry Leaders
          </span>
          <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            KEYNOTE <span className="gradient-text">SPEAKERS</span>
          </h2>
          <p className="text-base max-w-lg mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Meet the executives and domain experts driving the Gulf supply chain transformation.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {speakers.map((sp, i) => (
            <SpeakerCard key={sp.name} sp={sp} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
