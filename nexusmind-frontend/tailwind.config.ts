import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#05080f',
        panel: '#0b111d',
        panel2: '#111a2b',
        panel3: '#16213a',
        border: '#1a2437',
        border2: '#28374f',
        txt: '#e6edfa',
        txt2: '#8fa3c0',
        txt3: '#556a89',
        tech: '#3b82f6',
        'tech-light': '#60a5fa',
        cyan: '#22d3ee',
        violet: '#8b5cf6',
        green: '#10e08a',
        amber: '#fbbf24',
        red: '#f43f5e',
      },
      fontFamily: {
        mono: ['ui-monospace', 'SF Mono', 'Menlo', 'Consolas', 'monospace'],
      },
      animation: {
        'scan-line': 'scanLine 4s ease-in-out infinite',
        'brain-ripple': 'brainRipple 2.8s ease-out infinite',
        'text-flow': 'textFlow 6s linear infinite',
        'blink': 'blink 1.4s infinite',
        'float': 'fbFloat 6s ease-in-out infinite',
      },
      keyframes: {
        scanLine: {
          '0%,100%': { opacity: '.4', transform: 'scaleX(.6)' },
          '50%': { opacity: '1', transform: 'scaleX(1)' },
        },
        brainRipple: {
          '0%': { transform: 'scale(.9)', opacity: '.9' },
          '100%': { transform: 'scale(1.5)', opacity: '0' },
        },
        textFlow: { to: { backgroundPosition: '300% 50%' } },
        blink: { '50%': { opacity: '.3' } },
        fbFloat: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
    },
  },
  plugins: [],
}

export default config