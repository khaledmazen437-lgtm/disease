/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Off-White & Creamy Palette (Primary calming backgrounds)
        cream: {
          50: '#FDFBF7',
          100: '#FBF7F0',
          200: '#F5EFEB',
          300: '#EBE2D8',
          400: '#DED3C4',
          500: '#CBBBA8',
          600: '#AFA08C',
          700: '#8C7F6D',
          800: '#6E6355',
          900: '#524A3F',
        },
        // Burgundy Palette (Secondary CTA and accents)
        burgundy: {
          50: '#FDF2F4',
          100: '#FCE7EA',
          200: '#F8CFD6',
          300: '#F1A7B4',
          400: '#E46B83',
          500: '#D03B5C',
          600: '#B02242',
          700: '#8E1833',
          800: '#75172C',
          900: '#641728',
          950: '#3D0713',
        },
        // Autism Sensory Support Accents
        sensory: {
          sky: '#E0F2FE',
          skyText: '#0369A1',
          mint: '#DCFCE7',
          mintText: '#15803D',
          peach: '#FFEDD5',
          peachText: '#C2410C',
          lavender: '#F3E8FF',
          lavenderText: '#7E22CE',
          sun: '#FEF9C3',
          sunText: '#A16207',
        }
      },
      fontFamily: {
        tajawal: ['Tajawal', 'Cairo', 'sans-serif'],
        cairo: ['Cairo', 'Tajawal', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(100, 23, 40, 0.05)',
        'soft-lg': '0 10px 30px -4px rgba(100, 23, 40, 0.08)',
        'gentle': '0 2px 10px rgba(0, 0, 0, 0.04)',
      },
      animation: {
        'gentle-float': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.02)' },
        }
      }
    },
  },
  plugins: [],
}
