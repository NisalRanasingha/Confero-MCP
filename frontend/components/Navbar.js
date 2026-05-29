'use client'
import { useState, useEffect } from 'react'
import { Sun, Moon, Menu, X } from 'lucide-react'

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Home', href: '#hero' },
    { label: 'Agenda', href: '#agenda' },
    { label: 'Speakers', href: '#speakers' },
    { label: 'Why Attend', href: '#why' },
    { label: 'Contact', href: '#contact' },
  ]

  const scrollTo = (href) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'nav-glass py-3' : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-2))' }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2 14 L9 4 L16 14 Z" stroke="white" strokeWidth="1.5" fill="none"/>
              <circle cx="9" cy="9" r="2" fill="white"/>
            </svg>
          </div>
          <span
            className="font-bold text-lg tracking-tight"
            style={{ color: 'var(--text-primary)' }}
          >
            accel<span className="gradient-text">alpha</span>
          </span>
        </div>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.label}>
              <button
                onClick={() => scrollTo(l.href)}
                className="text-sm font-medium transition-colors duration-200 hover:opacity-80"
                style={{ color: 'var(--text-secondary)', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
            style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            className="hidden md:block btn-primary px-5 py-2 text-sm"
            onClick={() => scrollTo('#contact')}
          >
            Get Invitation
          </button>
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-full"
            style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden nav-glass mt-2 mx-4 rounded-2xl p-6 flex flex-col gap-4"
          style={{ border: '1px solid var(--border)' }}
        >
          {links.map((l) => (
            <button
              key={l.label}
              onClick={() => scrollTo(l.href)}
              className="text-left text-sm font-medium py-2 transition-colors hover:opacity-70"
              style={{ color: 'var(--text-primary)', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              {l.label}
            </button>
          ))}
          <button
            className="btn-primary px-5 py-2 text-sm mt-2"
            onClick={() => scrollTo('#contact')}
          >
            Get Invitation
          </button>
        </div>
      )}
    </nav>
  )
}
