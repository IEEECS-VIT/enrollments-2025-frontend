/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        custom: ['retro', 'sans-serif'],
        'press-start': ['"Press Start 2P"', 'cursive'],
      },
      letterSpacing:{
        'extra-wide': '1.5em'
      },
      colors:{
          brownish:'#F8B95A',
      },
      boxShadow: {
        'red-glow': '5px 5px 0px #FF4500', 
      },
      textShadow: {
        'glow': '0 0 10px #FF4500, 0 0 20px #FF4500, 0 0 30px #FF4500',
      },
      
    },
  },
  plugins: [
    require('tailwindcss-textshadow'),
  ],
};

