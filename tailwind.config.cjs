const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        admin: 'auto 1fr',
      },
      colors: {
        primary: colors.blue[400],
        'primary-dark': colors.blue[500],
        'primary-admin': colors.sky[500]
      }
    },
  },
  plugins: [],
}
