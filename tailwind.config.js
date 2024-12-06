/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#E6D5B8',
        olive: '#4A5043',
        sage: '#8B9D83',
      }
    }
  },
  plugins: [],
}