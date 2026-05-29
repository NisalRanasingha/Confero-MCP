'use client'
import { useState } from 'react'
import useInView from './useInView'

const testimonials = [
  {
    quote: 'This summit opened my eyes to the future of AI and how it will shape industries.',
    name: 'Mark Vandenberg',
    title: 'CTO, NeuralTech',
    initials: 'MV',
    color: '#3b82f6',
    heading: 'Game Changing Insights',
  },
  {
    quote: 'Incredible speakers, top-tier networking, and cutting-edge discussions all in one place.',
    name: 'Elena Rojas',
    title: 'AI Researcher, DeepMind',
    initials: 'ER',
    color: '#10b981',
    heading: 'The Best AI Event!',
  },
  {
    quote: 'From hands-on workshops to visionary talks, this summit is a must-attend for AI professionals.',
    name: 'David Laurent',
    title: 'CEO, FutureAI Labs',
    initials: 'DL',
    color: '#a855f7',
    heading: 'Unmatched Opportunities',
  },
]

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const [ref, visible] = useInView()

  return (
    <section className="py-24 px-6" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-6xl mx-auto">
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
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-black" style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            WHAT PAST <span className="gradient-text">ATTENDEES</span> SAY
          </h2>
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} t={t} index={i} />
          ))}
        </div>

        {/* Mobile slider */}
        <div className="md:hidden">
          <TestimonialCard t={testimonials[active]} index={0} />
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="w-2 h-2 rounded-full transition-all duration-200"
                style={{
                  background: i === active ? 'var(--accent)' : 'var(--border)',
                  width: i === active ? '20px' : '8px',
                  border: 'none',
                  cursor: 'pointer',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ t, index }) {
  const [ref, visible] = useInView()

  return (
    <div
      ref={ref}
      className="testimonial-card rounded-2xl p-6 flex flex-col gap-4"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`,
      }}
    >
      {/* Heading */}
      <p className="font-black text-sm uppercase tracking-wide gradient-text">{t.heading}</p>

      {/* Stars */}
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="var(--accent)">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        ))}
      </div>

      {/* Quote */}
      <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--text-secondary)' }}>
        &ldquo;{t.quote}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
          style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}88)` }}
        >
          {t.initials}
        </div>
        <div>
          <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{t.name}</p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{t.title}</p>
        </div>
      </div>
    </div>
  )
}
