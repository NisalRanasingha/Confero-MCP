'use client'
import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Agenda from '../components/Agenda'
import Speakers from '../components/Speakers'
import WhyAttend from '../components/WhyAttend'
import Testimonials from '../components/Testimonials'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function Home() {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    // Try to detect system preference first
    const stored = localStorage.getItem('tw-theme')
    if (stored) {
      setTheme(stored)
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      setTheme('light')
    }
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('tw-theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  return (
    <main>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Hero />
      <div className="section-divider" />
      <Agenda />
      <div className="section-divider" />
      <Speakers />
      <div className="section-divider" />
      <WhyAttend />
      <div className="section-divider" />
      <Testimonials />
      <div className="section-divider" />
      <Contact />
      <Footer />
    </main>
  )
}
