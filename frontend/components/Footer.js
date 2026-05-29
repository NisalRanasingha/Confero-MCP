'use client'
import { useState } from 'react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subbed, setSubbed] = useState(false)

  const subscribe = () => {
    if (email) { setSubbed(true); setEmail('') }
  }

  const links = {
    Event: ['Agenda', 'Speakers', 'Register', 'FAQ'],
    Legal: ['Terms & Conditions', 'Privacy Policy', 'Cookie Policy'],
  }

  return (
    <footer
      className="pt-16 pb-8 px-6"
      style={{ background: 'var(--bg-primary)', borderTop: '1px solid var(--border)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-2))' }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M2 14 L9 4 L16 14 Z" stroke="white" strokeWidth="1.5" fill="none"/>
                  <circle cx="9" cy="9" r="2" fill="white"/>
                </svg>
              </div>
              <span className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
                Cogent Solutions™
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-xs" style={{ color: 'var(--text-muted)' }}>
              Through our conferences we transform your business challenges into opportunities.
              Our clients are leading government entities and Fortune 500 companies.
            </p>

            {/* Newsletter */}
            <div>
              <p className="text-xs font-semibold mb-3 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                Stay Updated
              </p>
              <div className="flex gap-2">
                <input
                  className="form-input flex-1 text-xs py-2.5 px-3"
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && subscribe()}
                />
                <button
                  className="btn-primary px-4 py-2.5 text-xs whitespace-nowrap"
                  onClick={subscribe}
                >
                  {subbed ? '✓' : 'Subscribe'}
                </button>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([cat, items]) => (
            <div key={cat}>
              <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: 'var(--text-muted)' }}>
                {cat}
              </p>
              <ul className="flex flex-col gap-3">
                {items.map(item => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm transition-colors hover:opacity-70"
                      style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            © 2026 Cogent Solutions Event Management LLC. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            {/* Social icons */}
            {['twitter', 'linkedin', 'instagram'].map(soc => (
              <a
                key={soc}
                href="#"
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
                aria-label={soc}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  {soc === 'twitter' && <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>}
                  {soc === 'linkedin' && <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z"/>}
                  {soc === 'instagram' && <><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" fill="var(--bg-secondary)"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="var(--bg-secondary)" strokeWidth="2"/></>}
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
