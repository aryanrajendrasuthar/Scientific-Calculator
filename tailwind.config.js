/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        'primary-hover': '#2563EB',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      keyframes: {
        press: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.93)' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(-6px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        press: 'press 150ms ease-in-out',
        'fade-in': 'fade-in 200ms ease-out',
      },
    },
  },
  plugins: [],
}
