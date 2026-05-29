'use client'
import { useState, useEffect } from 'react'

const TARGET = new Date('2024-11-13T09:30:00')

function pad(n) { return String(n).padStart(2, '0') }

export default function Countdown() {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const calc = () => {
      const now = new Date()
      const diff = Math.max(0, TARGET - now)
      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      })
    }
    calc()
    const id = setInterval(calc, 1000)
    return () => clearInterval(id)
  }, [])

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
          <div
            className="countdown-digit w-20 h-20 flex items-center justify-center"
          >
            <span
              className="font-black text-3xl gradient-text"
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
