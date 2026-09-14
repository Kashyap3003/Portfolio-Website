/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'Inter', 'system-ui', 'sans-serif'],
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        ground:   'var(--ground)',
        surface:  'var(--surface)',
        ink:      'var(--text)',
        muted:    'var(--muted)',
        accent:   'var(--accent)',
        'accent-2': 'var(--accent-2)',
        'accent-3': 'var(--accent-3)',
        spark:    'var(--spark)',
        hairline: 'var(--hairline)',
      },
      animation: {
        blink:           'blink 1.1s step-end infinite',
        float:           'float 7s ease-in-out infinite',
        'float-slow':    'float 12s ease-in-out infinite',
        aurora:          'aurora 22s ease-in-out infinite',
        marquee:         'marquee 40s linear infinite',
        'marquee-rev':   'marquee-rev 40s linear infinite',
        shimmer:         'shimmer 2.6s linear infinite',
        'spin-slow':     'spin 18s linear infinite',
        'pulse-ring':    'pulse-ring 2.6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient-pan':  'gradient-pan 8s ease infinite',
        'fade-up':       'fade-up 0.65s cubic-bezier(0.22,1,0.36,1) both',
        'line-expand':   'line-expand 0.7s cubic-bezier(0.22,1,0.36,1) both',
        'counter-glow':  'counter-glow 3s ease-in-out infinite',
        'badge-in':      'badge-in 0.5s cubic-bezier(0.34,1.56,0.64,1) both',
        'dot-ping':      'dot-ping 2s cubic-bezier(0,0,0.2,1) infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':       { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-15px)' },
        },
        aurora: {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '33%':      { transform: 'translate3d(5%,-4%,0) scale(1.11)' },
          '66%':      { transform: 'translate3d(-4%,5%,0) scale(0.95)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-rev': {
          '0%':   { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        shimmer: {
          '0%':   { transform: 'translateX(-130%)' },
          '100%': { transform: 'translateX(130%)' },
        },
        'pulse-ring': {
          '0%':       { transform: 'scale(0.85)', opacity: '0.7' },
          '70%, 100%': { transform: 'scale(2)',   opacity: '0' },
        },
        'gradient-pan': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':      { backgroundPosition: '100% 50%' },
        },
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'line-expand': {
          '0%':   { transform: 'scaleX(0)', transformOrigin: 'left' },
          '100%': { transform: 'scaleX(1)', transformOrigin: 'left' },
        },
        'counter-glow': {
          '0%, 100%': { filter: 'brightness(1)' },
          '50%':       { filter: 'brightness(1.12)' },
        },
        'badge-in': {
          '0%':   { opacity: '0', transform: 'scale(0.7)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'dot-ping': {
          '75%, 100%': { transform: 'scale(2)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
