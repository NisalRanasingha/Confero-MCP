'use client';
import { useState, useCallback, useEffect } from 'react';

const INITIAL = { name: '', email: '', focus: '' };

const FOCUS_OPTIONS = [
  'Multi-Agent Orchestration',
  'Advanced RAG & LLM Reliability',
  'Generative AI Data Stack',
  'AI Governance & Compliance',
  'Cognitive ROI & Token Economics',
  'Open-Source LLM Localisation',
  'Enterprise AI Infrastructure',
  'General AI Strategy',
];

function validate(fields) {
  const errs = {};
  if (!fields.name.trim())  errs.name  = 'Full name is required';
  if (!fields.email.trim()) errs.email = 'Work email is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
    errs.email = 'Enter a valid email address';
  if (!fields.focus) errs.focus = 'Please select your focus area';
  return errs;
}

export default function RegisterModal({ open, onClose }) {
  const [fields,  setFields]  = useState(INITIAL);
  const [errors,  setErrors]  = useState({});
  const [touched, setTouched] = useState({});
  const [status,  setStatus]  = useState('idle');
  // 🧠 AI එකෙන් එන Email Draft එක තියාගන්න වෙනම State එකක් හැදුවා මචං
  const [aiDraft, setAiDraft] = useState('');

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // Reset form when modal closes
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setFields(INITIAL);
        setErrors({});
        setTouched({});
        setStatus('idle');
        setAiDraft(''); // Modal එක වහද්දී AI draft එකත් reset කරනවා
      }, 300);
    }
  }, [open]);

  const set = useCallback((k, v) => {
    setFields(prev => ({ ...prev, [k]: v }));
    if (errors[k]) setErrors(prev => ({ ...prev, [k]: undefined }));
  }, [errors]);

  const blur = (k) => {
    setTouched(prev => ({ ...prev, [k]: true }));
    const errs = validate({ ...fields });
    setErrors(prev => ({ ...prev, [k]: errs[k] }));
  };

  // 📡 Backend API එකට Connect වෙන Submit Function එක
  const submit = async (e) => {
    e.preventDefault();
    const allTouched = { name: true, email: true, focus: true };
    setTouched(allTouched);
    const errs = validate(fields);
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setStatus('loading');
    
    try {
      // 🚀 FastAPI Backend එකට Request එක යවනවා
      const response = await fetch('http://127.0.0.1:8000/api/match', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: fields.name,
          email: fields.email,
          interest: fields.focus, // Backend එක බලාපොරොත්තු වෙන්නේ 'interest' කියන කී එකයි
        }),
      });

      if (!response.ok) {
        throw new Error('Backend server error!');
      }

      const data = await response.json();

      if (data.status === 'success') {
        setAiDraft(data.matched_draft); // Backend එකෙන් ආපු ලස්සන Email එක Save කරගත්තා
        setStatus('success');
      } else {
        throw new Error(data.pipeline_status || 'AI matching failed');
      }

    } catch (err) {
      console.error("Submission Error:", err);
      setErrors({ global: 'Could not connect to AI backend. Is FastAPI running?' });
      setStatus('idle');
    }
  };

  if (!open) return null;

  return (
    <>
      {/* ── Overlay ── */}
      <div
        onClick={onClose}
        style={{
          position:        'fixed',
          inset:           0,
          background:      'rgba(5, 6, 8, 0.82)',
          backdropFilter:  'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          zIndex:          200,
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'center',
          padding:         '20px',
          animation:       'overlayIn 0.25s ease forwards',
        }}
      >
        {/* ── Modal panel ── */}
        <div
          onClick={e => e.stopPropagation()}
          style={{
            width:        '100%',
            maxWidth:     status === 'success' ? '550px' : '440px', // Success වුණාම Email එක කියවන්න ලේසි වෙන්න පළල වැඩි කළා මචං
            background:   '#0d1120',
            border:       '1px solid rgba(255,255,255,0.11)',
            borderRadius: '20px',
            padding:      '36px',
            position:     'relative',
            boxShadow:    '0 40px 100px rgba(0,0,0,0.8), 0 0 60px rgba(124,77,255,0.1)',
            animation:    'modalIn 0.35s cubic-bezier(0.22,1,0.36,1) forwards',
            transition:   'max-width 0.3s ease',
          }}
        >

          {/* ── Close button — top-right ── */}
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              position:        'absolute',
              top:             '16px',
              right:           '16px',
              width:           '34px',
              height:          '34px',
              borderRadius:    '10px',
              background:      'rgba(255,255,255,0.08)',
              border:          '1.5px solid rgba(255,255,255,0.2)',
              color:           '#ffffff',
              cursor:          'pointer',
              display:         'flex',
              alignItems:      'center',
              justifyContent:  'center',
              zIndex:          10,
              transition:      'background 0.2s, border-color 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 2L12 12M12 2L2 12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>

          {status === 'success' ? (
            /* ── Success state ── */
            <div style={{ padding: '10px 0' }}>
              <div style={{
                width: '60px', height: '60px', borderRadius: '50%',
                background: 'rgba(124,77,255,0.15)',
                border: '1.5px solid rgba(124,77,255,0.45)',
                boxShadow: '0 0 28px rgba(124,77,255,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 20px',
                animation: 'popIn 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards',
              }}>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M5 14L11 20L23 8" stroke="#9b7dff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 style={{ textAlign: 'center', fontFamily: "'Syne', sans-serif", fontSize: '20px', fontWeight: 800, color: '#f0f4ff', marginBottom: '10px' }}>
                Application Received!
              </h3>
              <p style={{ textAlign: 'center', fontSize: '13px', color: 'rgba(136,150,176,0.85)', lineHeight: 1.75, marginBottom: '20px' }}>
                Thank you, <span style={{ color: '#9b7dff' }}>{fields.name}</span>.<br />
                Our AI Agent matched your profile. Here is your personalized invitation draft:
              </p>

              {/* ✉️ Gemini AI එකෙන් එවපු Email Draft එක පෙන්වන ලස්සන බෝක්ස් එක මචං */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '12px',
                padding: '18px',
                maxHeight: '220px',
                overflowY: 'auto',
                fontSize: '13px',
                color: '#cbd5e1',
                lineHeight: '1.6',
                fontFamily: "'DM Sans', sans-serif",
                whiteSpace: 'pre-line', // AI එක දෙන Line breaks හරියටම වදින්න මේක ඕනේ
                marginBottom: '20px',
                textAlign: 'left'
              }}>
                {aiDraft}
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{
                  display: 'inline-block',
                  padding: '9px 16px', borderRadius: '8px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '11px', color: 'rgba(100,116,139,0.9)',
                }}>
                  REF: CS26–{Math.random().toString(36).substring(2, 8).toUpperCase()}
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* ── Header ── */}
              <div style={{ marginBottom: '24px', paddingRight: '40px' }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '7px',
                  padding: '4px 11px', borderRadius: '20px',
                  background: 'rgba(124,77,255,0.12)',
                  border: '1px solid rgba(124,77,255,0.28)',
                  marginBottom: '12px',
                }}>
                  <span style={{
                    width: '5px', height: '5px', borderRadius: '50%',
                    background: '#22d3ee',
                    display: 'inline-block',
                    animation: 'ping 2s ease-in-out infinite',
                  }} />
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '9px', letterSpacing: '0.16em',
                    textTransform: 'uppercase', color: '#22d3ee',
                  }}>Limited seats available</span>
                </div>
                <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: '24px', fontWeight: 800, color: '#f0f4ff', lineHeight: 1.15, marginBottom: '6px' }}>
                  Secure Your Executive Pass
                </h2>
                <p style={{ fontSize: '12px', color: 'rgba(136,150,176,0.7)', lineHeight: 1.6 }}>
                  October 15th, 2026 · Colombo, Sri Lanka
                </p>
              </div>

              {/* ── Divider ── */}
              <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)', marginBottom: '22px' }} />

              {/* Global Error Message (උදා: Backend එක Run වෙන්නේ නැති වෙලාවට වැටෙන Error එක) */}
              {errors.global && (
                <div style={{
                  background: 'rgba(239,68,68,0.1)',
                  border: '1px solid rgba(239,68,68,0.3)',
                  padding: '10px',
                  borderRadius: '8px',
                  color: '#f87171',
                  fontSize: '12px',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <svg width="14" height="14" viewBox="0 0 11 11" fill="none"><circle cx="5.5" cy="5.5" r="5" stroke="#f87171" strokeWidth="1"/><path d="M5.5 3.5V5.5M5.5 7.5H5.51" stroke="#f87171" strokeWidth="1.2" strokeLinecap="round"/></svg>
                  {errors.global}
                </div>
              )}

              {/* ── Form ── */}
              <form onSubmit={submit} noValidate>
                {/* Full Name */}
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(136,150,176,0.65)', marginBottom: '7px' }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Dr. Jane Smith"
                    value={fields.name}
                    onChange={e => set('name', e.target.value)}
                    onBlur={() => blur('name')}
                    style={{
                      width: '100%', padding: '11px 14px', borderRadius: '10px',
                      background: errors.name && touched.name ? 'rgba(239,68,68,0.05)' : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${errors.name && touched.name ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.08)'}`,
                      color: '#f0f4ff', fontSize: '13px',
                      fontFamily: "'DM Sans', sans-serif",
                      outline: 'none', transition: 'border-color 0.2s, background 0.2s',
                    }}
                    onFocus={e => { if (!(errors.name && touched.name)) { e.target.style.borderColor = 'rgba(124,77,255,0.55)'; e.target.style.background = 'rgba(124,77,255,0.05)'; }}}
                    onBlurCapture={e => { if (!(errors.name && touched.name)) { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.background = 'rgba(255,255,255,0.03)'; }}}
                  />
                  {errors.name && touched.name && (
                    <p style={{ marginTop: '5px', fontSize: '11px', color: '#f87171', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><circle cx="5.5" cy="5.5" r="5" stroke="#f87171" strokeWidth="1"/><path d="M5.5 3.5V5.5M5.5 7.5H5.51" stroke="#f87171" strokeWidth="1.2" strokeLinecap="round"/></svg>
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Work Email */}
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(136,150,176,0.65)', marginBottom: '7px' }}>
                    Work Email
                  </label>
                  <input
                    type="email"
                    placeholder="jane@company.com"
                    value={fields.email}
                    onChange={e => set('email', e.target.value)}
                    onBlur={() => blur('email')}
                    style={{
                      width: '100%', padding: '11px 14px', borderRadius: '10px',
                      background: errors.email && touched.email ? 'rgba(239,68,68,0.05)' : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${errors.email && touched.email ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.08)'}`,
                      color: '#f0f4ff', fontSize: '13px',
                      fontFamily: "'DM Sans', sans-serif",
                      outline: 'none', transition: 'border-color 0.2s, background 0.2s',
                    }}
                    onFocus={e => { if (!(errors.email && touched.email)) { e.target.style.borderColor = 'rgba(124,77,255,0.55)'; e.target.style.background = 'rgba(124,77,255,0.05)'; }}}
                    onBlurCapture={e => { if (!(errors.email && touched.email)) { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.background = 'rgba(255,255,255,0.03)'; }}}
                  />
                  {errors.email && touched.email && (
                    <p style={{ marginTop: '5px', fontSize: '11px', color: '#f87171', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><circle cx="5.5" cy="5.5" r="5" stroke="#f87171" strokeWidth="1"/><path d="M5.5 3.5V5.5M5.5 7.5H5.51" stroke="#f87171" strokeWidth="1.2" strokeLinecap="round"/></svg>
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Professional Focus */}
                <div style={{ marginBottom: '22px' }}>
                  <label style={{ display: 'block', fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(136,150,176,0.65)', marginBottom: '7px' }}>
                    Professional Focus / Interest
                  </label>
                  <div style={{ position: 'relative' }}>
                    <select
                      value={fields.focus}
                      onChange={e => set('focus', e.target.value)}
                      onBlur={() => blur('focus')}
                      style={{
                        width: '100%', padding: '11px 36px 11px 14px', borderRadius: '10px',
                        background: errors.focus && touched.focus ? 'rgba(239,68,68,0.05)' : '#0d1120',
                        border: `1px solid ${errors.focus && touched.focus ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.08)'}`,
                        color: fields.focus ? '#f0f4ff' : 'rgba(100,116,139,0.55)',
                        fontSize: '13px', fontFamily: "'DM Sans', sans-serif",
                        outline: 'none', cursor: 'pointer',
                        appearance: 'none', WebkitAppearance: 'none',
                        transition: 'border-color 0.2s',
                      }}
                    >
                      <option value="" disabled>Select your primary focus area</option>
                      {FOCUS_OPTIONS.map(opt => (
                        <option key={opt} value={opt} style={{ background: '#0d1120', color: '#f0f4ff' }}>{opt}</option>
                      ))}
                    </select>
                    {/* Custom chevron */}
                    <svg style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M3 5L7 9L11 5" stroke="rgba(136,150,176,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  {errors.focus && touched.focus && (
                    <p style={{ marginTop: '5px', fontSize: '11px', color: '#f87171', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><circle cx="5.5" cy="5.5" r="5" stroke="#f87171" strokeWidth="1"/><path d="M5.5 3.5V5.5M5.5 7.5H5.51" stroke="#f87171" strokeWidth="1.2" strokeLinecap="round"/></svg>
                      {errors.focus}
                    </p>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  style={{
                    width: '100%', padding: '13px', borderRadius: '11px',
                    background: status === 'loading' ? 'rgba(124,77,255,0.5)' : 'linear-gradient(135deg, #7c4dff 0%, #6b2fff 100%)',
                    color: '#ffffff', fontSize: '14px', fontWeight: 500,
                    fontFamily: "'DM Sans', sans-serif",
                    border: 'none', cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    boxShadow: status === 'loading' ? 'none' : '0 0 24px rgba(124,77,255,0.3)',
                    transition: 'all 0.25s',
                  }}
                >
                  {status === 'loading' ? (
                    <>
                      <svg style={{ animation: 'spin 0.8s linear infinite' }} width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="6" stroke="rgba(255,255,255,0.3)" strokeWidth="2"/>
                        <path d="M8 2A6 6 0 0 1 14 8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      Matching Agenda
                    </>
                  ) : (
                    <>
                      Submit Application
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2.5 7H11.5M8.5 4L11.5 7L8.5 10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </>
                  )}
                </button>

                <p style={{ textAlign: 'center', marginTop: '12px', fontSize: '11px', fontFamily: "'JetBrains Mono', monospace", color: 'rgba(74,85,104,0.8)' }}>
                  No spam · Privacy policy applies
                </p>
              </form>
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes overlayIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes modalIn   { from { opacity: 0; transform: scale(0.93) translateY(14px) } to { opacity: 1; transform: scale(1) translateY(0) } }
        @keyframes popIn     { 0% { transform: scale(0.7); opacity: 0 } 70% { transform: scale(1.08) } 100% { transform: scale(1); opacity: 1 } }
        @keyframes ping      { 0%,100% { opacity: 0.5; transform: scale(1) } 50% { opacity: 1; transform: scale(1.35) } }
        @keyframes spin      { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
      `}</style>
    </>
  );
}