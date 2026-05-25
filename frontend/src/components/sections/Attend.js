'use client';
import { useReveal } from '@/lib/hooks';

const attendees = [
  { title: 'Chief Technology Officers (CTOs) & Chief Information Officers (CIOs)',   desc: 'Setting the enterprise technology agenda and AI investment strategy.',          icon: '01' },
  { title: 'VPs of Engineering & Enterprise Software Architects',                     desc: 'Responsible for designing scalable, production-grade AI systems.',              icon: '02' },
  { title: 'AI/ML Engineering Leads & Data Scientists',                               desc: 'Building, training, and deploying intelligent model pipelines.',               icon: '03' },
  { title: 'Technical Product Managers & Innovation Directors',                       desc: 'Bridging AI capability with enterprise product and business roadmaps.',         icon: '04' },
  { title: 'Enterprise Infrastructure & DevOps Specialists',                          desc: 'Managing the compute, reliability, and deployment backbone for AI.',            icon: '05' },
];

export default function Attend({ onOpenModal }) {
  const [ref, visible] = useReveal();

  return (
    <section id="attend" className="relative py-24">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, transparent, rgba(6,182,212,0.025) 50%, transparent)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={ref} className={`mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex items-center gap-4 mb-8">
            <span className="section-label">05 — Who Should Attend</span>
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(124,77,255,0.3), transparent)' }} />
          </div>
          <h2 className="font-display font-700 text-4xl lg:text-5xl text-slate-100">
            Built for the <span className="gradient-text">decision-makers</span>
          </h2>
        </div>

        <div className="space-y-3">
          {attendees.map((item, i) => (
            <div
              key={item.title}
              className="group flex items-start gap-6 glass rounded-xl px-7 py-6 border border-[rgba(255,255,255,0.07)] hover:border-[rgba(124,77,255,0.25)] transition-all duration-300"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateX(0)' : 'translateX(-16px)',
                transition: `opacity 0.6s ease ${100 + i * 100}ms, transform 0.6s ease ${100 + i * 100}ms, border-color 0.3s ease`,
              }}
            >
              <span className="font-mono text-xs font-500 mt-1 flex-shrink-0 w-7 text-center" style={{ color: 'rgba(124,77,255,0.5)' }}>{item.icon}</span>
              <div className="w-px self-stretch bg-[rgba(255,255,255,0.06)] group-hover:bg-violet-500 transition-colors duration-300" />
              <div className="flex-1">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center" style={{ background: 'rgba(124,77,255,0.15)', border: '1px solid rgba(124,77,255,0.3)' }}>
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1.5 4L3 5.5L6.5 2" stroke="#9b7dff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <div>
                    <p className="font-body font-500 text-slate-200 text-base mb-1">{item.title}</p>
                    <p className="font-body text-sm text-slate-500">{item.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
