'use client'
import { useEffect, useRef } from 'react'
import Countdown from './Countdown'

export default function Hero() {
  const heroRef = useRef(null)

  useEffect(() => {
    const items = heroRef.current?.querySelectorAll('[data-animate]')
    items?.forEach((el) => el.classList.add('animate-fade-up'))
  }, [])

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-24 pb-16"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* Grid background */}
      <div className="absolute inset-0 hero-grid pointer-events-none" />

      {/* Floating decorative blobs */}
      <div
        className="absolute top-20 right-10 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,71,255,0.12) 0%, transparent 70%)',
          animation: 'float 7s ease-in-out infinite',
        }}
      />
      <div
        className="absolute bottom-20 left-10 w-60 h-60 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,212,255,0.1) 0%, transparent 70%)',
          animation: 'float 9s ease-in-out infinite reverse',
        }}
      />

      {/* Decorative SVG wave */}
      <svg
        className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none opacity-10"
        width="500" height="500" viewBox="0 0 500 500"
      >
        <circle cx="250" cy="250" r="200" fill="none" stroke="var(--accent)" strokeWidth="1" strokeDasharray="8 8"
          style={{ animation: 'float 12s linear infinite' }} />
        <circle cx="250" cy="250" r="140" fill="none" stroke="var(--accent-2)" strokeWidth="1" strokeDasharray="4 12"
          style={{ animation: 'float 8s linear infinite reverse' }} />
        <circle cx="250" cy="250" r="80" fill="none" stroke="var(--accent)" strokeWidth="0.5" />
      </svg>

      <div className="relative max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left column */}
          <div>
            {/* Badge */}
            <div
              data-animate
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-8 stagger-1"
              style={{
                background: 'rgba(59,130,246,0.1)',
                border: '1px solid rgba(59,130,246,0.3)',
                color: 'var(--accent)',
              }}
            >
              <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
              NOVEMBER 13, 2024 · 9:30 AM – 1:00 PM
            </div>

            {/* Title */}
            <h1
              data-animate
              className="text-5xl md:text-7xl font-black leading-none mb-4 stagger-2"
              style={{ color: 'var(--text-primary)', letterSpacing: '-0.03em' }}
            >
              TROUBLED
              <br />
              <span className="gradient-text">WATERS</span>
              <span style={{ color: 'var(--text-primary)' }}>:</span>
            </h1>

            <p
              data-animate
              className="text-xl font-light mb-6 stagger-3"
              style={{ color: 'var(--text-secondary)' }}
            >
              Sailing with AI in Supply Chain
            </p>

            {/* Location badge */}
            <div
              data-animate
              className="flex items-center gap-2 mb-8 stagger-4"
              style={{ color: 'var(--text-muted)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span className="text-sm font-medium">Marriott Resort, The Palm</span>
            </div>

            <p
              data-animate
              className="text-base leading-relaxed mb-10 stagger-4"
              style={{ color: 'var(--text-secondary)', maxWidth: '500px' }}
            >
              The Gulf&apos;s supply chains are under pressure from rising costs, geopolitical
              instability, and shifting sustainability mandates. AI-powered SCM and WMS solutions
              are key to future-proofing logistics.
            </p>

            <div
              data-animate
              className="flex flex-wrap gap-4 stagger-5"
            >
              <button
                className="btn-primary px-8 py-3 text-sm flex items-center gap-2"
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span>Generate Invitation</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
              <button
                className="btn-outline px-8 py-3 text-sm"
                onClick={() => document.querySelector('#agenda')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Agenda
              </button>
            </div>
          </div>

          {/* Right column - Countdown */}
          <div data-animate className="stagger-3">
            <div
              className="rounded-3xl p-8 md:p-10 text-center"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                boxShadow: '0 40px 100px rgba(0,71,255,0.08)',
              }}
            >
              <p className="text-xs font-bold tracking-widest mb-2 uppercase" style={{ color: 'var(--accent)' }}>
                Count Every Second
              </p>
              <h2 className="text-lg font-semibold mb-8" style={{ color: 'var(--text-primary)' }}>
                Until the Event
              </h2>
              <Countdown />

              {/* Hosted by */}
              <div
                className="mt-8 pt-8 flex items-center justify-center gap-6"
                style={{ borderTop: '1px solid var(--border)' }}
              >
                <span className="text-xs font-semibold tracking-wider uppercase" style={{ color: 'var(--text-muted)' }}>
                  Hosted by
                </span>
                <span
                  className="font-black text-lg tracking-tight gradient-text"
                >
                  Accelalpha
                </span>
                <span style={{ color: 'var(--border)' }}>×</span>
                <span
                  className="font-bold text-lg"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Oracle
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
