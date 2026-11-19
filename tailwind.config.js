/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          950: '#150205',
          900: '#26040A',
          850: '#38060F',
          800: '#4A0A16',
          750: '#5B0F1A',
          700: '#6C1220',
          600: '#8A1729',
          500: '#B02036',
        },
        gold: {
          50: '#FFFDF5',
          100: '#FFF9E5',
          200: '#FDF1C6',
          300: '#F8E090',
          400: '#ECCB5C',
          500: '#D4AF37',
          600: '#B88B22',
          700: '#946B13',
          800: '#6E4D0C',
        },
        ivory: {
          50: '#FFFEFA',
          100: '#FFFDF7',
          200: '#FFF8E7',
          300: '#F5EEDC',
          400: '#ECE2CA',
          500: '#DDD1B5',
        },
        rosewood: {
          DEFAULT: '#9E2A2B',
          light: '#BA3B3C',
          dark: '#6E1B1C',
        }
      },
      fontFamily: {
        cinzel: ['"Cinzel Decorative"', 'Cinzel', 'serif'],
        cinzelText: ['Cinzel', 'serif'],
        playfair: ['"Playfair Display"', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
        sans: ['Poppins', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #FFE89E 0%, #D4AF37 45%, #AA771C 100%)',
        'gold-shimmer': 'linear-gradient(90deg, #D4AF37 0%, #FFF3B0 50%, #D4AF37 100%)',
        'royal-gradient': 'radial-gradient(ellipse at top, #4A0A16 0%, #26040A 60%, #150205 100%)',
        'royal-card': 'linear-gradient(145deg, rgba(74, 10, 22, 0.85) 0%, rgba(38, 4, 10, 0.95) 100%)',
        'ivory-card': 'linear-gradient(145deg, rgba(255, 253, 247, 0.95) 0%, rgba(255, 248, 231, 0.88) 100%)',
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.35)',
        'gold-glow-lg': '0 0 50px rgba(212, 175, 55, 0.5)',
        'maroon-deep': '0 20px 40px rgba(21, 2, 5, 0.7)',
        'royal-card': '0 15px 35px -5px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(212, 175, 55, 0.25)',
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-gentle': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
