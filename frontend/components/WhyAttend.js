'use client'
import useInView from './useInView'

const reasons = [
  {
    num: '01',
    title: 'Cutting-Edge Insights',
    desc: 'Gain firsthand knowledge from top AI experts and pioneers shaping the supply chain industry.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Hands-On Learning',
    desc: 'Participate in interactive workshops, live demos, and deep-dive sessions to sharpen your skills.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 013 0m-3 6a1.5 1.5 0 000 3h6a5 5 0 005-5v-2a1.5 1.5 0 00-3 0v-1a1.5 1.5 0 00-3 0v-1a1.5 1.5 0 00-3 0v5.5"/>
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Exclusive Networking',
    desc: 'Connect with AI leaders, investors, startups, and fellow professionals at curated networking events.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Innovation Showcase',
    desc: 'Explore groundbreaking AI solutions, from emerging startups to tech giants redefining the future.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-2"/>
      </svg>
    ),
  },
]

function ReasonCard({ r, index }) {
  const [ref, visible] = useInView()

  return (
    <div
      ref={ref}
      className="card-hover rounded-2xl p-8 relative overflow-hidden"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.97)',
        transition: `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`,
      }}
    >
      {/* Big number bg */}
      <span
        className="absolute -top-4 -right-2 font-black text-8xl select-none pointer-events-none"
        style={{ color: 'var(--border)', lineHeight: 1 }}
      >
        {r.num}
      </span>

      {/* Icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
        style={{
          background: 'rgba(59,130,246,0.1)',
          border: '1px solid rgba(59,130,246,0.2)',
          color: 'var(--accent)',
        }}
      >
        {r.icon}
      </div>

      <h3 className="font-bold text-lg mb-3 relative" style={{ color: 'var(--text-primary)' }}>
        {r.title}
      </h3>
      <p className="text-sm leading-relaxed relative" style={{ color: 'var(--text-secondary)' }}>
        {r.desc}
      </p>
    </div>
  )
}

export default function WhyAttend() {
  const [ref, visible] = useInView()

  return (
    <section id="why" className="py-24 px-6" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          ref={ref}
          className="mb-16"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <span className="text-xs font-bold tracking-widest uppercase block mb-3" style={{ color: 'var(--accent)' }}>
            Value
          </span>
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <h2 className="text-4xl md:text-5xl font-black" style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              WHY <span className="gradient-text">ATTEND?</span>
            </h2>
            <p className="text-sm max-w-sm text-right hidden md:block" style={{ color: 'var(--text-muted)' }}>
              Discover why this is the must-attend event for AI professionals, innovators, and industry leaders.
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {reasons.map((r, i) => (
            <ReasonCard key={r.num} r={r} index={i} />
          ))}
        </div>

        {/* CTA band */}
        <div
          className="rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, var(--accent) 0%, #0090ff 50%, var(--accent-2) 100%)',
          }}
        >
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10"
            style={{ background: 'white', transform: 'translate(30%, -30%)' }} />
          <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full opacity-10"
            style={{ background: 'white', transform: 'translate(-30%, 30%)' }} />

          <p className="text-white text-xl md:text-2xl font-semibold leading-relaxed max-w-2xl mx-auto mb-8 relative">
            This is your opportunity to rethink your supply chain strategy, stay ahead of disruption,
            and lead with sustainable, data-driven solutions tailored to the region&apos;s needs.
          </p>
          <button
            className="bg-white font-bold px-10 py-4 rounded-xl text-sm transition-all duration-200 hover:opacity-90 hover:-translate-y-1"
            style={{ color: 'var(--accent)', fontFamily: 'var(--font-poppins)' }}
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Secure Your Spot Today
          </button>
        </div>
      </div>
    </section>
  )
}
