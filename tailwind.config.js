/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Make sure this line is perfect
  ],
  theme: {
    // It MUST be inside 'extend'
    extend: {
      fontFamily: {
        // The key 'sans' creates the 'font-sans' class
        // The value is an array of strings
        sans: ['Josefin Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
