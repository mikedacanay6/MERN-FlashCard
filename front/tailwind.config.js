/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F5D0C5',
        secondary: '#D69F7E',
        accent: '#774936',
        info: '#3C0000',
        dark: '#050609'
      }
    },
  },
  plugins: [
    
  ],
}