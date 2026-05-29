/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#eef6e4',
        ink: '#111a0e',
        lime: '#a8e63d',
        'lime-dark': '#8fd42a',
        'lime-mid': '#c2f060',
        muted: '#4a5e3a',
      },
      fontFamily: {
        barlow: ['"Barlow Condensed"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        hero: ['clamp(72px,12vw,160px)', { lineHeight: '0.9', letterSpacing: '-0.02em' }],
        display: ['clamp(48px,7vw,96px)', { lineHeight: '0.92', letterSpacing: '-0.02em' }],
        heading: ['clamp(36px,5vw,64px)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
      },
      animation: {
        'float-a': 'floatA 6s ease-in-out infinite',
        'float-b': 'floatB 8s ease-in-out infinite',
        'float-c': 'floatC 10s ease-in-out infinite',
        'ticker': 'ticker 20s linear infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        floatA: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
        floatB: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-18px)' } },
        floatC: { '0%,100%': { transform: 'translateY(0) rotate(-2deg)' }, '50%': { transform: 'translateY(-10px) rotate(2deg)' } },
        ticker: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
      },
    },
  },
  plugins: [],
}
