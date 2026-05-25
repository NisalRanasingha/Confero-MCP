'use client';
import { useReveal } from '@/lib/hooks';

const topics = [
  {
    id:    'A',
    title: 'Multi-Agent Orchestration',
    desc:  'Productionizing agentic frameworks at enterprise scale — from pilot to deployed, mission-critical AI systems.',
    accent: '#7c4dff',
    glow:   'rgba(124,77,255,0.2)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="5"  cy="19" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="19" cy="19" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 7.5L5 16.5M12 7.5L19 16.5M5 16.5L19 16.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id:    'B',
    title: 'Advanced RAG & Hallucination Elimination',
    desc:  'Retrieval-Augmented Generation techniques that deliver factual precision — architectural patterns that actually work.',
    accent: '#22d3ee',
    glow:   'rgba(34,211,238,0.18)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="13" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="3" y="13" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M13 17H21M17 13V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id:    'C',
    title: 'Open-Source Foundations & Privacy',
    desc:  'Localizing open-source LLMs within enterprise boundaries — compliance, data sovereignty, and privacy at scale.',
    accent: '#7c4dff',
    glow:   'rgba(124,77,255,0.2)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 3L21 8V16L12 21L3 16V8L12 3Z" stroke="currentColor" strokeWidth="1.5" fill="rgba(124,77,255,0.08)"/>
        <path d="M12 9V15M9 12H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id:    'D',
    title: 'Generative AI Data Stack',
    desc:  'Vector engines, streaming pipelines, and real-time data infrastructure powering production AI applications.',
    accent: '#22d3ee',
    glow:   'rgba(34,211,238,0.18)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="7" rx="8" ry="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M4 7V12C4 13.66 7.58 15 12 15C16.42 15 20 13.66 20 12V7" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M4 12V17C4 18.66 7.58 20 12 20C16.42 20 20 18.66 20 17V12" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    id:    'E',
    title: 'Cognitive ROI & Token Economics',
    desc:  'Evaluating model token costs against real business value — the financial framework for sustainable AI deployment.',
    accent: '#9b7dff',
    glow:   'rgba(155,125,255,0.18)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M3 17L9 11L13 15L21 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17 7H21V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

function TopicCard({ topic, visible, delay }) {
  return (
    <div
      className="topic-card glass rounded-2xl p-7 border border-[rgba(255,255,255,0.07)] relative overflow-hidden cursor-default"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {/* Background glow on hover (CSS via ::before in globals) */}
      <div className="relative z-10">
        {/* Tag */}
        <div className="flex items-center justify-between mb-6">
          <span
            className="w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-500"
            style={{ background: `${topic.accent}18`, border: `1px solid ${topic.accent}40`, color: topic.accent }}
          >
            {topic.id}
          </span>
          {/* Icon */}
          <span style={{ color: topic.accent, opacity: 0.7 }}>{topic.icon}</span>
        </div>

        <h3 className="font-display font-600 text-lg text-slate-100 mb-3 leading-snug">{topic.title}</h3>
        <p className="font-body text-sm text-slate-500 leading-relaxed">{topic.desc}</p>

        {/* Bottom line */}
        <div className="mt-6 pt-5 border-t border-[rgba(255,255,255,0.05)]">
          <span className="text-xs font-mono" style={{ color: topic.accent, opacity: 0.7 }}>Deep-dive session →</span>
        </div>
      </div>
    </div>
  );
}

export default function Topics() {
  const [ref, visible] = useReveal();

  return (
    <section id="topics" className="relative py-24">
      <div className="absolute inset-0 pointer-events-none grid-bg opacity-30" />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(124,77,255,0.04) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Header */}
        <div ref={ref} className={`mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex items-center gap-4 mb-8">
            <span className="section-label">04 — Key Topics</span>
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(124,77,255,0.3), transparent)' }} />
          </div>
          <h2 className="font-display font-700 text-4xl lg:text-5xl text-slate-100">
            What we'll
            <span className="gradient-text"> unpack together</span>
          </h2>
        </div>

        {/* Cards grid — 3 top, 2 bottom centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {topics.slice(0, 3).map((topic, i) => (
            <TopicCard key={topic.id} topic={topic} visible={visible} delay={100 + i * 120} />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:max-w-[calc(66.67%+0.5rem)]">
          {topics.slice(3).map((topic, i) => (
            <TopicCard key={topic.id} topic={topic} visible={visible} delay={460 + i * 120} />
          ))}
        </div>
      </div>
    </section>
  );
}
