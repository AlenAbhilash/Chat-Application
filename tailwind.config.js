/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.hide-scrollbar': {
          '-ms-overflow-style': 'none', 
          'scrollbar-width': 'none', 
        },
        '.hide-scrollbar::-webkit-scrollbar': {
          'display': 'none', 
        },
      }, ['responsive', 'hover']);
    },
  ],
}
