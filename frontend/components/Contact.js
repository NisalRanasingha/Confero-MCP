'use client'
import { useState, useEffect } from 'react'
import useInView from './useInView'

const focusOptions = [
  { value: '', label: 'Select your professional focus' },
  { value: 'Digital Logistics & Supply Chain Strategy', label: 'Digital Logistics & Supply Chain Strategy' },
  { value: 'SCM Platform Implementation & Integration', label: 'SCM Platform Implementation & Integration' },
  { value: 'AI & Predictive Analytics in Supply Chain', label: 'AI & Predictive Analytics in Supply Chain' },
  { value: 'Corporate Digital Transformation & Automation', label: 'Corporate Digital Transformation & Automation' },
  { value: 'Panel Insights: Sustainability & Green Operations', label: 'Sustainability & Green Operations' },
  { value: 'Networking & Business Development', label: 'Networking & Business Development' },
  { value: 'Executive Leadership & Strategic Operations', label: 'Executive Leadership & Strategic Operations' },
]

function FieldError({ msg }) {
  if (!msg) return null
  return (
    <p className="text-xs mt-1.5 flex items-center gap-1" style={{ color: '#ef4444' }}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
      </svg>
      {msg}
    </p>
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', focus: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [apiResult, setApiResult] = useState(null)
  const [apiError, setApiError] = useState('')
  const [ref, visible] = useInView()

  // Auto-reset: close modal after 10 seconds
  useEffect(() => {
    if (status === 'success') {
      const timer = setTimeout(() => {
        setStatus('idle')
        setApiResult(null)
      }, 10000)
      return () => clearTimeout(timer)
    }
  }, [status])

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (status === 'success') {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [status])

  const validate = () => {
    const e = {}
    if (!form.name.trim()) {
      e.name = 'Full name is required.'
    } else if (form.name.trim().length < 2) {
      e.name = 'Name must be at least 2 characters.'
    } else if (form.name.trim().length > 50) {
      e.name = 'Name must be under 50 characters.'
    }

    if (!form.email.trim()) {
      e.email = 'Email address is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      e.email = 'Please enter a valid email address.'
    }

    if (!form.focus) {
      e.focus = 'Please select your professional focus.'
    }

    return e
  }

  const handleChange = (field, value) => {
    setForm(f => ({ ...f, [field]: value }))
    if (errors[field]) setErrors(e => ({ ...e, [field]: '' }))
  }

  const handleSubmit = async () => {
    const e = validate()
    if (Object.keys(e).length > 0) {
      setErrors(e)
      return
    }

    setStatus('loading')
    setApiError('')
    setApiResult(null)

    try {
      const res = await fetch('https://event-managment-p7m8.onrender.com/api/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          interest: form.focus,
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.detail || `Server error: ${res.status}`)
      }

      const data = await res.json()
      setApiResult(data)
      setStatus('success')
      setForm({ name: '', email: '', focus: '' })
    } catch (err) {
      setApiError(err.message || 'Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  const closeModal = () => {
    setStatus('idle')
    setApiResult(null)
  }

  const offices = [
    { region: 'Middle East & Africa HQ', address: 'Office No: 209, The Metropolis Tower, Business Bay, Dubai, UAE' },
    { region: 'Asia Pacific HQ', address: '2nd Floor Green Lanka Tower, Colombo, Sri Lanka' },
    { region: 'Saudi Arabia HQ', address: 'Riyadh, Saudi Arabia' },
  ]

  return (
    <>
      {/* ── Success Modal Overlay ── */}
      {status === 'success' && apiResult && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 50,
            background: 'rgba(0, 0, 0, 0.65)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            backdropFilter: 'blur(2px)',
          }}
          onClick={(e) => { if (e.target === e.currentTarget) closeModal() }}
        >
          <div
            className="rounded-3xl p-8 text-center w-full"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              maxWidth: '400px',
              animation: 'modalIn 0.25s ease',
            }}
          >
            {/* Animated check circle */}
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{ background: 'rgba(16,185,129,0.15)' }}
            >
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            </div>

            <h3 className="text-xl font-black mb-2" style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              Invitation Generated!
            </h3>
            <p className="text-sm mb-5 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Your personalised invitation has been matched and drafted. Check your inbox shortly.
            </p>

            {/* Draft preview box */}
            <div
              className="rounded-2xl p-4 mb-5 text-left"
              style={{
                background: 'rgba(16,185,129,0.06)',
                border: '1px solid rgba(16,185,129,0.2)',
              }}
            >
              <p
                className="text-xs leading-relaxed whitespace-pre-wrap"
                style={{
                  color: 'var(--text-secondary)',
                  maxHeight: '130px',
                  overflowY: 'auto',
                }}
              >
                {apiResult.matched_draft}
              </p>
              {apiResult.pipeline_status && (
                <p className="text-xs mt-2 font-mono" style={{ color: 'var(--text-muted)' }}>
                  ✓ {apiResult.pipeline_status}
                </p>
              )}
            </div>

            {/* CTA button */}
            <button
              className="btn-primary py-3.5 text-sm w-full flex items-center justify-center gap-2"
              onClick={closeModal}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 5l-7 7 7 7"/>
              </svg>
              Go back to form
            </button>

            {/* Auto-close hint */}
            <p className="text-xs mt-3" style={{ color: 'var(--text-muted)' }}>
              Auto-closes in 10 seconds
            </p>
          </div>
        </div>
      )}

      {/* ── Main Section ── */}
      <section id="contact" className="py-24 px-6" style={{ background: 'var(--bg-secondary)' }}>
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
              Connect
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-3" style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              WE&apos;RE HERE TO <span className="gradient-text">ASSIST YOU</span>
            </h2>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Fill in your details and our AI will match you to the most relevant session and generate your personalised invitation.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">

            {/* ── Form Card ── */}
            <div
              className="rounded-3xl p-8"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(24px)',
                transition: 'opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s',
              }}
            >
              <h3 className="font-bold text-lg mb-1" style={{ color: 'var(--text-primary)' }}>
                Get Your Invitation
              </h3>
              <p className="text-xs mb-6" style={{ color: 'var(--text-muted)' }}>
                AI-powered session matching · Personalised email draft
              </p>

              {/* Error banner */}
              {status === 'error' && (
                <div
                  className="rounded-xl p-4 mb-5 flex items-start gap-3"
                  style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.3)' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#ef4444" className="flex-shrink-0 mt-0.5">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                  </svg>
                  <p className="text-xs leading-relaxed" style={{ color: '#ef4444' }}>{apiError}</p>
                </div>
              )}

              {/* Form fields */}
              <div className="flex flex-col gap-5">
                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--text-muted)' }}>
                    Full Name <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    className="form-input"
                    placeholder="e.g. Nisal Ranasinghe"
                    value={form.name}
                    onChange={e => handleChange('name', e.target.value)}
                    style={{ borderColor: errors.name ? '#ef4444' : undefined }}
                    disabled={status === 'loading'}
                  />
                  <FieldError msg={errors.name} />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--text-muted)' }}>
                    Work Email <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    className="form-input"
                    type="email"
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={e => handleChange('email', e.target.value)}
                    style={{ borderColor: errors.email ? '#ef4444' : undefined }}
                    disabled={status === 'loading'}
                  />
                  <FieldError msg={errors.email} />
                </div>

                {/* Professional Focus */}
                <div>
                  <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--text-muted)' }}>
                    Professional Focus <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <div className="relative">
                    <select
                      className="form-input"
                      value={form.focus}
                      onChange={e => handleChange('focus', e.target.value)}
                      style={{
                        cursor: 'pointer',
                        appearance: 'none',
                        paddingRight: '36px',
                        borderColor: errors.focus ? '#ef4444' : undefined,
                      }}
                      disabled={status === 'loading'}
                    >
                      {focusOptions.map(o => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 9l6 6 6-6"/>
                      </svg>
                    </div>
                  </div>
                  <FieldError msg={errors.focus} />
                  {form.focus && (
                    <p className="text-xs mt-1.5 flex items-center gap-1" style={{ color: 'var(--accent)' }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                      </svg>
                      AI will match you to the best session for this focus
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  className="btn-primary py-3.5 text-sm mt-1 flex items-center justify-center gap-2 relative overflow-hidden"
                  onClick={handleSubmit}
                  disabled={status === 'loading'}
                  style={{ opacity: status === 'loading' ? 0.85 : 1 }}
                >
                  {status === 'loading' ? (
                    <>
                      <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                        <path d="M21 12a9 9 0 11-6.219-8.56"/>
                      </svg>
                      Generating your invitation…
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                      </svg>
                      Generate My Invitation
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* ── Info Column ── */}
            <div
              className="flex flex-col gap-6"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(24px)',
                transition: 'opacity 0.6s ease 0.25s, transform 0.6s ease 0.25s',
              }}
            >
              {/* How it works */}
              <div className="rounded-2xl p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                <h4 className="font-bold text-sm mb-4" style={{ color: 'var(--text-primary)' }}>How It Works</h4>
                <div className="flex flex-col gap-4">
                  {[
                    { step: '01', text: 'Fill in your name, email, and professional focus area.' },
                    { step: '02', text: 'Our AI matches your profile to the most relevant agenda session.' },
                    { step: '03', text: 'A personalised invitation is drafted and sent to your inbox.' },
                  ].map(s => (
                    <div key={s.step} className="flex items-start gap-3">
                      <span
                        className="text-xs font-black flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center"
                        style={{ background: 'rgba(59,130,246,0.1)', color: 'var(--accent)' }}
                      >
                        {s.step}
                      </span>
                      <p className="text-xs leading-relaxed pt-1" style={{ color: 'var(--text-secondary)' }}>{s.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div className="rounded-2xl p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                <h4 className="font-bold text-sm mb-4" style={{ color: 'var(--text-primary)' }}>Contact Us</h4>
                <div className="flex flex-col gap-3">
                  <a href="tel:+94714576039" className="flex items-center gap-3 text-sm transition-opacity hover:opacity-70" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(59,130,246,0.1)', color: 'var(--accent)' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.07 8.8a19.79 19.79 0 01-3.07-8.67A2 2 0 013 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L7.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/>
                      </svg>
                    </div>
                    +9471 457 6039 / +9471 564 3524
                  </a>
                  <a href="mailto:partnership@cogentsolution.ae" className="flex items-center gap-3 text-sm transition-opacity hover:opacity-70" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(59,130,246,0.1)', color: 'var(--accent)' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                      </svg>
                    </div>
                    partnership@cogentsolution.ae
                  </a>
                </div>
              </div>

              {/* Offices */}
              <div className="rounded-2xl p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                <h4 className="font-bold text-sm mb-4" style={{ color: 'var(--text-primary)' }}>Our Offices</h4>
                <div className="flex flex-col gap-4">
                  {offices.map(o => (
                    <div key={o.region} className="flex gap-3 items-start">
                      <div className="mt-0.5 flex-shrink-0" style={{ color: 'var(--accent)' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs font-semibold mb-0.5" style={{ color: 'var(--text-primary)' }}>{o.region}</p>
                        <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>{o.address}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal entrance animation */}
      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.93) translateY(12px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </>
  )
}