/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-green': '#10b981',
        'dark-green': '#047857',
        'forest': '#064E3B',
        'sage': '#a7f3d0',
        'light-green': '#ecfdf5',
        'cream': '#f0fdf4',
        'background-color': '#F8FAF7',
        'neon-green': '#34d399',
        'lime-accent': '#84cc16',
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
      },
    },
  },
  plugins: [],
}
