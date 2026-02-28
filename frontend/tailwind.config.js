/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        gilroy: ['Gilroy', 'sans-serif'],
      },
      colors: {
        'caffenio-bg': '#F1EAE5',
      },
      fontWeight: {
        'gilroy-bold': '700',
      }
    },
  },
  plugins: [],
}
