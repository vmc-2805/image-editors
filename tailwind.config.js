/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'rgb(var(--color-primary) / <alpha-value>)',
          50: '#eff6f0',
          100: '#d9ecdc',
          200: '#b4d9ba',
          300: '#84bf8d',
          400: '#52a15e',
          500: '#348344',
          600: '#236833',
          700: '#175227',
          800: '#0c3a19',
          900: '#052609',
        },
        secondary: {
          DEFAULT: 'rgb(var(--color-secondary) / <alpha-value>)',
          50: '#f6f6f6',
          100: '#e9e9e9',
          200: '#d2d2d2',
          300: '#b1b1b1',
          400: '#8b8b8b',
          500: '#666666',
          600: '#565656',
          700: '#464646',
          800: '#373737',
          900: '#2a2a2a',
        },
        ink: 'var(--color-ink)',
        surface: 'var(--color-surface)',
        line: 'var(--color-border)',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 2px 12px -2px rgba(24, 36, 32, 0.08)',
        lift: '0 12px 32px -8px rgba(1, 38, 4, 0.28)',
        mega: '0 24px 64px -16px rgba(24, 36, 32, 0.25)',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'menu-down': {
          from: { opacity: '0', transform: 'translateY(-8px) scale(0.99)' },
          to: { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'pop-in': {
          from: { opacity: '0', transform: 'scale(0.96)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease both',
        'fade-up': 'fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
        'menu-down': 'menu-down 0.22s cubic-bezier(0.22, 1, 0.36, 1) both',
        'pop-in': 'pop-in 0.25s cubic-bezier(0.22, 1, 0.36, 1) both',
        'float-slow': 'float-slow 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
