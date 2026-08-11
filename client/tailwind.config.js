/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Brand palette — warm, earthy, deliberately not default Tailwind blue/gray
        ink: {
          DEFAULT: '#141210', // near-black, warm
          soft: '#3B3530',
          muted: '#6B615A',
        },
        sand: {
          50: '#FDFBF7',
          100: '#F8F3EA',
          200: '#EFE6D7',
          300: '#E2D4BE',
        },
        clay: {
          // primary accent — terracotta
          400: '#E07A4F',
          500: '#C9552A',
          600: '#A8421F',
        },
        moss: {
          // secondary accent — deep teal-green
          500: '#1F4E46',
          600: '#173B35',
        },
        gold: '#D9A441',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'Times New Roman', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      maxWidth: {
        content: '76rem',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up .6s cubic-bezier(.22,1,.36,1) both',
      },
    },
  },
  plugins: [],
}
