/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        popins: ["Poppins", "sans-serif"],
      },
      animation: {
        'slide-in-top': 'slideInTop 1s ease-out forwards',
        'slide-in-bottom': 'slideInBottom 1s ease-out forwards',
        'text-reveal': 'textReveal 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'text-float': 'textFloat 1.8s cubic-bezier(0.4, 0, 0.2, 1) forwards',
      },
      keyframes: {
        slideInTop: {
          '0%': { 
            transform: 'translateY(-100%)', 
            opacity: '0' 
          },
          '100%': { 
            transform: 'translateY(0)', 
            opacity: '1' 
          }
        },
        slideInBottom: {
          '0%': { 
            transform: 'translateY(100%)', 
            opacity: '0' 
          },
          '100%': { 
            transform: 'translateY(0)', 
            opacity: '1' 
          }
        },
        textReveal: {
          '0%': { 
            transform: 'translateY(100%) scale(0.8)', 
            opacity: '0',
            filter: 'blur(20px)'
          },
          '70%': {
            transform: 'translateY(-10%) scale(1.05)',
            opacity: '0.5',
            filter: 'blur(10px)'
          },
          '100%': { 
            transform: 'translateY(0) scale(1)', 
            opacity: '1',
            filter: 'blur(0)'
          }
        },
        textFloat: {
          '0%': { 
            transform: 'translateY(50%) scale(0.9)', 
            opacity: '0',
            filter: 'blur(15px)'
          },
          '70%': {
            transform: 'translateY(-5%) scale(1.02)',
            opacity: '0.7',
            filter: 'blur(5px)'
          },
          '100%': { 
            transform: 'translateY(0) scale(1)', 
            opacity: '1',
            filter: 'blur(0)'
          }
        }
      },
      textShadow: {
        'lg': '0 10px 15px rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [],
};
