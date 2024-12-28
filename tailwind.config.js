/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      animation: {
        blink: 'blink 0.75s infinite',
      },
      fontFamily: {
        'press-start': ['"Press Start 2P"', 'cursive'],
        playmegames: ['PlayMeGames-Demo', 'sans-serif'],
      },
      letterSpacing: {
        'extra-wide': '1.5em',
      },
      textShadow: {
        'glow': '0 0 8px #FF0000, 0 0 12px #F39D18',
        
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.text-shadow-glow': {
          'text-shadow': '0 0 8px #FF0000, 0 0 12px #F39D18',
        },
      });
    },
  ],
};

  
