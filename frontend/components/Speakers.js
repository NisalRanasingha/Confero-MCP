'use client'
import { useState } from 'react'
import useInView from './useInView'

const speakers = [
   {
    name: 'Dr. Raman Kumar',
    role: 'CEO',
    org: 'Al-Futtaim Logistics',
    color: '#14b8a6',
    session: 'Insights from Digital Evolution',
    image: '/3.png',
  },
  {
    name: 'Richard Buxton',
    role: 'VP EMEA',
    org: 'Accelalpha',
    color: '#3b82f6',
    session: 'Welcome Note',
    image: '/4.png',
  },
  {
    name: 'Rohan Chitnis',
    role: 'Sales Director Applications',
    org: 'Oracle',
    color: '#f97316',
    session: 'Welcome Note',
    image: '/8.png',
  },
  {
    name: 'Srivatsav Sarvepalli',
    role: 'Regional Director, Supply Chain Solutions, ECEMEA',
    org: 'Oracle',
    color: '#10b981',
    session: 'Industry Keynote',
    image: '/6.png',
  },
  {
    name: 'Joe Spear',
    role: 'Partner',
    org: 'Accelalpha',
    color: '#6366f1',
    session: 'Practical Guide to Implementation',
    image: '/2.png',
  },
  {
    name: 'Ujjwal Kumar',
    role: 'Principal Domain Lead, ECEMEA',
    org: 'Oracle',
    color: '#ec4899',
    session: 'The Resilient Supply Chain & SCM Innovations',
    image: '/7.png',
  },
  {
    name: 'David Moono',
    role: 'Global Logistics Manager',
    org: 'Weatherford',
    color: '#f59e0b',
    session: 'Strategies in Action Panel',
    image: '/1.png',
  },
  {
    name: 'Tamer Hamed',
    role: 'CIO',
    org: 'Dubai Cable Company',
    color: '#a855f7',
    session: 'Strategies in Action Panel',
    image: '/5.png',
  },
]

function SpeakerCard({ sp, index }) {
  const [ref, visible] = useInView()

  return (
    <div
      ref={ref}
      className="group relative overflow-hidden aspect-[4/5] rounded-[2rem] cursor-pointer"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.6s ease, transform 0.6s ease`,
      }}
    >
      <img
        src={sp.image}
        alt={sp.name}
        className="w-full h-full object-cover grayscale contrast-[1.1] transition-all duration-500 ease-out group-hover:scale-105 group-hover:grayscale-0"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-0" />

      {/* Sliding Dark Gradient Overlay + Text Panel */}
      <div 
        className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0"
      >
        {/* Text Details */}
        <div className="transform translate-y-4 opacity-0 transition-all duration-500 delay-100 group-hover:translate-y-0 group-hover:opacity-100">
          <p className="text-[10px] font-bold uppercase tracking-wider mb-1 text-gray-300">
            {sp.org}
          </p>
          <h3 className="text-xl font-black leading-tight mb-1 text-white">
            {sp.name}
          </h3>
          <p className="text-xs font-semibold mb-4" style={{ color: sp.color }}>
            {sp.role}
          </p>
          
          {/* Session Tag */}
          <div
            className="text-xs px-3 py-1.5 rounded-full inline-block leading-tight"
            style={{
              background: `${sp.color}25`,
              color: sp.color,
              border: `1px solid ${sp.color}40`,
            }}
          >
            {sp.session}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Speakers() {
  const [ref, visible] = useInView()
  const [showAll, setShowAll] = useState(false)

  const visibleSpeakers = showAll ? speakers : speakers.slice(0, 4)

  return (
    <section id="speakers" className="py-24 px-6 md:px-12" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-6xl mx-auto w-full">
        
        {/* Header Layout (Aligned like your design image) */}
        <div
          ref={ref}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <div>
            <span className="text-xs font-bold tracking-widest uppercase block mb-3" style={{ color: 'var(--accent)' }}>
              Industry Leaders
            </span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.95]" style={{ color: 'var(--text-primary)' }}>
              KEYNOTE <br />
              <span className="gradient-text">SPEAKERS</span>
            </h2>
          </div>
          <div className="max-w-xs">
            <p className="text-sm md:text-base font-light leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Meet the industry leaders shaping the future of AI.
            </p>
          </div>
        </div>

        {/* Speakers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleSpeakers.map((sp, i) => (
            <SpeakerCard key={sp.name} sp={sp} index={i} />
          ))}
        </div>

        {/* And More Button */}
        {!showAll && (
          <div className="mt-12 flex justify-start">
            <button 
              onClick={() => setShowAll(true)}
              className="flex items-center gap-2 px-6 py-3 border rounded-full text-sm font-medium transition-colors duration-300 group hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)]"
              style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
            >
              And more
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={2} 
                stroke="currentColor" 
                className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </button>
          </div>
        )}

      </div>
    </section>
  )
}