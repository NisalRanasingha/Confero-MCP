'use client';
import { useReveal } from '@/lib/hooks';
import { useState, useEffect, useRef } from 'react';

const demographics = [
  {
    role:    'Chief Technology Officers & VPs of Engineering',
    pct:     55,
    color:   '#7c4dff',
    glow:    'rgba(124,77,255,0.4)',
  },
  {
    role:    'Enterprise Product Managers & Tech Founders',
    pct:     25,
    color:   '#22d3ee',
    glow:    'rgba(34,211,238,0.4)',
  },
  {
    role:    'Data Directors & AI Architects',
    pct:     20,
    color:   '#9b7dff',
    glow:    'rgba(155,125,255,0.35)',
  },
];

function BarRow({ item, visible, delay }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setWidth(item.pct), delay);
    return () => clearTimeout(t);
  }, [visible, item.pct, delay]);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      <div className="flex items-end justify-between mb-2.5">
        <span className="font-body text-sm text-slate-300">{item.role}</span>
        <span
          className="font-display font-700 text-2xl tabular-nums"
          style={{ color: item.color }}
        >
          {item.pct}%
        </span>
      </div>

      {/* Track */}
      <div className="w-full h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <div
          className="h-full rounded-full transition-all duration-1200 ease-out"
          style={{
            width: `${width}%`,
            background: `linear-gradient(90deg, ${item.color} 0%, ${item.color}88 100%)`,
            boxShadow: `0 0 8px ${item.glow}`,
            transitionDuration: '1.2s',
          }}
        />
      </div>
    </div>
  );
}

export default function Audience() {
  const [ref, visible] = useReveal();

  return (
    <section className="relative py-24">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, transparent, rgba(6,182,212,0.02) 50%, transparent)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={ref} className={`flex items-center gap-4 mb-16 transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          <span className="section-label">03 — The Room</span>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(124,77,255,0.3), transparent)' }} />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — demographic bars */}
          <div>
            <h2 className="font-display font-700 text-3xl lg:text-4xl text-slate-100 mb-3">
              Who will be
              <span className="gradient-text-violet"> in the room</span>
            </h2>
            <p className="font-body text-slate-500 text-sm mb-10">Audience demographic breakdown</p>

            <div className="space-y-8">
              {demographics.map((item, i) => (
                <BarRow key={item.role} item={item} visible={visible} delay={200 + i * 180} />
              ))}
            </div>
          </div>

          {/* Right — corporate scale card */}
          <div
            className="glass rounded-2xl p-10 border border-[rgba(255,255,255,0.07)] relative overflow-hidden"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s ease 400ms, transform 0.7s ease 400ms',
            }}
          >
            {/* Corner glow */}
            <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full opacity-15" style={{ background: 'radial-gradient(circle, rgba(124,77,255,0.8) 0%, transparent 70%)' }} />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8" style={{ background: 'rgba(124,77,255,0.12)', border: '1px solid rgba(124,77,255,0.25)' }}>
                <span className="section-label text-violet-400">Corporate Scale</span>
              </div>

              <p className="font-body text-slate-300 text-base leading-[1.9] mb-10">
                Attendees hail from fast-growing scale-ups, leading regional tech hubs, and Tier-1
                banking, logistics, and telecom enterprises.
              </p>

              {/* Sector pills */}
              <div className="flex flex-wrap gap-2">
                {['Banking & Fintech', 'Logistics & Supply Chain', 'Telecom', 'SaaS Scale-ups', 'Regional Tech Hubs', 'Enterprise Software'].map((sector) => (
                  <span
                    key={sector}
                    className="px-3 py-1.5 rounded-lg text-xs font-body text-slate-400"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    {sector}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
