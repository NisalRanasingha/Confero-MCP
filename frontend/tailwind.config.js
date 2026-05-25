/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Deep space base
        void:    '#050608',
        abyss:   '#080b10',
        depth:   '#0c1018',
        surface: '#111520',
        panel:   '#161c28',
        rim:     '#1c2436',
        // Accent: Electric Violet
        violet: {
          50:  '#f3f0ff',
          100: '#e9e3ff',
          200: '#d4caff',
          300: '#b8a8ff',
          400: '#9b7dff',
          500: '#7c4dff',
          600: '#6b2fff',
          700: '#5a1de0',
          800: '#4b19b8',
          900: '#3d1694',
        },
        // Accent: Cyber Cyan
        cyan: {
          50:  '#ecfffe',
          100: '#cffcfc',
          200: '#a5f3f9',
          300: '#67e8f6',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
        },
        // Neutral slates
        slate: {
          50:   '#f8fafc',
          100:  '#f1f5f9',
          200:  '#e2e8f0',
          300:  '#cbd5e1',
          400:  '#94a3b8',
          500:  '#64748b',
          600:  '#475569',
          700:  '#334155',
          800:  '#1e293b',
          850:  '#172033',
          900:  '#0f172a',
          950:  '#020617',
        },
      },
      fontFamily: {
        display: ['"Syne"', 'sans-serif'],
        body:    ['"DM Sans"', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        '8xl':  ['6rem',   { lineHeight: '1' }],
        '9xl':  ['8rem',   { lineHeight: '1' }],
        '10xl': ['10rem',  { lineHeight: '1' }],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':  'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'violet-glow':     'radial-gradient(ellipse at center, rgba(124,77,255,0.15) 0%, transparent 70%)',
        'cyan-glow':       'radial-gradient(ellipse at center, rgba(6,182,212,0.12) 0%, transparent 70%)',
        'hero-mesh':       `
          radial-gradient(ellipse 80% 60% at 20% 10%, rgba(124,77,255,0.12) 0%, transparent 60%),
          radial-gradient(ellipse 60% 40% at 80% 90%, rgba(6,182,212,0.08) 0%, transparent 55%),
          radial-gradient(ellipse 40% 40% at 50% 50%, rgba(124,77,255,0.04) 0%, transparent 70%)
        `,
      },
      animation: {
        'fade-up':      'fadeUp 0.7s ease forwards',
        'fade-in':      'fadeIn 0.5s ease forwards',
        'glow-pulse':   'glowPulse 3s ease-in-out infinite',
        'marquee':      'marquee 28s linear infinite',
        'marquee2':     'marquee2 28s linear infinite',
        'count-up':     'countUp 0.4s ease forwards',
        'border-spin':  'borderSpin 6s linear infinite',
        'shimmer':      'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%':      { opacity: '1',   transform: 'scale(1.05)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marquee2: {
          '0%':   { transform: 'translateX(50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        borderSpin: {
          '0%':   { '--border-angle': '0deg' },
          '100%': { '--border-angle': '360deg' },
        },
      },
      boxShadow: {
        'violet-sm': '0 0 12px rgba(124,77,255,0.25)',
        'violet-md': '0 0 24px rgba(124,77,255,0.35)',
        'violet-lg': '0 0 48px rgba(124,77,255,0.25)',
        'cyan-sm':   '0 0 12px rgba(6,182,212,0.25)',
        'cyan-md':   '0 0 24px rgba(6,182,212,0.35)',
        'inner-rim': 'inset 0 1px 0 rgba(255,255,255,0.06)',
        'card':      '0 4px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
        'card-hover':'0 8px 48px rgba(0,0,0,0.6), 0 0 24px rgba(124,77,255,0.15), inset 0 1px 0 rgba(255,255,255,0.08)',
      },
      backdropBlur: {
        xs: '2px',
      },
      borderColor: {
        DEFAULT: 'rgba(255,255,255,0.07)',
      },
    },
  },
  plugins: [],
};
