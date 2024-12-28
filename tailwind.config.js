/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'press-start': ['"Press Start 2P"', 'cursive'],
      },
      letterSpacing: {
        'extra-wide': '1.5em',
      },
      textShadow: {
        'glow': '0 0 8px #FF0000, 0 0 12px #F39D18',
      },
      boxShadow: {
        'red-glow': '5px 5px 0px #FF4500', 
      }
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
