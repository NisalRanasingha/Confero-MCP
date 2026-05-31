'use client'
import { useState } from 'react'
import useInView from './useInView'

const agenda = [
  {
    id: 1,
    time: '09:30 AM – 10:00 AM',
    title: 'Registrations',
    category: 'Registration',
    description: 'Morning arrival, check-in, and badge collection for registered executive delegates and partners.',
    speaker: 'Event Operations Team',
    role: '',
  },
  {
    id: 2,
    time: '10:00 AM – 10:10 AM',
    title: 'Welcome Note',
    category: 'Opening',
    description: 'An introduction and official welcome to the summit by leadership figures from Accelalpha and Oracle, outlining the key themes of regional supply chain evolution.',
    speaker: 'Richard Buxton & Rohan Chitnis',
    role: 'VP EMEA, Accelalpha · Sales Director Applications, Oracle',
  },
  {
    id: 3,
    time: '10:10 AM – 10:40 AM',
    title: 'Industry Keynote',
    category: 'Keynote',
    description: 'This high-level industry keynote maps out the current market challenges impacting Gulf regional logistics, focusing on rising costs, macroeconomic changes, and how to build a responsive digital framework.',
    speaker: 'Srivatsav Sarvepalli',
    role: 'Regional Director, Supply Chain Solutions, ECEMEA, Oracle',
  },
  {
    id: 4,
    time: '10:40 AM – 11:10 AM',
    title: 'A Practical Guide to Successful Implementation',
    category: 'Workshop',
    description: 'A down-to-earth breakdown detailing how modern organizations successfully deploy and integrate enterprise logistics and SCM platforms safely without interrupting ongoing operations.',
    speaker: 'Joe Spear',
    role: 'Partner, Accelalpha',
  },
  {
    id: 5,
    time: '11:10 AM – 11:30 AM',
    title: 'The Resilient Supply Chain & SCM Innovations',
    category: 'Keynote',
    description: "Unveiling Oracle's Gen AI SCM Platform capabilities. Discover how predictive analytics, embedded AI automation, and deep inventory tracking help software systems anticipate disruption before it impacts the bottom line.",
    speaker: 'Ujjwal Kumar',
    role: 'Principal Domain Lead, ECEMEA, Oracle',
  },
  {
    id: 6,
    time: '11:30 AM – 11:50 AM',
    title: 'Coffee Break',
    category: 'Break',
    description: 'Short intermission for refreshments, informal discussion, and brief peer-to-peer networking.',
    speaker: 'Networking Team',
    role: '',
  },
  {
    id: 7,
    time: '11:50 AM – 12:10 PM',
    title: 'Insights from Digital Evolution',
    category: 'Keynote',
    description: 'Real-world practical insights shared from the top of the logistics sector on how to navigate large-scale corporate automation and digital transformations successfully.',
    speaker: 'Dr. Raman Kumar',
    role: 'CEO, Al-Futtaim Logistics',
  },
  {
    id: 8,
    time: '12:10 PM – 12:40 PM',
    title: 'Strategies in Action: Insights from Industry Leaders',
    category: 'Panel',
    description: 'Interactive panel discussion featuring operational executives sharing their raw case studies, supply chain resilience tactics, and ways to handle green sustainability targets without losing operational momentum.',
    speaker: 'David Moono & Tamer Hamed',
    role: 'Global Logistics Manager, Weatherford · CIO, Dubai Cable Company',
  },
  {
    id: 9,
    time: '12:40 PM – 01:00 PM',
    title: 'Q&A and Closing Remarks',
    category: 'Closing',
    description: 'Floor opened up to audience members for burning inquiries, wrapped up with final strategic takeaways from the hosting team.',
    speaker: 'Accelalpha Team',
    role: '',
  },
  {
    id: 10,
    time: '01:00 PM – Onwards',
    title: 'Lunch & Networking',
    category: 'Networking',
    description: 'A dedicated networking lunch allowing delegates, technology partners, and technical leads to connect directly over real opportunities.',
    speaker: 'Event Catering Group',
    role: '',
  },
]

const categories = ['All', 'Keynote', 'Workshop', 'Panel', 'Opening', 'Networking', 'Break', 'Registration', 'Closing']

const categoryColors = {
  Keynote:      { bg: 'rgba(59,130,246,0.12)',  text: '#3b82f6', border: 'rgba(59,130,246,0.3)',  glow: 'rgba(59,130,246,0.15)' },
  Workshop:     { bg: 'rgba(16,185,129,0.12)',  text: '#10b981', border: 'rgba(16,185,129,0.3)',  glow: 'rgba(16,185,129,0.15)' },
  Panel:        { bg: 'rgba(245,158,11,0.12)',  text: '#f59e0b', border: 'rgba(245,158,11,0.3)',  glow: 'rgba(245,158,11,0.15)' },
  Networking:   { bg: 'rgba(168,85,247,0.12)', text: '#a855f7', border: 'rgba(168,85,247,0.3)',  glow: 'rgba(168,85,247,0.15)' },
  Opening:      { bg: 'rgba(236,72,153,0.12)',  text: '#ec4899', border: 'rgba(236,72,153,0.3)',  glow: 'rgba(236,72,153,0.15)' },
  Break:        { bg: 'rgba(107,114,128,0.12)', text: '#6b7280', border: 'rgba(107,114,128,0.3)', glow: 'rgba(107,114,128,0.15)' },
  Registration: { bg: 'rgba(20,184,166,0.12)',  text: '#14b8a6', border: 'rgba(20,184,166,0.3)',  glow: 'rgba(20,184,166,0.15)' },
  Closing:      { bg: 'rgba(239,68,68,0.12)',   text: '#ef4444', border: 'rgba(239,68,68,0.3)',   glow: 'rgba(239,68,68,0.15)' },
}

const systemSpeakers = ['Event Operations Team', 'Networking Team', 'Accelalpha Team', 'Event Catering Group']

function PopupCard({ item, onClose }) {
  const colors = categoryColors[item.category] || categoryColors.Keynote
  const initials = item.speaker.split(' ').filter(Boolean).map(w => w[0]).join('').slice(0, 2).toUpperCase()
  const isSystem = systemSpeakers.includes(item.speaker)

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(4px)',
        animation: 'fadeIn 0.15s ease',
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="rounded-3xl overflow-hidden w-full"
        style={{
          maxWidth: '480px',
          background: 'var(--bg-card)',
          border: `1px solid ${colors.border}`,
          animation: 'popIn 0.2s ease',
          boxShadow: `0 0 40px ${colors.glow}`,
        }}
      >
        {/* Colored top bar */}
        <div style={{ height: '4px', background: colors.text, width: '100%' }} />

        <div className="p-7">
          {/* Header row */}
          <div className="flex items-start justify-between gap-3 mb-1">
            <span
              className="text-xs font-semibold px-3 py-1 rounded-full"
              style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}
            >
              {item.category}
            </span>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full flex items-center justify-center transition-opacity hover:opacity-70 flex-shrink-0"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>

          {/* Time */}
          <p className="text-xs font-bold mb-3 gradient-text">{item.time}</p>

          {/* Title */}
          <h3 className="text-xl font-black mb-4 leading-tight" style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            {item.title}
          </h3>

          {/* Description */}
          <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
            {item.description}
          </p>

          {/* Speaker */}
          {item.speaker && (
            <div
              className="flex items-center gap-3 pt-4 rounded-2xl px-4 py-3"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
            >
              {!isSystem ? (
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, var(--accent), var(--accent-2))` }}
                >
                  {initials}
                </div>
              ) : (
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
              )}
              <div className="min-w-0">
                <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{item.speaker}</p>
                {item.role && <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>{item.role}</p>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function AgendaCard({ item, index, onClick }) {
  const [ref, visible] = useInView()
  const [hovered, setHovered] = useState(false)
  const colors = categoryColors[item.category] || categoryColors.Keynote
  const initials = item.speaker.split(' ').filter(Boolean).map(w => w[0]).join('').slice(0, 2).toUpperCase()
  const isSystem = systemSpeakers.includes(item.speaker)

  return (
    <div
      ref={ref}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-2xl p-6 flex gap-6 relative overflow-hidden cursor-pointer"
      style={{
        background: hovered ? colors.bg : 'var(--bg-card)',
        border: `1px solid ${hovered ? colors.border : 'var(--border)'}`,
        opacity: visible ? 1 : 0,
        transform: visible ? (hovered ? 'translateY(-3px) scale(1.005)' : 'translateY(0)') : 'translateY(24px)',
        transition: `
          opacity 0.5s ease ${index * 0.07}s,
          transform 0.25s ease,
          background 0.25s ease,
          border-color 0.25s ease,
          box-shadow 0.25s ease
        `,
        boxShadow: hovered ? `0 8px 32px ${colors.glow}` : 'none',
      }}
    >
      {/* Time column */}
      <div className="hidden md:flex flex-col items-center gap-2 min-w-[90px]">
        <span className="text-xs font-bold gradient-text whitespace-nowrap">
          {item.time.split('–')[0].trim()}
        </span>
        <div className="flex-1 w-px" style={{ background: 'var(--border)' }} />
        <span className="text-xs font-bold whitespace-nowrap" style={{ color: 'var(--text-muted)' }}>
          {item.time.split('–')[1]?.trim()}
        </span>
      </div>

      {/* Vertical divider */}
      <div className="hidden md:block w-px self-stretch" style={{ background: 'var(--border)' }} />

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
          <h3 className="text-base font-bold leading-tight pr-20 md:pr-0" style={{ color: 'var(--text-primary)' }}>
            {item.title}
          </h3>
          <span
            className="text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap flex-shrink-0"
            style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}
          >
            {item.category}
          </span>
        </div>

        {/* Mobile time */}
        <p className="text-xs font-semibold mb-2 md:hidden gradient-text">{item.time}</p>

        <p className="text-sm leading-relaxed mb-4 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
          {item.description}
        </p>

        {item.speaker && !isSystem ? (
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-2))' }}
            >
              {initials}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold truncate" style={{ color: 'var(--text-primary)' }}>{item.speaker}</p>
              {item.role && <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>{item.role}</p>}
            </div>
          </div>
        ) : item.speaker ? (
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{item.speaker}</p>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default function Agenda() {
  const [active, setActive] = useState('All')
  const [selected, setSelected] = useState(null)
  const [ref, visible] = useInView()

  const filtered = active === 'All' ? agenda : agenda.filter(a => a.category === active)

  return (
    <>
      {/* Popup modal */}
      {selected && <PopupCard item={selected} onClose={() => setSelected(null)} />}

      <section id="agenda" className="py-24 px-6" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <div
            ref={ref}
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-1 rounded" style={{ background: 'linear-gradient(90deg, var(--accent), var(--accent-2))' }} />
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--accent)' }}>
                Schedule
              </span>
            </div>
            <div className="flex items-end justify-between gap-4 flex-wrap mb-4">
              <h2 className="text-4xl md:text-5xl font-black" style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                AGENDA
              </h2>
              <div
                className="text-sm font-medium px-4 py-2 rounded-full"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
              >
                📅 November 13, 2024 · Marriott Resort, The Palm
              </div>
            </div>
          </div>

          {/* Filter pills */}
          <div
            className="flex flex-wrap gap-2 mb-8"
            style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.6s ease 0.2s' }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`tag-pill text-xs font-semibold px-4 py-2 rounded-full transition-all duration-200 ${active === cat ? 'active' : ''}`}
                style={{ cursor: 'pointer', fontFamily: 'var(--font-poppins)' }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Cards */}
          <div className="flex flex-col gap-4">
            {filtered.map((item, i) => (
              <AgendaCard
                key={item.id}
                item={item}
                index={i}
                onClick={() => setSelected(item)}
              />
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.93) translateY(12px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  )
}
