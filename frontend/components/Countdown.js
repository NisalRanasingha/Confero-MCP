'use client'
import { useState, useEffect } from 'react'

const TARGET_DATE_STR = '2026-06-03T09:30:00'

function pad(n) { return String(n).padStart(2, '0') }

export default function Countdown() {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const target = new Date(TARGET_DATE_STR).getTime()

    const calc = () => {
      const now = new Date().getTime()
      const diff = Math.max(0, target - now)

      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      })
    }

    calc() // Run immediately on mount
    const id = setInterval(calc, 1000)
    
    return () => clearInterval(id)
  }, [])

  if (!mounted) {
    return (
      <div className="flex gap-4 justify-center flex-wrap opacity-0">
        {['DAYS', 'HOURS', 'MINUTES', 'SECONDS'].map((label) => (
          <div key={label} className="text-center">
            <div className="countdown-digit w-20 h-20 flex items-center justify-center">
              <span className="font-black text-3xl gradient-text">00</span>
            </div>
            <p className="text-xs font-semibold mt-2 tracking-widest" style={{ color: 'var(--text-muted)' }}>{label}</p>
          </div>
        ))}
      </div>
    )
  }

  const units = [
    { label: 'DAYS', value: time.days },
    { label: 'HOURS', value: time.hours },
    { label: 'MINUTES', value: time.minutes },
    { label: 'SECONDS', value: time.seconds },
  ]

  return (
    <div className="flex gap-4 justify-center flex-wrap">
      {units.map(({ label, value }) => (
        <div key={label} className="text-center">
          <div className="countdown-digit w-20 h-20 flex items-center justify-center">
            <span
              className="font-black text-3xl gradient-text animate-none"
              key={value}
              style={{ fontVariantNumeric: 'tabular-nums' }}
            >
              {pad(value)}
            </span>
          </div>
          <p className="text-xs font-semibold mt-2 tracking-widest" style={{ color: 'var(--text-muted)' }}>
            {label}
          </p>
        </div>
      ))}
    </div>
  )
}